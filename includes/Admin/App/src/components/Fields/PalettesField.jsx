import React, { forwardRef, useEffect, useState } from "react";
import TextInput from "../Inputs/TextInput";
import FieldWrapper from "../Forms/FieldWrapper";
import useSettingsData from "../../hooks/useSettingsData";
import PaletteInput from "../Inputs/PaletteInput";
import FormField from "../Forms/FormField";

/**
 * PalettesField component
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 */
const PalettesField = forwardRef(
    ({ setting, fieldState, label, help, context, className, ...props }, ref) => {
        const inputId = setting.id;
        console.log(fieldState, props);
        return (
            <FieldWrapper
                label={label}
                help={help}
                error={fieldState?.error?.message}
                context={context}
                className={className}
                inputId={inputId}
                required={props.required}
            >
                {setting.options.map((option, index) => (
                    <PaletteInput
                        key={index}
                        id={option.id}
                        label={option.label}
                        colors={option.colors}
                        onChange={props?.onChange}
                        value={props?.value}
                    />
                    ))}
                {
            }
            </FieldWrapper>
        );
    },
);

PalettesField.displayName = "PalettesField";
export default PalettesField;
