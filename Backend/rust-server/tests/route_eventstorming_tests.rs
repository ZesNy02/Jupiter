#[cfg(test)]
mod tests {
  use rust_server::{
    config::Config,
    handlers::ai::regenerate::testable_handle_regenerate_post,
    models::routes_data::AIRegenerateRequest,
  };
  use axum::http::StatusCode;
  use sequential_test::sequential;
  use tokio::runtime::Runtime;

  // Needs the environment variables to be set for the Config.

  // Test if the eventstorming handler is working correctly.
  #[test]
  #[sequential]
  fn test_handle_eventstorming_request_success() {
    let config = Config::load_from_env();
    let payload = AIRegenerateRequest {
      prompt: "What is the prooph-board?".to_string(),
    };

    let rt = Runtime::new().unwrap();

    let (status, _) = rt.block_on(testable_handle_regenerate_post(config, payload));
    assert_eq!(status, StatusCode::OK);
  }
}
