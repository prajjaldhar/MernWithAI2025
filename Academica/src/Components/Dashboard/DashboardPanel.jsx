import React from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  BookOpen,
  Lock,
  FileText,
  HelpCircle,
  ClipboardList,
} from "lucide-react";

const DashboardPanel = () => {
  const baseClass =
    "flex items-center gap-3 p-4 ml-5 mt-6 rounded-md transition";
  const activeClass = "bg-blue-100 text-blue-900 font-semibold";
  const hoverClass = "hover:bg-blue-100";

  return (
    <div className="w-80 rounded-2xl bg-white shadow-md pt-6">
      <nav className="flex flex-col">
        <NavLink
          to="userdetails"
          className={({ isActive }) =>
            `${baseClass} ${hoverClass} ${isActive ? activeClass : ""}`
          }
        >
          <User size={20} /> <span>User Details</span>
        </NavLink>

        <NavLink
          to="coursedetails"
          className={({ isActive }) =>
            `${baseClass} ${hoverClass} ${isActive ? activeClass : ""}`
          }
        >
          <BookOpen size={20} /> <span>Course Details</span>
        </NavLink>

        <NavLink
          to="changepassword"
          className={({ isActive }) =>
            `${baseClass} ${hoverClass} ${isActive ? activeClass : ""}`
          }
        >
          <Lock size={20} /> <span>Change Password</span>
        </NavLink>

        <NavLink
          to="certificates"
          className={({ isActive }) =>
            `${baseClass} ${hoverClass} ${isActive ? activeClass : ""}`
          }
        >
          <FileText size={20} /> <span>Certificates</span>
        </NavLink>

        <NavLink
          to="faqs"
          className={({ isActive }) =>
            `${baseClass} ${hoverClass} ${isActive ? activeClass : ""}`
          }
        >
          <HelpCircle size={20} /> <span>FAQs</span>
        </NavLink>

        <NavLink
          to="gotoquiz"
          className={({ isActive }) =>
            `${baseClass} ${hoverClass} ${isActive ? activeClass : ""}`
          }
        >
          <ClipboardList size={20} /> <span>Go To Quiz</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default DashboardPanel;
