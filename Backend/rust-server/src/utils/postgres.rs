use tokio_postgres::{ connect, Client, NoTls };
use tracing::error;

use crate::models::database::{ DBConnectionInfo, DBError, Result };

/// Utility function to easily insert an answer into the database.
///
/// The function inserts the answer with the given prompt_id into the database.
///
/// # Arguments
///
/// * `info` - The [DBConnectionInfo] struct containing
/// the database connection details.
/// * `prompt_id` - The ID of the prompt to which the answer belongs.
/// * `answer` - The answer to insert.
///
/// # Returns
///
/// A [Result] indicating the success or an [DBError] of the operation.
///
/// # Errors
///
/// * [DBError::ConnectionError] - If there is an error
/// while connecting to the database.
/// * [DBError::ExtensionError] - If there is an error
/// while installing the vector extension.
/// * [DBError::TableCreationError] - If there is an error
/// while creating the table.
/// * [DBError::InsertError] - If there is an error
/// while inserting the answer.
pub async fn insert_answer(
  info: &DBConnectionInfo,
  prompt_id: i32,
  answer: &String
) -> Result<i32> {
  let client = get_connection(info).await?;

  // Insert the answer with the given prompt_id to answers.
  let rows = client.query(
    "INSERT INTO answers (prompt_id, answer) VALUES ($1, $2) RETURNING answer_id",
    &[&prompt_id, &answer]
  ).await;

  if let Err(e) = rows {
    return Err(
      DBError::InsertError("Error while trying to insert answer".to_string(), e.to_string())
    );
  }

  let row = rows.unwrap();

  if let Some(row) = row.get(0) {
    return Ok(row.get(0));
  } else {
    return Err(
      DBError::InsertError("Error while trying to inserted answer id".to_string(), "".to_string())
    );
  }
}

/// Utility function to easily update the rating of an answer in the database.
///
/// The rating of the answer is updated by incrementing or
/// decrementing the rating by 1 or 2 based on the given rating value.
///
/// # Arguments
///
/// * `info` - The [DBConnectionInfo] struct containing
/// the database connection details.
/// * `answer_id` - The ID of the answer to update.
/// * `rating` - The rating value as number between
/// -2 and 2 where 0 does nothing.
///
/// # Returns
///
/// A [Result] indicating the success or an [DBError] of the operation.
///
/// # Errors
///
/// * [DBError::ConnectionError] - If there is an error
/// while connecting to the database.
/// * [DBError::ExtensionError] - If there is an error
/// while installing the vector extension.
/// * [DBError::TableCreationError] - If there is an error
/// while creating the table.
/// * [DBError::UpdateError] - If there is an error
/// while updating the rating.
pub async fn update_rating(info: &DBConnectionInfo, answer_id: i32, rating: i32) -> Result<()> {
  let client = get_connection(info).await?;

  let to_insert_rating: i32;
  if rating >= 2 {
    to_insert_rating = 2;
  } else if rating <= -2 {
    to_insert_rating = -2;
  } else if rating == 0 {
    return Ok(()); // Do nothing if the rating is 0.
  } else {
    to_insert_rating = rating;
  }

  let query: &str;
  // Update the rating based on the given rating value.
  if to_insert_rating == 1 {
    query = "UPDATE answers SET rating = rating + 1 WHERE answer_id = $1";
  } else if to_insert_rating == 2 {
    query = "UPDATE answers SET rating = rating + 2 WHERE answer_id = $1";
  } else if to_insert_rating == -1 {
    query = "UPDATE answers SET rating = rating - 1 WHERE answer_id = $1";
  } else {
    query = "UPDATE answers SET rating = rating - 2 WHERE answer_id = $1";
  }

  // Update the rating of the answer with the given answer_id.
  let res = client.execute(query, &[&answer_id]).await;
  if let Err(e) = res {
    return Err(
      DBError::UpdateError("Error while trying to update rating".to_string(), e.to_string())
    );
  }
  Ok(())
}

/// Utility function to easily find an answer in the database.
///
/// The function returns the answer with the highest rating and
/// filters out any answer with a rating less than or equal to 0.
///
/// # Arguments
///
/// * `info` - The [DBConnectionInfo] struct containing
/// the database connection details.
/// * `prompt_id` - The ID of the prompt to which the answer belongs.
///
/// # Returns
///
/// A [Result] containing a tuple with the ID of the
/// answer and the answer itself or an [DBError] of the operation.
///
/// # Errors
///
/// * [DBError::ConnectionError] - If there is an error
/// while connecting to the database.
/// * [DBError::ExtensionError] - If there is an error
/// while installing the vector extension.
/// * [DBError::TableCreationError] - If there is an error
/// while creating the table.
/// * [DBError::QueryError] - If there is an error
/// while trying to find the answer.
pub async fn find_answer(info: &DBConnectionInfo, prompt_id: i32) -> Result<(i32, String)> {
  let client = get_connection(info).await?;

  // Select all answers with a rating greater than 0 and order them by rating.
  let res = client.query(
    "SELECT answer_id, answer FROM answers WHERE prompt_id = $1 AND rating > 0 ORDER BY rating DESC",
    &[&prompt_id]
  ).await;

  if let Err(e) = res {
    return Err(DBError::QueryError("Error while trying to find answer".to_string(), e.to_string()));
  }

  let row = res.unwrap();
  let answer_row = row.get(0);

  if let None = answer_row {
    return Err(DBError::QueryError("No answer found".to_string(), "".to_string()));
  }

  let answer_row = answer_row.unwrap();
  let answer_id: i32 = answer_row.get(0);
  let answer: String = answer_row.get(1);

  Ok((answer_id, answer))
}

/// Utility function to easily connect to the database.
///
/// This function also installs the vector extension and
/// creates the required tables.
///
/// # Arguments
///
/// * `info` - The [DBConnectionInfo] struct containing
/// the database connection details.
///
/// # Returns
///
/// A [Result] containing the database connection or
/// an [DBError] of the operation.
///
/// # Errors
///
/// * [DBError::ConnectionError] - If there is an error
/// while connecting to the database.
/// * [DBError::ExtensionError] - If there is an error
/// while installing the vector extension.
/// * [DBError::TableCreationError] - If there is an error
/// while creating the table.
///
/// # Debug
///
/// This function logs the following:
/// - A connection error if the connection fails as `error` in the format
/// `Could not connect to database <dbname> at <host>`.
pub async fn get_connection(info: &DBConnectionInfo) -> Result<Client> {
  let connection_result = connect(&info.to_string(), NoTls).await;

  if let Err(e) = connection_result {
    return Err(
      DBError::ConnectionError(
        format!("Could not connect to database {} at {}", &info.dbname, &info.host),
        e.to_string()
      )
    );
  }

  let (client, connection) = connection_result.unwrap();
  tokio::spawn(async move {
    if let Err(e) = connection.await {
      error!("Connection Error: {}", e);
    }
  });

  install_extension(&client).await?;
  create_table(&client).await?;
  Ok(client)
}

/// Local utility function to install the vector extension in the database.
///
/// # Arguments
///
/// * `client` - The database client.
///
/// # Returns
///
/// A [Result] indicating the success or an [DBError] of the operation.
///
/// # Errors
///
/// * [DBError::ExtensionError] - If there is an error while
/// installing the vector extension.
async fn install_extension(client: &Client) -> Result<()> {
  // Install the vector extension if not already installed.
  let res = client.execute("CREATE EXTENSION IF NOT EXISTS vector;", &[]).await;

  if let Err(e) = res {
    return Err(
      DBError::ExtensionError(
        "Error while trying to install the vector extension".to_string(),
        e.to_string()
      )
    );
  }

  Ok(())
}

/// Local utility function to create the tables required in the database.
///
/// # Arguments
///
/// * `client` - The database client.
///
/// # Returns
///
/// A [Result] indicating the success or an [DBError] of the operation.
///
/// # Errors
///
/// * [DBError::TableCreationError] - If there is an error
/// while creating the table.
async fn create_table(client: &Client) -> Result<()> {
  // TODO - Check embedding size
  // Create a table if not existent to store the prompts named prompts.
  // The prompt is the text of the prompt.
  // The embedding is a vector of 1024 elements.
  // The count is the number of times the exact prompt or one that was very close
  // by vector distance was inserted.
  let res = client.execute(
    "
    CREATE TABLE IF NOT EXISTS prompts (
        prompt_id SERIAL PRIMARY KEY,
        prompt TEXT NOT NULL,
        embedding vector(1024),
        count INTEGER DEFAULT 1
    );",
    &[]
  ).await;

  if let Err(e) = res {
    return Err(
      DBError::TableCreationError(
        "Error while trying to create table prompts".to_string(),
        e.to_string()
      )
    );
  }

  // Create a table if not existent to store the answers named answers.
  // prompt_id is a foreign key to the prompts table.
  // The answer is the text of the answer.
  // The rating is a value between -1 and 1, where -1 is a bad answer and 1 is a good answer.
  let res = client.execute(
    "
    CREATE TABLE IF NOT EXISTS answers (
        answer_id SERIAL PRIMARY KEY,
        prompt_id integer REFERENCES prompts(prompt_id),
        answer TEXT NOT NULL,
        rating INTEGER DEFAULT 0
    );",
    &[]
  ).await;

  if let Err(e) = res {
    return Err(
      DBError::TableCreationError(
        "Error while trying to create table answers".to_string(),
        e.to_string()
      )
    );
  }

  Ok(())
}
