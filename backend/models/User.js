const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    totalPoints: { type: Number, default: 0 },
    
    completedLevels: {
      type: [Number],
      default: [],
    },

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
