import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../styles/layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)} />}

      <div className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <Header />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
