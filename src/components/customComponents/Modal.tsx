import React, { ReactNode } from "react";
import { X } from "phosphor-react";
import Button from "./Button";
interface Props {
  title?: string | ReactNode;
  open: boolean;
  PrimaryButtonTitle?: string;
  secondaryTitle?: string;
  loading?: boolean;
  handleClose: (value: boolean) => void;
  handlePrimaryAction?: (value: boolean) => void;
  handleSecondaryAction?: (value: boolean) => void;
  children?: ReactNode;
}
function Modal({
  open,
  title,
  handleClose,
  handlePrimaryAction,
  handleSecondaryAction,
  children,
  PrimaryButtonTitle,
  secondaryTitle,
  loading,
}: Props) {
  return (
    <>
      {open ? (
        <>
          <div className="modal fade fixed top-0 left-0  w-full h-full outline-none overflow-x-hidden overflow-y-auto z-50">
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-slate-200">
                  <h3 className="text-xl font-regular text-color-Black2 w-full">
                    {title}
                  </h3>
                  <button
                    className="p-2 border-0 text-Athens_Gray  text-3xl leading-none font-semibold outline-none focus:outline-none rounded-full bg-Dove_Grey"
                    onClick={() => handleClose(false)}
                  >
                    <X size={24} />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto  overflow-auto">
                  {children}
                </div>
                {/*footer*/}
                <div
                  className={
                    secondaryTitle
                      ? "flex justify-end"
                      : "flex items-center justify-center p-6 border-slate-200 rounded-b"
                  }
                >
                  {secondaryTitle && handleSecondaryAction && (
                    <Button
                      className="bg-Charade shadow-lg  drop-shadow-md"
                      onClick={() => handleSecondaryAction(true)}
                      loading={loading}
                    >
                      {secondaryTitle}
                    </Button>
                  )}
                  {PrimaryButtonTitle && handlePrimaryAction && (
                    <Button
                      className="bg-primaryRed shadow-lg  drop-shadow-md"
                      onClick={() => handlePrimaryAction(true)}
                      loading={loading}
                    >
                      {PrimaryButtonTitle}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;
