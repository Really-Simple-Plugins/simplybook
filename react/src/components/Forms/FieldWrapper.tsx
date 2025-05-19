import * as Label from "@radix-ui/react-label";
import { memo } from "react";
import { __ } from "@wordpress/i18n";
import Error from "../Errors/Error";
import { FieldWrapperProps } from "../../types/fields/FieldWrapperProps";
import useFieldValidation from "../../hooks/useFieldValidation";  

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
       fieldState
}: FieldWrapperProps) => {

    const { buildValidationClass } = useFieldValidation();

    const wrapperClasses = [
        "flex flex-col",
        className,
        "mb-4",
        (fieldState?.error ? buildValidationClass(fieldState?.error) : ""),
    ].filter(Boolean).join(" ");

    const contentClasses = [
        "flex flex-col w-full",
        reverseLabel ? "flex-col-reverse" : "",
    ].filter(Boolean).join(" ");

    return (
        <div className={wrapperClasses}>
            <div className={contentClasses}>
                {type==='checkbox' && children}
                {label && (
                    <Label.Root
                        className={"cursor-pointer pb-1 font-medium text-black text-label "}
                        htmlFor={inputId}
                    >
                        {label}
                        {required}
                    </Label.Root>
                )}
                {help && (
                    <p className="m-0 pb-1 text-xs italic font-light text-gray-600">
                        {help}
                    </p>
                )}
                {type!=='checkbox' && children}
            </div>

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
