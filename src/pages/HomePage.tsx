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
    <div className="flex overflow-hidden flex-col">
      <TopBar hidden={hidden} setHidden={setHidden} />
      <div className="flex overflow-hidden">
        <SideBar hidden={hidden} setHidden={setHidden} />
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
