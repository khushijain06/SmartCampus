const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String,
  syllabusCompletion: Number, // in %
  notes: [String] // Array of PDF URLs
});

module.exports = mongoose.model("Subject", subjectSchema);
