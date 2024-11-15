import { forwardRef } from "react";
import TextInput from "../Inputs/TextInput";
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
const TextField = forwardRef(
  ({ field, fieldState, label, help, context, className, ...props }, ref) => {
    // Generate a unique ID for the input if not provided
    const inputId = props.id || field.name;

    return (
      <FieldWrapper
        label={label}
        help={help}
        error={fieldState.error?.message}
        context={context}
        className={className}
        inputId={inputId}
      >
        <TextInput {...field} id={inputId} type="text" {...props} />
      </FieldWrapper>
    );
  },
);

export default TextField;
