"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_onboarding_confirm-email_lazy_jsx"],{

/***/ "./src/api/config.js":
/*!***************************!*\
  !*** ./src/api/config.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AJAX_URL: () => (/* binding */ AJAX_URL),
/* harmony export */   API_BASE_PATH: () => (/* binding */ API_BASE_PATH),
/* harmony export */   NONCE: () => (/* binding */ NONCE),
/* harmony export */   SITE_URL: () => (/* binding */ SITE_URL),
/* harmony export */   TEXT_DOMAIN: () => (/* binding */ TEXT_DOMAIN)
/* harmony export */ });
// src/api/config.js

// Token for authenticated requests; fix to get the SimplyBook nonce
const NONCE = simplybook.nonce;

// Base URL for SimplyBook API requests
const API_BASE_PATH = "simplybook/v1/";

// URLs for the site and AJAX endpoint
const SITE_URL = getSiteUrl("site_url");
const AJAX_URL = getSiteUrl("ajax_url");

// Text domain for SimplyBook translations
const TEXT_DOMAIN = "simplybook";

/**
 * Retrieves the specified URL ('site_url' or 'admin_ajax_url') from burst_settings.
 * If the site is loaded over HTTPS, enforces HTTPS for the URL to prevent mixed content issues.
 * @param {string} type - 'site_url' or 'admin_ajax_url'.
 * @returns {string} The requested URL with HTTPS enforced if necessary.
 */
function getSiteUrl(type) {
  // Retrieve URL from burst_settings based on type
  let url = simplybook[type];

  // If the page is loaded over HTTPS and the URL is not, update it to HTTPS
  if (window.location.protocol === "https:" && !url.includes("https://")) {
    url = url.replace("http://", "https://");
  }
  return url;
}

/***/ }),

/***/ "./src/api/endpoints/getSettingsFields.js":
/*!************************************************!*\
  !*** ./src/api/endpoints/getSettingsFields.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requests/request */ "./src/api/requests/request.js");


/**
 * Get settings fields (with or without values)
 * @param withValues
 * @return {Promise<void>}
 */
const getSettingsFields = async ({
  withValues = true
}) => {
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("settings/get_fields", "POST", {
    withValues
  });
  return res.data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getSettingsFields);

/***/ }),

/***/ "./src/api/endpoints/onBoarding/getRecaptchaSitekey.js":
/*!*************************************************************!*\
  !*** ./src/api/endpoints/onBoarding/getRecaptchaSitekey.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../requests/request */ "./src/api/requests/request.js");


/**
 * Update an onboarding step
 * @return {Promise<void>}
 */
const getRecaptchaSiteKey = async () => {
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("onboarding/get_recaptcha_sitekey", "POST");
  return res.data.site_key;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRecaptchaSiteKey);

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

/***/ "./src/api/helpers/errorHandler.js":
/*!*****************************************!*\
  !*** ./src/api/helpers/errorHandler.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const errorHandler = (error, path) => {
  console.error(`API Error at ${path}:`, error.message || error);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (errorHandler);

/***/ }),

/***/ "./src/api/helpers/glue.js":
/*!*********************************!*\
  !*** ./src/api/helpers/glue.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/api/config.js");
// src/api/helpers/glue.js

const usesPlainPermalinks = () => _config__WEBPACK_IMPORTED_MODULE_0__.SITE_URL.includes("?");
const glue = () => usesPlainPermalinks() ? "&" : "?";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (glue);

/***/ }),

/***/ "./src/api/requests/fetchRequest.js":
/*!******************************************!*\
  !*** ./src/api/requests/fetchRequest.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Request function to make API calls. First try to make a request using the API Fetch function, if that fails, try AJAX.
 * @param path
 * @param method
 * @param data
 * @param url
 * @return {Promise<void>}
 */
const fetchRequest = async (path, method = "POST", data = {}, url) => {
  const args = {
    path,
    method,
    data
  };
  const test_url = "simplybook/v1/settings/get_fields";
  console.log(test_url);
  console.log("Fetch: Requesting data from " + path + " using " + method + " method");
  // resolve or reject
  return await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()(args);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchRequest);

/***/ }),

/***/ "./src/api/requests/request.js":
/*!*************************************!*\
  !*** ./src/api/requests/request.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fetchRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchRequest */ "./src/api/requests/fetchRequest.js");
/* harmony import */ var _helpers_glue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/glue */ "./src/api/helpers/glue.js");
/* harmony import */ var _helpers_errorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/errorHandler */ "./src/api/helpers/errorHandler.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ "./src/api/config.js");





/**
 * Request function to make API calls. First try to make a request using the API Fetch function, if that fails, try AJAX.
 * @param path
 * @param method
 * @param data
 * @return {Promise<void>}
 */
const request = async (path, method = "POST", data = {}) => {
  const args = {
    path,
    method,
    data
  };
  args.path = _config__WEBPACK_IMPORTED_MODULE_3__.API_BASE_PATH + args.path + (0,_helpers_glue__WEBPACK_IMPORTED_MODULE_1__["default"])() + "&token=" + Math.random().toString(36).substring(2, 7);
  args.data = {
    ...data,
    nonce: _config__WEBPACK_IMPORTED_MODULE_3__.NONCE
  };
  if (method === 'GET') {
    console.log("the request method is not adjusted for GET requests yet. ");
  }
  console.log("request : ", args);
  // if (method === 'POST') {
  //
  // } else {
  //   args.path += glue() + getNonce();
  // }

  try {
    // Try the fetch request first
    return await (0,_fetchRequest__WEBPACK_IMPORTED_MODULE_0__["default"])(args.path, args.method, args.data);
  } catch (fetchError) {
    // If fetch fails, log error with handler and try AJAX fallback
    (0,_helpers_errorHandler__WEBPACK_IMPORTED_MODULE_2__["default"])(fetchError, args.path);

    // try {
    //   // Try the AJAX fallback request
    //   return await ajaxRequest(args.path, args.method, args.data);
    // } catch (ajaxError) {
    //   // If AJAX also fails, handle the final error
    //   errorHandler(ajaxError, args.path);
    //   throw new Error('API request failed');
    // }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);

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
  value,
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
    ...props,
    value: value
  }));
});
TextField.displayName = 'TextField';
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
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Fields/TextField */ "./src/components/Fields/TextField.jsx");
/* harmony import */ var _Fields_HiddenField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Fields/HiddenField */ "./src/components/Fields/HiddenField.js");
/* harmony import */ var _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Fields/CheckboxField */ "./src/components/Fields/CheckboxField.js");
/* harmony import */ var _components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Common/ErrorBoundary */ "./src/components/Common/ErrorBoundary.jsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");









const fieldComponents = {
  text: _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__["default"],
  api: _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__["default"],
  hidden: _Fields_HiddenField__WEBPACK_IMPORTED_MODULE_2__["default"],
  checkbox: _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_3__["default"]
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
  const {
    getValue,
    setValue
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const [fieldValue, setFieldValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    //if the current value is empty, set the value from the store
    if (!fieldValue) {
      setFieldValue(getValue(setting.id));
    }
  }, []);
  const validationRules = {
    ...(setting.required && {
      required: {
        value: true,
        message: setting.requiredMessage || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("This field is required", "simplybook")
      }
    }),
    ...(setting.validation?.regex && {
      pattern: {
        value: new RegExp(setting.validation.regex),
        message: setting.validation.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Invalid format", "simplybook")
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_7__.Controller, {
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
      onChange: e => {
        console.log("updating field");
        console.log(e.target.value);
        setFieldValue(e.target.value);
        setValue(setting.id, e.target.value);
      },
      help: setting.help,
      options: setting.options,
      ...props,
      value: fieldValue
    })
  }));
});
FormField.displayName = 'FormField';
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
/* harmony import */ var _stores_onboardingStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../stores/onboardingStore */ "./src/stores/onboardingStore.js");
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
  secondaryButton = null
}) => {
  const {
    getURLForStep,
    getCurrentStepId,
    getCurrentStep,
    updateData,
    data,
    defaultData,
    isLastStep
  } = (0,_stores_onboardingStore__WEBPACK_IMPORTED_MODULE_1__["default"])();
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
    if (buttonType === "primary" && primaryButton.modifyData) {
      updatedFormData = primaryButton.modifyData(updatedFormData);
    } else if (buttonType === "secondary" && secondaryButton.modifyData) {
      updatedFormData = secondaryButton.modifyData(updatedFormData);
    }
    if (currentStep.beforeSubmit) {
      currentStep.beforeSubmit(updatedFormData);
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
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_ButtonField__WEBPACK_IMPORTED_MODULE_3__["default"], {
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

/***/ "./src/hooks/useSettingsData.js":
/*!**************************************!*\
  !*** ./src/hooks/useSettingsData.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useMutation.js");
/* harmony import */ var _api_endpoints_getSettingsFields__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/endpoints/getSettingsFields */ "./src/api/endpoints/getSettingsFields.js");



/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useSettingsData = () => {
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();

  // Query for fetching settings from server
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
    queryKey: ["settings_fields"],
    queryFn: () => (0,_api_endpoints_getSettingsFields__WEBPACK_IMPORTED_MODULE_0__["default"])({
      withValues: true
    }),
    staleTime: 1000 * 60 * 5,
    // 5 minutes
    initialData: window.simplybook && window.simplybook.settings_fields,
    retry: 0,
    select: data => [...data] // create a new array so dependencies are updated
  });
  const getValue = id => query.data.find(field => field.id === id)?.value;
  const setValue = (id, value) => {
    const field = query.data.find(field => field.id === id);
    if (field) {
      field.value = value;
    }
  };
  // Update Mutation for settings data with destructured values
  const {
    mutateAsync: saveSettings,
    isLoading: isSavingSettings
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({
    mutationFn: async data => {
      // Simulate async operation (e.g., API call to save settings)
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Optionally return data or a result
      return data; // Or any other meaningful result
    },
    onSuccess: () => {
      // Invalidate cache by specific query key for updated data
      queryClient.invalidateQueries(["settings_fields"]);
    }
  });
  return {
    settings: query.data,
    saveSettings,
    getValue,
    setValue,
    isSavingSettings,
    invalidateSettings: () => queryClient.invalidateQueries(["settings_fields"])
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSettingsData);

/***/ }),

/***/ "./src/routes/onboarding/confirm-email.lazy.jsx":
/*!******************************************************!*\
  !*** ./src/routes/onboarding/confirm-email.lazy.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Onboarding_OnboardingStep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Onboarding/OnboardingStep */ "./src/components/Onboarding/OnboardingStep.jsx");
/* harmony import */ var _api_endpoints_onBoarding_getRecaptchaSitekey__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api/endpoints/onBoarding/getRecaptchaSitekey */ "./src/api/endpoints/onBoarding/getRecaptchaSitekey.js");
/* harmony import */ var _stores_onboardingStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../stores/onboardingStore */ "./src/stores/onboardingStore.js");







const path = "/onboarding/confirm-email";
const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.createLazyFileRoute)(path)({
  component: () => {
    const {
      setRecaptchaToken
    } = (0,_stores_onboardingStore__WEBPACK_IMPORTED_MODULE_4__["default"])();
    const recaptchaContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const setupRecaptcha = async () => {
      //get sitekey first, loading script has to wait.
      let siteKey = await (0,_api_endpoints_onBoarding_getRecaptchaSitekey__WEBPACK_IMPORTED_MODULE_3__["default"])();
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?onload=onloadRecaptchaCallback&render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Script loaded successfully!");
        // Code to execute after the script has fully loaded
        // Define the callback function globally to ensure it's accessible by reCAPTCHA
        window.onloadRecaptchaCallback = () => {
          if (window.grecaptcha && recaptchaContainerRef.current) {
            console.log("rendering recaptcha with sitekey", siteKey);
            window.grecaptcha.render(recaptchaContainerRef.current, {
              sitekey: siteKey,
              callback: recaptchaToken => {
                console.log("resulting recaptchaToken", recaptchaToken);
                setRecaptchaToken(recaptchaToken);
              }
            });
          }
        };
      };
      document.body.appendChild(script);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      console.log("setup recaptcha");
      setupRecaptcha();

      // Cleanup function to remove the script and callback when the component unmounts
      return () => {
        delete window.onloadRecaptchaCallback;
        const existingScript = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]');
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };
    }, []);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Onboarding_OnboardingStep__WEBPACK_IMPORTED_MODULE_2__["default"], {
      path: path,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Confirm your e-mail address", "simplybook"),
      subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Type in the code from the e-mail you received.", "simplybook"),
      bottomText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut", "simplybook"),
      rightColumn: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "right"))
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "recaptcha_container",
      ref: recaptchaContainerRef
    }));
  }
});

/***/ }),

/***/ "./src/stores/onboardingStore.js":
/*!***************************************!*\
  !*** ./src/stores/onboardingStore.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/react.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_endpoints_onBoarding_registerEmail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerEmail */ "./src/api/endpoints/onBoarding/registerEmail.js");
/* harmony import */ var _api_endpoints_onBoarding_registerTipsTricks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerTipsTricks */ "./src/api/endpoints/onBoarding/registerTipsTricks.js");
/* harmony import */ var _api_endpoints_onBoarding_registerCompany__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerCompany */ "./src/api/endpoints/onBoarding/registerCompany.js");





const useOnboardingStore = (0,zustand__WEBPACK_IMPORTED_MODULE_4__.create)(set => {
  // Create initial data object by collecting all field IDs
  const initialData = {};
  const steps = [{
    id: 1,
    path: "/onboarding/create-your-account",
    fields: [{
      id: "email",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Email", 'simplybook'),
      required: true,
      value: '',
      //simplybook.company_data.email,
      validation: {
        regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Please enter a valid email address", 'simplybook')
      }
      //   context: "This is a context",
      //   help: "This is a help",
    }, {
      id: "terms-and-conditions",
      type: "checkbox",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("I agree to the terms and conditions", 'simplybook')
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
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Business category", 'simplybook')
    }, {
      id: "services",
      type: "text",
      label: "Services"
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
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Confirmation Code", 'simplybook')
    }],
    beforeSubmit: data => {
      data.recaptchaToken = useOnboardingStore.getState().recaptchaToken;
      console.log("confirm email step");
      console.log(data);
    }
  }, {
    id: 5,
    path: "/onboarding/style-widget",
    fields: [{
      id: "widget-color-simple",
      type: "text"
    }],
    beforeSubmit: data => {
      console.log(data);
    }
  }, {
    id: 6,
    path: "/onboarding/implementation",
    fields: [],
    beforeSubmit: data => {
      console.log(data);
    }
  }];
  steps.forEach(step => {
    step.fields.forEach(field => {
      initialData[field.id] = '';
    });
  });
  return {
    steps,
    data: initialData,
    defaultData: initialData,
    updateData: data => {
      set(state => ({
        data: {
          ...state.data,
          ...data
        }
      }));
    },
    // Current step is based on the URL path not a number
    getCurrentStepId: path => {
      return useOnboardingStore.getState().steps.find(step => step.path === path).id;
    },
    recaptchaToken: "",
    setRecaptchaToken: recaptchaToken => {
      set({
        recaptchaToken
      });
    },
    getCurrentStep: path => {
      return useOnboardingStore.getState().steps.find(step => step.path === path);
    },
    getURLForStep: step => {
      return useOnboardingStore.getState().steps[step - 1].path;
    },
    isLastStep: path => {
      return useOnboardingStore.getState().steps.length === useOnboardingStore.getState().getCurrentStepId(path);
    }
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useOnboardingStore);

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
    _b = _a.btnVariant,
    btnVariant = _b === void 0 ? "secondary" : _b,
    // default is secondary because there needs to be a good reason to use primary
    _c = _a.disabled,
    // default is secondary because there needs to be a good reason to use primary
    disabled = _c === void 0 ? false : _c,
    props = __rest(_a, ["children", "onClick", "btnVariant", "disabled"]);
  // Base styles for both variants
  var baseStyles = "font-semibold py-2 px-6 rounded-full transition-all duration-200";
  // Variants for primary and secondary buttons
  var variants = {
    primary: "bg-secondary text-white hover:bg-secondary-dark",
    secondary: "bg-tertiary text-white hover:bg-tertiary-dark",
    tertiary: "border-2 border-tertiary bg-transparent text-black hover:bg-tertiary-light"
  };
  // Disabled styles
  var disabledStyles = "opacity-50 cursor-not-allowed";
  // Final className based on variant and disabled state
  var className = "".concat(baseStyles, " ").concat(variants[btnVariant], " ").concat(disabled ? disabledStyles : "");
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
    checked: !!props.value,
    className: "rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 ".concat(className || '')
  }, props));
});
CheckboxInput.displayName = 'CheckboxInput';
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
    value = _a.value,
    props = __rest(_a, ["type", "className", "value"]);
  console.log("textinput props ", props);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", __assign({
    ref: ref,
    type: type,
    className: "w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 ".concat(className || '')
  }, props, {
    value: value
  }));
});
TextInput.displayName = 'TextInput';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInput);

/***/ }),

/***/ "./node_modules/zustand/esm/react.mjs":
/*!********************************************!*\
  !*** ./node_modules/zustand/esm/react.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create: () => (/* binding */ create),
/* harmony export */   useStore: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var zustand_vanilla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/vanilla */ "./node_modules/zustand/esm/vanilla.mjs");



const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = react__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore(
    api.subscribe,
    () => selector(api.getState()),
    () => selector(api.getInitialState())
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = (0,zustand_vanilla__WEBPACK_IMPORTED_MODULE_1__.createStore)(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;




/***/ }),

/***/ "./node_modules/zustand/esm/vanilla.mjs":
/*!**********************************************!*\
  !*** ./node_modules/zustand/esm/vanilla.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createStore: () => (/* binding */ createStore)
/* harmony export */ });
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;




/***/ })

}]);
//# sourceMappingURL=src_routes_onboarding_confirm-email_lazy_jsx.js.map