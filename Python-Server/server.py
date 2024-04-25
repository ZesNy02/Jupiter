from flask import Flask, request
import subprocess
import sqlite3

app = Flask(__name__)

@app.route('/', methods=['POST'])
def run_command():
    # Get the message from the request
    data = request.get_json()
    message = data.get('message')

    # Check if the message is a special command
    if message == "into the database":
        # Connect to the database and create a table if it doesn't exist
        conn = sqlite3.connect("example.db")
        c = conn.cursor()
        c.execute("CREATE TABLE IF NOT EXISTS messages (message TEXT)")
        # Insert a message into the database and commit the transaction
        c.execute("INSERT INTO messages VALUES (?)", ("This is a message from the database",))
        conn.commit()
        # Close the connection to the database
        conn.close()
        # Return a success message
        return "success"
    elif message == "from the database":
        # Connect to the database and retrieve all messages from the table
        conn = sqlite3.connect("example.db")
        c = conn.cursor()
        c.execute("SELECT * FROM messages")
        # Fetch all the messages and close the connection to the database
        messages = c.fetchall()
        conn.close()
        # Return the messages as a string
        return str(messages)

    # Define the command you want to execute
    command = "llm -m orca-mini-3b-gguf2-q4_0 \"{}\"".format(message)
    # Debug developer print
    print(command)

    # Use subprocess to execute the command and capture the output
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    stdout, stderr = process.communicate()

    # Decode the output and return it as the response
    return stdout.decode()

if __name__ == '__main__':
    # Run Server on Port 3000
    app.run(port=3000)