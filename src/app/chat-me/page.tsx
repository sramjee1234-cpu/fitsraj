"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChatMessage } from "@/types";
import { getAIResponse } from "@/services/ai-service";

export default function ChatMePage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await getAIResponse([...messages, userMessage]);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "माफ गर्नुहोस्, केही समस्या भयो। कृपया फेरि प्रयास गर्नुहोस्।",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 64px)", background: "#f9fafb" }}>
      
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", flexShrink: 0 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "#111" }}>💬 Chat Bot</h1>
            <p style={{ fontSize: "12px", color: "#6b7280" }}>
              {t("कुनै पनि प्रश्न सोध्नुहोस्, म जवाफ दिन्छु।", "Ask any question, I will answer.")}
            </p>
          </div>
          <button
            onClick={() => { setMessages([]); setInputValue(""); }}
            style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "6px 12px", fontSize: "12px", cursor: "pointer", background: "#fff" }}
          >
            {t("Clear", "Clear")}
          </button>
        </div>
      </div>

      {/* Messages or Welcome */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          {/* Welcome - always show at top */}
          {messages.length === 0 && (
            <div style={{ textAlign: "center", paddingTop: "40px", paddingBottom: "20px" }}>
              <div style={{ fontSize: "48px" }}>💬</div>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#111", marginTop: "12px" }}>
                {t("Chat Bot मा स्वागत छ!", "Welcome to Chat Bot!")}
              </h2>
              <p style={{ color: "#6b7280", marginTop: "8px", fontSize: "14px" }}>
                {t("म तपाईंको AI सहायक हुँ। कुनै पनि प्रश्न सोध्नुहोस्।", "I am your AI assistant. Ask any question.")}
              </p>

              {/* Welcome Input Box */}
              <form
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                style={{ maxWidth: "500px", margin: "24px auto 0", display: "flex", gap: "8px" }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t("यहाँ आफ्नो प्रश्न लेख्नुहोस्...", "Write your question here...")}
                  style={{
                    flex: 1,
                    border: "2px solid #d1d5db",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    fontSize: "15px",
                    outline: "none",
                  }}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  style={{
                    background: "#ec4899",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "14px 24px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    opacity: inputValue.trim() ? 1 : 0.5,
                  }}
                >
                  {t("Send", "Send")}
                </button>
              </form>

              {/* Quick Topics */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
                {["ChatGPT के हो?", "Fitness Tips", "Trading सिक्ने", "English कसरी सिक्ने", "AI Tools"].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleSendMessage(topic)}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "20px",
                      padding: "6px 14px",
                      fontSize: "12px",
                      cursor: "pointer",
                      background: "#fff",
                      color: "#374151",
                    }}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          {messages.length > 0 && (
            <div>
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    display: "flex",
                    justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "80%",
                      borderRadius: "16px",
                      padding: "12px 16px",
                      background: message.role === "user" ? "#ec4899" : "#fff",
                      color: message.role === "user" ? "#fff" : "#111",
                      boxShadow: message.role === "user" ? "none" : "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <p style={{ fontSize: "14px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                      {message.content}
                    </p>
                    <p style={{ fontSize: "11px", marginTop: "8px", opacity: 0.6 }}>
                      {message.timestamp.toLocaleTimeString("ne-NP", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "12px" }}>
                  <div style={{ background: "#fff", borderRadius: "16px", padding: "12px 16px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                    <div className="typing-dot" style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#9ca3af", margin: "0 2px" }}></div>
                    <div className="typing-dot" style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#9ca3af", margin: "0 2px" }}></div>
                    <div className="typing-dot" style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#9ca3af", margin: "0 2px" }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Input - only show when chatting */}
      {messages.length > 0 && (
        <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "12px 16px", flexShrink: 0 }}>
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
            style={{ maxWidth: "800px", margin: "0 auto", display: "flex", gap: "8px" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t("यहाँ आफ्नो प्रश्न लेख्नुहोस्...", "Write your question here...")}
              style={{
                flex: 1,
                border: "1px solid #d1d5db",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
                outline: "none",
              }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              style={{
                background: "#ec4899",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                opacity: inputValue.trim() ? 1 : 0.5,
              }}
            >
              {t("Send", "Send")}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
