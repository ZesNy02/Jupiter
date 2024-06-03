use rust_server::{ config::{ get_config, Mode }, handlers::router::get_router };
use tokio::signal;
use tracing::info;
use tracing_subscriber::EnvFilter;

#[tokio::main]
async fn main() {
  // Initialize the logger
  tracing_subscriber
    ::fmt()
    .without_time()
    .with_target(false)
    .with_env_filter(EnvFilter::from_default_env())
    .init();

  // Set mode: "development" or "production"
  let mode = Mode::Dev;
  let docker = false;

  // Get the configuration
  info!("Loading configuration...");
  let config = get_config(mode, docker);

  // Start the server
  info!("Starting server...");
  let ip = config.ip.clone();
  let port = config.port.clone();
  let addr = format!("{}:{}", ip, port);
  let app = get_router(config);

  // Bind the server to the address
  let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
  info!("Server listining on: {}", listener.local_addr().unwrap());

  // Serve the app with graceful shutdown
  axum::serve(listener, app).with_graceful_shutdown(shutdown_signal()).await.unwrap();
}

async fn shutdown_signal() {
  let ctrl_c = async {
    signal::ctrl_c().await.expect("failed to install Ctrl+C handler");
  };

  #[cfg(unix)]
  let terminate = async {
    signal::unix
      ::signal(signal::unix::SignalKind::terminate())
      .expect("failed to install signal handler")
      .recv().await;
  };

  #[cfg(not(unix))]
  let terminate = std::future::pending::<()>();

  tokio::select! {
      _ = ctrl_c => {},
      _ = terminate => {},
  }
}
