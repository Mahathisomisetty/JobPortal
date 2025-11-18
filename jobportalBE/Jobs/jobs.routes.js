const express = require("express");
const auth = require("../Users/auth.middleware");
const onlyRecruiter = require("../Users/recruiter.middleware");

const router = express.Router();

router.post("/create", auth, onlyRecruiter, (req, res) => {
  res.send({ msg: "Job created successfully" });
});

module.exports = router;
