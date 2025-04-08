import React, { useEffect, useRef, useState }  from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const Header = () => {
  const [username, setUsername] = useState("");
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const profileRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("userToken"); 
    sessionStorage.clear(); 
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized access. Please log in.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/dashboard`, {
          headers: { Authorization: token },
        });
        if (!response.ok) throw new Error("Failed to fetch data");

        const userData = await response.json();
        setUsername(userData.user?.name || "User");   
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Error fetching data");
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  
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
