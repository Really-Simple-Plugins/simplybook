import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";

const path = "/onboarding/implementation";

export const Route = createLazyFileRoute(path)({
  component: () => (
    <OnboardingStep
      path={path}
      title={__("Alpha Bedum Beauty & Welness", "simplybook")}
      subtitle={__("Implement SimplyBook.me", "simplybook")}
      buttonLabel={__("Continue Configuration", "simplybook")}
      rightColumn={<p>right</p>}
    />
  ),
});