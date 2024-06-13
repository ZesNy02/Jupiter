#[cfg(test)]
mod test {
    use axum::http::StatusCode;
    use rust_server::config::{ Config, Mode };
    use rust_server::handlers::ai::*;
    use rust_server::models::routes_data::{ AIResponse, AIPromptRequest };
    use rust_server::utils::sqlite::drop_table;

    fn dummy_sqlite(path: String) -> Config {
        return Config {
            ip: "".to_string(),
            port: 0,
            mode: Mode::Dev,
            db_path: path,
            script: "".to_string(),
        };
    }

    fn dummy_python(path: String) -> Config {
        return Config {
            ip: "".to_string(),
            port: 0,
            mode: Mode::Dev,
            db_path: "".to_string(),
            script: path,
        };
    }

    #[test]
    fn test_errors() {
        let config = dummy_sqlite("tests_ai_handler.db".to_string());
        let (code, _) = handle_ai(&config, AIPromptRequest { message: "error".to_string() });
        assert_eq!(code, StatusCode::INTERNAL_SERVER_ERROR);
        let config = dummy_python("some.py".to_string());
        let (code, _) = handle_ai(&config, AIPromptRequest { message: "error".to_string() });
        assert_eq!(code, StatusCode::INTERNAL_SERVER_ERROR);
    }

    #[test]
    fn test_ai() {
        let config = dummy_sqlite("tests_ai_handler.db".to_string());
        let _ = drop_table(&config);
        let (code, response) = handle_ai(&config, AIPromptRequest { message: "hello".to_string() });
        assert_eq!(code, StatusCode::OK);
        match response {
            AIResponse::Success(data) => {
                assert_eq!(data.id, 1);
                assert_eq!(data.response, "World\r\n".to_string());
            }
            _ => assert!(false),
        }
    }
}
