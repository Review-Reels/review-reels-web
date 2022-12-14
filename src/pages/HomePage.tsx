import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { Outlet } from "react-router-dom";
import useCheckMobileScreen from "../hooks/checkMobileDevice";

const HomePage = () => {
  const isMobile = useCheckMobileScreen();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (isMobile) setHidden(true);
    else setHidden(false);
  }, [isMobile]);
  return (
    <div className="flex flex-col">
      <TopBar hidden={hidden} setHidden={setHidden} />
      <div className="flex">
        <SideBar hidden={hidden} setHidden={setHidden} />
        <div className="flex max-h-screen overflow-auto w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
