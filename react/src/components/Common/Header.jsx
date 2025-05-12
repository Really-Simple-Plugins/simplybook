import { Link, useMatchRoute } from "@tanstack/react-router";
import { ReactComponent as Logo } from "../../../../assets/img/logo.svg";
import LoginLink from "./LoginLink";
import { __ } from "@wordpress/i18n";
import {act, useEffect} from "react";
import useOnboardingData from "../../hooks/useOnboardingData";
import useSubscriptionData from "../../hooks/useSubscriptionData";
import useTaskData from "../../hooks/useTaskData";
import Icon from "./Icon";
import ButtonLink from "../Buttons/ButtonLink";
import Label from "./Label";
import LiveAgent from "./LiveAgent";

const Header = () => {
    const { onboardingCompleted } = useOnboardingData();
    const { subscriptionPlan, expiresIn, isExpired, isLoading, hasError } = useSubscriptionData();
    const { isLoading: tasksLoading, getRemainingTasks } = useTaskData();
    const tasksOpen = getRemainingTasks().length;

    const isRouteActive = (route, includeSubRoutes = true) => {
        const matchRoute = useMatchRoute();
        return matchRoute({ to: route, fuzzy: includeSubRoutes }) !== false;
    }


    useEffect(() => {
        if (
            !onboardingCompleted &&
            location &&
            window.location.pathname.indexOf("onboarding/") === -1 &&
            !simplybook.debug
        ) {
            window.location.href = window.location.href.replace(
                /page=simplybook-integration.*/,
                "page=simplybook-integration#/onboarding/create-your-account",
            );
        }
    }, [onboardingCompleted]);

    const linkClassName = "text-base p-6 text-tertiary border-b-4  border-transparent [&.active]:border-tertiary focus:outline-hidden relative ease-in-out duration-300";

    const expireText = `${subscriptionPlan} - ${expiresIn} ${__("days left", "simplybook")}`;

    return (
        <div className="bg-white ">
            <header className="mx-auto pl-10 pr-5 flex max-w-screen-2xl flex-wrap xl:flex-wrap pt-4 xl:pt-0 items-center">
                <div className="self-center">
                    <Link to="/">
                        <Logo className=" w-40 mr-4" />
                    </Link>
                </div>
                <div className="header-navigation flex items-center mr-4 order-6 justify-center w-full pt-4 xl:order-0 xl:justify-normal xl:w-auto xl:p-0">
                    <Link
                        to="/"
                        className={linkClassName + (isRouteActive('/dashboard') ? " active" : "")}
                    >
                        {!tasksLoading && tasksOpen > 0 && (
                            <div className="notification-bubble flex items-center justify-center absolute right-0.5 top-2.5 text-center text-xs w-[20px] h-[20px]  text-white rounded-full bg-red-600 p-2">
                                {tasksOpen}
                            </div>
                        )}
                        {__("Dashboard", "simplybook")}
                    </Link>
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
                <div className="float-right ml-auto flex items-center gap-6 px-4">
                    {!isLoading && !isExpired && subscriptionPlan && (
                        <Label
                            labelVariant="trial"
                        >
                            {expireText}
                        </Label>
                    )}
                    {!isLoading && isExpired && subscriptionPlan && (
                        <Label
                            labelVariant="trial-expired"
                        >
                            {subscriptionPlan} {__("is expired.", "simplybook")}
                        </Label>
                    )}
                    <LiveAgent/>
                </div>
            </header>
        </div>
    );
};

Header.displayName = "Header";

export default Header;