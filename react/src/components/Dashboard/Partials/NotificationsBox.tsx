import React, {useEffect, useState} from "react";
import clsx from "clsx";
import Icon from "../../Common/Icon";
import { Link } from "@tanstack/react-router";
import useNotificationsData from "../../../hooks/useNotificationsData";
import {Route} from "../../../routes/settings.lazy";
import {__} from "@wordpress/i18n";
import LoginLink from "../../Common/LoginLink";
import {Notice} from "../../../types/Notice";

const NotificationsBox = () => {

    const { settingsId } = Route.useParams();
    const { getNoticesForRoute, isLoading, hasError, message } = useNotificationsData();

    const [isOpen, setIsOpen] = useState(false);
    const [noticesForCurrentRoute, setNoticesForCurrentRoute] = useState<Notice[]>([]);

    const openNotification = () => {
        setIsOpen(!isOpen);
    }

    const getNotificationClasses = (notificationType: string) => {
        return clsx(
            "flex flex-col p-6 bg-green-100 rounded-md shadow-sm",
            {
                "bg-red-100": notificationType === 'warning',
                "bg-blue-100": notificationType === 'info',
            }
        );
    };

    useEffect(() => {
        setNoticesForCurrentRoute(
            getNoticesForRoute(settingsId)
        );
    }, [settingsId]);

    return (
        <>
            {!isLoading && !hasError && noticesForCurrentRoute.map((notice) => (
                <div className={"notification-box " + getNotificationClasses(notice.type)} key={notice.id}>
                    <a
                        onClick={(e) => openNotification()}
                        className="flex flex-row justify-between items-baseline cursor-pointer ease-in-out"
                    >
                        <h3 className="m-0">{notice.title}</h3>
                        <Icon className={clsx({"rotate-180": isOpen})} size={"1.5x"} name="chevron-down" />
                    </a>
                    <div className={clsx("notification-content overflow-hidden ease-in-out", {"max-h-0": isOpen})}>
                        <div className=" text-sm  py-4 mb-2">
                            {notice.text}
                        </div>
                        {notice.action && notice.action.text && notice.action.link && (
                            <Link
                                to={notice.action.link}
                                className="notification-link text-[#333] text-sm underline"
                            >
                                {notice.action.text}
                            </Link>
                        )}
                        {notice.action && notice.action.text && notice.action.login_link && (
                            <LoginLink
                                page={notice.action.login_link}
                                className="notification-link text-[#333] text-sm underline"
                            >
                                {notice.action.text}
                            </LoginLink>
                        )}
                    </div>
                </div>
            ))}

            {!noticesForCurrentRoute && !isLoading && !hasError && (
                <div className="notification-box">
                    <p className="text-sm text-gray-500">{__('You currently have no notifications.', 'simplybook')}</p>
                </div>
            )}
        </>
    );
}

export default NotificationsBox;