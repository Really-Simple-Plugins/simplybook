import React, { MouseEvent } from "react";
import { __ } from "@wordpress/i18n";
import LoginLink from "../Common/LoginLink";
interface Option {
    value: string;
    label: string;
    description?: string;
    is_premium?: boolean;
}

interface ImplementationInputProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}

const ImplementationInput: React.FC<ImplementationInputProps> = ({
    options,
    value,
    onChange,
                                                                 }) => {
    const handleOnChange = (e: MouseEvent<HTMLButtonElement>, value: string, option: Option) => {
        e.preventDefault();
        if (option.is_premium) {
            return;
        }

        onChange(value);
    };

    return (
        <div className="flex gap-4">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={(e) => handleOnChange(e, option.value, option )}
                    className={`relative flex flex-col items-start justify-start px-4 py-3 rounded-lg border text-center 
            transition duration-300 ease-in-out w-full 
            ${
                            value === option.value
                            ? "bg-primary-lighter border-blue-500 cursor-pointer"
                            : "bg-white hover:bg-primary-lighter border-gray-300 hover:border-blue-500 cursor-pointer"
                    }`}
                >
                    <span className="text-lg font-medium">{option.label}</span>
                    {option.description && (
                        <span className="text-sm text-gray-500 mt-1">{option.description}</span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default ImplementationInput;
