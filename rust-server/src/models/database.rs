#[derive(PartialEq)]
#[derive(Debug)]
pub enum DBError {
  ConnectionError,
  TableCreationError,
  QueryError,
  InsertError,
  UpdateError,
  DeleteError,
}

pub type Result<T> = std::result::Result<T, DBError>;

#[derive(PartialEq)]
#[derive(Debug)]
pub struct Prompt {
  id: u32,
  prompt: String,
  response: String,
  usefull: bool,
}

impl Prompt {
  pub fn new(id: u32, prompt: String, response: String, usefull: bool) -> Prompt {
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
