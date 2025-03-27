import React from "react";

const Header = () => {
  const username = "Padmanaban S";

  return (
    <div className="header">
      <div className="user-profile">
      <span className="username">{username.split(" ")[0]}</span>
        <div className="avatar">{username.charAt(0)}</div>
      </div>
    </div>
  );
};

export default Header;
