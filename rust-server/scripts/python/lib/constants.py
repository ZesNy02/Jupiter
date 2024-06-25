import os
from lib.env import load_env_variables

# Path to the .env file
PATH_TO_ENV = os.path.abspath(__file__ + "/../../../../.env")
# Prep the .env file as environment variables
load_env_variables(PATH_TO_ENV)

# Path were the local vectorstore is stored
CHROMA_PATH = os.path.abspath(__file__ + "/../chroma")
# Path were the data as pdf is stored for the AI to refer to
DATA_PATH = os.path.abspath(__file__ + "/../data")

# Template for the chat prompt for better outputs
PROMPT_TEMPLATE = """
You are supposed to act as a customer support and explain how to use the Proophboard Software everything relevant,
associated with it and how it works in Detail:

{context}

Keep the question in mind. Answer the question based on the above context and think step by step.
Stick to relevenat information to the Questions in your answer and answer in three sentences: {question}
"""

# Template for the event storming prompts
STORM_TEMPLATE = """ Imagine you're facilitating an Event Storming session on the topic: '{topic}'.
 Generate insightful events related to the domain. Remember to think from different perspectives,
 including users, stakeholders, and systems. Aim for clarity and specificity in your event descriptions.
 The Events should be formatted like BookOrdered. Only output the events themself in your answer and keep
 them formulated as one word in past tense. Output like this events = [
    'Event1',
    'Event2',
    'Event3',...
]
"""

# The client secret of the prooph-board url, found in the prooph-board settings
CLIENT_SECRET = os.getenv("CLIENT_SECRET")

# Example: CLIENT_SECRET = "nM5B5EdSaC59MfW4C4f2o4L0a6Vvu8OA"

# The client id of the prooph-board url, found after "board-agent/" in the url
CLIENT_ID = os.getenv("CLIENT_ID").split("_")[2]
# Example: CLIENT_ID =  "4544590e-e0e5-466e-a34e-72d83cffc692"

# The url of the prooph-board api to add elements to the board
PROOPH_URL = f"https://app.prooph-board.com/board/api/v1/board-agent/{CLIENT_ID}/tasks/add-element-at-position"

# Example: PROOPH_URL = "https://app.prooph-board.com/board/api/v1/board-agent/4544590e-e0e5-466e-a34e-72d83cffc692/tasks/add-element-at-position"

# Database information from the .env
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

# Format the database information
DB_URL = f"host={DB_HOST} port={DB_PORT} dbname={DB_NAME} user={DB_USER} password={DB_PASSWORD}"

# LLM Server Url
LLM_SERVER_URL = os.getenv("LLM_SERVER")
EMBEDDING_URL = f"{LLM_SERVER_URL}/api/embeddings"
GENERATE_URL = f"{LLM_SERVER_URL}/api/generate"

# LLM Constants
EMBEDDING_MODEL = "mxbai-embed-large"
GENERATE_MODEL = "codestral"

# Token for authentication for the LLM Server
LLM_TOKEN = os.getenv("LLM_TOKEN")

# Vectorstore constants
CHUNK_SIZE = 600
CHUNK_OVERLAP = 20
