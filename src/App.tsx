import React from "react";
import { Routes, Route } from "react-router-dom";
import SigInPage from "./pages/SigInPage";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signin" element={<SigInPage />} />
      </Routes>
    </div>
  );
}

export default App;
