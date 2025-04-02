import React, { useEffect, useState }  from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const Header = () => {

  const [username, setUsername] = useState("");
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

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
        // Fetch user dashboard data
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
 

  return (
    <div className="header">
  <div className="user-profile" onClick={() => setShowPopup(true)}>
    <div className="avatar">{username.charAt(0)}</div>
    <span className="username">{username.split(" ")[0]}</span>
  </div>

  {showPopup && (
    <div className="popup-overlay" onClick={() => setShowPopup(false)}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <p>Are you sure you want to logout?</p>
        <div className="popup-buttons">
          <button className="confirm" onClick={handleLogout}>Yes, Logout</button>
          <button className="cancel" onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default Header;
