import React from "react";

const Header = () => {
  const username = "User";

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
