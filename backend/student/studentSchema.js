const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  education: { type: String, required: true },
  fees: { type: String, required: true },
  amountPaid: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
