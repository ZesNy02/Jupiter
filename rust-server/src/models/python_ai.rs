/// Represents the possible errors that can occur in the AI module.
#[derive(PartialEq)]
#[derive(Debug)]
pub enum PythonError {
  /// Error related to the file path.
  PathError(String),
  /// Error related to the execution of the script.
  ScriptError(String),
  /// Error related to input/output operations.
  IOError(String),
  /// Error related to the repsonse from the script.
  ResponseError(String),
}

impl PythonError {
  /// Returns a string representation of the error.
  pub fn to_string(&self) -> String {
    match self {
      PythonError::PathError(message) => format!("Path Error: {}", message),
      PythonError::ScriptError(message) => format!("Script Error: {}", message),
      PythonError::IOError(message) => format!("IO Error: {}", message),
      PythonError::ResponseError(message) => format!("Empty Response: {}", message),
    }
  }
}

/// A specialized `Result` type for the AI module.
pub type Result<T> = std::result::Result<T, PythonError>;
