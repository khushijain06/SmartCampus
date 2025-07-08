const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  date: { type: Date, required: true },
  status: { type: String, enum: ["present", "absent"], required: true }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
