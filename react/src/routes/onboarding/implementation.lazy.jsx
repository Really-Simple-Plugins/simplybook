import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import useSettingsData from "../../hooks/useSettingsData";
import TextInput from "../../components/Inputs/TextInput";
import Icon from "../../components/Common/Icon";
import useOnboardingData from "../../hooks/useOnboardingData";

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
                {getValue('implementation') === "manual" &&
                    <div className={"my-6 text-center"}>
                        <h1 className={"text-3xl font-semibold text-black"}>{__("Implementation", "simplybook")}</h1>
                        <h2 className={"text-2xl text-gray-500 m-4"}>
                            {__("Use the below shortcode in a page to show the widget.", "simplybook")}
                        </h2>
                        <TextInput className="p-4 mb-8" clickToSelect={true} value="[simplybook_widget]"/>
                        <div className="text-lg text-gray-600">
                            <Icon name="info" color="green" className="mr-2"/>
                            {__("About using shortcodes", "simplybook")}
                            &nbsp;<a className="underline" href="https://simplybook.me" target="_blank"
                                     rel="noreferrer">{__("Read more", "simplybook")}</a>
                        </div>
                    </div>
                }
                {getValue('implementation') !== "manual" &&
                    <div className={"my-6 text-center"}>
                        <h1 className={"text-3xl font-semibold text-black"}>{__("Implementation", "simplybook")}</h1>
                        <h2 className={"text-2xl text-gray-500 m-4"}>
                            {__("SimplyBook.me will generate the following pages automatically.", "simplybook")}
                        </h2>
                        <div className="flex items-center mb-8">
                            <TextInput className="p-4 flex-grow" value={calendarPageName}
                                       onChange={(e) => setCalendarPageName(e.target.value)}/>
                            {calendarPageNameAvailable &&
                                <Icon name="check" color="green" className="ml-2 self-center"/>}
                            {!calendarPageNameAvailable &&
                                <Icon name="times" color="red" className="ml-2 self-center"/>}
                        </div>
                        <div className="flex items-center mb-8">
                            <TextInput className="p-4 flex-grow" value={bookingPageName}
                                       onChange={(e) => setBookingPageName(e.target.value)}/>
                            {bookingPageNameAvailable &&
                                <Icon name="check" color="green" className="ml-2 self-center"/>}
                            {!bookingPageNameAvailable &&
                                <Icon name="times" color="red" className="ml-2 self-center"/>}
                        </div>
                        <div className="text-lg text-gray-600">
                            <Icon name="info" color="green" className="mr-2"/>
                            {__("Generating pages for SimplyBook.me", "simplybook")}
                            &nbsp;<a className="underline" href="https://simplybook.me" target="_blank"
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