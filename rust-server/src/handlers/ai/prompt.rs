use axum::{ extract::State, http::StatusCode, Json };
use crate::{
  config::Config,
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
use tracing::{ error, info };

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
  let prompt = payload.prompt.clone();

  info!("Trying to find prompt in database.");
  let search_result = handle_vector_search(&config, &prompt).await;
  match search_result {
    Ok(VectorSearchResult::Existing(id)) => {
      info!("Prompt found in database with id: {}", id);
      let db_connection = config.db_connection.clone();
      info!("Trying to find answer in database.");
      let query_result = find_answer(&db_connection, id).await;
      if let Err(err) = query_result {
        if err.message() == "Query Error: No answer found".to_string() {
          info!("No answer found in database. Generating a new one.");
          return handle_generate_answer(config, prompt, id).await;
        }
        error!("Error: {:?}", err.log_message());
        return (StatusCode::INTERNAL_SERVER_ERROR, Json(AIPromptResponse::Error(err.message())));
      }
      let (id, answer) = query_result.unwrap();
      info!("Answer found in database with id: {}", id);
      return (
        StatusCode::OK,
        Json(AIPromptResponse::Success(AIPromptResponseData { id, response: answer })),
      );
    }
    Ok(VectorSearchResult::New(id)) => {
      info!("Prompt not found in database, made a new entry.");
      return handle_generate_answer(config, prompt, id).await;
    }

    Err(err) => {
      error!("Error: {:?}", err);
      return (StatusCode::INTERNAL_SERVER_ERROR, Json(AIPromptResponse::Error(err.to_string())));
    }
  }
}

/// Handles the generation of an answer for the prompt and converts the result to
/// the appropriate response.
///
/// # Arguments
///
/// * `config` - The server [`Config`].
/// * `prompt` - The prompt from the payload.
/// * `id` - The ID of the prompt.
///
/// # Returns
///
/// A tuple containing the [`StatusCode`] and the [`AIPromptResponse`] as JSON.
async fn handle_generate_answer(
  config: Config,
  prompt: String,
  id: i32
) -> (StatusCode, Json<AIPromptResponse>) {
  info!("Trying to generate answer for prompt.");
  let response = handle_prompt_request(&config, &prompt);
  match response {
    Ok(answer) => {
      info!("Answer generated successfully.");
      return handle_db_insert(config, id, answer).await;
    }
    Err(err) => {
      error!("Error: {:?}", err);
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
  let db_connection = config.db_connection.clone();

  info!("Trying to insert answer for prompt with id: {}", prompt_id);
  let result = insert_answer(&db_connection, prompt_id, &response).await;

  match result {
    Ok(id) => {
      info!("Answer inserted successfully.");
      return (
        StatusCode::OK,
        Json(AIPromptResponse::Success(AIPromptResponseData { id, response })),
      );
    }
    Err(err) => {
      error!("Error: {:?}", err.log_message());
      return (StatusCode::INTERNAL_SERVER_ERROR, Json(AIPromptResponse::Error(err.message())));
    }
  }
}
