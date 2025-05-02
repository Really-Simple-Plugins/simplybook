import { createLazyFileRoute, Link } from "@tanstack/react-router";
import debounce from "lodash.debounce";
import { __ } from "@wordpress/i18n";
import { useCallback, useEffect, useState } from "react";

import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import useSettingsData from "../../hooks/useSettingsData";
import TextInput from "../../components/Inputs/TextInput";
import Icon from "../../components/Common/Icon";
import useOnboardingData from "../../hooks/useOnboardingData";
import LeftColumn from "../../components/Grid/LeftColumn";
import RightColumn from "../../components/Grid/RightColumn";
import isPageTitleAvailable from "../../api/endpoints/onBoarding/isPageTitleAvailable";

const path = "/onboarding/implementation";

export const Route = createLazyFileRoute(path)({
    component: () => {
        const { getValue } = useSettingsData();
        const { updateData, getCurrentStep } = useOnboardingData();

        const [calendarPageAvailable, setCalendarPageAvailable] = useState(false);
        const [calendarPageUrl, setCalendarPageUrl] = useState(
            simplybook.site_url + "/" + __("calendar", "simplybook")
        );

        /**
         * This method checks if a given page title is available.
         */
        const checkPageUrlAvailability = async (pageUrl) => {
            const response = await isPageTitleAvailable({ data: { url: pageUrl } });
            return response.status === "success";
        };

        /**
         * Debounced setter to avoid firing API calls on every keystroke.
         */
        const debouncedCheckAvailability = useCallback(
            debounce(async (pageUrl) => {
                setCalendarPageAvailable(await checkPageUrlAvailability(pageUrl));
            }, 500),
            []
        );

        /**
         * Handles calendar page URL input changes and triggers debounced
         * availability check.
         */
        const handleCalendarPageUrlChange = (pageUrl) => {
            setCalendarPageUrl(pageUrl);
            debouncedCheckAvailability(pageUrl);
        };

        /**
         * Immediate availability check used on boot.
         */
        const checkInitialAvailability = async () => {
            setCalendarPageAvailable(await checkPageUrlAvailability(calendarPageUrl));
        };

        /**
         * On mount, check if the default calendar page URL is available.
         */
        useEffect(() => {
            checkInitialAvailability();
        }, []);

        /**
         * Update onboarding data whenever the calendarPageUrl changes.
         */
        useEffect(() => {
            updateData({ calendarPageUrl });
        }, [calendarPageUrl]);

        /**
         * Update onboarding data whenever the calendarPageAvailable changes.
         */
        useEffect(() => {
            updateData({ calendarPageAvailable });
        }, [calendarPageAvailable]);

        const stepSettings = getCurrentStep(path);
        const implementationField = stepSettings.fields.find(
            (field) => field.id === "implementation"
        );

        let chosenOption = implementationField?.default;
        if (getValue("implementation") !== false) {
            chosenOption = getValue("implementation");
        }

        const pagesShouldBeCreated = (chosenOption === "generated");
        const buttonDisabled = (pagesShouldBeCreated && !calendarPageAvailable);

        return (
            <>
                <LeftColumn className="items-center flex-col flex-wrap justify-center xl:col-span-6 col-span-12 xl:col-start-2">
                    <div className="text-center">
                        <h2 className="mb-2 text-lg font-light text-black">
                            {__("Almost there!", "simplybook")}
                        </h2>
                        <h1 className="text-3xl font-semibold text-black mb-4">
                            {__("Implement SimplyBook.me", "simplybook")}
                        </h1>
                    </div>
                    <OnboardingStep
                        path={path}
                        title={__("Implement SimplyBook.me", "simplybook")}
                        primaryButton={{
                            label: __("Continue configuration", "simplybook"),
                            navigateTo: "/",
                            disabled: buttonDisabled,
                        }}
                    />
                </LeftColumn>

                <RightColumn className="items-center flex-col flex-wrap justify-center xl:col-span-4 col-span-12 relative w-full">
                    <div className="flex flex-col flex-wrap items-center my-10 text-center h-full">
                        {chosenOption === "manual" && (
                            <>
                                <h1 className="text-3xl font-semibold text-black m-0 mb-2">
                                    {__("Implementation", "simplybook")}
                                </h1>
                                <h2 className="text-lg font-light text-black m-0 mb-6">
                                    {__("Use the below shortcode in a page to show the widget.", "simplybook")}
                                </h2>
                                <TextInput
                                    className="w-full p-4 mb-8"
                                    clickToSelect
                                    disabled
                                    value="[simplybook_widget]"
                                />
                                {/*

                                Removed as long we do not have documentation to link to

                                <div className="text-base text-gray-600">
                                    <Icon name="info" color="green" className="mr-2"/>
                                    {__("About using shortcodes", "simplybook")}
                                    &nbsp;<a className="underline" href="https://simplybook.me" target="_blank"
                                            rel="noreferrer">{__("Read more", "simplybook")}</a>
                                </div> */}
                            </>
                        )}
                        {chosenOption === "generated" && (
                            <>
                                <h1 className="text-3xl font-semibold text-black m-0 mb-2">
                                    {__("Implementation", "simplybook")}
                                </h1>
                                <h2 className="text-lg font-light text-black m-0 mb-6">
                                    {__("SimplyBook.me will generate the following page automatically", "simplybook")}
                                </h2>
                                <div className="w-full flex items-center mb-8">
                                    <TextInput
                                        className="p-4 flex-grow"
                                        value={calendarPageUrl}
                                        onChange={(e) => handleCalendarPageUrlChange(e.target.value)}
                                    />
                                    <Icon
                                        name={calendarPageAvailable ? "check" : "times"}
                                        color={calendarPageAvailable ? "green" : "red"}
                                        className="ml-2 self-center"
                                    />
                                </div>
                                {/* <div className="text-base text-gray-600">
                                    <Icon name="info" color="green" className="mr-3"/>
                                    {__("Generating pages for SimplyBook.me ", "simplybook")}
                                    <Link className="text-gray-600 underline" href="https://simplybook.me" target="_blank" rel="noreferrer">
                                        {__("Read more", "simplybook")}
                                    </Link>
                                </div> */}
                            </>
                        )}
                    </div>
                </RightColumn>
            </>
        );
    },
});