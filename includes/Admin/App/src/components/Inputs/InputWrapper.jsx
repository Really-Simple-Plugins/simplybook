import React from "react";
import * as Label from "@radix-ui/react-label";

const InputWrapper = ({
  label,
  context,
  help,
  error,
  reverseLabel = false,
  children,
}) => {
  const colReverse = reverseLabel ? "flex-col-reverse" : "";

  return (
      <div className="my-4 flex flex-col">
        <Label.Root className={"flex w-full cursor-pointer flex-col " + colReverse}>
          <div className="w-full flex gap-1 my-1">
            {label && (
                <p className="font-medium text-gray-700">{label}</p>
            )}
            {label && help && (
                <p className="text-xs font-light text-gray-600">{help}</p> // Placeholder for the help component
            )}
          </div>
          <div className={"w-full flex flex-col"}>{children}</div>
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

export default InputWrapper;
