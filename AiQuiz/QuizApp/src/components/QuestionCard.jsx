import React from "react";

const QuestionCard = ({
  index,
  question,
  selected,
  onChange,
  submitted,
  onClear,
}) => {
  return (
    <div className="mb-6 p-6 rounded-xl">
      <h2 className="font-semibold text-xl mb-4 text-white">
        Q{index + 1}. {question.question}
      </h2>

      {submitted && !selected && (
        <p className="text-red-400 text-sm italic mb-8">Not Answered</p>
      )}

      {submitted && selected && (
        <p className="text-green-400 text-sm italic mb-8">Answered</p>
      )}

      <div className="space-y-3 mb-4">
        {question.options.map((option, idx) => {
          const isCorrect = submitted && option === question.correctAnswer;
          const isWrong =
            submitted &&
            selected === option &&
            option !== question.correctAnswer;

          return (
            <label
              key={idx}
              className={`block p-3 rounded  cursor-pointer transition-all duration-200 ease-in-out border text-white
                ${
                  selected === option
                    ? "ring-2 ring-blue-400 border-blue-500"
                    : "border-gray-600"
                }
                ${isCorrect ? "bg-green-700 border-green-500" : ""}
                ${isWrong ? "bg-red-700 border-red-500" : ""}
                hover:bg-gray-700
              `}
            >
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                className="mr-2 accent-blue-500"
                disabled={submitted}
                checked={selected === option}
                onChange={() => onChange(index, option)}
              />
              {option}
              <span
                className={`ml-2 font-bold ${
                  isCorrect ? "text-green-300" : "text-red-300"
                }`}
              >
                {isCorrect ? "✓" : isWrong ? "✕" : ""}
              </span>
            </label>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={() => onClear(index)}
          disabled={!selected}
          className={`px-4 py-2 text-sm rounded-full transition text-white
          ${
            selected
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-600 cursor-not-allowed"
          }
        `}
        >
          Clear Response
        </button>
      )}
    </div>
  );
};

export default QuestionCard;
