import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import useWaitForRegistrationCallback from "../../hooks/useWaitForRegistrationCallback";
import {useEffect, useRef, useState} from "react";
import useOnboardingData from "../../hooks/useOnboardingData";
import useSettingsData from "../../hooks/useSettingsData";
import useWidgetData from "../../hooks/useWidgetData";
import ProgressBar from "../../components/Common/ProgressBar";

const path = "/onboarding/style-widget";
export const Route = createLazyFileRoute(path)({

    component: () => {
        const { widgetScript, invalidateAndRefetchWidgetScript } = useWidgetData();
        const { getValue, isSavingSettings } = useSettingsData();
        const [companyName, setCompanyName] = useState("");
        const {onboardingCompleted} = useOnboardingData();
        const { startPolling } = useWaitForRegistrationCallback();
        const [isLoadingScript, setIsLoadingScript] = useState(false);

        const runInlineScript = async (  ) => {
            let targetObj = document.createElement("script");
            targetObj.id = "simplybook-inline-script";
            let script = widgetScript.replaceAll('DOMContentLoaded', 'customDOMContentLoaded');
            console.log("updated script: ", script);
            targetObj.innerHTML = script;
            try {
                document.head.appendChild(targetObj);
                // domContentLoaded already has fired, so we replace it with our custom event and fire that.
                // this way we don't inadvertently trigger any other scripts that are listening for domContentLoaded
                const customEvent = new Event("customDOMContentLoaded");
                // Dispatch custom event
                document.dispatchEvent(customEvent);
                // Remove the event listener after it has fired
                document.removeEventListener("DOMContentLoaded", instantiateSimplybookWidget);
            } catch(exception) {
                throw "Something went wrong " + exception + " while loading "+script;
            }
        }

        useEffect(() => {
            startPolling();
        }, [onboardingCompleted ]);

        useEffect(() => {
            let companyName = getValue("company_name");
            if ( companyName && companyName.length>0 ) {
                setCompanyName(companyName);
            }
        }, [getValue("company_name")]);

        const setupPreview = async () => {
            if (isLoadingScript) {
                console.log("Script already loading, return");
                return;
            }
            setIsLoadingScript(true);

            //clear existing scripts
            clearInlineScript();
            let script = document.head.querySelector('#simplybook-src-script');
            if ( script ) {
                console.log("Script already loaded, run inline script");
                await runInlineScript();
                setIsLoadingScript(false);
            } else {
                console.log("Script not loaded, load it now");
                script = document.createElement("script");
                script.id = "simplybook-src-script";
                script.src = "https://simplybook.me/v2/widget/widget.js";
                script.onload = async () => {
                    console.log("src Script loaded successfully!");
                    await runInlineScript();
                    setIsLoadingScript(false);
                };
                document.head.appendChild(script);
            }
        }

        const clearInlineScript = () => {
            const inlineScript = document.head.querySelector('#simplybook-inline-script');
            if (inlineScript) {
                console.log("removing inline script");
                document.head.removeChild(inlineScript);
            }
        }

        useEffect(() => {
            console.log("useeffect for preview setup",
                "onboardingcompleted", onboardingCompleted,
                "isSavingSettings", isSavingSettings,
                "widgetScript.length", widgetScript.length
                );

            if ( !onboardingCompleted ) {
                console.log("Onboarding not completed, return");
                return;
            }

            if (widgetScript.length === 0 ) {
                console.log("No script, return");
                return;
            }

            console.log("We have a script and onboarding is completed, setup preview");
            setupPreview();

            // Cleanup function to remove the script and callback when the component unmounts
            return () => {
                console.log("cleanup function");
                const srcScript = document.head.querySelector('#simplybook-src-script');
                if (srcScript) {
                    console.log("removing existing script");
                    document.head.removeChild(srcScript);
                }
                clearInlineScript();
            };
        }, [widgetScript, onboardingCompleted]);


        //if settings are changed, refetch the widget script
        useEffect(() => {
            if (!onboardingCompleted ) {
                console.log("onboarding not completed, return");
                return;
            }

            if ( isSavingSettings ){
                console.log("Saving settings, wait until saved");
                return;
            }
            invalidateAndRefetchWidgetScript();
        }, [isSavingSettings, onboardingCompleted]);

        console.log(" rerender of onboardingCompleted style widget:", onboardingCompleted);
        return (
            <>
                <OnboardingStep
                    path={path}
                    title={companyName}
                    subtitle={__("What's your style?", "simplybook")}
                    buttonLabel={__("Next Step: Finish", "simplybook")}
                    rightColumn={
                        <div className="h-full">
                            {!onboardingCompleted && <div>
                                <ProgressBar/>
                                <p>{__("Please wait while your registration is being processed. This will take approximately 30 seconds.","simplybook")}</p>
                            </div>}
                            <div className="h-full" id="sbw_z0hg2i"></div>
                        </div>
                    }
                />
            </>
        );
    },
});
