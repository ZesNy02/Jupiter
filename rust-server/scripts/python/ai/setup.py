CHROMA_PATH = "scripts/python/ai/chroma"
DATA_PATH = "data"


PROMPT_TEMPLATE = """
You are supposed to act as a customer support and explain how to use the Proophboard Software everything relevant, associated with it and how it works in Detail:

{context}



Keep the question in mind. Answer the question based on the above context and think step by step. Stick to relevenat information to the Questions in your answer and answer in three sentences: {question}
"""

TOKEN_VALUE = 'Q41KQzOiTPe75o0cJsxinZw64CwmxcGGvEmy4xn8dvc1qM6nUgWtbwiftOHcNCI5'

TEST_TOKEN = 'okmQdFySScG3M5fYrcE7960QdvIuEMzYoj7TWgcPSgfEJ6JQK6GgE4yoyaiX4QId  '

URL = 'https://f4359ba8-80fc-455d-a8e6-fad069f30239.app.gra.ai.cloud.ovh.net/api/generate'

CLIENT_ID = '4544590e-e0e5-466e-a34e-72d83cffc692'

CLIENT_SECRET = 'nM5B5EdSaC59MfW4C4f2o4L0a6Vvu8OA'

PROOPH_URL = 'https://app.prooph-board.com/board/api/v1/board-agent/4544590e-e0e5-466e-a34e-72d83cffc692/tasks/add-element-at-position'

STORM_TEMPLATE = """ Imagine you're facilitating an Event Storming session on the topic: '{topic}'.
 Generate insightful events related to the domain. Remember to think from different perspectives, including users, stakeholders, and systems.
    Aim for clarity and specificity in your event descriptions. The Events should be formatted like BookOrdered. Only output the events themself in your answer and keep them formulated as one word in past tense. Output like this events = [
    'Event1',
    'Event2',
    'Event3',...
]        
    """
misc = "host=localhost port=5432 dbname=postgres user=postgres password=password"
