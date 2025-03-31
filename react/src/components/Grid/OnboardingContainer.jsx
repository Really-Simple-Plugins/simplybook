
import React from "react";
import clsx from "clsx"

const OnboardingContainer = ({ 
    className, 
    children 
}) => {
    return (
        <div className={clsx(className, "onboarding-container w-full h-full flex flex-col justify-center bg-white")}>
            <div className="grid grid-cols-12 gap-24 w-full px-4">
                {children}
            </div>
        </div>
    )
}

OnboardingContainer.displayName = "OnboardingContainer"

export default OnboardingContainer;
