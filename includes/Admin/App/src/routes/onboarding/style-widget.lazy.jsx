import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";

const path = "/onboarding/style-widget";

export const Route = createLazyFileRoute(path)({
  component: () => (
    <OnboardingStep
      path={path}
      title={__("Alpha Bedum Beauty & Welness", "simplybook")}
      subtitle={__("What's your style?", "simplybook")}
      buttonLabel={__("Next Step: Finish", "simplybook")}
      rightColumn={<p>right</p>}
    />
  ),
});