import React from "react";
import { Link } from "@tanstack/react-router";

const menuItemClassName =
  "py-2 px-5 border-l-4 text-black border-transparent [&.active]:border-blue-500 hover:border-gray-500 hover:bg-gray-100 focus:outline-none";

const SettingsMenuItem = React.memo(({ item }) => {
  const isExternalLink = Boolean(item.url);
  const to = isExternalLink ? item.url : `/settings/${item.id}`;
  const target = isExternalLink ? "_blank" : undefined;
  const titleSuffix = isExternalLink ? " (O)" : "";

  return (
    <Link to={to} className={menuItemClassName} target={target}>
      {item.title}
      {titleSuffix}
    </Link>
  );
});

export default SettingsMenuItem;
