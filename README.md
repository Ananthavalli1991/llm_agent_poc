LLM Agent Proof-of-Concept
This is a minimal, browser-based LLM agent designed to demonstrate multi-tool reasoning. The application takes user input, queries a mock LLM for a response and potential tool calls, and then executes those tools in a continuous loop until the task is complete.

Overview
The primary goal of this project is to showcase the core logic of a modern LLM agent's reasoning loop entirely within a single, client-side web page. It serves as a proof-of-concept for how an agent can dynamically decide to perform actions beyond simple text generation, such as searching the web or running code.

Features
The agent supports the following tool integrations, which are called based on the mock LLM's response:

Google Search Simulation: Simulates fetching search results for a given query.

AI Pipe Simulation: Processes a data string, demonstrating how the agent could interface with a pipelined API. A hard-coded token is used to illustrate an authentication requirement.

JavaScript Code Execution: Safely runs agent-generated JavaScript code in a sandboxed environment within the browser, capturing and displaying any console output.

How to Use
To use this application, simply save the file locally as index.html and open it in a web browser. The application is entirely self-contained and requires no external dependencies or a web server to run.

To trigger the reasoning loop and tool calls, use the following conversational prompts:

"Interview me to create a blog post.": Begins the conversation flow.

"About IBM": Triggers the simulated Google Search tool.

"Next step, please.": Triggers the simulated JavaScript execution tool.

"aipipe": Triggers the simulated AI Pipe tool.

Technical Details
The core agent logic is a JavaScript while loop that continuously processes the conversation, checking for tool calls after each LLM response. The application uses a simple state machine to mock the LLM's behavior and tool-calling decisions, demonstrating the reasoning process.

UI: Built with basic HTML and styled with Tailwind CSS for a clean, modern look.

Agent API: The mock LLM interface follows the OpenAI-style tool-calling format.

Security: For simplicity, the AIPIPE_TOKEN is hard-coded. For a real-world application, this token would be stored securely on a backend server.
