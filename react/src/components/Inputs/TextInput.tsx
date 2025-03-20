import React, { forwardRef, InputHTMLAttributes } from "react";
import { __ } from "@wordpress/i18n";
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    clickToSelect?: boolean;
    storedValue?: string;
}
/**
 * Styled text input component
 * @param props - Props for the input component
 * @returns {JSX.Element} The rendered input element
 */
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    ({ type = "text", className, clickToSelect, ...props }, ref) => {
        const [copiedFeedback, setCopiedFeedback] = React.useState("");
        const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
            if (clickToSelect) {
                const input = event.target as HTMLInputElement;
                input.select();
                document.execCommand("copy");
                setCopiedFeedback(__("Copied!", "simplybook"));
                setTimeout(() => { 
                    setCopiedFeedback("");
                }, 2000);
            }
        };

        return (
            <>
                <input
                    ref={ref}
                    type={type}
                    className={`w-full rounded-md p-1 shadow-lg focus:border-tertiary focus:outline-hidden focus:ring disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 ${className || ""}`}
                    onClick={handleClick}
                    {...props}
                />
            {copiedFeedback &&
                <span className="text-green-500 -mt-4">{copiedFeedback}</span>
            }
                </>
        );
    },
);

TextInput.displayName = "TextInput";

export default TextInput;
