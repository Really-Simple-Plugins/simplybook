import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // The total duration for the progress bar to complete
        const duration = 20000; // 20 seconds in milliseconds
        const interval = 100; // Update interval in milliseconds
        const increment = (100 / (duration / interval));

        const timer = setInterval(() => {
            setProgress((prev) => {
                const nextProgress = prev + increment;
                if (nextProgress >= 100) {
                    clearInterval(timer);
                    return 100; // Ensure it ends exactly at 100%
                }
                return nextProgress;
            });
        }, interval);

        return () => clearInterval(timer); // Cleanup the interval on unmount
    }, []);

    return (
        <div className="w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
            <div
                className="h-full bg-blue-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
