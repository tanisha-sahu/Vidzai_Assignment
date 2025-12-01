// routes/levels.routes.js
const express = require("express");
const router = express.Router();
const Level = require("../models/Level");
const User = require("../models/User");
const auth = require("../middleware/auth");

// GET /levels  -> list of all levels
router.get("/", async (req, res) => {
  try {
    const levels = await Level.find().sort({ levelNumber: 1 });
    res.json({ levels });
  } catch (err) {
    console.error("Error fetching levels:", err);
    res.status(500).json({ message: "Failed to fetch levels" });
  }
});

// GET /levels/:id -> one level details
router.get("/:id", async (req, res) => {
  try {
    const level = await Level.findById(req.params.id);
    if (!level) {
      return res.status(404).json({ message: "Level not found" });
    }
    res.json({ level });
  } catch (err) {
    console.error("Error fetching level:", err);
    res.status(500).json({ message: "Failed to fetch level details" });
  }
});


// GET /levels/:id/quiz -> return quiz questions (without correctIndex)
router.get("/:id/quiz", async (req, res) => {
  try {
    const level = await Level.findById(req.params.id).lean();
    if (!level) return res.status(404).json({ message: "Level not found" });

    const questions = (level.quizQuestions || []).map((q, i) => ({
      id: q._id || i,
      question: q.question,
      options: q.options,
    }));

    res.json({ quiz: questions, total: questions.length });
  } catch (err) {
    console.error("GET quiz error:", err);
    res.status(500).json({ message: "Failed to fetch quiz" });
  }
});

// POST /levels/:id/quiz/submit -> accept answers, score them, unlock next level if passed
router.post("/:id/quiz/submit", auth, async (req, res) => {
  try {
    const { answers } = req.body; // answers: array of selected indexes (number) for each question
    const level = await Level.findById(req.params.id);
    if (!level) return res.status(404).json({ message: "Level not found" });

    const questions = level.quizQuestions || [];
    const total = questions.length;

    if (!Array.isArray(answers) || answers.length !== total) {
      return res.status(400).json({ message: "Answers array invalid or incomplete" });
    }

    // Score calculation
    let score = 0;
    const correctAnswers = [];

    for (let i = 0; i < total; i++) {
      const q = questions[i];
      const userAns = answers[i];
      const isCorrect = Number(userAns) === Number(q.correctIndex);
      if (isCorrect) score++;
      correctAnswers.push(Number(q.correctIndex));
    }

    // pass threshold: 60% (can change). Here total 5 -> pass if >=3
    const passThreshold = Math.ceil(total * 0.6);
    const passed = score >= passThreshold;

    let pointsAwarded = 0;
    let unlockNextLevel = false;

    // Points per correct answer
    const pointsPerQuestion = 10;

    // Load user to update levelScores and totalPoints
    const user = await User.findById(req.user.id);

    // Find existing best score entry for this level
    let existingEntry = null;
    if (user && Array.isArray(user.levelScores)) {
      existingEntry = user.levelScores.find((e) => e.levelNumber === level.levelNumber);
    }
    const existingBestScore = existingEntry ? existingEntry.bestScore : null;
    const existingBestPoints = existingBestScore !== null ? existingBestScore * pointsPerQuestion : 0;

    // Update best score if this attempt is better
    let newBestScore = existingBestScore === null ? score : Math.max(existingBestScore, score);

    // If user exists, update their levelScores and award delta points only when passing
    if (user) {
      if (existingEntry) {
        if (score > existingEntry.bestScore) {
          existingEntry.bestScore = newBestScore;
        }
      } else {
        // create new entry
        user.levelScores.push({ levelNumber: level.levelNumber, bestScore: newBestScore });
      }

      // If passed, award points based on improvement over previous best
      if (passed) {
        const newBestPoints = newBestScore * pointsPerQuestion;
        const delta = newBestPoints - existingBestPoints;
        if (delta > 0) {
          user.totalPoints = (user.totalPoints || 0) + delta;
          pointsAwarded = delta;
        }

        // ensure completedLevels contains this levelNumber
        if (!user.completedLevels.includes(level.levelNumber)) {
          user.completedLevels.push(level.levelNumber);
        }
      }

      await user.save();
    }

    // If passed: mark level completed and unlock next level
    if (passed) {
      // mark current level as completed
      level.status = "completed";
      await level.save();

      // unlock next level by levelNumber
      const nextLevel = await Level.findOne({ levelNumber: level.levelNumber + 1 });
      if (nextLevel) {
        nextLevel.status = "unlocked";
        await nextLevel.save();
        unlockNextLevel = true;
      }
    }

    // Determine user's current best for this level to return
    const returnedBestScore = user
      ? (user.levelScores.find((e) => e.levelNumber === level.levelNumber) || {}).bestScore || 0
      : existingBestScore || 0;

    res.json({
      score,
      total,
      passed,
      correctAnswers, // useful to show correct option later
      pointsAwarded,
      unlockNextLevel,
      bestScore: returnedBestScore,
      bestPoints: returnedBestScore * pointsPerQuestion,
      message: passed ? "Passed! Next level unlocked." : "Quiz submitted. Try again to unlock next level.",
    });
  } catch (err) {
    console.error("POST quiz submit error:", err);
    res.status(500).json({ message: "Failed to submit quiz" });
  }
});

module.exports = router;
