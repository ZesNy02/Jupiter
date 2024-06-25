import os


# Function to prep the .env file as environment variables
# This function exists because dotenv couldn't be installed for some reason
def load_env_variables(env_file_path: str):
    try:
        with open(env_file_path, "r") as env_file:
            for line in env_file:
                key, value = line.strip().split("=")
                value = value.strip('"').strip("'")
                os.environ[key] = value
    except FileNotFoundError:
        print(f"Could not find .env file, better have docker running.")
