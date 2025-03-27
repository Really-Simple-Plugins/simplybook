import { useState } from "react";
import { __ } from "@wordpress/i18n";
import { useForm, Controller, set } from "react-hook-form";
import TextField from "../../Fields/TextField";
import SelectField from "../../Fields/SelectField";
import ButtonInput from "../../Inputs/ButtonInput";

// API IMPORTS 
import apiFetch from "@wordpress/api-fetch";
import glue from "../../../api/helpers/glue";
import { API_BASE_PATH, NONCE } from "../../../api/config";
import request from "../../../api/requests/request";

const formLogin = ({
    onClose,
    setRequire2fa
}) => {
        /**
         * Initialise constants
        */
        const [twoFaProviders, setTwoFaProviders] = useState({ga: __("Google Authenticator", "simplybook")});
        const [authSessionId, setAuthSessionId] = useState(null);
        const [companyLogin, setCompanyLogin] = useState(null);
        const [userLogin, setUserLogin] = useState(null);
        const [domain, setDomain] = useState("default:simplybook.it");
        const [selectedDomain, setSelectedDomain] = useState("default:simplybook.it");

        /**
         * We use React Hook Form to handle client-side validation for the main login
        */
        const { control, register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
            mode: "onChange",
            defaultValues: {
                company_domain: selectedDomain,
                company_login: "",
                user_login: "",
                user_password: ""
            }
        });
    
        // Update how we watch the fields
        const watchFields = watch(["company_domain", "company_login", "user_login", "user_password"]);
      
        /**
         * CHeck if the fields are empty, only when all are filled the button becomes enabled
         */
        const isFormFilled = watchFields.every((field) => field && field.trim() !== "");
       
    
        /**
         * Set the button disabled state
         */
        const setDisabled = !isFormFilled ? true : false;

        /**
             * Sends the filled in form data to the api to log the user
             * 
             * @param {event} e 
             */
        const submitForm = handleSubmit((data) => {
            const formData = {
                company_domain: selectedDomain,
                company_login: data?.company_login,
                user_login: data?.user_login,
                user_password: data?.user_password
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
            try {
                let path = API_BASE_PATH + "onboarding/auth" + glue() + "&token=" + Math.random().toString(36).substring(2, 7);
                let data = { ...formData, nonce: NONCE };

                let response = await apiFetch({
                    path,
                    method: "POST",
                    data
                });

                if (response.data && ('require2fa' in response.data) && (response.data.require2fa === true)) {

                    setAuthSessionId(response.data.auth_session_id);
                    setCompanyLogin(response.data.company_login);
                    setUserLogin(response.data.user_login);
                    setDomain(response.data.domain);
                    setTwoFaProviders(response.data.allowed2fa_providers);

                    setRequire2fa(true);

                    return;
                }

                window.location.href = "/wp-admin/admin.php?page=simplybook";

            } catch (error) {
                console.error(error);
            }
        };

        /**
         * 
         * Initialise the different domain URL's
         */
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
            { key: "default:wp.simplybook.ovh", value: "default:wp.simplybook.ovh", label: "wp.simplybook.ovh" }
    
        ];

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
                            setting="company_domain"
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
                <Controller
                    name="company_login"
                    control={control}
                    rules={{ required: "Login needed" }}
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
                <ButtonInput 
                    className="mt-4 mb-4"
                    btnVariant="primary"
                    type="submit"
                    disabled={setDisabled}
                >
                    {__("Submit", "simplybook")}
                </ButtonInput>
                <ButtonInput 
                    btnVariant="secondary"
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