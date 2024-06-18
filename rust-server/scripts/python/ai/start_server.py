import signal
import sys
import subprocess
import os
import hashlib

# Global variable to hold the server process
server_process = None


def start_server():
    global server_process
    # Start the subprocess
    server_process = subprocess.Popen(["cargo", "run"])
    print("Server started.")
    exit(0)


def install_dependencies():
    # Change the current working directory
    os.chdir(os.path.join(os.path.dirname(__file__), "../../"))

    # Install the dependencies
    subprocess.run(
        [
            "pip",
            "install",
            "--upgrade",
            "langchain",
            "langchain-community",
            "langchainhub",
            "langchain-openai",
            "langchain-chroma",
            "bs4",
            "pypdf",
            "sentence_transformers",
            "pgvector",
        ]
    )


def calculate_hash(file_path):
    # Create a hash object
    hash_object = hashlib.sha256()

    # Open the file in binary mode
    with open(file_path, "rb") as file:
        # Read the file in chunks
        for chunk in iter(lambda: file.read(4096), b""):
            # Update the hash object with the chunk
            hash_object.update(chunk)

    # Get the hexadecimal representation of the hash value
    hash_value = hash_object.hexdigest()

    return hash_value


def get_embeddings():
    # Check if the "data" folder exists
    data_folder_path = os.path.join(os.path.dirname(__file__), "data")
    if os.path.exists(data_folder_path):
        # Calculate the hash value of the wiki.pdf file in the "data" folder
        pdf_file_path = os.path.join(data_folder_path, "wiki.pdf")
        hash_value = calculate_hash(pdf_file_path)

        # Read the previous hash value from value.txt
        previous_hash_value = ""
        value_file_path = os.path.join(data_folder_path, "value.txt")
        print("Checking for change in wiki...")
        if os.path.exists(value_file_path):
            with open(value_file_path, "r") as value_file:
                previous_hash_value = value_file.read().strip()

        # Compare the hash values
        if hash_value != previous_hash_value:
            # change directory to the current directory
            os.chdir(os.path.join(os.path.dirname(__file__)))

            print("Updating embeddings...")

            # Execute the "vectorstore.py" file
            subprocess.run(["python3", "vectorstore.py"])

            # Save the new hash value to value.txt
            with open(value_file_path, "w") as value_file:
                value_file.write(hash_value)

            print("Embeddings updated.")


def shutdown(signal, frame):
    print("Shutting down...")
    if server_process is not None:
        server_process.terminate()
        server_process.wait()
    sys.exit(0)


if __name__ == "__main__":
    # Register the signal handlers
    signal.signal(signal.SIGINT, shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    print("Installing dependencies...")
    install_dependencies()
    print("Dependencies installed.")
    get_embeddings()
    # print("Starting server...")
    # start_server()
