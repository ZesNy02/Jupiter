use serde::{ Deserialize, Serialize };

use super::database::Prompt;

#[derive(Deserialize)]
#[derive(Serialize)]
pub struct PromptList {
  pub prompts: Vec<Prompt>,
}

#[derive(Deserialize)]
#[derive(Serialize)]
pub struct PromptResponse {
  pub id: i64,
  pub response: String,
}

#[derive(Deserialize)]
#[derive(Serialize)]
pub struct PromptRequest {
  pub message: String,
}

#[derive(Deserialize)]
#[derive(Serialize)]
pub struct DBEditRequest {
  pub id: i64,
  pub usefull: bool,
}

#[derive(Deserialize)]
#[derive(Serialize)]
pub enum DBFetchResponse {
  Error(String),
  Success(PromptList),
}

#[derive(Deserialize)]
#[derive(Serialize)]
pub enum AIResponse {
  Error(String),
  Success(PromptResponse),
}
