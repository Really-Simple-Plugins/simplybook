import React from "react";
import { Link } from "@tanstack/react-router";
import Icon from "../Common/Icon";

const menuItemClassName =
  "py-2 px-5 border-l-4 text-black border-transparent [&.active]:border-tertiary hover:border-gray-500 hover:bg-gray-100 focus:outline-none";

const SettingsMenuItem = React.memo(({ item }) => {
  const isExternalLink = Boolean(item.url);
  const to = isExternalLink ? item.url : `/settings/${item.id}`;
  const target = isExternalLink ? "_blank" : undefined;
  const titleSuffix = isExternalLink ? (
    <Icon name="square-arrow-up-right" className="px-2" />
  ) : (
    ""
  );

  return (
    <Link to={to} className={menuItemClassName} target={target}>
      {item.title}
      {titleSuffix}
    </Link>
  );
});

SettingsMenuItem.displayName = "SettingsMenuItem";

export default SettingsMenuItem;
