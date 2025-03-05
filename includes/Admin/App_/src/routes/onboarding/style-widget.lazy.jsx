import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import Calendar from "../../components/Common/Calendar";

const path = "/onboarding/style-widget";
export const Route = createLazyFileRoute(path)({

    component: () => {
        return (
            <>
                <OnboardingStep
                    path={path}
                    title={__("What's your style?", "simplybook")}
                    buttonLabel={__("Next Step: Finish", "simplybook")}
                    rightColumn={
                        <div className="h-full">
                            <Calendar />
                        </div>
                    }
                />
            </>
        );
    },
});