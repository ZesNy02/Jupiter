import psycopg2
import lib.constants as constants
import lib.database_handlers as db_handlers
import argparse
from pgvector.psycopg2 import register_vector

db_url = constants.DB_URL


def get_prompt_id(prompt: str):
    # Get the database connection
    conn = psycopg2.connect(db_url)
    # Setup the vector extension
    cur = conn.cursor()
    cur.execute("CREATE EXTENSION IF NOT EXISTS vector")
    register_vector(conn)

    # Check if the prompt already exists
    exact_match_result = db_handlers.check_exact_match(prompt, conn)
    if exact_match_result:
        return exact_match_result

    # Check if the prompt has a similar embedding
    match_embedding_result = db_handlers.check_embedding_match(prompt, conn)
    return match_embedding_result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("prompt", type=str)
    args = parser.parse_args()
    prompt = args.prompt
    print(get_prompt_id(prompt))


if __name__ == "__main__":
    main()
