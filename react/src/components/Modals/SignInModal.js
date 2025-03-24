import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ReactComponent as Logo } from "../../../../assets/img/logo.svg";
import {__} from "@wordpress/i18n";
// API imports
import apiFetch from "@wordpress/api-fetch";
import glue from "../../api/helpers/glue";
import { API_BASE_PATH, NONCE } from "../../api/config";
import request from "../../api/requests/request";

import ButtonInput from "../Inputs/ButtonInput";
import SelectField from "../Fields/SelectField";
import TextField from "../Fields/TextField";
import Error from "../Errors/Error";

function SignInModal({ onClose })
{
    const [require2fa, setRequire2fa] = useState(false);
    const [authSessionId, setAuthSessionId] = useState(null);
    const [companyLogin, setCompanyLogin] = useState(null);
    const [userLogin, setUserLogin] = useState(null);
    const [twoFaProviders, setTwoFaProviders] = useState(['ga']);
    const [domain, setDomain] = useState("default:simplybook.it");
    const [twoFaCode, setTwoFaCode] = useState("");

    const [selectedDomain, setSelectedDomain] = useState("default:simplybook.it");
    const [selectedProvider, setSelectedProvider] = useState(twoFaProviders[0]);

    /**
     * We use React Hook Form to handle client-side validation
     */
    const { control, handleSubmit, formState: { errors }, register } = useForm({
        defaultValues: {
            company_login: "",
            user_login: "",
            user_password: "",
            companyDomains: "",
        }
    });


    /**
     * 
     * TODO: This list should be fetched from the API
     */
    const knownProviders = {
        'ga': __('Google Authenticator', 'simplybook'),
        'sms': __('SMS', 'simplybook'),
    };

    /**
     * Sends the filled in form data to the api to log the user
     * 
     * @param {event} e 
     */
    const submitForm = (e) => {
        e.preventDefault();
        
        const formData = {
            company_domain: selectedDomain,
            company_login: e.target.company_login.value,
            user_login: e.target.user_login.value,
            user_password: e.target.user_password.value,
        };
    
        logUserIn(formData);
    };

    const handleProviderChange = (e) => {
        setSelectedProvider(e.target.value);
    };

    
    /**
     * 
     * Checks if the filled input credentials comply and sends an API call to SimplyBook
     * 
     * @param {object} formData
     * @returns 
     */
    const logUserIn = async (formData) => {

        /**
         * 
         * TODO: Create a request for this that validates the form data on the serverside
         */
        try {
            let path = API_BASE_PATH + "onboarding/auth" + glue() + "&token=" + Math.random().toString(36).substring(2, 7);
            let data = { ...formData, nonce: NONCE };

            let response = await apiFetch({
                path,
                method: "POST",
                data
            });

        } catch (error) {

            if(error) {
                console.error(error);
                return;
            }
        }

        if (!response) {
            return; // Logging is done in request.js
        }

        console.log(response.data);

        if (response.data && ('require2fa' in response.data) && (response.data.require2fa === true)) {
            setRequire2fa(true);
            setAuthSessionId(response.data.auth_session_id);
            setCompanyLogin(response.data.company_login);
            setUserLogin(response.data.user_login);
            setDomain(response.data.domain);
            setTwoFaProviders(response.data.allowed2fa_providers);

            return;
        }

        console.log("Login successful:", response);
        window.location.href = "/wp-admin/admin.php?page=simplybook";
    };

    const handle2faSubmit = async (e) => {
        e.preventDefault();

        const response = await request("onboarding/auth_two_fa", "POST", {
            auth_session_id: authSessionId,
            company_login: companyLogin,
            user_login: userLogin,
            domain: domain,
            two_fa_code: e.target.two_fa_code.value,
            two_fa_type: e.target.two_fa_type.value,
        });

        if (response) {
            console.log("2FA successful:", response);
            window.location.href = "/wp-admin/admin.php?page=simplybook";
            return;
        }

        console.error("2FA error:", error);
    };

    const requestSms = async () => {
        const response = await request("onboarding/auth_send_sms", "POST", {
            auth_session_id: authSessionId,
            company_login: companyLogin,
            domain: domain,
        });
        if (response) {
            return console.log("SMS request successful:", response);
        }
        console.error("SMS request error:", error);
    };

    const companyDomains = [
        { key: "default:simplybook.it", value: "default:simplybook.it", label: "simplybook.it" },
        { key: "default:simplybook.me", value: "default:simplybook.me", label: "simplybook.me" },
        { key: "default:simplybook.asia", value: "default:simplybook.asia", label: "simplybook.asia" },
        { key: "login:simplybook.vip", value: "login:simplybook.vip", label: "simplybook.vip" },
        { key: "login:simplybook.cc", value: "login:simplybook.cc", label: "simplybook.cc" },
        { key: "login:simplybook.us", value: "login:simplybook.us", label: "simplybook.us" },
        { key: "login:simplybook.pro", value: "login:simplybook.pro", label: "simplybook.pro" },
        { key: "login:enterpriseappointments.com", value: "login:enterpriseappointments.com", label: "enterpriseappointments.com" },
        { key: "login:simplybook.webnode.page", value: "login:simplybook.webnode.page", label: "simplybook.webnode.page" },
        { key: "login:servicebookings.net", value: "login:servicebookings.net", label: "servicebookings.net" },
        { key: "login:booking.names.uk", value: "login:booking.names.uk", label: "booking.names.uk" },
        { key: "login:booking.lcn.uk", value: "login:booking.lcn.uk", label: "booking.lcn.uk" },
        { key: "login:booking.register365.ie", value: "login:booking.register365.ie", label: "booking.register365.ie" },
        // GET RID OF THIS LATER!! 
        { key: "default:https://wp.simplybook.ovh/", value: "default:https://wp.simplybook.ovh/", label: "https://wp.simplybook.ovh/" }
    ];

    return (
        <div className="signin-modal-bg fixed z-999 inset-0 flex items-center justify-center bg-black/50 border-2 border-gray-200 ">
            <div className="signin-modal mt-8 w-3/8 bg-white p-4 px-4 rounded border-3 border-gray-200">
                {!require2fa ? (
                    <>
                        <div className="flex flex-col items-center mb-8">
                            <Logo className="mx-4 w-65 py-2 my-4" />
                            <h2 className="my-4">{__("Sign In", "simplybook")}</h2>
                            <small>{__("Please enter your SimplyBook credentials to sign in.", "simplybook")}</small>
                        </div>  
                        <form className="flex flex-col relative" onSubmit={handleSubmit(submitForm)}>
                            <SelectField
                                {...register("company_domain", {
                                    required: true
                                })}
                                label={__("Company domain", "simplybook")} 
                                setting="company_domain"
                                name="company_domain"
                                className="relative z-999"
                                options={companyDomains}
                                onChange={(e) => setSelectedDomain(e.options.value)}
                            />
                            {/* TODO: Make this a data array to load forms */}
                            <TextField 
                                {...register("company_login", {
                                    required: "Company login is required"
                                })}
                                label={__("Company login", "simplybook")}
                                setting="company_login"
                                type="text"
                                name={"company_login"}
                                placeholder={__("Company login", "simplybook")}
                            />
                            <TextField
                                {...register("user_login", {
                                    required: true
                                })}                        
                                label={__("Email", "simplybook")}
                                setting="email"
                                type="email"
                                name={"user_login"}
                                placeholder={__("Email", "simplybook")}
                            />
                            <TextField 
                                {...register("user_password", {
                                    required: true
                                })}
                                label={__("Password", "simplybook")}
                                setting="password"
                                type="password"
                                name={"user_password"}
                                placeholder={__("Password", "simplybook")}
                            />
                            {/* TODO: Create validation with error message */}
                            {/* {error && ( */}
                                {/* <Error 
                                    errorHeading={__("The following fields are incorrect:", "simplybook")}
                                    error={showError(errors)}
                                /> */}
                            {/* )} */}

                            <ButtonInput 
                                className="mt-4 mb-4"
                                btnVariant="primary"
                                type="submit"
                            >
                                Submit
                            </ButtonInput>
                            <ButtonInput 
                                className=""
                                btnVariant="secondary"
                                type="button"
                                onClick={onClose}
                            >
                                Close
                            </ButtonInput>
                        </form>
                    </>
                ) : (
                    <>
                    <div className="flex flex-col items-center mb-8">
                        <Logo className="mx-4 w-65 py-2 my-4" />
                        <h2 className="my-4">{__("Fill in MFA code", "simplybook")}</h2>
                    </div>  
                    <form className="flex flex-col " onSubmit={handle2faSubmit}>
                        {twoFaProviders.length > 1 ? (
                        <React.Fragment>
                            <SelectField
                                {...register("company_domain", {
                                    required: true
                                })}
                                className="relative z-999"
                                label={__("Select 2FA provider", "simplybook")} 
                                setting="company_domain"
                                name="company_domain"
                                options={selectedProvider}
                                value={selectedProvider}
                                onChange={handleProviderChange}
                            />
                        </React.Fragment>
                        ) : (
                            <input type={"hidden"} name={"two_fa_type"} value={twoFaProviders[0]} />
                        )}

                        {twoFaProviders.map((provider) => (
                            <div className={"two_fa_type_wrapper flex flex-col"} data-provider={provider} style={{ display: provider === selectedProvider ? "block" : "none" }} key={provider}>
                                <TextField
                                    {...register("two_fa_code", {
                                    required: true
                                    })}  
                                    className="mb-4"                      
                                    label={__("Enter 2FA authentication code", "simplybook")}
                                    setting="two_fa_code"
                                    type="text"
                                    name={"two_fa_code"}
                                    placeholder={__("Enter code", "simplybook")}
                                    value={twoFaCode} 
                                    onChange={(e) => setTwoFaCode(e.target.value)}
                                />
                                {selectedProvider === 'sms' && <button type="button" onClick={requestSms}>{__("Request SMS", "simplybook")}</button>}
                                <div className={"two_fa_button_wrapper flex flex-col"}>

                                    {/* TODO: Create validation with error message */}
                                    {/* {error && ( */}
                                        {/* <Error 
                                            errorHeading={__("The code is incorrect", "simplybook")}
                                        /> */}
                                    {/* )} */}

                                    <ButtonInput 
                                        className="mt-4 mb-4"
                                        btnVariant="primary"
                                        type="submit"
                                    >
                                        Submit
                                    </ButtonInput>
                                    <ButtonInput 
                                        className=""
                                        btnVariant="secondary"
                                        type="submit"
                                        onClick={onClose}
                                    >
                                        Close
                                    </ButtonInput>
                                </div>
                            </div>
                        ))}

                    </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default SignInModal;