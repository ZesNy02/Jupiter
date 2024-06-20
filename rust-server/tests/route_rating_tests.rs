#[cfg(test)]
mod tests {
  use rust_server::{
    config::Config,
    handlers::ai::rating::testable_handle_rating_post,
    models::routes_data::AIRatingRequest,
  };
  use axum::http::StatusCode;
  use sequential_test::sequential;
  use tokio::runtime::Runtime;

  // Needs the environment variables to be set for the Config.^

  // Test if the rating handler is working correctly.
  #[test]
  #[sequential]
  fn test_handle_rating_post_success() {
    let config = Config::load_from_env();
    let payload = AIRatingRequest {
      id: 1,
      rating: 1,
    };

    let rt = Runtime::new().unwrap();

    let (status, _) = rt.block_on(testable_handle_rating_post(config, payload));
    assert_eq!(status, StatusCode::OK);
  }
}
