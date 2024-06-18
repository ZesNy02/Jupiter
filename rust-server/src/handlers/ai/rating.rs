use axum::{ extract::State, http::StatusCode, Json };

use crate::{
  config::{ Config, Mode },
  models::routes_data::{ AIRatingRequest, AIRatingResponse, AIRatingResponseData },
  utils::postgres::update_rating,
};

use tracing::error;

/// Bridges the [`testable_handle_rating_post`] to the Axum Router.
///
/// This is done to allow the functionality to be tested with Rust's built-in testing framework.
///
/// # Route
///
/// Handels the `ai/rating` **POST** route.
pub async fn handle_rating_post(
  State(config): State<Config>,
  Json(payload): Json<AIRatingRequest>
) -> (StatusCode, Json<AIRatingResponse>) {
  return testable_handle_rating_post(config, payload).await;
}

/// Handles the AI rating request.
///
/// # Arguments
///
/// * `config` - The server [`Config`].
/// * `payload` - The [`AIRatingRequest`] payload.
///
/// # Returns
///
/// A tuple containing the [`StatusCode`] and the [`AIRatingResponse`] as JSON.
pub async fn testable_handle_rating_post(
  config: Config,
  payload: AIRatingRequest
) -> (StatusCode, Json<AIRatingResponse>) {
  let mode = config.mode.clone();
  let db_connection = config.db_connection.clone();
  let answer_id = payload.id;
  let rating = payload.rating;
  let result = update_rating(&db_connection, answer_id, rating).await;
  match result {
    Ok(_) => {
      return (
        StatusCode::OK,
        Json(
          AIRatingResponse::Success(AIRatingResponseData {
            message: "Rating changed successfully.".to_string(),
          })
        ),
      );
    }
    Err(err) => {
      if mode == Mode::Dev {
        error!("Error: {:?}", err.log_message());
      }
      return (StatusCode::INTERNAL_SERVER_ERROR, Json(AIRatingResponse::Error(err.message())));
    }
  }
}
