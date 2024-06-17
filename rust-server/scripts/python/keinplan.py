import psycopg2
from embedding import get_embedding_function
import argparse
from psycopg2.extras import execute_values

def getanswer(dburl: str, prompt: str):
    conn = psycopg2.connect(dburl)
    cur = conn.cursor()

    # Check if the prompt already exists
    cur.execute("SELECT PromptID, Count FROM Prompts WHERE LOWER(Prompt) = LOWER(%s)", (prompt,))
    result = cur.fetchone()

    if result:
        # If the prompt exists, increment the count
        cur.execute("UPDATE Prompts SET Count = Count + 1 WHERE PromptID = %s", (result[0],))
        conn.commit()
        return f"Existing {result[0]}"

    # If the prompt does not exist, generate the embedding
    embedding_function = get_embedding_function()
    embedding = embedding_function(prompt)

    # Check if a similar embedding already exists
    cur.execute(
            """SELECT id, content, 1 - (embedding <=> %s) AS cosine_similarity
               FROM items
               ORDER BY cosine_similarity DESC LIMIT 1""",
            (embedding,)
    )
    result = cur.fetchone()


    if result.row[2] > 0.95:
        # If a similar embedding exists, increment the count
        cur.execute("UPDATE Prompts SET Count = Count + 1 WHERE PromptID = %s", (result[0],))
        conn.commit()
        return f"Existing {result[0]}"

    # If a similar embedding does not exist, insert a new row
    cur.execute("INSERT INTO Prompts (Prompt, Embedding, Count) VALUES (%s, %s, 1) RETURNING PromptID", (prompt, embedding))
    new_id = cur.fetchone()[0]
    conn.commit()

    return f"New {new_id}"

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("dburl", type=str)
    parser.add_argument("prompt", type=str)
    args = parser.parse_args()
    dburl = args.dburl
    prompt = args.prompt

    print(getanswer(dburl, prompt))