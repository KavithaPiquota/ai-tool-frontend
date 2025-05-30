import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const Header = ({ user, onLogout }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    // Clear all stored data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    sessionStorage.clear();
    
    // Call parent logout handler
    if (onLogout) {
      onLogout();
    }
    
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      // First check if user is passed as prop
      if (user) {
        setUsername(user.first_name + " " + user.last_name || "User");
        return;
      }

      // Check for authToken (from your login system)
      const authToken = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");
      
      if (authToken && userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          setUsername(parsedUserData.first_name + " " + parsedUserData.last_name || "User");
          return;
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }

      // Fallback: Check for old token format
      const oldToken = localStorage.getItem("token");
      if (oldToken) {
        try {
          const response = await fetch(`http://localhost:5000/api/user/profile`, {
            headers: { 
              Authorization: `Bearer ${oldToken}`,
              'Content-Type': 'application/json'
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }

          const result = await response.json();
          if (result.success && result.user) {
            setUsername(result.user.first_name + " " + result.user.last_name || "User");
          } else {
            throw new Error("Invalid user data");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          // Don't show alert, just redirect
          navigate("/login");
        }
      } else {
        // No token found, redirect to login
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate, user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <div className="header">
      <div
        className="user-profile"
        onClick={() => setShowPopup(!showPopup)}
        ref={profileRef}
      >
        <div className="avatar">{username.charAt(0)}</div>
        <span className="username">{username.split(" ")[0]}</span>

        {showPopup && (
          <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
            <button className="dropdown-item logout" onClick={handleLogout}>
              Logout
            </button>
            <button
              className="dropdown-item cancel"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;