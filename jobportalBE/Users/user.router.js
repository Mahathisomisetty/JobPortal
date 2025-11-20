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

// GET user by ID  ✔ FIXED
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

// UPDATE USER
router.put("/updateUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).send({ msg: "User not found" });

    res.send({
      msg: "Profile updated successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).send({ msg: "Error updating user" });
  }
});

module.exports = router;
