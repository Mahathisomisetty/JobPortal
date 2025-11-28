const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// ⭐ Correct Order of Middleware
app.use(cors());
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ⭐ Serve uploaded files
app.use("/uploads", express.static("uploads"));   // ⭐ ADD THIS

// MongoDB connection
var mongooseConnection = require("./mongodbConnection");

// Routers
var userRouter = require("./Users/user.router");
var authRouter = require("./Users/auth.routes");
const jobRoutes = require("./Jobs/jobs.routes");
const applyRoutes = require("./Users/apply.routes");
const uploadRoutes = require("./Users/uploadfile.route"); // ⭐ ADD THIS

// Routes
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/jobs", jobRoutes);
app.use("/applyjob", applyRoutes);
app.use("/", uploadRoutes); // ⭐ ADD THIS

// Server
app.listen(3500, () => {
  console.log("server running on http://localhost:3500");
});
