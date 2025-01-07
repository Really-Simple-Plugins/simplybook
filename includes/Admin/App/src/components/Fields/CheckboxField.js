import { forwardRef } from "react";
import CheckboxInput from "../Inputs/CheckboxInput";
import FieldWrapper from "../Forms/FieldWrapper";

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
const CheckboxField = forwardRef(
    ({ setting, fieldState, label, help, context, className, ...props }, ref) => {
        const inputId = setting.id;
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
                <CheckboxInput
                    id={inputId}
                    type="checkbox"
                    aria-invalid={!!fieldState?.error?.message}
                    {...props}
                />
            </FieldWrapper>
        );
    },
);

CheckboxField.displayName = 'CheckboxField';
export default CheckboxField;
