const jwt = require("jsonwebtoken");
const User = require("./user.model");
const SECRET_KEY = "MY_SECRET_123";

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ msg: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // ⭐ FIX: support both "id" and "_id"
    const userId = decoded._id || decoded.id;

    if (!userId) {
      return res.status(401).json({ msg: "Invalid token payload" });
    }

    const user = await User.findById(userId).select("_id fullname email role");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user;  // Now req.user._id is always valid
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};
