import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/Common/Header";
import ErrorBoundary from "../components/Common/ErrorBoundary";
import SettingsMenu from "../components/Settings/SettingsMenu";
import NotificationSidebar from "../components/Settings/Partials/NotificationSidebar";
import NotificationsBox from "../components/Dashboard/Partials/NotificationsBox";
import {NotificationProvider} from "../context/NotificationContext";

export const Route = createLazyFileRoute("/settings")({
    component: () => <Settings />,
});

const Settings = () => {
    return (
        <NotificationProvider>
            <Header />
            <div className="mx-auto flex max-w-screen-2xl w-full">
                <div className="m-5 w-full grid grid-cols-12 gap-y-4 lg:gap-y-4 gap-x-4 px-4">
                        <SettingsMenu />
                        <ErrorBoundary>
                            <Outlet />
                        </ErrorBoundary> 
                    <NotificationSidebar>
                        <NotificationsBox />
                    </NotificationSidebar>
                </div>
            </div>
        </NotificationProvider>
    );
};