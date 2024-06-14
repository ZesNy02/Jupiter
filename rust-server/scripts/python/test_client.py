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
cur.execute("SELECT * FROM prompts")

# Fetch all the rows from the result set
rows = cur.fetchall()

# Print the rows
for row in rows:
    print(row)

# Execute a query to select everything from a table
cur.execute("SELECT * FROM answers")

# Fetch all the rows from the result set
rows = cur.fetchall()

# Print the rows
for row in rows:
    print(row)

# Commit the changes and close the connection
conn.commit()
cur.close()
conn.close()
