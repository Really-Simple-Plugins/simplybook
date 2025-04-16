import React from "react";
import Icon from "./Icon";
import clsx from "clsx";
import ButtonInput from "../Inputs/ButtonInput";
import useOnboardingData from "../../hooks/useOnboardingData";
import useLoginData from "../../hooks/useLoginData";

const LoginLink = ({
    className = "",
    page = "",
    isButton = false,
    size="md",
    btnVariant="primary",
    children = "",
    disabled = false,
    icon = false,
    iconName = "",
    iconSize = "",
    iconClass = "",
    iconStyle = "",
    onClick = () => {},
    reverseIcon = false,
}) => {

    const {fetchLinkData} = useLoginData();

    // import onboardingData for conditional classes
    const { onboardingCompleted } = useOnboardingData();

    const loginTo = (e, page ) => {
        e.preventDefault();

        // Start fetch when the link is clicked
        fetchLinkData().then((response) => {
            let link = response?.data.simplybook_dashboard_url;
            if (!link) {
                console.error("No link found in response");
                return;
            }

            let finalUrl = `${link}/${page}/`;
            if (link.includes("by-hash")) {
                finalUrl = `${link}?back_url=/${page}/`;
            }

            window.open(finalUrl, "_blank");
            window.focus();
        }).catch((error) => {
            console.error("Error fetching login URL:", error);
        });

    };


    // Apply conditional classes
    const externalLinkClass = disabled
        ? "pointer-events-none opacity-50 cursor-not-allowed"
        : "";

    // Combine the classes together
    const combinedClassName = `${externalLinkClass}${className} `;

    if (isButton) {
        return (
            <ButtonInput
                disabled={disabled}
                label={children}
                onClick={(e) => loginTo(e, page)}
                className={combinedClassName}
                btnVarisant={btnVariant}
                size={size}
            >
                {children}
            </ButtonInput>
        );
    }

    return (
        <a
            href="#"
            className={combinedClassName}
            onClick={(e) => loginTo(e, page)}
        >
            {children}
            {icon && (
                <Icon className={clsx(iconClass, { 'mr-2': !reverseIcon, 'ml-2': reverseIcon })} name={iconName} size={iconSize} style={iconStyle} />
            )}
        </a>
    );
};

LoginLink.displayName = "LoginLink";

export default LoginLink;