import React, { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";

const DashboardNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-blue-900 text-white p-4 flex justify-evenly items-center shadow-md">
      <div className="text-xl font-bold">
        Academica <span className="text-amber-400">Dashboard Panel</span>
      </div>

      <div className="relative left-52">
        <div
          onClick={toggleDropdown}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="font-medium">Prajjal Dhar</span>
          <ChevronDown size={18} strokeWidth={4} className="mt-1" />
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
            <button
              className="flex items-center gap-2 px-6 py-2 hover:bg-gray-100 w-full"
              onClick={() => alert("Logout clicked")}
            >
              <span className="mr-7">Logout</span> <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
