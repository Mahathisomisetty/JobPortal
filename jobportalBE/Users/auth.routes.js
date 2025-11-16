var express = require("express");
var router = express.Router();
var userModel = require("./user.model");
var jwt = require("jsonwebtoken");

const SECRET_KEY = "MY_SECRET_123";

// ================================
// REGISTER
// ================================
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password, phonenumber } = req.body;

    let exist = await userModel.findOne({ email });
    if (exist) return res.status(400).send({ msg: "User already exists" });

    let user = new userModel({
      fullname,
      email,
      password,      // plain password (your request)
      phonenumber,
    });

    await user.save();
    res.send({ msg: "Registered successfully" });

  } catch (err) {
    res.status(500).send({ msg: "Error while registering" });
  }
});

// ================================
// LOGIN
// ================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).send({ msg: "Invalid email or password" });

    if (user.password !== password)
      return res.status(400).send({ msg: "Invalid email or password" });

    // Create JWT
    let token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // ⭐ FIXED: Always return a valid MongoDB ID STRING
    res.send({
      msg: "Login successful",
      token: token,
      user: {
        id: user._id.toString(),      // ⭐ FIX HERE
        fullname: user.fullname,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).send({ msg: "Error during login" });
  }
});

module.exports = router;
