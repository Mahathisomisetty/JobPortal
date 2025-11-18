var mongoose = require("mongoose");
//Schema with fields
var userSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    phonenumber:Number,
     role: {
      type: String,
      enum: ["user", "recruiter", "admin"],
      default: "user",
    },
    profile: {
      headline: { type: String, default: "" },
      Summary:String,
      experience: { type: Number, default: 0 },
      skills: [{ type: String }],
      resume: { type: String }, 
      education: [{ type: String }],
      location: { type: String },
      // recruiter fields
      company: { type: String, default: "" },
      isVerified: { type: Boolean, default: false },
    },
})
var userModel = mongoose.model("user",userSchema) // creating data base
module.exports= userModel;