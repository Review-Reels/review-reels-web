import React, { Fragment, useEffect, useState } from "react";

import AskMessagesList from "../components/AskMessagesList";
import Toast from "../components/customComponents/Toast";
import Modal from "../components/customComponents/Modal";
import Button from "../components/customComponents/Button";
import RRCamera from "../components/customComponents/RRCamera.jsx";

import { getReviewRequest, createReviewRequest } from "../apis/AskMessageApis";
import { AskMessage as AskMessageType } from "../types";

const AskMessages = () => {
  const [askMessages, setAskMessages] = useState<AskMessageType[] | []>([]);
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
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    let formData = new FormData();
    let blob = await fetch(recordedVideo).then((r) => r.blob());

    if (isVideo && recordedVideo) {
      formData.append("fileName", blob);
      formData.append("extension", videoType);
    }
    formData.append("name", name);
    formData.append("askMessage", message);

    createReviewRequest(formData)
      .then((res) => {
        const data: AskMessageType = res.data;
        const addedMessage = [{ ...data }, ...askMessages];
        setAskMessages(addedMessage);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };
  const handleDelete = (id: string) => {
    setAskMessages((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Fragment>
      <div className=" md:p-10 w-full mt-12">
        <AskMessagesList
          askMessages={askMessages}
          handleDelete={handleDelete}
        />
        <div className="flex justify-center">
          <div className="fixed bottom-4">
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
            loading={loading}
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
