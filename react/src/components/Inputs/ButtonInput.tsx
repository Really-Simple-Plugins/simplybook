import React from "react";
import { clsx } from "clsx";
import { ButtonInputProps } from "../../types/inputs/ButtonInputProps";

/**
 * Styled button component
 */
const ButtonInput: React.FC<ButtonInputProps> = ({
     className="",
     type,
     children,
     onClick,
     btnVariant = "primary",
     disabled = false,
     haveDisabledStyling = false
}) => {
    let buttonVariants = clsx(
        // Base styles
        "flex items-center justify-center rounded-full transition-all duration-200 px-3 py-1",
        {
            'bg-primary text-white hover:bg-primary-dark !p-4 text-base' : btnVariant == 'primary',
            'bg-primary text-white hover:bg-primary-dark ' : btnVariant == 'primary-small',
            'bg-secondary text-white hover:bg-secondary-dark !p-4 text-base' : btnVariant == 'secondary',
            'bg-secondary text-white hover:bg-secondary-dark ' : btnVariant == 'secondary-small',
            'bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary !p-4 text-base': btnVariant == 'tertiary',
            'bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary': btnVariant == 'tertiary-small',
            'border-2 border-black bg-transparent !p-4 text-base' : btnVariant == 'ghost',
            'border-2 border-black bg-transparent' : btnVariant == 'ghost-small',
            'bg-primary text-white rounded-md hover:bg-primary-dark !p-4 text-base': btnVariant == 'square',
            'rounded-md text-white': btnVariant == 'square-small',
            'border-2 border-primary text-primary rounded-md !p-4 text-base': btnVariant == 'square-ghost',
            'border-2 border-primary text-primary rounded-md': btnVariant == 'square-ghost-small',

            // Disabled styles
            'opacity-50 cursor-not-allowed': haveDisabledStyling || disabled,
            'cursor-pointer': !haveDisabledStyling || !disabled,
        }
    );

    //if props.className is not empty, replace className with props.className
    if (className.length>0) {
        buttonVariants = buttonVariants + ' ' + className;
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={buttonVariants}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

ButtonInput.displayName = 'ButtonInput';

export default ButtonInput;