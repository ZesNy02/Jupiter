#[derive(PartialEq)]
#[derive(Debug)]
pub enum AIError {
  PathError,
  ScriptError,
  IOError,
  EmptyResponse,
}

pub type Result<T> = std::result::Result<T, AIError>;
