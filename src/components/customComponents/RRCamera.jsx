import React, { useRef, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "user" },
};
function RRCamera() {
  const videoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia(CAPTURE_OPTIONS)
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div>
      <div className="relative">
        <ReactMediaRecorder
          video
          MediaTrackConstraints={CAPTURE_OPTIONS}
          render={({
            status,
            startRecording,
            stopRecording,
            mediaBlobUrl,
            previewStream,
          }) => (
            <div>
              <p>{status}</p>
              <video ref={videoRef} width={800} height={600}></video>
              <button
                className="absolute inset-x-0 bottom-0"
                onClick={startRecording}
              >
                start
              </button>
              <button onClick={stopRecording}>Stop </button>
              {status === "stopped" ? (
                <video src={mediaBlobUrl} controls autoPlay />
              ) : (
                <VideoPreview stream={previewStream} />
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default RRCamera;

const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} width={500} height={500} autoPlay />;
};
