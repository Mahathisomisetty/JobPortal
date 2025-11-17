var express = require("express");
var router = express.Router();
var userModel = require("./user.model");
var jwt = require("jsonwebtoken");

const SECRET_KEY = "MY_SECRET_123";   // Secret key
//Get All users
router.get("/getall", async (req, res) => {
  try {
    const data = await userModel.find({});
    res.send(data);
  } catch (err) {
    res.status(500).send({ msg: "Error fetching users" });
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password, phonenumber } = req.body;

    // Check if user exists
    let exist = await userModel.findOne({ email });
    if (exist) return res.status(400).send({ msg: "User already exists" });

    // Create user (plain password)
    let user = new userModel({
      fullname,      //name
      email,         //email
      password,      // password
      phonenumber,   //phonenumber
    });

    await user.save();

    res.send({ msg: "Registered successfully" });

  } catch (err) {
    res.status(500).send({ msg: "Error while registering" });
  }
});
// get user by id
router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send({ msg: "Error fetching user" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).send({ msg: "Invalid email or password" });

    if (user.password !== password)
      return res.status(400).send({ msg: "Invalid email or password" });

    let token = jwt.sign(
      { id: user._id.toString(), email: user.email },//payload
      SECRET_KEY,//secretkey
      { expiresIn: "1h" } //expiration 
    );

    // RETURN  STRING ID
    const userId = user._id.toString();
    console.log("🔥 BACKEND SENDING USER ID:", userId);

    res.send({
      msg: "Login successful",
      token: token,
      user: {
        id: userId,                   
        fullname: user.fullname,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).send({ msg: "Error during login" });
  }
});


module.exports = router;
