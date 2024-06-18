//! The Rust Axum AI Server for the Prooph-Board Chatbot **Chaty**.
//!
//! This server is used to run the AI model for the chatbot and handle requests from the chatbot frontend.
//!
//! The server is built using the `Axum` web framework and uses the `Tokio` runtime for asynchronous tasks.
//!
//! The server uses the `SQLite` database for storing prompts and responses and the `Python AI` model for generating responses.
//!
//! The server is tested using Rust's built-in testing framework.
//!
//! # Routes
//!
//! The routes are defined in the [`router`][crate::handlers::router] module.
//!
//! The server has the following routes:
//! - [`ai/prompt`][crate::handlers::ai::prompt::handle_prompt_post] - **POST** - Handles the AI prompt request.
//! - [`ai/rating`][crate::handlers::ai::rating::handle_rating_post] - **POST** - Handles the AI rating request.
//! - [`ai/regenerate`][crate::handlers::ai::regenerate::handle_regenerate_post] - **POST** - Handles the AI regenerate request.
//! - [`ai/eventstorming`][crate::handlers::ai::eventstorming::handle_eventstorming_post] - **POST** - Handles the AI Eventstorming request.
//!
//! # Configuration
//!
//! The server configuration is defined in the [`config`][crate::config::Config] Struct.The following environment variables are used to load the configuration:
//!
//! # Environment Variables
//!
//! The following environment variables are used to load the configuration,
//! please make a .env file in the root directory of the project and them:
//! - `DB_HOST`: The host/ip of the PostgreSQL database.
//! - `DB_NAME`: The name of the PostgreSQL database.
//! - `DB_USER`: The username for the PostgreSQL database.
//! - `DB_PASSWORD`: The password for the PostgreSQL database.
//! - `LLM_SERVER`: The connection url for the LLM Server (Ollama).
//! - `IP`: The IP address of the server. Defaults to `127.0.0.1`.
//! - `PORT`: The port of the server. Defaults to `3000`.
//! - `DB_PORT`: The port of the PostgreSQL database. Defaults to `5432`.
//!
//! # Database
//!
//! The Server uses a PostgreSQL database with the vector extension. There is a docker container available for the database called
//! `pgvector` which can be found at: <https://hub.docker.com/r/pgvector/pgvector>. It needs the environment variable `POSTGRES_PASSWORD` to be set.

/// This module contains the configuration settings for the server.
pub mod config;

/// This module contains utility functions used by the server.
pub mod utils;

/// This module contains the request handlers for the server.
pub mod handlers;

/// This module contains the data models used by the server.
pub mod models;
