import React from "react";
import { Link } from "@tanstack/react-router";
import Icon from "../Common/Icon";
import LoginLink from "../Common/LoginLink";

const menuItemClassName =
  "py-2 px-5 text-base text-sb-gray border-transparent [&.active]:font-semibold [&.active]:text-tertiary hover:border-gray-500 hover:bg-gray-100 focus:outline-hidden";

const SettingsMenuItem = React.memo(({ item }) => {
  const isExternalLink = Boolean(item.url);
  const to = isExternalLink ? item.url : `/settings/${item.id}`;
  const target = isExternalLink ? "_blank" : undefined;
  const titleSuffix = isExternalLink ? (
    <Icon name="square-arrow-up-right" className="px-2" />
  ) : (
    ""
  );

  if ( isExternalLink ) {
    return (
        <LoginLink 
          iconName="square-arrow-up-right"
          iconClass="px-2"
          className={menuItemClassName} 
          page={to} 
        >
          {item.title}
        </LoginLink>
    )
  }

  return (
    <Link to={to} className={menuItemClassName} target={target}>
      {item.title}
      {titleSuffix}
    </Link>
  );
});

SettingsMenuItem.displayName = "SettingsMenuItem";

export default SettingsMenuItem;
