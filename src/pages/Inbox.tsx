import React, { Fragment, useEffect, useState, useRef } from "react";
import { getReviewResponse, updateIsRead } from "../apis/ReviewResponseApis";
import { ReviewResponse } from "../types";
import { getUrl } from "../utils/S3Utils";
import { getElapsedTime } from "../utils/Time";
import Toast from "../components/customComponents/Toast";
import { colorList } from "../constants/ColorList";
import Modal from "../components/customComponents/Modal";

function Inbox() {
  const [reviewResponses, setReviewResponses] = useState<ReviewResponse[] | []>(
    []
  );
  const [reviewResponse, setReviewResponse] = useState<ReviewResponse | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getReviewResponse()
      .then((res) => {
        setReviewResponses(res.data);
      })
      .catch((err) => {
        setShowToast({
          show: true,
          message: err.response.data.message,
          type: "failure",
        });
      });
  }, []);

  const handleOpen = async (response: ReviewResponse) => {
    setReviewResponse(response);
    setOpen(true);
    try {
      if (response && !response.isRead)
        await updateIsRead({ isRead: true }, response.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="w-full overflow-hidden mt-12">
        <div className="w-full flex justify-center md:mx-4 my-2">
          <input
            type="text"
            className="mr-2 md:mr-10 p-3 pl-10 bg-Athens_Gray w-full rounded-xl focus:text-gray-700  focus:border-blue-600 focus:outline-none"
            placeholder="Search.."
          />
        </div>
        <div className="max-h-[35rem] md:max-h-[45rem] overflow-y-scroll md:h-auto m-2 md:m-10 lg:m-10">
          {reviewResponses.map((reviewResponse, index) => {
            const {
              id,
              customerName,
              updatedAt,
              imageUrl,
              isRead,
              requestMessageId,
            } = reviewResponse;
            return (
              <div
                className="flex border-b-2 border-Black7 cursor-pointer"
                key={id}
                onClick={() => handleOpen(reviewResponse)}
              >
                <div className="flex justify-center items-center gap-1">
                  <div
                    className={`flex rounded-full w-12 h-12 md:w-16 md:h-16 justify-center items-center bg-${
                      colorList[index % 3]
                    }`}
                  >
                    <p className="text-l md:text-3xl text-white uppercase">
                      {customerName.charAt(0)}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center m-4">
                    <h3
                      className={`${
                        isRead ? "text-Black2" : "text-black"
                      } font-bold	text-xl`}
                    >
                      {customerName}
                    </h3>
                    <div className="flex gap-4">
                      <h6
                        className={`${
                          isRead ? "text-Black2" : "text-black"
                        } text-lg`}
                      >
                        {requestMessageId
                          ? imageUrl
                            ? "shared a video review"
                            : "shared a text review"
                          : "Send Email"}
                      </h6>
                      <ul
                        className={` ${
                          isRead ? "text-Black2" : "text-black"
                        } text-lg list-outside list-disc ml-2`}
                      >
                        <li>{getElapsedTime(updatedAt)}</li>
                      </ul>
                    </div>
                  </div>

                  {imageUrl && !isRead && (
                    <div className="flex justify-center content-center">
                      <img
                        src={getUrl(imageUrl)}
                        alt="response"
                        className="w-8 md:w-10 rounded-lg md:ml-10"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <Toast
          showToast={showToast.show}
          onClose={(value) =>
            setShowToast((prev) => ({ ...prev, show: value }))
          }
          toastMessage={showToast.message}
          type={showToast.type}
        />
        <Modal open={open} handleClose={setOpen}>
          <div>
            {reviewResponse?.videoUrl ? (
              <div className="relative flex justify-center items-center cursor-pointer">
                <video
                  className=" md:w-1/2 lg:w-1/2"
                  src={getUrl(reviewResponse?.videoUrl)}
                  ref={videoRef}
                  controls
                ></video>
              </div>
            ) : (
              <div className="mt-4 text-center text-lg	font-base	">
                <p>{reviewResponse?.replyMessage}</p>
              </div>
            )}
            <div className="mt-4 text-center text-lg	font-semibold	">
              <p>{reviewResponse?.customerName}</p>
            </div>
          </div>
        </Modal>
      </div>
    </Fragment>
  );
}

export default Inbox;
