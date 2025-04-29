import React from "react";
import clsx from "clsx";
import { __ } from "@wordpress/i18n";
import { TextInputProps } from "../../types/inputs/TextInputProps";

/**
 * Styled text input component
 * @param props - Props for the input component
 * @returns {JSX.Element} The rendered input element
 */
const TextInput: React.FC<TextInputProps> = ({
    name, 
    placeholder, 
    type, 
    className, 
    clickToSelect = false, 
    disabled = false,
    ref,
    ...props 
}) => {

    const [copiedFeedback, setCopiedFeedback] = React.useState("Copy");
    const [copySucces, setCopySucces] = React.useState(false);

    const copyOnClick = () => {
        const copyButton = document.querySelector(".copy-button");
        let copyInput: Element | null | string  = document.querySelector('.copy-input');

        if (typeof props.value === 'string') {
            navigator.clipboard.writeText(props.value)
            .then(function() {

                if (!copyButton) {
                    throw new Error('Button not found');
                }
                const inputElement = copyInput as HTMLInputElement;
                (clipText:string) => (inputElement.value += clipText)
                

                setCopiedFeedback("Copied!");
                setCopySucces(true);

                setTimeout(() => {
                    setCopiedFeedback("Copy");
                    setCopySucces(false);
                }, 1000);
            }).catch(function (error) {
                console.error("Error copying text: ", error);
            });
        }
    }


    const copySpanClass = "absolute cursor-pointer right-[0.5rem] top-5.5 transform -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold";
    const textInputClass = "input-base copy-input";
    const disabledClass = 'bg-gray-200 border-gray-200 text-black-600 cursor-not-allowed';

    return (
        <>
        <div className="w-full relative">
            <input
                name={name}
                placeholder={placeholder}
                ref={ref}
                type={type}
                onClick={clickToSelect ? copyOnClick : undefined }
                className={clsx(!disabled ? textInputClass+ " " + className : textInputClass + " " + disabledClass + " " + className)}
                // className={`w-full rounded-md p-[0.5rem] shadow-md text-base border-2 border-gray-200 focus:border-tertiary focus:outline-hidden focus:ring disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 ${className || ""}`}
                {...props}
            />
            {clickToSelect && copiedFeedback && (
                <button
                    onClick={clickToSelect ? copyOnClick : undefined }
                    type="button"
                    aria-label={name}
                    className={clsx(copySucces ? "bg-green-100 text-green-600" : "bg-gray-50 text-gray-600" , copySpanClass + ' ' + "copy-button")}
                >
                    {copiedFeedback}
                </button>
            )}
        </div>
        {/* {copiedFeedback &&
            <span className="text-green-500 -mt-4">{copiedFeedback}</span>
        } */}
            </>
    );
};

TextInput.displayName = "TextInput";

export default TextInput;