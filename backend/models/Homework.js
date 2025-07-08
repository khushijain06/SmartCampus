const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }, // null if assigned to all
  subject: String,
  description: String,
  dueDate: Date,
  pdfUrl: String,
  status: { type: String, enum: ["pending", "completed"], default: "pending" }
});

module.exports = mongoose.model("Homework", homeworkSchema);
