import React, {forwardRef, InputHTMLAttributes, useEffect, useState} from "react";
import clsx from "clsx";

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
    ({ 
        label, 
        className, 
        checked, 
        value, 
        onChange, 
        ...props 
    }, ref) => {

        const checkBoxClasses = clsx(
            "w-10 h-6 bg-gray-200  peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-0.5 after:bg-white after:border-gray-200 after:border after:rounded-full after:aspect-square after:h-4 after:w-4 after:transition-all" 
        );

        return (
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only peer"
                    {...props}
                />
                <div className={clsx(checkBoxClasses, className)}></div>
                {label && (                    
                    <span className={`ml-2 leading-5 font-medium text-black text-label ${className || ""}`}>
                        {label}
                    </span>
                )}
            </label>
        );
    }
);


CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
