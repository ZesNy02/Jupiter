import argparse
from langchain_community.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate
import lib.constants as constants
from lib.request_handlers import get_embedding_function, handle_generate_request


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_rag(args.query_text)


# fetches the db from local storage and querys the vectorstore for the context relating to the question asked by the user
def query_rag(query_text: str):
    # Prepare the DB.
    db = Chroma(
        persist_directory=constants.CHROMA_PATH,
        embedding_function=get_embedding_function(),
    )

    # Search the DB.
    results = db.similarity_search_with_score(query_text, k=5)

    # merges the context from the documents in the db and the question asked by the user with a template
    context_text = "\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(constants.PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    # invoke the model to generate a response based on the context and the question
    response_text = handle_generate_request(prompt)

    # prints the response and the sources of the context
    print(response_text)
    return response_text


if __name__ == "__main__":
    main()
