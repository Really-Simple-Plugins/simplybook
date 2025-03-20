
import React from "react";
import clsx from "clsx"

const OnboardingContainer = ({ 
    className, 
    children 
}) => {
    return (
        <div className={clsx(className, "onboarding-container max-w-container flex flex-col bg-white")}>
            <div className="grid grid-cols-12 gap-24 w-full px-4 py-48">
                {children}
            </div>
        </div>
    )
}

OnboardingContainer.displayName = "OnboardingContainer"

export default OnboardingContainer;
