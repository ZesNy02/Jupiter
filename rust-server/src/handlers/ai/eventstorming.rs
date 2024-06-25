use axum::{ extract::State, http::StatusCode, Json };

use crate::{
  config::Config,
  models::routes_data::{
    AIEventStormingRequest,
    AIEventStormingResponse,
    AIEventStormingResponseData,
  },
  utils::python::run_script,
};
use tracing::{ error, info };

/// Bridges the [`testable_handle_eventstorming_post`] to the Axum Router.
///
/// This is done to allow the functionality to be tested with
/// Rust's built-in testing framework.
///
/// # Route
///
/// Handels the `ai/eventstorming` **POST** route.
pub async fn handle_eventstorming_post(
  State(config): State<Config>,
  Json(payload): Json<AIEventStormingRequest>
) -> (StatusCode, Json<AIEventStormingResponse>) {
  return testable_handle_eventstorming_post(config, payload);
}

/// Handles the AI event storming request.
///
/// This function runs the event storming script with the given prompt and
/// sends an response back to the client.
///
/// # Arguments
///
/// * `config` - The server [`Config`].
/// * `payload` - The [`AIEventStormingRequest`] payload.
///
/// # Returns
///
/// A tuple containing the [`StatusCode`] and the
/// [`AIEventStormingResponse`] as JSON. The successfull response
/// contains a message `Event Storming successfull.`.
///
/// # Debug
///
/// This function logs the following:
/// - An info message when the event storming script is trying to run as
/// `info` in the format `Trying to run event storming script.`
/// - An info message when the event storming script is successfull as
/// `info` in the format `Event Storming successfull.`
/// - An error message when the event storming script fails as
/// `error` in the format `Error: <error>`.
pub fn testable_handle_eventstorming_post(
  config: Config,
  payload: AIEventStormingRequest
) -> (StatusCode, Json<AIEventStormingResponse>) {
  let prompt = payload.prompt.clone();
  let script = config.event_storming_script.clone();

  info!("Trying to run event storming script.");

  let result = run_script(script, vec![prompt]);

  match result {
    Ok(_response) => {
      info!("Event Storming successfull.");
      return (
        StatusCode::OK,
        Json(
          AIEventStormingResponse::Success(AIEventStormingResponseData {
            message: "Event Storming successfull.".to_string(),
          })
        ),
      );
    }
    Err(err) => {
      error!("Error: {:?}", err);
      return (
        StatusCode::INTERNAL_SERVER_ERROR,
        Json(AIEventStormingResponse::Error(err.to_string())),
      );
    }
  }
}
