// routes/quizRoutes.js
const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const User = require("../models/User");
const Level = require("../models/Level");
const auth = require("../middleware/auth");

// Seed default quizzes if not exist
async function ensureSeedQuizzes() {
  const count = await Quiz.countDocuments();
  if (count > 0) return;

  await Quiz.insertMany([
    {
      levelNumber: 1,
      questions: [
        {
          question: "What does AI stand for?",
          options: [
            "Artificial Internet",
            "Artificial Intelligence",
            "Automated Integration",
            "Automatic Interface"
          ],
          correctIndex: 1
        },
        {
          question: "Which of these is a common use of AI?",
          options: [
            "Weather forecasting",
            "Online recommendations",
            "Both A and B",
            "None"
          ],
          correctIndex: 2
        },
        {
          question: "Why do beginners quit AI often?",
          options: [
            "Too much theory, hard to follow",
            "No jobs in AI",
            "No online material",
            "AI is only for experts"
          ],
          correctIndex: 0
        }
      ]
    },
    {
      levelNumber: 2,
      questions: [
        {
          question: "Machine Learning is a subset of:",
          options: ["Robotics", "AI", "Databases", "Networking"],
          correctIndex: 1
        },
        {
          question: "What does a ML model learn from?",
          options: ["Code comments", "Data", "Design docs", "Random numbers"],
          correctIndex: 1
        }
      ]
    }
  ]);

  console.log("Seeded default quizzes");
}

// GET /api/levels/:levelNumber/quiz
router.get("/levels/:levelNumber/quiz", auth, async (req, res) => {
  try {
    await ensureSeedQuizzes();

    const levelNumber = parseInt(req.params.levelNumber, 10);
    const quiz = await Quiz.findOne({ levelNumber });

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Don't send correctIndex to frontend
    const safeQuestions = quiz.questions.map((q) => ({
      id: q._id,
      question: q.question,
      options: q.options
    }));

    res.json({ levelNumber, questions: safeQuestions });
  } catch (err) {
    console.error("Get quiz error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/quiz/submit
// { levelNumber, answers: [index, index, ...] }
router.post("/quiz/submit", auth, async (req, res) => {
  try {
    const { levelNumber, answers } = req.body;
    const quiz = await Quiz.findOne({ levelNumber });

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) score++;
    });

    const totalQuestions = quiz.questions.length;
    const percentage = (score / totalQuestions) * 100;
    const passed = percentage >= 60; // 60% passing

    let pointsAwarded = 0;
    let unlockNextLevel = false;

    if (passed) {
      pointsAwarded = totalQuestions * 10;

      const user = await User.findById(req.user._id);
      if (!user.completedLevels.includes(levelNumber)) {
        user.completedLevels.push(levelNumber);
        user.totalPoints += pointsAwarded;
        await user.save();
      }

      const nextLevelExists = await Level.findOne({
        levelNumber: levelNumber + 1
      });
      unlockNextLevel = !!nextLevelExists;
    }

    res.json({
      passed,
      score,
      totalQuestions,
      percentage,
      pointsAwarded,
      unlockNextLevel
    });
  } catch (err) {
    console.error("Submit quiz error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
