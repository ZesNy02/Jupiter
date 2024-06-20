FROM rust:latest

# # Install Python
# RUN apt-get update && apt-get install -y python3 python3-pip python3-venv

# # Test the installation
# RUN python3 --version
# RUN pip --version
# RUN rustc --version

# # Create a virtual environment and activate it
# RUN python3 -m venv /opt/venv
# ENV PATH="/opt/venv/bin:$PATH"

# # Install any needed packages specified in requirements.txt
# RUN pip install --upgrade langchain langchain-community langchainhub langchain-openai langchain-chroma bs4 pypdf sentence_transformers

# # Set the working directory
WORKDIR /app/rust-server

# # Copy the current directory contents into the container at /app
COPY . .

# # Install the server
# RUN python3 ./scripts/python/vectorstore.py
# RUN cargo build

# # Define a volume for the data folder
VOLUME ["/app/data"]

# # Run the server
CMD apt-get update && \
        apt-get install -y python3 python3-pip python3-venv && \
        python3 -m venv /opt/venv && \
        export PATH="/opt/venv/bin:$PATH" && \
        pip install --upgrade -r requirements.txt --no-index && \
        python3 ./scripts/python/vectorstore.py && \
        cargo build && \
        cargo run
