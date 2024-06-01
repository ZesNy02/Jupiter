mod config;
use config::get_config;
use config::Mode;

#[tokio::main]
async fn main() {
  // Initialize the logger
  tracing_subscriber::fmt::init();

  // Set mode: "development" or "production"
  let mode = Mode::Dev;
  let _ = Mode::Prod;

  // Get the configuration
  let config = get_config(mode, false);
  let _ = config.get_db_path();

  // TODO: Graveful shutdown, Start Server...
}
