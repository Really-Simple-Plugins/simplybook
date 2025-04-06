import { Link } from "@tanstack/react-router";
import { ReactComponent as Logo } from "../../../../assets/img/logo.svg";
import LoginLink from "./LoginLink";
import { __ } from "@wordpress/i18n";
import {useEffect} from "react";
import useOnboardingData from "../../hooks/useOnboardingData";
import useSubscriptionData from "../../hooks/useSubscriptionData";
import Icon from "./Icon";
import ButtonLink from "../Buttons/ButtonLink";
import Label from "./Label";

const Header = () => {
    const { onboardingCompleted } = useOnboardingData();
    const { subscriptionPlan, expiresIn, isExpired, isLoading, hasError } = useSubscriptionData();

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

    const linkClassName = "text-base p-6 text-tertiary border-b-4  border-transparent [&.active]:border-tertiary focus:outline-hidden";
    const expireText = `${__("Free trial -", "simplybook")} ${expiresIn} ${__("days left", "simplybook")}`;
        
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
                    className={"border-tertiary-border border-2 bg-tertiary-light hover:border-primary-border ml-4 "}
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
                    {!isExpired && (
                    <Label
                        labelVariant="trial"
                    >
                       {subscriptionPlan} {expireText}
                    </Label>
                    )}
                    {isExpired && (
                    <Label
                    labelVariant="trial-expired"
                     >
                        {subscriptionPlan} {__("Expired", "simplybook")}
                    </Label>
                    )}
                    <ButtonLink
                        className="border-primary text-primary hover:border-primary-hover hover:text-primary-hover"
                        btnVariant="ghost"
                        target="_blank"
                        link="https://rsp9733486412.secure.wp.simplybook.ovh/v2/r/payment-widget#/" 
                    >    
                        {__("Upgrade", "simplybook")}
                    </ButtonLink>
                </div>
            </div>
        </div>
    );
};

Header.displayName = "Header";

export default Header;