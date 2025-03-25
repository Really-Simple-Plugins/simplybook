import * as Label from "@radix-ui/react-label";
import { memo } from "react";
import { __ } from "@wordpress/i18n";
import Error from "../Errors/Error";

interface FieldWrapperProps {
  label: string;
  context?: string;
  help?: string;
  error?: string;
  reverseLabel?: boolean;
  className?: string;
  inputId: string;
  requiredMessage?: boolean;
  children: React.ReactNode;
    type?: string;
}

const FieldWrapper = memo(({
  label,
  context,
  help,
  error,
  reverseLabel = false,
  className = "",
  inputId,
  requiredMessage = false,
    type="text",
  children,
}: FieldWrapperProps) => {

  const wrapperClasses = [
    "flex w-full flex-col",
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
            {/* {required && <span className="ml-1 text-gray-500 font-normal text-xs">({__("Required", 'simplybook')})</span>} */}
            {requiredMessage}
          </Label.Root>
        
          {/* TODO: MAKE ICON ON HOVER:  */}
          {help && (
            <p className="pb-1 text-xs font-light text-gray-600">{help}</p>
          )}
        {type!=='checkbox' && children}
      </div>
      
      {error && (
        <Error
          errorHeading={__("Something wen't wrong...", "simplybook")} 
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
