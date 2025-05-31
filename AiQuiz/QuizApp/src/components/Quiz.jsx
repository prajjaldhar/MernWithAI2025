import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";

const Quiz = ({ questions, forceSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleOptionChange = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowConfirm(false);
  };

  // 👉 Handle forceSubmit from App
  useEffect(() => {
    if (forceSubmit && !submitted) {
      handleSubmit();
    }
  }, [forceSubmit, submitted]);

  const score = questions.reduce((acc, q, i) => {
    return answers[i] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  return (
    <div className="max-w-3xl mx-auto text-white relative">
      <div className="bg-gray-800 shadow-lg shadow-yellow-500/50 rounded-xl p-6">
        <QuestionCard
          index={current}
          question={questions[current]}
          selected={answers[current]}
          onChange={handleOptionChange}
          submitted={submitted}
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrent(current - 1)}
            disabled={current === 0}
            className="bg-gray-600 px-8 py-3 rounded-full cursor-pointer hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>

          {current < questions.length - 1 && (
            <button
              onClick={() => setCurrent(current + 1)}
              className="bg-blue-600 px-12 py-3 rounded-full cursor-pointer hover:bg-blue-700"
            >
              Next
            </button>
          )}

          {current === questions.length - 1 && !submitted && (
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-green-600 px-8 py-3 rounded-full cursor-pointer hover:bg-green-700"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>

      {submitted && (
        <div className="text-center mt-6 text-xl font-semibold text-green-400">
          Your Score: {score} / {questions.length}
        </div>
      )}

      {/* Confirm Submit Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-10 rounded-xl shadow-lg text-center max-w-sm w-full shadow-sm shadow-yellow-500">
            <h2 className="text-xl font-bold text-yellow-400 mb-5">
              Are you sure you want to submit the quiz?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-600 px-6 py-2 rounded-full cursor-pointer hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 px-6 py-2 rounded-full cursor-pointer hover:bg-green-700"
              >
                Sure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
