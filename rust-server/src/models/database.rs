use serde::{ Deserialize, Serialize };

#[derive(PartialEq)]
#[derive(Debug)]
pub enum DBError {
  ConnectionError,
  TableCreationError,
  QueryError,
  InsertError,
  UpdateError,
}

pub type Result<T> = std::result::Result<T, DBError>;

#[derive(PartialEq)]
#[derive(Debug)]
#[derive(Deserialize)]
#[derive(Serialize)]
pub struct Prompt {
  pub id: i64,
  pub prompt: String,
  pub response: String,
  pub usefull: bool,
}

impl Prompt {
  pub fn new(id: i64, prompt: String, response: String, usefull: bool) -> Prompt {
    Prompt {
      id,
      prompt,
      response,
      usefull,
    }
  }
  pub fn to_string(&self) -> String {
    format!("{}, usefull {}: {} -> {}", self.id, self.usefull, self.prompt, self.response)
  }
}
