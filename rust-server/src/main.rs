use axum::{
    routing::{get, post},
    http::StatusCode,
    Json, Router,
};
use serde::{Deserialize, Serialize};
use rusqlite::{Connection, Result};
use std::process::Command;

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
            let response = Command::new("java")
            .arg("--version")
            .output();
            match response {
                Ok(response) => {
                    let response = String::from_utf8_lossy(&response.stdout);
                    let res = insert_prompt(&conn, PromptDB {
                        prompt: payload.message.clone(),
                        response: response.to_string(),
                    });
                    match res {
                        Ok(_) => {
                            (StatusCode::OK, response.to_string())
                        }
                        Err(e) => {
                            println!("Error: {}", e);
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