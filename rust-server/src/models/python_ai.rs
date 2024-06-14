/// Represents the possible errors that can occur in the AI module.
#[derive(PartialEq)]
#[derive(Debug)]
pub enum AIError {
  /// Error related to the file path.
  PathError(String),
  /// Error related to the execution of the script.
  ScriptError(String),
  /// Error related to input/output operations.
  IOError(String),
  /// Error indicating an empty response from the AI.
  EmptyResponse(String),
}

impl AIError {
  /// Returns a string representation of the error.
  pub fn to_string(&self) -> String {
    match self {
      AIError::PathError(message) => format!("Path Error: {}", message),
      AIError::ScriptError(message) => format!("Script Error: {}", message),
      AIError::IOError(message) => format!("IO Error: {}", message),
      AIError::EmptyResponse(message) => format!("Empty Response: {}", message),
    }
  }
}

/// A specialized `Result` type for the AI module.
pub type Result<T> = std::result::Result<T, AIError>;
