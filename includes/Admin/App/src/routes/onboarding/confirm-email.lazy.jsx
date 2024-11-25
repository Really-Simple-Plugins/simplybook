import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import {useEffect, useRef} from "react";
import getRecaptchaSiteKey from "../../api/endpoints/onBoarding/getRecaptchaSitekey";
const path = "/onboarding/confirm-email";

export const Route = createLazyFileRoute(path)({
    component: () => {
        const recaptchaContainerRef = useRef(null);
        const retrieveSiteKey = async () => {
            return await getRecaptchaSiteKey();
        }
        useEffect(() => {
            // Load the reCAPTCHA script
            const script = document.createElement("script");
            script.src = "https://www.google.com/recaptcha/api.js?onload=onloadRecaptchaCallback&render=explicit";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            let siteKey = retrieveSiteKey();
            console.log("Site Key:", siteKey);
            // Define the callback function globally to ensure it's accessible by reCAPTCHA
            window.onloadRecaptchaCallback = () => {
                if (window.grecaptcha && recaptchaContainerRef.current) {
                    window.grecaptcha.render(recaptchaContainerRef.current, {
                        sitekey: siteKey,
                        callback: (token) => {
                            console.log("reCAPTCHA Token:", token);
                            // Handle the token, e.g., pass it to a parent component or save it in the state
                        },
                    });
                }
            };

            // Cleanup function to remove the script and callback when the component unmounts
            return () => {
                delete window.onloadRecaptchaCallback;
                const existingScript = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]');
                if (existingScript) {
                    document.body.removeChild(existingScript);
                }
            };
        }, []);

        return (
            <>
                <OnboardingStep
                    path={path}
                    title={__("Confirm your e-mail address", "simplybook")}
                    subtitle={__("Type in the code from the e-mail you received.", "simplybook")}
                    bottomText={__(
                        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
                        "simplybook"
                    )}
                    rightColumn={
                        <div>
                            <p>right</p>
                        </div>
                    }
                />
                {/* Render the reCAPTCHA */}
                <div id="recaptcha_container" ref={recaptchaContainerRef}></div>
            </>
        );
    },
});
