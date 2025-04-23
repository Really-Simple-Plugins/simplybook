import React from "react";
import clsx from "clsx";
import { __ } from "@wordpress/i18n";
import { NotificationSidebarProps } from "../../../types/NotificationSidebarProps";

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({
  className,
  children
}) => {

  return (
    <>
      <aside className="w-1/4">
          <h2 className="text-lg font-bold pb-2">{__("Notifications", "simplybook")}</h2>
          <div className="notification-feed">
            {children}
          </div>
      </aside>
    </>
  );
}

export default NotificationSidebar;