import React, {forwardRef, InputHTMLAttributes, useEffect, useState} from "react";

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Styled text input component
 * @param props - Props for the input component
 * @returns {JSX.Element} The rendered input element
 */
const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
    ({ type = "checkbox", className, checked, value, onChange, ...props }, ref) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log('CheckboxInput handleChange', e.target.checked);
            // Call onChange to propagate the event to the Controller
            if (onChange) {
                onChange(e);
            }
        };

        return (
            <input
                checked={checked}
                ref={ref}
                onChange={handleChange}
                type={type}
                className={`rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 ${className || ""}`}
                {...props}
            />
        );
    }
);


CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
