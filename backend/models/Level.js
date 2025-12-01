// models/Level.js
const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // array of option strings
  correctIndex: { type: Number, required: true }, // index of correct option
});

const levelSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    levelNumber: { type: Number, required: true, unique: true },
    intro: { type: String, required: true },
    content: { type: String, required: true }, // full content
    // optional longer description for the Learn page
    longDescription: { type: String },
    // example points / takeaways to display as bullets on the Learn page
    examples: [{ type: String }],
    status: {
      type: String,
      enum: ["locked", "unlocked", "completed"],
      default: "locked",
    },
    quizQuestions: [quizQuestionSchema], // NEW: array of quiz questions
  },
  { timestamps: true }
);

module.exports = mongoose.model("Level", levelSchema);
