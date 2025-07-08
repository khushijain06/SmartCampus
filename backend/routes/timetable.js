const router = require("express").Router();
const Timetable = require("../models/Timetable");
const auth = require("../middleware/auth");

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
  const student = req.user;
  const timetable = await Timetable.findOne({ class: student.class, section: student.section });
  res.json(timetable);
});

module.exports = router;
