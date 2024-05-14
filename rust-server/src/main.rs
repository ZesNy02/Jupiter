use axum::{
    routing::{get, post},
    http::StatusCode,
    Json, Router,
};
use serde::{Deserialize, Serialize};
use rusqlite::{Connection, Result};
use std:: process::Command;

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

#[derive(Deserialize)]
#[derive(Serialize)]
struct Prompt {
    message: String,
}

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

#[derive(Deserialize)]
#[derive(Serialize)]
struct PromptList {
    prompts: Vec<PromptDB>,
}

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

#[derive(Deserialize)]
#[derive(Serialize)]
struct PromptDB {
    prompt: String,
    response: String,
}

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

fn insert_prompt(conn: &Connection, prompt: PromptDB) -> Result<()> {
    conn.execute(
        "INSERT INTO prompts (prompt, response) VALUES (?1, ?2)",
        (prompt.prompt, prompt.response)
    )?;
    Ok(())
}

fn fetch_prompts(conn: &Connection) -> Result<Vec<PromptDB>> {
    let mut stmt = conn.prepare("SELECT id, prompt, response FROM prompts")?;
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
    Ok(prompts)
}

struct ResultError {
    message: String,
}

fn get_result(conn: &Connection, prompt: String) -> Result<PromptDB, ResultError> {
    // find entries in db with prompt
    // then return the result of the prompt if a entry is found
    // otherwise return the result of the ai
    println!("Trying to find prompt: {}", prompt.clone());
    let stmt = conn.prepare("SELECT id, prompt, response FROM prompts WHERE prompt = ?1");
    match stmt {
        Ok(mut stmt) => {
            let rows = stmt.query([prompt.clone()]);
            match rows {
                Ok(mut rows) => {
                    while let Ok(row) = rows.next() {
                        match (row.unwrap().get(1), row.unwrap().get(2)) {
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
    println!("Running ollama");
    println!("Prompt: {}", prompt.clone());
    let response = Command::new("ollama")
        .arg("run")
        .arg("llama3")
        .arg(prompt.clone())
        .output();
            match response {
                Ok(response) => {
                    let response = String::from_utf8_lossy(&response.stdout);
                    println!("Inserting prompt and response into db");
                    let res = insert_prompt(&conn, PromptDB {
                        prompt: prompt.clone(),
                        response: response.to_string(),
                    });
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