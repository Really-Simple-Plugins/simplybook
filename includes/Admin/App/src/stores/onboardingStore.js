import { create } from "zustand";

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
            message: "Please enter a valid email address",
          },
        //   context: "This is a context",
        //   help: "This is a help",
        },
        {
          id: "terms-and-conditions",
          type: "text",
          label: "I agree to the terms and conditions",
        },
      ],
      beforeSubmit: (data) => {
        console.log(data);
      },
    },
    {
      id: 2,
      path: "/onboarding/tips-and-tricks",
      fields: [
        {
          id: "tips-and-tricks",
          type: "hidden",
        },
      ],
      beforeSubmit: (data) => {
        console.log(data);
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
          label: "Business category",
        },
        {
          id: "services",
          type: "text",
          label: "Services",
        },
        {
          id: "street",
          type: "text",
          label: "Street",
        },
        {
          id: "number",
          type: "text",
          label: "No.",
        },
        {
          id: "zip",
          type: "text",
          label: "Postal Code",
        },
        {
          id: "city",
          type: "text",
          label: "City",
        },
        {
          id: "country",
          type: "text",
          label: "Country",
        },
      ],
      beforeSubmit: (data) => {
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
