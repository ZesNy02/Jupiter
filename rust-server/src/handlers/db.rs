use axum::{ extract::State, http::StatusCode, Json };

use crate::{
    config::Config,
    models::{ database::DBError, routes_data::{ DBRatingEditRequest, DBFetchResponse, EntryList } },
    utils::sqlite::{ fetch_prompts, update_prompt },
};

// --- Start of Edit routes handlers: ---
/// Function to handle the **POST** request to edit a prompt in the database.
///
/// # Arguments
///
/// * `config` - The server configuration. Automatically received by Axum.
/// * `payload` - The request payload containing the prompt ID and the new usefullness value.
///
/// # Returns
///
/// A tuple containing the HTTP status code and a message indicating the success or failure of the operation.
///
/// # Route
///
/// * **POST** `/db/edit`
pub async fn handle_db_post_edit(
    State(config): State<Config>,
    Json(payload): Json<DBRatingEditRequest>
) -> (StatusCode, String) {
    return handle_edit(&config, payload);
}
// --- End of Edit routes handlers ---

// --- Start of Fetch routes handlers: ---
/// Function to handle the **GET** request to fetch all prompts from the database.
///
/// # Arguments
///
/// * `config` - The server configuration. Automatically received by Axum.
///
/// # Returns
///
/// A tuple containing the HTTP status code and a JSON response containing a [DBFetchResponse] of all prompts.
pub async fn handle_db_post_fetch_all(State(config): State<Config>) -> (
    StatusCode,
    Json<DBFetchResponse>,
) {
    let (status, list) = handle_fetch(&config, None);
    return (status, Json(list));
}

/// Function to handle the **GET** request to fetch all usefull prompts from the database.
///
/// # Arguments
///
/// * `config` - The server configuration. Automatically received by Axum.
///
/// # Returns
///
/// A tuple containing the HTTP status code and a JSON response containing a [DBFetchResponse] of usefull prompts.
pub async fn handle_db_post_fetch_usefull(State(config): State<Config>) -> (
    StatusCode,
    Json<DBFetchResponse>,
) {
    let (status, list) = handle_fetch(&config, Some(true));
    return (status, Json(list));
}

/// Function to handle the **GET** request to fetch all not usefull prompts from the database.
///
/// # Arguments
///
/// * `config` - The server configuration. Automatically received by Axum.
///
/// # Returns
///
/// A tuple containing the HTTP status code and a JSON response containing a [DBFetchResponse] of not usefull prompts.
pub async fn handle_db_post_fetch_not_usefull(State(config): State<Config>) -> (
    StatusCode,
    Json<DBFetchResponse>,
) {
    let (status, list) = handle_fetch(&config, Some(false));
    return (status, Json(list));
}
// --- End of Fetch routes handlers ---

//--- Start of Testable handler functions: ---
/// Handles the fetch request by fetching prompts from the database.
///
/// # Arguments
///
/// * `config` - The server configuration.
/// * `usefull` - An optional boolean value to filter prompts by usefullness.
///
/// # Returns
///
/// A tuple containing the HTTP status code and a [DBFetchResponse] containing the list of prompts or an error message.
pub fn handle_fetch(config: &Config, usefull: Option<bool>) -> (StatusCode, DBFetchResponse) {
    let prompts = fetch_prompts(&config, usefull);
    match prompts {
        Ok(prompts) => {
            return (StatusCode::OK, DBFetchResponse::Success(EntryList { prompts }));
        }
        Err(e) => {
            match e {
                DBError::ConnectionError => {
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        DBFetchResponse::Error("Could not open Database".to_string()),
                    );
                }
                DBError::TableCreationError => {
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        DBFetchResponse::Error("Could not create table".to_string()),
                    );
                }
                DBError::QueryError => {
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        DBFetchResponse::Error("Could not fetch prompts".to_string()),
                    );
                }
                _ => {
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        DBFetchResponse::Error("Something that should never happen.".to_string()),
                    );
                }
            }
        }
    }
}

/// Handles the edit request by updating a prompt in the database.
///
/// # Arguments
///
/// * `config` - The server configuration.
/// * `payload` - The request payload as a [DBRatingEditRequest].
///
/// # Returns
///
/// A tuple containing the HTTP status code and a message indicating the success or failure of the operation.
pub fn handle_edit(config: &Config, payload: DBRatingEditRequest) -> (StatusCode, String) {
    let res = update_prompt(&config, payload.id, payload.usefull);
    match res {
        Ok(_) => {
            return (StatusCode::OK, "Success".to_string());
        }
        Err(e) => {
            match e {
                DBError::ConnectionError => {
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        "Could not open Database".to_string(),
                    );
                }
                DBError::TableCreationError => {
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        "Could not create table".to_string(),
                    );
                }
                DBError::UpdateError => {
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        "Could not update prompt".to_string(),
                    );
                }
                _ => {
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        "Something that should never happen.".to_string(),
                    );
                }
            }
        }
    }
}
//--- End of Testable handler functions: ---
