import React, {useEffect, useState} from "react";
import clsx from "clsx";
import Icon from "../../Common/Icon";
import { Link } from "@tanstack/react-router";
import {__} from "@wordpress/i18n";
import LoginLink from "../../Common/LoginLink";
import { useNotifications } from '../../../context/NotificationContext';
import {Notice} from "../../../types/Notice";
import {Route} from "../../../routes/settings/$settingsId.lazy";

const NotificationsBox = () => {

    const {settingsId} = Route.useParams();
    const {activeNotifications} = useNotifications();

    const [isOpen, setIsOpen] = useState(false);
    const [currentNotifications, setCurrentNotifications] = useState<Notice[]>([]);

    /**
     * We only want to show the notifications that are related to the current
     * settings page. We remove notices with a route that does not match the
     * current settings page. Effect runs when user changes the settings page
     * or when a notification is triggered somewhere in the app.
     */
    useEffect(() => {
        setCurrentNotifications(
            activeNotifications.filter((notice: Notice) => notice.route === settingsId)
        )
    }, [settingsId, activeNotifications]);

    /**
     * Open the notification box when closed, closes the notification box when
     */
    const toggleNotification = () => {
        setIsOpen(!isOpen);
    }

    /**
     * Get the correct notice style based on the type of notice.
     * @param notificationType
     */
    const getNotificationClasses = (notificationType: string) => {
        return clsx(
            "flex flex-col p-6 rounded-md shadow-sm",
            {
                "bg-red-100": notificationType === 'warning',
                "bg-blue-100": notificationType === 'info',
            }
        );
    };

    let hasNotifications = (currentNotifications.length > 0);
    let noNotifications = (currentNotifications.length === 0);

    return (
        <>
            {hasNotifications && currentNotifications.map((notice : Notice) => (
                <div className={"notification-box " + getNotificationClasses(notice.type)} key={notice.id}>
                    <a
                        onClick={(e) => toggleNotification()}
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

            {noNotifications && (
                <div className="notification-box">
                    <p className="text-sm text-gray-500">{__('You currently have no notifications.', 'simplybook')}</p>
                </div>
            )}
        </>
    );
}

export default NotificationsBox;