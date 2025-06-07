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
  const [forceSubmit, setForceSubmit] = useState(false);
  const [showAutoSubmitWarning, setShowAutoSubmitWarning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [tabSwitchWarning, setTabSwitchWarning] = useState(false);

  // Auto-submit if user changes tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isSubmitted && quizData.length > 0) {
        setTabSwitchCount((prev) => {
          const newCount = prev + 1;

          if (newCount === 1) {
            setTabSwitchWarning(true); // Show warning after 1st switch
          } else if (newCount >= 2) {
            // Auto-submit after 2nd switch
            setForceSubmit(true);
            setIsSubmitted(true);
            setShowAutoSubmitWarning(false);
            setTabSwitchWarning(false);
          }

          return newCount;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isSubmitted, quizData]);

  // Fetch quiz data on searchQuery change
  useEffect(() => {
    if (!searchQuery) return;

    const fetchQuiz = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.post("http://localhost:5000/quiz", {
          prompt: searchQuery,
        });
        setQuizData(res.data.questions || []);
        setRemainingTime(90 * 60); // 90 minutes in seconds
        setForceSubmit(false);
        setShowAutoSubmitWarning(false);
        setIsSubmitted(false);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
        setError("Failed to fetch quiz data.");
        setQuizData([]); // Clear previous quiz data on error
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [searchQuery]);

  // Timer countdown and auto-submit logic
  useEffect(() => {
    if (remainingTime <= 0 || isSubmitted) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 10 && prev > 0) setShowAutoSubmitWarning(true);
        if (prev <= 1) {
          clearInterval(interval);
          setForceSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime, isSubmitted]);

  // Called when quiz is submitted manually or automatically
  const handleQuizSubmit = () => {
    setIsSubmitted(true);
    setShowAutoSubmitWarning(false);
  };

  // Format time as hh:mm:ss
  const formatTime = (totalSeconds) => {
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // Trigger search with trimmed input
  const handleSearchClick = () => {
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
    }
  };

  // Show search bar if no quiz data and not loading or error
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
              aria-label="Search quiz input"
            />
            <button
              onClick={handleSearchClick}
              className="bg-blue-600 text-white cursor-pointer px-6 py-2 rounded-full hover:bg-blue-700 w-full sm:w-auto"
              aria-label="Search quiz button"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {loading && (
        <p
          className="text-center text-gray-300 mt-8"
          role="status"
          aria-live="polite"
        >
          Loading quizzes...
        </p>
      )}
      {error && (
        <p className="text-center text-red-400 mt-8" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && quizData.length > 0 && (
        <div className="mt-8 w-full max-w-4xl">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-slate-900 via-indigo-800 to-gray-900 px-4 py-2 rounded-full text-yellow-300 text-lg font-semibold shadow shadow-yellow-500/40">
              Time Left: {formatTime(remainingTime)}
            </div>
          </div>

          {showAutoSubmitWarning &&
            remainingTime > 0 &&
            remainingTime <= 10 && (
              <div
                className="text-center mb-4 text-red-500 font-semibold text-lg animate-pulse"
                role="alert"
                aria-live="assertive"
              >
                ⏳ Quiz will be auto-submitted in the next {remainingTime}{" "}
                second{remainingTime > 1 ? "s" : ""}!
              </div>
            )}

          {tabSwitchWarning && !isSubmitted && (
            <div
              className="text-center mb-4 text-orange-400 font-semibold text-lg animate-pulse"
              role="alert"
              aria-live="assertive"
            >
              ⚠️ Don't switch the tab! Quiz will auto-submit if you do it again.
            </div>
          )}

          <Quiz
            questions={quizData}
            forceSubmit={forceSubmit}
            onSubmit={handleQuizSubmit}
          />
        </div>
      )}
    </div>
  );
}

export default App;
