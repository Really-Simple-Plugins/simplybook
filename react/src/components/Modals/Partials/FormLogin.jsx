import { useState } from "react";
import { __ } from "@wordpress/i18n";
import { useForm, Controller, set } from "react-hook-form";
import TextField from "../../Fields/TextField";
import SelectField from "../../Fields/SelectField";
import ButtonInput from "../../Inputs/ButtonInput";

// API IMPORTS
import apiFetch from "@wordpress/api-fetch";
import glue from "../../../api/helpers/glue";
import { API_BASE_PATH, NONCE, SIMPLYBOOK_DOMAINS } from "../../../api/config";
import Error from "../../Errors/Error";

const formLogin = ({
   onClose,
   setRequire2fa,
   setAuthSessionId,
   setCompanyLogin,
   setUserLogin,
   setTwoFaProviders,
   setDomain,
   domain,
}) => {

    /**
     * We use React Hook Form to handle client-side validation for the main login
     */
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch
    } = useForm({
        mode: "onChange",
        defaultValues: {
            company_domain: domain,
            company_login: "",
            user_login: "",
            user_password: ""
        }
    });

    // Update how we watch the fields
    const watchFields = watch(["company_domain", "company_login", "user_login", "user_password"]);

    // Set the button disabled state
    const isDisabled = (
        watchFields.every((field) => field && field.trim() !== "") === false
    );

    /**
     * Sends the filled in form data to the api to log the user
     */
    const submitForm = handleSubmit((data) => {
        const formData = {
            company_domain: domain,
            company_login: data?.company_login,
            user_login: data?.user_login,
            user_password: data?.user_password
        };

        logUserIn(formData);
    });


    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Checks if the filled input credentials comply and sends an API call to SimplyBook
     */
    const logUserIn = async (formData) => {
        try {
            let path = API_BASE_PATH + "onboarding/auth" + glue() + "&token=" + Math.random().toString(36).substring(2, 7);
            let data = { ...formData, nonce: NONCE };

            let request = await apiFetch({
                path,
                method: "POST",
                data
            });

            if (request?.data && ('require2fa' in request.data) && (request.data.require2fa === true)) {

                setAuthSessionId(request.data.auth_session_id);
                setCompanyLogin(request.data.company_login);
                setUserLogin(request.data.user_login);
                setDomain(request.data.domain);
                setTwoFaProviders(request.data.allowed2fa_providers);

                setRequire2fa(true);

                return;
            }

            window.location.assign(simplybook.dashboard_url);

        } catch (error) {
            setErrorMessage((error?.message ?? __('An unknown error occurred, please try again.', 'simplybook')));
            console.error('SimplyBook.me API error: ' + error?.data?.response_message);
            console.log(error); // Still log the full error
        }
    };

    return (
        <>
            <form className="flex flex-col relative" onSubmit={submitForm}>
                <Controller
                    name="company_domain"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <SelectField
                            {...field}
                            fieldState={fieldState}
                            label={__("Company domain", "simplybook")}
                            setting={{id: "company_domain"}}
                            options={[...SIMPLYBOOK_DOMAINS, { label: "Other", value: "Other" }]}
                            value={field.value} // Bind the value to the field value
                            onChange={(e) => {
                                const selectedValue = e.target.value; // Get the selected value
                                setDomain(selectedValue); // Update local state
                                field.onChange(selectedValue); // Update form state
                            }}
                        />
                    )}
                />
                <Controller
                    name="company_login"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            fieldState={fieldState}
                            label={__("Company login", "simplybook")}
                            setting={{id: "company_login"}}
                            type="text"
                            placeholder={__("Company login", "simplybook")}
                            onChange={(e) => {
                                if (errorMessage !== "") {
                                    setErrorMessage("");
                                }
                                field.onChange(e);
                            }}
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
                            label={__("User login or email", "simplybook")}
                            setting={{id: "user_login"}}
                            type="text"
                            placeholder={__("User login or email", "simplybook")}
                            onChange={(e) => {
                                if (errorMessage !== "") {
                                    setErrorMessage("");
                                }
                              field.onChange(e);
                            }}
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
                            setting={{id: "password"}}
                            type="password"
                            placeholder={__("Password", "simplybook")}
                            onChange={(e) => {
                                if (errorMessage !== "") {
                                    setErrorMessage("");
                                }
                                field.onChange(e);
                            }}
                        />
                    )}
                />
                {errorMessage &&
                    <Error
                        errorHeading={__("Something went wrong", "simplybook")}
                        error={errorMessage}
                    />
                }
                <ButtonInput
                    className="mt-4 mb-4"
                    btnVariant="secondary"
                    type="submit"
                    disabled={false}
                >
                    {__("Submit", "simplybook")}
                </ButtonInput>
                <ButtonInput
                    btnVariant="tertiary"
                    type="button"
                    onClick={onClose}
                >
                    {__("Close", "simplybook")}
                </ButtonInput>
            </form>
        </>
    );
}

export default formLogin;