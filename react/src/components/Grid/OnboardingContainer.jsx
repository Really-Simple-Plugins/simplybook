
import React from "react";
import clsx from "clsx"

const OnboardingContainer = ({ 
    className, 
    children 
}) => {
    return (
        <div className={clsx(className, "onboarding-container w-full min-h-[75svh] flex flex-col items-center justify-center bg-white py-4")}>
            <div className="xl:grid xl:grid-cols-12 xl:gap-24 w-full px-8 flex flex-col">
                {children}
            </div>
        </div>
    )
}

OnboardingContainer.displayName = "OnboardingContainer"

export default OnboardingContainer;
