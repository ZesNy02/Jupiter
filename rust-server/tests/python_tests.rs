#[cfg(test)]
mod tests {
  use rust_server::{ config::{ Config, Mode }, utils::python::* };
  use sequential_test::sequential;
  use tokio::runtime::Runtime;

  fn get_script_path() -> String {
    return "./scripts/python/call_test.py".to_string();
  }

  fn get_config() -> Config {
    return Config::load_from_env(Mode::Dev);
  }

  #[test]
  #[sequential]
  fn test_invalid_path_error() {
    let script_path = "Some ordinary path like: =(/§%/);".to_string();
    let args = vec![];
    let res = run_script(script_path, args);
    assert_eq!(res.is_err(), true);
  }

  #[test]
  #[sequential]
  fn test_response_error() {
    let script_path = get_script_path();
    let args = vec![];
    let res = run_script(script_path, args);
    assert_eq!(res.is_err(), true);
  }

  #[test]
  #[sequential]
  fn test_script_error() {
    let script_path = get_script_path();
    let args = vec!["err".to_string()];
    let res = run_script(script_path, args);
    assert_eq!(res.is_err(), true);
  }

  #[test]
  #[sequential]
  fn test_script_success() {
    let script_path = get_script_path();
    let args = vec!["hello".to_string()];
    let res = run_script(script_path, args);
    assert_eq!(res.is_ok(), true);
  }

  #[test]
  #[sequential]
  fn test_prompt_request() {
    let config = get_config();
    let prompt = "What is the prooph-board?".to_string();
    let response = handle_prompt_request(&config, &prompt);
    assert_eq!(response.is_ok(), true);
  }

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
