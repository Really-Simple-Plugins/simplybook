import { Link, useMatchRoute } from "@tanstack/react-router";
import { ReactComponent as Logo } from "../../../../assets/img/logo.svg";
import LoginLink from "./LoginLink";
import { __ } from "@wordpress/i18n";
import { useEffect } from "react";
import useOnboardingData from "../../hooks/useOnboardingData";
import useTaskData from "../../hooks/useTaskData";
import ButtonLink from "../Buttons/ButtonLink";
import LiveAgent from "./LiveAgent";
import SubscriptionLabel from "./SubscriptionLabel";

const Header = () => {
    const { onboardingCompleted } = useOnboardingData();
    const { isLoading: tasksLoading, getRemainingTasks } = useTaskData();
    const tasksOpen = getRemainingTasks().length;

    const isRouteActive = (route, includeSubRoutes = true) => {
        const matchRoute = useMatchRoute();
        return matchRoute({ to: route, fuzzy: includeSubRoutes }) !== false;
    }

    useEffect(() => {
        const isOnboardingRoute = window.location.hash.indexOf("#/onboarding/") === 0;

        if (
            !onboardingCompleted &&
            !isOnboardingRoute &&
            !simplybook.debug
        ) {
            window.location.href = `${simplybook.dashboard_url}#/onboarding/create-your-account`;
        }
    }, [onboardingCompleted]);

    const linkClassName = "text-base px-4 py-[23px] text-tertiary border-b-4  border-transparent [&.active]:border-tertiary focus:outline-hidden relative ease-in-out duration-300 hover:text-primary";

    return (
        <div className="bg-white ">
            <header className="mx-auto flex max-w-screen-2xl flex-wrap xl:flex-wrap pt-4 xl:pt-0 items-center">
                <div className="self-center">
                    <a href={simplybook.dashboard_url}>
                        <Logo className=" w-40 me-4" />
                    </a>
                </div>
                <div className="header-navigation flex items-center me-4 order-6 justify-center w-full pt-4 xl:order-0 xl:justify-normal xl:w-auto xl:p-0">
                    <a
                        href={simplybook.dashboard_url}
                        className={linkClassName + (isRouteActive('/', false) ? " active" : "")}
                    >
                        {!tasksLoading && tasksOpen > 0 && (
                            <div className="notification-bubble flex items-center justify-center absolute -end-0.5 top-2.5 text-center text-xxs w-[18px] h-[18px]  text-white rounded-full bg-red-600 p-2">
                                {tasksOpen}
                            </div>
                        )}
                        {__("Dashboard", "simplybook")}
                    </a>
                    <LoginLink
                        iconName="square-arrow-up-right"
                        iconClass="px-2"
                        className={linkClassName}
                        page="client"
                    >
                        {__("Clients", "simplybook")}
                    </LoginLink>
                    <LoginLink
                        iconName="square-arrow-up-right"
                        iconClass="px-2"
                        className={linkClassName}
                        page="index/index"
                    >
                        {__("Calendar", "simplybook")}
                    </LoginLink>
                    <Link
                        to="/settings/general"
                        className={linkClassName + (isRouteActive('/settings') ? " active" : "")}
                    >
                        {__("Settings", "simplybook")}
                    </Link>
                </div>
                <ButtonLink
                    className={"border-tertiary-border border-2 bg-tertiary-light hover:bg-tertiary hover:text-white hover:border-primary-border focus:border-tertiary"}
                    target="_blank"
                    link="https://help.simplybook.me/index.php/Help_Center"
                    icon={true}
                    iconName="support"
                    iconSize="1x"
                    name={"support"}
                >
                    {__("Help Center", "simplybook")}
                </ButtonLink>
                <div className="
                    py-6 w-full ms-auto flex items-center justify-between px-0
                    xl:py-0 xl:w-auto xl:justify-center xl:gap-6 xl:px-4
                ">
                    <SubscriptionLabel />
                    <LiveAgent/>
                </div>
            </header>
        </div>
    );
};

Header.displayName = "Header";

export default Header;
