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
            <div className="mx-auto flex max-w-screen-2xl">
                <div className="m-5 flex w-full gap-5">
                    <div className={"max-w-xs flex-1"}>
                        <SettingsMenu />
                    </div>
                    <div className="flex flex-1 flex-col">
                        <ErrorBoundary>
                            <Outlet />
                        </ErrorBoundary>
                    </div>
                    <NotificationSidebar>
                        <NotificationsBox />
                    </NotificationSidebar>
                </div>
            </div>
        </NotificationProvider>
    );
};