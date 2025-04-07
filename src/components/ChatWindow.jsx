import React, { useState, useRef } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import "../styles/chat.css";

const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const ChatWindow = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  const bottomRef = useRef(null);
  
  setTimeout(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);
  

  const handleSend = async () => {
    if (!message.trim()) return;
  
    const newChat = [...chatHistory, { role: "user", content: message }];
    setChatHistory(newChat);
    setMessage("");
  
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  
    setLoading(true);
  
    try {
      const res = await axios.post(API_URL, {
        messages: [{ role: "user", content: message }],
        model: "llama3-8b-8192",
        temperature: 0.7,
        max_tokens: 1024,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      });
  
      const aiResponse = res.data.choices[0]?.message?.content || "No response";
      setChatHistory([...newChat, { role: "assistant", content: aiResponse }]);

      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/search-history`,
          {
            query: message,
            response: aiResponse,
            model: "llama3-8b-8192"
          },
          {
            headers: {
              Authorization: token
            }
          }
        );
      }
      
    } catch (error) {
      console.error("Groq API Error:", error);
      const errorMessage = error.response
        ? `Error: ${error.response.status} - ${error.response.data?.error?.message || "Unknown error"}`
        : "Failed to fetch response. Please try again.";
      setChatHistory([...newChat, { role: "assistant", content: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);


    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-body">
          {chatHistory.length === 0 && !loading && (
            <div className="welcome-message">
              <div className="welcome-icon">
                <svg viewBox="0 0 24 24" width="48" height="48">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                  />
                </svg>
              </div>
              <h2>How can I help you today?</h2>
              <p>Ask me anything or start a conversation</p>
            </div>
          )}

          {chatHistory.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.role}`}>
              <p>{msg.content}</p>
            </div>
          ))}

          {loading && <p className="loading-text">⏳ AI is typing...</p>}
          <div ref={bottomRef} />
        </div>

        <div className="chat-footer">
          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              className="input-prompt"
              placeholder="Type your message..."
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={loading}
              rows={1}
              style={{ resize: "none", overflow: "hidden" }}
            />
            <button
              className="send-button"
              onClick={handleSend}
              disabled={loading || !message.trim()}
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
