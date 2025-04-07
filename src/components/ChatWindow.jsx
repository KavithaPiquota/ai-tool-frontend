import React, { useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import "../styles/chat.css";

const API_URL = "https://api.groq.com/openai/v1/chat/completions"; 
const API_KEY = import.meta.env.VITE_GROQ_API_KEY; 

const ChatWindow = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // ✅ Store chat history
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    const newChat = [...chatHistory, { role: "user", content: message }];
    setChatHistory(newChat);
    setMessage(""); // ✅ Clear input after sending

    setLoading(true);

    try {
      const res = await axios.post(
        API_URL,
        {
          messages: [{ role: "user", content: message }],
          model: "llama3-8b-8192", 
          temperature: 0.7,
          max_tokens: 1024,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      // Add AI response to chat
      const aiResponse = res.data.choices[0]?.message?.content || "No response";
      setChatHistory([...newChat, { role: "assistant", content: aiResponse }]);
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

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-body">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.role}`}>
              <p>{msg.content}</p>
            </div>
          ))}
          {loading && <p className="loading-text">⏳ AI is typing...</p>}
        </div>

        <div className="chat-footer">
          <div className="input-wrapper">
            <input
              className="input-prompt"
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
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
