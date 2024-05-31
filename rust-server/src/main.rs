mod config;
use config::get_config;

#[tokio::main]
async fn main() {
    // Initialize the logger
    tracing_subscriber::fmt::init();

    // Set mode: "development" or "production"
    let mode = "development";

    // Get the configuration
    let config = get_config();

}