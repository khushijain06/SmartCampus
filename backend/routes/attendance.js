const router = require("express").Router();
const Attendance = require("../models/Attendance");
const auth = require("../middleware/auth");

// Admin marks attendance
router.post("/mark", auth, async (req, res) => {
  const { studentId, date, status } = req.body;
  const attendance = new Attendance({ studentId, date, status });
  await attendance.save();
  res.json({ message: "Attendance marked" });
});

// Student gets their own attendance
router.get("/me", auth, async (req, res) => {
  const attendance = await Attendance.find({ studentId: req.user.id });
  res.json(attendance);
});

module.exports = router;
