import React, { ReactNode } from "react";

interface InputType {
  value: string;
  validationText?: string;
  onChange?: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  iconAppend?: ReactNode;
  rows?: number;
}
function RRTextArea({
  value,
  onChange,
  validationText,
  className,
  autoFocus,
  disabled,
  iconAppend,
  rows,
}: InputType) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center">
        <textarea
          rows={rows}
          autoFocus={autoFocus}
          disabled={disabled}
          className={`p-3 w-full ${
            iconAppend ? "rounded-l-xl" : "rounded-xl"
          } bg-Athens_Gray focus:text-gray-700   ${className} ${
            validationText
              ? "border-red-500 border-2 focus:border-red-500 outline-red-500"
              : "focus:border-blue-600"
          }`}
          value={value}
          onChange={(event) => onChange && onChange(event.target.value)}
        ></textarea>
        {iconAppend && (
          <div className="bg-Athens_Gray p-3  rounded-r-xl">{iconAppend}</div>
        )}
      </div>

      {validationText && <p className="text-red-500">{validationText}</p>}
    </div>
  );
}

export default RRTextArea;
