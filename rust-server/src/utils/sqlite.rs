use rusqlite::Connection;
use crate::config::{ Config, Mode };

use tracing::{ error, info };
use super::super::models::database::{ DBError, DBEntry, Result };

/// NOTE: This function is only used in the tests
pub fn drop_table(config: &Config) -> Result<()> {
  let conn = get_connection(&config)?;
  let res = conn.execute("DROP TABLE IF EXISTS prompts", []);
  if let Ok(_) = res {
    return Ok(());
  }
  return Err(DBError::TableCreationError("Some".to_string(), "_e".to_string()));
}

/// Function to insert a prompt with the given response into the database.
///
/// # Params
///
/// * `config` - The [Config] struct containing the database path.
/// * `prompt` - The prompt to be inserted.
/// * `response` - The response to the prompt.
///
/// # Returns
///
/// A [Result] containing the ID of the inserted prompt or a [DBError].
pub fn insert_prompt(config: &Config, prompt: &str, response: &str) -> Result<i64> {
  let conn = get_connection(&config)?;
  let sql = "INSERT INTO prompts (prompt, response) VALUES (?1, ?2)";
  let res = conn.execute(sql, rusqlite::params![prompt, response]);
  match res {
    Ok(_) => {
      let sql = "SELECT id FROM prompts WHERE prompt = ?1 AND response = ?2";
      let stmt = conn.prepare(sql);
      let id = get_latest(stmt, prompt.to_string(), response.to_string())?;

      return Ok(id);
    }
    Err(_e) => {
      return Err(DBError::InsertError("Some".to_string(), _e.to_string()));
    }
  }
}

/// Function to update the usefullness of a prompt in the database.
///
/// # Params
///
/// * `config` - The [Config] struct containing the database path.
/// * `id` - The ID of the prompt to be updated.
/// * `usefull` - The new usefullness value of the prompt.
///
/// # Returns
///
/// A [Result] containing `()` if the update was successful or a [DBError].
pub fn update_prompt(config: &Config, id: i64, usefull: bool) -> Result<()> {
  let usefull = if usefull { 1 } else { 0 };

  let conn = get_connection(&config)?;

  let sql = "UPDATE prompts SET usefull = ?1 WHERE id = ?2";
  let res = conn.execute(sql, rusqlite::params![usefull, id]);
  match res {
    Ok(res) => {
      if res == 0 {
        return Err(DBError::UpdateError("Some".to_string(), "_e".to_string()));
      }
      return Ok(());
    }
    Err(_e) => {
      return Err(DBError::UpdateError("Some".to_string(), _e.to_string()));
    }
  }
}

/// Function to fetch all prompts from the database and optionally filter by usefullness.
///
/// If `usefull` is `None`, all prompts are fetched.
///
/// # Params
///
/// * `config` - The [Config] struct containing the database path.
/// * `usefull` - An optional boolean value to filter prompts by usefullness.
///
/// # Returns
///
/// A [Result] containing a list of prompts or a [DBError].
pub fn fetch_prompts(config: &Config, usefull: Option<bool>) -> Result<Vec<DBEntry>> {
  let conn = get_connection(&config)?;

  let sql = match usefull {
    Some(true) => "SELECT * FROM prompts WHERE usefull = 1",
    Some(false) => "SELECT * FROM prompts WHERE usefull = 0",
    None => "SELECT * FROM prompts",
  };
  let stmt = conn.prepare(sql);
  let list = get_list(stmt)?;

  return Ok(list);
}

/// A helper function to get a list from a `SELECT` statement.
///
/// # Params
///
/// * `stmt` - The `SELECT` statement to get the list from.
///
/// # Returns
///
/// A [Result] containing a list of [Prompt] or a [DBError].
fn get_list(stmt: rusqlite::Result<rusqlite::Statement>) -> Result<Vec<DBEntry>> {
  match stmt {
    Ok(mut stmt) => {
      let iter = stmt.query_map([], |row| {
        Ok(DBEntry::new(row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?))
      });

      match iter {
        Ok(iter) => {
          let mut list = Vec::new();
          for prompt in iter {
            if let Ok(okprompt) = prompt {
              list.push(okprompt);
            }
          }
          return Ok(list);
        }
        Err(_e) => {
          return Err(DBError::QueryError("Some".to_string(), _e.to_string()));
        }
      }
    }
    Err(_e) => {
      return Err(DBError::QueryError("Some".to_string(), _e.to_string()));
    }
  }
}

/// A helper function to get the latest ID from a `SELECT` statement.
///
/// # Params
///
/// * `stmt` - The `SELECT` statement to get the latest ID from.
/// * `prompt` - The prompt to filter by.
/// * `response` - The response to filter by.
///
/// # Returns
///
/// A [Result] containing the latest ID or a [DBError].
fn get_latest(
  stmt: rusqlite::Result<rusqlite::Statement>,
  prompt: String,
  response: String
) -> Result<i64> {
  match stmt {
    Ok(mut stmt) => {
      let iter = stmt.query_map(rusqlite::params![prompt, response], |row| { Ok(row.get(0)?) });

      match iter {
        Ok(iter) => {
          let mut id: i64 = -1;
          for item in iter {
            if let Ok(item) = item {
              id = item;
            }
          }
          if id != -1 {
            return Ok(id);
          }
          return Err(DBError::QueryError("Some".to_string(), "_e".to_string()));
        }
        Err(_e) => {
          return Err(DBError::QueryError("Some".to_string(), _e.to_string()));
        }
      }
    }
    Err(_e) => {
      return Err(DBError::QueryError("Some".to_string(), _e.to_string()));
    }
  }
}

/// A helper function to get a connection to the database.
/// If the database does not exist, it is created.
///
/// # Params
///
/// * `config` - The [Config] struct containing the database path.
///
/// # Returns
///
/// A [Result] containing the database connection or a [DBError].
fn get_connection(config: &Config) -> Result<Connection> {
  let mode = config.mode.clone();
  let conn = rusqlite::Connection::open(config.db_path.clone());
  match conn {
    Ok(conn) => {
      let res = conn.execute(
        "CREATE TABLE IF NOT EXISTS prompts (
                    id INTEGER PRIMARY KEY,
                    prompt TEXT NOT NULL,
                    response TEXT NOT NULL,
                    usefull INTEGER DEFAULT 0
                )",
        ()
      );
      match res {
        Ok(_) => {
          return Ok(conn);
        }
        Err(e) => {
          error!("Could not execute create table sql.");
          if mode == Mode::Dev {
            info!("Error provided: {:?}", e);
          }
          return Err(DBError::TableCreationError("Some".to_string(), "_e".to_string()));
        }
      }
    }
    Err(e) => {
      error!("Could not open Database");
      if mode == Mode::Dev {
        info!("Error provided: {:?}", e);
      }
      return Err(DBError::ConnectionError("Could not open database".to_string(), "_e".to_string()));
    }
  }
}
