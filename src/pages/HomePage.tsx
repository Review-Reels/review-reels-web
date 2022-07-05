import React from "react";
import LoggedInRoutes from "../LoggedInRoutes";
import SideBar from "../components/SideBar";
const HomePage = () => {
  return (
    <div className="flex">
      <SideBar />
      <LoggedInRoutes />
    </div>
  );
};

export default HomePage;
