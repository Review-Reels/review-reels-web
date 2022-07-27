import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  ChangeEvent,
} from "react";
import { getReviewResponse, updateIsRead } from "../apis/ReviewResponseApis";
import { getReviewRequest } from "../apis/AskMessageApis";
import { ReviewResponse, AskMessage } from "../types";
import { getUrl, getWebUrl } from "../utils/S3Utils";
import { getElapsedTime } from "../utils/Time";
import Toast from "../components/customComponents/Toast";
import { colorList } from "../constants/ColorList";
import Modal from "../components/customComponents/Modal";
import Loader from "../components/customComponents/Loader";
import AskMessagesList from "../components/AskMessagesList";
import { MagnifyingGlass } from "phosphor-react";
import { useParams, useNavigate } from "react-router-dom";
import { debounce } from "ts-debounce";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function Inbox() {
  const [reviewResponses, setReviewResponses] = useState<ReviewResponse[] | []>(
    []
  );
  const [reviewResponse, setReviewResponse] = useState<ReviewResponse | null>(
    null
  );
  const [askMessages, setAskMessages] = useState<AskMessage[] | []>([]);
  const [selectedAsKMessage, setSelectedAskMessage] = useState<AskMessage>();
  const [open, setOpen] = useState(false);
  const [openAskMessageList, setOpenAskMessageList] = useState(false);

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  let { requestId } = useParams();
  let navigate = useNavigate();

  // eslint-disable-next-line
  const debouncedSearch = useCallback(
    debounce(
      (searchValue: string, requestId: string) =>
        searchReviewResponse(searchValue, requestId),
      1000
    ),
    []
  );

  const searchReviewResponse = (searchValue: string, requestId: string) => {
    setLoading(true);
    const id = requestId ? requestId : "";
    getReviewResponse(id, searchValue)
      .then((res) => {
        setReviewResponses(res.data);
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
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    const id = requestId ? requestId : "";
    debouncedSearch(event.target.value, id);
  };

  useEffect(() => {
    getReviewRequest()
      .then((res) => {
        setAskMessages(res.data);
      })
      .catch((err) => {
        setShowToast({
          show: true,
          message: err.response.data.message,
          type: "failure",
        });
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    const id = requestId ? requestId : "";
    getReviewResponse(id, "")
      .then((res) => {
        setReviewResponses(res.data);
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
  }, [requestId]);

  const handleOpen = async (response: ReviewResponse) => {
    setReviewResponse(response);
    setOpen(true);
    try {
      if (response && !response.isRead)
        await updateIsRead({ isRead: true }, response.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickItem = (askMessage: AskMessage) => {
    navigate(`/inbox/${askMessage.id}`);
    setSelectedAskMessage(askMessage);
    setOpenAskMessageList(false);
  };

  const listView = useMemo(
    () =>
      reviewResponses.map((reviewResponse, index) => {
        const {
          id,
          customerName,
          updatedAt,
          imageUrl,
          isRead,
          requestMessageId,
        } = reviewResponse;
        return (
          <div
            className="flex border-b-2 border-Black7 cursor-pointer"
            key={id}
            onClick={() => handleOpen(reviewResponse)}
          >
            <div className="flex justify-center items-center gap-1">
              <div
                className={`flex rounded-full w-12 h-12 md:w-14 md:h-14 justify-center items-center bg-${
                  colorList[index % 3]
                }`}
              >
                <p className="text-l md:text-xl text-white uppercase">
                  {customerName.charAt(0)}
                </p>
              </div>
              <div className="flex flex-col justify-center m-4 tracking-wider">
                <h3
                  className={`${
                    isRead ? "text-Black2" : "text-black"
                  } font-bold	text-[19px]`}
                >
                  {customerName}
                </h3>
                <div className="flex gap-4">
                  <h6
                    className={`${
                      isRead ? "text-Black2" : "text-black"
                    } text-[17px]`}
                  >
                    {requestMessageId
                      ? imageUrl
                        ? "shared a video review"
                        : "shared a text review"
                      : "Send Email"}
                  </h6>
                  <ul
                    className={` ${
                      isRead ? "text-Black2" : "text-black"
                    } text-lg list-outside list-disc ml-2`}
                  >
                    <li>{getElapsedTime(updatedAt)}</li>
                  </ul>
                </div>
              </div>

              {imageUrl && !isRead && (
                <div className="flex justify-center content-center">
                  <img
                    src={getUrl(imageUrl)}
                    alt="response"
                    className="w-8 md:w-10 rounded-lg md:ml-10"
                  />
                </div>
              )}
            </div>
          </div>
        );
      }),
    [reviewResponses]
  );

  if (loading) return <Loader />;

  return (
    <Fragment>
      <div className="w-full overflow-hidden mt-12">
        <div className="w-full flex flex-col md:flex-row justify-center md:mx-4 my-2 px-5 gap-2">
          <button
            className="bg-Athens_Gray  rounded-xl w-full border-[1px]	 text-Black2 py-2"
            onClick={() => setOpenAskMessageList(true)}
          >
            <span className="text-Black3">Select ask message: </span>
            {selectedAsKMessage?.name}
          </button>
          <div className="flex justify-center items-center bg-Athens_Gray rounded-xl px-4 w-full">
            <input
              autoFocus
              type="text"
              className="p-3  w-full rounded-xl bg-Athens_Gray focus:text-gray-700  focus:border-blue-600 focus:outline-none"
              placeholder="Search.."
              value={search}
              onChange={handleSearch}
            ></input>
            <MagnifyingGlass size={24} weight="bold" />
          </div>
        </div>
        <div className="max-h-[35rem] md:max-h-[45rem] overflow-y-auto md:h-auto m-2 md:m-10 lg:m-10">
          {listView}
        </div>
        <Toast
          showToast={showToast.show}
          onClose={(value) =>
            setShowToast((prev) => ({ ...prev, show: value }))
          }
          toastMessage={showToast.message}
          type={showToast.type}
        />
        <Modal
          open={open}
          handleClose={setOpen}
          title={
            <div className="flex justify-center items-center gap-2">
              <div
                className={`flex rounded-full w-12 h-12 md:w-16 md:h-16 justify-center items-center bg-${colorList[2]}`}
              >
                <p className="text-l md:text-3xl text-white uppercase">
                  {reviewResponse?.customerName.charAt(0)}
                </p>
              </div>
              <div className="flex flex-col w-full">
                <h3 className="text-xl font-semibold	">
                  {reviewResponse?.customerName}
                </h3>
                <h5 className="text-base">{reviewResponse?.whatYouDo}</h5>
              </div>
            </div>
          }
        >
          <div>
            {reviewResponse?.videoUrl ? (
              <div className="relative flex justify-center items-center cursor-pointer  p-4">
                <video
                  className=" md:w-1/2 lg:w-1/2 rounded-xl shadow-lg"
                  src={getUrl(reviewResponse?.videoUrl)}
                  ref={videoRef}
                  controls
                ></video>
              </div>
            ) : (
              <div className="mt-4 text-center text-lg	font-base	bg-Black1 text-black  font-semibold rounded-xl p-4">
                <p>{reviewResponse?.replyMessage}</p>
              </div>
            )}
            <div>
              <span className="text-Black2 font-semibold">
                Embed review to your website
              </span>
              <SyntaxHighlighter
                language="javascript"
                style={atomDark}
                wrapLongLines
                // className="select-all	"
              >
                {`<iframe src="${getWebUrl(
                  "/embed/" + reviewResponse?.id
                )}" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>`}
              </SyntaxHighlighter>
            </div>
          </div>
        </Modal>
        <Modal open={openAskMessageList} handleClose={setOpenAskMessageList}>
          <AskMessagesList
            askMessages={askMessages}
            handleClickItem={handleClickItem}
          />
        </Modal>
      </div>
    </Fragment>
  );
}

export default Inbox;
