import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewRequestWithId } from "../apis/AskMessageApis";
import { AskMessage } from "../types";
import Modal from "../components/customComponents/Modal";
import ViewMessageComponent from "../components/ViewMessageComponent";
import RRCamera from "../components/customComponents/RRCamera.jsx";
import RRFileLoader from "../components/customComponents/RRFileLoader";
import { createReviewResponse } from "../apis/ReviewResponseApis";
import { useNavigate } from "react-router-dom";
import RRInput from "../components/customComponents/RRInput";
import RRTextArea from "../components/customComponents/RRTextArea";

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
  const [messageValidation, setMessageValidation] = useState("");
  const [videoValidation, setVideoValidation] = useState("");
  const [nameValidation, setNameValidation] = useState("");

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
    if (!isVideo && !replyMessage) {
      setMessageValidation("Reply message is required");
      return;
    }
    if (!customerName) {
      setNameValidation("Name is required");
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

  const handleReplyMessage = (value: string) => {
    if (!value) {
      setMessageValidation("Reply message is required");
    } else {
      setMessageValidation("");
    }
    setReplyMessage(value);
  };
  const handleNameChange = (value: string) => {
    if (!value) {
      setNameValidation("Name is required");
    } else {
      setNameValidation("");
    }
    setCustomerName(value);
  };

  return (
    <div className="flex justify-center items-center m-10 md:m-2">
      <ViewMessageComponent
        askMessage={askMessage}
        onReplyWithVideoClick={() => {
          setOpen(true);
          setIsVideo(true);
          setVideoValidation("");
        }}
        onReplyWithTextClick={() => {
          setOpen(true);
          setIsVideo(false);
          setVideoValidation("");
        }}
      />
      <Modal
        open={open}
        handleClose={setOpen}
        loading={loading}
        PrimaryButtonTitle="Submit"
        handlePrimaryAction={saveReviewResponse}
      >
        <div className="flex flex-col space-y-5">
          {isVideo && (
            <h2 className="text-xl font-semibold text-center">
              Few things remember before you record the testimonials
            </h2>
          )}
          <div className="bg-Peach_Cream-normal rounded p-2 ">
            <ul className="list-disc list-inside">
              <li>Try to to keep it on point.</li>
              {isVideo && (
                <>
                  <li>
                    Short videos of duration less than 60 seconds have maximum
                    impact compared to long one.
                  </li>
                  <li>
                    You can either upload pre shoot video or record using our
                    tool
                  </li>
                </>
              )}
            </ul>
          </div>
          {isVideo ? (
            <div className="flex justify-center flex-col items-center">
              <RRCamera
                onVideoRecorded={(recordedVideo: string, type: string) => {
                  setRecordedVideo(recordedVideo);
                  setVideoType(type);
                }}
              />
              <div className="py-5 hidden md:flex lg:flex">OR</div>
              <RRFileLoader
                onVideoRecorded={(recordedVideo: string, type: string) => {
                  setRecordedVideo(recordedVideo);
                  setVideoType(type);
                }}
              />
              <p className="text-red-500">{videoValidation}</p>
            </div>
          ) : (
            <div className="flex flex-col">
              <label className="first-letter:uppercase mb-2">
                reply message
              </label>
              <RRTextArea
                value={replyMessage}
                onChange={handleReplyMessage}
                validationText={messageValidation}
                rows={10}
                className="p-2 bg-Athens_Gray"
              />
            </div>
          )}
          <div className="flex flex-col">
            <label className="first-letter:uppercase mb-2">your name</label>
            <RRInput
              value={customerName}
              onChange={handleNameChange}
              validationText={nameValidation}
            />
          </div>
          <div className="flex flex-col">
            <label className="first-letter:uppercase mb-2">
              What you do / Company (optional)
            </label>
            <RRInput
              value={whatYouDo}
              onChange={(value) => setWhatYouDo(value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ViewAskMessage;
