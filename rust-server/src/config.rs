use dotenv::dotenv;
use tracing::{ error, info };
use std::env;

#[derive(PartialEq)]
#[derive(Debug)]
#[derive(Clone)]
pub enum Mode {
  Dev,
  Prod,
}

pub fn get_config(mode: Mode, docker: bool) -> Config {
  if docker {
    return Config::load_from_docker(mode);
  } else {
    return Config::load_from_env(mode);
  }
}

#[derive(PartialEq)]
#[derive(Debug)]
#[derive(Clone)]
pub struct Config {
  pub ip: String,
  pub port: u16,
  pub mode: Mode,
  pub db_path: String,
  pub script: String,
}

impl Config {
  fn load_from_env(mode: Mode) -> Config {
    dotenv().ok();
    let ip = env
      ::var("IP")
      .ok()
      .unwrap_or_else(|| {
        info!("IP not found in .env file. Using default IP.");
        return "127.0.0.1".to_string();
      });
    let port = env
      ::var("PORT")
      .ok()
      .unwrap_or_else(|| {
        info!("Port not found in .env file. Using default port.");
        return "8080".to_string();
      })
      .parse::<u16>()
      .unwrap_or_else(|_port| {
        error!("Failed to parse port. Using default port.");
        return 8080;
      });

    Config {
      ip,
      port,
      mode,
      db_path: "./db.db".to_string(),
      script: "rag.py".to_string(),
    }
  }

  fn load_from_docker(mode: Mode) -> Config {
    Config {
      ip: "0.0.0.0".to_string(),
      port: 3000,
      mode,
      db_path: "./data/db.db".to_string(),
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
      db_path: format!("./tests/dbs/{}", path),
      script: "call_test.py".to_string(),
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
