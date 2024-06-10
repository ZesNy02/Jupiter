use dotenv::dotenv;
use tracing::{ error, info };
use std::env;

/// Represents the mode of the configuration.
#[derive(PartialEq)]
#[derive(Debug)]
#[derive(Clone)]
pub enum Mode {
  /// Development mode.
  /// This mode is used for testing and debugging.
  /// It contains additional logging and debugging information.
  Dev,
  /// Production mode.
  /// This mode is used for production deployment.
  /// It contains minimal logging and debugging information.
  Prod,
}

/// Represents the configuration settings.
#[derive(PartialEq)]
#[derive(Debug)]
#[derive(Clone)]
pub struct Config {
  /// The IP address of the server.
  pub ip: String,
  /// The port of the server.
  pub port: u16,
  /// The mode of the configuration.
  pub mode: Mode,
  /// The path to the SQLite database file.
  pub db_path: String,
  /// The name of the Python script file..
  pub script: String,
}

impl Config {
  /// Loads the configuration from environment variables.
  ///
  /// # Arguments
  ///
  /// * `mode` - The [Mode] of the configuration.
  ///
  /// # Returns
  ///
  /// The loaded configuration.
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
        return "3000".to_string();
      })
      .parse::<u16>()
      .unwrap_or_else(|_port| {
        error!("Failed to parse port. Using default port.");
        return 3000;
      });

    Config {
      ip,
      port,
      mode,
      db_path: "./db.db".to_string(),
      script: "rag_query.py".to_string(),
    }
  }

  /// Loads the configuration for Docker environment.
  ///
  /// # Arguments
  ///
  /// * `mode` - The [Mode] of the configuration.
  ///
  /// # Returns
  ///
  /// The loaded configuration.
  fn load_from_docker(mode: Mode) -> Config {
    Config {
      ip: "0.0.0.0".to_string(),
      port: 3000,
      mode,
      db_path: "./data/db.db".to_string(),
      script: "rag.py".to_string(),
    }
  }

  /// Gets the IP address and port of the server formatted as `IP:PORT`.
  pub fn get_ported_ip(&self) -> String {
    return format!("{}:{}", self.ip, self.port);
  }

  /// Gets the path to the SQLite database file.
  pub fn get_db_path(&self) -> String {
    return self.db_path.clone();
  }

  /// Gets the path to the Python script file, located in the directory `./scripts/python/`.
  pub fn get_script_path(&self) -> String {
    return "./scripts/python/".to_string() + &self.script.clone();
  }
}

/// Gets the configuration based on the mode and Docker flag.
///
/// # Arguments
///
/// * `mode` - The [Mode] of the configuration.
/// * `docker` - A flag indicating whether the configuration is for Docker environment.
///
/// # Returns
///
/// The configuration.
pub fn get_config(mode: Mode, docker: bool) -> Config {
  if docker {
    return Config::load_from_docker(mode);
  } else {
    return Config::load_from_env(mode);
  }
}
