from langchain.prompts import ChatPromptTemplate
import argparse
import constants
import requests
import json
from lib.call_ai import ask_ai





def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("ai_url", type=str, help="The URL of the AI model.")
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    generate_events(args.ai_url,args.query_text)
    print("Succes!")

def place_event(event: str,x: int, y: int):
        data = {
            'elementId': f'{event}',
            'boardId': f'{constants.CLIENT_ID}',
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
            'X-Auth-Secret': f'{constants.CLIENT_SECRET}',
            'Content-Type': 'application/json'
        }

        # Send a POST request with JSON data
        requests.post(constants.PROOPH_URL, headers=headers, json=data)
    

def generate_events(url: str, topic: str):
    prompt_template = ChatPromptTemplate.from_template(constants.STORM_TEMPLATE)
    prompt = prompt_template.format(topic=topic)
    response = ask_ai(url, prompt)
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
