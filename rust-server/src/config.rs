use dotenv::dotenv;
use std::env;

pub enum Mode {
    Dev,
    Prod,
}

pub fn get_config(mode: Mode) -> Config {

}

pub struct Config {
    pub IP: String,
    pub PORT: u16,
    pub MODE: String,
}

impl Config {
    fn load_from_env() -> Option<Config> {
        dotenv().ok();
        let ip = env::var("IP");
    }

    fn load_from_docker() -> Option<Config> {

    }
}
