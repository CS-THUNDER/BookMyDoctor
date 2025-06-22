const express = require("express");
const router = express.Router();
const { auth, roleCheck } = require("../middleware/authMiddleware");
const User = require("../models/user");

// @route   GET api/users/me
// @desc    Get current user data (Protected route - requires valid JWT)
// @access  Private (any authenticated user)
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users/doctors
// @desc    Get all doctors (Protected route - requires admin role)
// @access  Private (Admin only)
router.get("/doctors", [auth, roleCheck(["admin"])], async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
