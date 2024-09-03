const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

// Admin Login
router.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin || admin.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Admin Logout
router.post("/admin/logout", (req, res) => {
  // Logic to handle logout, e.g., clearing sessions
  res.status(200).json({ success: true, message: "Logout successful" });
});

router.post("/admin/register", async (req, res) => {
  const { email, password } = req.body; // Ensure `email` and `password` are extracted from request body

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    // Create a new admin
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    res
      .status(201)
      .json({ success: true, message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
