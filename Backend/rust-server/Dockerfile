FROM rust:latest

# # Set the working directory
WORKDIR /app/rust-server

# # Copy the current directory contents into the container at /app
COPY . .

# # Define a volume for the data folder
VOLUME ["/app/data"]

# # Run the server
CMD apt-get update && \
        apt-get install -y python3 python3-venv python3-dev libpq-dev && \
        python3 -m venv /opt/venv && \
        export PATH="/opt/venv/bin:$PATH" && \
        python3 -m pip install --upgrade pip && \
        python3 --version && \
        pip install --upgrade -r requirements.txt && \
        cargo build --release && \
        cargo run
