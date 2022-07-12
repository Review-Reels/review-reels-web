import React, { Fragment, useEffect, useState } from "react";

import AskMessagesList from "../components/AskMessagesList";
import Toast from "../components/customComponents/Toast";
import Modal from "../components/customComponents/Modal";
import Button from "../components/customComponents/Button";
import RRCamera from "../components/customComponents/RRCamera.jsx";

import { getReviewRequest, createReviewRequest } from "../apis/AskMessageApis";
import { AskMessage as AskMessagesType } from "../types";

const AskMessages = () => {
  const [askMessages, setAskMessages] = useState<[AskMessagesType] | []>([]);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [open, setOpen] = useState(false);
  const [isVideo, setIsVideo] = useState(true);
  const [recordedVideo, setRecordedVideo] = useState<string>("");
  const [videoType, setVideoType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleOnChange = () => {
    setIsVideo(!isVideo);
  };

  useEffect(() => {
    getReviewRequest()
      .then((res) => {
        setAskMessages(res.data);
      })
      .catch((err) => {
        setShowToast({
          show: true,
          message: err.response.data.message,
          type: "failure",
        });
      });
  }, []);

  const saveAskMessage = async () => {
    let formData = new FormData();
    let blob = await fetch(recordedVideo).then((r) => r.blob());
    console.log(blob);

    formData.append("fileName", blob);
    formData.append("name", name);
    formData.append("askMessage", message);
    formData.append("extension", videoType);

    createReviewRequest(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Fragment>
      <div className="bg-[linear-gradient(180.98deg, rgba(217, 217, 217, 0.1272) 0.78%, rgba(217, 217, 217, 0.072) 107.47%)] md:m-10  ">
        <AskMessagesList askMessages={askMessages} />
        <div className="relative">
          <div className="fixed bottom-4 left-1/4 md:left-1/2 md:right-1/2 md:w-full ">
            <Button
              className="bg-primaryRed shadow-lg  drop-shadow-md"
              onClick={() => setOpen(true)}
            >
              Create an Ask Message
            </Button>
          </div>
          <Modal
            open={open}
            handleClose={setOpen}
            title="Create new Ask message here"
            PrimaryButtonTitle="Save Ask Message"
            handlePrimaryAction={saveAskMessage}
          >
            <div className="flex flex-col space-y-5">
              <div className="bg-Peach_Cream-normal rounded p-2">
                The card below will be shown to your customers as a message from
                you. Let’s make it sound irresistable!
              </div>
              <div className="flex flex-col">
                <label className="uppercase mb-2">ask message name</label>
                <input
                  type="text"
                  className="p-3 bg-Athens_Gray"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="uppercase mb-2">ask message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="p-3  bg-Athens_Gray"
                />
              </div>
              <div className="flex flex-col">
                <label className="uppercase mb-2">
                  questions on ask message
                </label>
                <textarea className="p-3  bg-Athens_Gray" />
              </div>
              <div className="flex start">
                <input
                  type="checkbox"
                  checked={isVideo}
                  onChange={handleOnChange}
                  className="w-6 h-6 bg-gray-100 rounded border-gray-300 focus:none  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="uppercase mx-2">include video</label>
              </div>
              {isVideo && (
                <div>
                  <RRCamera
                    onVideoRecorded={(recordedVideo: string, type: string) => {
                      setRecordedVideo(recordedVideo);
                      setVideoType(type);
                    }}
                  />
                </div>
              )}
            </div>
          </Modal>
        </div>
      </div>
      <Toast
        showToast={showToast.show}
        onClose={(value) => setShowToast((prev) => ({ ...prev, show: value }))}
        toastMessage={showToast.message}
        type={showToast.type}
      />
    </Fragment>
  );
};

export default AskMessages;
