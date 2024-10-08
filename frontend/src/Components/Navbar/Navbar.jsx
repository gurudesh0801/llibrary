import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "/Images/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="navDiv">
      <div className="navLogo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={isOpen ? "line line1 open" : "line line1"}></div>
        <div className={isOpen ? "line line2 open" : "line line2"}></div>
        <div className={isOpen ? "line line3 open" : "line line3"}></div>
      </div>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <ul className="navItems">
          <li onClick={closeMenu}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/about">About</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/features">Features</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/gallery">Gallery</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <ul className={isOpen ? "authentication open" : "authentication"}>
          <li onClick={closeMenu}>
            <Link to="login" className="loginBtn">
              <i className="fa-solid fa-user"></i> Login
            </Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="signup" className="signupBtn">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
