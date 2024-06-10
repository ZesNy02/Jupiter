use serde::{ Deserialize, Serialize };

use super::database::Prompt;

/// Represents a list of prompts.
#[derive(Deserialize)]
#[derive(Serialize)]
pub struct PromptList {
  pub prompts: Vec<Prompt>,
}

/// Represents a response to a prompt from the AI.
#[derive(Deserialize)]
#[derive(Serialize)]
pub struct PromptResponse {
  pub id: i64,
  pub response: String,
}

/// Represents a request for a prompt.
#[derive(Deserialize)]
#[derive(Serialize)]
pub struct PromptRequest {
  pub message: String,
}

/// Represents a request to edit a prompt in the database.
#[derive(Deserialize)]
#[derive(Serialize)]
pub struct DBEditRequest {
  pub id: i64,
  pub usefull: bool,
}

/// Represents the response when fetching prompts from the database.
#[derive(Deserialize)]
#[derive(Serialize)]
pub enum DBFetchResponse {
  /// Represents an error response.
  Error(String),
  /// Represents a successful response with a list of prompts.
  Success(PromptList),
}

/// Represents the response from the AI model.
#[derive(Deserialize)]
#[derive(Serialize)]
pub enum AIResponse {
  /// Represents an error response.
  Error(String),
  /// Represents a successful response with a prompt response.
  Success(PromptResponse),
}
