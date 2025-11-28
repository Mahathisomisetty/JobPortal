const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Storage for PDF files
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF allowed"), false);
  },
});

// ⭐ PDF Upload Endpoint
router.post("/upload/resume", upload.single("resume"), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

  res.json({
    msg: "Uploaded successfully",
    filePath: "/uploads/" + req.file.filename,
  });
});

module.exports = router;
