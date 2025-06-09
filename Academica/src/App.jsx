import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import DashboardLayout from "./Layout/DashboardLayout";
import UserDetails from "./Pages/Dashboard/UserDetails";
import CourseDetails from "./Pages/Dashboard/CourseDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="userdetails" replace />} />
          <Route path="userdetails" element={<UserDetails />} />
          <Route path="coursedetails" element={<CourseDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
