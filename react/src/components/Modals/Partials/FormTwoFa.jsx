import {useState} from "react";
import {__} from "@wordpress/i18n";
import {useForm, Controller} from "react-hook-form";
import TextField from "../../Fields/TextField";
import ButtonInput from "../../Inputs/ButtonInput";
import request from "../../../api/requests/request";
import SelectField from "../../Fields/SelectField";
import { ReactComponent as Logo } from "../../../../../assets/img/logo.svg";

// API IMPORTS
import Error from "../../Errors/Error";

const FormTwoFa = ({authSessionId, companyLogin, userLogin, domain, twoFaProviders, onClose}) => {

    const firstProvider = Object.keys(twoFaProviders)[0];
    const [twoFaCode, setTwoFaCode] = useState("");
    const [selectedProvider, setSelectedProvider] = useState(firstProvider);
    const [smsRequested, setSmsRequested] = useState(false); // Default is false
    const [errorMessage, setErrorMessage] = useState("");

    // Create a useForm instance for the 2FA field
    const {
        control: control2fa,
        handleSubmit: handleSubmit2fa,
        watch: watch2fa,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            two_fa_code: "",
            two_fa_type: firstProvider,
        },
    });

    // Watch the 2FA fields
    const watch2faFields = watch2fa(["two_fa_code"]);

    // Set the 2FA button disabled state
    const setDisabled2FA = (watch2faFields.every((field) => field && field.trim() !== "",) === false);

    const handle2faSubmit = handleSubmit2fa(async (data) => {
        const response = await request("onboarding/auth_two_fa", "POST", {
            auth_session_id: authSessionId,
            company_login: companyLogin,
            user_login: userLogin,
            domain: domain,
            two_fa_code: data.two_fa_code,
            two_fa_type: data.two_fa_type,
        });

        switch (response?.status) {
            case "error":
                setErrorMessage((response?.message ?? __('An unknown error occurred, please try again.', 'simplybook')));
                console.error('SimplyBook.me API error: ' + response?.data?.response_message);
                console.log(response); // Still log the error
                break;
            case "success":
                console.log("2FA successful:", response);
                window.location.assign(simplybook.dashboard_url);
                break;
            default:
                setErrorMessage(__("An unknown error occurred. Please try again.", "simplybook"));
                break;
        }
    });

    const requestSms = async () => {
        const response = await request("onboarding/auth_send_sms", "POST", {
            auth_session_id: authSessionId,
            company_login: companyLogin,
            domain: domain,
        });
        switch (response?.status) {
            case "error":
                setErrorMessage((response?.message ?? __('An unknown error occurred, please try again.', 'simplybook')));
                console.error("Unable to request SMS:", response); // Still log the error
                break;
            case "success":
                setSmsRequested(true);
                console.log("SMS request successful:", response);
                break;
            default:
                setErrorMessage(__("An unknown error occurred. Please try again.", "simplybook"));
                break;
        }
    };

    const twoFaTitle = (selectedProvider) => {
        switch (selectedProvider) {
            case "email":
                return __("Email verification", "simplybook");
            default:
                return __("2FA authentication", "simplybook");
        }
    }

    const twoFaSubtitle = (selectedProvider) => {
        switch (selectedProvider) {
            case "email":
                return __("Fill in the code sent in the email", "simplybook");
            default:
                return __("Please use your 2FA provider to sign in.", "simplybook");
        }
    }

    return (
        <>
            <div className="flex flex-col items-center mb-8">
                <Logo className="mx-4 w-65 py-2 my-4" />
                <h2 className="my-4">{twoFaTitle(selectedProvider)}</h2>
                <small>{twoFaSubtitle(selectedProvider)}</small>
            </div>
            <form className="flex flex-col" onSubmit={handle2faSubmit}>
                {Object.keys(twoFaProviders).length > 1 ? (
                    <Controller
                        name="two_fa_type"
                        control={control2fa}
                        rules={{required: true}}
                        render={({field, fieldState}) => (
                            <SelectField
                                {...field}
                                fieldState={fieldState}
                                label={__("Select 2FA provider", "simplybook")}
                                setting="two_fa_type"
                                options={twoFaProviders}
                                value={selectedProvider}
                                onChange={(e) => {
                                    setSelectedProvider(e.target.value);
                                    field.onChange(e);
                                }}
                            />
                        )}
                    />
                ) : (
                    <input type={"hidden"} name={"two_fa_type"} value={firstProvider}/>
                )}
                <div className={"two_fa_type_wrapper flex flex-col"}>
                    <Controller
                        name="two_fa_code"
                        control={control2fa}
                        rules={{required: true}}
                        render={({field, fieldState}) => (
                            <TextField
                                {...field}
                                fieldState={fieldState}
                                className="mb-4"
                                label={__("Enter authentication code", "simplybook")}
                                setting="two_fa_code"
                                type="text"
                                placeholder={__("Enter code", "simplybook")}
                                value={twoFaCode}
                                onChange={(e) => {
                                    // removes error message once user starts typing new code so if there's another failed attempt the user will get feedback again
                                    if (errorMessage !== "") {
                                        setErrorMessage("");
                                    }
                                    setTwoFaCode(e.target.value);
                                    field.onChange(e);
                                }}
                            />
                        )}
                    />
                    {selectedProvider === "sms" && (
                        <ButtonInput
                            className="mt-4 mb-4"
                            btnVariant="primary"
                            type="button"
                            onClick={requestSms}
                            disabled={setDisabled2FA || smsRequested}
                        >
                            {smsRequested ? __("SMS Requested", "simplybook") : __("Request SMS", "simplybook")}
                        </ButtonInput>
                    )}
                    {errorMessage &&
                        <Error
                            errorHeading={__("Something went wrong", "simplybook")}
                            error={errorMessage}
                        />
                    }
                    <div className={"two_fa_button_wrapper flex flex-col"}>
                        <ButtonInput
                            className="mt-4 mb-4"
                            btnVariant="primary"
                            type="submit"
                            disabled={setDisabled2FA}
                        >
                            {__("Submit", "simplybook")}
                        </ButtonInput>
                        <ButtonInput
                            className=""
                            btnVariant="tertiary"
                            type="submit"
                            onClick={onClose}
                        >
                            {__("Close", "simplybook")}
                        </ButtonInput>
                    </div>
                </div>
            </form>
        </>
    );
};

export default FormTwoFa;