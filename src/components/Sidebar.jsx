import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./../styles/style.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {isOpen && <h2>AI Chat</h2>}
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar Content */}
      {isOpen && (
        <div className="sidebar-content">
          <h4>Today</h4>
          <p className="selected-item">Create React App AI</p> 
          
          <h4>Previous 7 days</h4>
          <p>AI Solutions</p>
          <p>Marketing Strategy</p>

          <h4>January</h4>
          <p>Meta Data Creation</p>
          <p>Analysis Data</p>
          <p>UI Optimization</p>

          <h4>October</h4>
          <p>Digital Strategy</p>
          <p>Data Analytics</p>
          <p>Figma Prototype</p>
        </div>
      )}

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {isOpen && <p>Powered by AI</p>}
      </div>
    </div>
  );
};

export default Sidebar;
