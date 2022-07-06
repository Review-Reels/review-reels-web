import React, { ReactNode } from "react";
import { X } from "phosphor-react";
import Button from "./Button";
interface Props {
  title?: string;
  open: boolean;
  PrimaryButtonTitle: string;
  handleClose: (value: boolean) => void;
  children?: ReactNode;
}
function Modal({
  open,
  title,
  handleClose,
  children,
  PrimaryButtonTitle,
}: Props) {
  return (
    <>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-slate-200 rounded-t">
                  <h3 className="text-xl font-regular text-color-Black2">
                    {title}
                  </h3>
                  <button
                    className="p-2 ml-auto bg-transparent border-0 text-Dove_Grey  float-right text-3xl leading-none font-semibold outline-none focus:outline-none rounded-full bg-Athens_Gray"
                    onClick={() => handleClose(false)}
                  >
                    <X size={24} />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto h-[42rem] overflow-scroll">
                  {children}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-slate-200 rounded-b">
                  <Button onClick={() => handleClose(false)}>
                    {PrimaryButtonTitle}
                  </Button>
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
