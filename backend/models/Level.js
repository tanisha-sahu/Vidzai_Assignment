const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], 
  correctIndex: { type: Number, required: true }, 
});

const levelSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    levelNumber: { type: Number, required: true, unique: true },
    intro: { type: String, required: true },
    content: { type: String, required: true },
    longDescription: { type: String },
    examples: [{ type: String }],
    status: {
      type: String,
      enum: ["locked", "unlocked", "completed"],
      default: "locked",
    },
    quizQuestions: [quizQuestionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Level", levelSchema);
