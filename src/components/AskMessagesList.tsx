import React, { useState } from "react";
import Modal from "../components/customComponents/Modal";
import Button from "../components/customComponents/Button";
import RRCamera from "../components/customComponents/RRCamera.jsx";

function AskMessagesList() {
  const [open, setOpen] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  const handleOnChange = () => {
    setIsVideo(!isVideo);
  };
  return (
    <div className="relative w-1/2">
      <Button
        onClick={() => setOpen(true)}
        className="mt-10 m-10 fixed bottom-4 left-1/4"
      >
        Create an Ask Message
      </Button>
      <Modal
        open={open}
        handleClose={setOpen}
        title="Create new Ask message here"
        PrimaryButtonTitle="Save Ask Message"
      >
        <div className="flex flex-col space-y-5">
          <div className="bg-Peach_Cream-normal rounded p-2">
            The card below will be shown to your customers as a message from
            you. Let’s make it sound irresistable!
          </div>
          <div className="flex flex-col">
            <label className="uppercase mb-2">ask message name</label>
            <input type="text" className="p-3 bg-Athens_Gray" />
          </div>
          <div className="flex flex-col">
            <label className="uppercase mb-2">ask message</label>
            <textarea className="p-3  bg-Athens_Gray" />
          </div>
          <div className="flex flex-col">
            <label className="uppercase mb-2">questions on ask message</label>
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
            <div className="flex justify-center">
              <RRCamera />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default AskMessagesList;
