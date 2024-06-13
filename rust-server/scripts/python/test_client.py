import requests
import json

# Define the JSON object to send
data = {"message": "Was ist das Prooph-Board?"}

# Set the URL to send the request to
url = "http://localhost:3000/ai"

# Send the POST request with the JSON object attached
response = requests.post(url, json=data)

# Print the response
# Convert the response text to a Python object
response_obj = json.loads(response.text)

# Print the response object
print(response_obj["Success"]["response"])
