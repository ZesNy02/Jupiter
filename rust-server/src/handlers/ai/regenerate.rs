use axum::{ extract::State, http::StatusCode, Json };

use crate::{
    config::{ Config, Mode },
    models::routes_data::{
        AIRegenerateRequest,
        AIRegenerateResponse,
        AIRegenerateResponseData,
        VectorSearchResult,
    },
    utils::{ postgres::insert_answer, python::{ handle_prompt_request, handle_vector_search } },
};

use tracing::error;

/// Bridges the [`testable_handle_regenerate_post`] to the Axum Router.
///
/// This is done to allow the functionality to be tested with Rust's built-in testing framework.
///
/// # Route
///
/// Handels the `ai/regenerate` **POST** route.
pub async fn handle_regenerate_post(
    State(config): State<Config>,
    Json(payload): Json<AIRegenerateRequest>
) -> (StatusCode, Json<AIRegenerateResponse>) {
    return testable_handle_regenerate_post(config, payload);
}

/// Handles the AI regenerate request.
///
/// # Arguments
///
/// * `config` - The server [`Config`].
/// * `payload` - The [`AIRegenerateRequest`] payload.
///
/// # Returns
///
/// A tuple containing the [`StatusCode`] and the [`AIRegenerateResponse`] as JSON.
pub fn testable_handle_regenerate_post(
    config: Config,
    payload: AIRegenerateRequest
) -> (StatusCode, Json<AIRegenerateResponse>) {
    let mode = config.mode.clone();
    let prompt = payload.prompt.clone();

    let search_result = handle_vector_search(&config, &prompt);
    if let Err(err) = search_result {
        if mode == Mode::Dev {
            error!("Error: {:?}", err);
        }
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(AIRegenerateResponse::Error(err.to_string())),
        );
    }
    let id_result = search_result.unwrap();
    let prompt_id = match id_result {
        VectorSearchResult::Existing(id) => id,
        VectorSearchResult::New(id) => id,
    };

    // TODO parse llm url
    let result = handle_prompt_request(&config, &prompt);
    match result {
        Ok(answer) => {
            return handle_db_insert(config, prompt_id, answer);
        }
        Err(err) => {
            if mode == Mode::Dev {
                error!("Error: {:?}", err);
            }
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(AIRegenerateResponse::Error(err.to_string())),
            );
        }
    }
}

/// Handels the database insert operation for the answer and converts the result to
/// the appropriate response.
///
/// # Arguments
///
/// * `config` - The server [`Config`].
/// * `prompt_id` - The ID of the prompt.
/// * `response` - The response from the AI.
///
/// # Returns
///
/// A tuple containing the [`StatusCode`] and the [`AIPromptResponse`] as JSON.
fn handle_db_insert(
    config: Config,
    prompt_id: i32,
    answer: String
) -> (StatusCode, Json<AIRegenerateResponse>) {
    let mode = config.mode.clone();
    let db_connection = config.db_connection.clone();

    let result = insert_answer(&db_connection, prompt_id, &answer);

    match result {
        Ok(answer_id) => {
            return (
                StatusCode::OK,
                Json(
                    AIRegenerateResponse::Success(AIRegenerateResponseData {
                        id: answer_id,
                        response: "Answer inserted successfully.".to_string(),
                    })
                ),
            );
        }
        Err(err) => {
            if mode == Mode::Dev {
                error!("Error: {:?}", err.log_message());
            }
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(AIRegenerateResponse::Error(err.message())),
            );
        }
    }
}
