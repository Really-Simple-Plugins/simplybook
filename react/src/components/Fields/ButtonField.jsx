import { forwardRef } from "react";
import ButtonInput from "../Inputs/ButtonInput";
import FieldWrapper from "../Forms/FieldWrapper";
import Icon from "../Common/Icon";
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
const ButtonField = forwardRef(({
     setting,
     label,
     help,
     context,
     className,
     button,
     ...props
}, ref) => {
        return (
            <FieldWrapper
                label=""
                help={help}
                context={context}
                className={className}
                inputId=""
            >
                <ButtonInput
                    btnVariant={button?.btnVariant}
                    disabled={button?.disabled}
                    showLoader={button?.showLoader}
                    onClick={button?.onClick}
                    {...props}
                >
                    {props.showLoader && <Icon color="white" name="spinner" size="1x" className="mr-2" />}
                    {label}
                </ButtonInput>
            </FieldWrapper>
        );
    },
);

ButtonField.displayName = 'ButtonField';

export default ButtonField;