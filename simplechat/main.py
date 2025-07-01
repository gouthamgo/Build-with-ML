import gradio as gr
import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = os.getenv("MODEL_NAME")
API_URL = "https://openrouter.ai/api/v1/chat/completions"

def chat_with_openrouter(message, history):
    if not API_KEY or not MODEL:
        return "Missing API key or model name in environment variables."
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    messages = []
    for user_msg, bot_msg in history:
        messages.append({"role": "user", "content": user_msg})
        messages.append({"role": "assistant", "content": bot_msg})
    messages.append({"role": "user", "content": message})

    data = {
        "model": MODEL,
        "messages": messages
    }
    response = requests.post(API_URL, headers=headers, json=data)
    if response.status_code == 200:
        reply = response.json()["choices"][0]["message"]["content"]
        return reply
    else:
        return f"Error: {response.status_code} - {response.text}"

def respond(message, chat_history):
    bot_message = chat_with_openrouter(message, chat_history)
    chat_history.append((message, bot_message))
    return "", chat_history

with gr.Blocks(theme=gr.themes.Soft()) as demo:
    gr.Markdown(
        """
        # 🤖 OpenRouter AI Chatbot
        Welcome! Ask me anything.  
        _Powered by OpenRouter and Gradio._
        """
    )
    with gr.Row():
        chatbot = gr.Chatbot([], label="OpenRouter Chatbot", height=400)
    with gr.Row():
        with gr.Column(scale=8):
            msg = gr.Textbox(
                placeholder="Type your message and press Enter...",
                show_label=False,
                lines=1,
                max_lines=3,
                autofocus=True
            )
        with gr.Column(scale=2, min_width=80):
            clear = gr.Button("🧹 Clear", variant="secondary")

    msg.submit(respond, [msg, chatbot], [msg, chatbot])
    clear.click(lambda: [], None, chatbot, queue=False)

demo.launch()
