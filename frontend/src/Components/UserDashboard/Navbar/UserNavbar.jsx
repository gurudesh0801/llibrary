import React, { useEffect } from "react";
import "./UserNavbar.css";
import desk from "/Images/desk_3577064.png";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../contexts/authContext";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
import { useNavigate } from "react-router-dom";

const UserNavbar = ({ setView }) => {
  const { logout } = useUserAuth();

  const navigate = useNavigate();
  useEffect(() => {
    const list = document.querySelectorAll(".navigation li");

    function activeLink() {
      list.forEach((item) => {
        item.classList.remove("hovered");
      });
      this.classList.add("hovered");
    }

    list.forEach((item) => item.addEventListener("mouseover", activeLink));

    const toggle = document.querySelector(".toggle");
    const navigation = document.querySelector(".navigation");
    const main = document.querySelector(".main");

    function handleToggleClick() {
      navigation.classList.toggle("active");
      main.classList.toggle("active");
    }

    if (toggle) {
      toggle.addEventListener("click", handleToggleClick);
    }

    // Cleanup event listeners on component unmount
    return () => {
      list.forEach((item) => item.removeEventListener("mouseover", activeLink));
      if (toggle) toggle.removeEventListener("click", handleToggleClick);
    };
  }, []);
  const handleOnClick = () => {
    fetch(`https://llibrary-backend.onrender.com/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        alert(data.msg);
        logout();
        navigate("/login");
      });
  };

  return (
    <div className="container">
      <div className="navigation">
        <ul>
          <li>
            <Link to="#">
              <span className="icon">
                <ion-icon name="logo-apple"></ion-icon>
              </span>
              <span className="title">Legends Library</span>
            </Link>
          </li>

          <li>
            <Link to="/userdashboard">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="#">
              <span className="icon">
                <img src={desk} alt="img" />
              </span>
              <span className="title">Rooms</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <span className="icon">
                <ion-icon name="settings-outline"></ion-icon>
              </span>
              <span className="title">Settings</span>
            </Link>
          </li>

          <li>
            <Link to="#">
              <span className="icon">
                <ion-icon name="lock-closed-outline"></ion-icon>
              </span>
              <span className="title">Help</span>
            </Link>
          </li>

          <li>
            <Link to="#" onClick={handleOnClick}>
              <span className="icon">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Sign Out</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="main">
        <div className="topbar">
          <div className="toggle">
            <ion-icon name="menu-outline"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
