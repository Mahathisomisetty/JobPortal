const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

var mongooseConnection = require("./mongodbConnection");

// Routers
var userRouter = require("./Users/user.router");
var authRouter = require("./Users/auth.routes");   // ✅ ADD THIS

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/users", userRouter);
app.use("/auth", authRouter);   // ✅ ADD THIS for login/register

app.listen(3500, () =>
  console.log("server running on http://localhost:3500")
);
