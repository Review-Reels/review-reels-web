import React, { useState, ChangeEvent } from "react";
import VideoCamIcon from "../../images/VideoCap.svg";
interface PropType {
  onVideoRecorded: (videoSrc: string, extension: string) => void;
}
function RRFileLoader({ onVideoRecorded }: PropType) {
  const [videoSrc, seVideoSrc] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event &&
      event.target &&
      event.target.files &&
      event.target.files.length
    ) {
      const file = event.target.files[0];
      const Video = URL.createObjectURL(file);
      seVideoSrc(Video);
      onVideoRecorded(Video, ".mp4");
    }
  };

  return (
    <div className="w-full">
      {videoSrc ? (
        <div className="relative w-full flex justify-center content-center">
          <video src={videoSrc} autoPlay loop />
          <div className="absolute  bottom-2 px-10 py-1 rounded-full  bg-red-800 opacity-80 ">
            <button
              className="px-4 py-2 text-white font-bold"
              onClick={() => seVideoSrc("")}
            >
              x clear
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col justify-center items-center w-full h-64 bg-Athens_Gray rounded-lg  cursor-pointer dark:hover:bg-bray-800 dark:bg-Athens_Gray hover:bg-Athens_Gray dark:hover:bg-Athens_Gray "
        >
          <div className="flex-col justify-center items-center pt-5 pb-6 hidden sm:flex lg:flex">
            <img src={VideoCamIcon} alt="video camera icon" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              MP4 files
            </p>
          </div>
          <div className="flex flex-col justify-center items-center pt-5 pb-6  md:hidden lg:hidden">
            <img src={VideoCamIcon} alt="video camera icon" />
            <p className="mb-2 text-sm py-1">Add a short video</p>
          </div>
          <input
            id="dropzone-file"
            accept="video/*"
            type="file"
            className="hidden"
            onChange={(event) => handleChange(event)}
          />
        </label>
      )}
    </div>
  );
}

export default RRFileLoader;
