import { useState, useEffect, useRef } from "react";
import "./ChatWidget.css";
import { useVoicePlayback } from "../hooks/useVoicePlayback";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { detectLanguage } from "../utils/language";
import { ChatMessage, AgentResponse } from "../types/chat";
import { API_BASE_URL } from "../config/api";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentLang, setCurrentLang] = useState<"nb" | "en">("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const restaurantId = "demo-restaurant-1";

  const { speak } = useVoicePlayback();
  const { startListening, status: micStatus } = useSpeechRecognition({
    onResult: (transcript) => {
      // Detect language from transcript
      const lang = detectLanguage(transcript);
      setCurrentLang(lang);
      // When user finishes speaking, send this as a user message
      handleSend(transcript);
    },
    language: "en", // Default, will be overridden when calling startListening
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const handleSend = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    // Detect language from user input
    const lang = detectLanguage(text);
    setCurrentLang(lang);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
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
          messages: updatedMessages
            .filter(msg => msg.role !== "reservation") // Don't send reservation messages to backend
            .map(({ id, reservationData, ...msg }) => ({
              role: msg.role === "user" ? "user" : "assistant",
              content: msg.content,
            })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data: AgentResponse = await response.json();

      // 1) Add the assistant's natural reply as its own message
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply.content,
      };

      // Only mark as error if it's an error message
      const isError = data.reply.content.toLowerCase().includes("sorry") &&
        (data.reply.content.toLowerCase().includes("error") ||
          data.reply.content.toLowerCase().includes("went wrong"));

      // 2) If there's a create_reservation action, add a separate reservation message
      if (data.action.action === "create_reservation" && data.action.data) {
        const reservationMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "reservation",
          content: "Reservation created", // not shown directly; we'll render a custom card
          reservationData: data.action.data,
        };

        setMessages([...updatedMessages, assistantMessage, reservationMessage]);
      } else {
        setMessages([...updatedMessages, assistantMessage]);
      }

      // Speak the assistant's reply out loud (only if not an error, using only reply.content)
      if (!isError && data.reply.content) {
        speak({ text: data.reply.content, languageHint: currentLang });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages([...updatedMessages, errorMessage]);
      // Don't speak error messages
    } finally {
      setLoading(false);
    }
  };

  const handleStartListening = () => {
    startListening(currentLang);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <button className="chat-widget-button" onClick={() => setIsOpen(true)}>
          <span>💬</span>
          <span>Chat with AINOR</span>
        </button>
      )}

      {isOpen && (
        <div className="chat-widget-panel">
          <div className="chat-widget-header">
            <div className="chat-widget-header-content">
              <span className="chat-widget-header-icon">🤖</span>
              <div>
                <h3 className="chat-widget-header-title">AINOR – Your AI Host</h3>
                <p className="chat-widget-header-subtitle">Online</p>
              </div>
            </div>
            <button className="chat-widget-close" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <div className="chat-widget-messages" id="chat-widget-messages">
            {messages.length === 0 ? (
              <div className="chat-widget-empty">
                Hi! I'm AINOR. How can I help you today?
              </div>
            ) : (
              messages.map((message) => {
                if (message.role === "reservation" && message.reservationData) {
                  const r = message.reservationData;
                  return (
                    <div key={message.id} className="reservation-card">
                      <h4>Reservation confirmed ✅</h4>
                      <p><strong>Date:</strong> {new Date(r.dateTime).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {new Date(r.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                      <p><strong>Party size:</strong> {r.partySize}</p>
                      <p><strong>Name:</strong> {r.name}</p>
                      <p><strong>Phone:</strong> {r.phone}</p>
                      {r.specialRequest && (
                        <p><strong>Special request:</strong> {r.specialRequest}</p>
                      )}
                    </div>
                  );
                }

                // Default chat bubbles for user/assistant/system
                return (
                  <div
                    key={message.id}
                    className={`chat-widget-message ${message.role === "user" ? "user" : "assistant"}`}
                  >
                    <div className="chat-widget-bubble">
                      {message.content}
                    </div>
                  </div>
                );
              })
            )}
            {loading && (
              <div className="chat-widget-message assistant">
                <div className="chat-widget-bubble loading">
                  Assistant is thinking…
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-widget-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={loading}
              className="chat-widget-input-field"
            />
            <button
              className={`chat-widget-mic ${micStatus === "listening" ? "listening" : ""}`}
              onClick={handleStartListening}
              disabled={loading || micStatus === "unsupported" || micStatus === "listening"}
              title={micStatus === "unsupported" ? "Voice not supported in this browser" : (micStatus === "listening" ? "Listening…" : "Start voice input")}
            >
              {micStatus === "listening" ? "●" : "🎙"}
            </button>
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="chat-widget-send"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
