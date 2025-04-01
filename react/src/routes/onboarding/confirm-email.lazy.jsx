import {createLazyFileRoute} from "@tanstack/react-router";
import {__} from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import {useEffect, useRef, useState} from "react";
import getRecaptchaSiteKey from "../../api/endpoints/onBoarding/getRecaptchaSitekey";
import useOnboardingData from "../../hooks/useOnboardingData";
import useSettingsData from "../../hooks/useSettingsData";

const path = "/onboarding/confirm-email";

export const Route = createLazyFileRoute(path)({

    component: () => {
        const {getValue, settings} = useSettingsData();
        const {setRecaptchaToken} = useOnboardingData();
        const recaptchaContainerRef = useRef(null);
        const [recaptchaRendered, setRecaptchaRendered] = useState(false);

        useEffect(() => {
            let token = getValue('confirmation-code');
        }, [settings]);

        const setupRecaptcha = async () => {
            //get sitekey first, loading script has to wait.
            let siteKey = await getRecaptchaSiteKey();

            const script = document.createElement("script");
            script.src = "https://www.google.com/recaptcha/api.js?onload=onloadRecaptchaCallback&render=explicit";
            script.async = true;
            script.defer = true;
            script.onload = () => {
                console.log("Script loaded successfully!");
                // Code to execute after the script has fully loaded
                // Define the callback function globally to ensure it's accessible by reCAPTCHA
                window.onloadRecaptchaCallback = () => {
                    if (window.grecaptcha && recaptchaContainerRef.current) {
                        console.log("rendering recaptcha with sitekey", siteKey);

                        window.grecaptcha.render(recaptchaContainerRef.current, {
                            sitekey: siteKey,
                            callback: (recaptchaToken) => {
                                console.log("resulting recaptchaToken", recaptchaToken);
                                setRecaptchaToken(recaptchaToken);
                            },
                        });
                    }
                };
            };

            document.body.appendChild(script);
        }

        useEffect(() => {
            if (!recaptchaRendered) {
                console.log("setup recaptcha");
                setRecaptchaRendered(true);
                setupRecaptcha();
            }

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
                    customHtml={<div id="recaptcha_container" className="mt-4" ref={recaptchaContainerRef}></div>}
                    subtitle={__("Type in the code from the e-mail you received.", "simplybook")}
                    bottomText={__(
                        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
                        "simplybook"
                    )}
                    rightColumn={
                        <div className="relative w-full aspect-w-16 aspect-h-9">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/qgMn9dKJAt4"
                                title="How to get started with SimplyBook.me"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                            ></iframe>
                        </div>
                    }
                />

            </>
        );
    },
});