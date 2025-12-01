const express = require("express");
const router = express.Router();
const userModel = require("../Users/user.model");

// GET all users
router.get("/getall", async (req, res) => {
  try {
    const data = await userModel.find({});
    res.send(data);
  } catch (err) {
    res.status(500).send({ msg: "Error fetching users" });
  }
});

// GET user by ID
router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user)
      return res.status(404).send({ msg: "User not found" });

    res.send(user);

  } catch (err) {
    res.status(500).send({ msg: "Error fetching user" });
  }
});

// UPDATE USER (🔥 FIXED for nested profile fields)
router.put("/updateUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Build update object safely for nested fields
    const updateData = {
      fullname: req.body.fullname,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      role: req.body.role,

      "profile.headline": req.body.profile?.headline,
      "profile.Summary": req.body.profile?.Summary,
      "profile.experience": req.body.profile?.experience,
      "profile.skills": req.body.profile?.skills,
      "profile.education": req.body.profile?.education,
      "profile.certifications": req.body.profile?.certifications,
      "profile.location": req.body.profile?.location,
      "profile.company": req.body.profile?.company,
      "profile.resume": req.body.profile?.resume,
      "profile.profileImage": req.body.profile?.profileImage,
    };

    // Remove undefined fields (MUST DO)
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).send({ msg: "User not found" });

    res.send({
      msg: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error updating user" });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "Account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
