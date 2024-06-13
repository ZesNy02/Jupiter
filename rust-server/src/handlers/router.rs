use std::time::Duration;

use axum::{ http::{ HeaderValue, Method }, routing::{ get, post }, Router };
use tower_http::{ cors::CorsLayer, timeout::TimeoutLayer, trace::TraceLayer };

use crate::config::{ Config, Mode };

use super::{
  ai::{ handle_ai_dummy_err, handle_ai_dummy_ok, handle_ai_post },
  db::{
    handle_db_post_edit,
    handle_db_post_fetch_all,
    handle_db_post_fetch_not_usefull,
    handle_db_post_fetch_usefull,
  },
};

/// Constructs and returns the axum router for the server.
///
/// The router has **CORS** enabled for \* and **Timeout** set to 30 seconds after which the request
/// will be timed out if a shutdown of the server is initiated.
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
/// * `/db/edit` - **POST** request to edit a prompt in the database.
/// * `/db/fetch/all` - **GET** request to fetch all prompts from the database.
/// * `/db/fetch/usefull` - **GET** request to fetch all usefull prompts from the database.
/// * `/db/fetch/not_usefull` - **GET** request to fetch all not usefull prompts from the database.
/// * `/ai` - **POST** request to get a response from the AI model.
/// * `/ai/dummy/ok` - **POST** request to get a dummy response instead of running the AI. **DEVELOPMENT ONLY**.
/// * `/ai/dummy/err` - **POST** request to get a dummy error instead of running the AI. **DEVELOPMENT ONLY**.
pub fn get_router(config: Config) -> Router {
  let configcopy = config.clone();
  let mut router = Router::new()
    .route("/db/edit", post(handle_db_post_edit))
    .route("/db/fetch/all", get(handle_db_post_fetch_all))
    .route("/db/fetch/usefull", get(handle_db_post_fetch_usefull))
    .route("/db/fetch/not_usefull", get(handle_db_post_fetch_not_usefull))
    .route("/ai", post(handle_ai_post))
    .layer((
      TraceLayer::new_for_http(),
      // Set a timeout for all requests after 30 seconds
      TimeoutLayer::new(Duration::from_secs(30)),
      // Enable CORS
      CorsLayer::new()
        .allow_origin("*".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST]),
    ))
    .with_state(config);

  if configcopy.mode == Mode::Dev {
    router = router
      .route("/ai/dummy/ok", post(handle_ai_dummy_ok))
      .route("/ai/dummy/err", post(handle_ai_dummy_err));
  }

  let r = router.clone();

  return r;
}
