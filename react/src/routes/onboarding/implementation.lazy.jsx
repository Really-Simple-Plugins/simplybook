import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import useSettingsData from "../../hooks/useSettingsData";
import TextInput from "../../components/Inputs/TextInput";
import Icon from "../../components/Common/Icon";
import useOnboardingData from "../../hooks/useOnboardingData";
import LeftColumn from "../../components/Grid/LeftColumn";
import RightColumn from "../../components/Grid/RightColumn";

const path = "/onboarding/implementation";

export const Route = createLazyFileRoute(path)({

    component: () => {
        const { getValue } = useSettingsData();

        const {
            setCalendarPageName,
            bookingPageName,
            setBookingPageName,
            calendarPageName,
            calendarPageNameAvailable,
            bookingPageNameAvailable,
        } = useOnboardingData();

        return (
            <>
                <LeftColumn className={"items-center flex-col flex-wrap justify-center xl:col-span-6 col-span-12 xl:col-start-2"}>
                    <div className={"text-center"}>
                        <h2 className={"mb-2 text-lg font-light text-black"}>
                            {__("Almost there!", "simplybook")}
                        </h2>
                        <h1 className={"text-3xl font-semibold text-black mb-4"}>
                            {__("Let's implement SimplyBook.me", "simplybook")}
                        </h1>
                    </div>                     
                    <OnboardingStep
                        path={path}
                        company
                        title={__("Implement SimplyBook.me", "simplybook")}
                        primaryButton={{
                            label: __("Continue configuration", "simplybook"),
                            navigateTo: "/settings/general",
                        }}
                    />
                </LeftColumn>
                <RightColumn className={"items-center flex-col flex-wrap justify-center xl:col-span-4 col-span-12 relative w-full"}>
                    {getValue('implementation') === "manual" &&
                        <div className={"my-6 text-center"}>
                            <h1 className={"text-3xl font-semibold text-black m-0 mb-2"}>{__("Implementation", "simplybook")}</h1>
                            <h2 className={"text-lg font-light text-black m-0 mb-6"}>
                                {__("Use the below shortcode in a page to show the widget.", "simplybook")}
                            </h2>
                            <TextInput 
                                className="w-full p-4 mb-8" 
                                clickToSelect={true} 
                                disabled={true}
                                value="[simplybook_widget]"
                            />
                            <div className="text-base text-gray-600">
                                <Icon name="info" color="green" className="mr-2"/>
                                {__("About using shortcodes", "simplybook")}
                                &nbsp;<a className="underline" href="https://simplybook.me" target="_blank"
                                        rel="noreferrer">{__("Read more", "simplybook")}</a>
                            </div>
                        </div>
                    }
                    {getValue('implementation') !== "manual" &&
                        <div className={"flex flex-col flex-wrap items-center my-6 text-center"}>
                            <h1 className={"text-3xl font-semibold text-black m-0 mb-2"}>{__("Implementation", "simplybook")}</h1>
                            <h2 className={"text-lg font-light text-black m-0 mb-6"}>
                                {__("SimplyBook.me will generate the following pages automatically", "simplybook")}
                            </h2>
                            <div className="w-full flex items-center mb-8">
                                <TextInput className="p-4 flex-grow" value={calendarPageName}
                                        onChange={(e) => setCalendarPageName(e.target.value)}/>
                                {calendarPageNameAvailable &&
                                    <Icon name="check" color="green" className="ml-2 self-center"/>}
                                {!calendarPageNameAvailable &&
                                    <Icon name="times" color="red" className="ml-2 self-center"/>}
                            </div>
                            <div className="w-full flex items-center mb-8">
                                <TextInput className="p-4 flex-grow" value={bookingPageName}
                                        onChange={(e) => setBookingPageName(e.target.value)}/>
                                {bookingPageNameAvailable &&
                                    <Icon name="check" color="green" className="ml-2 self-center"/>}
                                {!bookingPageNameAvailable &&
                                    <Icon name="times" color="red" className="ml-2 self-center"/>}
                            </div>
                            <div className="text-base text-gray-600">
                                <Icon name="info" color="green" className="mr-2"/>
                                {__("Generating pages for SimplyBook.me", "simplybook")}
                                &nbsp;<a className="underline" href="https://simplybook.me" target="_blank"
                                        rel="noreferrer">{__("Read more", "simplybook")}</a>
                            </div>
                        </div>

                    }              
                </RightColumn>
            </>
        );
    },
});