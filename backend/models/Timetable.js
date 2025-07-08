const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  class: String,
  section: String,
  week: [
    {
      day: String, // e.g., Monday
      periods: [
        {
          subject: String,
          teacher: String,
          time: String // optional: "10:00 - 10:45"
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Timetable", timetableSchema);
