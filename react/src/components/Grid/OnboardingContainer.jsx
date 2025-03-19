
import React from "react";
import clsx from "clsx"

const OnboardingContainer = ({ 
    className, 
    children 
}) => {
    return (
        <div className={clsx(className, "onboarding-container flex flex-col bg-white")}>
            <div className="grid w-full grid-cols-12 gap-24">
                {children}
            </div>
        </div>
    )
}

OnboardingContainer.displayName = "OnboardingContainer"

export default OnboardingContainer;
