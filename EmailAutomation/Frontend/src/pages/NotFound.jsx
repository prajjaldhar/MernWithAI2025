import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(8);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          navigate("/login");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4 text-center">
      <div>
        <h1 className="text-9xl font-bold mb-4 text-red-500">404</h1>
        <p className="text-2xl font-semibold mb-2">Page Not Found</p>
        <p className="text-gray-300 mb-4">Redirecting to login page in...</p>

        {/* Suspense Countdown Number */}
        <div className="text-yellow-400 font-extrabold text-6xl animate-pulse mb-4">
          {secondsLeft}
          <span className="text-2xl ml-1">
            second{secondsLeft !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="animate-pulse">
          <p className="text-sm text-gray-500">Stay tight 🔄</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
