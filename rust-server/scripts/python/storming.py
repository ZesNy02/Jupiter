from langchain.prompts import ChatPromptTemplate
import argparse
import setup
import requests
import json
from call_ai import ask_ai





def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text
    generate_events(query_text)

def place_event(event: str,x: int, y: int):
        data = {
            'elementId': f'{event}',
            'boardId': f'{setup.CLIENT_ID}',
            'type': 'event',
            'name': f'{event}',
            'content': '',
            'position': {
                'x': x,
                'y': y
            },
            'parent': 'string',
            'metadata': 'string',
            'size': {
                'width': 220,
                'height': 60
            }  
        }

        headers = {
            'accept': '*/*',
            'X-Auth-Secret': f'{setup.CLIENT_SECRET}',
            'Content-Type': 'application/json'
        }

        # Send a POST request with JSON data
        requests.post(setup.PROOPH_URL, headers=headers, json=data)
    

def generate_events(topic: str):
    prompt_template = ChatPromptTemplate.from_template(setup.STORM_TEMPLATE)
    prompt = prompt_template.format(topic=topic)
    response = ask_ai(prompt)
    #print(response)
    
    start = response.find("[") + len("[")
    end = response.rfind("]") 
    events_str = response[start:end]
    
    events_str = events_str.replace("_","").replace("'","")
    events = [event.replace("\"", "").strip() for event in events_str.split(",")]
    #print(events)
    
    x = 0
    y = 0
    for event in events:
        #print(event)
        place_event(event,x,y)
        x = x + 240
        if x > 960:
            x = 0
            y = y + 100

if __name__ == "__main__":
    main()