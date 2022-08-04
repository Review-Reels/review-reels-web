import React from "react";

interface InputType {
  value: string;
  validationText?: string;
  onChange?: (value: string) => void;
  className?: string;
  password?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
}
function RRInput({
  value,
  onChange,
  validationText,
  className,
  password,
  autoFocus,
  disabled,
}: InputType) {
  return (
    <div className="flex flex-col w-full">
      <input
        autoFocus={autoFocus}
        disabled={disabled}
        type={password ? "password" : "text"}
        className={`p-3 w-full rounded-xl bg-Athens_Gray focus:text-gray-700  focus:border-blue-600 ${className} ${
          validationText ? "border-red-500 border-2" : ""
        }`}
        value={value}
        onChange={(event) => onChange && onChange(event.target.value)}
      ></input>
      {validationText && <p className="text-red-500">{validationText}</p>}
    </div>
  );
}

export default RRInput;
