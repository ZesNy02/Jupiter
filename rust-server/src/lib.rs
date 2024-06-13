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
//! # Configuration
//!
//! The server configuration is defined in the [`config`][crate::config::Config] Struct.

/// This module contains the configuration settings for the server.
pub mod config;

/// This module contains utility functions used by the server.
pub mod utils;

/// This module contains the request handlers for the server.
pub mod handlers;

/// This module contains the data models used by the server.
pub mod models;
