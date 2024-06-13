/// Represents the possible errors that can occur in the AI module.
#[derive(PartialEq)]
#[derive(Debug)]
pub enum AIError {
  /// Error related to the file path.
  PathError,
  /// Error related to the execution of the script.
  ScriptError,
  /// Error related to input/output operations.
  IOError,
  /// Error indicating an empty response from the AI.
  EmptyResponse,
}

/// A specialized `Result` type for the AI module.
pub type Result<T> = std::result::Result<T, AIError>;
