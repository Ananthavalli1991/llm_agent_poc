import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());

/**
 * Unified chat endpoint
 * Uses OpenAI tool-calling to decide which tool to invoke
 */
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Simulate OpenAI response with tool-calling
    // (In a real setup you'd use OpenAI API with tools configured)
    let reply;

    if (userMessage.includes("search")) {
      // Google Search Snippets
      const q = encodeURIComponent(userMessage.replace("search", "").trim());
      const resp = await fetch(`https://api.duckduckgo.com/?q=${q}&format=json`);
      const data = await resp.json();
      reply = data.AbstractText || "No snippet found.";
    } else if (userMessage.includes("calc")) {
      // JS code execution (sandboxed via eval here for demo)
      try {
        reply = eval(userMessage.replace("calc", "").trim()).toString();
      } catch {
        reply = "Error evaluating expression.";
      }
    } else if (userMessage.includes("pipe")) {
      // AI Pipe proxy API (stubbed with echo)
      reply = "Proxy API response: " + userMessage;
    } else {
      reply = "I can do: search, calc, pipe.";
    }

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
