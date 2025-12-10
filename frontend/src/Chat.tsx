import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { API_BASE_URL } from "./config/api";

type ChatMessage = { role: "user" | "assistant"; content: string };

interface ReservationAction {
  action: "none" | "create_reservation" | "modify_reservation" | "cancel_reservation";
  data?: {
    dateTime?: string;
    partySize?: number;
    name?: string;
    phone?: string;
    specialRequest?: string | null;
  };
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastReservation, setLastReservation] = useState<ReservationAction["data"] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const restaurantId = "demo-restaurant-1";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantId,
          messages: updatedMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages([...updatedMessages, data.reply]);

      // Store reservation if created
      if (data.action?.action === "create_reservation" && data.action.data) {
        setLastReservation(data.action.data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages" id="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty">
            Start a conversation with our AI host!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message-wrapper ${msg.role === "user" ? "user-message" : "assistant-message"}`}
            >
              <div className="message-bubble">
                {msg.content}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="message-wrapper assistant-message">
            <div className="message-bubble loading-bubble">
              Assistant is thinking…
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {lastReservation && (
        <div className="reservation-summary">
          <h3 className="reservation-title">Latest reservation</h3>
          <div className="reservation-details">
            {lastReservation.dateTime && (
              <div className="reservation-item">
                <strong>Date/Time:</strong> {new Date(lastReservation.dateTime).toLocaleString()}
              </div>
            )}
            {lastReservation.partySize && (
              <div className="reservation-item">
                <strong>Party Size:</strong> {lastReservation.partySize} people
              </div>
            )}
            {lastReservation.name && (
              <div className="reservation-item">
                <strong>Name:</strong> {lastReservation.name}
              </div>
            )}
            {lastReservation.phone && (
              <div className="reservation-item">
                <strong>Phone:</strong> {lastReservation.phone}
              </div>
            )}
            {lastReservation.specialRequest && lastReservation.specialRequest.trim() && (
              <div className="reservation-item">
                <strong>Special Request:</strong> {lastReservation.specialRequest}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="chat-input-bar">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type your message..."
          disabled={loading}
          className="chat-input"
        />
        <button
          className="mic-button"
          disabled
          title="Voice coming soon"
        >
          🎙
        </button>
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
}
