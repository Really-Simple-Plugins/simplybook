import { forwardRef } from "react";
import FieldWrapper from "../Forms/FieldWrapper";
import SelectInput from "../Inputs/SelectInput";

/**
 * SelectField component
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} options
 * @return {JSX.Element}
 */
const SelectField = forwardRef(
    ({ setting, field, fieldState, label, help, context, className, options, ...props }, ref) => {
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
                <SelectInput
                    id={inputId}
                    options={options}
                    aria-invalid={!!fieldState?.error?.message}
                    {...field} // Spread field to include onChange, onBlur, etc.
                    ref={ref} // Forward the ref if needed
                    {...props}
                />
            </FieldWrapper>
        );
    },
);

SelectField.displayName = "SelectField";
export default SelectField;