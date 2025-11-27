const express = require("express");
const router = express.Router();

const Application = require("../Applications/application.model");

// ⭐ FIXED: correct file name with "s" and ".js"
const Job = require("../Jobs/jobs.model.js");

const auth = require("../Users/auth.middleware");

router.post("/apply", auth, async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    const alreadyApplied = await Application.findOne({ jobId, appliedBy: userId });
    if (alreadyApplied) return res.json({ msg: "You already applied" });

    const application = await Application.create({
      jobId,
      appliedBy: userId,
    });

    res.json({ msg: "Applied Successfully!", application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error applying for job" });
  }
});

router.get("/user/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    const applications = await Application.find({ appliedBy: userId })
      .populate("jobId", "title company location salary")
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching applications" });
  }
});
// WITHDRAW APPLICATION
router.delete("/withdraw/:appId", auth, async (req, res) => {
  try {
    const { appId } = req.params;

    const deleted = await Application.findByIdAndDelete(appId);

    if (!deleted) return res.status(404).json({ msg: "Application not found" });

    res.json({ msg: "Application withdrawn successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error withdrawing application" });
  }
});

module.exports = router;
