import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import useWaitForRegistrationCallback from "../../hooks/useWaitForRegistrationCallback";
import { useEffect, useState } from "react";
import useOnboardingData from "../../hooks/useOnboardingData";
import useSettingsData from "../../hooks/useSettingsData";
import useWidgetData from "../../hooks/useWidgetData";
import ProgressBar from "../../components/Common/ProgressBar";
import CalendarLoading from "../../components/Common/CalendarLoading";

const path = "/onboarding/style-widget";
export const Route = createLazyFileRoute(path)({
    component: () => {
        const { widgetScript, invalidateAndRefetchWidgetScript } = useWidgetData();
        const { isSavingSettings, settings } = useSettingsData();
        const { onboardingCompleted } = useOnboardingData();
        const { startPolling, pollingEnabled, isPolling } = useWaitForRegistrationCallback();
        const [isLoadingScript, setIsLoadingScript] = useState(false);
        const runInlineScript = async () => {
            let targetObj = document.createElement("script");
            targetObj.id = "simplybook-inline-script";
            let script = widgetScript.replaceAll('DOMContentLoaded', 'customDOMContentLoaded');
            console.log("updated script: ", script);
            targetObj.innerHTML = script;
            try {
                document.head.appendChild(targetObj);
                const customEvent = new Event("customDOMContentLoaded");
                document.dispatchEvent(customEvent);
                document.removeEventListener("DOMContentLoaded", instantiateSimplybookWidget);
            } catch (exception) {
                throw "Something went wrong " + exception + " while loading " + script;
            }
        }

        useEffect(() => {
            if ( pollingEnabled ) {
                console.log("polling already enabled, exit");
                return;
            }
            console.log("start polling");
            startPolling();

        }, [onboardingCompleted]);

        const setupPreview = async () => {
            if (isLoadingScript) {
                return;
            }
            setIsLoadingScript(true);

            clearInlineScript();
            let script = document.head.querySelector('#simplybook-src-script');
            if (script) {
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

        const clearInlineScript =() => {
            const inlineScript = document.head.querySelector('#simplybook-inline-script');
            if (inlineScript) {
                console.log("removing inline script");
                document.head.removeChild(inlineScript);
            }
        };

        useEffect(() => {
            console.log("useeffect for preview setup",
                "onboardingcompleted", onboardingCompleted,
                "isSavingSettings", isSavingSettings,
                "widgetScript.length", widgetScript.length
            );

            if (!onboardingCompleted) {
                return;
            }

            if (widgetScript.length === 0) {
                return;
            }

            setupPreview();

            return () => {
                const srcScript = document.head.querySelector('#simplybook-src-script');
                if (srcScript) {
                    document.head.removeChild(srcScript);
                }
                clearInlineScript();
            };
        }, [widgetScript, onboardingCompleted]);

        useEffect(() => {
            console.log("settings, isSavingSettings, onboardingcompleted UseEffect ",
                isSavingSettings,
                onboardingCompleted,
                );

            if ( !onboardingCompleted ) {
                console.log("onboarding not completed, do not reload script");
                return;
            }

            if ( isSavingSettings ) {
                console.log("saving settings, do not reload script");
                return;
            }

            console.log("invalidate and refetch widget script");
            invalidateAndRefetchWidgetScript();
        }, [isSavingSettings, onboardingCompleted, settings ]);

        return (
            <>
                <OnboardingStep
                    path={path}
                    title={__("What's your style?", "simplybook")}
                    buttonLabel={__("Next Step: Finish", "simplybook")}
                    rightColumn={
                        <div className="h-full">
                            {!onboardingCompleted && <div>
                                <ProgressBar />
                                <CalendarLoading />
                            </div>}
                            <div className="h-full" id="sbw_z0hg2i"></div>
                        </div>
                    }
                />
            </>
        );
    },
});