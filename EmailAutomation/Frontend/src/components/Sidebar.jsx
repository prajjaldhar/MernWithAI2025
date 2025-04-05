import React from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-gray-800 text-white h-screen fixed top-0 left-0 transition-all duration-300 ease-in-out z-20`}
    >
      <div className="flex items-center justify-start p-4">
        {/* Logo when collapsed, Logo + Text when extended */}
        <div className="flex items-center gap-2">
          {/* Using FaShieldAlt as a placeholder logo */}
          <FaShieldAlt className="text-2xl" />
          {isSidebarOpen && (
            <span className="text-xl font-bold">Admin Panel</span>
          )}
        </div>
      </div>

      <nav className="mt-8">
        <ul className="space-y-2">
          <li>
            <Link to={"/emailautomation"} className="flex items-center p-4 hover:bg-gray-700">
              <FaHome className="text-xl" />
              {isSidebarOpen && <span className="ml-4">EmailAutomation</span>}
            </Link>
          </li>
          <li>
            <a href="#" className="flex items-center p-4 hover:bg-gray-700">
              <FaUser className="text-xl" />
              {isSidebarOpen && <span className="ml-4">Users</span>}
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-4 hover:bg-gray-700">
              <FaCog className="text-xl" />
              {isSidebarOpen && <span className="ml-4">Settings</span>}
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-4 hover:bg-gray-700">
              <FaSignOutAlt className="text-xl" />
              {isSidebarOpen && <span className="ml-4">Logout</span>}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
