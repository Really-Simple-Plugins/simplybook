import React from "react";
import * as Label from "@radix-ui/react-label";

/**
 * InputWrapper component
  * @param {string} label
 * @param {string} context
 * @param {string} help
 * @param {string} error
 * @param {boolean} reverseLabel
 * @param {JSX.Element} children
 * @constructor
 */
const InputField = ({
  label,
  context,
  help,
  error,
  reverseLabel = false,
  className,
  children,
}) => {
  const colReverse = reverseLabel ? "flex-col-reverse" : "";

  return (
      <div className={`flex flex-col ${className || ""}`}>
        <Label.Root className={"flex w-full cursor-pointer flex-col " + colReverse}>
          <div className="w-full flex gap-1 my-1">
            {label && (
                <p className="font-medium text-gray-700">{label}</p>
            )}
            {label && help && (
                <p className="text-xs font-light text-gray-600">{help}</p> // Placeholder for the help component
            )}
          </div>
          <div className={"flex flex-col"}>{children}</div>
        </Label.Root>
        {error && (
            <p className="w-full text-xs my-1 font-light text-red-600">{error}</p>
        )}
        {context && (
            <p className="w-full my-1 text-xs font-light text-gray-600">{context}</p>
        )}
      </div>
  );
};

export default InputField;
