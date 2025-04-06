import { Link } from "@tanstack/react-router";
import { ReactComponent as Logo } from "../../../../assets/img/logo.svg";
import LoginLink from "./LoginLink";
import { __ } from "@wordpress/i18n";
import {useEffect} from "react";
import useOnboardingData from "../../hooks/useOnboardingData";
import useSubscriptionData from "../../hooks/useSubscriptionData";
import useTaskData from "../../hooks/useTaskData";
import Icon from "./Icon";
import ButtonLink from "../Buttons/ButtonLink";

const Header = () => {
    const { onboardingCompleted } = useOnboardingData();
    const { subscriptionPlan, expiresIn, isExpired, isLoading, hasError } = useSubscriptionData();
    const { getRemainingTasks } = useTaskData();
    const tasksOpen = getRemainingTasks().length;

    useEffect(() => {
        if (
            !onboardingCompleted &&
            location &&
            window.location.pathname.indexOf("onboarding/") === -1 &&
            !simplybook.debug
        ) {
            window.location.href = window.location.href.replace(
                /page=simplybook.*/,
                "page=simplybook#/onboarding/create-your-account",
            );
        }
    }, [onboardingCompleted]);

    const linkClassName =
        "text-base relative p-6 text-tertiary border-b-4  border-transparent [&.active]:border-tertiary focus:outline-hidden";

    return (
        <div className="bg-white ">
            <div className="mx-auto px-5 flex items-baseline max-w-screen-2xl">
                <div className="self-center">
                    <Link to="/">
                        <Logo className=" w-40 px-5 py-2" />
                    </Link>
                </div>
                <div className="flex items-center">
                    <Link to="/" className={linkClassName}>
                    {!isLoading && tasksOpen > 0 && (
                        <div className="notification-bubble flex items-center justify-center absolute right-0.5 top-2.5 text-center text-xs w-[20px] h-[20px]  text-white rounded-full bg-red-600 p-2">
                            {tasksOpen}
                        </div>
                    )}
                        {__("Dashboard", "simplybook")}
                    </Link>
                    <LoginLink className={linkClassName} page="client">
                        {__("Clients", "simplybook")}
                    </LoginLink>
                    <LoginLink className={linkClassName} page="index/index">
                        {__("Calendar", "simplybook")}
                    </LoginLink>
                    <Link to="/settings/general" className={linkClassName}>
                        {__("Settings", "simplybook")}
                    </Link>
                </div>
                <ButtonLink
                    className={"border-tertiary-border border-2 bg-tertiary-light hover:bg-tertiary-hover ml-4 "}
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
                    {!isLoading && !isExpired && !hasError && (
                        <p>
                            <span>{subscriptionPlan} - {expiresIn} {__("days left", "simplybook")}</span>
                        </p>
                    )}
                    {!isLoading && !hasError && isExpired && (
                        <p className="color-red">
                            <span>{subscriptionPlan} - {__("Expired", "simplybook")}</span>
                        </p>
                    )}
                    <LoginLink
                        className={linkClassName}
                        isButton={true}
                        btnVariant="tertiary"
                        page="v2/r/payment-widget"
                    >
                        {__("Upgrade", "simplybook")}
                    </LoginLink>
                </div>
            </div>
        </div>
    );
};

Header.displayName = "Header";

export default Header;