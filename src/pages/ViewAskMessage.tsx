import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewRequestWithId } from "../apis/AskMessageApis";
import { AskMessage } from "../types";
import Modal from "../components/customComponents/Modal";
import ViewMessageComponent from "../components/ViewMessageComponent";
import RRCamera from "../components/customComponents/RRCamera.jsx";
import { createReviewResponse } from "../apis/ReviewResponseApis";
import { useNavigate } from "react-router-dom";

function ViewAskMessage() {
  let navigate = useNavigate();
  // const videoRef = useRef<HTMLVideoElement>(null);
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
      <ViewMessageComponent
        askMessage={askMessage}
        onReplyWithVideoClick={() => {
          setOpen(true);
          setIsVideo(true);
        }}
        onReplyWithTextClick={() => {
          setOpen(true);
          setIsVideo(false);
        }}
      />
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
