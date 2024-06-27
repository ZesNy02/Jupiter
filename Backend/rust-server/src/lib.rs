//! The Rust Axum AI Server for the Prooph-Board Chatbot **Chaty**.
//!
//! This server is used to run the AI model for the chatbot
//! and handle requests from the chatbot frontend.
//!
//! The server is built using the `Axum` framework and uses the
//! `Tokio` runtime for asynchronous tasks.
//!
//! The server uses the `PostgreSQL` database for storing prompts and
//! responses and uses `Python Scripts` to handle the AI model.
//!
//! The server is tested using Rust's built-in testing framework.
//!
//! # Routes
//!
//! The routes are defined in the [`router`][crate::handlers::router] module.
//!
//! The server has the following routes:
//! - [`ai/prompt`][crate::handlers::ai::prompt::handle_prompt_post] -
//! **POST** - Handles the AI prompt request.
//! - [`ai/rating`][crate::handlers::ai::rating::handle_rating_post] -
//! **POST** - Handles the AI rating request.
//! - [`ai/regenerate`][crate::handlers::ai::regenerate::handle_regenerate_post] -
//! **POST** - Handles the AI regenerate request.
//! - [`ai/eventstorming`][crate::handlers::ai::eventstorming::handle_eventstorming_post] -
//! **POST** - Handles the AI Eventstorming request.
//!
//! # Configuration
//!
//! The server configuration is defined in the [`config`][crate::config::Config]
//! Struct.
//!
//! # Environment Variables
//!
//! The following environment variables are used to load the configuration,
//! please make the file `rust-server/.env` and put at
//! least the **bold** ones in it:
//! - **`DB_HOST`**: The host/ip of the PostgreSQL database.
//! - **`DB_NAME`**: The name of the PostgreSQL database.
//! - **`DB_USER`**: The username for the PostgreSQL database.
//! - **`DB_PASSWORD`**: The password for the PostgreSQL database.
//! - **`LLM_SERVER`**: The connection url for the LLM Server (Ollama).
//! Only the host and port are needed. For Example: `http://localhost:3000`, no more.
//! - **`LLM_TOKEN`**: The authentication token for the LLM Server (Ollama).
//! - **`CLIENT_SECRET`**: The client secret for the prooph-board api.
//! - **`CLIENT_ID`**: The ID of the prooph-board api.
//! Something like `_board_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.
//! - `IP`: The IP address of the server. Defaults to `127.0.0.1`.
//! - `PORT`: The port of the server. Defaults to `3000`.
//! - `DB_PORT`: The port of the PostgreSQL database. Defaults to `5432`.
//!
//! # Database
//!
//! The Server uses a PostgreSQL database with the vector extension.
//! There is a docker container available for the database called
//! `pgvector` which can be found at: <https://hub.docker.com/r/pgvector/pgvector>.
//! That container needs the environment variable `POSTGRES_PASSWORD` to be set.

/// This module contains the configuration settings for the server.
pub mod config;

/// This module contains utility functions used by the server like
/// basic database functions and python script execution.
pub mod utils;

/// This module contains the request handlers, handling
/// the requests from the chatbot frontend coming via HTTP
/// to the Server.
pub mod handlers;

/// This module contains the data models used by the server.
pub mod models;
