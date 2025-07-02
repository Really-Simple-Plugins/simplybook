import React, {useEffect} from "react";
import {__} from "@wordpress/i18n";
import * as Label from "@radix-ui/react-label";
import useSettingsData from "../../hooks/useSettingsData";
import Icon from "../Common/Icon";

type PaletteInputProps = {
    id?: string;
    label?: string;
    colors?: string[];
    onChange?: (value: string) => void;
    value?: string;
    setShowPreview?: (value: boolean) => void;
};

/**
 * Styled button component
 */
const PaletteInput: React.FC<PaletteInputProps> = ({id, label, colors, onChange, value, setShowPreview }) => {
    const [actualColors, setActualColors] = React.useState(colors);
    //
    // @ts-ignore
    const { getValue, setValue, settings, saveSettings, invalidateSettings } = useSettingsData();

    const handleChange = () => {
        console.log(id);
        if (onChange && id ) {
            //also update all colors
            if (id!=='custom' && Array.isArray(colors)) {
                let colorMapping = {
                    'sb_base_color' :0,
                    'booking_nav_bg_color':0,
                    'btn_color_1':1,
                    'body_bg_color':2,
                    'light_font_color':3,
                    'dark_font_color':4
                }

                Object.entries(colorMapping).forEach(([color, index]) => {
                    if ( colors && colors.hasOwnProperty(index) ) {
                        console.log("set color", color, colors[index], "of index", index);
                        setValue(color, colors[index]);
                    }
                });
            }
            console.log("palettes", id, "value", value);
            setValue("palette", id);

            onChange(id);

        }
    }

    useEffect(() => {
        //when custom, we load the custom colors in this palette.
        if ( id==='custom' ){
            let customColors: React.SetStateAction<string[]> = [];
            customColors.push(getValue('sb_base_color'));
            customColors.push(getValue('btn_color_1'));
            customColors.push(getValue('body_bg_color'));
            customColors.push(getValue('light_font_color'));
            customColors.push(getValue('dark_font_color'));
            setActualColors(customColors);
        }
    }, [settings]);
    console.log("value " ,value);

    return (
        <div>
            <p className={"pb-1 font-medium text-black text-md "}>
                {label}
            </p>
            <div className="flex space-x-2 pb-4">
                <div className="border border-gray-300 p-2 gap-2 flex cursor-pointer" onClick={(e) => handleChange()}>
                    {actualColors?.map((color, index) => (
                        <div key={index} style={{ backgroundColor: color }} className={"w-20 h-6 border border-gray-300"}></div>
                    ))}
                </div>
                <div className="flex items-center space-x-2 cursor-pointer"
                    onClick={(e) => setShowPreview && setShowPreview(true)}
                >
                    <Icon name="eye" />
                    <span>{value === id ? __('live','simplybook') : __('preview','simplybook')}</span>
                </div>

            </div>

        </div>
    );
};

PaletteInput.displayName = 'PaletteInput';

export default PaletteInput;