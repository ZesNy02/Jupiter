#[cfg(test)]
mod test {
    use rust_server::config::{ Config, Mode };

    #[test]
    fn test_config() {
        let config = Config::load_from_env(Mode::Dev);
        assert_eq!(config.ip, "127.0.0.1".to_string());
        assert_eq!(config.port, 3000);
        assert_eq!(config.mode, Mode::Dev);
        assert_eq!(config.rag_script, "./scripts/python/ai/run_rag.py".to_string());
        assert_eq!(config.vector_query_script, "./scripts/python/ai/vector_query.py".to_string());
        assert_eq!(config.event_storming_script, "./scripts/python/ai/storming.py".to_string());
        assert_eq!(config.llm_connection, "".to_string());
    }

    #[test]
    fn test_db_connection() {
        let config = Config::load_from_env(Mode::Dev);
        assert_eq!(config.db_connection.host, "127.0.0.1".to_string());
        assert_eq!(config.db_connection.port, 5432);
        assert_eq!(config.db_connection.dbname, "postgres".to_string());
        assert_eq!(config.db_connection.user, "postgres".to_string());
        assert_eq!(config.db_connection.password, "password".to_string());
        let con_string =
            "host=127.0.0.1 port=5432 dbname=postgres user=postgres password=password".to_string();
        assert_eq!(config.get_db_connection_string(), con_string);
    }
}
