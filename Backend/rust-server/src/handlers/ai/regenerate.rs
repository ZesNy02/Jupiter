use axum::{ extract::State, http::StatusCode, Json };

use crate::{
  config::Config,
  models::routes_data::{
    AIRegenerateRequest,
    AIRegenerateResponse,
    AIRegenerateResponseData,
    VectorSearchResult,
  },
  utils::{ postgres::insert_answer, python::{ handle_prompt_request, handle_vector_search } },
};

use tracing::{ error, info };

/// Bridges the [`testable_handle_regenerate_post`] to the Axum Router.
///
/// This is done to allow the functionality to be tested with
/// Rust's built-in testing framework.
///
/// # Route
///
/// Handels the `ai/regenerate` **POST** route.
pub async fn handle_regenerate_post(
  State(config): State<Config>,
  Json(payload): Json<AIRegenerateRequest>
) -> (StatusCode, Json<AIRegenerateResponse>) {
  return testable_handle_regenerate_post(config, payload).await;
}

/// Handles the AI regenerate request.
///
/// This function generates a new answer for the given prompt and
/// sends a response back to the client.
///
/// # Arguments
///
/// * `config` - The server [`Config`].
/// * `payload` - The [`AIRegenerateRequest`] payload.
///
/// # Returns
///
/// A tuple containing the [`StatusCode`] and the [`AIRegenerateResponse`] as JSON.
///
/// # Debug
///
/// This function logs the following:
/// - An info message before trying to find the prompt in the database as
/// `info` in the format `Trying to find prompt in database.`.
/// - An info message when the prompt is found in the database as `info` in the
/// format `Prompt found in database with id: <prompt_id>`.
/// - An info message before trying to generate an answer for the prompt as
/// `info` in the format `Trying to generate answer for prompt.`.
/// - An info message when the answer is generated successfully as `info` in the
/// format `Answer generated successfully.`.
/// - An error message when the answer generation fails as `error` in the
/// format `Error: <error>`.
pub async fn testable_handle_regenerate_post(
  config: Config,
  payload: AIRegenerateRequest
) -> (StatusCode, Json<AIRegenerateResponse>) {
  let prompt = payload.prompt.clone();

  info!("Trying to find prompt in database.");

  let search_result = handle_vector_search(&config, &prompt).await;

  if let Err(err) = search_result {
    error!("Error: {:?}", err);
    return (StatusCode::INTERNAL_SERVER_ERROR, Json(AIRegenerateResponse::Error(err.to_string())));
  }

  let id_result = search_result.unwrap();
  let prompt_id = match id_result {
    VectorSearchResult::Existing(id) => id,
    VectorSearchResult::New(id) => id,
  };

  info!("Prompt found in database with id: {}", prompt_id);

  info!("Trying to generate answer for prompt.");

  let result = handle_prompt_request(&config, &prompt);

  match result {
    Ok(answer) => {
      info!("Answer generated successfully.");
      return handle_db_insert(config, prompt_id, answer).await;
    }
    Err(err) => {
      error!("Error: {:?}", err);
      return (
        StatusCode::INTERNAL_SERVER_ERROR,
        Json(AIRegenerateResponse::Error(err.to_string())),
      );
    }
  }
}

/// Handels the database insert operation for the answer and converts
/// the result to the appropriate response.
///
/// # Arguments
///
/// * `config` - The server [`Config`].
/// * `prompt_id` - The ID of the prompt.
/// * `response` - The response from the AI.
///
/// # Returns
///
/// A tuple containing the [`StatusCode`] and the [`AIRegenerateResponse`] as JSON.
///
/// # Debug
///
/// This function logs the following:
/// - An info message before trying to insert the answer as `info` in the
/// format `Trying to insert answer for prompt with id: <prompt_id>`.
/// - An info message when the answer is inserted successfully as `info` in the
/// format `Answer for prompt with id <prompt_id> inserted
/// successfully with id <answer_id>.`.
/// - An error message when the answer insertion fails as `error` in the
/// format `Error: <error>`.
async fn handle_db_insert(
  config: Config,
  prompt_id: i32,
  answer: String
) -> (StatusCode, Json<AIRegenerateResponse>) {
  let db_connection = config.db_connection.clone();

  info!("Trying to insert answer for prompt with id: {}", prompt_id);

  let result = insert_answer(&db_connection, prompt_id, &answer).await;

  match result {
    Ok(answer_id) => {
      info!("Answer for prompt with id {} inserted successfully with id {}.", prompt_id, answer_id);
      return (
        StatusCode::OK,
        Json(
          AIRegenerateResponse::Success(AIRegenerateResponseData {
            id: answer_id,
            response: answer,
          })
        ),
      );
    }
    Err(err) => {
      error!("Error: {:?}", err.log_message());
      return (StatusCode::INTERNAL_SERVER_ERROR, Json(AIRegenerateResponse::Error(err.message())));
    }
  }
}
