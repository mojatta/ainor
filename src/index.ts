import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleChat, ChatMessage } from "./agent/handleChat";

// Load environment variables from .env (must be before any other imports that use env vars)
dotenv.config();


const app = express();
const port = process.env.PORT || 3001;

// Configure CORS
const corsOptions = {
  origin: [
    "https://ai-nor.no",
    "https://www.ai-nor.no",
    "https://ainor.netlify.app",
    "http://localhost:3000" // for local development
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
};

// Handle preflight requests
app.options("*", cors(corsOptions));

// Apply CORS middleware before all routes
app.use(cors(corsOptions));

app.use(express.json());

app.post("/agent", async (req: Request, res: Response) => {
  try {
    const { restaurantId, messages } = req.body;

    // Validate restaurantId
    if (!restaurantId || typeof restaurantId !== "string" || restaurantId.trim() === "") {
      return res.status(400).json({
        error: "restaurantId must be a non-empty string"
      });
    }

    // Validate messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "messages must be a non-empty array"
      });
    }

    // Validate each message structure
    for (const msg of messages) {
      if (
        !msg ||
        typeof msg !== "object" ||
        msg.role !== "user" && msg.role !== "assistant" ||
        typeof msg.content !== "string"
      ) {
        return res.status(400).json({
          error: "Each message must have 'role' ('user' | 'assistant') and 'content' (string)"
        });
      }
    }

    // Call handleChat
    const { reply, action } = await handleChat({
      restaurantId: restaurantId.trim(),
      messages: messages as ChatMessage[]
    });

    return res.json({ reply, action });
  } catch (error) {
    console.error("Error in /agent endpoint:", error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
