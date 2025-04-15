import React from "react";
import { Link } from "@tanstack/react-router";
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
  btnVariant,
  disabled = false,
}) => {
  let buttonVariants = clsx(
    // Base styles
    "transition-all duration-200 p-4 cursor-pointer",
    {
      'rounded-full  bg-secondary text-white hover:bg-secondary-dark ' : btnVariant == 'primary',
      'rounded-full  bg-tertiary text-white hover:bg-tertiary-dark ' : btnVariant == 'secondary',
      'rounded-full  border-2 border-tertiary bg-transparent text-black hover:bg-tertiary-light ': btnVariant == 'tertiary',
      'rounded-md   bg-tertiary text-sm text-white font-bold hover:bg-tertiary-light px-5 py-2 hover:bg-tertiary-light hover:text-tertiary': btnVariant == 'premium'
    },
    {
     'opacity-50 cursor-not-allowed ': disabled
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
