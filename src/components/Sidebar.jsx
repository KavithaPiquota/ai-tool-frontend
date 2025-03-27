import React from "react";
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
        <li><Home size={20} /><span className={isOpen ? "" : "hidden"}>Home</span></li>
        <li><BarChart size={20} /><span className={isOpen ? "" : "hidden"}>Analytics</span></li>
        <li><PieChart size={20} /><span className={isOpen ? "" : "hidden"}>Reports</span></li>
        <li><Activity size={20} /><span className={isOpen ? "" : "hidden"}>Activity</span></li>
        <li><Briefcase size={20} /><span className={isOpen ? "" : "hidden"}>Projects</span></li>
        <li><Settings size={20} /><span className={isOpen ? "" : "hidden"}>Settings</span></li>
      </ul>
      
      <div className={`sidebar-footer ${isOpen ? "" : "hidden"}`}>Powered by AI</div>
    </div>
  );
};

export default Sidebar;
