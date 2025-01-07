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
        const { widgetScript, isFetching, invalidateWidgetScript } = useWidgetData();
        const { getValue, settings, isSavingSettings } = useSettingsData();
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
            console.log("Settings changed useEffect in style-widget", settings, isSavingSettings);
            if ( isSavingSettings ){
                console.log("Saving settings, wait until saved");
                return;
            }
            console.log("Settings changed, invalidate widget script and reload preview");
            invalidateWidgetScript();
            setupPreview();
        }, [settings, isSavingSettings]);

        useEffect(() => {
            setCompanyName(getValue("company_name"));
        }, [getValue("company_name")]);

        const setupPreview = async () => {
            //clear existing scripts
            clearInlineScript();
            const script = document.createElement("script");
            script.id = "simplybook-src-script";
            script.src = "https://simplybook.me/v2/widget/widget.js";
            script.onload = async () => {
                console.log("Script loaded successfully!");
                //wait until widgetScript is loaded
                console.log("widgetScript isFetching", isFetching);
                // Wait for widgetScript to be set
                await new Promise((resolve) => {
                    const checkWidgetScript = () => {
                        if (widgetScript.length > 0) {
                            resolve();
                        } else {
                            setTimeout(checkWidgetScript, 100);
                        }
                    };
                    checkWidgetScript();
                });
                runInlineScript(widgetScript);
            };

            document.head.appendChild(script);
        }

        const clearInlineScript = () => {
            const inlineScript = document.head.querySelector('#simplybook-inline-script');
            if (inlineScript) {
                console.log("removing inline script");
                document.head.removeChild(inlineScript);
            }
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
                const srcScript = document.head.querySelector('#simplybook-src-script');
                if (srcScript) {
                    console.log("removing existing script");
                    document.head.removeChild(srcScript);
                }
                clearInlineScript();
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
