import React from "react";
import clsx from "clsx";
import { Link } from "@tanstack/react-router";
import Icon from "../Common/Icon";
import { __ } from "@wordpress/i18n";
import { ButtonLinkProps } from "../../types/buttons/ButtonLinkProps";

const ButtonLink: React.FC<ButtonLinkProps> = ({ 
    className = "", 
    children,
    btnVariant,
    disabled = false,
    target,
    link,
    onClick,
    icon = false,
    iconName,
    iconSize,
    name
}) => {

  let buttonVariants = clsx(
    // Base styles
    "rounded-full transition-all duration-200 px-4 py-2 cursor-pointer",
    {
      'bg-secondary text-white hover:bg-secondary-dark ' : btnVariant == 'primary',
      'border-black border-3 bg-transparent text-primary hover:border-black hover:text-black ml-4' : btnVariant == 'ghost',
      'bg-tertiary text-white hover:bg-tertiary-dark ' : btnVariant == 'secondary',
      'border-2 border-tertiary bg-transparent text-black hover:bg-tertiary-light ': btnVariant == 'tertiary'
    },
    {
    //  'opacity-50 cursor-not-allowed ': disabled
    }
  );

  if (className.length > 0) {
    buttonVariants = buttonVariants + ' ' + className;
  }


  return (
    <>
    <Link target={target} to={link} className="text-base text-tertiary font-semibold">
      <div className={clsx("", buttonVariants)}>
          {icon && 
            <Icon className="mr-2" name={iconName} size={iconSize} />
          }
              {children}
      </div>
      </Link>
    </>
  );
};

ButtonLink.displayName = "ButtonLink";

export default ButtonLink;
