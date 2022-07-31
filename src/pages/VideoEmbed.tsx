import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmbedReviewResponse } from "../apis/ReviewResponseApis";
import Loader from "../components/customComponents/Loader";
import Toast from "../components/customComponents/Toast";
import { ReviewResponse } from "../types";

import EmbedComponent from "../components/EmbedComponent";

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
    <>
      {reviewResponse && <EmbedComponent reviewResponse={reviewResponse} />}
      <Toast
        showToast={showToast.show}
        onClose={(value) => setShowToast((prev) => ({ ...prev, show: value }))}
        toastMessage={showToast.message}
        type={showToast.type}
      />
    </>
  );
}

export default VideoEmbed;
