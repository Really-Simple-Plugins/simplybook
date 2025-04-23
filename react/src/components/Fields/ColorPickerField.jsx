import {forwardRef, useEffect, useMemo, useState} from "react";
import ColorPicker from "../Inputs/ColorPicker";
import FieldWrapper from "../Forms/FieldWrapper";
import * as Popover from '@radix-ui/react-popover';
import useWaitForRegistrationCallback from "../../hooks/useWaitForRegistrationCallback";
import debounce from "lodash.debounce"; // You can use lodash's debounce function

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
                <Popover.Root
                    open={popoverOpen} onOpenChange={handlePopoverOpenChange}
                >
                    <Popover.Trigger
                        className='p-[5px] mr-2 bg-transparent rounded-md border border-gray-400 min-w-[140px] w-full text-sm'
                    >
                        <div className={disabledClass+" whitespace-nowrap min-w-5 flex p-1.5 gap-3.5 items-center"}>
                            <div className="rounded-full min-w-5 h-5 border border-gray-300" style={{ backgroundColor: color }}></div>
                            {label}
                        </div>
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content >
                            <ColorPicker colorValue={color} onChangeComplete={handleColorChange} />
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            )
        }

        return (
            <FieldWrapper
                label=''
                help={help}
                error={fieldState?.error?.message}
                context={context}
                className={className}
                inputId={setting.id}
                required={props.required}
            >
                <div className="">
                    <ColorPickerElement setting={setting} label={label} />
                </div>
            </FieldWrapper>
        );
    },
);

ColorPickerField.displayName = "ColorPickerField";
export default ColorPickerField;