import React from "react";
import Icon from "./Icon";
import ButtonInput from "../Inputs/ButtonInput";
import useOnboardingData from "../../hooks/useOnboardingData";
import useLoginData from "../../hooks/useLoginData";

const LoginLink = ({ className, page, isButton = false, size="md", btnVariant, children }) => {
    const { alreadyLoggedIn, setAlreadyLoggedIn, directUrl, loginUrl, loginUrlFetched, fetchLinkData } = useLoginData();
    const { onboardingCompleted } = useOnboardingData();

    const loginTo = async (e, page ) => {
        e.preventDefault();
        let link = alreadyLoggedIn ? directUrl : loginUrl;
        console.log("Get login URL for", page);
        if ( !loginUrlFetched ) {
            console.log("not fetched yet");
            const loginData = await fetchLinkData();
            console.log("logindata response after promise", loginData);
            link = alreadyLoggedIn ? loginData.url : loginData.login_url;

        } else {
            console.log("already fetched");
        }

        console.log("Already logged in", alreadyLoggedIn);
        console.log("all data ", link);
        const finalUrl = alreadyLoggedIn
            ? `${link}/${page}`
            : `${link}?back_url=/${page}/`;

        console.log("Final URL", finalUrl);
        setAlreadyLoggedIn(true);
        // Open a new tab with the login URL
        window.open(finalUrl, "_blank");
        window.focus();

    };

    // Apply conditional classes
    const externalLinkClass = onboardingCompleted
        ? ""
        : "pointer-events-none opacity-50 cursor-not-allowed";
    const combinedClassName = `${externalLinkClass}${className} `;

    if (isButton) {
        return (
            <ButtonInput
                disabled={!onboardingCompleted}
                label={children}
                onClick={(e) => loginTo(e, page)}
                className={combinedClassName}
                btnVariant={btnVariant}
                size={size}
            >
                {children}
            </ButtonInput>
        );
    }

    return (
        <a
            href="#"
            className={`${className} ${externalLinkClass}`}
            onClick={(e) => loginTo(e, page)}
        >
            {children}
            <Icon name="square-arrow-up-right" className="px-2" />
        </a>
    );
};

LoginLink.displayName = "LoginLink";

export default LoginLink;
