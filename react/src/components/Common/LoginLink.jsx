import React from "react";
import Icon from "./Icon";
import ButtonInput from "../Inputs/ButtonInput";
import useOnboardingData from "../../hooks/useOnboardingData";
import useLoginData from "../../hooks/useLoginData";

const LoginLink = ({
    className,
    page,
    isButton = false,
    size="md",
    btnVariant,
    children
}) => {

    // Import the fetch module
    const {fetchLinkData } = useLoginData();

    // import onboardingData for conditional classes
    const { onboardingCompleted } = useOnboardingData();

    const loginTo = async (e, page ) => {
        e.preventDefault();

        const loginData = await fetchLinkData();
        const link = loginData.simplybook_dashboard_url;

        let finalUrl = `${link}/${page}/`;
        if (link.includes("by-hash")) {
            finalUrl = `${link}?back_url=/${page}/`;
        }

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