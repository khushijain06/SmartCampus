const router = require("express").Router();
const Homework = require("../models/Homework");
const Student = require("../models/student")
const auth = require("../middleware/auth");

// Admin adds homework
router.post("/assign", auth, async (req, res) => {
  const { subject, description, dueDate, pdfUrl, studentId } = req.body;
  const homework = new Homework({ subject, description, dueDate, pdfUrl, studentId });
  await homework.save();
  res.json({ message: "Homework assigned" });
});

// Student uploads/marks as completed
router.put("/:id/complete", auth, async (req, res) => {
  const homework = await Homework.findByIdAndUpdate(
    req.params.id,
    { status: "completed" },
    { new: true }
  );
  res.json(homework);
});

// Student views own homework
router.get("/me", auth, async (req, res) => {
  const student = await Student.findOne({
    userId: req.user.id
  })
  const homeworks = await Homework.find({
    $or: [{ studentId:student._id }, { studentId: null }]
  });
  res.json(homeworks);
});

module.exports = router;
