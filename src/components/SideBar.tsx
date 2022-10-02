import React, { useEffect } from "react";

import {
  ChatTeardropDots,
  CirclesFour,
  GearSix,
  Lifebuoy,
  Plug,
  SignOut,
  Tag,
  PaperPlaneTilt,
} from "phosphor-react";
import { NavLink, useNavigate } from "react-router-dom";
import useCheckMobileScreen from "../hooks/checkMobileDevice";
import { useStore } from "../store/UserStore";
import { useUnReadStore } from "../store/UnReadStore";
import { getUnReadStatistics } from "../apis/ReviewResponseApis";
interface Prop {
  hidden: boolean;
  setHidden: (val: boolean) => void;
}
function SideBar({ hidden, setHidden }: Prop) {
  const isMobile = useCheckMobileScreen();
  const resetUser = useStore((state) => state.resetUser);
  const user = useStore((state) => state.user);
  const unReadCount = useUnReadStore((state) => state.unRead);
  const setUnRead = useUnReadStore((state) => state.setUnRead);

  let navigate = useNavigate();

  useEffect(() => {
    getUnReadStatistics()
      .then((res) => {
        setUnRead(res.data.unReadCount);
      })
      .catch((err) => {
        console.log(err, "Err");
      });
  });

  const signOut = () => {
    resetUser();
  };

  useEffect(() => {
    const usernameSet = !user?.username;
    if (usernameSet) navigate("initialdetails");
  }, [user?.username, navigate]);

  let activeClassName =
    "flex items-center p-2 text-base font-normal text-Black2 rounded-2xl dark:text-black hover:bg-Peach_Cream-dark dark:hover:bg-Peach_Cream-dark bg-Peach_Cream-dark";
  let normalClassName =
    "flex items-center p-2 text-base font-normal text-Black2 rounded-2xl dark:text-black hover:bg-Peach_Cream-dark dark:hover:bg-Peach_Cream-dark";
  let sidebarNameClass = isMobile
    ? "hidden hover:flex "
    : "flex-1 ml-3 whitespace-nowrap ";
  let iconClassName = "text-Black";

  return (
    <aside aria-label="Sidebar">
      {!hidden && (
        <div className="overflow-y-auto py-4 px-3 shadow-md h-screen">
          <ul className="space-y-2  my-10">
            <li>
              <NavLink
                to="/askmessage"
                className={({ isActive }) =>
                  isActive ? activeClassName : normalClassName
                }
              >
                <ChatTeardropDots size={32} className={iconClassName} />

                <span className={sidebarNameClass}>Ask message</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/inbox"
                className={({ isActive }) =>
                  isActive ? activeClassName : normalClassName
                }
              >
                <PaperPlaneTilt size={32} className={iconClassName} />
                <span className={sidebarNameClass}>Inbox</span>
                {unReadCount > 0 && !isMobile && (
                  <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-white bg-blue-200 rounded-full dark:bg-Anakiwa ">
                    {unReadCount}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                // to="/reviewlibrary"
                to="/comingSoon"
                className={({ isActive }) =>
                  isActive
                    ? activeClassName + " cursor-not-allowed"
                    : normalClassName + " cursor-not-allowed"
                }
              >
                <CirclesFour size={32} className={iconClassName} />
                <span className={sidebarNameClass}>Review library</span>
                {/* {!isMobile && (
                  <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-black bg-Peach_Orange rounded-full dark:bg-Peach_Orange dark:text-black">
                    pro
                  </span>
                )} */}
              </NavLink>
            </li>
            <li>
              <NavLink
                // to="/integrations"

                // className={({ isActive }) =>
                //   isActive ? activeClassName : normalClassName
                // }
                to="/comingSoon"
                className={({ isActive }) =>
                  isActive
                    ? activeClassName + " cursor-not-allowed"
                    : normalClassName + " cursor-not-allowed"
                }
              >
                <Plug size={32} className={iconClassName} />
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
                <Tag size={32} className={iconClassName} />
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
                <GearSix size={32} className={iconClassName} />
                <span className={sidebarNameClass}>Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                // to="/help"
                // className={({ isActive }) =>
                //   isActive ? activeClassName : normalClassName
                // }
                to="/comingSoon"
                className={({ isActive }) =>
                  isActive
                    ? activeClassName + " cursor-not-allowed"
                    : normalClassName + " cursor-not-allowed"
                }
              >
                <Lifebuoy size={32} className={iconClassName} />
                <span className={sidebarNameClass}>Help</span>
              </NavLink>
            </li>
            <li>
              <button onClick={signOut} className={normalClassName + "w-full"}>
                <SignOut size={32} className={iconClassName} />
                <span className={sidebarNameClass + " mr-20 pr-8"}>
                  Signout
                </span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
}

export default SideBar;
