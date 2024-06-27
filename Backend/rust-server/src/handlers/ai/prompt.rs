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
/// This is done to allow the functionality to be tested with
/// Rust's built-in testing framework.
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
/// This function tries to find the prompt in the database and generates
/// a new answer if the prompt is new, otherwise it returns
/// the answer from the database via the [`find_answer`] function
///
/// # Arguments
///
/// * `config` - The server configuration.
/// * `payload` - The [`AIPromptRequest`] payload.
///
/// # Returns
///
/// A tuple containing the [`StatusCode`] and the [`AIPromptResponse`] as JSON.
///
/// # Debug
///
/// This function logs the following:
/// - An info message before trying to find the prompt in the database as
/// `info` in the format `Trying to find prompt in database.`.
/// - An info message when the prompt is found in the database as `info` in the
/// format `Prompt found in database with id: <prompt_id>`.
/// - An info message before trying to find the answer in the database as
/// `info` in the format `Trying to find answer in database.`.
/// - An info message when no answer is found in the database as `info` in the
/// format `No answer found in database. Generating a new one.`.
/// - An info message when the answer is found in the database as `info` in the
/// format `Answer found in database with id: <answer_id>`.
/// - An info message when the prompt is not found in the database as `info` in the
/// format `Prompt not found in database, made a new entry.`.
/// - An error message when the response is an error as `error` in the
/// format `Error: <error>`.
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
///
/// # Debug
///
/// This function logs the following:
/// - An info message before trying to generate the answer as `info` in the
/// format `Trying to generate answer for prompt with id <prompt_id>.`.
/// - An info message when the answer is generated successfully as `info` in the
/// format `Answer for prompt with id <prompt_id> generated successfully.`.
/// - An error message when the response is an error as `error` in the
/// format `Error: <error>`.
async fn handle_generate_answer(
  config: Config,
  prompt: String,
  id: i32
) -> (StatusCode, Json<AIPromptResponse>) {
  info!("Trying to generate answer for prompt with id {}.", id);

  let response = handle_prompt_request(&config, &prompt);

  match response {
    Ok(answer) => {
      info!("Answer for prompt with id {} generated successfully.", id);
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
///
/// # Debug
///
/// This function logs the following:
/// - An info message before trying to insert the answer as `info` in the
/// format `Trying to insert answer for prompt with id: <prompt_id>`.
/// - An info message when the answer is inserted successfully as `info` in the
/// format `Answer for prompt with id <prompt_id> inserted successfully
/// with id <answer_id>.`.
/// - An error message when the answer insertion fails as `error` in the
/// format `Error: <error>`.
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
      info!("Answer for prompt with id {} inserted successfully with id {}.", prompt_id, id);
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
