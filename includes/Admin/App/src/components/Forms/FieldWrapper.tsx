import * as Label from "@radix-ui/react-label";
import { memo } from "react";

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

  return (
    <div className={wrapperClasses}>
      <div className={contentClasses}>
        <Label.Root
          className="cursor-pointer pb-1 font-medium text-gray-700"
          htmlFor={inputId}
        >
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
        </Label.Root>
        
        {help && (
          <p className="pb-1 text-xs font-light text-gray-600">{help}</p>
        )}
        {children}
      </div>
      
      {error && (
        <p className="mt-1 text-xs font-light text-red-600" role="alert">
          {error}
        </p>
      )}
      
      {context && (
        <p className="mt-1 text-xs font-light text-gray-600">
          {context}
        </p>
      )}
    </div>
  );
});

FieldWrapper.displayName = 'FieldWrapper';

export default FieldWrapper;
