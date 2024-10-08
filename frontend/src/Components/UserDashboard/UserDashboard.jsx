import React, { useState, useEffect } from "react";
import { useUser } from "../../utils/useContext";
import "./UserDashboard.css";
import UserNavbar from "./Navbar/UserNavbar";
import Loading from "../Loading/Loading";
import RoomList from "../Rooms/RoomList";
import ProgressBar from "../ProgressBar/ProgressBar"; // Import the ProgressBar component

const UserDashboard = () => {
  const { user } = useUser(); // Get user data from context
  const isLoading = !user; // Loading state if user is undefined
  const [view, setView] = useState("RoomOne");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isSeatSelected, setIsSeatSelected] = useState(false); // Track seat selection

  useEffect(() => {
    // Reset seat selection when the view changes
    setIsSeatSelected(false);
    setSelectedSeats([]);
  }, [view]);

  const handleSeatSelect = (seats, isSelected) => {
    setSelectedSeats(seats);
    setIsSeatSelected(isSelected);
  };

  return (
    <div>
      <UserNavbar />
      <div className="user-details">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <h1 className="welcome-text">Welcome, {user.name}</h1>
            <ProgressBar /> {/* Add the progress bar here */}
          </div>
        )}
      </div>
      <RoomList />
    </div>
  );
};

export default UserDashboard;
