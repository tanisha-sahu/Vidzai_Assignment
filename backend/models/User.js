// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    totalPoints: { type: Number, default: 0 },

    // store completed levelNumbers, e.g. [1, 2, 3]
    completedLevels: {
      type: [Number],
      default: [],
    },
    // track best score per level: [{ levelNumber: 1, bestScore: 3 }]
    levelScores: {
      type: [
        {
          levelNumber: { type: Number, required: true },
          bestScore: { type: Number, required: true, default: 0 },
        }
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
