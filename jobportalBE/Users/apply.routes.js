const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.post("/apply", (req, res) => {
//   console.log("REQ BODY RECEIVED ====>", req.body); // Debugging line

  // ⛔ FIX: use req.body, NOT user
  const { jobId, jobTitle, applicantName, applicantEmail } = req.body;

  if (!jobId || !jobTitle || !applicantName || !applicantEmail) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  const folderPath = path.join(__dirname, "..", "AppliedJobs");
  const filePath = path.join(folderPath, "AppliedJobs.txt");

  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    const entry = `
===========================
Applied Job Details
---------------------------
JOB TITLE: ${jobTitle}
JOB ID: ${jobId}
APPLICANT NAME: ${applicantName}
APPLICANT EMAIL: ${applicantEmail}
APPLIED ON: ${new Date().toLocaleString()}
===========================

`;

    fs.appendFileSync(filePath, entry);

    res.json({ msg: "Applied Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error writing to file" });
  }
});

module.exports = router;
