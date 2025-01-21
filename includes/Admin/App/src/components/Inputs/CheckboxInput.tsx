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
                    className="w-8 h-4 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all"
                ></div>
                <span className={`ml-2 font-medium text-black text-md ${className || ""}`}>
                    {label}
              </span>
            </label>
        );
    }
);


CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
