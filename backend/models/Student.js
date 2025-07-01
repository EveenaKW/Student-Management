const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dep: String,
  class: String,
  attendance: Number,
  marks: {
    physics: Number,
    chemistry: Number,
    maths: Number,
    malayalam: Number,
    english: Number,
    history: Number,
  },
});

module.exports = mongoose.model("Student", studentSchema);
