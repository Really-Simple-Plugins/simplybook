import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";

const path = "/onboarding/information-check";

export const Route = createLazyFileRoute(path)({
  component: () => (
    <OnboardingStep
      path={path}
      title={__("Is this information correct?", "simplybook")}
      subtitle={__("Nice to meet you Aert!", "simplybook")}
      buttonLabel={__("Next Step: Styling", "simplybook")}
      rightColumn={<p>right</p>}
    />
  ),
});
