import { useState, useEffect, useRef } from "react";
import "./ChatWidget.css";

interface Restaurant {
  id: string;
  name: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(() => {
    // Load from localStorage on mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ainor_selectedRestaurantId');
      return saved || null;
    }
    return null;
  });
  const [selectedRestaurantName, setSelectedRestaurantName] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ainor_selectedRestaurantName');
      return saved || null;
    }
    return null;
  });
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [showRestaurantList, setShowRestaurantList] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen, showRestaurantList]);

  const loadRestaurants = async (): Promise<Restaurant[]> => {
    try {
      const apiUrl = (import.meta as any).env?.VITE_API_URL || 
                     (import.meta as any).env?.VITE_API_BASE_URL || 
                     "http://localhost:3001";
      
      const response = await fetch(`${apiUrl}/api/public/restaurants`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = await response.json();
      
      // Support both shapes: { ok: true, data: [...] } and { restaurants: [...] }
      const restaurantList = json?.data ?? json?.restaurants ?? [];
      
      // Validate it's an array
      if (!Array.isArray(restaurantList)) {
        console.error("Invalid restaurant list format:", json);
        setRestaurants([]);
        return [];
      }

      // Update state and return the list
      setRestaurants(restaurantList);
      return restaurantList;
    } catch (error) {
      console.error("Feil ved lasting av restauranter:", error);
      setRestaurants([]);
      return [];
    }
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurantId(restaurant.id);
    setSelectedRestaurantName(restaurant.name);
    setShowRestaurantList(false);
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('ainor_selectedRestaurantId', restaurant.id);
      localStorage.setItem('ainor_selectedRestaurantName', restaurant.name);
    }
    
    const selectionMessage = {
      id: crypto.randomUUID(),
      role: "user" as const,
      content: `Jeg velger ${restaurant.name}`,
    };
    
    const confirmationMessage = {
      id: crypto.randomUUID(),
      role: "assistant" as const,
      content: `Valgt restaurant: ${restaurant.name}. Hva ønsker du å gjøre (booke bord eller stille spørsmål)?`,
    };

    setMessages(prev => [...prev, selectionMessage, confirmationMessage]);
  };

  const handleShowRestaurants = async () => {
    const restaurantList = await loadRestaurants();
    
    if (restaurantList.length > 0) {
      setShowRestaurantList(true);
      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant" as const,
        content: "Her er våre tilgjengelige restauranter. Velg en restaurant for å fortsette:",
      };
      setMessages(prev => [...prev, assistantMessage]);
    } else {
      setShowRestaurantList(false);
      const errorMessage = {
        id: crypto.randomUUID(),
        role: "assistant" as const,
        content: "Jeg finner ingen restauranter akkurat nå. Prøv igjen om litt.",
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleChangeRestaurant = () => {
    setSelectedRestaurantId(null);
    setSelectedRestaurantName(null);
    setShowRestaurantList(false);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ainor_selectedRestaurantId');
      localStorage.removeItem('ainor_selectedRestaurantName');
    }
    
    const assistantMessage = {
      id: crypto.randomUUID(),
      role: "assistant" as const,
      content: "Restaurantvalg nullstilt. Velg en ny restaurant for å fortsette.",
    };

    setMessages(prev => [...prev, assistantMessage]);
    handleShowRestaurants();
  };

  const handleResetSelection = () => {
    setSelectedRestaurantId(null);
    setSelectedRestaurantName(null);
    setShowRestaurantList(false);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ainor_selectedRestaurantId');
      localStorage.removeItem('ainor_selectedRestaurantName');
    }
    
    const assistantMessage = {
      id: crypto.randomUUID(),
      role: "assistant" as const,
      content: "Valg nullstilt. Hva kan jeg hjelpe deg med?",
    };

    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // Check if user is asking about restaurants
    const restaurantQueryPatterns = [
      /hvilke restauranter/i,
      /hvilke restauranter har dere/i,
      /vis restauranter/i,
      /liste.*restauranter/i,
      /tilgjengelige restauranter/i,
    ];

    const isRestaurantQuery = restaurantQueryPatterns.some(pattern => pattern.test(text));

    if (isRestaurantQuery) {
      const userMessage = {
        id: crypto.randomUUID(),
        role: "user" as const,
        content: text,
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInput("");
      setLoading(true);
      
      try {
        // Load and show restaurant list
        const restaurantList = await loadRestaurants();
        
        if (restaurantList.length > 0) {
          setShowRestaurantList(true);
          const assistantMessage = {
            id: crypto.randomUUID(),
            role: "assistant" as const,
            content: "Her er våre tilgjengelige restauranter. Velg en restaurant for å fortsette:",
          };
          setMessages(prev => [...prev, assistantMessage]);
        } else {
          setShowRestaurantList(false);
          const errorMessage = {
            id: crypto.randomUUID(),
            role: "assistant" as const,
            content: "Jeg finner ingen restauranter akkurat nå. Prøv igjen om litt.",
          };
          setMessages(prev => [...prev, errorMessage]);
        }
      } catch (error) {
        console.error("Feil ved restaurant query:", error);
        setShowRestaurantList(false);
        const errorMessage = {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content: "Jeg finner ingen restauranter akkurat nå. Prøv igjen om litt.",
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setLoading(false);
      }
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user" as const,
      content: text,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const apiUrl = (import.meta as any).env?.VITE_API_URL || 
                     (import.meta as any).env?.VITE_API_BASE_URL || 
                     "http://localhost:3001";
      
      // Send hele samtalehistorikken (siste 20 meldinger for bedre kontekst)
      const messagesToSend = updatedMessages.slice(-20).map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantId: selectedRestaurantId || undefined,
          messages: messagesToSend,
          languageMode: "auto",
        }),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke få svar");
      }

      const data = await response.json();

      // Check if booking was created
      if (data.bookingCreated && data.reservationId) {
        const restaurantName = data.restaurantName || selectedRestaurantName || 'restauranten';
        const bookingMessage = {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content: `Takk! Bookingforespørselen er sendt til ${restaurantName}. Du får bekreftelse når restauranten godkjenner.`,
        };
        setMessages([...updatedMessages, bookingMessage]);
      } else {
        const assistantMessage = {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content: data.reply || "Beklager, jeg fikk ikke et svar.",
        };
        setMessages([...updatedMessages, assistantMessage]);
      }
    } catch (error) {
      console.error("Feil ved sending av melding:", error);
      const errorMessage = {
        id: crypto.randomUUID(),
        role: "assistant" as const,
        content: "Beklager, jeg støtte på en feil. Vennligst prøv igjen.",
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
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
          <span>Chat med AINOR</span>
        </button>
      )}

      {isOpen && (
        <div className="chat-widget-panel">
          <div className="chat-widget-header">
            <div className="chat-widget-header-content">
              <span className="chat-widget-header-icon">🤖</span>
              <div>
                <h3 className="chat-widget-header-title">AINOR – Din AI-Vert</h3>
                <p className="chat-widget-header-subtitle">
                  {selectedRestaurantName || "Tilkoblet"}
                </p>
              </div>
            </div>
            <button className="chat-widget-close" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          {selectedRestaurantId && (
            <div className="chat-widget-restaurant-controls">
              <button onClick={handleChangeRestaurant} className="chat-widget-control-btn">
                Bytt restaurant
              </button>
              <button onClick={handleResetSelection} className="chat-widget-control-btn">
                Nullstill valg
              </button>
            </div>
          )}

          {!selectedRestaurantId && !showRestaurantList && (
            <div className="chat-widget-restaurant-controls">
              <button onClick={handleShowRestaurants} className="chat-widget-control-btn primary">
                Vis restauranter
              </button>
            </div>
          )}

          <div className="chat-widget-messages" id="chat-widget-messages">
            {messages.length === 0 ? (
              <div className="chat-widget-empty">
                Hei! Jeg er AINOR. Hvordan kan jeg hjelpe deg i dag?
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-widget-message ${message.role === "user" ? "user" : "assistant"}`}
                >
                  <div className="chat-widget-bubble">
                    {message.content}
                  </div>
                </div>
              ))
            )}
            
            {showRestaurantList && (
              <div className="chat-widget-restaurant-list">
                {restaurants.length > 0 ? (
                  restaurants.map((restaurant) => (
                    <button
                      key={restaurant.id}
                      className="chat-widget-restaurant-item"
                      onClick={() => handleRestaurantSelect(restaurant)}
                    >
                      <div className="restaurant-item-name">{restaurant.name}</div>
                      <div className="restaurant-item-action">Velg →</div>
                    </button>
                  ))
                ) : (
                  <div className="chat-widget-message assistant">
                    <div className="chat-widget-bubble">
                      Ingen restauranter tilgjengelig.
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {loading && (
              <div className="chat-widget-message assistant">
                <div className="chat-widget-bubble loading">
                  Assistenten tenker…
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
              placeholder={selectedRestaurantId ? "Skriv din melding..." : "Spør om restauranter eller skriv din melding..."}
              disabled={loading}
              className="chat-widget-input-field"
            />
            <button
              type="button"
              onClick={handleSend}
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
