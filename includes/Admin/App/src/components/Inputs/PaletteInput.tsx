import React from "react";
import {__} from "@wordpress/i18n";
import * as Label from "@radix-ui/react-label";

type PaletteInputProps = {
    id?: string;
    label?: string;
    colors?: string[];
    onChange?: (value: string) => void;
    value?: string;
};

/**
 * Styled button component
 */
const PaletteInput: React.FC<PaletteInputProps> = ({id, label, colors, onChange, value }) => {
    const handleChange = () => {
        console.log(id);
        console.log(id)
        if (onChange && id ) {
            onChange(id);
        }
    }
    console.log("value " ,value);
    return (
        <div onClick={(e) => handleChange()} className={"cursor-pointer"}>
            <p className={"pb-1 font-medium text-black text-md "}>
                {label}
            </p>
            <div className="flex space-x-2 pb-4">
                <div className="border border-gray-300 p-2 gap-2 flex">
                    {colors?.map((color, index) => (
                        <div key={index} className={"w-20 h-6 bg-[" + color + "] border border-gray-300"}></div>
                    ))}
                </div>
                <div className="flex items-center space-x-2 text-indigo-600 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                    </svg>
                    <span>{value === id ? 'live' : 'preview'}</span>
                </div>

            </div>

        </div>
    );
};

PaletteInput.displayName = 'PaletteInput';

export default PaletteInput;
