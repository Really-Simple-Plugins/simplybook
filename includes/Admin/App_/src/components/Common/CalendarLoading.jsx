import React, {useEffect, useState} from "react";
import useOnboardingData from "../../hooks/useOnboardingData";
import {__} from "@wordpress/i18n";

const CalendarLoading = () => {
    const [progress, setProgress] = useState(0);
    const {onboardingCompleted} = useOnboardingData();
    const [warning, setWarning] = useState(false);
    const [iterations, setIterations] = useState(0);
    useEffect(() => {
        // The total duration for the progress bar to complete
        const duration = 30000; // 20 seconds in milliseconds
        const interval = 100; // Update interval in milliseconds
        const increment = (100 / (duration / interval));

        const timer = setInterval(() => {
            setProgress((prev) => {

                let nextProgress = prev + increment;
                //if almost there, but onboarding not completed, reset a bit
                if (nextProgress>90 && !onboardingCompleted) {
                    setWarning(true);
                    nextProgress = 5;
                    setIterations(iterations+1);
                }
                if (iterations>5 && !onboardingCompleted) {
                    nextProgress = 100;
                }
                if (nextProgress >= 100) {
                    clearInterval(timer);
                    setWarning(false);
                    return 100; // Ensure it ends exactly at 100%
                }
                return nextProgress;
            });
        }, interval);

        return () => clearInterval(timer); // Cleanup the interval on unmount
    }, []);

    //check if current url contains the query parameter onboarding
    let isInOnboardingProcess = window.location.href.includes('onboarding');

    let grayBackground = "bg-gray-100";
    let animateClass = isInOnboardingProcess ? "animate-pulse" : "";
    return (
        <div className={"w-full max-w-md bg-white shadow-md mt-5 "+animateClass}>
            { isInOnboardingProcess &&
                <div className="w-full">
                    <div className="w-full h-1 bg-gray-200 rounded-t-lg overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-100"
                            style={{width: `${progress}%`}}
                        ></div>
                    </div>
                </div>
            }
            <div className={`text-gray-400 text-center p-3  ${grayBackground}`}>
                {isInOnboardingProcess && <>
                    {iterations <= 5 && <>
                        {!warning &&
                            <p>{__("Please wait while your registration is being processed. This usually takes about 30 seconds.", "simplybook")}</p>}
                        {
                            warning &&
                            <p>{__('This is taking a bit longer than expected. Please wait while we retry a few times.', 'simplybook')}</p>
                        }
                    </>}
                    {iterations > 5 &&
                        <p>{__("We're sorry, but it seems there is a problem with your registration. Please try again later.", "simplybook")}</p>}
                </>}
                {!isInOnboardingProcess && <p>{__("Please complete the onboarding first to register your account.", "simplybook")}</p>}
            </div>

            <div className="p-4">
                <div className="text-center h-40">
                    <div className={`w-full h-full ${grayBackground} rounded-md`}></div>
                </div>
            </div>

            <div className="p-4 border-t">
                <h4 className="text-gray-700 font-bold mb-4">
                    <div className={`h-6 ${grayBackground} rounded-md`}></div>
                </h4>
                <div className="grid grid-cols-3 gap-3">
                    <div className={`text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`}></div>
                    <div className={`text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`}></div>
                    <div className={`text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`}></div>
                    <div className={`text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`}></div>
                    <div className={`text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`}></div>
                    <div className={`text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`}></div>
                </div>
                <div className="text-gray-500 text-sm mt-3">
                    <span className={`inline-block w-3 h-3 rounded-full ${grayBackground}`}></span> - <span
                    className="font-medium"></span>
                </div>
            </div>
        </div>
    );
}
export default CalendarLoading;
