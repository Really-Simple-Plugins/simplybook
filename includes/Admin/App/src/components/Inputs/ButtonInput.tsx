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
  showLoader?: boolean;
  size?: "sm" | "md" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Styled button component
 */
const ButtonInput: React.FC<ButtonInputProps> = ({
  children,
  onClick,
  link,
  btnVariant = "secondary",
  disabled = false,
 showLoader = false,
  size = "md",
  ...props
}) => {
  let className = clsx(
    // Base styles
    "rounded-full transition-all duration-200",
    {
      'bg-secondary text-white hover:bg-secondary-dark': btnVariant === 'primary',
      'bg-tertiary text-white hover:bg-tertiary-dark': btnVariant === 'secondary',
      'border-2 border-tertiary bg-transparent text-black hover:bg-tertiary-light': btnVariant === 'tertiary'
    },
    {
      'py-.5 px-3 font-normal text-xs border-1': size === 'sm',
      'py-2 px-6 font-semibold': size === 'md',
      'py-3 px-8 text-lg font-semibold': size === 'lg'
    },
    {
     'opacity-50 cursor-not-allowed': disabled
    }
  );

  //if props.className is not empty, replace className with props.className
  if (props.className) {
    className = props.className;
  }
  if (link) {
    return (
      <Link
        to={link.to}
        className={className}
        {...props}
      >
        {children}
      </Link>
    );
  }

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
