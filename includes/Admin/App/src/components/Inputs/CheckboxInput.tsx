import React, {forwardRef, InputHTMLAttributes, useEffect, useState} from "react";

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  label: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Styled text input component
 * @param props - Props for the input component
 * @returns {JSX.Element} The rendered input element
 */
const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
    ({ type = "checkbox", label, className, checked, value, onChange, ...props }, ref) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log('CheckboxInput handleChange', e.target.checked);
            // Call onChange to propagate the event to the Controller
            if (onChange) {
                onChange(e);
            }
        };

        return (
            <>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only peer"
                    {...props}
                />
                <div
                    className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"
                ></div>
                <span className={` ${className || ""}`}>
                    {label}
              </span>
                </>
        );
    }
);


CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
