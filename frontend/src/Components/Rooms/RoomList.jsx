import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Loading";
import "./RoomList.css";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedSeatId, setSelectedSeatId] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRooms();

    // Polling every 10 seconds to check for seat availability
    const interval = setInterval(() => {
      fetchRooms(false);
    }, 10000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchRooms = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/rooms");
      const data = await response.json();
      setRooms((prevRooms) => {
        // Check if there's any difference in the seat availability
        const hasChanges = JSON.stringify(prevRooms) !== JSON.stringify(data);
        if (hasChanges) {
          // Notify when a seat becomes available
          data.forEach((room) => {
            const prevRoom = prevRooms.find((r) => r.room_id === room.room_id);
            if (prevRoom) {
              room.seats.forEach((seat) => {
                const prevSeat = prevRoom.seats.find(
                  (s) => s.seat_id === seat.seat_id
                );
                if (prevSeat && !prevSeat.available && seat.available) {
                  toast.info(
                    `Seat ${seat.seat_id} in Room ${room.room_id} is now available!`
                  );
                }
              });
            }
          });
          return data;
        }
        return prevRooms;
      });
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Failed to fetch rooms. Please try again later.");
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const selectSeat = (room_id, seat_id) => {
    setSelectedRoomId(room_id);
    setSelectedSeatId(seat_id);
  };

  const bookSeat = async () => {
    if (selectedRoomId && selectedSeatId && name) {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `http://localhost:5000/api/rooms/${selectedRoomId}/seats/${selectedSeatId}/book`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
          }
        );
        if (response.ok) {
          const updatedRooms = rooms.map((room) => {
            if (room.room_id === selectedRoomId) {
              const updatedSeats = room.seats.map((seat) =>
                seat.seat_id === selectedSeatId
                  ? {
                      ...seat,
                      available: false,
                      bookedBy: name,
                      bookedAt: new Date(),
                    }
                  : seat
              );
              return { ...room, seats: updatedSeats };
            }
            return room;
          });
          setRooms(updatedRooms);

          toast.success("Seat booked successfully");
          setSelectedRoomId(null);
          setSelectedSeatId(null);
          setName("");
        } else {
          setError("Failed to book seat. Please try again.");
        }
      } catch (error) {
        console.error("Error booking seat:", error);
        setError("An error occurred while booking the seat. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter your name and select a seat");
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="roomHeading">Room List</h1>
      {loading && <Loading />}
      {error && <p className="error">{error}</p>}
      {rooms.map((room) => (
        <div key={room._id} className="room-container">
          <h2>Room {room.room_id}</h2>
          <div className="seat-grid">
            {room.seats.map((seat) => (
              <div
                key={seat.seat_id}
                className={`seat ${
                  seat.available
                    ? selectedRoomId === room.room_id &&
                      selectedSeatId === seat.seat_id
                      ? "selected"
                      : "available"
                    : "unavailable"
                }`}
                onClick={() =>
                  seat.available && selectSeat(room.room_id, seat.seat_id)
                }
              >
                {seat.seat_id}
              </div>
            ))}
          </div>
          {selectedRoomId === room.room_id && selectedSeatId && (
            <div className="booking-section">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={bookSeat} disabled={!name || loading}>
                {loading ? "Booking..." : "Book"}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomList;
