const express = require("express");
const User = require("../models/userModel");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// Get all users (admin)
router.get("/", protect, async (req, res) => {
  if(req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  const users = await User.find().select("-password");
  res.json(users);
});

module.exports = router;
