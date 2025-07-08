const router = require("express").Router();
const Subject = require("../models/Subject");
const auth = require("../middleware/auth");

// Admin adds/updates subject info
router.post("/", auth, async (req, res) => {
  const { name, syllabusCompletion, notes } = req.body;
  const subject = new Subject({ name, syllabusCompletion, notes });
  await subject.save();
  res.json(subject);
});

// Student views subject info
router.get("/", auth, async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
});

module.exports = router;
