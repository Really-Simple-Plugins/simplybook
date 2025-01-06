import {forwardRef, useEffect, useState} from "react";
import ColorPicker from "../Inputs/ColorPicker";
import FieldWrapper from "../Forms/FieldWrapper";
import * as Popover from '@radix-ui/react-popover';

/**
 * TextField component
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
    ({ setting, fieldState, label, help, context, className, onChange, defaultValue, ...props }, ref) => {
        const [color, setColor] = useState(setting.default);

        useEffect(() => {
            if (props.value !== color) {
                setColor(props.value);
            }
        }, [props.value]);

        const ColorPickerElement = ({label}) => {
            const handleColorChange = (color, event) => {
                console.log("update color in colorpickerfield", color);
                setColor(color);
                onChange(color);
            }

            return (
                <Popover.Root>
                    <Popover.Trigger className='p-[5px] mr-2 bg-transparent rounded-md border border-gray-400 min-w-[140px] text-sm'>
                        <div className="cursor-pointer min-w-5 flex p-1.5 gap-3.5 items-center" >
                            <div className="rounded-full min-w-5 h-5 border border-gray-300" style={{backgroundColor: color}}></div>
                            {label}
                        </div>
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content>
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
                    <ColorPickerElement setting={setting} label={label}/>
                </div>
            </FieldWrapper>
        );
    },
);

ColorPickerField.displayName = "ColorPickerField";
export default ColorPickerField;
