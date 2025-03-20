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
      id: 5,
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
      id: 6,
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