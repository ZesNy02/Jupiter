use crate::{ config::Config, models::python_ai::{ AIError, Result } };
use std::{ path::Path, process::Command };

/// This function runs the Python AI model with the given prompt.
///
/// # Params
///
/// * `config` - The [Config] struct containing the script path.
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
/// let config = Config {
///   ip: "0.0.0.0".to_string(),
///   port: 3000,
///   mode: Mode::Dev,
///   db_path: "db.sqlite".to_string(),
///   script: "ai.py".to_string(),
/// };
///
/// let prompt = "Hello".to_string();
///
/// let response = run_ai(&config, prompt);
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
pub fn run_ai(config: &Config, prompt: String) -> Result<String> {
  // get the path to the python script
  let path = config.get_script_path();
  let prompt = prompt.clone();

  if Path::new(&path).exists() == false {
    return Err(AIError::PathError);
  }

  // run the python script and wait for the output
  let response = Command::new("python3").arg(path).arg(prompt).output();

  // match the response from the script
  match response {
    Ok(response) => {
      // convert the response to a string
      let response = String::from_utf8_lossy(&response.stdout).to_string();

      if response.starts_with("Error: ") {
        return Err(AIError::ScriptError);
      }

      if response.is_empty() {
        return Err(AIError::EmptyResponse);
      }

      return Ok(response.to_string());
    }
    Err(_e) => {
      return Err(AIError::IOError);
    }
  }
}
