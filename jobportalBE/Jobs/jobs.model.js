// File: backend/Jobs/job.model.js

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  description: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Job", jobSchema);
