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

/// A type alias for a result that can
/// return a value of type `T` or a [`DBError`].
pub type Result<T> = std::result::Result<T, DBError>;

/// Represents the database connection details.
#[derive(PartialEq, Debug, Clone)]
pub struct DBConnectionInfo {
  /// The ip/url of the database.
  pub host: String,
  /// The port of the database.
  pub port: u16,
  /// The name of the database to access.
  pub dbname: String,
  /// The username to use for the connection.
  pub user: String,
  /// The password to use for the connection.
  pub password: String,
}

impl DBConnectionInfo {
  /// Creates a new [DBConnectionInfo] instance.
  pub fn new(
    host: String,
    port: u16,
    dbname: String,
    user: String,
    password: String
  ) -> DBConnectionInfo {
    DBConnectionInfo {
      host,
      port,
      dbname,
      user,
      password,
    }
  }

  /// Converts the [DBConnectionInfo] instance to a string representation.
  ///
  /// # Returns
  ///
  /// A string representation of the [DBConnectionInfo] instance in the format
  /// `host=HOST port=PORT dbname=DBNAME user=USER password=PASSWORD`.
  pub fn to_string(&self) -> String {
    return format!(
      "host={} port={} dbname={} user={} password={}",
      self.host,
      self.port,
      self.dbname,
      self.user,
      self.password
    );
  }
}
