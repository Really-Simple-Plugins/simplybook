import React from "react";
import { Link } from "@tanstack/react-router";

type ButtonInputProps = {
  children: React.ReactNode;
  onClick?: () => void;
  link?: {
    to: string;
    from?: string;
  };
  btnVariant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Styled button component
 */
const ButtonInput: React.FC<ButtonInputProps> = ({
  children,
  onClick,
  btnVariant = "secondary", // default is secondary because there needs to be a good reason to use primary
  disabled = false,
  ...props
}) => {
  // Base styles for both variants
  const baseStyles =
    "font-semibold py-2 px-6 rounded-full transition-all duration-200";

  // Variants for primary and secondary buttons
  const variants = {
    primary: "bg-secondary text-white hover:bg-secondary-dark",
    secondary: "bg-tertiary text-white hover:bg-tertiary-dark",
    tertiary:
      "border-2 border-tertiary bg-transparent text-black hover:bg-tertiary-light",
  };

  // Disabled styles
  const disabledStyles = "opacity-50 cursor-not-allowed";

  // Final className based on variant and disabled state
  const className = `${baseStyles} ${variants[btnVariant]} ${disabled ? disabledStyles : ""}`;

  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

ButtonInput.displayName = 'ButtonInput';

export default ButtonInput;
