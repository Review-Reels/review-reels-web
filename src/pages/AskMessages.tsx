import React, { Fragment, useEffect } from "react";

import AskMessagesList from "../components/AskMessagesList";
// import RRCamera from "../components/customComponents/RRCamera.jsx";
import { getReviewRequest } from "../apis/AskMessageApis";
const AskMessages = () => {
  useEffect(() => {
    getReviewRequest()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Fragment>
      <div className="flex justify-between flex-auto">
        <AskMessagesList />
        {/* <RRCamera /> */}
      </div>
    </Fragment>
  );
};

export default AskMessages;
