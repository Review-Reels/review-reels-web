import React, { useState } from "react";
import {
  DotsThreeOutlineVertical,
  PencilSimple,
  TrashSimple,
} from "phosphor-react";
import { AskMessages } from "../types";
import { getUrl } from "../utils/S3Utils";
function AskMessagesList({ askMessages }: AskMessages) {
  const [dropDown, setDropDown] = useState(false);
  return (
    <div>
      {askMessages.map((item) => {
        const { askMessage, createdAt, imageUrl, id, name } = item;
        return (
          <div className="flex p-2 rounded-xl shadow-md flex-col " key={id}>
            <div className="flex p-2 md:gap-5">
              <div className="flex flex-col md:flex-row p-2 gap-5 w-full">
                <img
                  src={getUrl(imageUrl)}
                  alt={id}
                  className="h-400 md:h-[121px] w=[85px] rounded-xl"
                />
                <div className="flex flex-col text-justify">
                  <h3 className="text-lg font-medium">{name}</h3>
                  <p className="text-slate-600 text-justify break-all">
                    {askMessage}
                  </p>
                </div>
              </div>
              <div
                className="cursor-pointer relative"
                onClick={() => setDropDown(!dropDown)}
              >
                <DotsThreeOutlineVertical size={24} />
                {dropDown && (
                  <div
                    className={
                      "z-10 bg-Peach_Cream-normal absolute right-0  divide-Peach_Cream-dark shadow rounded-xl"
                    }
                  >
                    <ul className="p-2 text-sm text-black dark:text-black">
                      <li className="hover:bg-Peach_Cream-dark rounded-xl">
                        <div className="flex items-center  ">
                          <PencilSimple size={18} />
                          <p className="block px-2 py-2  ">Edit</p>
                        </div>
                      </li>
                      <li className="hover:bg-Peach_Cream-dark rounded-xl">
                        <div className="flex items-center ">
                          <TrashSimple size={18} />
                          <p className="block px-2 py-2 ">Delete</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="self-end font-thin text-xs">{createdAt}</div>
          </div>
        );
      })}
    </div>
  );
}

export default AskMessagesList;
