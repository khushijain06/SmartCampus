const router = require("express").Router();
const Timetable = require("../models/Timetable");
const Student = require('../models/student')
const auth = require("../middleware/auth");
const { useReducer } = require("react");

// Admin updates timetable
router.post("/update", auth, async (req, res) => {
  const { class: className, section, week } = req.body;
  const timetable = await Timetable.findOneAndUpdate(
    { class: className, section },
    { week },
    { upsert: true, new: true }
  );
  res.json(timetable);
});

// Student gets timetable by class/section
router.get("/", auth, async (req, res) => {
  const user = req.user.id;
  const student = await Student.findOne({userId:user})
  const timetable = await Timetable.findOne({ class: student.class });
  res.json(timetable);
});

module.exports = router;
