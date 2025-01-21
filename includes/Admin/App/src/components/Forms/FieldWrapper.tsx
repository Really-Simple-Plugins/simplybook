import * as Label from "@radix-ui/react-label";
import { memo } from "react";
import { __ } from "@wordpress/i18n";

interface FieldWrapperProps {
  label: string;
  context?: string;
  help?: string;
  error?: string;
  reverseLabel?: boolean;
  className?: string;
  inputId: string;
  required?: boolean;
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
  required = false,
    type="text",
  children,
}: FieldWrapperProps) => {
  const wrapperClasses = [
    "flex w-full flex-col",
    className,
    "pt-4"
  ].filter(Boolean).join(" ");

  const contentClasses = [
    "flex w-full flex-col",
    reverseLabel ? "flex-col-reverse" : ""
  ].filter(Boolean).join(" ");
  let flexClass= type==='checkbox' ? " relative inline-flex items-center cursor-pointer " : '';
  return (
    <div className={wrapperClasses}>
      <div className={contentClasses}>
        {type==='checkbox' && children}
        <div className="flex items-center justify-between">
        <Label.Root
          className={"cursor-pointer pb-1 font-medium text-black text-md "+flexClass}
          htmlFor={inputId}
        >
          {label}
          {required && <span className="ml-1 text-gray-500 font-normal text-xs">({__("Required", 'simplybook')})</span>}
        </Label.Root>
        
        {/* TODO: MAKE ICON ON HOVER:  */}
        {help && (
          <p className="pb-1 text-xs font-light text-gray-600">{help}</p>
        )}
        </div>
        {type==='checkbox' && children}
      </div>
      
      {error && (
        <p className="mt-2 text-xs font-light text-red-600" role="alert">
          {error}
        </p>
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
