import React from "react";
import clsx from "clsx";
import { Link } from "@tanstack/react-router";
import Icon from "../Common/Icon";
import { __ } from "@wordpress/i18n";
import { ButtonLinkProps } from "../../types/buttons/ButtonLinkProps";
import useLoginData from "../../hooks/useLoginData";

const ButtonLink: React.FC<ButtonLinkProps> = ({
    className = "",
    children,
    link = "",
    linkClassName = "",
    btnVariant,
    disabled = false,
    target,
    loginLink = "",
    icon = false,
    iconName = "",
    iconSize = "",
    iconClass = "",
    iconStyle,
    onClick,
    reverseIcon = false,
}) => {
  const { fetchLinkData } = useLoginData();

  const loginTo = ( e:any , page:string ) => {
    e.preventDefault();

    // Start fetch when the link is clicked
    fetchLinkData().then((response) => {
        let link = response?.data?.simplybook_external_login_url;

        if (!link) {
            console.error("No link found in response");
            return;
        }

        let finalUrl = `${link}/${page}/`;
        if (link.includes("by-hash")) {
            finalUrl = `${link}?back_url=/${page}/`;
        }

        window.open(finalUrl, "_blank");
        window.focus();
    }).catch((error) => {
        console.error("Error fetching login URL:", error);
    });

  };

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
    }
  );

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : "";
  const reverseClass = reverseIcon ? 'flex-row-reverse' : 'flex-row';



  if (className.length > 0) {
    buttonVariants = buttonVariants + ' ' + className;
  }

  return (
    <>
    <Link
      className={clsx(linkClassName,"text-sm font-semibold", disabledClass)}
      to={link}
      onClick={loginLink ? (e) => loginTo(e, loginLink) : onClick}
      target={target}
      >
      <div className={clsx(buttonVariants, reverseClass, className)}>
          {iconName &&
            <Icon className={clsx(iconClass, { 'mr-2': !reverseIcon, 'ml-2': reverseIcon })} name={iconName} size={iconSize} style={iconStyle} />
          }
              {children}
      </div>
    </Link>
    </>
  );
};

ButtonLink.displayName = "ButtonLink";

export default ButtonLink;