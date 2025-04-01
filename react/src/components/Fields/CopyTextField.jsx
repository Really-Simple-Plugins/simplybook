import * as Label from "@radix-ui/react-label";
import {forwardRef} from "react";
import TextInput from "../Inputs/TextInput";
import {__} from "@wordpress/i18n";

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
const CopyTextField = forwardRef(
    ({
         setting,
         fieldState,
         name,
         label,
         help,
         context,
         className,
         type,
         ...props
    }, ref) => {

        const inputId = setting.id;
        props.disabled = true;

        const copyOnClick = () => {
            navigator.clipboard.writeText(setting.value).then(function(response) {
                const button = document.querySelector(`button[aria-label="${name}"]`);

                if (!button) {
                    throw new Error('Button not found');
                }

                button.innerText = __("Copied", "simplybook");
                setTimeout(() => {
                    button.innerText = __("Copy", "simplybook");
                }, 1000);
            }).catch(function (error) {
                console.error("Error copying text: ", error);
            });
        }

        return (
            <div className="flex w-full flex-col mb-4">
                <Label.Root
                    className="cursor-pointer pb-2 font-medium text-black text-label"
                    htmlFor={inputId}
                >
                    {label}
                </Label.Root>
                {help && (
                    <p className="pb-1 text-xs font-light text-gray-600">{help}</p>
                )}
                <div className="relative">
                    <TextInput
                        ref={ref}
                        id={inputId}
                        type={type}
                        disabled={true}
                        aria-invalid={!!fieldState?.error?.message}
                        {...props}
                    />
                    <button
                        type="button"
                        aria-label={name}
                        className="absolute cursor-pointer right-[0.5rem] top-1/2 transform -translate-y-1/2 bg-gray-50 text-gray-600 rounded-md px-2 py-1 text-xs font-semibold"
                        onClick={copyOnClick}
                    >
                        {__("Copy", "simplybook")}
                    </button>
                </div>
            </div>
        );
    },
);

CopyTextField.displayName = "CopyTextField";
export default CopyTextField;