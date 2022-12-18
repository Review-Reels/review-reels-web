import React from "react";
import GridLayout from "react-grid-layout";
import EmbedComponent from "../components/EmbedComponent";

type ReviewResponse = {
  id: string;
  replyMessage: string;
  customerName: string;
  whatYouDo: string;
  imageUrl: string;
  videoUrl: string;
  size: number;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  requestMessageId: string;
  EmailTracker: [];
  dataGrid: Object;
};
const Drag = () => {
  //   const layout = [
  //     { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
  //     { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  //     { i: "c", x: 4, y: 0, w: 1, h: 2 },
  //   ];
  const review: Array<ReviewResponse> = [
    {
      id: "450ecce1-0af7-40b8-bb67-268060c65a78",
      replyMessage: "dskefjsf",
      customerName: "sdfj",
      whatYouDo: "sgs",
      videoUrl: "",
      imageUrl: "",
      size: 0,
      createdAt: "2022-09-12T04:27:00.912Z",
      updatedAt: "2022-09-12T04:27:00.912Z",
      isRead: true,
      requestMessageId: "af34ccd6-644f-4a57-9b1b-5538e0093fcb",
      dataGrid: { x: 1, y: 0, w: 1.5, h: 5 },
      EmailTracker: [],
    },
    {
      id: "4d496d7a-018b-4969-b819-cc6ccdf0aaf0",
      replyMessage: "sdkjfsf",
      customerName: "df",
      whatYouDo: "sdf",
      videoUrl: "",
      imageUrl: "",
      size: 0,
      createdAt: "2022-08-21T07:46:29.110Z",
      updatedAt: "2022-08-21T07:46:29.110Z",
      isRead: true,
      requestMessageId: "af34ccd6-644f-4a57-9b1b-5538e0093fcb",
      dataGrid: { x: 2, y: 0, w: 1.5, h: 5 },
      EmailTracker: [],
    },
    {
      id: "c6ea2ae5-7708-43ab-b7b7-c9ada393d4c7",
      replyMessage:
        "Hello, We really liked your product.\r\nWith your product we are able to do a lot of things sensitively over the years.\r\nThank you for such amazing product",
      customerName: "Maveric",
      whatYouDo: "Top Gun",
      videoUrl: "",
      imageUrl: "",
      size: 0,
      createdAt: "2022-07-31T04:42:03.873Z",
      updatedAt: "2022-07-31T04:42:03.873Z",
      isRead: true,
      requestMessageId: "d6c3b432-6340-4cfd-a531-1a92c08a4880",
      dataGrid: { x: 3, y: 0, w: 1.5, h: 5 },
      EmailTracker: [],
    },
  ];
  return (
    <div className="mt-14">
      <GridLayout
        className="layout"
        // layout={layout}
        cols={4}
        rowHeight={30}
        width={1200}
        autoSize={true}
        onLayoutChange={(layout) => console.log(layout)}
      >
        {/* <div key="a" className="bg-primaryRed">
          a
        </div>
        <div key="b" className="bg-primaryRed">
          b
        </div>
        <div key="c" className="bg-primaryRed">
          c
        </div> */}
        {review.map((item) => (
          <div
            key={item.id}
            data-grid={{ ...item.dataGrid }}
            // className="w-fit h-fit"
          >
            <EmbedComponent reviewResponse={item} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Drag;
