import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";

const path = "/onboarding/information-check";

export const Route = createLazyFileRoute(path)({
  component: () => (
    <OnboardingStep
      path={path}
      title={__("Is this information correct?", "simplybook")}
      subtitle={__("Nice to meet you %s!", "simplybook").replace('%s', simplybook.first_name)}
      buttonLabel={__("Next Step: Styling", "simplybook")}
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
  ),
});
