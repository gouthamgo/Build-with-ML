from camel.agents import ChatAgent
from camel.messages import BaseMessage as bm
from camel.functions import MATH_FUNCS
from typing import List, Dict
import datetime

# Mock bank API tool (simulates fetching transactions)
def get_transactions(user_id: str) -> List[Dict]:
    """
    Mock function to fetch user transactions.
    In a real scenario, this would call a bank API like Plaid.
    """
    try:
        return [
            {"date": "2025-04-10", "amount": -50.00, "category": "Groceries"},
            {"date": "2025-04-11", "amount": -100.00, "category": "Utilities"},
            {"date": "2025-04-12", "amount": 2000.00, "category": "Salary"}
        ]
    except Exception as e:
        return [{"error": f"Failed to fetch transactions: {str(e)}"}]

# Define the Personal Finance Assistant
def create_finance_assistant():
    # Role: Define the agent's identity and purpose
    sys_msg = bm.make_assistant_message(
        role_name="Personal Finance Assistant",
        content="""
        You are a knowledgeable financial advisor dedicated to helping users manage their finances.
        Your goals are to:
        - Track and analyze user expenses.
        - Suggest budgets based on income and spending patterns.
        - Provide actionable financial advice (e.g., saving tips, debt repayment).
        For each request:
        1. Analyze available data (e.g., transactions, past interactions).
        2. Break down the problem into clear steps.
        3. Provide a reasoned solution with specific recommendations.
        4. Double-check your advice for accuracy and relevance.
        If data is missing, ask the user for clarification.
        """
    )

    # Initialize the agent with memory, tools, and reasoning
    agent = ChatAgent(
        system_message=sys_msg,
        message_window_size=20,  # Memory: Store up to 20 messages for context
        tools=[get_transactions, *MATH_FUNCS],  # Tools: Bank API and math functions
        verbose=True  # Enable logging for debugging
    )

    return agent

# Simulate user interaction
def run_finance_assistant():
    # Create the agent
    agent = create_finance_assistant()

    # Communication: Define initial user message
    usr_msg_1 = bm.make_user_message(
        role_name="User",
        content="Can you analyze my recent spending and suggest a budget?"
    )

    print("\n=== User Request 1 ===")
    print(f"User: {usr_msg_1.content}")

    # Process the first request
    response = agent.step(usr_msg_1)
    if response.msgs:
        print(f"Assistant: {response.msgs[0].content}")
    else:
        print("Assistant: No response generated.")

    # Communication: Follow-up message to demonstrate memory
    usr_msg_2 = bm.make_user_message(
        role_name="User",
        content="I spent $30 on coffee this week. Is that okay?"
    )

    print("\n=== User Request 2 ===")
    print(f"User: {usr_msg_2.content}")

    # Process the follow-up request
    response = agent.step(usr_msg_2)
    if response.msgs:
        print(f"Assistant: {response.msgs[0].content}")
    else:
        print("Assistant: No response generated.")

# Run the assistant
if __name__ == "__main__":
    try:
        run_finance_assistant()
    except Exception as e:
        print(f"Error running assistant: {str(e)}")