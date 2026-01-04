const express = require("express");
const User = require("../models/userModel");
const { protect } = require("../middlewares/authMiddleware");
const { updateUser } = require("../controllers/userController");
const router = express.Router();

// Get all users (admin)
router.get("/", protect, async (req, res) => {
  if(req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  const users = await User.find().select("-password");
  res.json(users);
});

// PUT /api/v1/users/:id — Update user profile
router.put("/:id", protect, updateUser);

module.exports = router;
