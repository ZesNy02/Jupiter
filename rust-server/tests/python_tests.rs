#[cfg(test)]
mod test {
  use rust_server::models::python_ai::AIError;
  use rust_server::utils::python::*;
  use rust_server::config::Config;

  fn get_config() -> Config {
    return Config::_dummy_python("call_test.py".to_string());
  }

  #[test]
  fn test_invalid_path() {
    let config = Config::_dummy_python("invalid.py".to_string());
    let prompt = "Hello".to_string();
    assert_eq!(run_ai(&config, prompt), Err(AIError::PathError));
  }

  #[test]
  fn test_error_script() {
    let config = get_config();
    let prompt = "err".to_string();
    assert_eq!(run_ai(&config, prompt), Err(AIError::ScriptError));
  }

  #[test]
  fn test_error_empty() {
    let config = get_config();
    let prompt = "Something Weird".to_string();
    assert_eq!(run_ai(&config, prompt), Err(AIError::EmptyResponse));
  }

  #[test]
  fn test_valid_run() {
    let config = get_config();
    let prompt = "hello".to_string();
    assert_eq!(run_ai(&config, prompt), Ok("World\r\n".to_string()));
  }
}
