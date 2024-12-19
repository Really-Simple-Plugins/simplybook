import { forwardRef, useEffect, useState } from "react";
import TextInput from "../Inputs/TextInput";
import FieldWrapper from "../Forms/FieldWrapper";
import useSettingsData from "../../hooks/useSettingsData";

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
const TextField = forwardRef(
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
        <TextInput
          id={inputId}
          type="text"
          aria-invalid={!!fieldState?.error?.message}
          {...props}
        />
      </FieldWrapper>
    );
  },
);

TextField.displayName = "TextField";
export default TextField;
