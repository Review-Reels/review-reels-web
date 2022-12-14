import React, { useState, useEffect } from "react";
import { Plus } from "phosphor-react";
import Button from "../components/customComponents/Button";
import Modal from "../components/customComponents/Modal";
import { ReviewResponse } from "../types";
import { getReviewResponse } from "../apis/ReviewResponseApis";
import EmbedComponent from "../components/EmbedComponent";
import { useParams } from "react-router-dom";
import {
  editReviewLibrary,
  getOneReviewLibraryDataWithId,
} from "../apis/ReviewLibraryApi";
const ReviewWall = () => {
  const [reviewResponseModal, setReviewResponseModal] = useState(false);

  const [reviewResponses, setReviewResponses] = useState<ReviewResponse[] | []>(
    []
  );

  const [selectedResponses, setSelectedResponses] = useState<
    ReviewResponse[] | []
  >([]);

  const [currentSelection, setCurrentSelection] = useState<
    ReviewResponse[] | []
  >([]);

  let { libraryId } = useParams();

  useEffect(() => {
    getReviewResponse("", "")
      .then((res) => {
        setReviewResponses(res.data);
      })
      .catch((err) => {
        // setShowToast({
        //   show: true,
        //   message: err.response.data.message,
        //   type: "failure",
        // });
      })
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (libraryId)
      getOneReviewLibraryDataWithId(libraryId).then((res) => {
        const { reviewLibrary, reviewResponses } = res.data;
        setCurrentSelection(reviewResponses);
        setSelectedResponses(reviewResponses);
      });
  }, [libraryId]);

  const handleAddResponseToWall = () => {
    setCurrentSelection(selectedResponses);
    const libraryConfigJson = selectedResponses.map((item) => item.id);
    if (libraryId)
      editReviewLibrary({ libraryConfigJson }, libraryId)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          // setShowToast({
          //   show: true,
          //   message: err.response.data.message,
          //   type: "failure",
          // });
        });
    setReviewResponseModal(false);
  };

  const handleSelection = (selection: ReviewResponse) => {
    const alreadySelected = selectedResponses.some(
      (item) => item.id === selection.id
    );
    if (alreadySelected)
      setSelectedResponses(
        selectedResponses.filter((item) => item.id !== selection.id)
      );
    else setSelectedResponses([...selectedResponses, selection]);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-end items-center flex-row h-16 mt-12 w-full">
        <Button
          className="bg-primaryRed px-2 py-1 m-2"
          onClick={() => setReviewResponseModal(true)}
        >
          <Plus size={22} />
        </Button>
      </div>
      <div className="flex flex-wrap justify-center overscroll-contain max-h-[100rem]">
        {currentSelection.map((reviewResponse) => (
          <EmbedComponent reviewResponse={reviewResponse} />
        ))}
      </div>
      <Modal
        className="w-fit"
        open={reviewResponseModal}
        handleClose={() => {
          setReviewResponseModal(false);
        }}
        title="Select"
        PrimaryButtonTitle="Add"
        handlePrimaryAction={handleAddResponseToWall}
      >
        <div className="overscroll-contain max-h-96">
          {reviewResponses.map((reviewResponse) => (
            <div className="flex flex-row">
              <input
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value=""
                checked={selectedResponses.some(
                  (item) => item.id === reviewResponse.id
                )}
                onChange={() => handleSelection(reviewResponse)}
                id="flexCheckDefault"
              ></input>

              <EmbedComponent reviewResponse={reviewResponse} />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ReviewWall;
