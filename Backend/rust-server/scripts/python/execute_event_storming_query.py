from langchain.prompts import ChatPromptTemplate
import argparse
import lib.constants as constants
import requests
from lib.request_handlers import handle_generate_request


# Function to place the events from the AI on the prooph-board
def place_event(event: str, x: int, y: int):
    data = {
        "elementId": f"{event}",
        "boardId": f"{constants.CLIENT_ID}",
        "type": "event",
        "name": f"{event}",
        "content": "",
        "position": {"x": x, "y": y},
        "parent": "string",
        "metadata": "string",
        "size": {"width": 220, "height": 60},
    }

    headers = {
        "accept": "*/*",
        "X-Auth-Secret": f"{constants.CLIENT_SECRET}",
        "Content-Type": "application/json",
    }

    # Send a POST request with JSON data
    requests.post(constants.PROOPH_URL, headers=headers, json=data)


# Function to request the AI to generate events
def generate_events(topic: str):
    # Send formated prompt to the AI
    prompt_template = ChatPromptTemplate.from_template(constants.STORM_TEMPLATE)
    prompt = prompt_template.format(topic=topic)
    response = handle_generate_request(prompt)

    # Extract the events from the response
    start = response.find("[") + len("[")
    end = response.rfind("]")
    events_str = response[start:end]

    # Format the events
    events_str = events_str.replace("_", "").replace("'", "")
    events = [event.replace('"', "").strip() for event in events_str.split(",")]

    # Place the events on the prooph-board
    x = 0
    y = 0
    for event in events:
        place_event(event, x, y)
        x = x + 240
        if x > 960:
            x = 0
            y = y + 100


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    generate_events(args.query_text)
    print("Succes!")


if __name__ == "__main__":
    main()
