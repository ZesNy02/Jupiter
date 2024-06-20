use crate::{
  config::{ Config, Mode },
  models::{ python_ai::{ PythonError, Result }, routes_data::VectorSearchResult },
};
use std::{ path::Path, process::Command };

use tracing::{ error, info };

use super::postgres::get_connection;
/// This function runs the Python AI model with the given prompt.
///
/// # Params
///
/// * `script_path` - The path to the python script to execute.
/// * `args` - The arguments to pass to the script.
///
/// # Returns
///
/// A [Result] containing the response or an [PythonError].
///
/// # Errors
///
/// * [PythonError::PathError] if the script path does not exist.
/// * [PythonError::ScriptError] if the script returns an error.
/// * [PythonError::ResponseError] if the script returns an empty response.
/// * [PythonError::IOError] if there is an IO error.
///
/// # Example
///
/// ```rust
/// use rust_server::models::python_ai::PythonError;
/// use rust_server::utils::python::run_ai;
///
/// let prompt = "Hello".to_string();
///
/// let response = run_script("test.py".to_string(), prompt);
///
/// match response {
///   Ok(response) => {
///     println!("Response: {}", response);
///   }
///   Err(e) => {
///     match e {
///       PythonError::PathError => println!("Path error."),
///       PythonError::ScriptError => println!("Script error."),
///       PythonError::ResponseError => println!("Response error."),
///       PythonError::IOError => println!("IO error."),
///     }
///   }
/// }
pub fn run_script(script_path: String, args: Vec<String>) -> Result<String> {
  if Path::new(&script_path).exists() == false {
    return Err(PythonError::PathError(format!("Path does not exist: {}", script_path)));
  }

  // run the python script and wait for the output
  let response = Command::new("python3").arg(script_path).args(args).output();

  // match the response from the script
  match response {
    Ok(response) => {
      // convert the response to a string
      let response = String::from_utf8_lossy(&response.stdout).to_string();

      if response.starts_with("Error: ") {
        return Err(PythonError::ScriptError(response));
      }

      if response.is_empty() {
        return Err(PythonError::ResponseError("Script returned an empty response".to_string()));
      }

      return Ok(response.to_string());
    }
    Err(_e) => {
      return Err(PythonError::IOError("Error while reading the python script".to_string()));
    }
  }
}

/// Handles the vector search request.
///
/// # Arguments
///
/// * `config` - The server [`Config`].
/// * `prompt` - The prompt from the payload.
///
/// # Returns
///
/// The [`VectorSearchResult`] containing the ID of the existing or new vector or
/// an [`PythonError`] if the response is unparseable or can't be matched.
///
/// # Errors
///
/// Returns an [`PythonError::ResponseError`] if the response is unparseable or
/// if the response couldn't be matched. Also returns the [`PythonError`] from the
/// [`run_script`] function.
pub async fn handle_vector_search(config: &Config, prompt: &String) -> Result<VectorSearchResult> {
  let mode = config.mode.clone();
  let script_path = config.vector_query_script.clone();
  let db_url = config.db_connection.to_string();
  let prompt = prompt.clone();
  if let Err(e) = get_connection(&config.db_connection).await {
    return Err(PythonError::IOError(e.message()));
  }
  let script_result = run_script(script_path, vec![db_url, prompt])?;
  let result: Vec<&str> = script_result.split(&[' ', '\r', '\n']).collect();
  // Should be either "Existing <id>" or "New <id>"
  if result[0] == "Existing" {
    if let Ok(id) = result[1].parse::<i32>() {
      return Ok(VectorSearchResult::Existing(id));
    } else {
      if mode == Mode::Dev {
        error!("Failed to parse the ID from the result: {}", result[1]);
      }
      return Err(PythonError::ResponseError("Received unparseable response.".to_string()));
    }
  } else if result[0] == "New" {
    if let Ok(id) = result[1].parse::<i32>() {
      return Ok(VectorSearchResult::New(id));
    } else {
      if mode == Mode::Dev {
        error!("Failed to parse the ID from the result: {}", result[1]);
      }
      return Err(PythonError::ResponseError("Received unparseable response.".to_string()));
    }
  } else {
    if mode == Mode::Dev {
      error!("Couldn't match response: {}", script_result);
    }
    return Err(PythonError::ResponseError("Couldn't match response.".to_string()));
  }
}

/// Handles the prompt request.
///
/// # Arguments
///
/// * `config` - The server [`Config`].
/// * `prompt` - The prompt to send to the AI.
///
/// # Returns
///
/// The response from the AI.
///
/// # Errors
///
/// Returns an [`PythonError`] passed from the [`run_script`] function.
pub fn handle_prompt_request(config: &Config, prompt: &String) -> Result<String> {
  let mode = config.mode.clone();
  let script_path = config.rag_script.clone();
  let llm_server = config.llm_connection.clone();
  let script_result = run_script(script_path, vec![llm_server, prompt.clone()])?;
  if mode == Mode::Dev {
    info!("Script result: {}", script_result);
  }
  Ok(script_result)
}
