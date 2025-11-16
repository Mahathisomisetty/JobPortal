var mongoose = require("mongoose");
//Schema with fields
var userSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    phonenumber:Number,
    profile: {
      headline: { type: String, default: "" },
      experience: { type: Number, default: 0 },
      skills: [{ type: String }],
      resume: { type: String }, 
      education: [{ type: String }],
      location: { type: String },
    },
})
var userModel = mongoose.model("user",userSchema) // creating data base
module.exports= userModel;