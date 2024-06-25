import requests
import json
import constants
from langchain_community.embeddings import OllamaEmbeddings

llm_embedding_url = constants.EMBEDDING_URL
llm_generate_url = constants.GENERATE_URL


# Function to send a request to the LLM server
# The function takes a prompt and an optional embedding flag
# The function returns the response from the server
def send_request(prompt: str, model: str, llm_url: str, type: str):
    llm_token = constants.LLM_TOKEN
    data = {
        "model": model,
        "prompt": prompt,
        "stream": False,
    }
    header = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {llm_token}",
    }
    try:
        response = requests.post(llm_url, headers=header, data=json.dumps(data))
        if response.status_code == 200:
            response_text = response.json().get(type, "")
            return response_text
        else:
            print("Error:", response.status_code)
            print("Response text:", response.text)
            return ""
    except Exception as e:
        print("Error occured:", e)
        return ""


# Function to handle a generate request
def handle_generate_request(prompt: str) -> str:
    return send_request(prompt, constants.GENERATE_MODEL, llm_generate_url, "response")


def get_embedding_function():
    header = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {constants.LLM_TOKEN}",
    }
    return OllamaEmbeddings(
        base_url=constants.LLM_SERVER_URL,
        headers=header,
        model=constants.EMBEDDING_MODEL,
    )
