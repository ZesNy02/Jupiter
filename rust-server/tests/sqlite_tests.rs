#[cfg(test)]
mod test {
    use rust_server::config::{ Config, Mode };
    use rust_server::models::database::{ DBError, DBEntry };
    use rust_server::utils::sqlite::*;

    fn dummy_sqlite(path: String) -> Config {
        return Config {
            ip: "".to_string(),
            port: 0,
            mode: Mode::Dev,
            db_path: path,
            script: "".to_string(),
        };
    }

    #[test]
    fn test_connection() {
        let errconfig = dummy_sqlite("/.,&/)()".to_string());
        // Test connection error
        assert_eq!(insert_prompt(&errconfig, "", ""), Err(DBError::ConnectionError));
        assert_eq!(update_prompt(&errconfig, 0, true), Err(DBError::ConnectionError));
        assert_eq!(fetch_prompts(&errconfig, Some(true)), Err(DBError::ConnectionError));
    }

    #[test]
    fn test_insert_prompt() {
        let config = dummy_sqlite("tests_insert.db".to_string());
        // Test insert success
        assert_eq!(drop_table(&config), Ok(()));

        assert_eq!(insert_prompt(&config, "test", "test"), Ok(1));

        assert_eq!(drop_table(&config), Ok(()));
    }

    #[test]
    fn test_update_prompt() {
        let config = dummy_sqlite("tests_update.db".to_string());
        // Test update success
        assert_eq!(drop_table(&config), Ok(()));

        assert_eq!(insert_prompt(&config, "test", "test"), Ok(1));
        assert_eq!(update_prompt(&config, 1, true), Ok(()));
        assert_ne!(update_prompt(&config, 999, true), Ok(()));

        assert_eq!(drop_table(&config), Ok(()));
    }

    #[test]
    fn test_fetch_prompts() {
        let config = dummy_sqlite("tests_fetch.db".to_string());
        // Test insert success
        assert_eq!(drop_table(&config), Ok(()));

        assert_eq!(insert_prompt(&config, "test1", "test1"), Ok(1));
        assert_eq!(insert_prompt(&config, "test2", "test2"), Ok(2));
        assert_eq!(update_prompt(&config, 1, true), Ok(()));
        assert_eq!(update_prompt(&config, 2, false), Ok(()));
        let prompts = fetch_prompts(&config, None);
        assert_eq!(
            prompts,
            Ok(
                vec![
                    DBEntry::new(1, "test1".to_string(), "test1".to_string(), true),
                    DBEntry::new(2, "test2".to_string(), "test2".to_string(), false)
                ]
            )
        );

        assert_eq!(drop_table(&config), Ok(()));
    }
}
