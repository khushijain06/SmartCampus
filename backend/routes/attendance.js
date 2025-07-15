const router = require("express").Router();
const Attendance = require("../models/Attendance");
const Student = require("../models/student")
const auth = require("../middleware/auth");

// Admin marks attendance
router.post("/mark", auth, async (req, res) => {
  const { studentId, date, status } = req.body;
  const attendance = new Attendance({ studentId, date, status });
  await attendance.save();
  res.json({ message: "Attendance marked" });
});


router.get("/me", auth, async (req, res) => {
  try {
    const mystudent = await Student.findOne({ userId: req.user.id });
    if (!mystudent) return res.status(404).json({ message: "Student not found" });

    const attendance = await Attendance.find({ studentId: mystudent._id });
    res.json(attendance);
  } catch (err) {
    console.error("Error fetching attendance", err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router
