import { memo } from "react";
import clsx from "clsx";
import { Link } from "@tanstack/react-router";
import Icon from "../Common/Icon";
import { __ } from "@wordpress/i18n";

const ButtonLink = memo(({ 
    className = "", 
    children,
    target,
    href,
    onClick,
    icon = false,
    iconName,
    iconSize,
    name
}) => {
  return (
    <>
    <div className={clsx("flex items-center px-4 py-2 rounded-4xl duration-200 ease-in-out bg-tertiary", className)}>
        {icon && 
          <Icon className="mr-2" name={iconName} size={iconSize} />
        }
        <Link target={target} to={href} className="text-base text-tertiary font-semibold">
            {children}
        </Link>
    </div>
    </>
  );
});

ButtonLink.displayName = "ButtonLink";

export default ButtonLink;
