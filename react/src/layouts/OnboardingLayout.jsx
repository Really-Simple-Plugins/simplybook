import React from "react";
// import { memo } from "react";
import OnboardingContainer from "../components/Grid/OnboardingContainer";
import OnboardingHeader from "../components/Onboarding/OnboardingHeader"

const OnboardingLayout = ({ 
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
  
  OnboardingLayout.displayName = "OnboardingLayout";
  
  export default OnboardingLayout;