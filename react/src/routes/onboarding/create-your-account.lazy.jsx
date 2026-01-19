import { createLazyFileRoute } from "@tanstack/react-router";
import { __, sprintf } from "@wordpress/i18n";
import { useEffect } from "react";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import LeftColumn from "../../components/Grid/LeftColumn";
import RightColumn from "../../components/Grid/RightColumn";
import VideoFrame from "../../components/Media/VideoFrame";
import { RECAPTCHA_SITE_KEY } from "../../hooks/useOnboardingData";

const path = "/onboarding/create-your-account";

export const Route = createLazyFileRoute(path)({
    component: () => <CreateLoginAccount />
});

/**
 * reCAPTCHA disclosure text component
 */
function RecaptchaDisclosure() {
    return (
        <p
            className="text-xs text-gray-400 mt-4 text-center"
            dangerouslySetInnerHTML={{
                __html: sprintf(
                    __("This site is protected by reCAPTCHA and the Google %sPrivacy Policy%s and %sTerms of Service%s apply.", "simplybook"),
                    '<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="underline">',
                    '</a>',
                    '<a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" class="underline">',
                    '</a>'
                )
            }}
        />
    );
}

function CreateLoginAccount() {
    // Load reCAPTCHA script on mount, clean up on unmount
    useEffect(() => {
        if (window.grecaptcha?.enterprise) {
            return;
        }

        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.id = 'recaptcha-script';
        document.head.appendChild(script);

        return () => {
            // Remove script on unmount
            const existingScript = document.getElementById('recaptcha-script');
            if (existingScript) {
                existingScript.remove();
            }
            // Remove reCAPTCHA badge container
            const badge = document.querySelector('.grecaptcha-badge');
            if (badge?.parentElement) {
                badge.parentElement.remove();
            }
            // Clean up global
            delete window.grecaptcha;
        };
    }, []);

    return(
        <>
            {/* Hide reCAPTCHA badge - disclosure text is shown instead */}
            <style>{`.grecaptcha-badge { visibility: hidden; }`}</style>

            <LeftColumn
                className={"flex-col col-span-5 col-start-2"}
            >
                <div className={"text-center"}>
                    <h1 className={"text-4xl font-semibold text-black mb-4"}>
                        {__("Create your free account", "simplybook")}
                    </h1>
                    <h2 className={"mt-2 text-lg font-light text-black"}>
                        {__("100% free. No credit card needed.", "simplybook")}
                    </h2>

                </div>
                <OnboardingStep
                    path={path}
                    primaryButton={{
                        disabled: false,
                    }}
                    bottomText={<RecaptchaDisclosure />}
                />
            </LeftColumn>
            <RightColumn
                className={"col-span-5 justify-center"}
            >
                <div className="pb-4">
                    <VideoFrame
                        FrameWrapperClass="aspect-w-16 aspect-h-9 mb-8"
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/qgMn9dKJAt4"
                        title={__("How to get started with SimplyBook.me", "simplybook")}
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
    )
}