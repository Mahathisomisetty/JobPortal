const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const axios = require("axios");

const app = express();

//  CORS (FINAL FIX FOR VERCEL + RENDER)
app.use(cors({
  origin: [
    "https://job-portal-84r5.vercel.app",   // Your Vercel frontend URL
    "http://localhost:5173",                // Local Vite React
    "http://localhost:3000"                 // Local CRA React
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

//  Body parsers
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  uploaded files (PDF/Images)
app.use("/uploads", express.static("uploads"));

//  MongoDB connection
require("./mongodbConnection");

//  Routers
const userRouter = require("./Users/user.router");
const authRouter = require("./Users/auth.routes");
const jobRoutes = require("./Jobs/jobs.routes");
const applyRoutes = require("./Users/apply.routes");
const uploadRoutes = require("./Users/uploadfile.route");

//  API Routes
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/jobs", jobRoutes);
app.use("/applyjob", applyRoutes);
app.use("/", uploadRoutes);

//  Default Route (optional)
app.get("/", (req, res) => {
  res.send("Job Portal Backend Running Successfully ");
});

/*  KEEP BACKEND AWAKE (CRON JOB) — ADDED FOR PRODUCTION
   Render free tier sleeps after inactivity.
   This cron pings the backend every 5 minutes to keep it awake.
*/
cron.schedule("*/5 * * * *", async () => {
  try {
    await axios.get("https://jobportal-backend-1z62.onrender.com");
    console.log(" Backend pinged to stay awake");
  } catch (error) {
    console.log(" Ping failed:", error.message);
  }
});

//  PORT for Render
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
