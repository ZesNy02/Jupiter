use postgres::{ Client, NoTls };

use crate::models::database::{ DBConnectionInfo, DBError, Result };

/// Utility function to easily insert an answer into the database.
///
/// # Params
///
/// * `info` - The [DBConnectionInfo] struct containing the database connection details.
/// * `prompt_id` - The ID of the prompt to which the answer belongs.
/// * `answer` - The answer to insert.
///
/// # Returns
///
/// A [Result] indicating the success or an [DBError] of the operation.
///
/// # Errors
///
/// * [DBError::ConnectionError] - If there is an error while connecting to the database.
/// * [DBError::ExtensionError] - If there is an error while installing the vector extension.
/// * [DBError::TableCreationError] - If there is an error while creating the table.
/// * [DBError::InsertError] - If there is an error while inserting the answer.
pub fn insert_anwser(info: &DBConnectionInfo, prompt_id: i32, answer: &String) -> Result<i32> {
  let mut client = get_connection(info)?;
  // Insert the answer with the given prompt_id to answers.
  let rows = client.query(
    "INSERT INTO answers (prompt_id, answer) VALUES ($1, $2) RETURNING answer_id",
    &[&prompt_id, &answer]
  );
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
/// # Params
///
/// * `info` - The [DBConnectionInfo] struct containing the database connection details.
/// * `answer_id` - The ID of the answer to update.
/// * `rating` - The new rating of the answer.
///
/// # Returns
///
/// A [Result] indicating the success or an [DBError] of the operation.
///
/// # Errors
///
/// * [DBError::ConnectionError] - If there is an error while connecting to the database.
/// * [DBError::ExtensionError] - If there is an error while installing the vector extension.
/// * [DBError::TableCreationError] - If there is an error while creating the table.
/// * [DBError::UpdateError] - If there is an error while updating the rating.
pub fn update_rating(info: &DBConnectionInfo, answer_id: i32, rating: i32) -> Result<()> {
  let mut client = get_connection(info)?;
  let mut to_insert_rating = rating;
  if rating >= 1 {
    to_insert_rating = 1;
  } else if rating <= -1 {
    to_insert_rating = -1;
  } else {
    return Ok(()); // Do nothing if the rating is 0.
  }

  let mut query = "UPDATE answer SET rating = 0 WHERE answer_id = $1";
  // Increment the rating if the new rating is 1, otherwise decrement it.
  if to_insert_rating == 1 {
    query = "UPDATE answer SET rating = rating + 1 WHERE answer_id = $1";
  } else {
    query = "UPDATE answer SET rating = rating - 1 WHERE answer_id = $1";
  }

  // Update the rating of the answer with the given answer_id.
  let res = client.execute(query, &[&answer_id]);
  if let Err(e) = res {
    return Err(
      DBError::UpdateError("Error while trying to update rating".to_string(), e.to_string())
    );
  }
  Ok(())
}

/// Utility function to easily find an answer in the database.
///
/// # Params
///
/// * `info` - The [DBConnectionInfo] struct containing the database connection details.
/// * `prompt_id` - The ID of the prompt to which the answer belongs.
///
/// # Returns
///
/// A [Result] containing a tuple with the ID of the answer and the answer itself or an [DBError] of the operation.
///
/// # Errors
///
/// * [DBError::ConnectionError] - If there is an error while connecting to the database.
/// * [DBError::ExtensionError] - If there is an error while installing the vector extension.
/// * [DBError::TableCreationError] - If there is an error while creating the table.
/// * [DBError::QueryError] - If there is an error while trying to find the answer.
pub fn find_answer(info: &DBConnectionInfo, prompt_id: i32) -> Result<(i32, String)> {
  let mut client = get_connection(info)?;
  // Select all answers with a rating greater than 0 and order them by rating.
  let res = client.query(
    "SELECT answer_id, answer FROM answers WHERE prompt_id = $1 AND rating > 0 ORDER BY rating DESC",
    &[&prompt_id]
  );
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
/// # Params
///
/// * `info` - The [DBConnectionInfo] struct containing the database connection details.
///
/// # Returns
///
/// A [Result] containing the database connection or an [DBError] of the operation.
///
/// # Errors
///
/// * [DBError::ConnectionError] - If there is an error while connecting to the database.
/// * [DBError::ExtensionError] - If there is an error while installing the vector extension.
/// * [DBError::TableCreationError] - If there is an error while creating the table.
pub fn get_connection(info: &DBConnectionInfo) -> Result<Client> {
  let client = Client::configure()
    .host(&info.host)
    .dbname(&info.dbname)
    .user(&info.user)
    .password(&info.password)
    .port(info.port.clone())
    .connect(NoTls);
  match client {
    Ok(mut client) => {
      install_extension(&mut client)?;
      create_table(&mut client)?;
      return Ok(client);
    }
    Err(e) => {
      return Err(
        DBError::ConnectionError(
          format!("Could not connect to database {} at {}", &info.dbname, &info.host),
          e.to_string()
        )
      );
    }
  }
}

/// Local utility function to install the vector extension in the database.
///
/// # Params
///
/// * `client` - The database client.
///
/// # Returns
///
/// A [Result] indicating the success or an [DBError] of the operation.
///
/// # Errors
///
/// * [DBError::ExtensionError] - If there is an error while installing the vector extension.
fn install_extension(client: &mut Client) -> Result<()> {
  // Install the vector extension if not already installed.
  let res = client.execute("CREATE EXTENSION IF NOT EXISTS vector;", &[]);
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

/// Local utility function to create the tables in the database.
///
/// # Params
///
/// * `client` - The database client.
///
/// # Returns
///
/// A [Result] indicating the success or an [DBError] of the operation.
///
/// # Errors
///
/// * [DBError::TableCreationError] - If there is an error while creating the table.
fn create_table(client: &mut Client) -> Result<()> {
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
  );
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
  );
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
