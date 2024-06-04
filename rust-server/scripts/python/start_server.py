import signal
import sys
import subprocess
import os

# Global variable to hold the server process
server_process = None


def start_server():
    global server_process
    # Start the subprocess
    server_process = subprocess.Popen(["cargo", "run"])


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
        ]
    )


def get_embeddings():
    # Check if the chroma folder exists
    chroma_folder = os.path.join(os.path.dirname(__file__), "../../chroma")
    if os.path.exists(chroma_folder):
        return
    else:
        # Create Chroma folder
        os.mkdir(chroma_folder)

        # Change the current working directory
        os.chdir(chroma_folder)

        # Install the dependencies
        subprocess.run(["python3", "./scripts/python/vectorstore.py"])


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

    install_dependencies()
    get_embeddings()
    start_server()
