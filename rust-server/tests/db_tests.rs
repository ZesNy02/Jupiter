#[cfg(test)]
mod test {
  use axum::http::StatusCode;
  use rust_server::config::Config;
  use rust_server::handlers::db::*;
  use rust_server::models::database::Prompt;
  use rust_server::models::routes_data::{ DBEditRequest, DBFetchResponse, PromptList };
  use rust_server::utils::sqlite::*;

  fn make_dummy_entries(config: &Config) {
    let _ = drop_table(&config);
    let _ = insert_prompt(&config, "test1", "test1");
    let _ = insert_prompt(&config, "test2", "test2");
  }

  #[test]
  fn test_db_update() {
    let config = Config::_dummy_sqlite("tests_update_handler.db".to_string());
    make_dummy_entries(&config);

    let (code, _) = handle_edit(&config, DBEditRequest { id: 1, usefull: true });
    assert_eq!(code, StatusCode::OK);

    let (code, _) = handle_edit(&config, DBEditRequest { id: 999, usefull: false });
    assert_eq!(code, StatusCode::INTERNAL_SERVER_ERROR);
  }

  #[test]
  fn test_db_fetch_all() {
    let config = Config::_dummy_sqlite("tests_all_handler.db".to_string());
    make_dummy_entries(&config);

    let (code, list) = handle_fetch(&config, None);
    match list {
      DBFetchResponse::Success(PromptList { prompts }) => {
        assert_eq!(code, StatusCode::OK);
        assert_eq!(prompts.len(), 2);
        assert_eq!(
          prompts,
          vec![
            Prompt::new(1, "test1".to_string(), "test1".to_string(), false),
            Prompt::new(2, "test2".to_string(), "test2".to_string(), false)
          ]
        )
      }
      _ => {
        assert!(false);
      }
    }
  }

  #[test]
  fn test_db_fetch_usefull() {
    let config = Config::_dummy_sqlite("tests_usefull_handler.db".to_string());
    make_dummy_entries(&config);
    let _ = update_prompt(&config, 1, true);

    let (code, list) = handle_fetch(&config, Some(true));
    match list {
      DBFetchResponse::Success(PromptList { prompts }) => {
        assert_eq!(code, StatusCode::OK);
        assert_eq!(prompts.len(), 1);
        assert_eq!(prompts, vec![Prompt::new(1, "test1".to_string(), "test1".to_string(), true)])
      }
      _ => {
        assert!(false);
      }
    }
  }

  #[test]
  fn test_db_fetch_not_usefull() {
    let config = Config::_dummy_sqlite("tests_not_usefull_handler.db".to_string());
    make_dummy_entries(&config);
    let _ = update_prompt(&config, 1, true);

    let (code, list) = handle_fetch(&config, Some(false));
    match list {
      DBFetchResponse::Success(PromptList { prompts }) => {
        assert_eq!(code, StatusCode::OK);
        assert_eq!(prompts.len(), 1);
        assert_eq!(prompts, vec![Prompt::new(2, "test2".to_string(), "test2".to_string(), false)])
      }
      _ => {
        assert!(false);
      }
    }
  }
}
