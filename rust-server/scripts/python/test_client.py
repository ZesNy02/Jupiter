import psycopg2

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

# Execute a query to select everything from a table
# cur.execute("INSERT INTO prompts (prompt) VALUES ('test') RETURNING prompt_id;")
# result = cur.fetchone()
# if result:
#     prompt_id = result[0]
#     print(prompt_id)

cur.execute(
    """
    CREATE TABLE IF NOT EXISTS answers (
        answer_id SERIAL PRIMARY KEY,
        prompt_id integer REFERENCES prompts(prompt_id),
        answer TEXT NOT NULL,
        rating INTEGER DEFAULT 0
    );"""
)
cur.execute("INSERT INTO answers (prompt_id, answer) VALUES (1, 'test')")
cur.execute("UPDATE answers SET rating = rating + 1 WHERE answer_id = 1")

# Commit the changes and close the connection
conn.commit()
cur.close()
conn.close()
