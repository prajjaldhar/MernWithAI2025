import React from "react";

const QuestionCard = ({ index, question, selected, onChange, submitted }) => {
  return (
    <div className="mb-6 p-6 rounded-xl">
      <h2 className="font-semibold text-xl mb-4 text-white">
        Q{index + 1}. {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isCorrect = submitted && option === question.correctAnswer;
          const isWrong =
            submitted &&
            selected === option &&
            option !== question.correctAnswer;

          return (
            <label
              key={idx}
              className={`block p-3 rounded cursor-pointer transition border text-white
                ${selected === option ? "border-blue-500" : "border-gray-600"}
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
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
