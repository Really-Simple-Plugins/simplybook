import React, {createContext, useContext, useEffect, useState} from "react";
import {Notice} from "../types/Notice";
import useNotificationsData from "../hooks/useNotificationsData";

/**
 * Default values for the notification context. This is used to create a
 * default context value that can be used when the provider is not
 * available. As of writing this can be the case when we are on
 * the Dashboard page.
 */
const NotificationContextStub = {
    activeNotifications: [],
    getNotification: () => {
        return undefined;
    },
    triggerNotification: () => {
        return false;
    },
    triggerNotificationById: () => {
        return false;
    },
    getAllNotifications: () => {
        return false;
    },
}

/**
 * Set up a context for notifications.
 */
const NotificationContext = createContext<Record<string, any> | typeof NotificationContextStub>(NotificationContextStub);

/**
 * Custom hook to use the notification context. This hook will throw an error
 * if used outside the NotificationProvider.
 */
export const useNotifications = () => {
    return useContext(NotificationContext);
};

/**
 * Provider component for the notification context. This component will fetch
 * the notifications data and provide it to the rest of the application. The
 * children can then trigger notifications when needed.
 */
export const NotificationProvider = ({children}: {children: React.ReactNode}) => {

    const {allNotices, isLoading} = useNotificationsData();
    const [activeNotifications, setActiveNotifications] = useState<Notice[]>([]);

    /**
     * Find notices that are active by default and add them to the
     * activeNotifications state. This will show these notifications without
     * needing a client side trigger.
     */
    useEffect(() => {
        if (!allNotices) return;

        const active = allNotices.filter((item: Notice) => item.active);
        if (active.length > 0) {
            setActiveNotifications((prev) => {
                const newNotices = active.filter((item: Notice) => !prev.some((n: Notice) => n.id === item.id));
                return [...prev, ...newNotices];
            });
        }
    }, [allNotices]);

    /**
     * Get specific notice object from the list of all notices by id.
     */
    const getNoticeObject = (id: string): Notice | undefined => {
        return allNotices.find((item: Notice) => item.id === id);
    };

    /**
     * Trigger a notification by adding its object to the active notifications
     * array.
     */
    const triggerNotification = (notice: Notice) => {
        setActiveNotifications((prev) => {
            if (prev.some((n) => n.id === notice.id)) return prev;
            return [...prev, notice];
        });
    };

    /**
     * Trigger a notification by its id. This will first get the notice object
     * by its id and then call the triggerNotification function.
     */
    const triggerNotificationById = (id: string) => {
        const template = getNoticeObject(id);
        if (!template) {
            return console.warn(`Notification "${id}" not found`);
        }
        triggerNotification(template);
    }

    /**
     * Get all notifications. Can be useful during development to see all
     * registered notifications.
     */
    const getAllNotifications = () => {
        return activeNotifications;
    }

    /**
     * Prevent the provider from rendering if the notifications dats is still
     * loading.
     */
    if (isLoading) {
        return;
    }

    return (
        <NotificationContext.Provider
            value={{activeNotifications, getNotification: getNoticeObject, triggerNotification, triggerNotificationById, getAllNotifications}}
        >
            {children}
        </NotificationContext.Provider>
    );
};