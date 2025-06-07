import React, { useState, useEffect, useCallback, useMemo } from "react";
import QuestionCard from "./QuestionCard";

const Quiz = ({ questions, forceSubmit, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [markedReview, setMarkedReview] = useState(new Set());

  const totalQuestions = questions.length;

  const {
    notVisitedCount,
    notAnsweredCount,
    answeredOnly,
    markedOnly,
    answeredAndMarked,
  } = useMemo(() => {
    const notVisited = totalQuestions - visited.size;

    const notAnswered = [...visited].filter(
      (idx) => (!answers[idx] || answers[idx] === "") && !markedReview.has(idx)
    ).length;

    const answeredOnlyCount = Object.keys(answers).filter(
      (idx) => answers[idx] && !markedReview.has(Number(idx))
    ).length;

    const markedOnlyCount = [...markedReview].filter(
      (idx) => !answers[idx] || answers[idx] === ""
    ).length;

    const answeredAndMarkedCount = [...markedReview].filter(
      (idx) => answers[idx]
    ).length;

    return {
      notVisitedCount: notVisited,
      notAnsweredCount: notAnswered,
      answeredOnly: answeredOnlyCount,
      markedOnly: markedOnlyCount,
      answeredAndMarked: answeredAndMarkedCount,
    };
  }, [answers, markedReview, visited, totalQuestions]);

  const handleAnswerChange = (index, answer) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const toggleMarkedReview = (index) => {
    if (submitted) return;
    setMarkedReview((prev) => {
      const updated = new Set(prev);
      updated.has(index) ? updated.delete(index) : updated.add(index);
      return updated;
    });
  };

  const calculateScore = useCallback(() => {
    return questions.reduce(
      (acc, q, idx) => (answers[idx] === q.correctAnswer ? acc + 1 : acc),
      0
    );
  }, [answers, questions]);

  const handleClearResponse = (index) => {
    if (submitted) return;
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setSubmitted(true);
    setShowConfirm(false);
    onSubmit?.({ answers, score });
  };

  const navigateToQuestion = (idx) => {
    setCurrentQuestion(idx);
    if (!submitted) {
      setVisited((prev) => {
        const updated = new Set(prev);
        updated.add(idx);
        return updated;
      });
    }
  };

  useEffect(() => {
    if (submitted) return;
    setVisited((prev) => {
      const updated = new Set(prev);
      updated.add(currentQuestion);
      return updated;
    });
  }, [currentQuestion]);

  useEffect(() => {
    if (forceSubmit && !submitted) handleSubmit();
  }, [forceSubmit, submitted, handleSubmit]);

  const score = calculateScore();

  return (
    <div className="max-w-6xl mx-auto p-6 text-white flex flex-col md:flex-row gap-6 relative">
      {/* Sidebar Tracker */}
      <aside className="bg-gray-900 p-4 rounded-xl overflow-y-auto max-h-64 md:max-h-[700px] w-full md:w-72 flex flex-col items-center md:items-start gap-4 min-w-[112px]">
        <h2 className="text-yellow-400 text-lg font-semibold mb-2 md:mb-6 w-full text-center">
          Tracker
        </h2>

        <div className="grid grid-cols-2 gap-3 text-xs text-gray-300 w-full mb-4">
          {[
            {
              count: notVisitedCount,
              label: "Not Visited",
              bg: "bg-gray-400",
              text: "text-black",
            },
            {
              count: notAnsweredCount,
              label: "Not Answered",
              bg: "bg-red-600",
              text: "text-white",
            },
            {
              count: answeredOnly,
              label: "Answered",
              bg: "bg-green-600",
              text: "text-white",
            },
            {
              count: markedOnly,
              label: "Marked for Review",
              bg: "bg-purple-700",
              text: "text-white",
            },
          ].map(({ count, label, bg, text }, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded flex items-center justify-center text-sm font-bold ${bg} ${text}`}
              >
                {count}
              </div>
              {label}
            </div>
          ))}
          <div className="col-span-2 flex items-center gap-2">
            <div className="relative w-6 h-6 bg-purple-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {answeredAndMarked}
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full" />
            </div>
            Answered & Marked for Review (will be considered)
          </div>
        </div>

        {/* Question Navigator */}
        <div className="grid grid-cols-8 md:grid-cols-5 grid-rows-2 md:grid-rows-4 gap-2 md:gap-4 w-full">
          {questions.map((_, idx) => {
            const isAnswered = idx in answers;
            const isCurrent = idx === currentQuestion;
            const isMarked = markedReview.has(idx);

            const bgColor = isCurrent
              ? "bg-amber-500"
              : isMarked
              ? "bg-purple-500"
              : isAnswered
              ? "bg-green-600"
              : "bg-gray-600";

            return (
              <div key={idx} className="flex flex-col items-center">
                <button
                  onClick={() => navigateToQuestion(idx)}
                  className={`${bgColor} w-10 h-10 rounded-full flex items-center justify-center hover:brightness-125 transition`}
                  title={`Q${idx + 1} ${isAnswered ? "(Answered)" : ""} ${
                    isMarked ? "- Marked" : ""
                  }`}
                  aria-label={`Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
                <button
                  onClick={() => toggleMarkedReview(idx)}
                  className={`mt-1 w-4 h-4 rounded-full border-2 border-purple-400 transition ${
                    isMarked ? "bg-purple-400" : "bg-transparent"
                  } hover:bg-purple-600`}
                  title={isMarked ? "Unmark" : "Mark for Review"}
                  aria-pressed={isMarked}
                />
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6 bg-gray-800 shadow-lg shadow-yellow-500/50 rounded-xl flex flex-col">
        <div className="text-center text-yellow-300 font-semibold text-xl mb-4">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>

        <QuestionCard
          index={currentQuestion}
          question={questions[currentQuestion]}
          selected={answers[currentQuestion]}
          onChange={handleAnswerChange}
          onClear={handleClearResponse}
          submitted={submitted}
        />

        <div className="flex flex-wrap justify-between gap-4 mt-6">
          <button
            onClick={() => navigateToQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="bg-gray-600 px-8 py-3 rounded-full hover:bg-gray-700 transition flex-1 min-w-[100px] disabled:opacity-50"
          >
            Previous
          </button>

          {currentQuestion < totalQuestions - 1 ? (
            <button
              onClick={() => navigateToQuestion(currentQuestion + 1)}
              className="bg-blue-600 px-12 py-3 rounded-full hover:bg-blue-700 transition flex-1 min-w-[100px]"
            >
              Next
            </button>
          ) : !submitted ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full transition flex-1 min-w-[150px]"
            >
              Submit Quiz
            </button>
          ) : null}
        </div>

        {submitted && (
          <div className="mt-6 text-center text-green-400 text-2xl font-semibold">
            Your Score: {score} / {totalQuestions}
          </div>
        )}
      </section>

      {/* Submission Confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center px-4">
          <div className="bg-gray-800 p-10 rounded-xl shadow-lg text-center w-full max-w-sm">
            <h2 className="text-yellow-400 text-xl font-bold mb-6">
              Are you sure you want to submit?
            </h2>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-600 px-8 py-3 rounded-full hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 px-8 py-3 rounded-full hover:bg-green-700 transition"
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
