import argparse
from langchain_community.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama
import setup
from embedding import get_embedding_function
from call_ai import ask_ai

def main():
    #Cli, Handles the input through the command line, in our case its going to be the question asked by the user
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text
    query_rag(query_text)

#fetches the db from local storage and querys the vectorstore for the context relating to the question asked by the user
def query_rag(query_text: str):
    # Prepare the DB.
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=setup.CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB.
    results = db.similarity_search_with_score(query_text, k=5)

    #merges the context from the documents in the db and the question asked by the user with a template
    context_text = "\n\n".join([doc.page_content for doc, _score in results])
    print(context_text)
    prompt_template = ChatPromptTemplate.from_template(setup.PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)
    

    #invoke the model to generate a response based on the context and the question
    response_text = ask_ai(prompt)

    #prints the response and the sources of the context
    sources = [doc.metadata.get("id", None) for doc, _score in results]
    formatted_response = f"{response_text}\nSources: {sources}"
    print(formatted_response)
    return response_text

if __name__ == "__main__":
    main()