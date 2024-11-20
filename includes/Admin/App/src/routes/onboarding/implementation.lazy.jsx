import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";

const path = "/onboarding/implementation";

export const Route = createLazyFileRoute(path)({
  component: () => {
    return (
      <OnboardingStep
        path={path}
        title={__("Implementation", "simplybook")}
        subtitle={__("Choose how to implement SimplyBook.me", "simplybook")}
        primaryButton={{
          label: __("Continue Configuration", "simplybook"),
          navigateTo: "/settings/general",
        }}
        secondaryButton={{
          label: __("Skip and go to Dashboard", "simplybook"),
          navigateTo: "/",
        }}
        rightColumn={<p>right</p>}
      />
    );
  },
});