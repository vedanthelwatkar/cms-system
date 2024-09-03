const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

router.post("/clients", async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json({ success: true, data: client });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/clients", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json({ success: true, data: clients });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/clients/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!client)
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    res.status(200).json({ success: true, data: client });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete("/clients/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client)
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    res.status(200).json({ success: true, message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
