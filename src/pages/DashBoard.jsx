import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatWindow from "../components/ChatWindow";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`dashboard ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="main-content">
        <Header />
        <ChatWindow />
      </div>
    </div>
  );
};

export default Dashboard;
