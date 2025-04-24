import os
from openai import OpenAI

OpenAI.api_key = os.getenv("OPENAI_API_KEY")
if not OpenAI.api_key:
    raise EnvironmentError("OPENAI_API_KEY not set in environment variables.")

human_prompt = """
    Create a human question based on the following scenario.
    The questions must be as human as possible and the question.
    You can give 3 - 5 questions. Return only the questions, 1 question per line
    Scenario:
    pretend you are a guest trying to book a room. Ask about room availability, price, and check-in times. Be polite but direct in conversation
"""

client = OpenAI()
def get_human_questions():
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a human interacting with a chatbot."},
            {"role": "user", "content": human_prompt}
        ],
        temperature=0.7,
    )

    return response.choices[0].message.content.split("\n")


def generate_tests():
    questions = get_human_questions()
    test_cases = [{
        "vars": {
            "query": question,
            "context": "file://context.md"
        },
        "assert": [{
            "type": "context-relevance",
            "threshold": 0.8
        }]    
    } for question in questions]
    
    return test_cases
