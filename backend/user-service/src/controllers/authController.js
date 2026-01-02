const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/jwt");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    const token = generateToken({ id: user._id });
    res.status(201).json({ user, token });
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken({ id: user._id });
    res.json({ user, token });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

const me = async (req, res) => {
  res.json(req.user);
};

const logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};

module.exports = { register, login, me, logout };
