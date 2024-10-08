const uri = process.env.MONGO_URL;

const mongoose = require("mongoose");

const dbconnect = () => {
  console.log("Attempting to connect to MongoDB...");

  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB");
      console.log("Mongoose connection state:", mongoose.connection.readyState);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};
module.exports = dbconnect;
