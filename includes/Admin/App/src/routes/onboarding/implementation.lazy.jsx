import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import useSettingsData from "../../hooks/useSettingsData";
import {useEffect, useState} from "react";
import TextInput from "../../components/Inputs/TextInput";
import Icon from "../../components/Common/Icon";

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

      let url = getValue("url");

      return (
      <OnboardingStep
        path={path}
        company
        title={__("Implement SimplyBook.me", "simplybook")}
        primaryButton={{
          label: __("Continue Configuration", "simplybook"),
          navigateTo: "/settings/general",
        }}
        secondaryButton={{
          label: __("Skip and go to Dashboard", "simplybook"),
          navigateTo: "/",
        }}
        rightColumn={
            <div className="relative w-full">
                {implementationMethod === "manual" &&
                    <div className={"my-6 text-center"}>
                        <h1 className={"text-3xl font-semibold text-black"}>{__("Implementation", "simplybook")}</h1>
                        <h2 className={"text-2xl text-gray-500 m-4"}>
                            {__("Use the below shortcode in a page to show the widget.", "simplybook")}
                        </h2>
                        <TextInput className="p-4 mb-8" clickToSelect={true} value="[simplybook_widget]"/>
                        <div className="text-lg text-gray-600">
                            <Icon name="info" color="green" className="mr-2"/>
                            {__("Using shortcodes", "simplybook")}
                            &nbsp;<a className="" href="https://simplybook.me" target="_blank"
                                     rel="noreferrer">{__("Read more", "simplybook")}</a>
                        </div>
                    </div>
                }
                {implementationMethod === "generated" &&
                    <div className={"my-6 text-center"}>
                        <h1 className={"text-3xl font-semibold text-black"}>{__("Implementation", "simplybook")}</h1>
                        <h2 className={"text-2xl text-gray-500 m-4"}>
                            {__("SimplyBook.me will generate the following pages automatically.", "simplybook")}
                        </h2>
                        <TextInput className="p-4 mb-8" value={simplybook.site_url + __('calendar', 'simplybook')}/>
                        <TextInput className="p-4 mb-8" value={simplybook.site_url + __('mybooking', 'simplybook')}/>
                        <div className="text-lg text-gray-600">
                            <Icon name="info" color="green" className="mr-2"/>
                            {__("Generating pages for SimplyBook.me", "simplybook")}
                            &nbsp;<a className="" href="https://simplybook.me" target="_blank"
                                     rel="noreferrer">{__("Read more", "simplybook")}</a>
                    </div>
                </div>

                }
                </div>
                }
                />
                );
                },
                });