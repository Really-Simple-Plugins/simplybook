"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_onboarding_create-your-account_lazy_jsx"],{

/***/ "./src/api/endpoints/getServices.js":
/*!******************************************!*\
  !*** ./src/api/endpoints/getServices.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requests/request */ "./src/api/requests/request.js");


/**
 * Update an onboarding step
 * @return {Promise<void>}
 */
const getServices = async () => {
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("services", "POST");
  if (!res || !res.data.services) {
    console.log("no services found");
    return [];
  }
  console.log("getServices response ", res);
  return res.data.services;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getServices);

/***/ }),

/***/ "./src/api/endpoints/onBoarding/confirmEmail.js":
/*!******************************************************!*\
  !*** ./src/api/endpoints/onBoarding/confirmEmail.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../requests/request */ "./src/api/requests/request.js");


/**
 * Update an onboarding step
 * @param withValues
 * @return {Promise<void>}
 */
const confirmEmail = async ({
  data = true
}) => {
  console.log("calling confirmEmail api", data);
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("onboarding/confirm_email", "POST", {
    data
  });
  console.log("confirmEmail response", res);
  return res.data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (confirmEmail);

/***/ }),

/***/ "./src/api/endpoints/onBoarding/registerCompany.js":
/*!*********************************************************!*\
  !*** ./src/api/endpoints/onBoarding/registerCompany.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../requests/request */ "./src/api/requests/request.js");


/**
 * Update an onboarding step
 * @param withValues
 * @return {Promise<void>}
 */
const registerCompany = async ({
  data = true
}) => {
  console.log("calling registerCompany api", data);
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("onboarding/company_registration", "POST", {
    data
  });
  return res.data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (registerCompany);

/***/ }),

/***/ "./src/api/endpoints/onBoarding/registerEmail.js":
/*!*******************************************************!*\
  !*** ./src/api/endpoints/onBoarding/registerEmail.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../requests/request */ "./src/api/requests/request.js");


/**
 * Update an onboarding step
 * @param withValues
 * @return {Promise<void>}
 */
const registerEmail = async ({
  data = true
}) => {
  console.log("calling registerEmail api", data);
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("onboarding/register_email", "POST", {
    data
  });
  return res.data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (registerEmail);

/***/ }),

/***/ "./src/api/endpoints/onBoarding/registerTipsTricks.js":
/*!************************************************************!*\
  !*** ./src/api/endpoints/onBoarding/registerTipsTricks.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../requests/request */ "./src/api/requests/request.js");


/**
 * Update an onboarding step
 * @param withValues
 * @return {Promise<void>}
 */
const registerTipsTricks = async ({
  data = true
}) => {
  console.log("calling registerTipsTricks api", data);
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("onboarding/tipstricks", "POST", {
    data
  });
  return res.data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (registerTipsTricks);

/***/ }),

/***/ "./src/components/Fields/ButtonField.jsx":
/*!***********************************************!*\
  !*** ./src/components/Fields/ButtonField.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.tsx");
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.tsx");





/**
 * TextField component
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 */
const ButtonField = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  field,
  label,
  help,
  context,
  className,
  ...props
}, ref) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    help: help,
    context: context,
    className: className
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
    ...field,
    ...props
  }, label));
});
ButtonField.displayName = 'ButtonField';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonField);

/***/ }),

/***/ "./src/components/Fields/CheckboxField.js":
/*!************************************************!*\
  !*** ./src/components/Fields/CheckboxField.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Inputs_CheckboxInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Inputs/CheckboxInput */ "./src/components/Inputs/CheckboxInput.tsx");
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.tsx");





/**
 * TextField component
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 */
const CheckboxField = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  field,
  fieldState,
  label,
  help,
  context,
  className,
  ...props
}, ref) => {
  const inputId = props.id || field.name;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: label,
    help: help,
    error: fieldState?.error?.message,
    context: context,
    className: className,
    inputId: inputId,
    required: props.required
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_CheckboxInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
    ...field,
    id: inputId,
    type: "checkbox",
    "aria-invalid": !!fieldState?.error?.message,
    ...props
  }));
});
CheckboxField.displayName = 'CheckboxField';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckboxField);

/***/ }),

/***/ "./src/components/Fields/HiddenField.js":
/*!**********************************************!*\
  !*** ./src/components/Fields/HiddenField.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Inputs_HiddenInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Inputs/HiddenInput */ "./src/components/Inputs/HiddenInput.tsx");




/**
 * TextField component
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 */
const HiddenField = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  field,
  fieldState,
  label,
  help,
  context,
  className,
  ...props
}, ref) => {
  const inputId = props.id || field.name;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_HiddenInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
    ...field,
    id: inputId,
    type: "hidden",
    "aria-invalid": !!fieldState?.error?.message,
    ...props
  });
});
HiddenField.displayName = 'HiddenField';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HiddenField);

/***/ }),

/***/ "./src/components/Fields/ServicesField.jsx":
/*!*************************************************!*\
  !*** ./src/components/Fields/ServicesField.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.tsx");
/* harmony import */ var _Inputs_SelectInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Inputs/SelectInput */ "./src/components/Inputs/SelectInput.tsx");
/* harmony import */ var _api_endpoints_getServices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api/endpoints/getServices */ "./src/api/endpoints/getServices.js");





/**
 * TextField component
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 */
const ServicesField = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  field,
  fieldState,
  label,
  help,
  context,
  className,
  ...props
}, ref) => {
  const inputId = props.id || field.name;
  const [services, setServices] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const loadServices = async () => {
    const services = await (0,_api_endpoints_getServices__WEBPACK_IMPORTED_MODULE_3__["default"])();
    console.log("loaded services", services);
    setServices(services);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (services.length === 0) {
      loadServices();
    }
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_1__["default"], {
    label: label,
    help: help,
    error: fieldState?.error?.message,
    context: context,
    className: className,
    inputId: inputId,
    required: props.required
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_SelectInput__WEBPACK_IMPORTED_MODULE_2__["default"], {
    id: inputId,
    options: services,
    "aria-invalid": !!fieldState?.error?.message,
    ...field,
    ...props
  }));
});
ServicesField.displayName = "ServicesField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ServicesField);

/***/ }),

/***/ "./src/components/Fields/TextField.jsx":
/*!*********************************************!*\
  !*** ./src/components/Fields/TextField.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Inputs_TextInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Inputs/TextInput */ "./src/components/Inputs/TextInput.tsx");
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.tsx");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");






/**
 * TextField component
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 */
const TextField = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  field,
  fieldState,
  label,
  help,
  context,
  className,
  ...props
}, ref) => {
  const inputId = props.id || field.name;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: label,
    help: help,
    error: fieldState?.error?.message,
    context: context,
    className: className,
    inputId: inputId,
    required: props.required
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_TextInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
    id: inputId,
    type: "text",
    "aria-invalid": !!fieldState?.error?.message,
    ...field,
    ...props
  }));
});
TextField.displayName = "TextField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextField);

/***/ }),

/***/ "./src/components/Forms/FormField.jsx":
/*!********************************************!*\
  !*** ./src/components/Forms/FormField.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Fields/TextField */ "./src/components/Fields/TextField.jsx");
/* harmony import */ var _Fields_HiddenField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Fields/HiddenField */ "./src/components/Fields/HiddenField.js");
/* harmony import */ var _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Fields/CheckboxField */ "./src/components/Fields/CheckboxField.js");
/* harmony import */ var _Fields_ServicesField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Fields/ServicesField */ "./src/components/Fields/ServicesField.jsx");
/* harmony import */ var _components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Common/ErrorBoundary */ "./src/components/Common/ErrorBoundary.jsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");










const fieldComponents = {
  text: _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__["default"],
  api: _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__["default"],
  hidden: _Fields_HiddenField__WEBPACK_IMPORTED_MODULE_2__["default"],
  checkbox: _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_3__["default"],
  services: _Fields_ServicesField__WEBPACK_IMPORTED_MODULE_4__["default"]
};
const FormField = (0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(({
  setting,
  control,
  ...props
}) => {
  if (setting.visible === false) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "hidden",
      defaultValue: setting.value || setting.default
    });
  }
  const FieldComponent = fieldComponents[setting.type];
  if (!FieldComponent) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "w-full"
    }, "Unknown field type: ", setting.type, " ", setting.id);
  }
  const validationRules = {
    ...(setting.required && {
      required: {
        value: true,
        message: setting.requiredMessage || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)("This field is required", "simplybook")
      }
    }),
    ...(setting.validation?.regex && {
      pattern: {
        value: new RegExp(setting.validation.regex),
        message: setting.validation.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)("Invalid format", "simplybook")
      }
    }),
    ...(setting.min && {
      min: setting.min
    }),
    ...(setting.max && {
      max: setting.max
    }),
    ...(setting.minLength && {
      minLength: setting.minLength
    }),
    ...(setting.maxLength && {
      maxLength: setting.maxLength
    }),
    ...(setting.validate && {
      validate: setting.validate
    })
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_5__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_8__.Controller, {
    name: setting.id,
    control: control,
    rules: validationRules,
    defaultValue: setting.value || setting.default,
    render: ({
      field,
      fieldState
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FieldComponent, {
      field: field,
      fieldState: fieldState,
      required: setting.required,
      label: setting.label || setting.id,
      disabled: props.settingsIsUpdating || setting.disabled,
      context: setting.context,
      help: setting.help,
      options: setting.options,
      ...props
    })
  }));
});
FormField.displayName = "FormField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormField);

/***/ }),

/***/ "./src/components/Onboarding/OnboardingStep.jsx":
/*!******************************************************!*\
  !*** ./src/components/Onboarding/OnboardingStep.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var _Forms_FormField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Forms/FormField */ "./src/components/Forms/FormField.jsx");
/* harmony import */ var _Fields_ButtonField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Fields/ButtonField */ "./src/components/Fields/ButtonField.jsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);







const OnboardingStep = ({
  path,
  title,
  subtitle,
  rightColumn,
  bottomText,
  primaryButton = {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Next", "simplybook")
  },
  secondaryButton = null,
  customHtml = null
}) => {
  const {
    getURLForStep,
    getCurrentStepId,
    getCurrentStep,
    updateData,
    data,
    defaultData,
    isLastStep,
    recaptchaToken
  } = (0,_hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const navigate = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.useNavigate)();
  const {
    handleSubmit,
    control,
    formState: {
      isDirty,
      errors
    }
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_6__.useForm)({
    defaultValues: defaultData,
    values: data,
    mode: "onBlur"
  });
  const currentStep = getCurrentStep(path);
  const onSubmit = async (formData, buttonType = "primary") => {
    let updatedFormData = {
      ...formData
    };
    //add the auto generated recaptcha token to our data
    updatedFormData.recaptchaToken = recaptchaToken;
    if (buttonType === "primary" && primaryButton.modifyData) {
      updatedFormData = primaryButton.modifyData(updatedFormData);
    } else if (buttonType === "secondary" && secondaryButton.modifyData) {
      updatedFormData = secondaryButton.modifyData(updatedFormData);
    }
    if (currentStep.beforeSubmit) {
      try {
        const shouldContinue = await currentStep.beforeSubmit(updatedFormData);
        if (shouldContinue === false) {
          return; // Cancel submission only if beforeSubmit explicitly returns false
        }
      } catch (error) {
        console.error('Submission cancelled:', error);
        return; // Cancel submission if beforeSubmit throws an error
      }
    }
    updateData(updatedFormData);
    if (buttonType === "primary" && primaryButton.navigateTo) {
      navigate({
        to: primaryButton.navigateTo
      });
    } else if (buttonType === "secondary" && secondaryButton.navigateTo) {
      navigate({
        to: secondaryButton.navigateTo
      });
    } else if (isLastStep(path)) {
      navigate({
        to: "/"
      });
    } else {
      navigate({
        to: getURLForStep(getCurrentStepId(path) + 1)
      });
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-span-4 col-start-3 my-12 flex flex-col text-black"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "my-6 text-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "text-3xl font-semibold text-black"
  }, title), subtitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "mt-2 text-base font-light text-black"
  }, subtitle)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-col"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", null, currentStep.fields.map(field => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FormField__WEBPACK_IMPORTED_MODULE_2__["default"], {
    setting: field,
    key: field.id,
    control: control
  })), customHtml, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_ButtonField__WEBPACK_IMPORTED_MODULE_3__["default"], {
    btnVariant: "primary",
    label: primaryButton.label,
    context: bottomText,
    onClick: handleSubmit(data => onSubmit(data, "primary"))
  }), secondaryButton && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_ButtonField__WEBPACK_IMPORTED_MODULE_3__["default"], {
    btnVariant: "tertiary",
    label: secondaryButton.label,
    onClick: handleSubmit(data => onSubmit(data, "secondary"))
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-span-4 col-start-7 row-span-2 my-12"
  }, rightColumn));
};
OnboardingStep.displayName = "OnboardingStep";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OnboardingStep);

/***/ }),

/***/ "./src/hooks/useOnboardingData.js":
/*!****************************************!*\
  !*** ./src/hooks/useOnboardingData.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useMutation.js");
/* harmony import */ var _api_endpoints_onBoarding_registerEmail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerEmail */ "./src/api/endpoints/onBoarding/registerEmail.js");
/* harmony import */ var _api_endpoints_onBoarding_registerTipsTricks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerTipsTricks */ "./src/api/endpoints/onBoarding/registerTipsTricks.js");
/* harmony import */ var _api_endpoints_onBoarding_registerCompany__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerCompany */ "./src/api/endpoints/onBoarding/registerCompany.js");
/* harmony import */ var _api_endpoints_onBoarding_confirmEmail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/endpoints/onBoarding/confirmEmail */ "./src/api/endpoints/onBoarding/confirmEmail.js");
/* harmony import */ var _useSettingsData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useSettingsData */ "./src/hooks/useSettingsData.js");







const steps = [{
  id: 1,
  path: "/onboarding/create-your-account",
  fields: [{
    id: "email",
    type: "text",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Email", "simplybook"),
    required: true,
    value: "",
    //simplybook.company_data.email,
    validation: {
      regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Please enter a valid email address", "simplybook")
    }
    //   context: "This is a context",
    //   help: "This is a help",
  }, {
    id: "terms-and-conditions",
    type: "checkbox",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("I agree to the terms and conditions", "simplybook")
  }],
  beforeSubmit: async data => {
    console.log("submit email step");
    await (0,_api_endpoints_onBoarding_registerEmail__WEBPACK_IMPORTED_MODULE_1__["default"])({
      data
    });
    console.log(data);
  }
}, {
  id: 2,
  path: "/onboarding/tips-and-tricks",
  fields: [{
    id: "tips-and-tricks",
    type: "checkbox"
  }],
  beforeSubmit: async data => {
    console.log("submit tips and tricks step");
    await (0,_api_endpoints_onBoarding_registerTipsTricks__WEBPACK_IMPORTED_MODULE_2__["default"])({
      data
    });
  }
}, {
  id: 3,
  path: "/onboarding/information-check",
  fields: [{
    id: "company-name",
    type: "text",
    label: "Company name"
  }, {
    id: "business-category",
    type: "text",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Business category", "simplybook")
  }, {
    id: "service",
    type: "text",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Services", 'simplybook')
  }, {
    id: "address",
    type: "text",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Address", "simplybook")
  }, {
    id: "phone",
    type: "text",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Phone", "simplybook")
  }, {
    id: "zip",
    type: "text",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Postal Code", "simplybook")
  }, {
    id: "city",
    type: "text",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("City", "simplybook")
  }, {
    id: "country",
    type: "text",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Country", "simplybook")
  }],
  beforeSubmit: async data => {
    console.log("submit information check step");
    console.log(data);
    await (0,_api_endpoints_onBoarding_registerCompany__WEBPACK_IMPORTED_MODULE_3__["default"])({
      data
    });
  }
}, {
  id: 4,
  path: "/onboarding/confirm-email",
  fields: [{
    id: "confirmation-code",
    type: "text",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Confirmation Code", "simplybook")
  }],
  beforeSubmit: async data => {
    if (!data.recaptchaToken) {
      console.log("missing recaptchatoken, cancel submit");
      return false;
    }
    console.log("found recaptcha token ", data.recaptchaToken);
    console.log("confirm email step");
    console.log(data);
    await (0,_api_endpoints_onBoarding_confirmEmail__WEBPACK_IMPORTED_MODULE_4__["default"])({
      data
    });
  }
}, {
  id: 5,
  path: "/onboarding/style-widget",
  fields: [{
    id: "widget-color-simple",
    type: "text"
  }],
  beforeSubmit: data => {
    console.log("submit widget step");
    console.log(data);
  }
}, {
  id: 6,
  path: "/onboarding/implementation",
  fields: [],
  beforeSubmit: data => {
    console.log("submit implementation step");
    console.log(data);
  }
}];
const useOnboardingData = () => {
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.useQueryClient)();
  const {
    settings
  } = (0,_useSettingsData__WEBPACK_IMPORTED_MODULE_5__["default"])();

  // Create initial data object
  const initialData = {};
  steps.forEach(step => {
    step.fields.forEach(field => {
      initialData[field.id] = "";
    });
  });

  // Prefill with settings data
  let prefilledData = {};
  settings?.forEach(setting => {
    if (setting.id in initialData) {
      prefilledData[setting.id] = setting.value;
    }
  });
  console.log(prefilledData);

  // Query for managing onboarding data
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__.useQuery)({
    queryKey: ["onboarding_data"],
    initialData: {
      ...initialData,
      ...prefilledData
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Mutation for updating data
  const {
    mutate: updateData
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__.useMutation)({
    mutationFn: async newData => {
      queryClient.setQueryData(["onboarding_data"], oldData => ({
        ...oldData,
        ...newData
      }));
    }
  });
  return {
    steps,
    data: query.data,
    defaultData: initialData,
    updateData,
    getCurrentStepId: path => steps.find(step => step.path === path)?.id,
    getCurrentStep: path => steps.find(step => step.path === path),
    getURLForStep: step => steps[step - 1]?.path,
    isLastStep: path => steps.length === steps.find(step => step.path === path)?.id,
    recaptchaToken: query.data?.recaptchaToken || "",
    setRecaptchaToken: token => updateData({
      recaptchaToken: token
    })
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useOnboardingData);

/***/ }),

/***/ "./src/routes/onboarding/create-your-account.lazy.jsx":
/*!************************************************************!*\
  !*** ./src/routes/onboarding/create-your-account.lazy.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Onboarding_OnboardingStep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Onboarding/OnboardingStep */ "./src/components/Onboarding/OnboardingStep.jsx");




const path = "/onboarding/create-your-account";
const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__.createLazyFileRoute)(path)({
  component: () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Onboarding_OnboardingStep__WEBPACK_IMPORTED_MODULE_2__["default"], {
    path: path,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Create your free account", "simplybook"),
    subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("100% free. No credit card needed.", "simplybook"),
    bottomText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut", "simplybook"),
    rightColumn: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "right")
  })
});

/***/ }),

/***/ "./src/components/Forms/FieldWrapper.tsx":
/*!***********************************************!*\
  !*** ./src/components/Forms/FieldWrapper.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _radix_ui_react_label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-label */ "./node_modules/@radix-ui/react-label/dist/index.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);




var FieldWrapper = (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(function (_a) {
  var label = _a.label,
    context = _a.context,
    help = _a.help,
    error = _a.error,
    _b = _a.reverseLabel,
    reverseLabel = _b === void 0 ? false : _b,
    _c = _a.className,
    className = _c === void 0 ? "" : _c,
    inputId = _a.inputId,
    _d = _a.required,
    required = _d === void 0 ? false : _d,
    children = _a.children;
  var wrapperClasses = ["flex w-full flex-col", className, "pt-4"].filter(Boolean).join(" ");
  var contentClasses = ["flex w-full flex-col", reverseLabel ? "flex-col-reverse" : ""].filter(Boolean).join(" ");
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: wrapperClasses,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: contentClasses,
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_label__WEBPACK_IMPORTED_MODULE_3__.Root, {
          className: "cursor-pointer pb-1 font-medium text-black text-md",
          htmlFor: inputId,
          children: [label, required && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: "ml-1 text-gray-500 font-normal text-xs",
            children: ["(", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Required", 'simplybook'), ")"]
          })]
        }), help && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "pb-1 text-xs font-light text-gray-600",
          children: help
        })]
      }), children]
    }), error && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      className: "mt-2 text-xs font-light text-red-600",
      role: "alert",
      children: error
    }), context && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      className: "mt-2 text-xs font-light text-gray-600",
      children: context
    })]
  });
});
FieldWrapper.displayName = 'FieldWrapper';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FieldWrapper);

/***/ }),

/***/ "./src/components/Inputs/ButtonInput.tsx":
/*!***********************************************!*\
  !*** ./src/components/Inputs/ButtonInput.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/link.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};



/**
 * Styled button component
 */
var ButtonInput = function (_a) {
  var children = _a.children,
    onClick = _a.onClick,
    link = _a.link,
    _b = _a.btnVariant,
    btnVariant = _b === void 0 ? "secondary" : _b,
    _c = _a.disabled,
    disabled = _c === void 0 ? false : _c,
    _d = _a.size,
    size = _d === void 0 ? "md" : _d,
    props = __rest(_a, ["children", "onClick", "link", "btnVariant", "disabled", "size"]);
  var className = (0,clsx__WEBPACK_IMPORTED_MODULE_1__.clsx)(
  // Base styles
  "rounded-full transition-all duration-200", {
    'bg-secondary text-white hover:bg-secondary-dark': btnVariant === 'primary',
    'bg-tertiary text-white hover:bg-tertiary-dark': btnVariant === 'secondary',
    'border-2 border-tertiary bg-transparent text-black hover:bg-tertiary-light': btnVariant === 'tertiary'
  }, {
    'py-.5 px-3 font-normal text-xs border-1': size === 'sm',
    'py-2 px-6 font-semibold': size === 'md',
    'py-3 px-8 text-lg font-semibold': size === 'lg'
  }, {
    'opacity-50 cursor-not-allowed': disabled
  });
  if (link) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_2__.Link, __assign({
      to: link.to,
      className: className
    }, props, {
      children: children
    }));
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", __assign({
    onClick: onClick,
    className: className,
    disabled: disabled
  }, props, {
    children: children
  }));
};
ButtonInput.displayName = 'ButtonInput';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonInput);

/***/ }),

/***/ "./src/components/Inputs/CheckboxInput.tsx":
/*!*************************************************!*\
  !*** ./src/components/Inputs/CheckboxInput.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


/**
 * Styled text input component
 * @param props - Props for the input component
 * @returns {JSX.Element} The rendered input element
 */
var CheckboxInput = (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (_a, ref) {
  var _b = _a.type,
    type = _b === void 0 ? "checkbox" : _b,
    className = _a.className,
    props = __rest(_a, ["type", "className"]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", __assign({
    ref: ref,
    type: type,
    className: "rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 ".concat(className || "")
  }, props));
});
CheckboxInput.displayName = "CheckboxInput";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckboxInput);

/***/ }),

/***/ "./src/components/Inputs/HiddenInput.tsx":
/*!***********************************************!*\
  !*** ./src/components/Inputs/HiddenInput.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


/**
 * Styled text input component
 * @param props - Props for the input component
 * @returns {JSX.Element} The rendered input element
 */
var HiddenInput = (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (_a, ref) {
  var _b = _a.type,
    type = _b === void 0 ? "hidden" : _b,
    className = _a.className,
    props = __rest(_a, ["type", "className"]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", __assign({
    ref: ref,
    type: "hidden"
  }, props));
});
HiddenInput.displayName = 'HiddenInput';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HiddenInput);

/***/ }),

/***/ "./src/components/Inputs/SelectInput.tsx":
/*!***********************************************!*\
  !*** ./src/components/Inputs/SelectInput.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectItem: () => (/* binding */ SelectItem),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-select */ "./node_modules/@radix-ui/react-select/dist/index.mjs");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};




/**
 * Styled select input component
 * @param props - Props for the select component
 * @returns {JSX.Element} The rendered select component
 */
var SelectInput = react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(function (_a, ref) {
  var value = _a.value,
    onChange = _a.onChange,
    _b = _a.options,
    options = _b === void 0 ? [] : _b;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Root, {
    value: value,
    onValueChange: function (value) {
      return onChange(value);
    },
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Trigger, {
      ref: ref,
      className: "flex w-full items-center justify-between rounded-md border border-gray-300 p-2 focus:border-tertiary focus:outline-none focus:ring",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Value, {
        placeholder: "Select an option\u2026"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Icon, {
        className: "ml-2",
        children: "v"
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Portal, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Content, {
        className: "rounded-md border border-gray-300 bg-white shadow-lg",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.ScrollUpButton, {
          className: "flex items-center justify-center p-2"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Viewport, {
          className: "p-2",
          children: options.map(function (option) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectItem, {
              value: option.value,
              children: option.label
            }, option.value);
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.ScrollDownButton, {
          className: "flex items-center justify-center p-2",
          children: "v"
        })]
      })
    })]
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectInput);
/**
 * Styled select item component
 * @param props - Props for the select item component
 * @returns {JSX.Element} The rendered select item component
 */
var SelectItem = react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(function (_a, ref) {
  var children = _a.children,
    className = _a.className,
    props = __rest(_a, ["children", "className"]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Item, __assign({
    ref: ref,
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__.clsx)("flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-100 focus:bg-gray-200", className)
  }, props, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.ItemText, {
      children: children
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.ItemIndicator, {
      className: "ml-2",
      children: "Check"
    })]
  }));
});


/***/ }),

/***/ "./src/components/Inputs/TextInput.tsx":
/*!*********************************************!*\
  !*** ./src/components/Inputs/TextInput.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


/**
 * Styled text input component
 * @param props - Props for the input component
 * @returns {JSX.Element} The rendered input element
 */
var TextInput = (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (_a, ref) {
  var _b = _a.type,
    type = _b === void 0 ? "text" : _b,
    className = _a.className,
    props = __rest(_a, ["type", "className"]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", __assign({
    ref: ref,
    type: type,
    className: "w-full rounded-md border border-gray-300 p-2 focus:border-tertiary focus:outline-none focus:ring disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 ".concat(className || "")
  }, props));
});
TextInput.displayName = "TextInput";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInput);

/***/ })

}]);
//# sourceMappingURL=src_routes_onboarding_create-your-account_lazy_jsx.js.map