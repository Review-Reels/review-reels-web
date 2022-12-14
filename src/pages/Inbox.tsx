import React, {
  Fragment,
  useEffect,
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
} from "react";
import {
  getReviewResponse,
  updateIsRead,
  getUnReadStatistics,
} from "../apis/ReviewResponseApis";
import { getReviewRequest } from "../apis/AskMessageApis";
import { ReviewResponse, AskMessage } from "../types";
import { getUrl, getWebUrl } from "../utils/S3Utils";
import { getElapsedTime } from "../utils/Time";
import Toast from "../components/customComponents/Toast";
import { colorList } from "../constants/ColorList";
import Modal from "../components/customComponents/Modal";
import Loader from "../components/customComponents/Loader";
import AskMessagesList from "../components/AskMessagesList";
import {
  MagnifyingGlass,
  ArrowsClockwise,
  Backspace,
  Copy,
  DownloadSimple,
  CaretDown,
} from "phosphor-react";
import { useParams, useNavigate } from "react-router-dom";
import { debounce } from "ts-debounce";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import EmbedComponent from "../components/EmbedComponent";
import { Tooltip } from "../components/customComponents/ToolTip";
import { useUnReadStore } from "../store/UnReadStore";
import EmptyReply from "../images/EmptyResponse.svg";
import Button from "../components/customComponents/Button";

function Inbox() {
  const [reviewResponses, setReviewResponses] = useState<ReviewResponse[] | []>(
    []
  );
  const [reviewResponse, setReviewResponse] = useState<ReviewResponse | null>(
    null
  );
  const [askMessages, setAskMessages] = useState<AskMessage[] | []>([]);
  const [selectedAsKMessage, setSelectedAskMessage] =
    useState<AskMessage | null>(null);
  const [open, setOpen] = useState(false);
  const [openAskMessageList, setOpenAskMessageList] = useState(false);
  const [copied, setCopied] = useState(false);

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const setUnRead = useUnReadStore((state) => state.setUnRead);

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

  const getUnReadStatisticsApi = async () => {
    try {
      const res = await getUnReadStatistics();
      setUnRead(res.data.unReadCount);
    } catch (err) {
      console.log("unread error");
    }
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
      if (response && !response.isRead) {
        await updateIsRead({ isRead: true }, response.id);
        await getUnReadStatisticsApi();
        const updatedResponse = reviewResponses.map((item) => {
          if (item.id === response.id) return { ...item, isRead: true };
          else return item;
        });
        setReviewResponses(updatedResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickItem = (askMessage: AskMessage) => {
    navigate(`/inbox/${askMessage.id}`);
    setSelectedAskMessage(askMessage);
    setOpenAskMessageList(false);
  };

  const handleCloseEmbed = (value: boolean) => {
    setOpen(value);
    setCopied(false);
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
            className="flex border-b-2 border-Black7 cursor-pointer mb-10"
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
    // eslint-disable-next-line
    [reviewResponses]
  );

  if (
    reviewResponses.length === 0 &&
    !loading &&
    !search &&
    !selectedAsKMessage
  )
    return (
      <div className="w-full flex justify-center items-center flex-col gap-4 h-screen">
        <img src={EmptyReply} width={200} alt="empty ask message" />
        <h1 className="text-2xl font-bold text-center text-Black2">
          You have no replies yet
        </h1>
      </div>
    );

  return (
    <div className="w-full overflow-x-hidden mt-12">
      <div className="w-full flex flex-col md:flex-row justify-center items-center md:mx-4 my-2 px-5">
        <div className="w-full flex flex-row justify-center items-center">
          <Tooltip message="Refresh">
            <div className="p-2">
              <ArrowsClockwise
                size={32}
                weight="bold"
                className="hover:animate-spin	cursor-pointer"
                onClick={() =>
                  searchReviewResponse(
                    search,
                    selectedAsKMessage ? selectedAsKMessage.id : ""
                  )
                }
              />
            </div>
          </Tooltip>
          <button
            className="bg-Athens_Gray  rounded-l-xl w-full border-[1px]	 text-Black2 py-2 inline-flex items-center justify-center"
            onClick={() => setOpenAskMessageList(true)}
          >
            <span className="text-Black3">Select ask message: </span>
            {selectedAsKMessage?.name}
            <CaretDown size={24} weight="fill" />
          </button>

          <Tooltip message="Clear ask message">
            <div
              className="bg-Athens_Gray  rounded-r-xl  border-[1px]	 text-Black2 py-1 px-2 cursor-pointer"
              onClick={() => {
                navigate(`/inbox`);
                setSelectedAskMessage(null);
              }}
            >
              <Backspace size={32} weight="fill" />
            </div>
          </Tooltip>
        </div>
        <div className="flex justify-center items-center bg-Athens_Gray rounded-xl px-4 w-full mx-2">
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
      {loading ? (
        <Loader />
      ) : reviewResponses.length === 0 && (search || selectedAsKMessage) ? (
        <div className="flex justify-center items-center flex-col gap-4 h-full">
          <img src={EmptyReply} width={200} alt="empty ask message" />
          <h1 className="text-2xl font-bold text-center text-Black2">
            No Replies found
          </h1>
          <h2 className="text-xl font-medium text-center text-Black2">
            Try changing the filters or search term
          </h2>
        </div>
      ) : (
        <div className="max-h-screen overflow-y-contain md:h-auto m-2 md:m-10 lg:m-10">
          {listView}
        </div>
      )}

      <Toast
        showToast={showToast.show}
        onClose={(value) => setShowToast((prev) => ({ ...prev, show: value }))}
        toastMessage={showToast.message}
        type={showToast.type}
      />
      <Modal open={open} handleClose={handleCloseEmbed}>
        <div>
          {reviewResponse && <EmbedComponent reviewResponse={reviewResponse} />}
          <div>
            <span className="text-Black2 font-semibold">
              Embed the testimonial, copy and paste following code
            </span>
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              wrapLongLines
              // className="select-all	"
            >
              {`<iframe src="${getWebUrl(
                "embed/" + reviewResponse?.id
              )}" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>`}
            </SyntaxHighlighter>
            <div className="w-full flex justify-end">
              <Button
                className="bg-Anakiwa "
                onClick={() => {
                  navigator.clipboard.writeText(
                    `<iframe src="${getWebUrl(
                      "embed/" + reviewResponse?.id
                    )}" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>`
                  );
                  setCopied(true);
                }}
              >
                <Copy size={24} className="mr-2" />
                {copied ? "Copied!" : "Copy Code"}
              </Button>

              {reviewResponse?.videoUrl && (
                <a href={getUrl(reviewResponse?.videoUrl)} download>
                  <Button className="px-6 py-1 flex justify-center items-center text-white no-underline bg-Peach_Orange rounded-full first-letter:uppercase">
                    <DownloadSimple size={24} weight="fill" className="mr-2" />
                    Download
                  </Button>
                </a>
              )}
            </div>
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
  );
}

export default Inbox;
