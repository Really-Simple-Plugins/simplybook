import {useEffect} from "react";
import { __, sprintf } from "@wordpress/i18n";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useSettingsData from "./useSettingsData";
import { useState } from "react";
import HttpClient from "../api/requests/HttpClient";

const useOnboardingData = () => {
    const { getValue } = useSettingsData();
    const [apiError, setApiError] = useState("");
    const queryClient = useQueryClient();
    const { settings } = useSettingsData();

    const httpClient = new HttpClient();

    // Fallback countries
    let mappedCountries = {
        NL: "Netherlands",
        DE: "Germany",
        AT: "Austria",
        BE: "Belgium",
    }

    if (simplybook?.simplybook_countries) {
        mappedCountries = Object.entries(simplybook.simplybook_countries).reduce((acc, [code, name]) => {
            acc[code] = name;
            return acc;
        }, {});
    }

    /**
     * Method should be used the moment a user selects "Do it yourself" option
     * in the implementation step. It will finish the onboarding process
     * and set the onboardingCompleted flag to true.
     */
    const handleManualImplementation = async (data) => {
        try {
            await httpClient.setRoute('onboarding/finish_onboarding').setPayload(data).post();
        } catch (error) {
            setApiError(error.message || __("An error occurred while finishing the onboarding.", "simplybook"));
            return false;
        }

        updateOnboardingCompleted(true);
        setApiError('');
        return true;
    }

    /**
     * Method should be used the moment a user selects "Generate page" option
     * in the implementation step. It will check if the calendar page URL
     * is available and if it is, it will generate the pages.
     */
    const handleGeneratePagesImplementationChoice = async (data) => {
        if (!data?.calendarPageUrl) {
            setApiError(__('Please enter a valid calendar page URL', 'simplybook'));
            return false;
        }

        if (!data?.calendarPageAvailable) {
            setApiError(__('This calendar page URL is taken. Please choose another one.', 'simplybook'));
            return false;
        }

        // User selected "generated" implementation or did not change
        // the default value
        const payload = {
            calendarPageUrl: data.calendarPageUrl,
        };

        try {
            await httpClient.setRoute('onboarding/generate_pages').setPayload(payload).post();
        } catch (error) {
            setApiError(error.message || __("An error occurred while generating pages.", "simplybook"));
            return false;
        }

        updateOnboardingCompleted(true);
        setApiError('');
        return true;
    }

    const steps = [
        {
            id: 1,
            path: "/onboarding/create-your-account",
            fields: [
                {
                    id: "email",
                    type: "text",
                    label: __("Email address", "simplybook"),
                    required: true,
                    default: simplybook?.user_email || "",
                    validation: {
                        regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                        message: __("Please enter a valid email address", "simplybook"),
                    },
                },
                {
                    required: true,
                    id: "terms-and-conditions",
                    type: "checkbox",
                    default: true,
                    label: sprintf(
                        __("I agree to the %sterms and conditions%s", "simplybook"),
                        '<a href="https://simplybook.me/terms-and-conditions" target="_blank">',
                        "</a>"
                    ),
                },
                {
                    id: "marketing-consent",
                    type: "checkbox",
                    default: true,
                    label: sprintf(
                        __("I wish to receive communications about news and/or promotions from %sSimplyBook.me%s. Learn more", "simplybook"),
                        '<a href="https://simplybook.me/en/policy#direct-marketing" target="_blank">',
                        "</a>"
                    ),
                },
            ],
            beforeSubmit: async (data) => {
                try {
                    await httpClient.setRoute('onboarding/register_email').setPayload(data).post();
                } catch (error) {
                    setApiError(error.message || __("An error occurred while registering the email.", "simplybook"));
                    return false;
                }

                setApiError('');
                return true;
            },
        },
        {
            id: 2,
            path: "/onboarding/information-check",
            fields: [
                {
                    id: "company_name",
                    type: "text",
                    label: "Company name",
                    required: true,
                },
                {
                    id: "category",
                    type: "select",
                    style: "inline",
                    required: true,
                    inline_group: true,
                    label: __("Business category", "simplybook"),
                    options: [
                        { value: "3", label: __("Beauty and wellness", "simplybook") },
                        { value: "43", label: __("Sport and fitness", "simplybook") },
                        {
                            value: "5",
                            label: __("Personal meetings and services", "simplybook"),
                        },
                        { value: "1", label: __("Medical", "simplybook") },
                        { value: "4", label: __("Events and entertainment", "simplybook") },
                        { value: "6", label: __("Education", "simplybook") },
                        { value: "75", label: __("Retailers", "simplybook") },
                        { value: "7", label: __("Officials", "simplybook") },
                        { value: "8", label: __("Other category", "simplybook") },
                    ],
                },
                {
                    id: "service",
                    type: "text",
                    style: "inline",
                    label: __("What service do you provide?", "simplybook"),
                    required: true,
                },
                {
                    id: "phone",
                    type: "text",
                    style: "inline",
                    label: __("Phone", "simplybook"),
                    validation: {
                        regex: ["^[0-9\\s().\\-+]+$"],
                        message: __("Please enter a valid phone number", "simplybook"),
                    },
                    required: true,
                },
                {
                    id: "address",
                    type: "text",
                    style: "inline",
                    label: __("Address", "simplybook"),
                    required: true,
                },
                {
                    id: "zip",
                    type: "text",
                    style: "inline",
                    label: __("Postal Code", "simplybook"),
                    required: true,
                },
                {
                    id: "city",
                    type: "text",
                    style: "inline",
                    label: __("City", "simplybook"),
                    required: true,
                },
                {
                    id: "country",
                    type: "select",
                    label: __("Country", "simplybook"),
                    options: mappedCountries,
                    required: true,
                },
            ],
            beforeSubmit: async (data) => {
                try {
                    await httpClient.setRoute('onboarding/company_registration').setPayload(data).post();
                } catch (error) {
                    setApiError(error.message || __("An error occurred while registering your company. Please try again.", "simplybook"));
                    return false;
                }

                setApiError('');
                return true;
            },
        },
        {
            id: 3,
            path: "/onboarding/confirm-email",
            fields: [
                {
                    id: "confirmation-code",
                    type: "text",
                    label: __("Confirmation Code", "simplybook"),
                    required: true,
                },
            ],
            beforeSubmit: async (data) => {
                try {
                    await httpClient.setRoute('onboarding/confirm_email').setPayload(data).post();
                } catch (error) {
                    setApiError(error.message || __("An error occurred while confirming your email. Please try again.", "simplybook"));
                    return false;
                }

                setApiError('');
                return true;
            },
        },
        {
            id: 4,
            path: "/onboarding/style-widget",
            beforeSubmit: async (data) => {
                try {
                    await httpClient.setRoute('onboarding/save_widget_style').setPayload({
                        primary_color: data.primary_color,
                        secondary_color: data.secondary_color,
                        active_color: data.active_color,
                    }).post();
                } catch (error) {
                    setApiError(error.message || __("An error occurred while saving the styles.", "simplybook"));
                    return false;
                }

                setApiError('');
                return true;
            },
            fields: [], // On purpose. All fields are in style-widget.lazy.jsx
        },
        {
            id: 5,
            path: "/onboarding/implementation",
            fields: [
                {
                    id: "implementation",
                    type: "implementation",
                    label: "",
                    default: "generated",
                    save_on_change: true,
                    options: [
                        {
                            value: "generated",
                            label: __("Simple", "simplybook"),
                            description: __("Generate page", "simplybook"),
                        },
                        {
                            value: "manual",
                            label: __("Shortcode", "simplybook"),
                            description: __("Do it yourself", "simplybook"),
                        },
                    ],
                },
            ],
            beforeSubmit: async (data) => {
                if (getValue("implementation") === "manual") {
                    return handleManualImplementation(data);
                }
                return handleGeneratePagesImplementationChoice(data);
            },
        },
    ];

    // Create initial data object with defaults
    const initialData = {};
    steps.forEach((step) => {
        step.fields.forEach((field) => {
            initialData[field.id] = (field.default !== undefined ? field.default : "");
        });
    });

    // Prefill with settings data
    let prefilledData = {};
    settings?.forEach((setting) => {
        if (setting.id in initialData) {
            prefilledData[setting.id] = setting.value;
        }
    });

    const query = useQuery({
        queryKey: ["onboarding_data"],
        initialData: {
            ...initialData,
            ...prefilledData,
            onboardingCompleted: simplybook.is_onboarding_completed, // Include onboardingCompleted
            // calendarPageNameAvailable: calendarPageNameAvailable,
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Mutation for updating data
    const { mutate: updateData } = useMutation({
        mutationFn: async (newData) => {
            queryClient.setQueryData(["onboarding_data"], (oldData) => ({
                ...oldData,
                ...newData,
            }));
            queryClient.invalidateQueries(["onboarding_data"]);
        },
    });

    const { mutate: updateOnboardingCompleted } = useMutation({
        mutationFn: async (completed) => {
            queryClient.setQueryData(["onboarding_data"], (oldData) => ({
                ...oldData,
                onboardingCompleted: completed,
            }));
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["onboarding_data"]);
        },
    });

    useEffect(() => {
        setApiError('');
    }, [getValue('implementation')]);

    return {
        steps,
        data: query.data,
        defaultData: initialData,
        updateData,
        getCurrentStepId: (path) => steps.find((step) => step.path === path)?.id,
        getCurrentStep: (path) => steps.find((step) => step.path === path),
        getURLForStep: (step) => steps[step - 1]?.path,
        isLastStep: (path) =>
            steps.length === steps.find((step) => step.path === path)?.id,
        recaptchaToken: query.data?.recaptchaToken || "",
        setRecaptchaToken: (token) => updateData({ recaptchaToken: token }),
        onboardingCompleted: query.data?.onboardingCompleted || false, // Use query data
        setOnboardingCompleted: (value) => updateOnboardingCompleted(value), // Use mutation
        // userSetCalendarPageUrl: (pageUrl) => handleCalendarPageUrlChange(pageUrl),
        // calendarPageUrl,
        // calendarPageNameAvailable,
        apiError,
        setApiError,
        // checkAvailability,
    };
};

export default useOnboardingData;