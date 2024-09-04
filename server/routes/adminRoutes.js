const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const User = require("../models/User");
const Client = require("../models/Client");
const MetricsController = require("../controllers/metricsController");

router.get("/metrics/daily", MetricsController.getDailyMetrics);

router.get("/metrics/weekly", MetricsController.getWeeklyMetrics);

router.get("/metrics/monthly", MetricsController.getMonthlyMetrics);

router.get("/admin/metrics", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalClients = await Client.countDocuments();

    const successfulOperations = totalUsers + totalClients;
    const totalOperations = successfulOperations;

    const successRate = (successfulOperations / totalOperations) * 100;
    const errorRate = 0;

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalClients,
        successfulOperations,
        successRate,
        errorRate,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

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

router.post("/admin/logout", (req, res) => {
  res.status(200).json({ success: true, message: "Logout successful" });
});

router.post("/admin/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

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
