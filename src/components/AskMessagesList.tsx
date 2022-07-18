import React, { useState, useRef } from "react";
import {
  DotsThreeOutlineVertical,
  PencilSimple,
  TrashSimple,
  Copy,
  Export,
} from "phosphor-react";
import { AskMessage } from "../types";
import { getUrl, getWebUrl } from "../utils/S3Utils";
import { deleteReviewRequest } from "../apis/AskMessageApis";
import Modal from "../components/customComponents/Modal";
import playButton from "../images/PlayButton.svg";

import { Link } from "react-router-dom";
import Button from "../components/customComponents/Button";
import Toast from "../components/customComponents/Toast";

interface propType {
  askMessages: AskMessage[];
  handleDelete: (id: string) => void;
}

function AskMessagesList({ askMessages, handleDelete }: propType) {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [askMessage, setAskMessage] = useState<AskMessage>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handlePlay = () => {
    if (videoRef?.current?.paused) {
      videoRef?.current?.play();
      setPlaying(true);
    } else {
      videoRef?.current?.pause();
      setPlaying(false);
    }
  };
  const deleteAskMessage = async (id: string) => {
    try {
      await deleteReviewRequest(id);
      handleDelete(id);
      setShowToast({ show: true, message: "Deleted", type: "success" });
    } catch (err) {
      setShowToast({
        show: true,
        message: "Something went wrong!",
        type: "failure",
      });
      console.log(err);
    }
  };
  return (
    <div className="w-full">
      <div className="w-full flex justify-center mx-4 my-2">
        <input
          type="text"
          className="p-3 pl-10 bg-Athens_Gray w-full rounded-xl focus:text-gray-700  focus:border-blue-600 focus:outline-none"
          placeholder="Search.."
        />
      </div>
      <div className="max-h-[45rem] overflow-y-scroll md:h-auto">
        {askMessages.map((item, index) => {
          const { askMessage, createdAt, imageUrl, id, name } = item;
          return (
            <div className="flex p-2 rounded-xl shadow-md flex-col" key={id}>
              <div className="flex p-2 md:gap-5 cursor-pointer  flex-col-reverse md:flex-row ">
                <div
                  className="flex flex-col md:flex-row p-2 gap-5 w-full md:min-w-[40rem]"
                  onClick={() => {
                    setAskMessage(item);
                    setOpen(true);
                  }}
                >
                  {imageUrl ? (
                    <img
                      src={getUrl(imageUrl)}
                      alt={id}
                      className="h-400 md:h-[121px] w=[85px] rounded-xl"
                    />
                  ) : (
                    <div className="flex md:h-[121px] w-full md:w-24 h-80 rounded-xl bg-Peach_Orange uppercase justify-center items-center	text-white text-4xl">
                      {name.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col text-justify">
                    <h3 className="text-lg font-medium">{name}</h3>
                    <p className="text-slate-600 text-justify break-word">
                      {askMessage}
                    </p>
                  </div>
                </div>
                <div className="cursor-pointer flex gap-2 justify-end px-2 py-4">
                  <PencilSimple
                    size={28}
                    onClick={() => console.log("jhgh")}
                    weight="bold"
                  />
                  <TrashSimple
                    weight="bold"
                    size={28}
                    onClick={() => deleteAskMessage(id)}
                  />
                </div>
              </div>
              <div className="self-end font-thin text-xs">{createdAt}</div>
            </div>
          );
        })}
      </div>
      <Modal
        open={open}
        handleClose={setOpen}
        handlePrimaryAction={() => console.log("dhjd")}
      >
        <div>
          <div className="bg-Anakiwa mb-6 p-4 rounded-lg flex flex-col gap-2">
            <h2 className="uppercase font-medium">share using link</h2>
            <Link to={`/view/${askMessage?.id}`} className="text-clip">
              <h1 className="text-xl">{getWebUrl(`view/${askMessage?.id}`)}</h1>
            </Link>
            <p className="text-Black2">
              Your ask message is available on the above link, share with
              customers to get reviews.
            </p>
            <div className="flex flex-col md:flex-row">
              <Button className="bg-Black4">
                <Copy size={32} className="mr-2" />
                Share
              </Button>
              <Button
                className="bg-Black4"
                onClick={() => {
                  navigator.clipboard.writeText(
                    getWebUrl(`view/${askMessage?.id}`)
                  );
                  setCopied(true);
                }}
              >
                <Export size={32} className="mr-2" />
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            </div>
          </div>
          <div className="bg-Sweet_Pink mb-6 p-4 rounded-lg flex flex-col gap-2">
            <h2 className="uppercase font-medium">share using emails</h2>
            <p className="text-Black2">
              Send emails to your contact list with the ask message and let them
              reply with reviews. Also, you can follow-up later.
            </p>
            <div>
              <Button className="bg-Black4">
                <Copy size={32} className="mr-2" />
                Send Emails
              </Button>
            </div>
          </div>
          <div
            className="relative flex justify-center items-center cursor-pointer"
            onClick={handlePlay}
          >
            <video
              className=" md:w-1/2 lg:w-1/2"
              src={getUrl(askMessage?.videoUrl)}
              ref={videoRef}
            ></video>
            {!playing && (
              <div className="absolute justify-center items-center">
                <img src={playButton} alt="play button hover:scale-50" />
              </div>
            )}
          </div>
          <div className="mt-4 text-center text-lg	font-semibold	">
            <p>{askMessage?.askMessage}</p>
          </div>
        </div>
      </Modal>{" "}
      <Toast
        showToast={showToast.show}
        onClose={(value) => setShowToast((prev) => ({ ...prev, show: value }))}
        toastMessage={showToast.message}
        type={showToast.type}
      />
    </div>
  );
}

export default AskMessagesList;
