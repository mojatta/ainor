import { useState, useEffect, useRef } from "react";
import "./ChatWidget.css";

type SpeechRecognition = any;

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

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastReservation, setLastReservation] = useState<ReservationAction["data"] | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const restaurantId = "demo-restaurant-1";

  const [recognitionRef] = useState<SpeechRecognition | null>(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    const rec = new SpeechRecognition();
    rec.lang = "en-US"; // we can make this configurable later
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    return rec;
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

    const userMessage: ChatMessage = {
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/agent", {
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
      const reply = data.reply;
      setMessages([...updatedMessages, reply]);

      // Store reservation if created
      if (data.action?.action === "create_reservation" && data.action.data) {
        setLastReservation(data.action.data);
      }

      // Speak the assistant's reply out loud
      if ("speechSynthesis" in window && reply.content) {
        const utterance = new SpeechSynthesisUtterance(reply.content);
        window.speechSynthesis.cancel(); // stop any current speech
        window.speechSynthesis.speak(utterance);
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

  const handleStartVoice = () => {
    if (!recognitionRef) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    recognitionRef.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.onend = () => {
      setIsListening(false);
    };

    recognitionRef.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript as string;
      if (!transcript.trim()) return;

      // set the input to the transcript and send it as a message
      setInput("");
      handleSend(transcript);
    };

    recognitionRef.start();
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
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-widget-message ${msg.role === "user" ? "user" : "assistant"}`}
                >
                  <div className="chat-widget-bubble">
                    {msg.content}
                  </div>
                </div>
              ))
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

          {lastReservation && (
            <div className="chat-widget-reservation">
              <h4 className="chat-widget-reservation-title">✓ Reservation confirmed</h4>
              <div className="chat-widget-reservation-details">
                {lastReservation.dateTime && (
                  <div><strong>When:</strong> {new Date(lastReservation.dateTime).toLocaleString()}</div>
                )}
                {lastReservation.partySize && (
                  <div><strong>Party:</strong> {lastReservation.partySize} people</div>
                )}
                {lastReservation.name && (
                  <div><strong>Name:</strong> {lastReservation.name}</div>
                )}
              </div>
            </div>
          )}

          <div className="chat-widget-input">
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
              className="chat-widget-input-field"
            />
            <button
              className={`chat-widget-mic ${isListening ? "listening" : ""}`}
              onClick={handleStartVoice}
              disabled={loading || !recognitionRef || isListening}
              title={recognitionRef ? (isListening ? "Listening…" : "Start voice input") : "Voice not supported in this browser"}
            >
              {isListening ? "●" : "🎙"}
            </button>
            <button
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
