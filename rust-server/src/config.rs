use dotenv::dotenv;
use tracing::{ error, info };
use std::env;

use crate::models::database::DBConnectionInfo;

/// Represents the configuration settings.
#[derive(PartialEq, Debug, Clone)]
pub struct Config {
  /// The IP address of the server.
  pub ip: String,
  /// The port of the server.
  pub port: u16,
  /// The connection information for the PostgreSQL database.
  pub db_connection: DBConnectionInfo,
  /// The connection string for the LLM Server (Ollama).
  pub llm_connection: String,
  /// The path to the Python RAG script file.
  pub rag_script: String,
  /// The path to the Python vector query script file.
  pub vector_query_script: String,
  /// The path to the Python event storming script file.
  pub event_storming_script: String,
}

impl Config {
  /// Loads the configuration from environment variables.
  ///
  /// # Returns
  ///
  /// The loaded configuration.
  ///
  /// # Environment Variables
  ///
  /// The following environment variables are used to load the configuration,
  /// and the ones in **bold** are required, if they are not found
  /// the function will panic:
  /// - **`DB_HOST`**: The host/ip of the PostgreSQL database.
  /// - **`DB_NAME`**: The name of the PostgreSQL database.
  /// - **`DB_USER`**: The username for the PostgreSQL database.
  /// - **`DB_PASSWORD`**: The password for the PostgreSQL database.
  /// - **`LLM_SERVER`**: The connection url for the LLM Server (Ollama).
  /// - `IP`: The IP address of the server. Defaults to `127.0.0.1`.
  /// - `PORT`: The port of the server. Defaults to `3000`.
  /// - `DB_PORT`The port of the PostgreSQL database. Defaults to `5432`.
  ///
  /// # Panics
  ///
  /// - Panics if the [DBConnectionInfo] cannot be loaded
  /// from the environment variables.
  /// - Panics if the LLM Server connection cannot be loaded
  /// from the environment variables.
  pub fn load_from_env() -> Config {
    dotenv().ok();
    let db_host = env::var("DB_HOST").expect("Couldn't find DB_HOST in environment variables");
    let db_name = env::var("DB_NAME").expect("Couldn't find DB_NAME in environment variables");
    let db_user = env::var("DB_USER").expect("Couldn't find DB_USER in environment variables");
    let db_password = env
      ::var("DB_PASSWORD")
      .expect("Couldn't find DB_PASSWORD in environment variables");

    let llm_server = env
      ::var("LLM_SERVER")
      .expect("Couldn't find LLM_SERVER in environment variables");

    // load IP of the Server from the environment variables or default to 127.0.0.1
    let ip = env
      ::var("IP")
      .ok()
      .unwrap_or_else(|| {
        info!("IP not found in .env file. Using default IP 127.0.0.1.");
        return "127.0.0.1".to_string();
      });

    // load Port of the Server from the environment variables or default to 3000
    let port = env
      ::var("PORT")
      .ok()
      .unwrap_or_else(|| {
        info!("Port not found in .env file. Using default port 3000.");
        return "3000".to_string();
      })
      .parse::<u16>()
      .unwrap_or_else(|_port| {
        error!("Failed to parse port. Using default port 3000.");
        return 3000;
      });

    // load Port of the Database from the environment variables or default to 5432
    let db_port = env
      ::var("DB_PORT")
      .ok()
      .unwrap_or_else(|| {
        info!("DB_PORT not found in .env file. Using default port 5432.");
        return "5432".to_string();
      })
      .parse::<u16>()
      .unwrap_or_else(|_port| {
        error!("Failed to parse DB_PORT. Using default port 5432.");
        return 5432;
      });

    Config {
      ip,
      port,
      db_connection: DBConnectionInfo::new(db_host, db_port, db_name, db_user, db_password),
      llm_connection: llm_server,
      rag_script: "./scripts/python/ai/run_rag.py".to_string(),
      vector_query_script: "./scripts/python/ai/vector_query.py".to_string(),
      event_storming_script: "./scripts/python/ai/storming.py".to_string(),
    }
  }

  /// Gets the IP address and port of the server formatted as `IP:PORT`.
  pub fn get_ported_ip(&self) -> String {
    return format!("{}:{}", self.ip, self.port);
  }

  /// Gets the connection string for the database.
  ///
  /// Formatted as `host=HOST port=PORT dbname=DB_NAME user=DB_USER password=DB_PASSWORD`.
  pub fn get_db_connection_string(&self) -> String {
    return self.db_connection.to_string();
  }
}
