import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";

const path = "/onboarding/tips-and-tricks";

export const Route = createLazyFileRoute(path)({
  component: () => (
    <OnboardingStep
      path={path}
      title={__("Tips & Tricks", "simplybook")}
      subtitle={__("Get weekly tips & tricks for your business and working with SimplyBook.me to book success.", "simplybook")}
      buttonLabel={__("Continue", "simplybook")}
      rightColumn={<p>right</p>}
    />
  ),
});