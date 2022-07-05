import React, { Fragment } from "react";

import AskMessagesList from "../components/AskMessagesList";
import RRCamera from "../components/customComponents/RRCamera.jsx";
const AskMessages = () => {
  return (
    <Fragment>
      <div className="flex justify-between flex-auto">
        <AskMessagesList />
        <RRCamera />

        <div>dsjhf</div>
        <div>dsjhf</div>
      </div>
    </Fragment>
  );
};

export default AskMessages;
