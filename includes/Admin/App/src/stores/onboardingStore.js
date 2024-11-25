import { create } from "zustand";
import { __ } from "@wordpress/i18n";
import registerEmail from "../api/endpoints/onBoarding/registerEmail";
import registerTipsTricks from "../api/endpoints/onBoarding/registerTipsTricks";

const useOnboardingStore = create((set) => {
  // Create initial data object by collecting all field IDs
  const initialData = {};
  const steps = [
    {
      id: 1,
      path: "/onboarding/create-your-account",
      fields: [
        {
          id: "email",
          type: "text",
          label: "Email",
          required: true,
          validation: {
            regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            message: __("Please enter a valid email address",'simplybook'),
          },
        //   context: "This is a context",
        //   help: "This is a help",
        },
        {
          id: "terms-and-conditions",
          type: "checkbox",
          label: __("I agree to the terms and conditions", 'simplybook'),
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
          id: "business-category",
          type: "text",
          label: __("Business category", 'simplybook'),
        },
        {
          id: "services",
          type: "text",
          label: "Services",
        },
        {
          id: "address",
          type: "text",
          label: __("Address","simplybook"),
        },
        {
          id: "phone",
          type: "text",
          label: __("Phone","simplybook"),
        },
        {
          id: "zip",
          type: "text",
          label: __("Postal Code","simplybook"),
        },
        {
          id: "city",
          type: "text",
          label: __("City","simplybook"),
        },
        {
          id: "country",
          type: "text",
          label: __("Country","simplybook"),
        },
      ],
      beforeSubmit: (data) => {
        console.log("submit information check step");
        console.log(data);
      },
    },
    {
      id: 4,
      path: "/onboarding/style-widget",
      fields: [
        {
          id: "widget-color-simple",
          type: "text",
        },
      ],
      beforeSubmit: (data) => {
        console.log(data);
      },
    },
    {
      id: 5,
      path: "/onboarding/implementation",
      fields: [],
      beforeSubmit: (data) => {
        console.log(data);
      },
    },
  ];
  
  steps.forEach(step => {
    step.fields.forEach(field => {
      initialData[field.id] = '';
    });
  });

  return {
    steps,
    data: initialData,
    defaultData: initialData,
    updateData: (data) => {
      set((state) => ({ data: { ...state.data, ...data } }));
    },
    // Current step is based on the URL path not a number
    getCurrentStepId: (path) => {
      return useOnboardingStore
        .getState()
        .steps.find((step) => step.path === path).id;
    },
    getCurrentStep: (path) => {
      return useOnboardingStore.getState().steps.find((step) => step.path === path);
    },
    getURLForStep: (step) => {
      return useOnboardingStore.getState().steps[step - 1].path;
    },
    isLastStep: (path) => {
      return useOnboardingStore.getState().steps.length === useOnboardingStore.getState().getCurrentStepId(path);
    },
  };
});

export default useOnboardingStore;
