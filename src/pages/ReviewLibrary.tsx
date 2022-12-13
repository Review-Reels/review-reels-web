import React, { useState } from "react";
import Button from "../components/customComponents/Button";
import { Plus } from "phosphor-react";
import Modal from "../components/customComponents/Modal";
import RRInput from "../components/customComponents/RRInput";
import RRTextArea from "../components/customComponents/RRTextArea";

interface Library {
  libraryName: string;
  description: string;
}

function ReviewLibrary() {
  const [libraryName, setlibraryName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nameValidation, setNameValidation] = useState("");
  const [libraryModal, setLibraryModal] = useState(false);
  const [libraryList, setLibraryList] = useState<Library[] | []>([]);

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

  const handleSave = () => {
    setLibraryList([...libraryList, { libraryName, description }]);
    setLibraryModal(false);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-end items-center flex-row bg-Athens_Gray  h-16 mt-12 w-full">
        <Button
          className="bg-primaryRed px-2 py-1"
          onClick={() => setLibraryModal(true)}
        >
          <Plus size={22} />
        </Button>
      </div>
      <div className="flex flex-row">
        {libraryList.map((library) => (
          <div className="flex flex-col gap-2 justify-center items-start border-2 border-sky-500 p-3 m-2 rounded-lg">
            <h2 className="uppercase font-medium">{library.libraryName}</h2>
          </div>
        ))}
      </div>

      <Modal
        className="w-fit"
        open={libraryModal}
        handleClose={setLibraryModal}
        title="Add new library"
        PrimaryButtonTitle="Save"
        handlePrimaryAction={handleSave}
      >
        <div className="flex flex-col space-y-5">
          <div className="bg-Peach_Cream-normal rounded p-2">
            Create your review library
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
    </div>
  );
}

export default ReviewLibrary;
