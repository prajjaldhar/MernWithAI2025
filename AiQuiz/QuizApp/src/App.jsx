import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Quiz from "./components/Quiz";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [forceSubmit, setForceSubmit] = useState(false); // For auto-submit
  const [showAutoSubmitWarning, setShowAutoSubmitWarning] = useState(false); // Warning before auto-submit

  // Fetch quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!searchQuery) return;

      setLoading(true);
      setError(null);

      try {
        const res = await axios.post("http://localhost:5000/quiz", {
          prompt: searchQuery,
        });
        setQuizData(res.data.questions);
        setRemainingTime(90 * 60); // 1 hour 30 minutes
        setForceSubmit(false); // Reset on new quiz
        setShowAutoSubmitWarning(false); // Reset warning too
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
        setError("Failed to fetch quiz data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [searchQuery]);

  // Countdown timer with auto-submit warning at 10 seconds
  useEffect(() => {
    if (remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 10) setShowAutoSubmitWarning(true);
        // Show warning at 10 seconds
        if (prev <= 1) {
          clearInterval(interval);
          setForceSubmit(true); // Trigger auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const formatTime = (totalSeconds) => {
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleSearchClick = () => {
    setSearchQuery(searchInput.trim());
  };

  const showSearchBar = !quizData.length && !loading && !error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-4">
      {showSearchBar && (
        <div className="w-full max-w-xl">
          <h1 className="text-4xl font-bold text-center mb-6">Quiz App</h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="text"
              className="flex-grow p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Search quiz..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchClick();
              }}
            />
            <button
              onClick={handleSearchClick}
              className="bg-blue-600 text-white cursor-pointer px-6 py-2 rounded-full hover:bg-blue-700 w-full sm:w-auto"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {loading && (
        <p className="text-center text-gray-300 mt-8">Loading quizzes...</p>
      )}
      {error && <p className="text-center text-red-400 mt-8">{error}</p>}

      {!loading && !error && quizData.length > 0 && (
        <div className="mt-8 w-full">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-slate-900 via-indigo-800 to-gray-900 px-4 py-2 rounded-full text-yellow-300 text-lg font-semibold shadow shadow-yellow-500/40">
              Time Left: {formatTime(remainingTime)}
            </div>
          </div>

          {showAutoSubmitWarning &&
            remainingTime > 0 &&
            remainingTime <= 10 && (
              <div className="text-center mb-4 text-red-500 font-semibold text-lg animate-pulse">
                ⏳ Quiz will be auto-submitted in the next {remainingTime}{" "}
                second{remainingTime > 1 ? "s" : ""}!
              </div>
            )}
          <Quiz questions={quizData} forceSubmit={forceSubmit} />
        </div>
      )}
    </div>
  );
}

export default App;
