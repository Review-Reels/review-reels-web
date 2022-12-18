import React from "react";
import { ReviewResponse } from "../types";
import { getUrl } from "../utils/S3Utils";
import logo from "../images/LogoSmall.svg";

interface PropType {
  reviewResponse: ReviewResponse;
}

function EmbedComponent({ reviewResponse }: PropType) {
  return (
    <div className="flex flex-col items-center  justify-center">
      <div className="flex flex-col gap-2 justify-center items-start border-2 p-3 m-2 rounded-lg w-96 ">
        <div className="flex gap-2 items-center">
          <div
            className={`flex rounded-full w-12 h-12 md:w-14 md:h-14 justify-center items-center bg-Peach_Orange`}
          >
            <p className="tex-l md:text-xl text-white uppercase">
              {reviewResponse?.customerName.charAt(0)}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">
              {reviewResponse?.customerName}
            </h3>
            <h5 className="text-base text-Black2">
              {reviewResponse?.whatYouDo}
            </h5>
          </div>
        </div>
        {reviewResponse?.videoUrl ? (
          <div className="flex justify-center items-center cursor-pointer">
            <video
              className="rounded-xl shadow-lg md:max-w-96"
              src={getUrl(reviewResponse?.videoUrl)}
              controls
            ></video>
          </div>
        ) : (
          <div className="mt-4 text-justify text-lg font-base  text-Charade rounded-xl p-4 justify-center flex max-w-sm">
            <p>{reviewResponse?.replyMessage}</p>
          </div>
        )}
        {/* <a
          href="https://www.reviewreels.app/?utm_source=poweredby&utm_medium=integration&utm_id=poweredby"
          target="_parent"
        >
          <div className="flex gap-4 text-Black2 m-4">
            powerd by <img src={logo} alt="review reels logo" />
          </div>
        </a> */}
      </div>
    </div>
  );
}

export default EmbedComponent;
