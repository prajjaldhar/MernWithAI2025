const Quiz = require("../Model/quizModel");

// 🎯 Add Quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, questions, courseName } = req.body;

    if (!title || !questions || !courseName) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newQuiz = new Quiz({
      title,
      questions,
      courseName,
    });

    await newQuiz.save();

    res.status(201).json({ msg: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// 📥 Get All Quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("courseName", "firstName email");

    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// 🔍 Get Quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId).populate(
      "courseName",
      "firstName email"
    );

    if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

    res.status(200).json({ quiz });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// 🔁 Update Quiz
exports.updateQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const updates = req.body;

    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updates, {
      new: true,
    });

    if (!updatedQuiz) return res.status(404).json({ msg: "Quiz not found" });

    res.status(200).json({ msg: "Quiz updated", quiz: updatedQuiz });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// 🗑 Delete Quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;

    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deletedQuiz) return res.status(404).json({ msg: "Quiz not found" });

    res.status(200).json({ msg: "Quiz deleted", deletedQuiz });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
