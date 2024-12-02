import React, { forwardRef, InputHTMLAttributes } from "react";

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: string;
}

/**
 * Styled text input component
 * @param props - Props for the input component
 * @returns {JSX.Element} The rendered input element
 */
const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(({ type = "checkbox", className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            type={type}
            checked={!!props.value}
            className={`rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 ${className || ''}`}
            {...props}
        />
    );
});

CheckboxInput.displayName = 'CheckboxInput';

export default CheckboxInput;
