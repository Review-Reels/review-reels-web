import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getReviewRequestWithId } from "../apis/AskMessageApis";
import { AskMessage } from "../types";

import playButton from "../images/PlayButton.svg";

import { getUrl } from "../utils/S3Utils";
function ViewAskMessage(props: any) {
  console.log(props);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [askMessage, setAskMessage] = useState<AskMessage>();
  let { requestId } = useParams();

  const callApi = React.useCallback(async () => {
    if (requestId) {
      const { data } = await getReviewRequestWithId(requestId);
      setAskMessage(data);
    }
  }, [requestId]);

  React.useEffect(() => {
    console.log("dfj");
    callApi();
  }, [callApi]);

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
    <div className="flex justify-center items-center flex-col m-10">
      <div
        className="relative flex justify-center items-center cursor-pointer  md:w-1/4"
        onClick={handlePlay}
      >
        <video src={getUrl(askMessage?.videoUrl)} ref={videoRef}></video>
        {!playing && (
          <div className="absolute justify-center items-center">
            <img src={playButton} alt="play button hover:scale-50" />
          </div>
        )}
      </div>
      <div className="mt-4 text-center text-lg	font-semibold	 md:w-1/4">
        <p>{askMessage?.askMessage}</p>
      </div>
    </div>
  );
}

export default ViewAskMessage;
