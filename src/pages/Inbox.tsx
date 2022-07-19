import React, { Fragment, useEffect, useState, useRef } from "react";
import { getReviewResponse } from "../apis/ReviewResponseApis";
import { ReviewResponse } from "../types";
import { getUrl } from "../utils/S3Utils";
import { getElapsedTime } from "../utils/Time";
import Toast from "../components/customComponents/Toast";
import { colorList } from "../constants/ColorList";
import Modal from "../components/customComponents/Modal";
import playButton from "../images/PlayButton.svg";

function Inbox() {
  const [reviewResponses, setReviewResponses] = useState<ReviewResponse[] | []>(
    []
  );
  const [reviewResponse, setReviewResponse] = useState<ReviewResponse | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getReviewResponse()
      .then((res) => {
        console.log(res);
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

  const handlePlay = () => {
    if (videoRef?.current?.paused) {
      videoRef?.current?.play();
      setPlaying(true);
    } else {
      videoRef?.current?.pause();
      setPlaying(false);
    }
  };

  return (
    <Fragment>
      <div className="w-full overflow-hidden">
        <div className="w-full flex justify-center md:mx-4 my-2">
          <input
            type="text"
            className="p-3 pl-10 bg-Athens_Gray w-full rounded-xl focus:text-gray-700  focus:border-blue-600 focus:outline-none"
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
                onClick={() => {
                  setReviewResponse(reviewResponse);
                  setOpen(true);
                }}
              >
                <div className="flex justify-center items-center gap-1">
                  <div
                    className={`flex rounded-full  w-16 h-16 min-w-16 min-h-16 justify-center items-center bg-${
                      colorList[index % 3]
                    }`}
                  >
                    <p className="text-3xl text-white uppercase">
                      {customerName.charAt(0)}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center m-4">
                    <h3 className="text-Black2 font-bold	text-xl">
                      {customerName}
                    </h3>
                    <h6 className="text-Black2 text-lg">
                      {requestMessageId
                        ? "shared a video review"
                        : "Send Email"}
                      <div>{getElapsedTime(updatedAt)}</div>
                    </h6>
                  </div>

                  {imageUrl && !isRead && (
                    <div>
                      <img
                        src={getUrl(imageUrl)}
                        alt="response"
                        className="w-8 rounded-lg"
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
        <Modal
          open={open}
          handleClose={setOpen}
          handlePrimaryAction={() => console.log("dhjd")}
        >
          <div>
            <div
              className="relative flex justify-center items-center cursor-pointer"
              onClick={handlePlay}
            >
              <video
                className=" md:w-1/2 lg:w-1/2"
                src={getUrl(reviewResponse?.videoUrl)}
                ref={videoRef}
              ></video>
              {!playing && (
                <div className="absolute justify-center items-center">
                  <img src={playButton} alt="play button hover:scale-50" />
                </div>
              )}
            </div>
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
