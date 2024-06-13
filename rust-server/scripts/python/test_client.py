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

# # Create a table
# cur.execute(
#     """
#     CREATE TABLE IF NOT EXISTS your_table_name (
#         id SERIAL PRIMARY KEY,
#         name VARCHAR(255),
#         age INTEGER
#     )
# """
# )

# # Insert data into the table
# cur.execute(
#     """
#     INSERT INTO your_table_name (name, age)
#     VALUES ('John Doe', 30),
#            ('Jane Smith', 25)
# """
# )

# Fetch all data from the table
cur.execute("SELECT * FROM your_table_name")
rows = cur.fetchall()

# Display the data in the console
for row in rows:
    print(row)

# Commit the changes and close the connection
conn.commit()
cur.close()
conn.close()
