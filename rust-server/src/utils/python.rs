use crate::models::python_ai::{ AIError, Result };
use std::{ path::Path, process::Command };

/// This function runs the Python AI model with the given prompt.
///
/// # Params
///
/// * `script_path` - The path to the python script to execute.
/// * `prompt` - The prompt to be sent to the AI model.
///
/// # Returns
///
/// A [Result] containing the AI response or an [AIError].
///
/// # Errors
///
/// * [AIError::PathError] if the script path does not exist.
/// * [AIError::ScriptError] if the script returns an error.
/// * [AIError::EmptyResponse] if the script returns an empty response.
/// * [AIError::IOError] if there is an IO error.
///
/// # Example
///
/// ```rust
/// use rust_server::config::{ Config, Mode };
/// use rust_server::models::python_ai::AIError;
/// use rust_server::utils::python::run_ai;
///
/// let prompt = "Hello".to_string();
///
/// let response = run_ai("test.py".to_string(), prompt);
///
/// match response {
///   Ok(response) => {
///     println!("Response: {}", response);
///   }
///   Err(e) => {
///     match e {
///       AIError::PathError => println!("Path error."),
///       AIError::ScriptError => println!("Script error."),
///       AIError::EmptyResponse => println!("Empty response."),
///       AIError::IOError => println!("IO error."),
///     }
///   }
/// }
///
/// ```
pub fn run_ai(script_path: String, prompt: String) -> Result<String> {
  // get the path to the python script
  let prompt = prompt.clone();

  if Path::new(&script_path).exists() == false {
    return Err(AIError::PathError(format!("Path does not exist: {}", script_path)));
  }

  // run the python script and wait for the output
  let response = Command::new("python3").arg(script_path).arg(prompt).output();

  // match the response from the script
  match response {
    Ok(response) => {
      // convert the response to a string
      let response = String::from_utf8_lossy(&response.stdout).to_string();

      if response.starts_with("Error: ") {
        return Err(AIError::ScriptError(response));
      }

      if response.is_empty() {
        return Err(AIError::EmptyResponse("Script returned an empty response".to_string()));
      }

      return Ok(response.to_string());
    }
    Err(_e) => {
      return Err(AIError::IOError("Error while reading the python script".to_string()));
    }
  }
}
