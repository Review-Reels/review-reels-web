import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmbedReviewResponse } from "../apis/ReviewResponseApis";
import Loader from "../components/customComponents/Loader";
import Toast from "../components/customComponents/Toast";
import { ReviewResponse } from "../types";
import { getUrl } from "../utils/S3Utils";
import logo from "../images/LogoSmall.svg";

function VideoEmbed() {
  let { responseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [reviewResponse, setReviewResponse] = useState<ReviewResponse | null>(
    null
  );
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    setLoading(true);
    const id = responseId ? responseId : "";
    getEmbedReviewResponse(id)
      .then((res) => {
        setReviewResponse(res.data);
      })
      .catch((err) => {
        setShowToast({
          show: true,
          message: err.response.data.message,
          type: "failure",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [responseId]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center  justify-center" id="review">
      <div className="flex flex-col gap-2 justify-start items-center">
        <div className="flex gap-2 items-center">
          <div
            className={`flex rounded-full w-12 h-12 md:w-16 md:h-16 justify-center items-center bg-Peach_Orange`}
          >
            <p className="text-l md:text-3xl text-white uppercase">
              {reviewResponse?.customerName.charAt(0)}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">
              {reviewResponse?.customerName}
            </h3>
            <h5 className="text-base">{reviewResponse?.whatYouDo}</h5>
          </div>
        </div>
        {reviewResponse?.videoUrl ? (
          <div className="relative flex justify-center items-center cursor-pointer  p-4">
            <video
              className=" rounded-xl shadow-lg"
              src={getUrl(reviewResponse?.videoUrl)}
              controls
            ></video>
          </div>
        ) : (
          <div className="mt-4 text-center text-lg font-base	bg-Black1 text-black  font-semibold rounded-xl p-4">
            <p>{reviewResponse?.replyMessage}</p>
          </div>
        )}
        <div className="flex gap-4 text-Black2 m-4">
          powerd by <img src={logo} alt="review reels logo" />
        </div>
      </div>
      <Toast
        showToast={showToast.show}
        onClose={(value) => setShowToast((prev) => ({ ...prev, show: value }))}
        toastMessage={showToast.message}
        type={showToast.type}
      />
    </div>
  );
}

export default VideoEmbed;
