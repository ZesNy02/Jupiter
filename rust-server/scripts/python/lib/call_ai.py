import requests
import json
import setup  # Assuming setup.py contains URL and TOKEN_VALUE

# Define the URL and token
token = setup.TOKEN_VALUE

def ask_ai(url: str, prompt: str) -> str:
    try:
        data = {
            'model': 'codestral',
            'prompt': prompt,
            'stream': False
        }
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}'
        }

        # Send a POST request with JSON data
        response = requests.post(url, headers=headers, data=json.dumps(data))

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Directly access the 'response' field from the response data
            response_text = response.json().get('response', '')
            return response_text
        else:
            # Print an error message if the request was not successful
            print(f'Error: {response.status_code}')
            print(f'Response text: {response.text}')
            return ''
    except requests.RequestException as e:
        # Handle any errors that occurred during the request
        print(f'Request exception: {e}')
        if e.response is not None:
            print('Error response data:', e.response.text)
            print('Error response status:', e.response.status_code)
            print('Error response headers:', e.response.headers)
        return ''
    except Exception as e:
        print(f'An unexpected error occurred: {e}')
        return ''
