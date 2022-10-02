import React, { useState } from "react";
import { TrashSimple, Export, Link as LinkIcon } from "phosphor-react";
import { AskMessage } from "../types";
import { getUrl, getWebUrl } from "../utils/S3Utils";
import { deleteReviewRequest } from "../apis/AskMessageApis";
import Modal from "../components/customComponents/Modal";
import ViewMessageComponent from "../components/ViewMessageComponent";

import { Link } from "react-router-dom";
import Button from "../components/customComponents/Button";
import Toast from "../components/customComponents/Toast";
import { colorList } from "../constants/ColorList";
import { getFormatedDate } from "../utils/Time";
import EmptyAskMessageIcon from "../images/EmptyAskMessage.svg";

interface propType {
  askMessages: AskMessage[];
  initialLoading?: boolean;
  handleDelete?: (id: string) => void;
  handleClickItem?: (item: AskMessage) => void;
}

function AskMessagesList({
  askMessages,
  handleDelete,
  handleClickItem,
  initialLoading,
}: propType) {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState("");

  const [askMessage, setAskMessage] = useState<AskMessage>();
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const deleteAskMessage = async (id: string) => {
    try {
      await deleteReviewRequest(id);
      if (handleDelete) handleDelete(id);
      setShowToast({ show: true, message: "Deleted", type: "success" });
      setDeleteOpen(false);
    } catch (err) {
      setShowToast({
        show: true,
        message: "Something went wrong!",
        type: "failure",
      });
      console.log(err);
    }
  };

  const handleClick = (item: AskMessage) => {
    if (handleClickItem) handleClickItem(item);
    else {
      setAskMessage(item);
      setOpen(true);
      setCopied(false);
    }
  };
  if (askMessages.length === 0 && !initialLoading)
    return (
      <div className="w-full flex justify-center items-center flex-col gap-4 h-full">
        <img src={EmptyAskMessageIcon} width={200} alt="empty ask message" />
        <h1 className="text-2xl font-bold text-center text-Black5">
          Welcome to ReviewReels- An easy way to collect the testimonials and
          publish!
        </h1>
        <h2 className="text-xl font-medium text-center text-Black2">
          Let's quickly get started with, Creating your first ask message
        </h2>
        <h3 className="text-xl text-center text-Black2">
          Need more help in getting started?- Ask us
        </h3>
      </div>
    );

  return (
    <div className="w-full">
      {/* <div className="w-full flex justify-center mx-4 my-2">
        <input
          type="text"
          className="mr-2 md:mr-10 p-3 pl-10  w-full rounded-xl bg-Athens_Gray focus:text-gray-700  focus:border-blue-600 focus:outline-none"
          placeholder="Search.."
        />
      </div> */}
      <div className="max-h-[45rem] overflow-y-auto md:h-auto">
        {askMessages.map((item, index) => {
          const { askMessage, createdAt, imageUrl, id, name } = item;
          return (
            <div
              className="flex m-2 rounded-xl shadow-md flex-col bg-white"
              key={id}
            >
              <div className="flex p-2 md:gap-5 cursor-pointer  flex-col-reverse md:flex-row ">
                <div
                  className="flex flex-col md:flex-row p-2 gap-5 w-full md:min-w-[40rem]"
                  onClick={() => handleClick(item)}
                >
                  {imageUrl ? (
                    <div className="md:w-20 flex justify-center items-center">
                      <img
                        src={getUrl(imageUrl)}
                        alt={id}
                        className="h-400 md:h-[121px] rounded-xl w-full"
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex md:h-[121px] w-full md:w-20 h-80 rounded-xl  uppercase justify-center items-center	text-white text-4xl bg-${
                        colorList[index % 3]
                      }`}
                    >
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
                {!handleClickItem && (
                  <div className="cursor-pointer flex gap-2 justify-end px-2 py-4">
                    {/* <div
                      className="flex rounded-full bg-Black6 h-10 w-10 justify-center items-center"
                      onClick={() => console.log("jhgh")}
                    >
                      <PencilSimple size={28} />
                    </div> */}
                    <div
                      className="flex rounded-full bg-Black6 h-10 w-10 justify-center items-center"
                      onClick={() => {
                        setDeleteOpen(true);
                        setDeleteId(id);
                      }}
                    >
                      <TrashSimple size={28} />
                    </div>
                  </div>
                )}
              </div>
              <div className="self-end font-thin text-xs mr-2 mb-2">
                <p> {getFormatedDate(createdAt, "DD-MM-YYYY")}</p>
              </div>
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
            <Link
              to={`/view/${askMessage?.id}`}
              className="flex gap-2 items-center"
              target="_blank"
            >
              <LinkIcon size={22} weight="bold" />
              <h1 className="text-xl text-Black underline text-clip">
                {getWebUrl(`view/${askMessage?.id}`)}
              </h1>
            </Link>
            <p className="text-Black2">
              The testimonial message is available on the above link. Share with
              your customers to get testimonials.
            </p>
            <div className="flex flex-col md:flex-row">
              {/* <Button className="bg-Black4">
                <Copy size={32} className="mr-2" />
                Share
              </Button> */}
              <Button
                className="bg-Black4"
                onClick={() => {
                  navigator.clipboard.writeText(
                    getWebUrl(`view/${askMessage?.id}`)
                  );
                  setCopied(true);
                }}
              >
                <Export size={24} className="mr-2" />
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            </div>
          </div>
          {/* <div className="bg-Sweet_Pink mb-6 p-4 rounded-lg flex flex-col gap-2">
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
          </div> */}
          <div className="flex justify-center items-center cursor-pointer m-2">
            <h3 className="text-xl text-Charade font-medium	 text-center">
              This is how your ask message will be shown to users.
            </h3>
          </div>
          <div className=" flex justify-center items-center cursor-pointer">
            <ViewMessageComponent askMessage={askMessage} />
          </div>
        </div>
      </Modal>
      <Modal
        open={deleteOpen}
        handleClose={setDeleteOpen}
        handlePrimaryAction={() => deleteAskMessage(deleteId)}
        handleSecondaryAction={() => {
          setDeleteOpen(false);
          setDeleteId("");
        }}
        title="Delete"
        PrimaryButtonTitle="Yes"
        secondaryTitle="No"
      >
        <p className="text-primaryRed text-xl text-center font-medium">
          All the customer replies to this message will be deleted. Do you want
          to proceed?
        </p>
      </Modal>
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
