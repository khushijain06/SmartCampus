const router = require("express").Router();
const Student = require('../models/student')
const auth = require("../middleware/auth");
// GET all students (admin only)
router.get("/", auth, async (req, res) => {
  const students = await Student.find({}, "_id name rollNumber class section gender");
  res.json(students);
});
module.exports = router;