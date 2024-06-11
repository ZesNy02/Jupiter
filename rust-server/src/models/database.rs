use serde::{ Deserialize, Serialize };

// TODO

/// Represents the possible errors that can occur during database operations.
#[derive(PartialEq)]
#[derive(Debug)]
pub enum DBError {
    /// Error related to the database connection.
    ConnectionError,
    /// Error related to table creation.
    TableCreationError,
    /// Error related to query execution.
    QueryError,
    /// Error related to save data.
    InsertError,
    /// Error related to updating data.
    UpdateError,
}

/// A type alias for a result that can return a value of type `T` or a `DBError`.
pub type Result<T> = std::result::Result<T, DBError>;

/// Represents a prompt in the database.
#[derive(PartialEq)]
#[derive(Debug)]
#[derive(Deserialize)]
#[derive(Serialize)]
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
