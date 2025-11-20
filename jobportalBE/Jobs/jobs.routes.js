const express = require("express");
const router = express.Router();

const auth = require("../Users/auth.middleware");
const onlyRecruiter = require("../Users/recruiter.middleware");

// Import job model (must be inside same folder)
const Job = require("./jobs.model");

// -------------------------------------
// CREATE JOB  →  POST /jobs/create
// -------------------------------------
router.post("/create", auth, onlyRecruiter, async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      postedBy: req.user.id,  // recruiter ID from token
    });

    await job.save();

    res.send({ 
      msg: "Job stored successfully",
      job,
    });

  } catch (error) {
    console.error("JOB ERROR:", error);
    res.status(500).send({ msg: "Error posting job", error });
  }
});

// -------------------------------------
// GET ALL JOBS  →  GET /jobs/all
// -------------------------------------
router.get("/all", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.send(jobs);
  } catch (err) {
    res.status(500).send({ msg: "Error fetching jobs" });
  }
});

module.exports = router;
