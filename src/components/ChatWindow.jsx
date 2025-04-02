import React, { useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import "../styles/chat.css";

const API_URL = "https://api.groq.com/openai/v1/chat/completions";  // ✅ Correct endpoint
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;  // ✅ Use environment variable

const ChatWindow = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message) return;

    setLoading(true);

    try {
      const res = await axios.post(
        API_URL,
        {
          messages: [{ role: "user", content: message }],
          model: "llama3-8b-8192",    // ✅ Supported Groq model
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

      setResponse(res.data.choices[0]?.message?.content || "No response");
    } catch (error) {
      console.error("Groq API Error:", error);
      if (error.response) {
        setResponse(`Error: ${error.response.status} - ${error.response.data?.error?.message || "Unknown error"}`);
      } else {
        setResponse("Failed to fetch response. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <h2>AI Assistant 🤖</h2>
      </div>

      <div className="chat-container">
        <div className="chat-body">
          {loading ? (
            <p className="loading-text">⏳ Loading response...</p>
          ) : response ? (
            <div className="chat-response-container">
              <div className="chat-response">
                <h3>Response:</h3>
                <p>{response}</p>
              </div>
            </div>
          ) : (
            <p className="placeholder-text">Ask something interesting...</p>
          )}
        </div>

        <div className="chat-footer">
          <input
            className="input-prompt"
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading || !message.trim()}>
            {loading ? "Loading..." : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
