import {useCallback, useEffect} from "react";
import debounce from "lodash.debounce"; // You can use lodash's debounce function
import { __ } from "@wordpress/i18n";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import registerEmail from "../api/endpoints/onBoarding/registerEmail";
import registerCompany from "../api/endpoints/onBoarding/registerCompany";
import confirmEmail from "../api/endpoints/onBoarding/confirmEmail";
import useSettingsData from "./useSettingsData";
import { useState } from "react";
import generatePages from "../api/endpoints/onBoarding/generatePages";
import isPageTitleAvailable from "../api/endpoints/onBoarding/isPageTitleAvailable";
import finishOnboarding from "../api/endpoints/onBoarding/finishOnboarding";

const useOnboardingData = () => {
    const { getValue } = useSettingsData();
    const [calendarPageNameAvailable, setCalendarPageNameAvailable] = useState(false);
    const [bookingPageNameAvailable, setBookingPageNameAvailable] = useState(false);

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
                    label: __("I agree to the terms and conditions", "simplybook"),
                },
            ],
            beforeSubmit: async (data) => {
                let response = await registerEmail({ data });
                if (response.status !== "success") {
                    setApiError(response.message);
                    return false;
                }
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
                        regex: "^\\+?[0-9\\s\\-().]+$",
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
                console.log("submit information check step");
                console.log(data);
                let response = await registerCompany({ data });
                console.log("registercompany response ", response);
                if (response.status !== "success") {
                    console.log("setting api error to ", response.message);
                    setApiError(response.message);
                    return false;
                }
                setApiError("");
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
                let response = await confirmEmail({ data });
                if (response.status !== "success") {
                    setApiError(response.message);
                    return false;
                }
                setApiError("");
                return true;
            },
        },
        {
            id: 4,
            path: "/onboarding/style-widget",
            fields: [
                {
                    id: "sb_base_color",
                    type: "colorpicker",
                    label: __("Primary", "simplybook"),
                    default: "#DD3649",
                    inline_group: "widget",
                    save_on_change: true,
                    mapping: [
                        "btn_color_1",
                        "sb_company_label_color",
                        "booking_nav_bg_color",
                    ],
                },
                {
                    id: "sb_busy",
                    type: "colorpicker",
                    label: __("Secondary", "simplybook"),
                    default: "#DD3649",
                    inline_group: "widget",
                    save_on_change: true,
                },
                {
                    id: "sb_available",
                    type: "colorpicker",
                    label: __("Active", "simplybook"),
                    default: "#DD3649",
                    inline_group: "widget",
                    save_on_change: true,
                },
            ],
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
                            description: __("Generate pages", "simplybook"),
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
                if (getValue("implementation") === "generated") {
                    const data = {
                        bookingPageUrl: bookingPageUrl,
                        calendarPageUrl: calendarPageUrl,
                    };
                    let response = await generatePages({ data });
                    return (response.status === "success");
                }

                if (getValue("implementation") === "manual") {
                    let finished = await finishOnboarding({data});
                    return (finished.status === "success");
                }

                return false;
            },
        },
    ];
    const [bookingPageUrl, setBookingPageUrl] = useState(
        simplybook.site_url + "/" + __("my-booking", "simplybook"),
    );
    const [calendarPageUrl, setCalendarPageUrl] = useState(
        simplybook.site_url + "/" + __("calendar", "simplybook"),
    );
    const [apiError, setApiError] = useState("");
    const queryClient = useQueryClient();
    const { settings } = useSettingsData();

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

    const debouncedSetBookingPageName = useCallback(
        debounce(async (pageName) =>
            setBookingPageNameAvailable(
                await checkPageTitleAvailability(pageName)
            ), 500), // 500ms delay
        [],
    );

    const debouncedSetCalendarPageName = useCallback(
        debounce(async (pageName) =>
            setCalendarPageNameAvailable(
                await checkPageTitleAvailability(pageName)
            ), 500), // 500ms delay
        [],
    );

    const checkPageTitleAvailability = async (pageName) => {
        const response = await isPageTitleAvailable({
            data: { url: pageName },
        });
        return response.status === "success";
    }

    const handleBookingPageNameChange = (pageName) => {
        setBookingPageUrl(pageName);
        debouncedSetBookingPageName(pageName);
    };

    const handleCalendarPageNameChange = (pageName) => {
        setCalendarPageUrl(pageName);
        debouncedSetCalendarPageName(pageName);
    };

    useEffect(() => {
        const checkAvailability = async () => {
            if (simplybook.is_onboarding_completed) return;

            setCalendarPageNameAvailable(await checkPageTitleAvailability(calendarPageUrl));
            setBookingPageNameAvailable(await checkPageTitleAvailability(bookingPageUrl));
        };

        checkAvailability();
    }, []);

    const query = useQuery({
        queryKey: ["onboarding_data"],
        initialData: {
            ...initialData,
            ...prefilledData,
            onboardingCompleted: simplybook.is_onboarding_completed, // Include onboardingCompleted
            calendarPageNameAvailable: calendarPageNameAvailable,
            bookingPageNameAvailable: bookingPageNameAvailable,
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
        recaptchaToken: query.data?.recaptchaToken || "",
        setRecaptchaToken: (token) => updateData({ recaptchaToken: token }),
        onboardingCompleted: query.data?.onboardingCompleted || false, // Use query data
        setOnboardingCompleted: (value) => updateOnboardingCompleted(value), // Use mutation
        setBookingPageName: (pageName) => handleBookingPageNameChange(pageName),
        setCalendarPageName: (pageName) => handleCalendarPageNameChange(pageName),
        bookingPageName: bookingPageUrl,
        calendarPageName: calendarPageUrl,
        calendarPageNameAvailable: calendarPageNameAvailable,
        bookingPageNameAvailable: bookingPageNameAvailable,
        apiError,
        setApiError,
    };
};

export default useOnboardingData;