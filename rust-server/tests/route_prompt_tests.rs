#[cfg(test)]
mod tests {
    use rust_server::{
        config::{ Config, Mode },
        handlers::ai::regenerate::testable_handle_regenerate_post,
        models::routes_data::AIRegenerateRequest,
    };
    use axum::http::StatusCode;
    use sequential_test::sequential;

    #[test]
    #[sequential]
    fn test_handle_prompt_request_success() {
        let config = Config::load_from_env(Mode::Dev);
        let payload = AIRegenerateRequest {
            prompt: "What is the prooph-board?".to_string(),
        };
        let (status, _) = testable_handle_regenerate_post(config, payload);
        assert_eq!(status, StatusCode::OK);
    }
}
