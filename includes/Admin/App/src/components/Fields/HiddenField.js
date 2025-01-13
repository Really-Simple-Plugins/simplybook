import { forwardRef } from "react";
import HiddenInput from "../Inputs/HiddenInput";

/**
 * HiddenField component
 * @param {object} setting
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 */
const HiddenField = forwardRef(
    ({ setting, field, fieldState, label, help, context, className, ...props }, ref) => {
        return (
                <HiddenInput
                    {...field}
                    id={setting.id}
                    type="hidden"
                    aria-invalid={!!fieldState?.error?.message}
                    {...props}
                />
        );
    },
);

HiddenField.displayName = 'HiddenField';
export default HiddenField;
