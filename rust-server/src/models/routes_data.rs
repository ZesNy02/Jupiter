use serde::{ Deserialize, Serialize };

use super::database::DBEntry;

/// Represents a list of prompts.
#[derive(Deserialize)]
#[derive(Serialize)]
pub struct EntryList {
    /// The list of [DBEntry].
    pub prompts: Vec<DBEntry>,
}

/// Represents a response to a prompt from the AI.
#[derive(Deserialize)]
#[derive(Serialize)]
pub struct AIPromptResponse {
    /// The id of the prompt.
    pub id: i64,
    /// The response from the AI.
    pub response: String,
}

/// Represents a request for a prompt.
#[derive(Deserialize)]
#[derive(Serialize)]
pub struct AIPromptRequest {
    /// The prompt to send to the AI.
    pub message: String,
}

/// Represents a request to edit a prompt in the database.
#[derive(Deserialize)]
#[derive(Serialize)]
pub struct DBRatingEditRequest {
    /// The id of the prompt to edit.
    pub id: i64,
    /// The new rating of the prompt.
    pub usefull: bool,
}

/// Represents the response when fetching prompts from the database.
#[derive(Deserialize)]
#[derive(Serialize)]
pub enum DBFetchResponse {
    /// Represents an error response.
    Error(String),
    /// Represents a successful response with a list of prompts.
    Success(EntryList),
}

/// Represents the response from the AI model.
#[derive(Deserialize)]
#[derive(Serialize)]
pub enum AIResponse {
    /// Represents an error response.
    Error(String),
    /// Represents a successful response with a prompt response.
    Success(AIPromptResponse),
}
