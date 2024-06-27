# What to install to run the Server

## Python

- Install `Python` and `pip` from the offical site.
- Make sure it's `Python 3.10` or above.

## Rust

- Install rustup from `rust-lang.org` and follow the instructions there.
- cargo needs to be able to run without problem.

# How to run the Server

## Docker

- You can find an example Docker Compose file in the `rust-server` directory named `example_compose.yml`.

## Native

### Install dependencies

- To setup the dependencies and build the server, run either the `windows_setup.bat` or `linux_setup.sh` file
  depending on your operating system.

### Setup the Server

- Create a `.env` file in the `rust-server` directory.
- Fill in the **requiered** Variables at least:
  - **`DB_HOST`**: The host/ip of the PostgreSQL database. Example: **127.0.0.1**
  - **`DB_NAME`**: The name of the PostgreSQL database. Example: **postgres**
  - **`DB_USER`**: The username for the PostgreSQL database. Example: **postgres**
  - **`DB_PASSWORD`**: The password for the PostgreSQL database. Example: **password**
  - **`LLM_SERVER`**: The connection url for the LLM Server (Ollama).
    Only the host and port are needed. For Example: `http://localhost:3000`, no more.
  - **`LLM_TOKEN`**: The authentication token for the LLM Server (Ollama).
  - **`CLIENT_SECRET`**: The client secret for the prooph-board api.
  - **`CLIENT_ID`**: The ID of the prooph-board api.
    Something like `_board_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.
  - `IP`: The IP address of the server. Defaults to `0.0.0.0`.
  - `PORT`: The port of the server. Defaults to `3000`.
  - `DB_PORT`: The port of the PostgreSQL database. Defaults to `5432`.

### Run the Server

- To run the Server, go to the `rust-server` directory.
- Then execute `cargo run`

### See the Rust Documentation

- To see the documentation of the Rust Server, go to the `rust-server/target/doc/rust_server` directory and open the `index.html` file in there.

# Run the tests

## Rust

- Go into the `rust-server` directory and run `cargo test`
