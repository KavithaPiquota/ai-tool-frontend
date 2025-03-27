import React, { useState } from "react";
import { Send } from "lucide-react";

const ChatWindow = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="chat-window">
      <h2>Welcome to AI Assistant</h2>
      <p>What can I help with?</p>
      
      <div className="chat-input">
        <input 
          type="text" 
          placeholder="Type your message..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-btn"><Send size={18} /></button>
      </div>
    </div>
  );
};

export default ChatWindow;
