use axum::{ extract::State, http::StatusCode, Json };
use crate::{
  config::{ Config, Mode },
  models::routes_data::{
    AIPromptRequest,
    AIPromptResponse,
    AIPromptResponseData,
    VectorSearchResult,
  },
  utils::{
    postgres::{ find_answer, insert_answer },
    python::{ handle_prompt_request, handle_vector_search },
  },
};
use tracing::error;

/// Bridges the [`testable_handle_prompt_post`] to the Axum Router.
///
/// This is done to allow the functionality to be tested with Rust's built-in testing framework.
///
/// # Route
///
/// Handels the `ai/prompt` **POST** route.
pub async fn handle_prompt_post(
  State(config): State<Config>,
  Json(payload): Json<AIPromptRequest>
) -> (StatusCode, Json<AIPromptResponse>) {
  return testable_handle_prompt_post(config, payload).await;
}

/// Handles the AI prompt request.
///
/// # Arguments
///
/// * `config` - The server configuration.
/// * `payload` - The [`AIPromptRequest`] payload.
///
/// # Returns
///
/// A tuple containing the [`StatusCode`] and the [`AIPromptResponse`] as JSON.
pub async fn testable_handle_prompt_post(
  config: Config,
  payload: AIPromptRequest
) -> (StatusCode, Json<AIPromptResponse>) {
  let mode = config.mode.clone();
  let prompt = payload.prompt.clone();
  let search_result = handle_vector_search(&config, &prompt);
  match search_result {
    Ok(VectorSearchResult::Existing(id)) => {
      let db_connection = config.db_connection.clone();
      let query_result = find_answer(&db_connection, id).await;
      if let Err(err) = query_result {
        if mode == Mode::Dev {
          error!("Error: {:?}", err.log_message());
        }
        return (StatusCode::INTERNAL_SERVER_ERROR, Json(AIPromptResponse::Error(err.message())));
      }
      let (id, answer) = query_result.unwrap();
      return (
        StatusCode::OK,
        Json(AIPromptResponse::Success(AIPromptResponseData { id, response: answer })),
      );
    }
    Ok(VectorSearchResult::New(id)) => {
      let prompt = payload.prompt.clone();
      // TODO parse llm url
      let response = handle_prompt_request(&config, &prompt);
      match response {
        Ok(answer) => {
          return handle_db_insert(config, id, answer).await;
        }
        Err(err) => {
          if mode == Mode::Dev {
            error!("Error: {:?}", err);
          }
          return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(AIPromptResponse::Error(err.to_string())),
          );
        }
      }
    }

    Err(err) => {
      if mode == Mode::Dev {
        error!("Error: {:?}", err);
      }
      return (StatusCode::INTERNAL_SERVER_ERROR, Json(AIPromptResponse::Error(err.to_string())));
    }
  }
}

/// Handels the database insert operation for the answer and converts the result to
/// the appropriate response.
///
/// # Arguments
///
/// * `config` - The server [`Config`].
/// * `prompt_id` - The ID of the prompt.
/// * `response` - The response from the AI.
///
/// # Returns
///
/// A tuple containing the [`StatusCode`] and the [`AIPromptResponse`] as JSON.
async fn handle_db_insert(
  config: Config,
  prompt_id: i32,
  response: String
) -> (StatusCode, Json<AIPromptResponse>) {
  let mode = config.mode.clone();
  let db_connection = config.db_connection.clone();

  let result = insert_answer(&db_connection, prompt_id, &response).await;

  match result {
    Ok(id) => {
      return (
        StatusCode::OK,
        Json(AIPromptResponse::Success(AIPromptResponseData { id, response })),
      );
    }
    Err(err) => {
      if mode == Mode::Dev {
        error!("Error: {:?}", err.log_message());
      }
      return (StatusCode::INTERNAL_SERVER_ERROR, Json(AIPromptResponse::Error(err.message())));
    }
  }
}
