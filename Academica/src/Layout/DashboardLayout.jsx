import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../Components/Dashboard/DashboardNavbar";
import DashboardPanel from "../Components/Dashboard/DashboardPanel";


const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <DashboardNavbar />
      <div className="flex flex-1 ml-16 mt-8 mb-8">
        <DashboardPanel />
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
