import requests

# Define the JSON object to send
data = {"message": "Was sind stickies auf dem Prooph Board?"}

# Set the URL to send the request to
url = "http://localhost:3000/ai"

# Send the POST request with the JSON object attached
response = requests.post(url, json=data)

# Print the response
print(response.text)
