# Browser LLM Agent POC — Multi-Tool Reasoning

**Deliverable summary**  
A minimal browser JavaScript app + server proxy that implements a looped LLM agent using OpenAI-style function/tool calls and three tool integrations:

- **Google Search snippets** (browser or server-backed via proxy)
- **AI Pipe** (server-side proxy; secret kept in `.env`)
- **JS code execution** (sandboxed; worker in browser for safety; server-side fallback exists)

UI uses Bootstrap alerts for errors and a simple chat window. The front-end only calls `/api/tools` so secrets never reach the browser.

---

## Files
- `server.js` — Express unified `/api/tools` proxy (chat, search, aipipe, code execution)
- `static/index.html` — Browser agent UI (single-file, minimal)
- `.env.example` — example env keys to create `.env`
- `package.json` — minimal scripts to run
- `.gitignore` — ignores `node_modules` and `.env`

---

## Quick start (local)

1. Clone repo
```bash
git clone https://github.com/<your>/<repo>.git
cd <repo>
Install

bash
Copy code
npm install
Create .env (based on .env.example)

bash
Copy code
cp .env.example .env
# Edit .env and put your real secrets
.env variables:

ini
Copy code
PORT=3000
OPENAI_API_KEY=sk-...
AIPIPE_BASE_URL=https://api.aipipe.com
AIPIPE_API_KEY=Bearer sk-...
GOOGLE_API_KEY=AIza...
GOOGLE_CX=xxxxxxxx
Start server

bash
Copy code
node server.js
Open browser:

arduino
Copy code
http://localhost:3000
Type a task; the agent will loop and call tools (Google, AI Pipe, JS exec) as requested.
