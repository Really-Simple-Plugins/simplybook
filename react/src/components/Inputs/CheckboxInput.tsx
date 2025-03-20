import React, {forwardRef, InputHTMLAttributes, useEffect, useState} from "react";

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Styled text input component
 * @param props - Props for the input component
 * @returns {JSX.Element} The rendered input element
 */
const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
    ({ label, className, checked, value, onChange, ...props }, ref) => {

        // Change the absolute position depending if there's text next to the checkbox
        // Do we accept no text next to a checkbox?
        // Change it later to Tailwindcss v4 syntax
        let top = !label || label.length === 0 ? "0.5" : "1";

        return (
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only peer"
                    {...props}
                />
                <div
                    className={"w-10 h-6 bg-gray-200  peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-"+top+" after:left-0.5 after:bg-white after:border-gray-200 after:border after:rounded-full after:aspect-square after:h-4 after:w-4 after:transition-all"}
                ></div>
                <span className={`ml-2 leading-5 font-medium text-black text-label ${className || ""}`}>
                    {label}
              </span>
            </label>
        );
    }
);


CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
