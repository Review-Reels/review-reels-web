import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="flex overflow-hidden">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default HomePage;
