use dotenv::dotenv;
use std::env;

#[derive(PartialEq)]
#[derive(Debug)]
pub enum Mode {
  Dev,
  Prod,
}

pub fn get_config(mode: Mode, docker: bool) -> Config {
  if docker {
    Config::load_from_docker(mode).unwrap_or(Config::default_config())
  } else {
    Config::load_from_env(mode).unwrap_or(Config::default_config())
  }
}

#[derive(PartialEq)]
#[derive(Debug)]
pub struct Config {
  pub ip: String,
  pub port: u16,
  pub mode: Mode,
  pub db_path: String,
  pub script: String,
}

impl Config {
  fn load_from_env(mode: Mode) -> Option<Config> {
    dotenv().ok();
    let ip = env::var("IP").ok()?;
    let port = env::var("PORT").ok()?.parse::<u16>().ok()?;

    Some(Config {
      ip,
      port,
      mode,
      db_path: "./db.db".to_string(),
      script: "rag.py".to_string(),
    })
  }

  fn load_from_docker(mode: Mode) -> Option<Config> {
    Some(Config {
      ip: "0.0.0.0".to_string(),
      port: 3000,
      mode,
      db_path: "./data/db.db".to_string(),
      script: "rag.py".to_string(),
    })
  }

  fn default_config() -> Config {
    Config {
      ip: "127.0.0.1".to_string(),
      port: 8080,
      mode: Mode::Dev,
      db_path: "./db.db".to_string(),
      script: "rag.py".to_string(),
    }
  }

  pub fn get_db_path(&self) -> String {
    return self.db_path.clone();
  }

  pub fn _dummy_sqlite(path: String) -> Config {
    Config {
      ip: "".to_string(),
      port: 0,
      mode: Mode::Dev,
      db_path: path,
      script: "rag.py".to_string(),
    }
  }

  pub fn _dummy_python(script: String) -> Config {
    Config {
      ip: "".to_string(),
      port: 0,
      mode: Mode::Dev,
      db_path: "".to_string(),
      script,
    }
  }
}
