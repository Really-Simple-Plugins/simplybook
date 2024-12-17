import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import useWaitForRegistrationCallback from "../../hooks/useWaitForRegistrationCallback";
import {useEffect} from "react";

const path = "/onboarding/style-widget";
export const Route = createLazyFileRoute(path)({
    component: () => {
        const { startPolling, isFetching, data } = useWaitForRegistrationCallback();
        useEffect(() => {
            console.log("Starting registration callback polling...");
            startPolling(); // Manually start the polling
        }, [startPolling]);

        return (
            <>
                <OnboardingStep
                    path={path}
                    title={__("Alpha Bedum Beauty & Welness", "simplybook")}
                    subtitle={__("What's your style?", "simplybook")}
                    buttonLabel={__("Next Step: Finish", "simplybook")}
                    rightColumn={<p>right</p>}
                />
            </>
        );
    },
});
