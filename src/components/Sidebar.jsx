import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart, PieChart, Menu } from "lucide-react";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    const menuItems = [
        { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
        { icon: <PieChart size={20} />, label: "Reports", path: "/report" },
        { icon: <BarChart size={20} />, label: "History", path: "/history" }
    ];

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <div className="sidebar-header">
                <div className="logo-container">
                    <h3 className={isOpen ? "" : "hidden"}>AI Tool</h3>
                </div>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <Menu size={22} />
                </button>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className={`nav-label ${isOpen ? "" : "hidden"}`}>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className={`sidebar-footer ${isOpen ? "" : "hidden"}`}>Powered by AI</div>
        </div>
    );
};

export default Sidebar;