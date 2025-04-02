import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import Calendar from "../../components/Common/Calendar";
import LeftColumn from "../../components/Grid/LeftColumn";
import RightColumn from "../../components/Grid/RightColumn";

const path = "/onboarding/style-widget";
export const Route = createLazyFileRoute(path)({

    component: () => {
        return (
            <>
            <LeftColumn
                className={"col-span-6"}
            >
                <div className={"text-center"}>
                    <h2 className={"mt-2 text-lg font-light text-black"}>
                    {__("Style your calendar", "simplybook")}
                    </h2>
                    <h1 className={"text-3xl font-semibold text-black mb-4"}>
                    {__("What's your style?", "simplybook")}
                    </h1>
                </div>  
                <OnboardingStep
                    path={path}
                    primaryButton={{
                        label: __("Next: Finish Registration", "simplybook"),
                    }}
                />
            </LeftColumn>
            <RightColumn
                className={"col-span-5"}
            >
            <div className="h-full">
                <Calendar />
            </div>
            </RightColumn>
            </>
        );
    },
});