import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Unified /api/tools proxy
app.post("/api/tools", async (req, res) => {
  try {
    const { tool, query, code, messages } = req.body;

    if (tool === "chat") {
      // OpenAI Chat proxy
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          tools: [
            { type: "function", function: { name: "search", description: "Google search snippets", parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] } } },
            { type: "function", function: { name: "aipipe", description: "Call AI Pipe proxy API", parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] } } },
            { type: "function", function: { name: "execute_code", description: "Run JS code in sandbox", parameters: { type: "object", properties: { code: { type: "string" } }, required: ["code"] } } }
          ]
        })
      });
      const data = await resp.json();
      return res.json(data);
    }

    if (tool === "search") {
      // Google search snippets
      const resp = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CX}&q=${encodeURIComponent(query)}`);
      const data = await resp.json();
      return res.json(data);
    }

    if (tool === "aipipe") {
      // AI Pipe proxy
      const resp = await fetch(`${process.env.AIPIPE_BASE_URL}/v1/query`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.AIPIPE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });
      const data = await resp.json();
      return res.json(data);
    }

    if (tool === "execute_code") {
      // JS sandbox execution
      try {
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const fn = new AsyncFunction(code);
        const result = await fn();
        return res.json({ result });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    }

    return res.status(400).json({ error: "Unknown tool" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
