const router = require("express").Router();
const Result = require("../models/Result");
const auth = require("../middleware/auth");
const Student = require("../models/student");

// Admin adds marks
router.post("/", auth, async (req, res) => {
  const { studentId, subject, marks, maxMarks, grade } = req.body;
  const result = new Result({ studentId, subject, marks, maxMarks, grade });
  await result.save();
  res.json(result);
});

// Student views own results
router.get("/me", auth, async (req, res) => {
  const student = await Student.findOne({ userId: req.user.id });
  if (!student) return res.status(404).json({ message: "Student not found" });
  const result = await Result.find({ studentId: student._id });
  res.json(result);
});


module.exports = router;
  