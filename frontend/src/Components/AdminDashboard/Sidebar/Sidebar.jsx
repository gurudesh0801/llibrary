import React from "react";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setView }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    fetch(`${BASE_URL}/admin/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        alert(data.Msg);
        navigate("/adminlogin");
      });
  };
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li onClick={() => setView("NewEntryForm")}>New Entry Form</li>
        <li onClick={() => setView("ViewStudents")}>View All Students</li>
        <li onClick={() => setView("ViewAllSignup")}>Signup users</li>
        <li onClick={() => setView("FeeStatus")}>Check Fee Paying Status</li>
        <li onClick={handleOnClick}>Sign Out</li>
      </ul>
    </div>
  );
};

export default Sidebar;
