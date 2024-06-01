use rusqlite::Connection;
use crate::config::Config;

use super::super::models::database::{ DBError, Prompt, Result };

fn get_connection(config: &Config) -> Result<Connection> {
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
        Err(_e) => {
          return Err(DBError::TableCreationError);
        }
      }
    }
    Err(_e) => Err(DBError::ConnectionError),
  }
}

fn execute_sql(
  config: &Config,
  sql: &str,
  params: &[&dyn rusqlite::ToSql],
  err: DBError
) -> Result<()> {
  let conn = get_connection(&config);
  match conn {
    Ok(conn) => {
      let res = conn.execute(sql, params);
      match res {
        Ok(_) => Ok(()),
        Err(_e) => Err(err),
      }
    }
    Err(_e) => Err(DBError::ConnectionError),
  }
}

// NOTE: This function is only used in the tests
pub fn drop_table(config: &Config) -> Result<()> {
  return execute_sql(
    &config,
    "DROP TABLE prompts",
    rusqlite::params![],
    DBError::TableCreationError
  );
}

pub fn insert_prompt(config: &Config, prompt: &str, response: &str) -> Result<()> {
  return execute_sql(
    &config,
    "INSERT INTO prompts (prompt, response) VALUES (?1, ?2)",
    rusqlite::params![prompt, response],
    DBError::InsertError
  );
}

pub fn update_prompt(config: &Config, id: u32, usefull: bool) -> Result<()> {
  let usefull = if usefull { 1 } else { 0 };
  return execute_sql(
    &config,
    "UPDATE prompts SET usefull = ?1 WHERE id = ?2",
    rusqlite::params![usefull, id],
    DBError::UpdateError
  );
}

pub fn fetch_prompts(config: &Config, usefull: Option<bool>) -> Result<Vec<Prompt>> {
  let conn = get_connection(&config);
  match conn {
    Ok(conn) => {
      let sql = match usefull {
        Some(true) => "SELECT * FROM prompts WHERE usefull = 1",
        Some(false) => "SELECT * FROM prompts WHERE usefull = 0",
        None => "SELECT * FROM prompts",
      };
      let stmt = conn.prepare(sql);
      let list = get_list(stmt);
      match list {
        Ok(list) => {
          return Ok(list);
        }
        Err(_e) => {
          return Err(DBError::QueryError);
        }
      }
    }
    Err(_e) => {
      return Err(DBError::ConnectionError);
    }
  }
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
