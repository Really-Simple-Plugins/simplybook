import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
    const [twoFaProviders, setTwoFaProviders] = useState({ga: __("Google Authenticator", "simplybook")});
    const [domain, setDomain] = useState("default:simplybook.it");
    const [twoFaCode, setTwoFaCode] = useState("");

    const [selectedDomain, setSelectedDomain] = useState("default:simplybook.it");
    const [selectedProvider, setSelectedProvider] = useState(twoFaProviders[0]);

    console.error(setSelectedProvider);


    /**
     * We use React Hook Form to handle client-side validation for the main login
     */
    const { control, register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
        mode: "onChange",
        defaultValues: {
            company_domain: "default:simplybook.it",
            company_login: "",
            user_login: "",
            user_password: ""
        }
    });

    // Update how we watch the fields
    const watchCompanyDomain = watch("company_domain");
    const watchCompanyLogin = watch("company_login");
    const watchUserLogin = watch("user_login");
    const watchUserPassword = watch("user_password");
  
    /**
     * CHeck if the fields are empty, only when all are filled the button becomes enabled
     */
    const isFormFilled =    watchCompanyLogin &&    
                            watchCompanyDomain && 
                            watchUserLogin && 
                            watchUserPassword && 
                            watchCompanyDomain.trim() !== "" && 
                            watchCompanyLogin.trim() !== "" && 
                            watchUserLogin.trim() !== "" && 
                            watchUserPassword.trim() !== "";
   

    /**
     * Set the button disabled state
     */
    const setDisabled = !isFormFilled ? true : false;

    /**
     * Create another constant for the 2FA field
     */
    const { 
        control: control2fa, 
        handleSubmit: handleSubmit2fa, 
        watch: watch2fa,
        formState: { errors: errors2fa } 
    } = useForm({
        mode: "onChange",
        defaultValues: {
            two_fa_code: "",
            two_fa_type: twoFaProviders[0]
        }
    });

    /**
     * Watch the 2FA fields
     */
    const watch2faCode = watch2fa("two_fa_code");
    const watch2faType = watch2fa("two_fa_type");

    /**
     * Check 2FA fields
     */
    const is2faFilled =     watch2faCode &&
                            watch2faCode.trim() !== "";
    /**
     * Set the 2FA button disabled state
     */
    const setDisabled2FA = !is2faFilled ? true : false;


    // Add this console log to debug
    console.log('Form state:', {
            watch2faCode
    });

    /**
     * Sends the filled in form data to the api to log the user
     * 
     * @param {event} e 
     */
    const submitForm = handleSubmit((data) => {
        
        const formData = {
            company_domain: selectedDomain,
            company_login: data.company_login,
            user_login: data.user_login,
            user_password: data.user_password
        };

        logUserIn(formData);
    });

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
            // let path = "https://user-api-v2.simplybook.me/admin/"
            let path = API_BASE_PATH + "onboarding/auth" + glue() + "&token=" + Math.random().toString(36).substring(2, 7);
            let data = { ...formData, nonce: NONCE };

            let response = await apiFetch({
                path,
                method: "POST",
                data
            });

            
            if (!response) {
                return; // Logging is done in request.js
            }

            if (response.data && ('require2fa' in response.data) && (response.data.require2fa === true)) {
                setRequire2fa(true);
                setAuthSessionId(response.data.auth_session_id);
                setCompanyLogin(response.data.company_login);
                setUserLogin(response.data.user_login);
                setDomain(response.data.domain);
                setTwoFaProviders(response.data.allowed2fa_providers);
    
                return;
            }


            window.location.href = "/wp-admin/admin.php?page=simplybook";

        } catch (error) {
            if(error) {
                console.error(error);
                return;
            }
        }
    };

    const handle2faSubmit = handleSubmit2fa(async (data) => {

        // BUG getting 2fa error and not succesful with the 2fa
        // API Error at simplybook/v1/onboarding/auth_two_fa?&token=a9lhs: 2fa Authentication failed with code 400
        const response = await request("onboarding/auth_two_fa", "POST", {
            auth_session_id: authSessionId,
            company_login: companyLogin,
            user_login: userLogin,
            domain: domain,
            two_fa_code: data.two_fa_code,
            two_fa_type: data.two_fa_type,
        });

        if (response) {
            console.log("2FA successful:", response);
            window.location.href = "/wp-admin/admin.php?page=simplybook";
            return;
        }

        console.error("2FA error:");
    });

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

    const onError = (errors) => {
        console.error("wrong", errors);
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
                        <form className="flex flex-col relative" onSubmit={submitForm}>
                            <Controller
                                name="company_domain"
                                control={control}
                                rules={{ required: true }}
                                defaultValue="default:simplybook.it"
                                render={({ field, fieldState }) => (
                                    <SelectField
                                        {...field}
                                        fieldState={fieldState}
                                        label={__("Company domain", "simplybook")} 
                                        setting="company_domain"
                                        className="relative z-999"
                                        options={companyDomains}
                                        value={field.value} // Bind the value to the field value
                                        onChange={(e) => {
                                            const selectedValue = e.target.value; // Get the selected value
                                            setSelectedDomain(selectedValue); // Update local state
                                            field.onChange(selectedValue); // Update form state
                                        }}
                                    />
                                )}
                            />
                            {/* TODO: Make this a data array to load forms */}

                            <Controller
                                name="company_login"
                                control={control}
                                rules={{ required: true }}
                                render={({ field, fieldState }) => (
                                    <TextField 
                                        {...field}
                                        fieldState={fieldState}
                                        label={__("Company login", "simplybook")}
                                        setting="company_login"
                                        type="text"
                                        placeholder={__("Company login", "simplybook")}
                                    />
                                )}
                            />
            
                            <Controller
                                name="user_login"
                                control={control}
                                rules={{ required: true }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        fieldState={fieldState}
                                        label={__("Email", "simplybook")}
                                        setting="email"
                                        type="email"
                                        placeholder={__("Email", "simplybook")}
                                    />
                                )}
                            />
                            
                            <Controller
                                name="user_password"
                                control={control}
                                rules={{ required: true }}
                                render={({ field, fieldState }) => (
                                    <TextField 
                                        {...field}
                                        fieldState={fieldState}
                                        label={__("Password", "simplybook")}
                                        setting="password"
                                        type="password"
                                        placeholder={__("Password", "simplybook")}
                                    />
                                )}
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
                                disabled={setDisabled}
                            >
                                Submit
                            </ButtonInput>
                            <ButtonInput 
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
                        <h2 className="my-4">{__("2FA authentication", "simplybook")}</h2>
                        <small>{__("Please use your 2FA provider to sign in.", "simplybook")}</small>
                    </div>  
                    <form className="flex flex-col " onSubmit={handle2faSubmit}>
                        {twoFaProviders.length > 1 ? (
                            <Controller
                                name="two_fa_type"
                                control={control2fa}
                                rules={{ required: true }}
                                defaultValue={twoFaProviders[0]}
                                render={({ field, fieldState }) => (
                                    <SelectField
                                        {...field}
                                        fieldState={fieldState}
                                        className="relative z-999"
                                        label={__("Select 2FA provider", "simplybook")} 
                                        setting="two_fa_type"
                                        options={selectedProvider}
                                        value={selectedProvider}
                                        onChange={(e) => {
                                            handleProviderChange(e);
                                            field.onChange(e);
                                        }}
                                    />
                                )}
                            />
                        ) : (
                            <input type={"hidden"} name={"two_fa_type"} value={twoFaProviders[0]} />
                        )}
                    
                        <div className={"two_fa_type_wrapper flex flex-col"}>
                            <Controller
                                name="two_fa_code"
                                control={control2fa}
                                rules={{ required: true }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        fieldState={fieldState}
                                        className="mb-4"                      
                                        label={__("Enter 2FA authentication code", "simplybook")}
                                        setting="two_fa_code"
                                        type="text"
                                        placeholder={__("Enter code", "simplybook")}
                                        value={twoFaCode}
                                        onChange={(e) => {
                                            setTwoFaCode(e.target.value);
                                            field.onChange(e);
                                        }}
                                    />
                                )}
                            />

                            {selectedProvider === 'sms' && 
                                <button type="button" onClick={requestSms}>
                                    {__("Request SMS", "simplybook")}
                                </button>
                            }

                            <div className={"two_fa_button_wrapper flex flex-col"}>
                                {/* TODO: Create validation with error message 
                                {error && (
                                    <Error 
                                        errorHeading={__("The code is incorrect", "simplybook")}
                                    />
                                )} */}
                                <ButtonInput 
                                    className="mt-4 mb-4"
                                    btnVariant="primary"
                                    type="submit"
                                    disabled={setDisabled2FA}
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

                    </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default SignInModal;