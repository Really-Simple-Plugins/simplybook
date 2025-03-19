import React from "react";
// import { memo } from "react";
import OnboardingContainer from "../components/Grid/OnboardingContainer";
import OnboardingHeader from "../components/Onboarding/OnboardingHeader"

const OnboardingWrapper = ({ 
     children
}) => {
    return (
    <>
    <OnboardingHeader 
        className="onboarding-header"
        signInLink="https://simplybook.me"
    />
    <OnboardingContainer>
      {children}
    </OnboardingContainer>
    </>
    );
  };
  
  OnboardingWrapper.displayName = "OnboardingWrapper";
  
  export default OnboardingWrapper;