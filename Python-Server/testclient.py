import requests

# Define the URL of the server
url = "http://localhost:3000/ai"

# Define the message you want to send as a JSON object
message = {
    "message": "What is the capital of France?"
}

# Send a POST request to the server with the message as JSON data
response = requests.post(url, json=message)
#response = requests.get(url)

# Print the response from the server
print(response.text)