const router = require("express").Router();
const auth = require("../middleware/auth");
const Student = require("../models/student");

// GET /me - fetch logged-in student's profile
router.get("/me", auth, async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });
    res.json(student);
  } catch (err) {
    console.error("GET /me error:", err);
    res.status(500).json({ message: "Server error while fetching profile." });
  }
});

// POST / - create new profile
router.post("/", auth, async (req, res) => {
  try {
    // Check if already exists (to prevent duplicates)
    const existing = await Student.findOne({ userId: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const student = new Student({ ...req.body, userId: req.user.id });
    await student.save();
    res.json(student);
  } catch (err) {
    console.error("POST / error:", err);
    res.status(500).json({ message: "Server error while creating profile." });
  }
});

// PUT / - update existing profile
router.put("/", auth, async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true } // return updated document
    );

    if (!student) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(student);
  } catch (err) {
    console.error("PUT / error:", err);
    res.status(500).json({ message: "Server error while updating profile." });
  }
});

module.exports = router;
