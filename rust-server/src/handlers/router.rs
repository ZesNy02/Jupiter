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
