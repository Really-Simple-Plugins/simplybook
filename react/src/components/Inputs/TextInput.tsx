import React from "react";
import clsx from "clsx";
import { TextInputProps } from "../../types/inputs/TextInputProps";

/**
 * Styled text input component
 */
const TextInput: React.FC<TextInputProps> = ({
    name,
    placeholder,
    type,
    className,
    clickToSelect = false,
    disabled = false,
    ...props
}) => {

    const [copiedFeedback, setCopiedFeedback] = React.useState("Copy");
    const [copySuccess, setCopySuccess] = React.useState(false);

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
                setCopySuccess(true);

                setTimeout(() => {
                    setCopiedFeedback("Copy");
                    setCopySuccess(false);
                }, 1000);
            }).catch(function (error) {
                console.error("Error copying text: ", error);
            });
        }
    }


    /**
     *
     * Define different field classes
    */
    const copySpanClass = "absolute cursor-pointer right-[0.5rem] top-5.5 transform -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold";
    const textInputClass = "input-base copy-input transition-[border-color] duration-300 ease-in-out";
    const disabledClass = disabled ? 'bg-gray-200 border-gray-200 text-black cursor-not-allowed' : '';

    return (
        <>
        <div className="w-full relative">
            <input
                name={name}
                placeholder={placeholder}
                type={type}
                onClick={clickToSelect ? copyOnClick : undefined }
                className={clsx(textInputClass + " " + disabledClass + " " + className)}
                disabled={disabled}
                {...props}
            />
            {clickToSelect && copiedFeedback && (
                <button
                    onClick={clickToSelect ? copyOnClick : undefined }
                    type="button"
                    aria-label={name}
                    className={clsx(copySuccess ? "bg-green-100 text-green-600" : "bg-gray-50 text-gray-600" , copySpanClass + ' ' + "copy-button")}
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