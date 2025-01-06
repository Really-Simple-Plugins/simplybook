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
        const { getValue } = useSettingsData();
        const [companyName, setCompanyName] = useState("");
        const {onboardingCompleted} = useOnboardingData();
        const { startPolling } = useWaitForRegistrationCallback();

        const runInlineScript = ( script ) => {
            let targetObj = document.createElement("script");
            targetObj.id = "simplybook-inline-script";
            script = script.replaceAll('DOMContentLoaded', 'customDOMContentLoaded');
            targetObj.innerHTML = script;
            try {
                document.head.appendChild(targetObj);
                // domContentLoaded already has fired, so we replace it with our custom event and fire that.
                // this way we don't inadvertently trigger any other scripts that are listening for domContentLoaded

                const customEvent = new Event("customDOMContentLoaded");
                // Dispatch custom event
                document.dispatchEvent(customEvent);
            } catch(exception) {
                throw "Something went wrong " + exception + " while loading "+script;
            }
        }

        useEffect(() => {
            startPolling();
        }, [onboardingCompleted]);

        useEffect(() => {
            setCompanyName(getValue("company_name"));
        }, [getValue("company_name")]);

        const setupPreview = async () => {
            const script = document.createElement("script");
            script.id = "simplybook-src-script";
            script.src = "https://simplybook.me/v2/widget/widget.js";
            script.onload = () => {
                console.log("Script loaded successfully!");
                runInlineScript(widgetScript);
            };

            document.body.appendChild(script);
        }

        useEffect(() => {
            console.log("onboardingCompleted", onboardingCompleted);
            if (widgetScript.length === 0 || !onboardingCompleted ) {
                console.log("No script or onboarding not completed, return");
                return;
            }

            console.log("We have a script and onboarding is completed, setup preview");
            setupPreview();

            // Cleanup function to remove the script and callback when the component unmounts
            return () => {
                const existingScript = document.querySelector('script[src="https://simplybook.me/v2/widget/widget.js"]');
                const inlineScript = document.querySelector('#simplybook-inline-script');
                console.log("inlineScript",inlineScript);
                // if (existingScript) {
                //     document.body.removeChild(existingScript);
                // }
                // if (inlineScript) {
                //     document.body.removeChild(inlineScript);
                // }
            };
        }, [widgetScript, onboardingCompleted]);

        return (
            <>
                <OnboardingStep
                    path={path}
                    title={companyName}
                    subtitle={__("What's your style?", "simplybook")}
                    buttonLabel={__("Next Step: Finish", "simplybook")}
                    rightColumn={
                        <div className="h-full">
                            <div className="h-full" id="sbw_z0hg2i"></div>
                        </div>

                    }
                />
            </>
        );
    },
});
