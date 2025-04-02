import React from "react";
import { Link } from 'react-router-dom';
import { Home, BarChart, PieChart, Activity, Briefcase, Settings, Menu } from "lucide-react";
import "../styles/style.css";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h3 className={isOpen ? "" : "hidden"}>Ai Tool</h3>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <Menu size={20}  />
        </button>
      </div>
      <ul className="menu">
      <li>
        <Link 
          to="/dashboard" 
          className={`menu-link ${location.pathname === "/dashboard" ? "active" : ""}`}
        >
          <Home size={20} color="white" />
          <span className={isOpen ? "" : "hidden"}>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link 
          to="/report" 
          className={`menu-link ${location.pathname === "/report" ? "active" : ""}`}
        >
          <PieChart size={20} color="white" />
          <span className={isOpen ? "" : "hidden"}>Reports</span>
        </Link>
      </li>
      <li>
        <Link 
          to="/history" 
          className={`menu-link ${location.pathname === "/history" ? "active" : ""}`}
        >
          <BarChart size={20} color="white" />
          <span className={isOpen ? "" : "hidden"}>History</span>
        </Link>
      </li>
    </ul>
      
      <div className={`sidebar-footer ${isOpen ? "" : "hidden"}`}>Powered by AI</div>
    </div>
  );
};

export default Sidebar;
