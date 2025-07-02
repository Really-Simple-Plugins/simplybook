import { createLazyFileRoute } from "@tanstack/react-router";
import {__} from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import { useEffect, useRef, useState } from "react";
import getRecaptchaSiteKey from "../../api/endpoints/onBoarding/getRecaptchaSitekey";
import useOnboardingData from "../../hooks/useOnboardingData";
import LeftColumn from "../../components/Grid/LeftColumn";
import RightColumn from "../../components/Grid/RightColumn";
import VideoFrame from "../../components/Media/VideoFrame";

const path = "/onboarding/confirm-email";

export const Route = createLazyFileRoute(path)({

    component: () => {
        const {setRecaptchaToken} = useOnboardingData();
        const recaptchaContainerRef = useRef(null);
        const [recaptchaRendered, setRecaptchaRendered] = useState(false);
        const [confirmationCode, setConfirmationCode] = useState("");

        const setupRecaptcha = async () => {
            //get sitekey first, loading script has to wait.
            let siteKey = await getRecaptchaSiteKey();

            const script = document.createElement("script");
            script.src = "https://www.google.com/recaptcha/api.js?onload=onloadRecaptchaCallback&render=explicit";
            script.async = true;
            script.defer = true;
            script.onload = () => {
                // Code to execute after the script has fully loaded
                // Define the callback function globally to ensure it's accessible by reCAPTCHA
                window.onloadRecaptchaCallback = () => {
                    if (window.grecaptcha && recaptchaContainerRef.current) {
                        window.grecaptcha.render(recaptchaContainerRef.current, {
                            sitekey: siteKey,
                            callback: (recaptchaToken) => {
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
                <LeftColumn className={"flex flex-col justify-center col-span-5 col-start-2"}>
                    <div className={"text-center"}>
                        <h2 className={"mt-2 text-lg font-light text-black"}>
                            {__("Lets get you verified!", "simplybook")}
                        </h2>
                        <h1 className={"text-4xl font-semibold text-black mb-4"}>
                            {__("Fill in the authentication code sent to your email", "simplybook")}
                        </h1>
                    </div>
                    <OnboardingStep
                        path={path}
                        syncFieldConfig={{
                            key: "confirmation-code",
                            value: confirmationCode,
                            setValue: (value) => {
                                setConfirmationCode(value);
                            },
                        }}
                        customHtml={<div id="recaptcha_container" className="my-4" ref={recaptchaContainerRef}></div>}
                        primaryButton={{
                            label: __("Verify email", "simplybook"),
                            showLoader: true
                        }}
                    />
                </LeftColumn>
                <RightColumn className={"flex flex-col justify-center col-span-5"}>
                    <div className="flex flex-col items-center pb-4">
                        <VideoFrame
                            FrameWrapperClass="h-full w-full aspect-w-16 aspect-h-9 mb-8"
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/qgMn9dKJAt4"
                            title="How to get started with SimplyBook.me"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            refPolicy="strict-origin-when-cross-origin"
                        />
                        <div className="text-center flex flex-col items-center">
                            <h1 className="m-0 mb-4 text-2xl">
                                {__("SimplyBook.me fits seamlessly into your business", "simplybook")}
                            </h1>
                            <small className="text-lg text-gray-400 w-3/4">
                                {__("It’s easy to keep your appointments in sync with the apps and plugins you need.", "simplybook")}
                            </small>
                        </div>
                    </div>
                </RightColumn>
            </>
        );
    },
});