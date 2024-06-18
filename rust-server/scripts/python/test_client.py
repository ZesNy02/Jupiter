import psycopg2
import requests

# Establish a connection to the PostgreSQL database
conn = psycopg2.connect(
    host="localhost",
    port=5432,
    database="postgres",
    user="postgres",
    password="password",
)

# Create a cursor object to interact with the database
cur = conn.cursor()

cur.execute(
    """
    CREATE TABLE IF NOT EXISTS prompts (
        prompt_id SERIAL PRIMARY KEY,
        prompt TEXT NOT NULL,
        embedding vector(1024),
        count INTEGER DEFAULT 1
    );"""
)

cur.execute(
    """
    CREATE TABLE IF NOT EXISTS answers (
        answer_id SERIAL PRIMARY KEY,
        prompt_id integer REFERENCES prompts(prompt_id),
        answer TEXT NOT NULL,
        rating INTEGER DEFAULT 0
    );"""
)

# Execute a query to select everything from a table
# cur.execute("INSERT INTO prompts (prompt) VALUES ('test') RETURNING prompt_id;")
# result = cur.fetchone()
# if result:
#     prompt_id = result[0]
#     print(prompt_id)


# cur.execute("INSERT INTO answers (prompt_id, answer) VALUES (1, 'test')")
# cur.execute("UPDATE answers SET rating = rating + 1 WHERE answer_id = 1")

# Execute a query to select everything from the answers table
# cur.execute("SELECT * FROM answers")
# answers = cur.fetchall()
# for answer in answers:
#     print(answer)

# Execute a query to select everything from the prompts table
# cur.execute("SELECT * FROM prompts")
# prompts = cur.fetchall()
# for prompt in prompts:
#     print(prompt)

# Update the rating of an answer with negative id
# cur.execute("UPDATE answers SET rating = rating + 1 WHERE answer_id = -1")

# Commit the changes and close the connection
conn.commit()
cur.close()
conn.close()

# Define the URL and payload for the POST request
# url = "http://localhost:3000/ai/rating"
# payload = {"id": 0, "rating": 1}

# Send the POST request
# response = requests.post(url, json=payload)

# url = "http://localhost:3000/ai/prompt"
# payload = {"prompt": "What is the prooph-board?"}

# Send the POST request
# response = requests.post(url, json=payload)

# Check the response status code
# print(response)
