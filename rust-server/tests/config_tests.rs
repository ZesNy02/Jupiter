#[cfg(test)]
mod tests {
  use rust_server::config::{ Config, Mode, get_config };

  #[test]
  fn test_get_config_env() {
    let config = get_config(Mode::Dev, false);
    assert_eq!(config, Config {
      ip: "127.0.0.1".to_string(),
      port: 3000,
      mode: Mode::Dev,
      db_path: "./db.db".to_string(),
      script: "rag.py".to_string(),
    });
  }

  #[test]
  fn test_get_config_docker() {
    let config = get_config(Mode::Prod, true);
    assert_eq!(config, Config {
      ip: "0.0.0.0".to_string(),
      port: 3000,
      mode: Mode::Prod,
      db_path: "./data/db.db".to_string(),
      script: "rag.py".to_string(),
    });
  }

  #[test]
  fn test_get_db_path() {
    let config = get_config(Mode::Dev, false);
    assert_eq!(config.get_db_path(), "./db.db");
    let config = get_config(Mode::Prod, true);
    assert_eq!(config.get_db_path(), "./data/db.db");
  }
}
