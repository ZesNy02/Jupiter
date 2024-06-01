use rust_server::config::{ Mode, get_config };
use tracing::info;
use rust_server::utils::python::run_ai;

#[tokio::main]
async fn main() {
  // Initialize the logger
  tracing_subscriber::fmt::init();

  // Set mode: "development" or "production"
  let mode = Mode::Dev;
  let _ = Mode::Prod;

  // Get the configuration
  info!("Loading configuration...");
  let config = get_config(mode, false);
  let _ = config.get_db_path();
  let _ = run_ai(&config, "Hello".to_string());

  // TODO: Graveful shutdown, Start Server...
  info!("Starting server...");
}
