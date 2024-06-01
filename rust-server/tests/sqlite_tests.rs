#[cfg(test)]
mod test {
  use rust_server::config::Config;
  use rust_server::models::database::{ DBError, Prompt };
  use rust_server::utils::sqlite::*;

  fn make_config() -> (Config, Config) {
    return (
      Config::_dummy_sqlite("/.,&/)()".to_string()),
      Config::_dummy_sqlite("./tests.db".to_string()),
    );
  }

  #[test]
  fn test_connection() {
    let (errconfig, _config) = make_config();
    // Test connection error
    assert_eq!(insert_prompt(&errconfig, "", ""), Err(DBError::ConnectionError));
    assert_eq!(update_prompt(&errconfig, 0, true), Err(DBError::ConnectionError));
    assert_eq!(fetch_prompts(&errconfig, Some(true)), Err(DBError::ConnectionError));
  }

  #[test]
  fn test_insert_prompt() {
    let (_errconfig, config) = make_config();
    // Test insert success
    assert_eq!(insert_prompt(&config, "test", "test"), Ok(()));

    assert_eq!(drop_table(&config), Ok(()));
  }

  #[test]
  fn test_update_prompt() {
    let (_errconfig, config) = make_config();
    // Test update success
    assert_eq!(insert_prompt(&config, "test", "test"), Ok(()));
    assert_eq!(update_prompt(&config, 1, true), Ok(()));

    assert_eq!(drop_table(&config), Ok(()));
  }

  #[test]
  fn test_fetch_prompts() {
    let (_errconfig, config) = make_config();
    // Test insert success
    assert_eq!(drop_table(&config), Ok(()));
    assert_eq!(insert_prompt(&config, "test1", "test1"), Ok(()));
    assert_eq!(insert_prompt(&config, "test2", "test2"), Ok(()));
    assert_eq!(update_prompt(&config, 1, true), Ok(()));
    assert_eq!(update_prompt(&config, 2, false), Ok(()));
    let prompts = fetch_prompts(&config, None);
    assert_eq!(
      prompts,
      Ok(
        vec![
          Prompt::new(1, "test1".to_string(), "test1".to_string(), true),
          Prompt::new(2, "test2".to_string(), "test2".to_string(), false)
        ]
      )
    );
    assert_eq!(drop_table(&config), Ok(()));
  }
}
