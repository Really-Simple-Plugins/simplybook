import {forwardRef, useEffect, useState} from "react";
import ColorPicker from "../Inputs/ColorPicker";
import FieldWrapper from "../Forms/FieldWrapper";
import * as Popover from '@radix-ui/react-popover';

/**
 * ColorPickerField component
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 */
const ColorPickerField = forwardRef(
    ({ setting, fieldState, label, help, context, className, onChange, defaultValue, setColorOnClose, ...props }, ref) => {

        const [color, setColor] = useState((setting.value || setting.default));
        const [popoverOpen, setPopoverOpen] = useState(false);

        useEffect(() => {
            if (props.value && props.value !== color) {
                setColor(props.value);
            }
        }, [props.value]);

        const handlePopoverOpenChange = (open) => {
            setPopoverOpen(open);

            if (!open && setColorOnClose) {
                setColorOnClose(color);
            }
        };

        const handleColorChange = (color, event) => {
            setColor(color);

            if (onChange) {
                onChange(color);
            }
        }

        const ColorPickerElement = ({ label }) => {

            let disabledClass = setting.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

            return (
                <>
                    <Popover.Root
                        open={popoverOpen} onOpenChange={setting.disabled ? () => {} : handlePopoverOpenChange}
                    >
                        <Popover.Trigger
                            className='p-1 w-full bg-transparent rounded-md border border-gray-400 min-w-[140px] text-base'
                        >
                            <div className={disabledClass+" text-left xl:whitespace-wrap xl:text-center min-w-5 flex p-1.5 gap-3.5 items-center"}>
                                <div className="rounded-full min-w-5 h-5 border border-gray-300" style={{ backgroundColor: color }}></div>
                                {label}
                            </div>
                        </Popover.Trigger>
                        <Popover.Portal>
                            {/*Footer has z-index 10, we need higher z-index*/}
                            <Popover.Content style={{ zIndex: 11 }}>
                                <ColorPicker colorValue={color} onChangeComplete={handleColorChange} />
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                </>
            )
        }

        return (
            <>
                <FieldWrapper
                    label=''
                    help={help}
                    error={fieldState?.error?.message}
                    context={context}
                    className={className}
                    inputId={setting.id}
                    required={props.required}
                >
                <ColorPickerElement setting={setting} label={label} />
                </FieldWrapper>
            </>
        );
    },
);

ColorPickerField.displayName = "ColorPickerField";
export default ColorPickerField;