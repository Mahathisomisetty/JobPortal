const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: String,
  jobTitle: String,
  applicantId: String,
  applicantName: String,
  applicantEmail: String,
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", applicationSchema);
