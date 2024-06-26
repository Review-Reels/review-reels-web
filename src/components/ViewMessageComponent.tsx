import React from "react";
import logo from "../images/LogoSmall.svg";
import Button from "./customComponents/Button";
import { VideoCamera, Note } from "phosphor-react";
import { getUrl } from "../utils/S3Utils";
import { AskMessage } from "../types";

interface PropType {
  askMessage?: AskMessage;
  onReplyWithVideoClick?: () => void;
  onReplyWithTextClick?: () => void;
}

function ViewMessageComponent({
  askMessage,
  onReplyWithVideoClick,
  onReplyWithTextClick,
}: PropType) {
  // md:shadow-lg md:shadow-slate-200 lg:shadow-lg lg:shadow-slate-200
  return (
    <div className="flex justify-center items-center flex-col md:w-[30rem] rounded-xl md:border-2 py-4">
      <div className="relative flex justify-center items-center cursor-pointer  md:w-[20rem]">
        {askMessage?.videoUrl && (
          <video
            src={getUrl(askMessage?.videoUrl)}
            className="rounded-xl w-full"
            controls
          ></video>
        )}
      </div>
      <div className="mt-4 text-center text-lg md:px-20 lg:px-20 text-Charade font-medium">
        <p>{askMessage?.askMessage}</p>
      </div>
      <div className="flex flex-col md:w-[60%] lg:w-[70%]">
        <Button
          className="bg-primaryRed shadow-lg  drop-shadow-md my-4 flex gap-4 w-full"
          onClick={onReplyWithVideoClick}
        >
          <VideoCamera size={28} weight="bold" />
          Reply with video
        </Button>
        <Button
          className="bg-Black5 shadow-lg  drop-shadow-md gap-5 w-full"
          onClick={onReplyWithTextClick}
        >
          <Note size={28} weight="bold" />
          Reply with text
        </Button>
      </div>
      <a
        href="https://www.reviewreels.app/?utm_source=poweredby&utm_medium=integration&utm_id=poweredby"
        target="_parent"
      >
        <div className="flex gap-4 text-Black2 m-4">
          powerd by <img src={logo} alt="review reels logo" />
        </div>
      </a>
    </div>
  );
}

export default ViewMessageComponent;
