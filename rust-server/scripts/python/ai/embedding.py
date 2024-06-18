from langchain_community.embeddings import HuggingFaceBgeEmbeddings

#defines the embedding software that is going to be used
def get_embedding_function():
    embeddings = HuggingFaceBgeEmbeddings()
    return embeddings