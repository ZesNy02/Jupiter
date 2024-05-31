use axum::{
    routing::{get, post},
    http::StatusCode,
    Json, Router,
};
use serde::{Deserialize, Serialize};
use rusqlite::{Connection, Result};
use std:: process::Command;

/// Main function
///
/// Initializes the tracing, builds the app with routes, runs the app with hyper
///
/// The app listens globally on port 3000
///
/// The app has two routes:
///
///    /ai: HTTP POST route that runs the get_result() function and returns the response as String
///
///    /db: HTTP GET route that fetches all entries from the db and returns them as json
#[tokio::main]
async fn main() {
    // initialize tracing
    tracing_subscriber::fmt::init();

    // build our application with a route
    let app = Router::new()
        .route("/ai", post(handle_ai))
        .route("/db", get(handle_db));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

/// Struct for the prompt
#[derive(Deserialize)]
#[derive(Serialize)]
struct Prompt {
    message: String,
}


/// HTTP POST handler for /ai
///
/// Run the get_result() function and return the response as String
///
/// If an error occurs, return an error message
async fn handle_ai(
    Json(payload): Json<Prompt>,
) -> (StatusCode, String) {
    let conn = open_db("./prompts.db".to_string());
    match conn {
        Ok(conn) => {
            let result = get_result(&conn, payload.message.clone());
            match result {
                Ok(result) => {
                    (StatusCode::OK, result.response)
                }
                Err(e) => {
                    println!("Error: {}", e.message);
                    (StatusCode::INTERNAL_SERVER_ERROR, "Error".to_string())
                }

            }
        }
        Err(e) => {
            println!("Error: {}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, "Error".to_string())
        }
    }
}

/// Struct for the db
#[derive(Deserialize)]
#[derive(Serialize)]
struct PromptList {
    prompts: Vec<PromptDB>,
}

/// HTTP GET handler for /db
///
/// Fetch all entries from the db and return them as json
///
/// If an error occurs, return an empty list
async fn handle_db() -> (StatusCode, Json<PromptList>) {
    let conn = open_db("./prompts.db".to_string());
    match conn {
        Ok(conn) => {
            let prompts = fetch_prompts(&conn);
            match prompts {
                Ok(prompts) => {
                    (StatusCode::OK, Json(PromptList { prompts }))
                },
                Err(e) => {
                    println!("Error: {}", e);
                    (StatusCode::INTERNAL_SERVER_ERROR, Json(PromptList { prompts: Vec::new() }))
                }
            }
        }
        Err(e) => {
            println!("Error: {}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(PromptList { prompts: Vec::new() }))
        }
    }
}

/// Struct for the db
#[derive(Deserialize)]
#[derive(Serialize)]
struct PromptDB {
    /// The prompt that was given
    prompt: String,
    /// The response that was given
    response: String,
}

/// Open the db and create the table if it does not exist
///
/// Return the connection
fn open_db(path: String) -> Result<Connection> {
    let conn = Connection::open(path);
    match conn {
        Ok(conn) => {
            conn.execute(
                "CREATE TABLE IF NOT EXISTS prompts (
                    id INTEGER PRIMARY KEY,
                    prompt TEXT NOT NULL,
                    response TEXT NOT NULL
                )",
                (),
            )?;
            Ok(conn)
        },
        Err(e) => {
            println!("Error: {}", e);
            Err(e)
        }
    } 
}

/// Insert a prompt into the db
fn insert_prompt(conn: &Connection, prompt: PromptDB) -> Result<()> {
    conn.execute(
        "INSERT INTO prompts (prompt, response) VALUES (?1, ?2)",
        (prompt.prompt, prompt.response)
    )?;
    Ok(())
}

/// Fetch all entries from the db
fn fetch_prompts(conn: &Connection) -> Result<Vec<PromptDB>> {
    // select all entries from the db
    let mut stmt = conn.prepare("SELECT id, prompt, response FROM prompts")?;
    // convert the entries to a vector
    let prompt_iter = stmt.query_map([], |row| {
        Ok(PromptDB {
            prompt: row.get(1)?,
            response: row.get(2)?,
        })
    })?;
    let mut prompts = Vec::new();
    for prompt in prompt_iter {
        prompts.push(prompt?);
    }
    // return the vector
    Ok(prompts)
}

/// A Error that gets returned in get_result
struct ResultError {
    /// The error message
    message: String,
}

/// Get the result of the prompt
///
/// If the prompt is found in the db, return the response from the db
///
/// Otherwise, run the ai and return the response from the ai
fn get_result(conn: &Connection, prompt: String) -> Result<PromptDB, ResultError> {
    println!("Trying to find prompt: {}", prompt.clone());
    // find entry in db
    let stmt = conn.prepare("SELECT id, prompt, response FROM prompts WHERE prompt = ?1");
    // rust error handling of doom, needs to be rewritten to be rust conform.
    // requires a lot of rust knowledge to understand
    match stmt {
        Ok(mut stmt) => {
            let rows = stmt.query([prompt.clone()]);
            match rows {
                Ok(mut rows) => {
                    while let Ok(row) = rows.next() {
                        match row {
                            Some(row) => {
                                match (row.get(1), row.get(2)) {
                                    (Ok(prompt), Ok(response)) => {
                                        return Ok(PromptDB {
                                            prompt,
                                            response,
                                        });
                                    }
                                    _ => {
                                        println!("Info: Could not find prompt in db");
                                    }
                                }
                            }
                            None => {
                                println!("Info: No Entry Found");
                                break;
                            }
                        }
                    }
                }
                Err(e) => {
                    println!("Error: {}", e);
                }
            }
        }
        Err(e) => {
            println!("Error: {}", e);

        }
    }
    // prompt not found in db, run ai
    println!("Running ragpy.py");
    println!("Prompt: {}", prompt.clone());
    // execute command in shell "python3 ragpy.py <prompt>"
    let response = Command::new("python3")
        .arg("/home/paul/Team-JupITer/Jupiter/Rag/ragpy.py")
        .arg(prompt.clone())
        .output();
    println!("ragpy.py done running.");
    // rust error handling, needs to be rewritten to be rust conform
    match response {
        Ok(response) => {
            // insert prompt and response into db
            let response = String::from_utf8_lossy(&response.stdout);
            println!("Inserting prompt and response into db");
            let res = insert_prompt(&conn, PromptDB {
                prompt: prompt.clone(),
                response: response.to_string(),
            });
            // if insert fails, return error, otherwise return response
            match res {
                Ok(_) => {
                    return Ok(PromptDB {
                        prompt: prompt.clone(),
                        response: response.to_string(),
                    });
                }
                Err(e) => {
                    println!("Error: {}", e);
                    return Err(ResultError {
                        message: format!("Error: {}", e),
                    });
                }
            }
        }
        Err(e) => {
            println!("Error: {}", e);
            return Err(ResultError {
                message: format!("Error: {}", e),
            });
        }
    }
}