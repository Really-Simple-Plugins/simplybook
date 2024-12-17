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
        rightColumn={
            <p className="w-full">
                <div className="relative w-full aspect-w-16 aspect-h-9">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/qgMn9dKJAt4"
                        title="How to get started with SimplyBook.me"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                </div>
            </p>
        }
      />
    );
  },
});