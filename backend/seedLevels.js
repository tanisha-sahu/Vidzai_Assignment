// seedLevels.js
require("dotenv").config();
const mongoose = require("mongoose");
const Level = require("./models/Level");
const Quiz = require("./models/Quiz");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai-learning";

const seedLevels = [
  // LEVEL 1
  {
    levelNumber: 1,
    title: "What is Artificial Intelligence?",
    intro:
      "Artificial Intelligence (AI) is about teaching computers to do smart things that usually require human thinking. You already use AI every day, even if you don’t notice it. In this level, we’ll keep things simple and focus on everyday examples instead of technical details. By the end, you’ll have a clear, friendly idea of what AI actually is and what it is not.",
    content:
      "When many people hear the word “Artificial Intelligence”, they immediately imagine robots, science fiction movies, and distant futuristic cities. In reality, AI is already around us in very normal tools that you use daily. At its core, AI is a collection of techniques that help computers perform tasks that normally need some kind of human judgment. This includes recognizing objects in photos, understanding spoken language, recommending products, and highlighting important information.\n\nFor example, when you open a music or video app and it recommends songs or shows that match your taste, AI is working quietly in the background. It has looked at what you’ve watched or listened to before, compared your behavior with patterns from millions of other users, and then guessed what you might enjoy next. The same idea appears in shopping websites that show “you may also like” items, in news feeds that prioritize certain posts, and in search engines that predict what you are trying to type.\n\nAI also appears in tools like maps and navigation. When a map app suggests the best route, it is using data from many drivers, historical traffic, and live conditions to estimate how long different paths will take. The more high-quality data it receives, the better it can adjust to real-time changes such as traffic jams or road closures. Another common example is a camera app that automatically focuses on faces or improves lighting in dark scenes. These features are powered by AI models that were trained on countless images.\n\nIt’s important to remember that today’s most common AI systems are very good at narrow tasks. A model designed to recognize cats in pictures may not understand anything about music or language. That is why we call much of today’s AI “narrow AI”. The idea of one single AI that can do everything a human can do is called “general AI”, and it is still a long-term research topic rather than something used in normal products.\n\nIn practice, AI works best when it is used as a tool that supports people instead of replacing them. It can automate repetitive tasks, highlight patterns that humans might miss, and offer quick suggestions. Humans are still responsible for deciding when to trust those suggestions, how to interpret them, and what is fair or safe in each situation. When you think of AI this way, it becomes less mysterious and more like a helpful assistant that lives inside your apps.",
    longDescription:
      "This topic aims to remove the fear and confusion around AI by connecting it to apps and services you already use. Instead of starting with complicated jargon, we anchor AI in simple stories and familiar experiences. When you recognize AI in your daily life, you can better understand its strengths and its limits. You will also notice situations where AI is not appropriate, such as sensitive decisions that deeply affect people’s lives or require human empathy.\n\nAs you move through later levels, you will see how data, learning methods, and model design all connect back to this simple idea: AI is a set of tools that use patterns in data to make helpful predictions. Keeping this human-centered view in mind will make everything else easier to follow and will help you stay grounded when you hear big, dramatic claims about AI.",
    examples: [
      "Song or video recommendations on streaming apps",
      "Search engines suggesting queries as you type",
      "Camera apps automatically focusing on faces"
    ],
    status: "unlocked",
    quizQuestions: [
      {
        question: "Which of these is a realistic example of AI today?",
        options: [
          "A robot that feels emotions exactly like humans",
          "A music app that recommends songs you might like",
          "A paper book sitting on a shelf",
          "A simple mechanical clock"
        ],
        correctIndex: 1
      },
      {
        question: "AI is best described as:",
        options: [
          "Any program that runs on a computer",
          "Technology that helps computers perform tasks requiring human-like judgment",
          "Only robots that walk and talk",
          "A type of hardware chip only"
        ],
        correctIndex: 1
      },
      {
        question: "Most AI systems used today are:",
        options: [
          "General AI that can do every human task",
          "Narrow AI focused on specific tasks",
          "Completely random and uncontrolled",
          "Only used in secret labs"
        ],
        correctIndex: 1
      },
      {
        question: "Which daily activity likely uses AI?",
        options: [
          "Writing with a pen on paper",
          "Using a calculator for 2 + 2",
          "Getting movie suggestions on a streaming platform",
          "Boiling water on a stove"
        ],
        correctIndex: 2
      },
      {
        question: "AI works best when it is viewed as:",
        options: [
          "A perfect replacement for all human work",
          "A supportive tool that helps humans",
          "A way to avoid checking information",
          "A secret feature that no one should understand"
        ],
        correctIndex: 1
      }
    ]
  },

  // LEVEL 2
  {
    levelNumber: 2,
    title: "How Machines Learn from Data",
    intro:
      "Machine learning is a way for computers to learn from examples instead of fixed rules. Instead of programming every tiny step, we show the computer many inputs and the correct outputs. Over time, it learns a pattern and can make its own predictions. This level explains that idea in simple language, without formulas or code.",
    content:
      "Think about how you learned to recognize different fruits as a child. No one gave you a long written rulebook. Instead, you saw many apples, bananas, and oranges. You heard people say their names and you slowly learned which was which. Machine learning works in a similar way. Instead of programmers writing exact conditions for every possible case, we give the computer many examples and let it adjust its internal settings to match those examples.\n\nIn a basic machine learning setup, we have data that includes inputs and known outputs. For instance, an input could be a picture of a cat and the output label would be “cat”. Another picture might show a dog with the label “dog”. When the algorithm trains, it looks at these pairs and tries to find a mapping from input to label. In the beginning, it guesses badly, but with each pass over the data it corrects itself a little and improves its predictions.\n\nOne of the key benefits of machine learning is that it can handle complex patterns that would be very hard to describe by hand. Imagine trying to write a perfect set of rules to recognize a cat based on pixel values. It would be extremely complicated and fragile. A learning algorithm, however, can discover patterns automatically by analyzing large numbers of examples. The same idea applies to recognizing spam emails, predicting which customer might leave a service, or estimating a house price from its features.\n\nHowever, machine learning does not mean magic. The model can only learn from what it sees in the training data. If the examples are narrow or biased, the model will inherit those limitations. If we only show photos of cats from one angle or one color, the model might struggle when it sees another breed or different lighting. This is why data quality, variation, and balance matter just as much as the algorithm itself.\n\nIn practice, using machine learning involves a few key steps: collecting data, cleaning and organizing that data, choosing a suitable model, training it on the data, and then evaluating how well it works on new examples. Details can become technical, but the underlying story remains simple: we learn from examples, and so do machines. Once you remember this parallel, many AI concepts become more natural and less intimidating.",
    longDescription:
      "This topic builds your mental model of machines as “students” that learn from examples. Instead of trying to memorize technical terms, focus on this simple idea: the computer adjusts its inner parameters to reduce mistakes on known data, and then we test whether that learning generalizes to new situations. You can imagine it as continuous practice where feedback slowly improves performance.\n\nIn real projects, teams spend a lot of time gathering the right kind of examples and checking results carefully. Learning to ask, “What examples did this model see?” often matters more than remembering the exact name of an algorithm. If you keep thinking in terms of examples and feedback, you will be able to discuss AI confidently even without writing any code.",
    examples: [
      "A spam filter learning from emails marked as spam or not spam",
      "An app predicting house prices from past sales data",
      "A model learning to recognize handwritten digits"
    ],
    status: "locked",
    quizQuestions: [
      {
        question: "Machine learning mainly means:",
        options: [
          "Writing fixed rules by hand",
          "Letting computers learn patterns from examples",
          "Changing hardware chips",
          "Using AI without any data"
        ],
        correctIndex: 1
      },
      {
        question: "In a typical learning setup, training data includes:",
        options: [
          "Only random text",
          "Inputs and their correct outputs",
          "Just error messages",
          "Only hardware specifications"
        ],
        correctIndex: 1
      },
      {
        question: "Machine learning struggles when:",
        options: [
          "Training data is limited or biased",
          "Data is clear and varied",
          "We carefully test results",
          "We use enough useful examples"
        ],
        correctIndex: 0
      },
      {
        question: "Which is a common use of machine learning?",
        options: [
          "Predicting house prices from past sales",
          "Boiling water faster",
          "Keeping paper documents safe",
          "Replacing all human decisions instantly"
        ],
        correctIndex: 0
      },
      {
        question: "A helpful way to think about machine learning is:",
        options: [
          "As a student learning from practice examples",
          "As a magic box with no limits",
          "As a simple calculator only",
          "As a way to avoid checking results"
        ],
        correctIndex: 0
      }
    ]
  },

  // LEVEL 3
  {
    levelNumber: 3,
    title: "Data and Datasets for Artificial Intelligence",
    intro:
      "Data is the fuel that powers AI and machine learning systems. Every prediction, suggestion, or recognition is based on examples the system has seen before. In this level, we look at what makes data useful, understandable, and fair. You do not need statistics; just everyday common sense and curiosity.",
    content:
      "Imagine trying to learn a new language only from one short sentence. You would miss grammar, vocabulary, and context. AI systems have a similar problem when they only see a small or narrow set of examples. The word “data” in AI simply means the information we use to teach or evaluate a model. This might include text messages, images, audio clips, sensor readings, or simple numbers in a table.\n\nA group of related data used for training or testing is often called a dataset. For example, a dataset for recognizing handwritten digits might contain thousands of small images, each paired with the correct number. A customer feedback dataset might store thousands of comments, star ratings, and timestamps. The key idea is that a good dataset should cover the variety of real situations the model will face later so that it does not get surprised by new examples.\n\nData quality is more than just having many rows. We care about accuracy (are the labels correct?), coverage (do we see enough different types of examples?), and balance (are important groups represented fairly?). If a face recognition dataset only contains photos of people from one region or age group, the model may perform poorly or unfairly on others. This is how bias in data leads to biased AI behavior in real products.\n\nSimple cleaning steps already help a lot: removing obvious errors or duplicates, making labels consistent, and filling in missing values in thoughtful ways. Even if you are not a data scientist, you can reason about whether a dataset seems reasonable. Ask questions like: “Are we missing an important type of user?”, “Is the labeling too subjective?”, or “Are we reusing the same examples too often?”. These questions are powerful quality checks.\n\nDatasets are also split into different roles. A training set is used to teach the model. A validation set helps tune settings and choose between models. A test set is kept separate until the end and is used to estimate how well the model will perform on new data. This separation helps prevent us from fooling ourselves into thinking the model is better than it actually is.",
    longDescription:
      "This topic encourages you to think critically about data long before building any model. Instead of asking only “Which algorithm should I use?”, it is often more important to ask “What data do I have and what is missing?”. Even in non-technical roles, you can improve AI projects by questioning the sources of data and the way examples are collected.\n\nIf you remember that data is simply a collection of examples, you can evaluate it using your everyday life experience: does this set of examples match reality, or does it leave out important groups and situations? Developing this habit helps you spot risk, unfairness, and practical limits in AI systems before they cause harm.",
    examples: [
      "A dataset of labeled product reviews (positive/negative)",
      "A collection of recorded sensor measurements over time",
      "A large set of images of handwritten digits"
    ],
    status: "locked",
    quizQuestions: [
      {
        question: "In AI, data mainly refers to:",
        options: [
          "Examples used for learning and testing",
          "Only hardware specifications",
          "Company logos",
          "Random numbers with no meaning"
        ],
        correctIndex: 0
      },
      {
        question: "A dataset is:",
        options: [
          "A collection of related data examples",
          "A single number",
          "Only one file name",
          "Always a printed report"
        ],
        correctIndex: 0
      },
      {
        question: "Bias in data happens when:",
        options: [
          "Important groups or situations are missing or under-represented",
          "We include many diverse examples",
          "Labels are carefully checked",
          "We have clear documentation"
        ],
        correctIndex: 0
      },
      {
        question: "A test set should be:",
        options: [
          "Kept separate to check real-world performance",
          "Mixed into training data",
          "Ignored completely",
          "Only one example"
        ],
        correctIndex: 0
      },
      {
        question: "A simple way to judge dataset quality is:",
        options: [
          "Ask if it reflects real situations and includes key groups",
          "Only count how many rows it has",
          "Ignore labels entirely",
          "Use it without any questions"
        ],
        correctIndex: 0
      }
    ]
  },

  // LEVEL 4
  {
    levelNumber: 4,
    title: "Real-World Uses and Limits of AI",
    intro:
      "AI can be very powerful in the real world, but it also has clear limits. It is good at pattern recognition and prediction, but it does not truly understand context like a human. In this level, we look at real examples and gently highlight where AI can help and where human judgment is still essential.",
    content:
      "By now, you have seen that AI and machine learning are about using data and patterns to make helpful predictions. In real products, this shows up in many places. Customer support chatbots can answer common questions quickly, freeing human agents to handle more complex cases. Recommendation systems can surface interesting content that you might not have found on your own. Language models can draft emails, emails summaries, or explanations, saving time and mental effort.\n\nAI is also used in fields like healthcare, logistics, and finance. For instance, models can help doctors notice patterns in medical images that may need closer attention, such as small anomalies that are easy to miss. In logistics, AI can help optimize delivery routes or balance inventory between warehouses so that items are delivered faster and stock levels remain healthy. In finance, AI models can flag unusual transactions that might be fraudulent before they cause serious damage.\n\nHowever, it is essential to understand the limits of these systems. AI does not “understand” in the human sense. It does not have goals, emotions, or real-world experience. It only works with patterns in the data it has seen. When a situation falls far outside those patterns, the model can behave unpredictably or make poor recommendations. This is why critical decisions, such as medical diagnoses or legal judgments, should always include human oversight and review.\n\nAnother limitation is that AI can inherit and even amplify bias from its training data. If past decisions were unfair, a model trained on those decisions may continue that unfairness at scale. If we are not careful, AI systems can repeat old mistakes faster instead of fixing them. As users and creators of AI systems, we must remember to question outputs, test for unwanted patterns, and design processes where humans can intervene and correct mistakes.\n\nA healthy way to view AI is as a strong assistant, not as a replacement for thoughtful human work. It can handle repetitive tasks, find patterns in large datasets, and provide fast suggestions. Humans remain responsible for deciding when to trust those suggestions, for understanding context, and for caring about the impact on people. This partnership model—AI plus human judgment—is where the most reliable and ethical systems usually emerge.",
    longDescription:
      "This topic encourages you to think practically about where AI fits in your own life and work. Instead of assuming AI is either magical or useless, it is more accurate to see it as a tool specialized in certain kinds of pattern-based tasks. When you know its strengths and limits, you can choose use cases where it adds real value and avoid placing it in roles where mistakes would be too risky or too harmful.\n\nAs you experiment with AI tools, build a habit of checking results and asking simple questions: “Does this make sense?”, “Could the data behind this be biased?”, and “Should a human double-check this decision?”. These questions turn you into an active, responsible user of AI rather than a passive consumer of whatever the model outputs.",
    examples: [
      "Chatbots handling common customer questions",
      "AI helping doctors notice patterns in medical images",
      "Systems that flag potentially fraudulent transactions"
    ],
    status: "locked",
    quizQuestions: [
      {
        question: "AI is especially strong at:",
        options: [
          "Understanding deep human emotions",
          "Pattern recognition and prediction",
          "Making perfect moral decisions",
          "Replacing all human thinking"
        ],
        correctIndex: 1
      },
      {
        question: "Critical decisions such as medical or legal ones should:",
        options: [
          "Be left only to AI",
          "Be made with human oversight and review",
          "Ignore any AI assistance",
          "Depend on random choices"
        ],
        correctIndex: 1
      },
      {
        question: "A key risk of AI in real-world use is:",
        options: [
          "Inheriting bias from training data",
          "Always being too slow",
          "Never learning any patterns",
          "Producing only perfect answers"
        ],
        correctIndex: 0
      },
      {
        question: "A good mental model of AI in work is:",
        options: [
          "A powerful assistant that needs human guidance",
          "A complete replacement for all workers",
          "A toy that should never be used",
          "A system that never makes mistakes"
        ],
        correctIndex: 0
      },
      {
        question: "Responsible AI use includes:",
        options: [
          "Checking outputs and questioning patterns",
          "Trusting all results blindly",
          "Ignoring data sources",
          "Avoiding human review"
        ],
        correctIndex: 0
      }
    ]
  },

  // LEVEL 5
  {
    levelNumber: 5,
    title: "Neural Networks in Simple Terms",
    intro:
      "Neural networks are one of the most popular model types used in modern AI. They sound complicated, but the core idea can be understood with simple metaphors. In this level, we explain neural networks as layers of small decision-makers that work together. No math or code is required to follow along.",
    content:
      "Neural networks are inspired loosely by the structure of the human brain, but they are much simpler and more mechanical. You can think of a neural network as a chain of layers. Each layer contains many small units, often called neurons, which perform tiny calculations. These calculations take the input they receive, apply a weight, add them up, pass them through a function, and send the result onward. By stacking many layers, the network can learn complex relationships between inputs and outputs.\n\nA helpful way to imagine this is to think of a network as a series of filters. The first layer in an image model might look for very simple patterns such as edges or small color changes. The next layer might combine those edges into shapes such as corners or simple textures. Later layers can combine shapes into objects, like faces or cars. Each layer doesn’t know the whole picture; it just processes its local piece and passes information forward.\n\nDuring training, the neural network adjusts the strengths of the connections between neurons, often called weights. When it gets a prediction wrong, it uses an algorithm to nudge these weights in directions that should reduce the error next time. This process repeats many times across thousands or millions of examples. Over time, the network discovers internal patterns that allow it to make good predictions on new data.\n\nNeural networks are especially powerful for tasks involving images, sound, and natural language. Convolutional neural networks, a special type, work very well on pictures. Recurrent and transformer-based networks power many language models and translation systems. While the architecture details can get advanced, the high-level story stays the same: lots of small units combine their simple decisions to capture very rich patterns in the data.\n\nHowever, neural networks also have downsides. They often require a lot of data and computing power. They can be hard to interpret, meaning it is not always obvious why a network made a particular decision. This lack of transparency can be a problem in high-stakes areas such as healthcare or criminal justice, where explanations matter. That is why responsible use, careful testing, and sometimes simpler models are still valuable.",
    longDescription:
      "This topic gives you an intuitive picture of neural networks so that terms like “layers”, “neurons” and “weights” feel less scary. You can remember them as many tiny calculators that are connected in a layered structure. Each calculator on its own is simple, but together they can represent surprisingly complex functions.\n\nYou do not need to remember the math behind training algorithms to understand the impact of neural networks. Focus instead on what they are good at—recognizing patterns in rich data such as images and text—and where they might struggle, such as providing clear explanations or working with very little data. This mindset helps you choose appropriately when you see neural networks mentioned in tools or products.",
    examples: [
      "Image classifiers that recognize objects in photos",
      "Speech recognition systems that turn audio into text",
      "Language models that complete sentences or answer questions"
    ],
    status: "locked",
    quizQuestions: [
      {
        question: "A neural network is best described as:",
        options: [
          "A single rule that never changes",
          "Many small units arranged in layers that process data",
          "A physical human brain copy",
          "A device that only stores files"
        ],
        correctIndex: 1
      },
      {
        question: "Neurons in a neural network:",
        options: [
          "Perform tiny calculations and pass results forward",
          "Make emotional decisions",
          "Store user passwords",
          "Control computer hardware directly"
        ],
        correctIndex: 0
      },
      {
        question: "Neural networks are especially strong for:",
        options: [
          "Static printed text only",
          "Images, sound and natural language tasks",
          "Boiling water efficiently",
          "Keeping paper archives safe"
        ],
        correctIndex: 1
      },
      {
        question: "One downside of neural networks is that:",
        options: [
          "They are always perfectly transparent",
          "They can be hard to interpret and require lots of data",
          "They never need training data",
          "They cannot recognize patterns at all"
        ],
        correctIndex: 1
      },
      {
        question: "Training a neural network mainly involves:",
        options: [
          "Adjusting connection weights to reduce errors",
          "Only changing the user interface",
          "Deleting all data each time",
          "Turning off all layers"
        ],
        correctIndex: 0
      }
    ]
  },

  // LEVEL 6
  {
    levelNumber: 6,
    title: "Using AI Tools in Everyday Work",
    intro:
      "Modern AI tools are becoming part of daily workflows for students, professionals and creators. They can draft text, summarize information, suggest ideas and automate small tasks. In this level, we explore practical ways to use AI tools effectively, while staying responsible and in control.",
    content:
      "In recent years, AI tools have moved from research labs into normal apps and websites. You may already have access to a writing assistant, a code helper, an image generator or a smart search tool. These systems can save time by handling routine tasks: drafting emails, suggesting meeting notes, summarizing long articles, or generating simple designs. When used thoughtfully, they act like a helpful collaborator that is always available.\n\nOne of the most useful patterns is using AI for first drafts. Instead of staring at a blank page, you can ask a tool to generate a rough outline, a short explanation, or a list of ideas. You then edit, organize and polish the result. This keeps you in charge of quality and tone while removing some of the initial friction. A similar pattern works for brainstorming: you can request multiple options, compare them, and keep only what fits your needs.\n\nAI tools also help with explanation and learning. You can ask for a concept to be explained in simpler language, or with analogies and examples that match your level. You can request summaries of long documents to get a quick overview before reading the details. In some cases, tools can generate practice questions or checklists that support revision and planning.\n\nHowever, using AI tools effectively requires awareness of their limits. These systems can make confident mistakes, sometimes called hallucinations, where they produce information that sounds right but is incorrect or outdated. They do not truly understand the world; they generate answers based on patterns in their training data and your prompt. That means you must verify important facts, especially in areas like health, law, finance or exams.\n\nA good personal rule is to treat AI tools as assistants, not authorities. Let them help you speed up mechanical tasks, generate ideas, and rephrase or structure content. But keep your own judgment in the loop. Ask yourself: “Does this output make sense for my context?”, “Is this information trustworthy?”, and “Should I double-check this with a reliable source?”. With that mindset, AI becomes a powerful helper instead of a risky shortcut.",
    longDescription:
      "This topic focuses on how you can safely bring AI tools into your daily routine. The goal is not to replace your thinking, but to support it. When you combine human judgment with AI’s speed, you can work more comfortably and creatively. The key is to stay curious, verify important claims, and never hand over full control of serious decisions to an automated system.\n\nBy practicing this kind of collaboration early, you build skills that will remain useful as AI tools continue to improve. You will be able to adapt more easily, choose tools wisely, and help others understand how to use AI responsibly in schools, offices and personal projects.",
    examples: [
      "Using a writing assistant to draft emails then editing them yourself",
      "Asking an AI tool to summarize long articles before you read fully",
      "Brainstorming ideas or outlines with an AI and then refining them"
    ],
    status: "locked",
    quizQuestions: [
      {
        question: "A practical way to use AI tools is to:",
        options: [
          "Let them fully replace your thinking",
          "Use them to generate drafts or ideas you then edit",
          "Trust everything they say without checking",
          "Avoid reading any content yourself"
        ],
        correctIndex: 1
      },
      {
        question: "AI tools sometimes produce confident but incorrect answers. This means you should:",
        options: [
          "Assume all outputs are perfect",
          "Never use AI again",
          "Verify important facts with reliable sources",
          "Only use AI for medical diagnosis"
        ],
        correctIndex: 2
      },
      {
        question: "A healthy way to view AI tools is as:",
        options: [
          "Assistants that help with tasks but need human judgment",
          "Final authorities on all topics",
          "Systems that always know the truth",
          "Replacements for all professionals"
        ],
        correctIndex: 0
      },
      {
        question: "Which of these is a good use of AI?",
        options: [
          "Drafting a message and then checking tone and details yourself",
          "Submitting AI-generated text without reading it",
          "Sharing private passwords with a chatbot",
          "Using AI to cheat in exams"
        ],
        correctIndex: 0
      },
      {
        question: "To use AI tools responsibly, you should:",
        options: [
          "Turn off your own critical thinking",
          "Check outputs, consider context and keep humans in control",
          "Hide how you used AI in every case",
          "Let AI decide what is ethical"
        ],
        correctIndex: 1
      }
    ]
  }
];

async function seed() {
  try {
    console.log("Connecting to", MONGO_URI);
    await mongoose.connect(MONGO_URI);

    console.log("Clearing existing Level and Quiz data...");
    await Level.deleteMany({});
    await Quiz.deleteMany({});

    console.log("Inserting fresh levels...");
    const insertedLevels = await Level.insertMany(seedLevels);
    console.log(`Inserted ${insertedLevels.length} levels.`);

    console.log("Creating Quiz documents from levels...");
    const quizzes = seedLevels.map((lvl) => ({
      levelNumber: lvl.levelNumber,
      questions: (lvl.quizQuestions || []).map((q) => ({
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex
      }))
    }));

    const insertedQuizzes = await Quiz.insertMany(quizzes);
    console.log(`Inserted ${insertedQuizzes.length} quizzes.`);

    console.log("Seeding finished. Disconnecting...");
    await mongoose.disconnect();
    console.log("Done.");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
