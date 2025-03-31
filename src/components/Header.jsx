import React, { useEffect, useState }  from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const [username, setUsername] = useState("");
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
 
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
      <div className="user-profile">
      <div className="avatar">{username.charAt(0)}</div>
      <span className="username">{username.split(" ")[0]}</span>
      </div>
    </div>
  );
};

export default Header;
