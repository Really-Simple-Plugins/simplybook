import { forwardRef } from "react";
import ButtonInput from "../Inputs/ButtonInput";
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
const ButtonField = forwardRef(
  ({ field, label, help, context, className, ...props }, ref) => {
    return (
      <FieldWrapper
        help={help}
        context={context}
        className={className}
      >
        <ButtonInput {...field} {...props}>
          {label}
        </ButtonInput>
      </FieldWrapper>
    );
  },
);

ButtonField.displayName = 'ButtonField';

export default ButtonField;
