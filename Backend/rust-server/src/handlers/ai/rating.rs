use axum::{ extract::State, http::StatusCode, Json };

use crate::{
  config::Config,
  models::routes_data::{ AIRatingRequest, AIRatingResponse, AIRatingResponseData },
  utils::postgres::update_rating,
};

use tracing::{ error, info };

/// Bridges the [`testable_handle_rating_post`] to the Axum Router.
///
/// This is done to allow the functionality to be tested with
/// Rust's built-in testing framework.
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
/// This function updates the rating of an answer in the database and
/// sends a response back to the client.
///
/// # Arguments
///
/// * `config` - The server [`Config`].
/// * `payload` - The [`AIRatingRequest`] payload.
///
/// # Returns
///
/// A tuple containing the [`StatusCode`] and the [`AIRatingResponse`] as JSON.
///
/// # Debug
///
/// This function logs the following:
/// - An info message before trying to modify the rating as `info` in the
/// format `Trying to modify rating for answer with id: <answer_id>`.
/// - An info message when the rating of an answer is changed successfully as `info`
/// in the format `Rating of answer with id <answer_id> changed successfully.`.
/// - An error message when the rating of an answer fails as `error` in the
/// format `Error: <error>`.
pub async fn testable_handle_rating_post(
  config: Config,
  payload: AIRatingRequest
) -> (StatusCode, Json<AIRatingResponse>) {
  let db_connection = config.db_connection.clone();
  let answer_id = payload.id;
  let rating = payload.rating;

  info!("Trying to modify rating for answer with id: {}", answer_id);

  let result = update_rating(&db_connection, answer_id, rating).await;

  match result {
    Ok(_) => {
      info!("Rating of answer with id {} changed successfully.", answer_id);
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
      error!("Error: {:?}", err.log_message());
      return (StatusCode::INTERNAL_SERVER_ERROR, Json(AIRatingResponse::Error(err.message())));
    }
  }
}
