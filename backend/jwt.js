const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const jwtAuthMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Get the token from the HttpOnly cookie

  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, JWT_SECRET, (error, user) => {
      if (error) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "14h" });
};

module.exports = { jwtAuthMiddleware, generateToken };
