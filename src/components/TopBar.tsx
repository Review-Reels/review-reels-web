import React from "react";
import { List } from "phosphor-react";
import logoOnly from "../images/LogoSmall.svg";
interface Prop {
  hidden: boolean;
  setHidden: (val: boolean) => void;
}
function TopBar({ hidden, setHidden }: Prop) {
  return (
    <div className="h-12 p-2 shadow-sm  flex">
      <List
        size={32}
        className="hover:bg-Black7  ml-2 cursor-pointer rounded-xl"
        onClick={() => setHidden(!hidden)}
      />
      <div className="flex justify-end items-center w-full mr-2">
        <img src={logoOnly} alt="review reels logo" width={100} />
      </div>
    </div>
  );
}

export default TopBar;
