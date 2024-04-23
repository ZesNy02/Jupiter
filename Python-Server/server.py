from flask import Flask, request
import subprocess
import sqlite3

app = Flask(__name__)

@app.route('/', methods=['POST'])
def run_command():
    # Get the message from the request
    data = request.get_json()
    message = data.get('message')

    if message == "into the database":
        conn = sqlite3.connect("example.db")
        c = conn.cursor()
        c.execute("CREATE TABLE IF NOT EXISTS messages (message TEXT)")
        c.execute("INSERT INTO messages VALUES (?)", ("This is a message from the database",))
        conn.commit()
        conn.close()
        return "success"
    elif message == "from the database":
        conn = sqlite3.connect("example.db")
        c = conn.cursor()
        c.execute("SELECT * FROM messages")
        messages = c.fetchall()
        conn.close()
        return str(messages)

    # Define the command you want to execute
    command = "llm -m orca-mini-3b-gguf2-q4_0 \"{}\"".format(message)
    print(command)

    # Use subprocess to execute the command and capture the output
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    stdout, stderr = process.communicate()

    # Decode the output and return it as the response
    return stdout.decode()

if __name__ == '__main__':
    app.run(port=3000)