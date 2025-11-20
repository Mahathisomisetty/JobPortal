module.exports = function (req, res, next) {
  if (!req.user || req.user.role !== "recruiter") {
    return res.status(403).json({ msg: "Only recruiters can post jobs" });
  }

  next();
};
