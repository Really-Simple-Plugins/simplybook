import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import useSettingsData from "../../hooks/useSettingsData";
import {useEffect, useState} from "react";

const path = "/onboarding/implementation";

export const Route = createLazyFileRoute(path)({

  component: () => {
      const { getValue, settings, isSavingSettings } = useSettingsData();
      const [ implementationMethod, setImplementationMethod ] = useState(getValue("implementation"));

      useEffect(() => {
            let implementation = getValue("implementation");
            console.log("Implementation current value: ", implementation);
            setImplementationMethod(implementation);
      }, [settings]);

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
            <div className="relative w-full aspect-w-16 aspect-h-9">
                {implementationMethod === "manual" && <>
                {implementationMethod} manual!
                </>}
                {implementationMethod === "generated" && <>
                    generate! {implementationMethod}
                </>}
            </div>
        }
      />
    );
  },
});