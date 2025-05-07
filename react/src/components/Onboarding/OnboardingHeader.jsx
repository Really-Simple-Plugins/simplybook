import React, { useState } from "react";
import clsx from "clsx";
import {__} from "@wordpress/i18n";
import { ReactComponent as Logo } from "../../../../assets/img/logo.svg";
import SignInModal from "../Modals/SignInModal";
import useOnboardingData from "../../hooks/useOnboardingData";
import { useLocation } from "@tanstack/react-router";

const OnboardingHeader = ({
    className, 
    signInLink 
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { getCurrentStepId } = useOnboardingData();
    const location = useLocation()
    const currentStepId = getCurrentStepId(location.pathname);
    
    /**
     * Toggle the SignInModal
     * 
     * @param {e} e 
     */
    const toggleModal = (e) => {
        e.preventDefault();
        setIsModalOpen(!isModalOpen);
    };

    return (
        <header className={clsx(className, "flex w-full items-center justify-between max-w-screen-2xl")}>
            {isModalOpen && <SignInModal onClose={toggleModal}/>}
            <div className="flex flex-row justify-between w-full px-4">
                <Logo className="w-40 py-8" />
                {currentStepId < 4 && (                    
                    <div className="flex items-center text-base">
                        <span className={"m-5 text-black"}>
                            {__("Already got an account?", "simplybook")}
                        </span>
                        <a className="font-bold text-primary" href="#" onClick={toggleModal}>
                            {__("Sign in here")}
                        </a>
                    </div>
                )}
            </div>
        </header>
    )
}

OnboardingHeader.displayName = "OnboardingHeader";

export default OnboardingHeader;