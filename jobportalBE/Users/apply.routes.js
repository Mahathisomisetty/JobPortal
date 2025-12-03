const express = require("express");
const router = express.Router();

const Application = require("../Applications/application.model");
const Job = require("../Jobs/jobs.model.js");
const User = require("../Users/user.model.js");   
const auth = require("../Users/auth.middleware");

// APPLY FOR JOB
router.post("/apply", auth, async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    const recruiterId =
      job.postedBy ||
      job.createdBy ||
      job.recruiterId ||
      job.userId;

    const alreadyApplied = await Application.findOne({
      jobId,
      appliedBy: userId,
    });
    if (alreadyApplied) return res.json({ msg: "You already applied" });

    const application = await Application.create({
      jobId,
      appliedBy: userId,
      recruiterId,
    });

    res.json({ msg: "Applied Successfully!", application });
  } catch (err) {
    console.error("APPLY ERROR:", err);
    res.status(500).json({ msg: "Error applying for job" });
  }
});

// USER APPLICATIONS
router.get("/user/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    const applications = await Application.find({ appliedBy: userId })
      .populate("jobId", "title company location salary")
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error("FETCH USER APPS ERROR:", err);
    res.status(500).json({ msg: "Error fetching applications" });
  }
});

// ⭐ RECRUITER APPLICATIONS
router.get("/recruiter/:recruiterId", auth, async (req, res) => {
  try {
    const { recruiterId } = req.params;

    // console.log(" Recruiter ID from FE:", recruiterId);

    const apps = await Application.find({ recruiterId })
      .populate("jobId", "title company")
      .populate("appliedBy", "fullname email phonenumber profile"); // NOW SAFE

    // console.log(" Applications Found:", apps);

    const formatted = apps.map((app) => ({
      jobTitle: app.jobId?.title,
      company: app.jobId?.company,
      applicantName: app.appliedBy?.fullname,
      applicantEmail: app.appliedBy?.email,
      applicantPhone: app.appliedBy?.phonenumber,
      appliedOn: app.appliedAt,
      resume: app.appliedBy?.profile?.resume || null,
    }));

    res.json(formatted);

  } catch (err) {
    console.error("🔥 Backend Recruiter Error:", err);
    res.status(500).json({ msg: "Error fetching recruiter applications" });
  }
});

// WITHDRAW
router.delete("/withdraw/:appId", auth, async (req, res) => {
  try {
    const { appId } = req.params;

    const deleted = await Application.findByIdAndDelete(appId);
    if (!deleted)
      return res.status(404).json({ msg: "Application not found" });

    res.json({ msg: "Application withdrawn successfully!" });
  } catch (err) {
    console.error("WITHDRAW ERROR:", err);
    res.status(500).json({ msg: "Error withdrawing application" });
  }
});

module.exports = router;
