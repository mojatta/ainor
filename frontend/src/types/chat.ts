export type AgentActionType = "none" | "create_reservation";

export interface AgentAction {
  action: AgentActionType;
  data?: {
    restaurantId: string;
    dateTime: string;
    partySize: number;
    name: string;
    phone: string;
    specialRequest: string | null;
    notes: string;
  };
}

export interface AgentReply {
  role: "assistant";
  content: string;
}

export interface AgentResponse {
  reply: AgentReply;
  action: AgentAction;
}

export type ChatMessageRole = "user" | "assistant" | "system" | "reservation";

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
  // optional structured data for reservations
  reservationData?: AgentAction["data"];
}



