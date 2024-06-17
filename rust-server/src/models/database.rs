use serde::{ Deserialize, Serialize };

/// Represents the possible errors that can occur during database operations.
#[derive(PartialEq, Debug)]
pub enum DBError {
  /// Error related to the database connection.
  ConnectionError(String, String),
  /// Error related to installing an extension.
  ExtensionError(String, String),
  /// Error related to table creation.
  TableCreationError(String, String),
  /// Error related to query execution.
  QueryError(String, String),
  /// Error related to save data.
  InsertError(String, String),
  /// Error related to updating data.
  UpdateError(String, String),
}

impl DBError {
  /// Returns the error message for the Frontend.
  pub fn message(&self) -> String {
    match self {
      DBError::ConnectionError(message, _e) => format!("Connection Error: {}", message.clone()),
      DBError::ExtensionError(message, _e) => format!("Extension Error: {}", message.clone()),
      DBError::TableCreationError(message, _e) =>
        format!("Table Creation Error: {}", message.clone()),
      DBError::QueryError(message, _e) => format!("Query Error: {}", message.clone()),
      DBError::InsertError(message, _e) => format!("Insert Error: {}", message.clone()),
      DBError::UpdateError(message, _e) => format!("Update Error: {}", message.clone()),
    }
  }

  /// Returns the error message for the logs.
  pub fn log_message(&self) -> String {
    match self {
      DBError::ConnectionError(message, e) =>
        format!("Connection Error: {} - {}", message.clone(), e.clone()),
      DBError::ExtensionError(message, e) =>
        format!("Extension Error: {} - {}", message.clone(), e.clone()),
      DBError::TableCreationError(message, e) =>
        format!("Table Creation Error: {} - {}", message.clone(), e.clone()),
      DBError::QueryError(message, e) =>
        format!("Query Error: {} - {}", message.clone(), e.clone()),
      DBError::InsertError(message, e) =>
        format!("Insert Error: {} - {}", message.clone(), e.clone()),
      DBError::UpdateError(message, e) =>
        format!("Update Error: {} - {}", message.clone(), e.clone()),
    }
  }
}

/// A type alias for a result that can return a value of type `T` or a `DBError`.
pub type Result<T> = std::result::Result<T, DBError>;

/// Represents a prompt in the database.
#[derive(PartialEq, Debug, Deserialize, Serialize)]
pub struct DBEntry {
  pub id: i64,
  pub prompt: String,
  pub response: String,
  pub usefull: bool,
}

impl DBEntry {
  /// Creates a new `Prompt` instance.
  pub fn new(id: i64, prompt: String, response: String, usefull: bool) -> DBEntry {
    DBEntry {
      id,
      prompt,
      response,
      usefull,
    }
  }

  /// Converts the `Prompt` instance to a string representation.
  pub fn to_string(&self) -> String {
    format!("{}, usefull {}: {} -> {}", self.id, self.usefull, self.prompt, self.response)
  }
}

/// Represents the database connection details.
#[derive(PartialEq, Debug)]
pub struct DBConnectionInfo {
  /// The ip/url of the database.
  pub host: String,
  /// The name of the database to access.
  pub dbname: String,
  /// The username to use for the connection.
  pub user: String,
  /// The password to use for the connection.
  pub password: String,
}