local_llm = "llama3"


from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
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
    chunk_size=50, chunk_overlap=0
)
doc_splits = text_splitter.split_documents(docs_list)

# Add to vectorDB
vectorstore = Chroma.from_documents(
    documents=doc_splits,
    collection_name="rag-chroma",
    embedding=HuggingFaceEmbeddings(),
)
retriever = vectorstore.as_retriever()

# %%
### Generate

from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.chat_models import ChatOllama

# Prompt
prompt = PromptTemplate(
    template="""<|begin_of_text|><|start_header_id|>system<|end_header_id|> You are helping navigate the Proophboard.
    Use the following pieces of retrieved context to enhance your answer.
    Keep the answer concise <|eot_id|><|start_header_id|>user<|end_header_id|>
    Question: {question}
    Context: {context}
    Answer: <|eot_id|><|start_header_id|>assistant<|end_header_id|>""",
    input_variables=["question", "document"],
)

llm = ChatOllama(model=local_llm, temperature=0)


# Chain
rag_chain = prompt | llm | StrOutputParser()

# Run
# Check if command line argument is provided
if len(sys.argv) > 1:
    question = sys.argv[1]
else:
    question = "What do I use Command Stickies for?"


docs = retriever.invoke(question)
generation = rag_chain.invoke({"context": docs, "question": question})
print(generation)

#
