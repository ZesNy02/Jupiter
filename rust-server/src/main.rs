use rust_server::{ config::Config, handlers::router::get_router, utils::python::run_script };
use tokio::signal;
use tracing::info;
use tracing_subscriber::EnvFilter;

/// Main function to start the server
///
/// This function initializes the logger,
/// loads the `config`, and starts the server.
/// The server is servered using **Axum** and has *graceful shutdown*.
///
/// The routes are defined in the `router` module.
#[tokio::main]
async fn main() {
  // Initialize the logger
  tracing_subscriber
    ::fmt()
    .without_time()
    .with_target(false)
    .with_env_filter(EnvFilter::from_default_env())
    .init();

  // Get the configuration
  info!("Loading configuration...");
  let config = Config::load_from_env();
  info!("Configuration loaded.");

  // Initialize the vectorstore
  info!("Initializing vectorstore...");
  let _ = run_script(config.init_vectorstore_script.clone(), vec![]).unwrap();
  info!("Vectorstore initialized.");

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

/// Graceful shutdown signal
///
/// This function listens for the `Ctrl+C` signal and
/// gracefully shuts down the server.
///
/// If the server is running on a Unix system,
/// it also listens for the `SIGTERM` signal.
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
      _ = ctrl_c => {
          info!("Shutting down...");
      },
      _ = terminate => {
          info!("Shutting down...");
      },
  }
}
