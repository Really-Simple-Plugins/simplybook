import React, { forwardRef, useRef, useState, useEffect } from "react";
import FieldWrapper from "../Forms/FieldWrapper";
import PaletteInput from "../Inputs/PaletteInput";
import Calendar from "../Common/Calendar";

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
        const [showPreview, setShowPreview] = useState(false);
        const previewRef = useRef(null);
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (previewRef.current && !previewRef.current.contains(event.target)) {
                    setShowPreview && setShowPreview(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [setShowPreview]);

        return (
            <FieldWrapper
                label={label}
                help={help}
                error={fieldState?.error?.message}
                context={context}
                className={className+" relative"}
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
                        setShowPreview={setShowPreview}
                    />
                    ))}
                { showPreview &&
                        <div ref={previewRef} style={{ insetInlineEnd: '-200px' }} className="absolute top-0"><Calendar /></div>
                }
            </FieldWrapper>
        );
    },
);

PalettesField.displayName = "PalettesField";
export default PalettesField;
