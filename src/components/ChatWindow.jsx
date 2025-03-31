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
          model: "llama3-8b-8192",    // ✅ Use supported Groq model
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
    <div className="chat-window">
      <h2>AI Assistant</h2>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "Loading..." : <Send size={18} />}
        </button>
      </div>
      {response && (
        <div className="chat-response">
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
