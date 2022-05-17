import { NavLink } from "react-router-dom";
import React from "react";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <div className="Main">
      <NavLink to="/" className="nav">
        Home
      </NavLink>
      <NavLink to={"/users"} className="nav">
        GitHubUsers
      </NavLink>
      <NavLink to="/following" className="nav">
        Following
      </NavLink>
    
    </div>
  );
};

export default Navigation;
