import React, { useState } from "react";
import Modal from "../components/customComponents/Modal";
import Button from "../components/customComponents/Button";
const AskMessages = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)} className="mt-10 m-10">
        Create an Ask Message
      </Button>
      ask message
      <Modal
        open={open}
        handleClose={setOpen}
        title="dhdjh"
        PrimaryButtonTitle="Save"
        cancelButtonTitle="cancel"
      >
        lksdfjsjkgjskdfgjkdg sdjkgsfgk sgjksgs
        sdjkgjsgkjsfkgjshdfghdjksfghkjsfhgkdsfhgkjhsdfkjghkjsdhfgkjdsfhkgjhsdfkjhgkjdfshgjk
      </Modal>
    </div>
  );
};

export default AskMessages;
