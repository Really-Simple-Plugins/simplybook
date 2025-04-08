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
    btnVariant,
    disabled = false,
    target,
    loginLink = "",
    link = "",
    icon = false,
    iconName,
    iconSize,
}) => {
  const { fetchLinkData } = useLoginData();

  const loginTo = ( e:any , page:string ) => {
    e.preventDefault();

    // Start fetch when the link is clicked
    fetchLinkData().then((response) => {
        let link = response?.data?.simplybook_dashboard_url;

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
    "rounded-full transition-all duration-200 px-4 py-2 cursor-pointer",
    {
      'bg-secondary text-white hover:bg-secondary-dark ' : btnVariant == 'primary',
      'border-black border-3 bg-transparent text-primary hover:border-black hover:text-black ml-4' : btnVariant == 'ghost',
      'bg-tertiary text-white hover:bg-tertiary-dark ' : btnVariant == 'secondary',
      'border-2 border-tertiary bg-transparent text-black hover:bg-tertiary-light ': btnVariant == 'tertiary',
      'rounded-md py-2 px-6 text-white text-sm': btnVariant == 'square-small',
      'opacity-50 cursor-not-allowed ': btnVariant == 'disabled'
    }
  );

  if (className.length > 0) {
    buttonVariants = buttonVariants + ' ' + className;
  }

  return (
    <>
    <Link to={link} onClick={loginLink ? (e) => loginTo(e, loginLink) : undefined} target={target} className="text-base text-tertiary font-semibold">
      <div className={clsx(buttonVariants, className)}>
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