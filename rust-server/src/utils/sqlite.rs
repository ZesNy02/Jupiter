use rusqlite::Connection;
use crate::config::{ Config, Mode };

use tracing::{ error, info };
use super::super::models::database::{ DBError, Prompt, Result };

// NOTE: This function is only used in the tests
pub fn drop_table(config: &Config) -> Result<()> {
  let conn = get_connection(&config)?;
  let res = conn.execute("DROP TABLE IF EXISTS prompts", []);
  if let Ok(_) = res {
    return Ok(());
  }
  return Err(DBError::TableCreationError);
}

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
      return Err(DBError::InsertError);
    }
  }
}

pub fn update_prompt(config: &Config, id: i64, usefull: bool) -> Result<()> {
  let usefull = if usefull { 1 } else { 0 };

  let conn = get_connection(&config)?;

  let sql = "UPDATE prompts SET usefull = ?1 WHERE id = ?2";
  let res = conn.execute(sql, rusqlite::params![usefull, id]);
  match res {
    Ok(res) => {
      if res == 0 {
        return Err(DBError::UpdateError);
      }
      return Ok(());
    }
    Err(_e) => {
      return Err(DBError::UpdateError);
    }
  }
}

pub fn fetch_prompts(config: &Config, usefull: Option<bool>) -> Result<Vec<Prompt>> {
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

fn get_list(stmt: rusqlite::Result<rusqlite::Statement>) -> Result<Vec<Prompt>> {
  match stmt {
    Ok(mut stmt) => {
      let iter = stmt.query_map([], |row| {
        Ok(Prompt::new(row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?))
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
          return Err(DBError::QueryError);
        }
      }
    }
    Err(_e) => {
      return Err(DBError::QueryError);
    }
  }
}

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
          return Err(DBError::QueryError);
        }
        Err(_e) => {
          return Err(DBError::QueryError);
        }
      }
    }
    Err(_e) => {
      return Err(DBError::QueryError);
    }
  }
}

fn get_connection(config: &Config) -> Result<Connection> {
  let mode = config.mode.clone();
  let conn = rusqlite::Connection::open(config.get_db_path());
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
          return Err(DBError::TableCreationError);
        }
      }
    }
    Err(e) => {
      error!("Could not open Database");
      if mode == Mode::Dev {
        info!("Error provided: {:?}", e);
      }
      return Err(DBError::ConnectionError);
    }
  }
}
