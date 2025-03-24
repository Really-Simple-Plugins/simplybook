import React, { useState } from "react";
import clsx from "clsx";
import {__} from "@wordpress/i18n";
import { ReactComponent as Logo } from "../../../../assets/img/logo.svg";
import SignInModal from "../Modals/SignInModal.js";

const OnboardingHeader = ({
    className, 
    signInLink 
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const toggleModal = (e) => {
        e.preventDefault();
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className={clsx(className, "flex w-full items-center justify-between")}>
            {isModalOpen && <SignInModal onClose={toggleModal}/>}
            <div className="flex flex-row justify-between w-full px-4">
                <Logo className="mx-4 w-40 py-8" />
                <div className="flex items-center">
                    <span className={"m-5 text-black"}>
                        {__("Already got an account?", "simplybook")}{" "}
                    </span>
                    <a className="font-bold text-primary" href="#" onClick={toggleModal}>
                        {__("Sign in here")}
                    </a>{" "}
                </div>
            </div>
        </div>
    )
}

OnboardingHeader.displayName = "OnboardingHeader";

export default OnboardingHeader;