const express = require("express");
const getAdminDashboard = require("./getAdminDashboard");
const jwtAuthMiddleware = require("../jwt");

const router = express.Router();

// Admin Dashboard route with 'admin' role check
router.get("/dashboard", jwtAuthMiddleware, getAdminDashboard);

module.exports = router;
