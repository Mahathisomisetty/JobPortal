module.exports = function (req, res, next) {
  console.log("ROLE FROM TOKEN:", req.user.role); // DEBUG

  if (req.user.role !== "recruiter") {
    return res.status(403).json({ msg: "Only recruiters can post jobs" });
  }

  next();
};
