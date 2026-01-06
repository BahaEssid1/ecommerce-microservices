const { verifyToken } = require("../utils/jwt");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = verifyToken(token);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch(err) {
      return res.status(401).json({ error: "Not authorized" });
    }
  } else {
    return res.status(401).json({ error: "No token provided" });
  }
};

module.exports = { protect };
