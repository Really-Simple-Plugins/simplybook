import { __, sprintf } from "@wordpress/i18n";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useSettingsData from "./useSettingsData";
import { useState } from "react";
import HttpClient from "../api/requests/HttpClient";

const useOnboardingData = () => {
    const [apiError, setApiError] = useState("");
    const queryClient = useQueryClient();
    const { settings } = useSettingsData();

    const httpClient = new HttpClient();

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
                    validation: {
                        regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                        message: __("Please enter a valid email address", "simplybook"),
                    },
                },
                {
                    required: true,
                    id: "terms-and-conditions",
                    type: "checkbox",
                    label: sprintf(
                        __("I agree to the %sterms and conditions%s", "simplybook"),
                        '<a href="https://simplybook.me/terms-and-conditions" target="_blank">',
                        "</a>"
                    ),
                },
            ],
            beforeSubmit: async (data) => {
                try {
                    // Register email and trigger company registration
                    await httpClient.setRoute('onboarding/register_email').setPayload(data).post();
                    await httpClient.setRoute('onboarding/company_registration').setPayload(data).post();

                    // Poll for callback completion (max 30 seconds)
                    for (let i = 0; i < 15; i++) {
                        const response = await httpClient.setRoute('check_registration_callback_status').setPayload({_poll: true}).post();
                        if (response?.data?.status === 'completed') {
                            setApiError('');
                            return true;
                        }
                        if (response?.data?.status === 'failed') {
                            setApiError(response.data.message || __("Registration failed. Please try again.", "simplybook"));
                            return false;
                        }
                        await new Promise(r => setTimeout(r, 2000)); // Wait 2 seconds between polls
                    }

                    // Timeout - registration didn't complete in time
                    setApiError(__("Registration is taking longer than expected. Please refresh and try again.", "simplybook"));
                    return false;
                } catch (error) {
                    setApiError(error.message || __("An error occurred while registering.", "simplybook"));
                    return false;
                }
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
                    await httpClient.setRoute('onboarding/finish_onboarding').setPayload({}).post();
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

    // Create initial data object
    const initialData = {};
    steps.forEach((step) => {
        step.fields.forEach((field) => {
            initialData[field.id] = "";
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