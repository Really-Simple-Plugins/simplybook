import { useCallback } from "react";
import debounce from "lodash.debounce"; // You can use lodash's debounce function
import { __ } from "@wordpress/i18n";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import registerEmail from "../api/endpoints/onBoarding/registerEmail";
import registerTipsTricks from "../api/endpoints/onBoarding/registerTipsTricks";
import registerCompany from "../api/endpoints/onBoarding/registerCompany";
import confirmEmail from "../api/endpoints/onBoarding/confirmEmail";
import useSettingsData from "./useSettingsData";
import { useState } from "react";
import generatePages from "../api/endpoints/onBoarding/generatePages";
import isPageTitleAvailable from "../api/endpoints/onBoarding/isPageTitleAvailable";

const useOnboardingData = () => {
  const { getValue } = useSettingsData();
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
        console.log("submit email step");
        let response = await registerEmail({ data });
        if (response.status !== "success") {
          console.log("setting api error to ", response.message);
          setApiError(response.message);
          return false;
        }
        console.log(data);
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
        },
        {
          id: "category",
          type: "select",
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
          label: __("What service do you provide?", "simplybook"),
        },
        {
          id: "phone",
          type: "text",
          label: __("Phone", "simplybook"),
          validation: {
            regex: "^\\+?[0-9\\s\\-().]+$",
            message: __("Please enter a valid phone number", "simplybook"),
          },
        },
        {
          id: "address",
          type: "text",
          label: __("Address", "simplybook"),
        },
        {
          id: "zip",
          type: "text",
          label: __("Postal Code", "simplybook"),
        },
        {
          id: "city",
          type: "text",
          label: __("City", "simplybook"),
        },
        {
          id: "country",
          type: "select",
          label: __("Country", "simplybook"),
          options: [
            { value: "NL", label: __("Netherlands", "simplybook") },
            { value: "DE", label: __("Germany", "simplybook") },
            { value: "BE", label: __("Belgium", "simplybook") },
            { value: "US", label: __("United States", "simplybook") },
          ],
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
        },
      ],
      beforeSubmit: async (data) => {
        if (!data.recaptchaToken) {
          console.log("missing recaptchatoken, cancel submit");
          return false;
        }
        console.log("found recaptcha token ", data.recaptchaToken);
        console.log("confirm email step");
        console.log(data);
        let response = await confirmEmail({ data });
        if (response.status !== "success") {
          console.log("setting api error to ", response.message);
          setApiError(response.message);
          return false;
        }
        setApiError("");
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
          // disabled: !localOnboardingCompleted,
        },
        {
          id: "sb_busy",
          type: "colorpicker",
          label: __("Secondary", "simplybook"),
          default: "#DD3649",
          inline_group: "widget",
          save_on_change: true,
          // disabled: !localOnboardingCompleted,
        },
        {
          id: "sb_available",
          type: "colorpicker",
          label: __("Active", "simplybook"),
          default: "#DD3649",
          inline_group: "widget",
          save_on_change: true,
          // disabled: !localOnboardingCompleted,
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
              label: __("Generated", "simplybook"),
              description: __("Generate pages.", "simplybook"),
            },
            {
              value: "manual",
              label: __("Shortcode", "simplybook"),
              description: __("Do it yourself", "simplybook"),
            },
            {
              value: "templates",
              label: __("Templates", "simplybook"),
              description: __("Premium", "simplybook"),
              is_premium: true,
            },
          ],
        },
      ],
      beforeSubmit: async (data) => {
        if (getValue("implementation") !== "manual") {
          console.log(
            "submit implementation step ",
            bookingPageUrl,
            calendarPageUrl,
          );
          const data = {
            bookingPageUrl: bookingPageUrl,
            calendarPageUrl: calendarPageUrl,
          };
          let response = await generatePages({ data });
          if (response.status !== "success") {
            return false;
          }
        }
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
  const query = useQuery({
    queryKey: ["onboarding_data"],
    initialData: {
      ...initialData,
      ...prefilledData,
      onboardingCompleted: simplybook.is_onboarding_completed, // Include onboardingCompleted
      calendarPageNameAvailable: true,
      bookingPageNameAvailable: true,
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

  const { mutate: updateCalendarPageNameAvailable } = useMutation({
    mutationFn: async () => {
      // Verify if the page title is available based on URL
      const response = await isPageTitleAvailable({
        data: { url: calendarPageUrl },
      });
      const isAvailable = response.status === "success";

      // Update the query data with the new page name and availability status
      queryClient.setQueryData(["onboarding_data"], (oldData) => ({
        ...oldData,
        calendarPageNameAvailable: isAvailable,
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["onboarding_data"]);
    },
  });
  const { mutate: updateBookingPageNameAvailable } = useMutation({
    mutationFn: async () => {
      // Verify if the page title is available based on URL
      const response = await isPageTitleAvailable({
        data: { url: bookingPageUrl },
      });
      const isAvailable = response.status === "success";
      // Simulate API update call if needed, otherwise update the cache directly
      queryClient.setQueryData(["onboarding_data"], (oldData) => ({
        ...oldData,
        bookingPageNameAvailable: isAvailable,
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["onboarding_data"]);
    },
  });

  const debouncedSetBookingPageName = useCallback(
    debounce((pageName) => updateBookingPageNameAvailable(pageName), 500), // 500ms delay
    [],
  );

  const handleBookingPageNameChange = (pageName) => {
    setBookingPageUrl(pageName);
    debouncedSetBookingPageName(pageName);
  };

  const debouncedSetCalendarPageName = useCallback(
    debounce((pageName) => updateCalendarPageNameAvailable(pageName), 500), // 500ms delay
    [],
  );

  const handleCalendarPageNameChange = (pageName) => {
    setCalendarPageUrl(pageName);
    debouncedSetCalendarPageName(pageName);
  };

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
    calendarPageNameAvailable: query.data?.calendarPageNameAvailable,
    bookingPageNameAvailable: query.data?.bookingPageNameAvailable,
    apiError,
    setApiError,
  };
};

export default useOnboardingData;