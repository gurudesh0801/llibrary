import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "/Images/loginimage.png";
import { useUserAuth } from "../contexts/authContext";
import "./Login.css";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to use history for navigation
  const { login } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Send login request to the server
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Parse JSON response

      if (!response.ok) {
        alert(`Login failed: ${data.msg}`);
        return;
      }

      // Successful login
      login(data.token);
      alert("Login successful!");
      navigate("/userdashboard"); // Redirect to user dashboard
      console.log(data.token);
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginImage">
        <img src={loginImage} alt="Login" />
      </div>
      <div className="loginForm">
        <p className="letterHeading">Start Your Journey</p>
        <h1 className="formHeading">Log in to Legends Library</h1>
        <form
          id="loginFormDetails"
          onSubmit={handleSubmit}
          method="POST"
          action={`${BASE_URL}/login`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <p>
            <Link to="#">Forgot password?</Link>
          </p>
          <br />
          <input type="submit" id="loginSubmit" value="Login" />
        </form>
        <p className="or">----------- OR ------------</p>
        <div className="social-icons">
          <i className="fab fa-google"></i>
          <i className="fab fa-facebook"></i>
        </div>
        <p className="dontAcccount">
          Don't Have Account? <Link to="/signup">Create Account</Link>
        </p>
        <p className="adminLogin">
          You Are Admin? <Link to="/adminlogin">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
