import { useState } from "react";
import { ReactComponent as Logo } from "../../../../assets/img/logo.svg";
import {__} from "@wordpress/i18n";

import FormTwoFa from "./Partials/FormTwoFa";
import FormLogin from "./Partials/FormLogin";

const SignInModal = ({onClose}) => {

    const [require2fa, set2fa] = useState(false);
    const [authSessionId, setAuthSessionId] = useState("");
    const [companyLogin, setCompanyLogin] = useState("");
    const [userLogin, setUserLogin] = useState("");
    const [domain, setDomain] = useState("default:simplybook.it");
    const [twoFaProviders, setTwoFaProviders] = useState({ga: __("Google Authenticator", "simplybook")});

    return (
        <div className="signin-modal-bg fixed z-999 inset-0 flex items-center justify-center bg-black/50 border-2 border-gray-200 ">
            <div className="signin-modal mt-8 w-3/8 bg-white p-4 px-4 rounded border-3 border-gray-200 max-h-[90vh] overflow-y-scroll">
                {!require2fa ? (
                    <FormLogin
                        onClose={onClose}
                        setRequire2fa={set2fa}
                        setAuthSessionId={setAuthSessionId}
                        setCompanyLogin={setCompanyLogin}
                        setUserLogin={setUserLogin}
                        setTwoFaProviders={setTwoFaProviders}
                        setDomain={setDomain}
                        domain={domain}
                    />
                ) : (
                    <FormTwoFa
                        authSessionId={authSessionId}
                        companyLogin={companyLogin}
                        userLogin={userLogin}
                        domain={domain}
                        twoFaProviders={twoFaProviders}
                        onClose={onClose}
                    />
                )}
            </div>
        </div>
    );
}

export default SignInModal;