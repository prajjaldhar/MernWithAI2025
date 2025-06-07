const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  courseName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quiz", QuizSchema);
