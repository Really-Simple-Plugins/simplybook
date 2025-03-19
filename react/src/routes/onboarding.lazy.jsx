import React, { useState } from "react";
import request from "../api/requests/request";
import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import { __ } from "@wordpress/i18n";
import OnboardingFooter from "../components/Onboarding/OnboardingFooter";

export const Route = createLazyFileRoute("/onboarding")({
  component: () => <OnboardingPage />,
  // navigate to first step
});

function OnboardingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [require2fa, setRequire2fa] = useState(false);
    const [authSessionId, setAuthSessionId] = useState(null);
    const [companyLogin, setCompanyLogin] = useState(null);
    const [userLogin, setUserLogin] = useState(null);
    const [domain, setDomain] = useState("default:simplybook.it");

    const toggleModal = (e) => {
        e.preventDefault();
        setIsModalOpen(!isModalOpen);
    };

    const logUserIn = async (formData) => {
        const response = await request("onboarding/auth", "POST", formData);

        if (!response) {
            return; // Logging is done in request.js
        }

        if (response.data && ('require2fa' in response.data) && (response.data.require2fa === true)) {
            setRequire2fa(true);
            setAuthSessionId(response.data.auth_session_id);
            setCompanyLogin(response.data.company_login);
            setUserLogin(response.data.user_login);
            setDomain(response.data.domain);

            return;
        }

        console.log("Login successful:", response);
        window.location.href = "/wp-admin/admin.php?page=simplybook";
    };

    const handle2faSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            auth_session_id: authSessionId,
            company_login: companyLogin,
            user_login: userLogin,
            domain: domain,
            google_authenticator: e.target.google_authenticator.value,
        };
        try {
            const response = await request("onboarding/auth_two_fa", "POST", formData);
            if (response) {
                console.log("2FA successful:", response);
                window.location.href = "/wp-admin/admin.php?page=simplybook";
            }
        } catch (error) {
            console.error("2FA error:", error);
        }
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
            {isModalOpen && <SignInModal logUserIn={logUserIn} require2fa={require2fa} handle2faSubmit={handle2faSubmit} onClose={toggleModal} />}
        </div>
    );
}

function SignInModal({ logUserIn, require2fa, handle2faSubmit, onClose }) {
    const [selectedDomain, setSelectedDomain] = useState("default:simplybook.it");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            company_domain: selectedDomain,
            company_login: e.target.company_login.value,
            user_login: e.target.user_login.value,
            user_password: e.target.user_password.value,
        };
        logUserIn(formData);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded">
                <h2>{__("Sign In", "simplybook")}</h2>
                {!require2fa ? (
                    <form onSubmit={handleSubmit}>
                        <select name={"company_domain"} value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)}>
                            <option key="default:simplybook.it" value="default:simplybook.it">simplybook.it</option>
                            <option key="default:simplybook.me" value="default:simplybook.me">simplybook.me</option>
                            <option key="default:simplybook.asia" value="default:simplybook.asia">simplybook.asia</option>
                            <option key="login:simplybook.vip" value="login:simplybook.vip">simplybook.vip</option>
                            <option key="login:simplybook.cc" value="login:simplybook.cc">simplybook.cc</option>
                            <option key="login:simplybook.us" value="login:simplybook.us">simplybook.us</option>
                            <option key="login:simplybook.pro" value="login:simplybook.pro">simplybook.pro</option>
                            <option key="login:enterpriseappointments.com" value="login:enterpriseappointments.com">enterpriseappointments.com</option>
                            <option key="login:simplybook.webnode.page" value="login:simplybook.webnode.page">simplybook.webnode.page</option>
                            <option key="login:servicebookings.net" value="login:servicebookings.net">servicebookings.net</option>
                            <option key="login:booking.names.uk" value="login:booking.names.uk">booking.names.uk</option>
                            <option key="login:booking.lcn.uk" value="login:booking.lcn.uk">booking.lcn.uk</option>
                            <option key="login:booking.register365.ie" value="login:booking.register365.ie">booking.register365.ie</option>
                        </select>
                        <input type="text" name={"company_login"} placeholder={__("Company login")} />
                        <input type="email" name={"user_login"} placeholder={__("Email", "simplybook")} />
                        <input type="password" name={"user_password"} placeholder={__("Password", "simplybook")} />
                        <button type="submit">{__("Submit", "simplybook")}</button>
                        <button type="button" onClick={onClose}>{__("Close", "simplybook")}</button>
                    </form>
                ) : (
                    <form onSubmit={handle2faSubmit}>
                        <label>{__("Google authenticator", "simplybook")}</label>
                        <input type="text" name={"google_authenticator"} placeholder={__("Enter Google authenticator code", "simplybook")} />
                        <button type="submit">{__("Submit", "simplybook")}</button>
                        <button type="button" onClick={onClose}>{__("Close", "simplybook")}</button>
                    </form>
                )}
            </div>
        </div>
    );
}