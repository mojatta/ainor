import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

let openaiInstance: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiInstance) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY is required. Please set it in your .env file."
      );
    }

    openaiInstance = new OpenAI({
      apiKey
    });
  }

  return openaiInstance;
}

export async function createChatCompletion(
  messages: ChatCompletionMessageParam[]
): Promise<ChatCompletionMessageParam> {
  const openai = getOpenAIClient();

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages
  });

  const assistantMessage = response.choices[0]?.message;

  if (!assistantMessage) {
    throw new Error("No assistant message returned from OpenAI API");
  }

  return assistantMessage as ChatCompletionMessageParam;
}
