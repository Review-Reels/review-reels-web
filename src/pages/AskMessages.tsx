import React, { Fragment, useEffect, useState } from "react";

import AskMessagesList from "../components/AskMessagesList";
import Toast from "../components/customComponents/Toast";
import Modal from "../components/customComponents/Modal";
import Button from "../components/customComponents/Button";
import RRCamera from "../components/customComponents/RRCamera.jsx";
import RRFileLoader from "../components/customComponents/RRFileLoader";

import { getReviewRequest, createReviewRequest } from "../apis/AskMessageApis";
import { AskMessage as AskMessageType } from "../types";
import RRInput from "../components/customComponents/RRInput";
import RRTextArea from "../components/customComponents/RRTextArea";

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
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [nameValidation, setNameValidation] = useState("");
  const [messageValidation, setMessageValidation] = useState("");
  const [videoValidation, setVideoValidation] = useState("");

  const handleOnChange = () => {
    setIsVideo(!isVideo);
  };

  useEffect(() => {
    setInitialLoading(true);
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
      })
      .finally(() => {
        setInitialLoading(false);
      });
  }, []);

  const saveAskMessage = async () => {
    if (!name) {
      setNameValidation("Ask message name is required");
      return;
    }
    if (!message) {
      setMessageValidation("Ask message is required");
      return;
    }
    if (isVideo && !recordedVideo) {
      setVideoValidation("Please record/upload a video before saving");
      return;
    }
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

  const handleNameChange = (value: string) => {
    if (!value) {
      setNameValidation("Ask message name is required");
    } else {
      setNameValidation("");
    }
    setName(value);
  };
  const handleMessageChange = (value: string) => {
    if (!value) {
      setMessageValidation("Ask message name is required");
    } else {
      setMessageValidation("");
    }
    setMessage(value);
  };

  return (
    <Fragment>
      <div className=" md:p-10 w-full mt-12">
        <AskMessagesList
          askMessages={askMessages}
          handleDelete={handleDelete}
          initialLoading={initialLoading}
        />
        <div className="flex justify-center">
          <div className="fixed bottom-4">
            <Button
              className="bg-primaryRed shadow-lg  drop-shadow-md first-letter:uppercase"
              onClick={() => setOpen(true)}
            >
              Create an ask message
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
                Create your testimonial message. This will be shown to your
                customers, let’s make it sound irresistible!
              </div>
              <div className="flex flex-col">
                <label className="first-letter:uppercase mb-2">
                  ask message name
                </label>
                <RRInput
                  className="p-3 bg-Athens_Gray"
                  value={name}
                  onChange={handleNameChange}
                  validationText={nameValidation}
                />
              </div>
              <div className="flex flex-col">
                <label className="first-letter:uppercase mb-2">
                  ask message
                </label>
                <RRTextArea
                  value={message}
                  onChange={handleMessageChange}
                  className="p-3  bg-Athens_Gray"
                  validationText={messageValidation}
                />
              </div>
              <p className="text-red-500">{videoValidation}</p>
              <div className="flex start">
                <input
                  type="checkbox"
                  checked={isVideo}
                  onChange={handleOnChange}
                  className="w-6 h-6 bg-gray-100 rounded border-gray-300 focus:none  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="first-letter:uppercase mx-2">
                  include the video ask message
                </label>
              </div>
              {isVideo && (
                <div className="flex justify-center flex-col items-center">
                  <RRCamera
                    onVideoRecorded={(recordedVideo: string, type: string) => {
                      setRecordedVideo(recordedVideo);
                      setVideoType(type);
                      setVideoValidation("");
                    }}
                  />
                  <div className="py-5 hidden md:flex lg:flex">OR</div>
                  <RRFileLoader
                    onVideoRecorded={(recordedVideo: string, type: string) => {
                      setRecordedVideo(recordedVideo);
                      setVideoType(type);
                      setVideoValidation("");
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
