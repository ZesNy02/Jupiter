/// This module contains the AI routes handlers and testable handler functions.
/// The AI routes handlers handle incoming HTTP requests related to AI operations,
/// while the testable handler functions provide the core logic for handling AI requests.
/// The module also includes a function for adding prompts and responses to a database.

use axum::{ extract::State, http::StatusCode, Json };
use tracing::{ error, info };
use crate::{
  config::{ Config, Mode },
  models::{
    database::DBError,
    python_ai::PythonError,
    routes_data::{ AIResponse, AIPromptRequest, AIPromptResponse },
  },
  utils::{ python::run_ai, sqlite::insert_prompt },
};

// --- Start of AI routes handlers: ---

/// Handles the HTTP POST request for AI operations.
/// Retrieves the AI configuration from the application state,
/// and the request payload from the JSON body.
/// Returns the HTTP status code and the AI response as JSON.
pub async fn handle_ai_post(
  State(config): State<Config>,
  Json(payload): Json<AIPromptRequest>
) -> (StatusCode, Json<AIResponse>) {
  let (status, response) = handle_ai(&config, payload);
  return (status, Json(response));
}

/// A dummy handler for testing purposes.
/// Returns a successful response with a modified version of the request message.
pub async fn handle_ai_dummy_ok(Json(payload): Json<AIPromptRequest>) -> (
  StatusCode,
  Json<AIResponse>,
) {
  let (status, response) = (
    StatusCode::OK,
    AIResponse::Success(AIPromptResponse {
      id: 0,
      response: "The Response text which is **incredible** will be:".to_string() + &payload.message,
    }),
  );
  return (status, Json(response));
}

/// A dummy handler for testing purposes.
/// Returns an internal server error response with a dummy error message.
pub async fn handle_ai_dummy_err() -> (StatusCode, Json<AIResponse>) {
  let (status, response) = (
    StatusCode::INTERNAL_SERVER_ERROR,
    AIResponse::Error("This is a dummy error message".to_string()),
  );
  return (status, Json(response));
}
// --- End of AI routes handlers ---

//--- Start of Testable handler functions: ---

/// Handles the AI request by running the AI model with the given prompt.
/// Takes the AI configuration and the request payload as parameters.
/// Returns the HTTP status code and the AI response.
pub fn handle_ai(config: &Config, payload: AIPromptRequest) -> (StatusCode, AIResponse) {
  let mode = config.mode.clone();
  let message = payload.message.clone();
  if mode == Mode::Dev {
    info!("Running AI with prompt: {}", message);
  }
  let response = run_ai("Some".to_string(), message.clone());
  match response {
    Ok(response) => {
      if mode == Mode::Dev {
        info!("AI response: {}", response);
      }
      let res = add_to_db(config, message.clone(), response.clone());
      match res {
        Ok(id) => {
          if mode == Mode::Dev {
            info!(
              "Added prompt and response to database.\nPrompt: {}\nResponse: {}",
              message,
              response
            );
          }
          return (StatusCode::OK, AIResponse::Success(AIPromptResponse { id, response }));
        }
        Err(e) => {
          error!("Error while attempting Database operation: {}", e);
          if mode == Mode::Dev {
            info!(
              "Could not add prompt and response to database:\nPrompt: {}\nResponse: {}",
              message,
              response
            );
          }
          return (StatusCode::OK, AIResponse::Success(AIPromptResponse { id: -1, response }));
        }
      }
    }
    Err(e) => {
      match e {
        PythonError::PathError(some) => {
          error!("Could not find the python script");
          return (
            StatusCode::INTERNAL_SERVER_ERROR,
            AIResponse::Error("Could not find the python script".to_string()),
          );
        }
        PythonError::ScriptError(some) => {
          error!("Error while running the python script");
          return (
            StatusCode::INTERNAL_SERVER_ERROR,
            AIResponse::Error("Error while running the python script".to_string()),
          );
        }
        PythonError::IOError(some) => {
          error!("Error while reading the python script");
          return (
            StatusCode::INTERNAL_SERVER_ERROR,
            AIResponse::Error("Error while reading the python script".to_string()),
          );
        }
        PythonError::EmptyResponse(some) => {
          error!("Empty response from the python script");
          return (
            StatusCode::INTERNAL_SERVER_ERROR,
            AIResponse::Error("Empty response from the python script".to_string()),
          );
        }
      }
    }
  }
}

/// Adds the prompt and response to the database.
/// Takes the AI configuration, prompt message, and AI response as parameters.
/// Returns the ID of the inserted prompt if successful, or an error message if unsuccessful.
fn add_to_db(config: &Config, message: String, response: String) -> Result<i64, String> {
  let res = insert_prompt(&config, &message, &response);
  match res {
    Ok(id) => {
      return Ok(id);
    }
    Err(e) => {
      match e {
        DBError::ConnectionError(message, e) => {
          return Err("Could not open Database".to_string());
        }
        DBError::TableCreationError(some, e) => {
          return Err("Could not create table".to_string());
        }
        DBError::InsertError(some, e) => {
          return Err("Could not insert prompt".to_string());
        }
        _ => {
          return Err("Something that should never happen.".to_string());
        }
      }
    }
  }
}
//--- End of Testable handler functions ---
