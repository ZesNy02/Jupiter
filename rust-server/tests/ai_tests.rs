#[cfg(test)]
mod test {
  use axum::http::StatusCode;
  use rust_server::config::Config;
  use rust_server::handlers::ai::*;
  use rust_server::models::routes_data::{ AIResponse, PromptRequest };
  use rust_server::utils::sqlite::drop_table;

  #[test]
  fn test_errors() {
    let config = Config::_dummy_sqlite("tests_ai_handler.db".to_string());
    let (code, _) = handle_ai(&config, PromptRequest { message: "error".to_string() });
    assert_eq!(code, StatusCode::INTERNAL_SERVER_ERROR);
    let config = Config::_dummy_python("some.py".to_string());
    let (code, _) = handle_ai(&config, PromptRequest { message: "error".to_string() });
    assert_eq!(code, StatusCode::INTERNAL_SERVER_ERROR);
  }

  #[test]
  fn test_ai() {
    let config = Config::_dummy_sqlite("tests_ai_handler.db".to_string());
    let _ = drop_table(&config);
    let (code, response) = handle_ai(&config, PromptRequest { message: "hello".to_string() });
    assert_eq!(code, StatusCode::OK);
    match response {
      AIResponse::Success(data) => {
        assert_eq!(data.id, 1);
        assert_eq!(data.response, "World\r\n".to_string());
      }
      _ => assert!(false),
    }
  }
}
