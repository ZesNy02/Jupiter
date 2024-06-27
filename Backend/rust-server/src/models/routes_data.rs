use serde::{ Deserialize, Serialize };

// --------------------------- Start of Request Structs ---------------------------
/// Represents the request payload for the
/// [`ai/prompt`][crate::handlers::ai::prompt] route.
#[derive(Deserialize, Serialize)]
pub struct AIPromptRequest {
  /// The prompt to send to the AI model.
  pub prompt: String,
}

/// Represents the request payload for the
/// [`ai/rating`][crate::handlers::ai::rating] route.
#[derive(Deserialize, Serialize)]
pub struct AIRatingRequest {
  /// The id of the answer from the Database.
  pub id: i32,
  /// The rating to give to the answer.
  pub rating: i32,
}

/// Represents the request payload for the
/// [`ai/regenerate`][crate::handlers::ai::regenerate] route.
#[derive(Deserialize, Serialize)]
pub struct AIRegenerateRequest {
  /// The prompt to send to the AI model.
  pub prompt: String,
}

/// Represents the request payload for the
/// [`ai/eventstorming`][crate::handlers::ai::eventstorming] route.
#[derive(Deserialize, Serialize)]
pub struct AIEventStormingRequest {
  /// The prompt to send to the AI model.
  pub prompt: String,
}

// --------------------------- End of Request Structs ---------------------------

// --------------------------- Start of Response Structs ---------------------------

/// Represents the response for the
/// [`ai/prompt`][crate::handlers::ai::prompt] route.
#[derive(Deserialize, Serialize)]
pub struct AIPromptResponseData {
  /// The ID of the answer in the Database.
  pub id: i32,
  /// The response from the AI model.
  pub response: String,
}

/// Represents the response for the
/// [`ai/rating`][crate::handlers::ai::rating] route.
#[derive(Deserialize, Serialize)]
pub struct AIRatingResponseData {
  /// A message indicating the success of the rating operation.
  pub message: String,
}

/// Represents the response for the
/// [`ai/regenerate`][crate::handlers::ai::regenerate] route.
#[derive(Deserialize, Serialize)]
pub struct AIRegenerateResponseData {
  /// The ID of the answer in the Database.
  pub id: i32,
  /// The response from the AI model.
  pub response: String,
}

/// Represents the response for the
/// [`ai/eventstorming`][crate::handlers::ai::eventstorming] route.
#[derive(Deserialize, Serialize)]
pub struct AIEventStormingResponseData {
  /// The response from the AI model.
  pub message: String,
}

// --------------------------- End of Response Structs ---------------------------

// --------------------------- Start of Reponse Enums ---------------------------

/// Represents the response or error for the
/// [`ai/prompt`][crate::handlers::ai::prompt] route.
#[derive(Deserialize, Serialize)]
pub enum AIPromptResponse {
  /// Represents a successful response.
  Success(AIPromptResponseData),
  /// Represents an error response.
  Error(String),
}

/// Represents the response or error for the
/// [`ai/rating`][crate::handlers::ai::rating] route.
#[derive(Deserialize, Serialize)]
pub enum AIRatingResponse {
  /// Represents a successful response.
  Success(AIRatingResponseData),
  /// Represents an error response.
  Error(String),
}

/// Represents the response or error for the
/// [`ai/regenerate`][crate::handlers::ai::regenerate] route.
#[derive(Deserialize, Serialize)]
pub enum AIRegenerateResponse {
  /// Represents a successful response.
  Success(AIRegenerateResponseData),
  /// Represents an error response.
  Error(String),
}

/// Represents the response or error for the
/// [`ai/eventstorming`][crate::handlers::ai::eventstorming] route.
#[derive(Deserialize, Serialize)]
pub enum AIEventStormingResponse {
  /// Represents a successful response.
  Success(AIEventStormingResponseData),
  /// Represents an error response.
  Error(String),
}

// --------------------------- End of Reponse Enums ---------------------------

// --------------------------- Start of Enums ---------------------------

/// Represents the result of a vector search operation in
/// [`testable_handle_prompt_post`][crate::handlers::ai::prompt::testable_handle_prompt_post].
pub enum VectorSearchResult {
  // Represents if the the prompt was already in the database.
  Existing(i32),
  // Represents if the prompt was not in the database.
  New(i32),
}

// --------------------------- End of Enums ---------------------------
