import React from "react";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
function AllRoutes() {
  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;
