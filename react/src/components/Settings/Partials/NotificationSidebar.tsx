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
      <aside className={clsx("col-span-12 lg:col-span-3", className)}>
      <div className="sticky top-16">
          <h2 className="text-lg font-bold pb-2 border-b-1 border-[#e6e6e6]">{__("Notifications", "simplybook")}</h2>
          <div className="notification-feed">
            {children}
          </div>
      </div>
      </aside>
    </>
  );
}

export default NotificationSidebar;