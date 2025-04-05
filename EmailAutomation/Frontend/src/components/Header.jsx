import React from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Header = ({ sidebarExtended, setSidebarExtended }) => {
 const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("UserData"); // Remove user data
    navigate("/login"); // Redirect to login page
    window.location.reload(); // Refresh the page
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center transition-all duration-300 z-10 ${
        sidebarExtended ? "ml-64" : "ml-20"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Toggle Button Moved Here */}
        <button
          onClick={() => setSidebarExtended(!sidebarExtended)}
          className="p-2 rounded-md hover:bg-gray-200"
        >
          <FaBars className="text-xl text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Welcome, Admin</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
