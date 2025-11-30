var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  phonenumber: Number,
  role: {
    type: String,
    enum: ["user", "recruiter", "admin"],
    default: "user",
  },
  profile: {
  headline: { type: String, default: "" },
  Summary: { type: String, default: "" },
  experience: { type: String, default: "" },
  skills: [{ type: String }],
  resume: { type: String },
  education: [{ type: String }],
  location: { type: String },
  company: { type: String, default: "" },
  certifications: [{ type: String }],   // ⭐ FIXED HERE
  isVerified: { type: Boolean, default: false },
},
});

// ⭐ FIXED MODEL NAME (User)
var userModel = mongoose.model("User", userSchema);

module.exports = userModel;
