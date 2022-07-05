import React from "react";
import {
  ChatTeardropDots,
  CirclesFour,
  GearSix,
  Lifebuoy,
  Plug,
  SignOut,
  Tag,
} from "phosphor-react";
import { NavLink } from "react-router-dom";

function SideBar() {
  let activeClassName =
    "flex items-center p-2 text-base font-normal text-gray-900 rounded-2xl dark:text-black hover:bg-Peach_Cream-dark dark:hover:bg-Peach_Cream-dark bg-Peach_Cream-dark";
  let normalClassName =
    "flex items-center p-2 text-base font-normal text-gray-900 rounded-2xl dark:text-black hover:bg-Peach_Cream-dark dark:hover:bg-Peach_Cream-dark";
  return (
    <aside className="w-64 h-screen" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-Peach_Cream-normal  dark:bg-Peach_Cream-normal  h-screen">
        <ul className="space-y-2  my-10">
          <li>
            <NavLink
              to="/askMessage"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <ChatTeardropDots size={32} />

              <span className="ml-3">Ask message</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reviewLibrary"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <CirclesFour size={32} />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Review library
              </span>
              <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Inbox"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <Plug size={32} />
              <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
              <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                3
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Integrations"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <Plug size={32} />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Integrations
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Pricing"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <Tag size={32} />
              <span className="flex-1 ml-3 whitespace-nowrap">Pricing</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Settings"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <GearSix size={32} />
              <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Help"
              className={({ isActive }) =>
                isActive ? activeClassName : normalClassName
              }
            >
              <Lifebuoy size={32} />
              <span className="flex-1 ml-3 whitespace-nowrap">Help</span>
            </NavLink>
          </li>
          <li>
            <button className={normalClassName}>
              <SignOut size={32} />
              <span className="flex-1 ml-3 whitespace-nowrap">Signout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
