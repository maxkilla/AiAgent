import openai
from config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

def process_request(user_input):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"User request: {user_input}",
        max_tokens=150,
        temperature=0.7,
    )
    return response.choices[0].text.strip()
