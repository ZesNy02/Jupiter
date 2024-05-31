# %% [markdown]
# Erst eine virtual enviroment setupen für python

# %%
#! pip install -U langchain-nomic langchain_community tiktoken langchainhub chromadb langchain langgraph tavily-python gpt4all langchain-nomic 

# %%
#! ollama pull llama3

# %%
### LLM

local_llm = "llama3"

# %%
### Index

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import GPT4AllEmbeddings
import sys

urls = [
    "https://wiki.prooph-board.com/",
    "https://wiki.prooph-board.com/event_storming/what-is-event-storming.html",
    "https://wiki.prooph-board.com/event_modeling/why-event-modeling.html",
    "https://wiki.prooph-board.com/cody/introduction.html",
    "https://wiki.prooph-board.com/cody/Cody-Server.html",
    "https://wiki.prooph-board.com/cody/nodejs-cody-tutorial.html",
    "https://wiki.prooph-board.com/cody/php-cody-tutorial.html",
    "https://wiki.prooph-board.com/cody_play/tutorial.html",
    "https://wiki.prooph-board.com/cody_engine/introduction.html",
    "https://wiki.prooph-board.com/cody_engine/information-schema.html",
    "https://wiki.prooph-board.com/board_workspace/Board-API.html",
    "https://wiki.prooph-board.com/board_workspace/Cards.html",
    "https://wiki.prooph-board.com/board_workspace/Cody-Suggestions.html",
    "https://wiki.prooph-board.com/board_workspace/Event-Modeling-Mode.html",
    "https://wiki.prooph-board.com/board_workspace/Frames.html",
    "https://wiki.prooph-board.com/board_workspace/Keymap.html",
    "https://wiki.prooph-board.com/board_workspace/Lite-Mode.html",
    "https://wiki.prooph-board.com/board_workspace/Metadata.html",
    "https://wiki.prooph-board.com/board_workspace/Tree-View.html",
    "https://wiki.prooph-board.com/access_management/Access-Rights.html",
    "https://wiki.prooph-board.com/access_management/Managing-an-Organization.html",


]

docs = [WebBaseLoader(url).load() for url in urls]
docs_list = [item for sublist in docs for item in sublist]

text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
    chunk_size=100  , chunk_overlap=0
)
doc_splits = text_splitter.split_documents(docs_list)

# Add to vectorDB
vectorstore = Chroma.from_documents(
    documents=doc_splits,
    collection_name="rag-chroma",
    embedding=GPT4AllEmbeddings(),
)
retriever = vectorstore.as_retriever()

# %%
### Generate

from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.chat_models import ChatOllama

# Prompt
prompt = PromptTemplate(
    template="""<|begin_of_text|><|start_header_id|>system<|end_header_id|> You are an assistant for question-answering tasks. 
    Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. 
    Use three sentences maximum and keep the answer concise <|eot_id|><|start_header_id|>user<|end_header_id|>
    Question: {question} 
    Context: {context} 
    Answer: <|eot_id|><|start_header_id|>assistant<|end_header_id|>""",
    input_variables=["question", "document"],
)

# llm = ChatOllama(model=local_llm, temperature=0)


# Post-processing
# def format_docs(docs):
#     return "\n\n".join(doc.page_content for doc in docs)


# Chain
# rag_chain = prompt | llm | StrOutputParser()

# Run
# Check if command line argument is provided
if len(sys.argv) > 1:
    question = sys.argv[1]
else:
    question = "What do I use Command Stickies for?"

# Rest of the code
# ...
docs = retriever.invoke(question)
# generation = rag_chain.invoke({"context": docs, "question": question})
# print(generation)

# %%


from openai import OpenAI


client = OpenAI(
    api_key="<RAG>",
    base_url="https://aiforcause.deepnight.tech/openai/"
)

response = client.chat.completions.create(
    model="gpt-4-turbo",   # gpt-35-turbo (GPT-3.5 Turbo - 4k) || gpt-35-turbo-16k (GPT-3.5 Turbo 16k) || gpt-4-turbo (GPT-4 Turbo)
    messages=[
        {"role": "system", "content": "You are an assistant for question-answering tasks. Use the following pieces of retrieved context if needed to answer the question, if u have additional Knowldege use it. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise"},
        {"role": "user", "content": question + ' '.join(str(doc) for doc in docs)}
    ],
    stream=False # or True
)

print(response.choices[0].message.content)
