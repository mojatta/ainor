import dotenv from "dotenv";
dotenv.config(); // sørg for at .env lastes før vi leser process.env

import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const apiKey = process.env.OPENAI_API_KEY;

console.log("Loaded OPENAI_API_KEY prefix + length:", apiKey?.slice(0, 8), apiKey?.length);

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is required. Set it in your .env file.");
}

export const openai = new OpenAI({
  apiKey,
});

export async function createChatCompletion(
  messages: ChatCompletionMessageParam[]
): Promise<ChatCompletionMessageParam> {

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages
  });

  const assistantMessage = response.choices[0]?.message;

  if (!assistantMessage) {
    throw new Error("No assistant message returned from OpenAI API");
  }

  return assistantMessage as ChatCompletionMessageParam;
}
