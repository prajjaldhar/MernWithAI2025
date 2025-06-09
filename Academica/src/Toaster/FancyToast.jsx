import React, { useEffect } from "react";

const FancyToast = ({ message, show, onClose, type = "success" }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const bgColors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 max-w-xs w-full px-5 py-3 rounded-lg shadow-lg
        flex items-center space-x-3 text-white font-medium
        animate-fade-slide-in
        ${bgColors[type]}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex-1">{message}</div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="text-white text-3xl cursor-pointer hover:text-gray-200 transition"
      >
        ×
      </button>

      <style jsx>{`
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-slide-in {
          animation: fadeSlideIn 0.4s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default FancyToast;
