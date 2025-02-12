import React, {useEffect} from "react";
import {__} from "@wordpress/i18n";
import * as Label from "@radix-ui/react-label";
import useSettingsData from "../../hooks/useSettingsData";

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
    const [actualColors, setActualColors] = React.useState(colors);
    //
    // @ts-ignore
    const { getValue, setValue, settings, saveSettings, invalidateSettings } = useSettingsData();

    const handleChange = () => {
        console.log(id);
        console.log(id)
        if (onChange && id ) {
            onChange(id);
            //also update all colors


            if (id!=='custom' && Array.isArray(colors)) {
                let colorMapping = [
                    'sb_base_color',
                    'booking_nav_bg_color',
                    'btn_color_1',
                    'body_bg_color',
                    'light_font_color',
                    'dark_font_color'
                ]
                colorMapping.forEach((color, index) => {
                    if (colors.hasOwnProperty(index)) {
                        setValue(color, colors[index]);
                    }
                });
                console.log(settings);
            }

        }
    }

    useEffect(() => {
        //when custom, we load the custom colors in this palette.
        if (id==='custom'){
            let customColors: React.SetStateAction<string[]> = [];
            customColors.push(getValue('sb_base_color'));
            customColors.push(getValue('btn_color_1'));
            customColors.push(getValue('body_bg_color'));
            customColors.push(getValue('light_font_color'));
            customColors.push(getValue('dark_font_color'));
            setActualColors(customColors);
        }
    }, [settings, colors, value]);
    console.log("id " ,id, actualColors);

    return (
        <div onClick={(e) => handleChange()} className={"cursor-pointer"}>
            <p className={"pb-1 font-medium text-black text-md "}>
                {label}
            </p>
            <div className="flex space-x-2 pb-4">
                <div className="border border-gray-300 p-2 gap-2 flex">
                    {actualColors?.map((color, index) => (
                        <div key={index} style={{ backgroundColor: color }} className={"w-20 h-6 border border-gray-300"}></div>
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
