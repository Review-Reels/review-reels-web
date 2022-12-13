import React, { useState, useEffect } from "react";
import Button from "../components/customComponents/Button";
import { Plus, TrashSimple } from "phosphor-react";
import Modal from "../components/customComponents/Modal";
import RRInput from "../components/customComponents/RRInput";
import RRTextArea from "../components/customComponents/RRTextArea";
import { Link } from "react-router-dom";
import {
  getReviewLibraryList,
  createReviewLibrary,
  deleteReviewLibrary,
} from "../apis/ReviewLibraryApi";

import Loader from "../components/customComponents/Loader";
import Toast from "../components/customComponents/Toast";

interface Library {
  id: string;
  libraryName: string;
  description: string;
  libraryConfigJson: Object;
  updatedAt: string;
  userId: string;
  createdAt: string;
}

function ReviewLibrary() {
  const [libraryName, setlibraryName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nameValidation, setNameValidation] = useState("");
  const [libraryModal, setLibraryModal] = useState(false);
  const [libraryList, setLibraryList] = useState<Library[] | []>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleNameChange = (value: string) => {
    if (!value) {
      setNameValidation("Library name is required");
    } else {
      setNameValidation("");
    }
    setlibraryName(value);
  };
  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const clear = () => {
    setlibraryName("");
    setDescription("");
  };

  const handleSave = () => {
    createReviewLibrary({
      libraryName,
      description,
      libraryConfigJson: [{}],
    })
      .then((res) => {
        console.log(res);
        const addedItem = res.data;
        setLibraryList([...libraryList, addedItem]);
      })
      .catch((err) => {
        console.log(err);
      });

    clear();
    setLibraryModal(false);
  };

  const handleDeleteLibrary = (id: string) => {
    deleteReviewLibrary(id)
      .then((res) => {
        setLibraryList(libraryList.filter((item) => item.id !== id));
      })
      .catch((err) => {
        setShowToast({
          show: true,
          message: err.response.data.message,
          type: "failure",
        });
      });
  };

  useEffect(() => {
    setInitialLoading(true);
    getReviewLibraryList()
      .then((res) => {
        setLibraryList(res.data);
      })
      .catch((err) => {
        setShowToast({
          show: true,
          message: err.response.data.message,
          type: "failure",
        });
      })
      .finally(() => {
        setInitialLoading(false);
      });
  }, []);

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-end items-center flex-row h-16 mt-12 w-full">
        <Button
          className="bg-primaryRed px-2 py-1 m-2"
          onClick={() => setLibraryModal(true)}
        >
          <Plus size={22} />
        </Button>
      </div>
      <div className="flex flex-row gap-4 m-2 flex-wrap	">
        {initialLoading ? (
          <Loader />
        ) : (
          libraryList.map((library, index) => (
            <div className="flex justify-center " key={index}>
              <div className="flex flex-col md:flex-col md:max-w-xl rounded-lg bg-white shadow-lg justify-end">
                {/* <img
                className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
                alt=""
                
              /> */}
                <div className="w-full flex justify-end">
                  <div
                    className="flex rounded-full bg-Black6 h-7 w-7 justify-center items-center cursor-pointer m-2"
                    onClick={() => handleDeleteLibrary(library.id)}
                  >
                    <TrashSimple size={24} />
                  </div>
                </div>
                <Link
                  className="p-6 flex flex-col justify-between"
                  to={`${library.id}`}
                >
                  <div className="p-6 flex flex-col justify-start">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">
                      {library.libraryName}
                    </h5>
                    <p className="text-gray-700 text-base mb-4">
                      {library.description}
                    </p>
                  </div>
                  <p className="text-gray-600 text-xs">
                    Last updated 3 mins ago
                  </p>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        className="w-fit"
        open={libraryModal}
        handleClose={() => {
          clear();
          setLibraryModal(false);
        }}
        title="Add new library"
        PrimaryButtonTitle="Save"
        handlePrimaryAction={handleSave}
      >
        <div className="flex flex-col space-y-5">
          <div className="bg-Peach_Cream-normal rounded p-2">
            Create your review library to showcase in your webpage
          </div>
          <div className="flex flex-col">
            <label className="first-letter:uppercase mb-2">Library Name</label>
            <RRInput
              className="p-3 bg-Athens_Gray"
              value={libraryName}
              onChange={handleNameChange}
              validationText={nameValidation}
            />
          </div>
          <div className="flex flex-col">
            <label className="first-letter:uppercase mb-2">
              library description
            </label>
            <RRTextArea
              value={description}
              onChange={handleDescriptionChange}
              className="p-3  bg-Athens_Gray"
            />
          </div>
        </div>
      </Modal>
      <Toast
        showToast={showToast.show}
        onClose={(value) => setShowToast((prev) => ({ ...prev, show: value }))}
        toastMessage={showToast.message}
        type={showToast.type}
      />
    </div>
  );
}

export default ReviewLibrary;
