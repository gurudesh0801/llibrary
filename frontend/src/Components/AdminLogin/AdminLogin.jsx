import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "/Images/admin.png";
import "./AdminLogin.css";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const InputField = ({ id, type, value, onChange, placeholder }) => (
  <div className="inputField">
    <label htmlFor={id}>{placeholder}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  </div>
);

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        navigate("/admindashboard");
        console.log(data.Token);
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginImage">
        <img src={loginImage} alt="Login" />
      </div>
      <div className="loginForm">
        <h1 className="formHeading">Admin Login</h1>
        <form id="loginFormDetails" onSubmit={handleSubmit}>
          <InputField
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <InputField
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <p>
            <Link to="#">Forgot password?</Link>
          </p>
          <br />
          <input
            type="submit"
            id="loginSubmit"
            value={loading ? "Logging in..." : "Login"}
            disabled={loading}
            className={loading ? "loading" : ""}
          />
        </form>
        <p className="or">----------- OR ------------</p>
        <div className="social-icons">
          <i className="fab fa-google"></i>
          <i className="fab fa-facebook"></i>
        </div>
        <p className="adminLogin">
          You Are Student? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
