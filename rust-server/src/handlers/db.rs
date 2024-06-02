use axum::{ extract::State, http::StatusCode, Json };

use crate::{
  config::Config,
  models::{ database::DBError, routes_data::{ DBEditRequest, DBFetchResponse, PromptList } },
  utils::sqlite::{ fetch_prompts, update_prompt },
};

// --- Start of Edit routes handlers: ---
pub async fn handle_db_post_edit(
  State(config): State<Config>,
  Json(payload): Json<DBEditRequest>
) -> (StatusCode, String) {
  return handle_edit(&config, payload);
}
// --- End of Edit routes handlers ---

// --- Start of Fetch routes handlers: ---
pub async fn handle_db_post_fetch_all(State(config): State<Config>) -> (
  StatusCode,
  Json<DBFetchResponse>,
) {
  let (status, list) = handle_fetch(&config, None);
  return (status, Json(list));
}

pub async fn handle_db_post_fetch_usefull(State(config): State<Config>) -> (
  StatusCode,
  Json<DBFetchResponse>,
) {
  let (status, list) = handle_fetch(&config, Some(true));
  return (status, Json(list));
}

pub async fn handle_db_post_fetch_not_usefull(State(config): State<Config>) -> (
  StatusCode,
  Json<DBFetchResponse>,
) {
  let (status, list) = handle_fetch(&config, Some(false));
  return (status, Json(list));
}
// --- End of Fetch routes handlers ---

//--- Start of Testable handler functions: ---
pub fn handle_fetch(config: &Config, usefull: Option<bool>) -> (StatusCode, DBFetchResponse) {
  let prompts = fetch_prompts(&config, usefull);
  match prompts {
    Ok(prompts) => {
      return (StatusCode::OK, DBFetchResponse::Success(PromptList { prompts }));
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

pub fn handle_edit(config: &Config, payload: DBEditRequest) -> (StatusCode, String) {
  let res = update_prompt(&config, payload.id, payload.usefull);
  match res {
    Ok(_) => {
      return (StatusCode::OK, "Success".to_string());
    }
    Err(e) => {
      match e {
        DBError::ConnectionError => {
          return (StatusCode::INTERNAL_SERVER_ERROR, "Could not open Database".to_string());
        }
        DBError::TableCreationError => {
          return (StatusCode::INTERNAL_SERVER_ERROR, "Could not create table".to_string());
        }
        DBError::UpdateError => {
          return (StatusCode::INTERNAL_SERVER_ERROR, "Could not update prompt".to_string());
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
