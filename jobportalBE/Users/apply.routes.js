const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// ======================================================
// APPLY FOR A JOB → STORE IN AppliedJobs.txt
// ======================================================
router.post("/apply", (req, res) => {
  const { jobId, jobTitle, applicantName, applicantEmail, applicantId } = req.body;

  if (!jobId || !jobTitle || !applicantName || !applicantId) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  const folderPath = path.join(__dirname, "..", "AppliedJobs");
  const filePath = path.join(folderPath, "AppliedJobs.txt");

  try {
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

    // Format: applicantId||jobId||jobTitle||name||email||date
    const entry =
      `${applicantId}||${jobId}||${jobTitle}||${applicantName}||${applicantEmail}||${new Date().toLocaleString()}\n`;

    fs.appendFileSync(filePath, entry);

    res.json({ msg: "Applied Successfully!" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error writing to file" });
  }
});

// ======================================================
// GET ALL APPLICATIONS FOR ONE USER (Read from TXT)
// ======================================================
router.get("/user/:id", (req, res) => {
  const userId = req.params.id;

  const filePath = path.join(__dirname, "..", "AppliedJobs", "AppliedJobs.txt");

  if (!fs.existsSync(filePath)) return res.json([]);

  const content = fs.readFileSync(filePath, "utf-8").trim();

  if (!content) return res.json([]);

  const lines = content.split("\n");

  const apps = lines
    .map((line) => {
      const parts = line.split("||");
      if (parts.length < 6) return null;

      const [
        applicantId,
        jobId,
        jobTitle,
        applicantName,
        applicantEmail,
        appliedOn
      ] = parts;

      return {
        applicantId,
        jobId,
        jobTitle,
        applicantName,
        applicantEmail,
        appliedOn
      };
    })
    .filter(Boolean);

  // ✅ BACKEND FILTER: only this user's apps
  const userApps = apps.filter((a) => a.applicantId === userId);

  res.json(userApps);
});

module.exports = router;
