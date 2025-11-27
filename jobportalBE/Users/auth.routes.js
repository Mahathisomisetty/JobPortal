const express = require("express");
const router = express.Router();
const userModel = require("../Users/user.model");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "MY_SECRET_123";

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password, phonenumber, role } = req.body;

    let exist = await userModel.findOne({ email });
    if (exist) return res.status(400).send({ msg: "User already exists" });

    let user = new userModel({
      fullname,
      email,
      password,
      phonenumber,
      role: role || "user",
    });

    await user.save();

    res.send({ msg: "Registered successfully" });

  } catch (err) {
    res.status(500).send({ msg: "Error while registering" });
  }
});

// LOGIN
// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).send({ msg: "Invalid email or password" });

    if (user.password !== password)
      return res.status(400).send({ msg: "Invalid email or password" });

    const userId = user._id.toString();

    let token = jwt.sign(
      { id: userId, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.send({
      msg: "Login successful",
      token,
      user: {
        id: userId,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).send({ msg: "Error during login" });
  }
});
module.exports = router;
