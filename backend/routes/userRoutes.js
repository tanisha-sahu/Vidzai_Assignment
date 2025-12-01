// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// GET /api/profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

// GET /api/user/progress
router.get("/user/progress", auth, async (req, res) => {
  const { totalPoints, completedLevels } = req.user;
  res.json({
    totalPoints,
    completedLevels
  });
});

module.exports = router;
