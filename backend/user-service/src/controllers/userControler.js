const User = require("../models/userModel");

// GET /api/v1/users — List all users (Admin only)
const listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/v1/users/:id — Update a user profile
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    // Find the user
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { listUsers, updateUser };
