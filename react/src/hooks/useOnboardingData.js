import { __, sprintf } from "@wordpress/i18n";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useSettingsData from "./useSettingsData";
import { useState } from "react";
import HttpClient from "../api/requests/HttpClient";
import { RECAPTCHA_SITE_KEY } from "../api/config";

export { RECAPTCHA_SITE_KEY };

/**
 * Execute reCAPTCHA and get token
 */
const executeCaptcha = (siteKey) => {
    return new Promise((resolve, reject) => {
        if (!window.grecaptcha?.enterprise) {
            reject(new Error('reCAPTCHA not loaded'));
            return;
        }

        window.grecaptcha.enterprise.ready(async () => {
            try {
                const token = await window.grecaptcha.enterprise.execute(siteKey, { action: 'create_company' });
                resolve(token);
            } catch (error) {
                reject(error);
            }
        });
    });
};

const useOnboardingData = () => {
    const [apiError, setApiError] = useState("");
    const queryClient = useQueryClient();
    const { settings } = useSettingsData();

    const httpClient = new HttpClient();

    /**
     * Get captcha token if captcha is loaded, otherwise return empty string.
     * Returns false if captcha execution fails.
     */
    const getCaptchaToken = async () => {
        if (!window.grecaptcha?.enterprise) {
            return '';
        }

        try {
            const token = await executeCaptcha(RECAPTCHA_SITE_KEY);
            return token;
        } catch (captchaError) {
            setApiError(__("Captcha verification failed. Please try again.", "simplybook"));
            return false;
        }
    };

    /**
     * Submit the account registration request.
     */
    const submitAccountRegistration = async (data, captchaToken) => {
        try {
            await httpClient.setRoute('onboarding/create_account').setPayload({
                ...data,
                captcha_token: captchaToken,
            }).post();

            setApiError('');
            return true;
        } catch (error) {
            setApiError(error.message || __("An error occurred while registering.", "simplybook"));
            return false;
        }
    };

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
                        __("I wish to receive communications about news and/or promotions from %sSimplyBook.me%s", "simplybook"),
                        '<a href="https://simplybook.me/en/policy#direct-marketing" target="_blank">',
                        "</a>"
                    ),
                },
            ],
            beforeSubmit: async (data) => {
                const captchaToken = await getCaptchaToken();
                if (captchaToken === false) {
                    return false;
                }

                return await submitAccountRegistration(data, captchaToken);
            },
        },
        {
            id: 2,
            path: "/onboarding/style-widget",
            beforeSubmit: async (data) => {
                try {
                    await httpClient.setRoute('onboarding/save_widget_style').setPayload({
                        primary_color: data.primary_color,
                        secondary_color: data.secondary_color,
                        active_color: data.active_color,
                    }).post();

                    // Complete the onboarding
                    await httpClient.setRoute('onboarding/finish_onboarding').setPayload({ finish: true }).post();
                } catch (error) {
                    setApiError(error.message || __("An error occurred while saving the styles.", "simplybook"));
                    return false;
                }

                updateOnboardingCompleted(true);
                setApiError('');
                return true;
            },
            fields: [], // On purpose. All fields are in style-widget.lazy.jsx
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
        onboardingCompleted: query.data?.onboardingCompleted || false,
        setOnboardingCompleted: (value) => updateOnboardingCompleted(value),
        apiError,
        setApiError,
    };
};

export default useOnboardingData;