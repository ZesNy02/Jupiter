use std::time::Duration;

use axum::{ http::{ header::CONTENT_TYPE, HeaderValue, Method }, routing::post, Router };
use tower_http::{ cors::{ Any, CorsLayer }, timeout::TimeoutLayer, trace::TraceLayer };

use crate::config::Config;

use super::ai::{
    eventstorming::handle_eventstorming_post,
    prompt::handle_prompt_post,
    rating::handle_rating_post,
    regenerate::handle_regenerate_post,
};

/// Constructs and returns the axum router for the server.
///
/// The router has **CORS** enabled for \* and **Timeout**
/// set to 30 seconds after which the request will be timed
/// out if a shutdown of the server is initiated.
///
/// # Arguments
///
/// * `config` - The server configuration.
///
/// # Returns
///
/// The constructed axum router.
///
/// # Routing Paths
///
/// - [`ai/prompt`][handle_prompt_post] - **POST** -
/// Handles the AI prompt request.
/// - [`ai/rating`][handle_rating_post] - **POST** -
/// Handles the AI rating request.
/// - [`ai/regenerate`][handle_regenerate_post] - **POST** -
/// Handles the AI regenerate request.
/// - [`ai/eventstorming`][handle_eventstorming_post] - **POST** -
/// Handles the AI Eventstorming request.
pub fn get_router(config: Config) -> Router {
    let cors = CorsLayer::new()
        .allow_methods([Method::POST])
        .allow_origin(Any)
        .allow_headers([CONTENT_TYPE]);

    let router = Router::new()
        .route("/ai/prompt", post(handle_prompt_post))
        .route("/ai/rating", post(handle_rating_post))
        .route("/ai/regenerate", post(handle_regenerate_post))
        .route("/ai/eventstorming", post(handle_eventstorming_post))
        .layer((
            TraceLayer::new_for_http(),
            // Set a timeout for all requests after 30 seconds
            TimeoutLayer::new(Duration::from_secs(30)),
            // Enable CORS
            cors,
        ))
        .with_state(config);

    let r = router.clone();

    return r;
}
