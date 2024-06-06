use axum::{ extract::State, http::StatusCode, Json };

use tracing::{ error, info };
use crate::{
    config::{ Config, Mode },
    models::{
        database::DBError,
        python_ai::AIError,
        routes_data::{ AIResponse, PromptRequest, PromptResponse },
    },
    utils::{ python::run_ai, sqlite::insert_prompt },
};

// --- Start of AI routes handlers: ---
pub async fn handle_ai_post(
    State(config): State<Config>,
    Json(payload): Json<PromptRequest>
) -> (StatusCode, Json<AIResponse>) {
    let (status, response) = handle_ai(&config, payload);
    return (status, Json(response));
}

pub async fn handle_ai_dummy_ok(Json(payload): Json<PromptRequest>) -> (
    StatusCode,
    Json<AIResponse>,
) {
    let (status, response) = (
        StatusCode::OK,
        AIResponse::Success(PromptResponse {
            id: 0,
            response: "The Response text which is **incredible** will be:".to_string() +
            &payload.message,
        }),
    );
    return (status, Json(response));
}

pub async fn handle_ai_dummy_err() -> (StatusCode, Json<AIResponse>) {
    let (status, response) = (
        StatusCode::INTERNAL_SERVER_ERROR,
        AIResponse::Error("This is a dummy error message".to_string()),
    );
    return (status, Json(response));
}
// --- End of AI routes handlers ---

//--- Start of Testable handler functions: ---
pub fn handle_ai(config: &Config, payload: PromptRequest) -> (StatusCode, AIResponse) {
    let mode = config.mode.clone();
    let message = payload.message.clone();
    if mode == Mode::Dev {
        info!("Running AI with prompt: {}", message);
    }
    let response = run_ai(&config, message.clone());
    match response {
        Ok(response) => {
            if mode == Mode::Dev {
                info!("AI response: {}", response);
            }
            let res = add_to_db(config, message.clone(), response.clone());
            match res {
                Ok(id) => {
                    if mode == Mode::Dev {
                        info!(
                            "Added prompt and response to database.\nPrompt: {}\nResponse: {}",
                            message,
                            response
                        );
                    }
                    return (StatusCode::OK, AIResponse::Success(PromptResponse { id, response }));
                }
                Err(e) => {
                    error!("Error while attempting Database operation: {}", e);
                    if mode == Mode::Dev {
                        info!(
                            "Could not add prompt and response to database:\nPrompt: {}\nResponse: {}",
                            message,
                            response
                        );
                    }
                    return (
                        StatusCode::OK,
                        AIResponse::Success(PromptResponse { id: -1, response }),
                    );
                }
            }
        }
        Err(e) => {
            match e {
                AIError::PathError => {
                    error!("Could not find the python script");
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        AIResponse::Error("Could not find the python script".to_string()),
                    );
                }
                AIError::ScriptError => {
                    error!("Error while running the python script");
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        AIResponse::Error("Error while running the python script".to_string()),
                    );
                }
                AIError::IOError => {
                    error!("Error while reading the python script");
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        AIResponse::Error("Error while reading the python script".to_string()),
                    );
                }
                AIError::EmptyResponse => {
                    error!("Empty response from the python script");
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        AIResponse::Error("Empty response from the python script".to_string()),
                    );
                }
            }
        }
    }
}

fn add_to_db(config: &Config, message: String, response: String) -> Result<i64, String> {
    let res = insert_prompt(&config, &message, &response);
    match res {
        Ok(id) => {
            return Ok(id);
        }
        Err(e) => {
            match e {
                DBError::ConnectionError => {
                    return Err("Could not open Database".to_string());
                }
                DBError::TableCreationError => {
                    return Err("Could not create table".to_string());
                }
                DBError::InsertError => {
                    return Err("Could not insert prompt".to_string());
                }
                _ => {
                    return Err("Something that should never happen.".to_string());
                }
            }
        }
    }
}
//--- End of Testable handler functions ---
