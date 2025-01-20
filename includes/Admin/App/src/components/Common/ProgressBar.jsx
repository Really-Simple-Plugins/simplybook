import React, { useState, useEffect } from 'react';
import useOnboardingData from "../../hooks/useOnboardingData";
import { __ } from '@wordpress/i18n';
import Icon from './Icon';
const ProgressBar = () => {
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

    return (
        <div className="w-full">
            <div className="w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
                <div
                    className="h-full bg-blue-500 transition-all duration-100"
                    style={{width: `${progress}%`}}
                ></div>
            </div>
            {iterations<=5 && <>
                {!warning && <p>{__("Please wait while your registration is being processed. This usually takes about 30 seconds.", "simplybook")}</p>}
                {
                    warning &&
                    <p>{__('This is taking a bit longer than expected. Please wait while we retry a few times.', 'simplybook')}</p>
                }
                </>}
            {iterations>5 && <p>{__("We're sorry, but it seems there is a problem with your registration. Please try again later.", "simplybook")}</p>}
            </div>
    );
};

export default ProgressBar;
