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
      className={`mr-2 mb-2  px-7 py-3 text-white rounded-full  text-center inline-flex items-center  ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
