import React from "react";
import { Link } from "@tanstack/react-router";
import { clsx } from "clsx";

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
  className="",
  type,
  children,
  onClick,
  link,
  btnVariant,
  disabled = false,
}) => {
  let localClassName = clsx(
    // Base styles
    "rounded-full transition-all duration-200 p-4 cursor-pointer",
    {
      'bg-secondary text-white hover:bg-secondary-dark ' : btnVariant == 'primary',
      'bg-tertiary text-white hover:bg-tertiary-dark ' : btnVariant == 'secondary',
      'border-2 border-tertiary bg-transparent text-black hover:bg-tertiary-light ': btnVariant == 'tertiary'
    },
    {
     'opacity-50 cursor-not-allowed ': disabled
    }
  );

  //if props.className is not empty, replace className with props.className
  if (className.length>0) {
    localClassName = localClassName + ' ' + className;
  }
  if (link) {
    return (
      <Link
        to={link.to}
        className={localClassName}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={localClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

ButtonInput.displayName = 'ButtonInput';

export default ButtonInput;
