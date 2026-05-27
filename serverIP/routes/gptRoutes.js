import express from "express"
import { OpenRouter } from "@openrouter/sdk"
import dotenv from "dotenv"

dotenv.config()

const router = express.Router();

const openRouter = new OpenRouter({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/askGPT", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ message: "Savol yo‘q" });

  try {
    // FIX: Remove 'chatGenerationParams' wrapper. 
    // Pass the object directly as the SDK expects.
    const response = await openRouter.chat.send({
      chatRequest: {
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "user", content: question }
        ]
      }
    });

    // Extracting response safely
    const answer = response.choices[0]?.message?.content || "Kechirasiz, javob topilmadi.";
    res.json({ answer: answer });

  } catch (err) {
    console.error("GPT ERROR:", err);
    // Send a cleaner error back to frontend
    res.status(500).json({ error: err.message });
  }
});

export default router;