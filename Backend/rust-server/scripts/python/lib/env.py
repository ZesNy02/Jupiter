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
        # If the .env file is not found, try to load the environment variables from the system
        env_vars = [
            "CLIENT_SECRET",
            "CLIENT_ID",
            "DB_HOST",
            "DB_PORT",
            "DB_NAME",
            "DB_USER",
            "DB_PASSWORD",
            "LLM_SERVER",
            "LLM_TOKEN",
        ]
        for env_var in env_vars:
            some = os.getenv(env_var)
            if some is None:
                # If the environment variable is not set, print an error message and return
                print(
                    f"Error while loading environment variables: {env_var} is not set."
                )
                return
