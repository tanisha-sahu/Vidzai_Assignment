// seedLevelsWithQuiz.js
const mongoose = require("mongoose");
const Level = require("./models/Level");

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ai-learning");
    console.log("MongoDB connected for seeding (quiz)");

    await Level.deleteMany({});
    console.log("Old levels removed");

    const levels = [
      {
        title: "Introduction to Artificial Intelligence",
        levelNumber: 1,
        status: "unlocked",
        intro: "Artificial Intelligence is a branch of computer science that enables machines to think and act like humans.",
        content:
          "Artificial Intelligence (AI) refers to computer systems that can perform tasks that normally require human intelligence. These systems use algorithms to process data, make predictions, and act on insights. Common applications include search engines, recommendation systems, virtual assistants and autonomous vehicles.",
        quizQuestions: [
          {
            question: "What is Artificial Intelligence?",
            options: [
              "A programming language",
              "A field that enables machines to perform tasks requiring human intelligence",
              "A database technology",
              "A type of hardware"
            ],
            correctIndex: 1
          },
          {
            question: "Which of these is an example of AI?",
            options: ["Calculator", "Search engine with ranking", "Text editor", "Spreadsheet formula"],
            correctIndex: 1
          },
          {
            question: "AI systems often learn from:",
            options: ["Random guesses", "Data and examples", "Only rules written by humans", "None of the above"],
            correctIndex: 1
          },
          {
            question: "Which application uses AI?",
            options: ["Voice assistants", "Paper notebook", "Manual typewriter", "Abacus"],
            correctIndex: 0
          },
          {
            question: "Goal of AI is to:",
            options: ["Replace electricity", "Perform tasks that require human-like intelligence", "Store files", "Design hardware"],
            correctIndex: 1
          }
        ]
      },
      {
        title: "Basics of Machine Learning",
        levelNumber: 2,
        status: "locked",
        intro: "Machine Learning is a subset of AI where models learn patterns from data.",
        content:
          "Machine Learning (ML) uses algorithms to learn from data and make predictions or decisions. ML includes supervised learning, unsupervised learning, and reinforcement learning. It is applied in spam detection, recommendation engines, and image recognition.",
        quizQuestions: [
          {
            question: "What does machine learning primarily require?",
            options: ["Large data", "Manual input every time", "No data at all", "Only hardware"],
            correctIndex: 0
          },
          {
            question: "Which is a type of ML?",
            options: ["Supervised learning", "Manual programming", "Relational databases", "HTML"],
            correctIndex: 0
          },
          {
            question: "A common ML task is:",
            options: ["Image classification", "Cooking", "Sleeping", "Painting only"],
            correctIndex: 0
          },
          {
            question: "In ML, a 'model' refers to:",
            options: ["A trained algorithm that makes predictions", "A 3D artist", "Database schema", "An image file"],
            correctIndex: 0
          },
          {
            question: "Supervised learning uses:",
            options: ["Labeled data", "No data", "Only images", "Only audio"],
            correctIndex: 0
          }
        ]
      },
      {
        title: "Neural Networks",
        levelNumber: 3,
        status: "locked",
        intro: "Neural Networks are models inspired by the human brain and used for deep learning.",
        content:
          "Neural Networks consist of layers of interconnected nodes (neurons) that process input signals. They are trained using backpropagation and gradient descent to minimise error. They are widely used in image recognition and language tasks.",
        quizQuestions: [
          {
            question: "Neural Networks are inspired by:",
            options: ["The human brain", "A database", "Operating systems", "A spreadsheet"],
            correctIndex: 0
          },
          {
            question: "Neurons in a network are connected by:",
            options: ["Weights", "Cables", "Spreadsheets", "Files"],
            correctIndex: 0
          },
          {
            question: "Training neural networks often uses:",
            options: ["Backpropagation", "Manual file editing", "Non-learning methods", "Only random guesses"],
            correctIndex: 0
          },
          {
            question: "Neural networks are commonly used for:",
            options: ["Image recognition", "Cooking recipes", "Gardening", "Carpentry"],
            correctIndex: 0
          },
          {
            question: "Deep learning uses:",
            options: ["Multiple hidden layers in neural networks", "Single if statements", "Only spreadsheets", "No math"],
            correctIndex: 0
          }
        ]
      },
      {
        title: "Deep Learning",
        levelNumber: 4,
        status: "locked",
        intro: "Deep Learning uses deep (many-layered) neural networks to learn complex patterns.",
        content:
          "Deep Learning involves training neural networks with many layers to automatically learn hierarchical features from data. It's used for advanced image and speech recognition, and natural language processing.",
        quizQuestions: [
          {
            question: "Deep Learning is best described as:",
            options: ["Neural networks with many layers", "Simple math", "Only databases", "Manual rule writing"],
            correctIndex: 0
          },
          {
            question: "Deep learning excels at:",
            options: ["Complex pattern recognition", "Basic arithmetic only", "Typing", "Printing"],
            correctIndex: 0
          },
          {
            question: "A common deep learning task is:",
            options: ["Speech recognition", "Painting walls", "Handwriting letters", "Manual calculations"],
            correctIndex: 0
          },
          {
            question: "Training deep models typically requires:",
            options: ["Large datasets and GPUs", "No data", "Only a pencil", "Only Excel"],
            correctIndex: 0
          },
          {
            question: "Deep learning belongs to:",
            options: ["Machine Learning", "Cooking", "Architecture", "Car repair"],
            correctIndex: 0
          }
        ]
      }
    ];

    await Level.insertMany(levels);
    console.log("Levels with quiz seeded");

    await mongoose.disconnect();
    console.log("Disconnected after seeding");
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
