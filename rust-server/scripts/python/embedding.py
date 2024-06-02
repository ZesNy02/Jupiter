from langchain_community.embeddings import GPT4AllEmbeddings

#defines the embedding software that is going to be used
def get_embedding_function():
    embeddings = GPT4AllEmbeddings()
    return embeddings