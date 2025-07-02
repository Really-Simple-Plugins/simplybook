import React, { forwardRef, useState } from "react";
import { ChromePicker } from "react-color";

interface ColorPickerProps {
    colorValue?: string; // The initial color value
    onChangeComplete?: (color: string) => void; // Callback for when color change is finalized
}

/**
 * Styled color picker component
 * @param props - Props for the color picker
 * @returns {JSX.Element} The rendered color picker element
 */
const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
    ({ colorValue = "#ffffff", onChangeComplete }, ref) => {
        const [color, setColor] = useState(colorValue);

        const handleChange = (color: { hex: string }) => {
            setColor(color.hex);
        };

        return (
            <div ref={ref}>
                <ChromePicker
                    color={color}
                    onChange={handleChange}
                    onChangeComplete={(color) => onChangeComplete?.(color.hex)}
                    disableAlpha={true}
                />
            </div>
        );
    }
);

ColorPicker.displayName = "ColorPicker";

export default ColorPicker;
