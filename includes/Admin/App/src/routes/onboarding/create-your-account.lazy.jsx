import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";

const path = "/onboarding/create-your-account";

export const Route = createLazyFileRoute(path)({
  component: () => (
    <OnboardingStep
      path={path}
      title={__("Create your free account", "simplybook")}
      subtitle={__("100% free. No credit card needed.", "simplybook")}
      bottomText={__(
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
        "simplybook"
      )}
      rightColumn={<p>right</p>}
    />
  ),
});
