import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getReviewRequestWithId } from "../apis/AskMessageApis";
import { AskMessage } from "../types";
import logo from "../images/LogoSmall.svg";
import Modal from "../components/customComponents/Modal";
import Button from "../components/customComponents/Button";
import RRCamera from "../components/customComponents/RRCamera.jsx";

import { VideoCamera } from "phosphor-react";
import { createReviewResponse } from "../apis/ReviewResponseApis";

import { getUrl } from "../utils/S3Utils";
import { useNavigate } from "react-router-dom";

function ViewAskMessage() {
  let navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideo, setIsVideo] = useState(true);
  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [whatYouDo, setWhatYouDo] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [recordedVideo, setRecordedVideo] = useState<string>("");
  const [videoType, setVideoType] = useState<string>("");
  const [replyMessage, setReplyMessage] = useState<string>("");

  const [askMessage, setAskMessage] = useState<AskMessage>();
  let { requestId } = useParams();

  const callApi = React.useCallback(async () => {
    if (requestId) {
      const { data } = await getReviewRequestWithId(requestId);
      setAskMessage(data);
    }
  }, [requestId]);

  React.useEffect(() => {
    callApi();
  }, [callApi]);

  const saveReviewResponse = async () => {
    setLoading(true);
    let formData = new FormData();
    let blob = await fetch(recordedVideo).then((r) => r.blob());

    if (isVideo && recordedVideo) {
      formData.append("fileName", blob);
      formData.append("extension", videoType);
    } else {
      formData.append("replyMessage", replyMessage);
    }
    formData.append("customerName", customerName);
    formData.append("whatYouDo", whatYouDo);
    if (requestId) formData.append("reviewRequestId", requestId);

    createReviewResponse(formData)
      .then((res) => {
        setOpen(false);
        navigate("/thankyou");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  return (
    <div className="flex justify-center items-center m-10 md:m-0 h-screen">
      <div className="flex justify-center items-center flex-col md:w-[30rem] md:shadow-lg md:shadow-slate-200 lg:shadow-lg lg:shadow-slate-200">
        <div className="relative flex justify-center items-center cursor-pointer  md:w-[20rem]">
          {askMessage?.videoUrl && (
            <video
              src={getUrl(askMessage?.videoUrl)}
              ref={videoRef}
              className="rounded-xl w-full"
              controls
            ></video>
          )}
        </div>
        <div className="mt-4 text-center text-lg	font-semibold md:px-20 lg:px-20">
          <p>{askMessage?.askMessage}</p>
        </div>
        <div className="flex flex-col">
          <Button
            className="bg-primaryRed shadow-lg  drop-shadow-md my-4 px-10 flex gap-4"
            onClick={() => {
              setOpen(true);
              setIsVideo(true);
            }}
          >
            <VideoCamera size={28} weight="bold" />
            Reply with video
          </Button>
          <Button
            className="bg-Black5 shadow-lg  drop-shadow-md px-20"
            onClick={() => {
              setIsVideo(false);
              setOpen(true);
            }}
          >
            Reply with text
          </Button>
        </div>
        <div className="flex gap-4 text-Black2 m-4">
          powerd by <img src={logo} alt="review reels logo" />
        </div>
      </div>
      <Modal
        open={open}
        handleClose={setOpen}
        loading={loading}
        PrimaryButtonTitle="Save"
        handlePrimaryAction={saveReviewResponse}
      >
        <div className="flex flex-col space-y-5">
          <div className="bg-Peach_Cream-normal rounded p-2 ">
            <ul className="list-disc">
              <li>
                Please try to keep it on point, so that your customers get it
                easily.
              </li>
              {isVideo && (
                <>
                  <li>
                    You can create a short video of duration less than 60
                    seconds.
                  </li>
                  <li>
                    You can upload a video from phone or you can record one.
                  </li>
                </>
              )}
            </ul>
          </div>
          {isVideo ? (
            <div>
              <RRCamera
                onVideoRecorded={(recordedVideo: string, type: string) => {
                  setRecordedVideo(recordedVideo);
                  setVideoType(type);
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <label className="uppercase mb-2">reply message</label>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={10}
                className="p-2 bg-Athens_Gray"
              />
            </div>
          )}
          <div className="flex flex-col">
            <label className="uppercase mb-2">your name</label>
            <input
              type="text"
              className="p-3 bg-Athens_Gray"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="uppercase mb-2">What you do (optional)</label>
            <input
              type="text"
              className="p-3 bg-Athens_Gray"
              value={whatYouDo}
              onChange={(e) => setWhatYouDo(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ViewAskMessage;
