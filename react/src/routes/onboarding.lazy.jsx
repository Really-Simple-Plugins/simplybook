import React, { useState } from "react";
import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import { __ } from "@wordpress/i18n";
import OnboardingFooter from "../components/Onboarding/OnboardingFooter";
import SignInModal from "../components/Modals/SignInModal";

export const Route = createLazyFileRoute("/onboarding")({
  component: () => <OnboardingPage />,
  // navigate to first step
});

function OnboardingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = (e) => {
        e.preventDefault();
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className={"bg-white"}>
            <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
                <Logo className="m-5 w-40 py-2" />
                <span className={"m-5 text-black"}>
                    {__("Already got an account?", "simplybook")}{" "}
                    <a className="font-bold text-black" href="#" onClick={toggleModal}>
                        {__("Sign in here")}
                    </a>{" "}
                </span>
            </div>
            <div className="mx-auto flex max-w-screen-2xl flex-col py-5">
                <div className="grid min-h-full w-full grid-cols-12 gap-24">
                    <Outlet />
                </div>
            </div>
            <OnboardingFooter />
            {isModalOpen && <SignInModal onClose={toggleModal}/>}
        </div>
    );
}