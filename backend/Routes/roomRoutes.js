const express = require("express");
const router = express.Router();
const Room = require("../Room/Room"); // Adjust the path as needed

// Get all rooms
router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Book a seat
router.post("/rooms/:room_id/seats/:seat_id/book", async (req, res) => {
  try {
    const { room_id, seat_id } = req.params;
    const { name } = req.body;

    const room = await Room.findOne({ room_id });
    if (!room) return res.status(404).json({ message: "Room not found" });

    const seat = room.seats.find((seat) => seat.seat_id === parseInt(seat_id));
    if (!seat) return res.status(404).json({ message: "Seat not found" });

    if (!seat.available)
      return res.status(400).json({ message: "Seat is already booked" });

    // Update seat details
    seat.available = false;
    seat.bookedBy = name;
    seat.bookedAt = new Date();
    await room.save();

    // Schedule the seat to be available again after 2 hours
    setTimeout(async () => {
      try {
        const roomToUpdate = await Room.findOne({ room_id });
        if (roomToUpdate) {
          const seatToUpdate = roomToUpdate.seats.find(
            (seat) => seat.seat_id === parseInt(seat_id)
          );
          if (seatToUpdate) {
            seatToUpdate.available = true;
            seatToUpdate.bookedBy = null;
            seatToUpdate.bookedAt = null;
            await roomToUpdate.save();
            console.log(`Seat ${seat_id} in room ${room_id} is now available.`);
          }
        }
      } catch (error) {
        console.error("Error making the seat available:", error);
      }
    }, 10000); // 2 hours in milliseconds
    // 2 * 60 * 60 * 1000
    res.json({ message: "Seat booked successfully", room });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

module.exports = router;
