import React, {useState} from "react";
import Icon from "./Icon";
import getLoginUrl from "../../api/endpoints/getLoginUrl";
import ButtonInput from "../Inputs/ButtonInput";
import useOnboardingData from "../../hooks/useOnboardingData";
import useLoginData from "../../hooks/useLoginData";

const LoginLink = ({ className, page, isButton = false, size="md", btnVariant, children }) => {
    const {alreadyLoggedIn, setAlreadyLoggedIn} = useLoginData();
    const [loginUrl, setLoginUrl] = useState("");
    const [directUrl, setDirectUrl] = useState("");
    const { onboardingCompleted } = useOnboardingData();

    const loginTo = async (e, page) => {
        e.preventDefault();
        console.log("Get login URL for", page);

        let tempLoginUrl = loginUrl;
        let tempDirectUrl = directUrl;

        if (!alreadyLoggedIn) {
            console.log("Not logged in yet, getting login URL");
            const loginData = await getLoginUrl();
            console.log("Received login data", loginData);

            tempDirectUrl = loginData.url;
            tempLoginUrl = loginData.login_url;

            setLoginUrl(tempLoginUrl);
            setDirectUrl(tempDirectUrl);
        }

        const finalUrl = alreadyLoggedIn
            ? `${tempDirectUrl}/${page}`
            : `${tempLoginUrl}?back_url=/${page}/`;

        console.log("Final URL", finalUrl);

        // Open a new tab with the login URL
        window.open(finalUrl, "_blank");
        window.focus();
        setAlreadyLoggedIn(true);
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
