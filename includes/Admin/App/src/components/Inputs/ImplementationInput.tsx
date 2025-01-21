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
                    className={`relative flex flex-col items-center justify-center p-4 rounded-lg border  text-center 
            transition duration-300 ease-in-out 
            ${
                        option.is_premium
                            ? "bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed"
                            : value === option.value
                            ? "bg-blue-50 border-blue-500 cursor-pointer"
                            : "bg-gray-100 hover:bg-gray-200 border-gray-300 cursor-pointer"
                    }`}
                >
                    <span className="text-lg font-medium">{option.label}</span>
                    {option.description && (
                        <span className="text-sm text-gray-500 mt-1">{option.description}</span>
                    )}
                    {option.is_premium && (
                        <span className="absolute -top-3 -right-5 cursor-pointer">
                            <LoginLink className={"cursor-pointer"} isButton={true} btnVariant='premium' page="client" >{__('Premium', 'simplybook')}</LoginLink>
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default ImplementationInput;
