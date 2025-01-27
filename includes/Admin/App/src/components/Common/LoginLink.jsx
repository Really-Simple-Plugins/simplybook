import React from "react";
import Icon from "./Icon";
import ButtonInput from "../Inputs/ButtonInput";
import useOnboardingData from "../../hooks/useOnboardingData";
import useLoginData from "../../hooks/useLoginData";

const LoginLink = ({ className, page, isButton = false, size="md", btnVariant, children }) => {
    const { alreadyLoggedIn, setAlreadyLoggedIn, directUrl, loginUrl, fetched, fetchLinkData } = useLoginData();
    const { onboardingCompleted } = useOnboardingData();

    const loginTo = async (e, page ) => {
        e.preventDefault();
        console.log("Get login URL for", page);
        if ( !fetched ) {
            console.log("not fetched yet");
            await fetchLinkData();
        } else {
            console.log("already fetched");
        }
        const finalUrl = alreadyLoggedIn
            ? `${directUrl}/${page}`
            : `${loginUrl}?back_url=/${page}/`;

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
