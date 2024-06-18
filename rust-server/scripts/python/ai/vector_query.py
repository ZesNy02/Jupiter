import psycopg2
from embedding import get_embedding_function
import argparse
from pgvector.psycopg2 import register_vector
import numpy as np

def getanswer(dburl: str, prompt: str):
    conn = psycopg2.connect(dburl)
    cur = conn.cursor()
    cur.execute('CREATE EXTENSION IF NOT EXISTS vector')
    register_vector(conn)


    # Check if the prompt already exists
    cur.execute("SELECT prompt_id, count FROM prompts WHERE LOWER(prompt) = LOWER(%s)", (prompt,))
    result = cur.fetchone()

    if result:
        # If the prompt exists, increment the count
        cur.execute("UPDATE prompts SET count = count + 1 WHERE prompt_id = %s", (result[0],))
        conn.commit()
        return f"Existing {result[0]}"


    # If the prompt does not exist, generate the embedding
    prompt_embedding = get_embedding_function().embed_query(prompt)
    prompt_embedding = np.array(prompt_embedding)

    

    # Check if a similar embedding already exists
    cur.execute("SELECT prompt_id, 1 - (embedding <=> %s) AS cosine_similarity FROM prompts ORDER BY cosine_similarity DESC LIMIT 1",(prompt_embedding,))
    result = cur.fetchall()
    if result is not None and len(result[0]) > 1:
        if  result[0][1] > 0.98:
        # If a similar embedding exists, increment the count
            prompt_id = result[0][0]
            cur.execute("UPDATE prompts SET count = count + 1 WHERE prompt_id = %s", (prompt_id,))
            conn.commit()
            return f"Existing {prompt_id}"

    # If a similar embedding does not exist, insert a new ro
    cur.execute("INSERT INTO prompts (prompt,embedding) VALUES (%s, %s) RETURNING prompt_id", (prompt, prompt_embedding))
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
    getanswer(dburl, prompt)


if __name__ == "__main__":
    main()