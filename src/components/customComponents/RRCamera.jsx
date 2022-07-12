import React, { useRef, useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useTimer } from "react-timer-hook";
import VideoCamIcon from "../../images/VideoCap.svg";

import useCheckMobileScreen from "../../hooks/checkMobileDevice";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "user" },
};

function RRCamera({ onVideoRecorded }) {
  const time = new Date();
  const expiryTimestamp = time.setSeconds(time.getSeconds() + 30);

  const { seconds, minutes, start, pause, restart } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => stopRecording(),
  });

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ ...CAPTURE_OPTIONS, audio: true });

  const isMobile = useCheckMobileScreen();

  const videoRef = useRef(null);

  const [videoSrc, seVideoSrc] = useState("");

  const handleChange = (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      seVideoSrc(URL.createObjectURL(file));
    }
  };

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia(CAPTURE_OPTIONS)
      .then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (!isMobile) {
      if (status === "idle" || status === "recording") getVideo();
      else {
        let video = videoRef.current;
        if (video) {
          video.srcObject = mediaBlobUrl;
        }
      }
    }
  }, [videoRef, status, mediaBlobUrl, isMobile]);

  useEffect(() => {
    if (videoSrc) {
      console.log(videoSrc);
      onVideoRecorded(videoSrc, ".mp4");
    } else if (mediaBlobUrl) {
      console.log(mediaBlobUrl);
      onVideoRecorded(mediaBlobUrl, ".webm");
    }
  }, [videoSrc, mediaBlobUrl, onVideoRecorded]);

  const handleRecord = () => {
    if (status === "recording") {
      stopRecording();
      pause();
    } else {
      clearBlobUrl();
      startRecording();
      const time = new Date();
      const expiryTimestamp = time.setSeconds(time.getSeconds() + 30);
      if (seconds < 30) restart(expiryTimestamp);
      else start();
    }
  };

  let recordButtonClass =
    "absolute left-1 bottom-1 bg-primaryRed p-5 rounded-full flex justify-center";
  let recordingButtonClass =
    "absolute left-1 bottom-1 bg-primaryRed  rounded-full flex justify-center p-3 left-3 bottom-3 rounded-md";
  return (
    <div className="flex justify-center flex-col items-center">
      <>
        <div className="relative w-full hidden md:flex lg:flex">
          {status === "stopped" ? (
            <video className="rounded-xl w-full" src={mediaBlobUrl} autoPlay />
          ) : (
            <video
              id="dj"
              className="rounded-xl w-full"
              ref={videoRef}
              autoPlay
            ></video>
          )}
          {status === "stopped" ? (
            <>
              <div className="absolute left-0  md:left-[14%] bottom-2 px-10 py-1 rounded-full  bg-red-800 opacity-80 ">
                <button
                  className="px-4 py-2 text-white font-bold"
                  onClick={clearBlobUrl}
                >
                  Clear
                </button>
              </div>
              <div className="absolute right-0 md:right-[14%]  bottom-2 px-4 py-1 sm:py-x-1 rounded-full  bg-Black2">
                <button
                  className="px-4 py-2 text-white font-bold"
                  onClick={handleRecord}
                >
                  Take Again
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="absolute left-[45%]	top-3 px-2 bg-Black2 text-white font-medium text-xl rounded-md">
                {minutes}:{seconds}
              </div>
              <div className="absolute left-[45%]	bottom-1 w-14 h-14 rounded-full border-4 border-white">
                <button
                  className={
                    status === "recording"
                      ? recordingButtonClass
                      : recordButtonClass
                  }
                  onClick={handleRecord}
                ></button>
              </div>
            </>
          )}
        </div>
        <div className="py-5 hidden md:flex lg:flex">OR</div>
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
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
      </>
    </div>
  );
}

export default RRCamera;
