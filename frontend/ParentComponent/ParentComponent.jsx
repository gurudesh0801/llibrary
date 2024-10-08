import React, { useState, useEffect } from "react";
import RoomOne from "../src/Components/Rooms/RoomOne/RoomOne";

const ParentComponent = () => {
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomId = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/rooms");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Assuming the API returns a list of rooms and we pick the first one for simplicity
        setRoomId(data[0]?.id); // Adjust based on your data structure
      } catch (error) {
        console.error("Error fetching room details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomId();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {roomId ? (
        <RoomOne
          roomId={roomId}
          onSeatSelect={(selected) => console.log(selected)}
        />
      ) : (
        <div>No room available</div>
      )}
    </div>
  );
};

export default ParentComponent;
