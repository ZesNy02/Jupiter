#[cfg(test)]
mod tests {
  use rust_server::{ config::Config, utils::python::* };
  use sequential_test::sequential;
  use tokio::runtime::Runtime;

  // Function to get the test script path.
  fn get_script_path() -> String {
    return "./scripts/python/call_test.py".to_string();
  }

  // Function to get the Config. Needs the environment variables to be set.
  fn get_config() -> Config {
    return Config::load_from_env();
  }

  // Test if the path checked correctly.
  #[test]
  #[sequential]
  fn test_invalid_path_error() {
    let script_path = "Some ordinary path like: =(/§%/);".to_string();
    let args = vec![];
    let res = run_script(script_path, args);
    assert_eq!(res.is_err(), true);
  }

  // Test without any arguments for error.
  #[test]
  #[sequential]
  fn test_response_error() {
    let script_path = get_script_path();
    let args = vec![];
    let res = run_script(script_path, args);
    assert_eq!(res.is_err(), true);
  }

  // Test if the script returns an error.
  #[test]
  #[sequential]
  fn test_script_error() {
    let script_path = get_script_path();
    let args = vec!["err".to_string()];
    let res = run_script(script_path, args);
    assert_eq!(res.is_err(), true);
  }

  // Test a successful script run.
  #[test]
  #[sequential]
  fn test_script_success() {
    let script_path = get_script_path();
    let args = vec!["hello".to_string()];
    let res = run_script(script_path, args);
    assert_eq!(res.is_ok(), true);
  }

  // Test a successful prompt request.
  #[test]
  #[sequential]
  fn test_prompt_request() {
    let config = get_config();
    let prompt = "What is the prooph-board?".to_string();
    let response = handle_prompt_request(&config, &prompt);
    assert_eq!(response.is_ok(), true);
  }

  // Test a vector search request.
  #[test]
  #[sequential]
  fn test_vector_search_request() {
    let config = get_config();
    let prompt = "What is the prooph-board?".to_string();
    let rt = Runtime::new().unwrap();

    let response = rt.block_on(handle_vector_search(&config, &prompt));
    if let Err(err) = &response {
      println!("Error: {:?}", err);
    }
    assert_eq!(response.is_ok(), true);
  }
}
