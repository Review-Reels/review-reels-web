import React from "react";
import { Routes, Route } from "react-router-dom";
import AskMessages from "./pages/AskMessages";
import ReviewLibrary from "./pages/ReviewLibrary";
import Integrations from "./pages/Integrations";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

function LoggedInRoutes() {
  return (
    <div className="h-full">
      <Routes>
        <Route path="/askMessage" element={<AskMessages />} />
        <Route path="/reviewLibrary" element={<ReviewLibrary />} />
        <Route path="/Inbox" element={<AskMessages />} />
        <Route path="/Integrations" element={<Integrations />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Help" element={<Help />} />
      </Routes>
    </div>
  );
}

export default LoggedInRoutes;
