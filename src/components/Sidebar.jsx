import React from "react";
import { Link } from 'react-router-dom';
import { Home, BarChart, PieChart, Activity, Briefcase, Settings, Menu } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h3 className={isOpen ? "" : "hidden"}>Ai Tool</h3>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
      </div>
      <ul className="menu">
      <li>
        <Link to="/dashboard" className="menu-link">
          <Home size={20} />
          <span className={isOpen ? "" : "hidden"}>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/report" className="menu-link">
          <PieChart size={20} />
          <span className={isOpen ? "" : "hidden"}>Reports</span>
        </Link>
      </li>
      {/* <li>
        <Link to="/analytic" className="menu-link">
          <BarChart size={20} />
          <span className={isOpen ? "" : "hidden"}>Analytics</span>
        </Link>
      </li>
      <li>
        <Link to="/project" className="menu-link">
          <Briefcase size={20} />
          <span className={isOpen ? "" : "hidden"}>Projects</span>
        </Link>
      </li>
      <li>
        <Link to="/setting" className="menu-link">
          <Settings size={20} />
          <span className={isOpen ? "" : "hidden"}>Settings</span>
        </Link>
      </li> */}
    </ul>
      
      <div className={`sidebar-footer ${isOpen ? "" : "hidden"}`}>Powered by AI</div>
    </div>
  );
};

export default Sidebar;
