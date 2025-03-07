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
      rightColumn={
          <div className="relative w-full aspect-w-16 aspect-h-9">
              <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/qgMn9dKJAt4"
                  title="How to get started with SimplyBook.me"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
          </div>
      }
    />
  ),
});
