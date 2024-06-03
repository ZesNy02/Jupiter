import argparse
from langchain.vectorstores.chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama

from embedding import get_embedding_function

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
You are supposed to act as a teacher on how to use the Proophboard Software and explain everything associated with it and how it works in Detail:

{context}

---

Answer the question based on the above context after repeating the question to yourself and think step by step. Stick to relevenat information to the Questions in your answer: {question}
"""


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
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB.
    results = db.similarity_search_with_score(query_text, k=5)

    #merges the context from the documents in the db and the question asked by the user with a template
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)
    #print(prompt)

    #invoke the model to generate a response based on the context and the question
    model = Ollama(model="llama3")
    response_text = model.invoke(prompt)

    #prints the response and the sources of the context
    sources = [doc.metadata.get("id", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    print(formatted_response)
    return response_text

if __name__ == "__main__":
    main()