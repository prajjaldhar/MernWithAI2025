import React, { useState } from "react";

const CourseDetails = ({
  courses = [
    {
      courseName: "React Basics",
      courseId: "C101",
      quizId: "Q202",
      quizDate: "2025-06-01",
      totalQuestions: 20,
      correctAnswers: 18,
      incorrectAnswers: 2,
      feedback:
        "Good job!\nKeep practicing hooks and state management for better understanding.",
      remediation:
        "Review hooks chapter thoroughly.\nFocus on useEffect and useState.",
      behaviour: "Active learner",
    },
    {
      courseName: "JavaScript Advanced",
      courseId: "C102",
      quizId: "Q203",
      quizDate: "2025-06-05",
      totalQuestions: 25,
      correctAnswers: 22,
      incorrectAnswers: 3,
      feedback: "Well done\nYou have good grasp on advanced concepts.",
      remediation:
        "Practice closures and asynchronous JS.\nTry coding exercises daily.",
      behaviour: "Consistent",
    },
    // Add more course objects for demo/testing pagination
    {
      courseName: "SQL Advanced",
      courseId: "C103",
      quizId: "Q204",
      quizDate: "2025-06-10",
      totalQuestions: 30,
      correctAnswers: 28,
      incorrectAnswers: 2,
      feedback: "Excellent\nStrong SQL skills.",
      remediation: "Practice complex joins and indexing.",
      behaviour: "Focused",
    },
    {
      courseName: "Node.js Basics",
      courseId: "C104",
      quizId: "Q205",
      quizDate: "2025-06-12",
      totalQuestions: 22,
      correctAnswers: 20,
      incorrectAnswers: 2,
      feedback: "Good job\nKeep exploring backend development.",
      remediation: "Learn Express.js and middleware.",
      behaviour: "Curious",
    },
    {
      courseName: "CSS Advanced",
      courseId: "C105",
      quizId: "Q206",
      quizDate: "2025-06-15",
      totalQuestions: 18,
      correctAnswers: 17,
      incorrectAnswers: 1,
      feedback: "Great\nMaster flexbox and grid.",
      remediation: "Practice responsive design.",
      behaviour: "Diligent",
    },
    {
      courseName: "TypeScript Intro",
      courseId: "C106",
      quizId: "Q207",
      quizDate: "2025-06-18",
      totalQuestions: 20,
      correctAnswers: 19,
      incorrectAnswers: 1,
      feedback: "Nice work\nStrong typing understanding.",
      remediation: "Explore advanced types.",
      behaviour: "Methodical",
    },
  ],
  onViewQuestions = (quizId) => alert(`View questions for quiz ${quizId}`),
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(courses.length / rowsPerPage);

  // Get current page courses
  const currentCourses = courses.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handler for page change
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <style>{`
        /* Scrollbar Track */
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e0e7ff;
          border-radius: 10px;
        }
        /* Scrollbar Thumb */
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #3b82f6;
          border-radius: 10px;
          border: 3px solid #e0e7ff;
        }
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #e0e7ff;
        }
        /* Multiline wrap with line breaks */
        .multiline-cell {
          white-space: pre-wrap;
          max-width: 250px;
          word-break: break-word;
        }
      `}</style>

      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-6xl p-6 bg-white shadow-lg rounded-lg border border-gray-200 overflow-x-auto custom-scrollbar">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
            📚 Course Details
          </h2>

          <table className="min-w-[1800px] table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left align-top">
                {[
                  "Course Name",
                  "Course ID",
                  "Quiz ID",
                  "Quiz Date",
                  "Total Questions",
                  "Correct Answers",
                  "Incorrect Answers",
                  "Feedback",
                  "Remediation",
                  "Behaviour",
                  "View Questions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="py-3 px-4 border-b border-gray-300"
                    style={{ verticalAlign: "top" }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentCourses.map((course, idx) => (
                <tr
                  key={course.quizId + idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                    {course.courseName}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                    {course.courseId}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                    {course.quizId}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                    {course.quizDate}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center whitespace-nowrap">
                    {course.totalQuestions}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center whitespace-nowrap">
                    {course.correctAnswers}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center whitespace-nowrap">
                    {course.incorrectAnswers}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 multiline-cell">
                    {course.feedback}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 multiline-cell">
                    {course.remediation}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                    {course.behaviour}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                    <button
                      onClick={() => onViewQuestions(course.quizId)}
                      className="text-blue-600 hover:text-blue-800 font-semibold underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded ${
                    page === currentPage
                      ? "bg-blue-700 text-white"
                      : "bg-blue-200 hover:bg-blue-300"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
