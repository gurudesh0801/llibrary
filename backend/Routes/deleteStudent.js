const express = require("express");
const router = express.Router();
const Student = require("../student/studentSchema");

// DELETE /api/delete/:id - Delete a student by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the student by ID and delete it
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student deleted successfully", deletedStudent });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Failed to delete student", error });
  }
});

module.exports = router;
