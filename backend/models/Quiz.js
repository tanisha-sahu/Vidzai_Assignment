// models/Quiz.js
const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true }
});

const quizSchema = new mongoose.Schema(
  {
    levelNumber: { type: Number, required: true, unique: true },
    questions: [quizQuestionSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
