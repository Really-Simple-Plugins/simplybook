import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import useWaitForRegistrationCallback from "../../hooks/useWaitForRegistrationCallback";
import {useEffect, useRef, useState} from "react";
import useOnboardingData from "../../hooks/useOnboardingData";
import useSettingsData from "../../hooks/useSettingsData";
import useWidgetData from "../../hooks/useWidgetData";

const path = "/onboarding/style-widget";
export const Route = createLazyFileRoute(path)({
    component: () => {
        const { widgetScript } = useWidgetData();
        const runInlineScript = ( script ) => {
            let targetObj = document.createElement("script");
            targetObj.innerHTML = script;
            try {
                document.head.appendChild(targetObj);
            } catch(exception) {
                throw "Something went wrong " + exception + " while loading "+script;
            }
        }

        const recaptchaContainerRef = useRef(null);
        const setupPreview = async () => {
            const script = document.createElement("script");
            script.src = "https://simplybook.me/v2/widget/widget.js";
            script.async = true;
            script.defer = true;
            script.onload = () => {
                console.log("Script loaded successfully!");
                runInlineScript(widgetScript);
            };

            document.body.appendChild(script);
        }

        useEffect(() => {
            console.log("setup preview");
            setupPreview();

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
                    title={companyName}
                    subtitle={__("What's your style?", "simplybook")}
                    buttonLabel={__("Next Step: Finish", "simplybook")}
                    rightColumn={
                        <div>
                            <div id="sbw_z0hg2i"></div>
                        </div>

                    }
                />
            </>
        );
    },
});
