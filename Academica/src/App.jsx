import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* You can add more routes here later, like /courses, /about, etc. */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
