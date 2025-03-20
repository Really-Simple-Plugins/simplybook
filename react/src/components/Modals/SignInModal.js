import React, {useState} from "react";
import {__} from "@wordpress/i18n";
import request from "../../api/requests/request";

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

    const knownProviders = {
        'ga': __('Google Authenticator', 'simplybook'),
        'sms': __('SMS', 'simplybook'),
    };

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

    const handleProviderChange = (e) => {
        setSelectedProvider(e.target.value);
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

                        {twoFaProviders.length > 1 ? (
                            <React.Fragment>
                                <label>{__("Select 2FA provider", "simplybook")}</label>
                                <select name={"two_fa_type"} onChange={handleProviderChange} value={selectedProvider}>
                                    {twoFaProviders.map((provider) => (
                                        <option key={provider} value={provider}>{knownProviders[provider]}</option>
                                    ))}
                                </select>
                            </React.Fragment>
                        ) : (
                            <input type={"hidden"} name={"two_fa_type"} value={twoFaProviders[0]} />
                        )}

                        {twoFaProviders.map((provider) => (
                            <div className={"two_fa_type_wrapper"} data-provider={provider} style={{ display: provider === selectedProvider ? "block" : "none" }} key={provider}>
                                <label>{knownProviders[provider]}</label>
                            </div>
                        ))}

                        <input type="text" name={"two_fa_code"} placeholder={__("Enter code", "simplybook")} value={twoFaCode} onChange={(e) => setTwoFaCode(e.target.value)} />
                        {selectedProvider === 'sms' && <button type="button" onClick={requestSms}>{__("Request SMS", "simplybook")}</button>}
                        <button type="submit">{__("Submit", "simplybook")}</button>
                        <button type="button" onClick={onClose}>{__("Close", "simplybook")}</button>

                    </form>
                )}
            </div>
        </div>
    );
}

export default SignInModal;