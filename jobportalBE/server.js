const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// ⭐ CORS - allow frontend (you can tighten later)
app.use(cors({
  origin: "*",        // or ["https://your-frontend.vercel.app", "http://localhost:3000"]
  credentials: true,
}));

// ⭐ Body parsers
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ⭐ Serve uploaded files
app.use("/uploads", express.static("uploads"));

// MongoDB connection
require("./mongodbConnection");

// Routers
const userRouter = require("./Users/user.router");
const authRouter = require("./Users/auth.routes");
const jobRoutes = require("./Jobs/jobs.routes");
const applyRoutes = require("./Users/apply.routes");
const uploadRoutes = require("./Users/uploadfile.route");

// Routes
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/jobs", jobRoutes);
app.use("/applyjob", applyRoutes);
app.use("/", uploadRoutes);

// ⭐ PORT for Render
const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
