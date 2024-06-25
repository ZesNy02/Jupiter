import psycopg2
from request_handlers import get_embedding_function
import numpy as np


# This function checks if the exact prompt already exists in the
# database, ignoring the case. If it does, it increments the count
# and returns the prompt_id. If it does not, it returns None.
def check_exact_match(prompt: str, conn: psycopg2.connection):
    cur = conn.cursor()
    cur.execute(
        "SELECT prompt_id, count FROM prompts WHERE LOWER(prompt) = LOWER(%s)",
        (prompt,),
    )
    result = cur.fetchone()
    if result:
        cur.execute(
            "UPDATE prompts SET count = count + 1 WHERE prompt_id = %s", (result[0],)
        )
        conn.commit()
        return f"Existing {result[0]}"
    return None


# This function checks if a similar embedding already exists in the
# database. If it does, it increments the count and returns the prompt_id.
# If it does not, it inserts a new row and returns the new prompt_id.
def check_embedding_match(prompt: str, conn: psycopg2.connection):
    cur = conn.cursor()
    # Generate the embedding for the prompt
    prompt_embedding = get_embedding_function().embed_query(prompt)
    prompt_embedding = np.array(prompt_embedding)

    # Check if a similar embedding already exists
    cur.execute(
        "SELECT prompt_id, 1 - (embedding <=> %s) AS cosine_similarity FROM prompts ORDER BY cosine_similarity DESC LIMIT 1",
        (prompt_embedding,),
    )
    result = cur.fetchall()

    # If a similar embedding exists, increment the count
    if len(result) > 0 and len(result[0]) > 1:
        if result[0][1] > 0.98:
            prompt_id = result[0][0]
            cur.execute(
                "UPDATE prompts SET count = count + 1 WHERE prompt_id = %s",
                (prompt_id,),
            )
            conn.commit()
            return f"Existing {prompt_id}"

    # If a similar embedding does not exist, insert a new row
    cur.execute(
        "INSERT INTO prompts (prompt,embedding) VALUES (%s, %s) RETURNING prompt_id",
        (prompt, prompt_embedding),
    )
    new_id = cur.fetchone()[0]
    conn.commit()
    return f"New {new_id}"
