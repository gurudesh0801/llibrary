const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv").config({ path: ".env" });
const JWT_SECRET = process.env.JWT_SECRET;

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

// Login route
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Generate JWT token

  // const token = generateToken(payload);

  const token = jwt.sign({ email, password }, JWT_SECRET, { expiresIn: "1h" });

  // Set the token in an HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true, // Prevents JavaScript access
    secure: true, // Ensures the cookie is only sent over HTTPS
    sameSite: "Strict", // Prevents CSRF by limiting cross-site requests
  });

  // console.log(token);
  // console.log(req.cookies);

  res.json({ Token: token });
});

module.exports = router;
