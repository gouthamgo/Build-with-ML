# Install CAMEL AI: pip install camel-ai


## Role:

    The system message defines the agent as a "Personal Finance Assistant" with a clear purpose: track expenses, suggest budgets, and offer advice.
    Learning: Establishes boundaries for the agent’s behavior, ensuring responses align with financial goals.
    Code Reference: sys_msg in create_finance_assistant().

## Memory:

    The message_window_size=20 parameter enables the agent to store up to 20 messages, allowing it to recall past budgets or expenses.
    Learning: Demonstrates context awareness, as the agent references prior interactions in follow-up responses.
    Code Reference: ChatAgent initialization in create_finance_assistant().

## Tools:

    The get_transactions function simulates a bank API, returning mock transaction data. MATH_FUNCS from CAMEL enables calculations like summing expenses.
    Error handling ensures robustness if the API fails.
    Learning: Shows how agents can integrate external data sources and perform computations, critical for data-driven tasks.
    Code Reference: get_transactions function and tools parameter in ChatAgent.

## Communication:

    The agent processes user messages (usr_msg_1, usr_msg_2) and responds via agent.step().
    The code is structured to support future multi-agent communication (e.g., adding an investment advisor agent).
    Learning: Highlights user-agent interaction and lays the foundation for agent collaboration.
    Code Reference: run_finance_assistant() with user messages.

## Reasoning:

    The system message instructs the agent to analyze data, break down problems, provide solutions, and self-critique.
    This results in structured responses, like step-by-step budget suggestions.
    Learning: Teaches how to enhance AI responses with logical planning and validation.
    Code Reference: Step-by-step instructions in sys_msg.