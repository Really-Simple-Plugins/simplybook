import { __ } from "@wordpress/i18n";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import registerEmail from "../api/endpoints/onBoarding/registerEmail";
import registerTipsTricks from "../api/endpoints/onBoarding/registerTipsTricks";
import registerCompany from "../api/endpoints/onBoarding/registerCompany";
import confirmEmail from "../api/endpoints/onBoarding/confirmEmail";
import useSettingsData from "./useSettingsData";


const steps = [
    {
      id: 1,
      path: "/onboarding/create-your-account",
      fields: [
        {
          id: "email",
          type: "text",
          label: __("Email", "simplybook"),
          required: true,
          value: "", //simplybook.company_data.email,
          validation: {
            regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            message: __("Please enter a valid email address", "simplybook"),
          },
          //   context: "This is a context",
          //   help: "This is a help",
        },
        {
          id: "terms-and-conditions",
          type: "checkbox",
          label: __("I agree to the terms and conditions", "simplybook"),
        },
      ],
      beforeSubmit: async (data) => {
        console.log("submit email step");
        await registerEmail({ data });
        console.log(data);
      },
    },
    {
      id: 2,
      path: "/onboarding/tips-and-tricks",
      fields: [
        {
          id: "tips-and-tricks",
          type: "checkbox",
        },
      ],
      beforeSubmit: async (data) => {
        console.log("submit tips and tricks step");
        await registerTipsTricks({ data });
      },
    },
    {
      id: 3,
      path: "/onboarding/information-check",
      fields: [
        {
          id: "company-name",
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
            { value: "5", label: __("Personal meetings and services", "simplybook") },
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
          label: __("What service do you provide?", 'simplybook'),
        },
        {
          id: "address",
          type: "text",
          label: __("Address", "simplybook"),
        },
        {
          id: "phone",
          type: "text",
          label: __("Phone", "simplybook"),
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
            { value: 'NL', label: __("Netherlands", "simplybook") },
            { value: 'DE', label: __("Germany", "simplybook") },
            { value: 'BE', label: __("Belgium", "simplybook") },
          ],
        },
      ],
      beforeSubmit: async (data) => {
        console.log("submit information check step");
        console.log(data);
        await registerCompany({ data });
      },
    },
    {
      id: 4,
      path: "/onboarding/confirm-email",
      fields: [
        {
          id: "confirmation-code",
          type: "text",
          label: __("Confirmation Code", "simplybook"),
        },
      ],
      beforeSubmit: async (data) => {
        if ( !data.recaptchaToken ) {
          console.log("missing recaptchatoken, cancel submit");
          return false;
        }
        console.log("found recaptcha token ", data.recaptchaToken)
        console.log("confirm email step");
        console.log(data);
        await confirmEmail({ data });
      },
    },
    {
      id: 5,
      path: "/onboarding/style-widget",
      fields: [
        {
          id: "widget-color-simple",
          type: "text",
        },
      ],
      beforeSubmit: (data) => {
        console.log("submit widget step");
        console.log(data);
      },
    },
    {
      id: 6,
      path: "/onboarding/implementation",
      fields: [],
      beforeSubmit: (data) => {
        console.log("submit implementation step")
        console.log(data);
      },
    },
  ];

const useOnboardingData = () => {
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

  // Query for managing onboarding data
  const query = useQuery({
    queryKey: ["onboarding_data"],
    initialData: { ...initialData, ...prefilledData },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Mutation for updating data
  const { mutate: updateData } = useMutation({
    mutationFn: async (newData) => {
      queryClient.setQueryData(["onboarding_data"], (oldData) => ({
        ...oldData,
        ...newData,
      }));
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
    isLastStep: (path) => steps.length === steps.find((step) => step.path === path)?.id,
    recaptchaToken: query.data?.recaptchaToken || "",
    setRecaptchaToken: (token) => updateData({ recaptchaToken: token }),
    onboardingCompleted: simplybook.is_onboarding_completed,
    setOnboardingCompleted: (value) => updateData({ onboardingCompleted: value }),
  };
};

export default useOnboardingData; 