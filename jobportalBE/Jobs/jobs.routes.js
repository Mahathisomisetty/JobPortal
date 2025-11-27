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
router.get("/getJob/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// -------------------------------------
// GET JOBS OF ONE RECRUITER →  GET /jobs/recruiter/:id
// -------------------------------------
router.get("/recruiter/:id", auth, onlyRecruiter, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.params.id })
      .sort({ createdAt: -1 });

    res.send(jobs);

  } catch (err) {
    res.status(500).json({ msg: "Error fetching recruiter jobs" });
  }
});
// -------------------------------------
// UPDATE JOB → PUT /jobs/update/:id
// -------------------------------------
router.put("/update/:id", auth, onlyRecruiter, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).send({ msg: "Job not found" });

    // Only job owner can update
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).send({ msg: "Unauthorized" });
    }

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.send({ msg: "Job updated successfully", updated });

  } catch (err) {
    res.status(500).send({ msg: "Error updating job", err });
  }
});
// -------------------------------------
// DELETE JOB → DELETE /jobs/delete/:id
// -------------------------------------
router.delete("/delete/:id", auth, onlyRecruiter, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).send({ msg: "Job not found" });

    // Only job owner can delete
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).send({ msg: "Unauthorized" });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.send({ msg: "Job deleted successfully" });

  } catch (err) {
    res.status(500).send({ msg: "Error deleting job", err });
  }
});


module.exports = router;
