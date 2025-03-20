import React, { useState } from "react";
import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import { __ } from "@wordpress/i18n";
import OnboardingFooter from "../components/Onboarding/OnboardingFooter";
import OnboardingLayout from "../layouts/OnboardingLayout";

export const Route = createLazyFileRoute("/onboarding")({
  component: () => <OnboardingPage />,
  // navigate to first step
});

function OnboardingPage() {

    return (
        <>
            <div className={"onboarding-body bg-white flex flex-col items-center"}>
                <OnboardingLayout>
                    <Outlet />
                </OnboardingLayout> 
            </div>
        </>
    );
}