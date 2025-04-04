***

RAG - 

Retrieve - user input a question --> system first searches through the provided documents --> to find text sinppets that are relevant to question 
Augument - it takes these snippets (the "context") and combines them with the original question 
Generation - sends (question + context) to LLM

***

## pip install llama-index openai python-dotenv tiktoken llama-index-readers-file pypdf


Create the Virtual Environment:

In the terminal, type the following command and press Enter:

python3 -m venv venv

This tells Python to create a virtual environment named "venv" in our project folder.

Activate the Virtual Environment:

On macOS/Linux:

source venv/bin/activate

On Windows:

venv\Scripts\activate