import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";

const Quiz = ({ questions, forceSubmit, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [markedForReview, setMarkedForReview] = useState(new Set());

  // Update answer for a question
  const handleAnswerChange = (index, answer) => {
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  // Toggle review mark for a question
  const toggleReviewMark = (index) => {
    setMarkedForReview((prev) => {
      const updatedSet = new Set(prev);
      if (updatedSet.has(index)) updatedSet.delete(index);
      else updatedSet.add(index);
      return updatedSet;
    });
  };

  // Submit quiz and calculate score
  const submitQuiz = () => {
    setSubmitted(true);
    setShowSubmitConfirm(false);

    if (onSubmit) {
      const score = questions.reduce(
        (total, question, idx) =>
          answers[idx] === question.correctAnswer ? total + 1 : total,
        0
      );
      onSubmit({ answers, score });
    }
  };

  // Auto-submit when forceSubmit prop changes
  useEffect(() => {
    if (forceSubmit && !submitted) {
      submitQuiz();
    }
  }, [forceSubmit, submitted]);

  // Calculate score for display
  const score = questions.reduce(
    (total, question, idx) =>
      answers[idx] === question.correctAnswer ? total + 1 : total,
    0
  );

  const allAnswered = questions.length === Object.keys(answers).length;

  return (
    <div className="max-w-6xl mx-auto text-white relative flex flex-col md:flex-row gap-6 p-6">
      {/* Sidebar: Question Tracker */}
      <aside
        className="bg-gray-900 rounded-xl p-4 overflow-y-auto max-h-64 md:max-h-[700px] flex md:flex-col items-center md:items-start justify-center md:justify-start gap-4 md:gap-6 w-full md:w-72"
        style={{ minWidth: "112px" }}
      >
        <h2 className="text-center font-semibold mb-2 md:mb-6 text-yellow-400 text-lg w-full">
          Tracker
        </h2>

        <div className="grid grid-cols-8 md:grid-cols-5 grid-rows-2 md:grid-rows-4 gap-2 md:gap-4 w-full">
          {questions.map((_, idx) => {
            const answered = answers.hasOwnProperty(idx);
            const isCurrent = idx === currentQuestion;
            const isMarked = markedForReview.has(idx);

            let bgColor = "bg-gray-600";
            if (isCurrent) bgColor = "bg-purple-700";
            else if (isMarked) bgColor = "bg-purple-500";
            else if (answered) bgColor = "bg-green-600";

            return (
              <div key={idx} className="relative flex flex-col items-center">
                <button
                  onClick={() => setCurrentQuestion(idx)}
                  title={`Question ${idx + 1} ${
                    answered ? "(Answered)" : "(Unanswered)"
                  }${isMarked ? " - Marked to Review" : ""}`}
                  className={`${bgColor} text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:brightness-125 transition`}
                  aria-current={isCurrent}
                >
                  {idx + 1}
                </button>

                {/* Review mark toggle */}
                <button
                  onClick={() => toggleReviewMark(idx)}
                  title={isMarked ? "Remove Review Mark" : "Mark for Review"}
                  className={`mt-1 w-4 h-4 rounded-full border-2 border-purple-400 transition 
                    ${isMarked ? "bg-purple-400" : "bg-transparent"} 
                    hover:bg-purple-600`}
                  aria-pressed={isMarked}
                  aria-label={
                    isMarked
                      ? "Unmark question for review"
                      : "Mark question for review"
                  }
                />
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main quiz area */}
      <section className="flex-1 bg-gray-800 shadow-lg shadow-yellow-500/50 rounded-xl p-6 flex flex-col">
        <div className="mb-4 text-center text-yellow-300 font-semibold text-xl">
          Question {currentQuestion + 1} of {questions.length}
        </div>

        <QuestionCard
          index={currentQuestion}
          question={questions[currentQuestion]}
          selected={answers[currentQuestion]}
          onChange={handleAnswerChange}
          submitted={submitted}
        />

        <div className="flex flex-wrap justify-between mt-6 gap-4">
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            aria-disabled={currentQuestion === 0}
            className="bg-gray-600 px-8 py-3 rounded-full cursor-pointer hover:bg-gray-700 disabled:opacity-50 transition flex-1 min-w-[100px]"
          >
            Previous
          </button>

          {currentQuestion < questions.length - 1 && (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="bg-blue-600 px-12 py-3 rounded-full cursor-pointer hover:bg-blue-700 transition flex-1 min-w-[100px]"
            >
              Next
            </button>
          )}

          {currentQuestion === questions.length - 1 && !submitted && (
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className={`px-8 py-3 rounded-full cursor-pointer transition hover:bg-green-700 flex-1 min-w-[150px] ${
                !allAnswered ? "bg-gray-600 cursor-not-allowed" : "bg-green-600"
              }`}
              title={
                !allAnswered
                  ? "Answer all questions before submitting"
                  : undefined
              }
            >
              Submit Quiz
            </button>
          )}
        </div>

        {/* Score display */}
        {submitted && (
          <div className="mt-6 text-center text-2xl font-semibold text-green-400">
            Your Score: {score} / {questions.length}
          </div>
        )}
      </section>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-opacity-60 flex justify-center items-center z-50 px-4">
          <div className="bg-gray-800 p-10 rounded-xl shadow-lg text-center max-w-sm w-full shadow-yellow-500">
            <h2 className="text-xl font-bold text-yellow-400 mb-6">
              Are you sure you want to submit the quiz?
            </h2>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="bg-gray-600 px-8 py-3 rounded-full cursor-pointer hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitQuiz}
                className="bg-green-600 px-8 py-3 rounded-full cursor-pointer hover:bg-green-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
