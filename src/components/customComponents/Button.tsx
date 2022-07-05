import React, { ReactNode } from "react";
interface Props {
  children?: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
function Button({ children, onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={`mr-2 mb-2 bg-primaryRed  px-7 py-3 text-white rounded-full shadow-lg text-center inline-flex items-center  drop-shadow-md ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
