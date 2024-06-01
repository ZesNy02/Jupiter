use crate::{ config::Config, models::python_ai::{ AIError, Result } };
use std::{ path::Path, process::Command };

pub fn run_ai(config: &Config, prompt: String) -> Result<String> {
  let script = &config.script;
  let path = "./scripts/python/".to_string() + script;
  let prompt = prompt.clone();

  if Path::new(&path).exists() == false {
    return Err(AIError::PathError);
  }

  let response = Command::new("py").arg(path).arg(prompt).output();

  match response {
    Ok(response) => {
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
