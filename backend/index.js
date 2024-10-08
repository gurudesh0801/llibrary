const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const dbconnect = require("./db");
const dotenv = require("dotenv");
const userModel = require("./user/userModel");
const jwt = require("jsonwebtoken");
const studentSchema = require("./student/studentSchema");
const deleteStudent = require("./Routes/deleteStudent");
const { default: mongoose } = require("mongoose");
const authRoutes = require("../Routes/auth");
const roomRoutes = require("./Routes/roomRoutes");
const Room = require("./Room/Room");
dotenv.config({ path: "./.env" });
const { jwtAuthMiddleware, generateToken } = require("./jwt");
const JWT_SECRET = process.env.JWT_SECRET;
dbconnect();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
// Home Route API

// Signup API
app.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  // validation
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  // Database Call
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      console.log(user);
      return res
        .status(400)
        .json({ msg: "User already exists with this email." }); // Changed to 400 for bad request
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error while checking user" });
  }
  console.log(userModel);

  // Password Hashing
  const hashedPassword = await bcrypt.hash(password, 10); // Fixed typo in variable name

  let newUser;
  try {
    newUser = await userModel.create({
      name,
      email,
      phone,
      password: hashedPassword, // Fixed typo in variable name
    });

    // JWT Token
    const payload = {
      id: newUser._id,
      email: newUser.email,
    };
    const token = generateToken(payload);

    res.status(201).json({ user: newUser, token: token });
    console.log(token); // Respond with created user
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error while creating user" });
  }
});

app.get("/api/viewSignup", jwtAuthMiddleware, async (req, res) => {
  try {
    const students = await userModel.find();
    res.json(students);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login User

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ msg: "Must have Email and password..." });
  }

  let user;
  try {
    user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User Not Found for this Email!" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error while getting the user" });
  }

  // Check the password
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Password is incorrect." });
    }

    const payload = {
      id: user.id,
      username: user.name,
    };
    const token = generateToken(payload);
    res.cookie("userToken", token, {
      httpOnly: true, // Prevents JavaScript access
      secure: true, // Ensures the cookie is only sent over HTTPS
      sameSite: "Strict", // Prevents CSRF by limiting cross-site requests
    });
    console.log(token);

    // Successful login
    return res.status(200).json({ msg: "Login successful", token: token });
  } catch (error) {
    return res.status(500).json({ msg: "Error while checking the details" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("userToken");
  res.json({ msg: "User Logout Successfully" });
});

// Auth Login

app.use("/api", authRoutes);

// Admin logout api

app.post("/admin/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ Msg: "Logout Successfuly" });
});

// get User Deatils API
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    const user = await userModel.findById(userId);
    if (user) {
      user.password = undefined; // Exclude password from response
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
});
// New User Add API

app.post("/students", async (req, res) => {
  console.log("name");
  try {
    const student = new studentSchema(req.body);
    await student.save();
    res
      .status(201)
      .json({ message: "Student entry created successfully", student });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating student entry", error: err.message });
  }
});

// Get the student Data

app.get("/api/viewall", jwtAuthMiddleware, async (req, res) => {
  try {
    const students = await studentSchema.find();
    res.json(students);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put("/api/edit/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const student = await studentSchema.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.json(student);
  } catch (error) {
    res.status(500).send("Error updating student");
  }
});

app.use("/api", deleteStudent);

app.get("/checkrole", (req, res) => {
  const token = req.cookies.token;

  if (token) {
    return res.json({ Role: "Admin", Token: token });
  } else {
    res.json({ Role: "User", Token: null });
  }
});

app.use("/api", roomRoutes);

app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find(); // Fetch all rooms from the database
    res.json(rooms); // Send rooms as JSON response
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Set Reminder
app.post("/api/send-reminder", (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res
      .status(400)
      .json({ error: "Phone number and message are required" });
  }

  // WhatsApp URL to send the message
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  // Send the generated URL back to the client
  res.json({ success: true, link: waUrl });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
