const jwt = require("jsonwebtoken");
const SECRET_KEY = "MY_SECRET_123";

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
