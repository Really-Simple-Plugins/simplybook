import { forwardRef, useEffect, useState } from "react";
import FieldWrapper from "../Forms/FieldWrapper";
import SelectInput from "../Inputs/SelectInput";
import getServices from "../../api/endpoints/getServices";
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
const SelectField = forwardRef(
    ({ setting, fieldState, label, help, context, className, options, ...props }, ref) => {
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
                    value={ setting.value }
                    id={inputId}
                    options={options}
                    aria-invalid={!!fieldState?.error?.message}
                    setting={setting}
                    {...props}
                />
            </FieldWrapper>
        );
    },
);

SelectField.displayName = "SelectField";
export default SelectField;
