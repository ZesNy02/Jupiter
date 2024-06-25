use crate::{
    config::Config,
    models::{ python_ai::{ PythonError, Result }, routes_data::VectorSearchResult },
};
use std::{ path::Path, process::Command };

use tracing::{ error, info };

use super::postgres::get_connection;
/// This function runs the Python AI model with the given prompt.
///
/// # Arguments
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
                return Err(
                    PythonError::ResponseError("Script returned an empty response".to_string())
                );
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
/// This function runs the vector search script with the given prompt
/// to get the prompt ID from the database.
///
/// # Arguments
///
/// * `config` - The server [`Config`].
/// * `prompt` - The prompt from the payload.
///
/// # Returns
///
/// The [`VectorSearchResult`] containing the ID of the existing or new prompt
/// entry in the Database or an [`PythonError`]
/// if the response is unparseable or can't be matched.
///
/// # Errors
///
/// Returns an [`PythonError::ResponseError`] if the response is unparseable or
/// if the response couldn't be matched. Also returns the [`PythonError`] from the
/// [`run_script`] function.
///
/// # Debug
///
/// This function logs the following:
/// - An parse error if the ID can't be parsed from the response as `error`
///  in the format `Failed to parse the ID from the result: <result>`.
/// - An error if the response can't be matched as `error` in the format
/// `Couldn't match response: <script_result>`.
pub async fn handle_vector_search(config: &Config, prompt: &String) -> Result<VectorSearchResult> {
    let script_path = config.vector_query_script.clone();
    let prompt = prompt.clone();

    if let Err(e) = get_connection(&config.db_connection).await {
        return Err(PythonError::IOError(e.message()));
    }

    let script_result = run_script(script_path, vec![prompt])?;
    let result: Vec<&str> = script_result.split(&[' ', '\r', '\n']).collect();

    // Should be either "Existing <id>" or "New <id>"
    if result[0] == "Existing" {
        // --- Parse the ID from the result ---
        if let Ok(id) = result[1].parse::<i32>() {
            return Ok(VectorSearchResult::Existing(id));
        } else {
            error!("Failed to parse the ID from the result: {}", result[1]);
            return Err(PythonError::ResponseError("Received unparseable response.".to_string()));
        }
        // --- ---
    } else if result[0] == "New" {
        // --- Parse the ID from the result ---
        if let Ok(id) = result[1].parse::<i32>() {
            return Ok(VectorSearchResult::New(id));
        } else {
            error!("Failed to parse the ID from the result: {}", result[1]);
            return Err(PythonError::ResponseError("Received unparseable response.".to_string()));
        }
        // --- ---
    } else {
        error!("Couldn't match response: {}", script_result);
        return Err(PythonError::ResponseError("Couldn't match response.".to_string()));
    }
}

/// Handles the prompt request.
///
/// This function runs the RAG script with the
/// given prompt to get the response from the AI.
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
///
/// # Debug
///
/// This function logs the following:
/// - The script result as `info` in the format `Script result: <script_result>`.
pub fn handle_prompt_request(config: &Config, prompt: &String) -> Result<String> {
    let script_path = config.rag_script.clone();
    let script_result = run_script(script_path, vec![prompt.clone()])?;

    info!("Script result: {}", script_result);

    Ok(script_result)
}
