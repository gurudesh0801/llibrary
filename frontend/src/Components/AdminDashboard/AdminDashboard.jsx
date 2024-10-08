import React, { useState } from "react";
import "./AdminDashboard.css";
import NewEntryForm from "./NewEntryForm";
import ViewStudents from "./ViewAllStudents";
import FeeStatus from "./FeePayingStatus";
import Sidebar from "./Sidebar/Sidebar";
import ViewAllSignup from "./ViewAllSignup";

const AdminDashboard = () => {
  const [view, setView] = useState("NewEntryForm");

  const renderView = () => {
    switch (view) {
      case "NewEntryForm":
        return <NewEntryForm />;
      case "ViewStudents":
        return <ViewStudents />;
      case "FeeStatus":
        return <FeeStatus />;
      case "ViewAllSignup":
        return <ViewAllSignup />;
      default:
        return <NewEntryForm />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar setView={setView} />
      <div className="content">{renderView()}</div>
    </div>
  );
};

export default AdminDashboard;
