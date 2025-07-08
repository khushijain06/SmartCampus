const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  subject: String,
  marks: Number,
  maxMarks: Number,
  grade: String
});

module.exports = mongoose.model("Result", resultSchema);
