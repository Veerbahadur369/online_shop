import { Router,   } from "express";
import { model } from "../config/gemini.mjs";

const aiAPI= Router()

aiAPI.post("/geminiChat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message)
    if (!message) return res.status(400).json({ error: "message required" });
          
    const result = await model(message)
    res.json({ text: result });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export {aiAPI}