import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { getRestaurantContext } from "../restaurant/mockData";
import { buildSystemPrompt } from "../llm/systemPrompt";
import { createChatCompletion } from "../llm/openaiClient";

export type ReservationActionType =
  | "create_reservation"
  | "modify_reservation"
  | "cancel_reservation"
  | "none";

export interface ReservationAction {
  action: ReservationActionType;
  data?: any; // we'll refine later
}

export interface AssistantResult {
  reply: ChatMessage;
  action: ReservationAction;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface HandleChatParams {
  restaurantId: string;
  messages: ChatMessage[];
}

export async function handleChat(
  params: HandleChatParams
): Promise<AssistantResult> {
  try {
    const { restaurantId, messages } = params;

    // Load restaurant context
    const { restaurant, openingHours, menu } = getRestaurantContext(restaurantId);

    // Build system prompt
    const systemPrompt = buildSystemPrompt({
      restaurant,
      openingHours,
      menu
    });

    // Convert ChatMessage[] to ChatCompletionMessageParam[]
    const completionMessages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: systemPrompt
      },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Call OpenAI
    const assistantMessage = await createChatCompletion(completionMessages);

    // Extract content from the assistant message
    const content = assistantMessage.content ?? "";

    let action: ReservationAction = { action: "none" };

    // Try to parse JSON action if the content looks like JSON
    if (typeof content === "string" && content.trim().startsWith("{")) {
      try {
        const parsed = JSON.parse(content);
        if (parsed && typeof parsed.action === "string") {
          action = {
            action: parsed.action as ReservationActionType,
            data: parsed.data,
          };
        }
      } catch (e) {
        // ignore parse errors and leave action as "none"
      }
    }

    // Build user-friendly message
    let replyText: string;

    if (action.action === "create_reservation" && action.data) {
      const { dateTime, partySize, name, specialRequest } = action.data as {
        dateTime?: string;
        partySize?: number;
        name?: string;
        specialRequest?: string | null;
      };

      const dt = dateTime ? new Date(dateTime) : null;
      const formattedDateTime = dt ? dt.toLocaleString() : "the requested time";
      const requestText =
        specialRequest && specialRequest.trim().length > 0
          ? ` Special request: ${specialRequest}.`
          : "";

      replyText =
        `Great! I've created a reservation for ${partySize} people at ${formattedDateTime} ` +
        `under the name ${name}.` +
        requestText +
        ` If anything looks wrong, tell me and I can update the reservation.`;
    } else {
      // Fallback: use the original LLM text
      replyText =
        typeof content === "string" ? content : JSON.stringify(content);
    }

    // Return as AssistantResult
    return {
      reply: {
        role: "assistant",
        content: replyText,
      },
      action,
    };
  } catch (error) {
    console.error("Error in handleChat:", error);
    const errorReply: ChatMessage = {
      role: "assistant",
      content:
        "Sorry, something went wrong on my side. Please try again or contact the restaurant directly."
    };

    return {
      reply: errorReply,
      action: { action: "none" }
    };
  }
}
