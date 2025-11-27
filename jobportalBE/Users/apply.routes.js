const express = require("express");
const router = express.Router();

const Application = require("../Applications/application.model");  // ✅ FIXED
const Job = require("../Jobs/jobs.model");
const auth = require("../Users/auth.middleware"); // JWT middleware

// ======================================================
// APPLY FOR A JOB (User applies)
// ======================================================
router.post("/apply", auth, async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    // Check if already applied
    const alreadyApplied = await Application.findOne({ jobId, appliedBy: userId });

    if (alreadyApplied) {
      return res.json({ msg: "You already applied for this job" });
    }

    const application = await Application.create({
      jobId,
      appliedBy: userId,
    });

    res.json({
      msg: "Applied Successfully!",
      application,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error applying for job" });
  }
});

module.exports = router;
