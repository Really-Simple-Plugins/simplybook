import * as Label from "@radix-ui/react-label";
import { memo } from "react";
import { __ } from "@wordpress/i18n";
import Error from "../Errors/Error";
import { FieldWrapperProps } from "../../types/fields/FieldWrapperProps";

const FieldWrapper = memo(({
  label,
  context,
  help,
  error,
  reverseLabel = false,
  className = "",
  inputId,
  required = false,
  type="text",
  children,
}: FieldWrapperProps) => {

  const wrapperClasses = [
    "flex flex-col",
    className,
    "mb-4"
  ].filter(Boolean).join(" ");

  const contentClasses = [
    "flex w-full flex-col",
    reverseLabel ? "flex-col-reverse" : ""
  ].filter(Boolean).join(" ");

  return (
    <div className={wrapperClasses}>
      <div className={contentClasses}>
        {type==='checkbox' && children}
          <Label.Root
            className={"cursor-pointer pb-2 font-medium text-black text-label "}
            htmlFor={inputId}
          >
            {label}
            {required}
          </Label.Root>
          {help && (
            <p className="pb-1 text-xs font-light text-gray-600">{help}</p>
          )}
        {type!=='checkbox' && children}
      </div>

      {error && (
        <Error
          errorHeading={__("Something went wrong...", "simplybook")}
          error={error}
        />
      )}

      {context && (
        <p className="mt-2 text-xs font-light text-gray-600">
          {context}
        </p>
      )}
    </div>
  );
});

FieldWrapper.displayName = 'FieldWrapper';

export default FieldWrapper;