import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import waitForRegistrationCallback from "../../api/endpoints/onBoarding/waitForRegistrationCallback";
import { useEffect } from "react";

const path = "/onboarding/style-widget";

// Extract the React component
const StyleWidgetOnboarding = () => {
    useEffect(() => {
        console.log("waiting for registration callback");
        waitForRegistrationCallback();
    }, []);

    return (
        <OnboardingStep
            path={path}
            title={__("Alpha Bedum Beauty & Welness", "simplybook")}
            subtitle={__("What's your style?", "simplybook")}
            buttonLabel={__("Next Step: Finish", "simplybook")}
            rightColumn={<p>right</p>}
        />
    );
};

// Pass the component to the route
export const Route = createLazyFileRoute(path)({
    component: StyleWidgetOnboarding,
});