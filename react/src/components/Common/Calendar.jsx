import {useEffect} from "react";
import CalendarLoading from "./CalendarLoading";
import useWidgetData from "../../hooks/useWidgetData";
import useWaitForRegistrationCallback from "../../hooks/useWaitForRegistrationCallback";

const Calendar = (
    {
        primary,
        secondary,
        active,
        onboardingCompleted
    }
) => {
    const {createPreviewWidget} = useWidgetData();
    const {startPolling, pollingEnabled, pollingSuccess} = useWaitForRegistrationCallback();

    useEffect(() => {
        if (pollingEnabled === false) {
            startPolling();
        }
    }, [onboardingCompleted]);

    useEffect(() => {
        if (pollingSuccess) {
            runInlineScript(primary, secondary, active);
        }
    }, [primary, secondary, active, pollingSuccess]);

    const runInlineScript = (primaryColor, secondaryColor, activeColor) => {
        createPreviewWidget({
            'onboarding': true,
            'primary': primaryColor,
            'secondary': secondaryColor,
            'active': activeColor,
        }).then((response) => {

            let inlineScriptElement = document.createElement('script');
            inlineScriptElement.id = 'simplybook-preview-widget-script';
            inlineScriptElement.innerHTML = response.data.widget;

            document.body.appendChild(inlineScriptElement);

            // Dispatch custom element to load the widget
            document.dispatchEvent(
                new CustomEvent('loadSimplyBookPreviewWidget')
            );
        });
    }

    if (!onboardingCompleted) {
        return (
            <CalendarLoading />
        );
    }

    return (
        <div id="sbw_z0hg2i_calendar" className=" w-full -mt-20" style={{height: "1200px"}}></div>
    );
}
export default Calendar;