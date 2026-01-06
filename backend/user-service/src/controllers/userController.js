const User = require("../models/userModel");

// GET /api/v1/users — Admin only
const listUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/v1/users/:id — Update profile
const updateUser = async (req, res) => {
  try {
    // Only owner or admin
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Prevent role escalation
    if (req.body.role && req.user.role !== "admin") {
      return res.status(403).json({ error: "Cannot change role" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { listUsers, updateUser };
