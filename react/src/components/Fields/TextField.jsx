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
  ({ setting, fieldState, name, label, help, context, className, type, ...props }, ref) => {
    const inputId = setting.id; 
    return (
      <FieldWrapper
        label={label}
        help={help}
        error={fieldState?.error?.message}
        context= {context}
        className={className}
        inputId={inputId}
        requiredMessage={props.required}
      >
        <TextInput
          name={name}
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={!!fieldState?.error?.message}
          {...props}
        />
      </FieldWrapper>
    );
  },
);

TextField.displayName = "TextField";
export default TextField;
