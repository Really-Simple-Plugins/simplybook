import React, { useState } from "react";
import clsx from "clsx";
import { __ } from "@wordpress/i18n";
import Icon from "../../Common/Icon";
import { NotificationBoxProps } from "../../../types/NotificationBoxProps";
import { Link } from "@tanstack/react-router";

const NotificationBox: React.FC<NotificationBoxProps> = (
    className,
    notificationType,
) => {

    const [isOpen, setIsOpen] = useState(false);

    const openNotification = () => {
        setIsOpen(!isOpen);
    }

    let NotificationClasses = clsx(
        "flex flex-col p-6 bg-green-100 rounded-md shadow-sm",
        {
            "bg-red-100": notificationType == 'error',
            "bg-blue-100": notificationType == 'blue',
        }
    ); 


    return (
        <>
        <div className={clsx("notification-box", NotificationClasses, className)}>
            <a 
                onClick={(e) => openNotification(e)}
                className="flex flex-row justify-between items-baseline cursor-pointer ease-in-out"
            >
                <h3 className="m-0">{__("Advanced Settings", "simplybook")}</h3>
                <Icon className={clsx({"rotate-180": isOpen})} size={"1.5x"} name="chevron-down" />
            </a>
            <div className={clsx("notification-content overflow-hidden ease-in-out", {"max-h-0": isOpen})}>
                <div className=" text-sm  py-4 mb-2">
                    {__("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut templates magna aliqua. Ut enim ad minim veniam, Read more", 
                        "simplybook")}
                </div>
                <Link
                    to="/settings"
                    className="notification-link text-[#333] text-sm underline"
                >
                    {__("Read more", "simplybook")}
                </Link>
            </div>
        </div>
        </>
    );
}

export default NotificationBox;
