import React, { useEffect, useState } from "react";
import logo from "../images/LogoSmall.svg";
import logoOnly from "../images/LogoOnly.svg";
import {
  ChatTeardropDots,
  CirclesFour,
  GearSix,
  Lifebuoy,
  Plug,
  SignOut,
  Tag,
  PaperPlaneTilt,
  List,
} from "phosphor-react";
import { NavLink } from "react-router-dom";
import useCheckMobileScreen from "../hooks/checkMobileDevice";
import { useStore } from "../store/UserStore";

function SideBar() {
  const isMobile = useCheckMobileScreen();
  const resetUser = useStore((state) => state.resetUser);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (isMobile) setHidden(true);
    else setHidden(false);
  }, [isMobile]);

  const signOut = () => {
    resetUser();
  };

  let activeClassName =
    "flex items-center p-2 text-base font-normal text-gray-900 rounded-2xl dark:text-black hover:bg-Peach_Cream-dark dark:hover:bg-Peach_Cream-dark bg-Peach_Cream-dark";
  let normalClassName =
    "flex items-center p-2 text-base font-normal text-gray-900 rounded-2xl dark:text-black hover:bg-Peach_Cream-dark dark:hover:bg-Peach_Cream-dark";
  let sidebarNameClass = hidden ? "hidden" : "flex-1 ml-3 whitespace-nowrap";

  return (
    <aside aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-Peach_Cream-normal  dark:bg-Peach_Cream-normal  h-screen">
        {hidden ? (
          <div className="ml-3 mb-5">
            <img src={logoOnly} alt="review reels logo" width={24} />
          </div>
        ) : (
          <div className="flex justify-center mb-3">
            <img src={logo} alt="review reels logo" />
          </div>
        )}

        <List
          size={32}
          className="dark:hover:bg-Peach_Cream-dark  ml-2 cursor-pointer"
          onClick={() => setHidden((prev) => !prev)}
        />
        <ul className="space-y-2  my-10">
          <li>
            <NavLink
              to="/askmessage"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <ChatTeardropDots size={32} />

              <span className={sidebarNameClass}>Ask message</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reviewlibrary"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <CirclesFour size={32} />
              <span className={sidebarNameClass}>Review library</span>
              {!hidden && (
                <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  pro
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inbox"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <PaperPlaneTilt size={32} />
              <span className={sidebarNameClass}>Inbox</span>
              {!hidden && (
                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                  3
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/integrations"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <Plug size={32} />
              <span className={sidebarNameClass}>Integrations</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <Tag size={32} />
              <span className={sidebarNameClass}>Pricing</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <GearSix size={32} />
              <span className={sidebarNameClass}>Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/help"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <Lifebuoy size={32} />
              <span className={sidebarNameClass}>Help</span>
            </NavLink>
          </li>
          <li>
            <button onClick={signOut} className={normalClassName + "w-full"}>
              <SignOut size={32} />
              <span className={sidebarNameClass + " mr-20 pr-8"}>Signout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
