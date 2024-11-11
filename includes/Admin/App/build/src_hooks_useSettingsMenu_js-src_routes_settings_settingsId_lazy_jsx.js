"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_hooks_useSettingsMenu_js-src_routes_settings_settingsId_lazy_jsx"],{

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
const API_BASE_PATH = 'simplybook/v1/';

// URLs for the site and AJAX endpoint
const SITE_URL = getSiteUrl('site_url');
const AJAX_URL = getSiteUrl('ajax_url');

// Text domain for SimplyBook translations
const TEXT_DOMAIN = 'simplybook';

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
  if (window.location.protocol === 'https:' && !url.includes('https://')) {
    url = url.replace('http://', 'https://');
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
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])('settings/get_fields', 'POST', {
    withValues
  });
  console.log('getSettingsFields', res);
  return res.data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getSettingsFields);

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

const usesPlainPermalinks = () => _config__WEBPACK_IMPORTED_MODULE_0__.SITE_URL.includes('?');
const glue = () => usesPlainPermalinks() ? '&' : '?';
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
const fetchRequest = async (path, method = 'POST', data = {}, url) => {
  const args = {
    path,
    method,
    data
  };
  console.log(path);
  const test_url = 'simplybook/v1/settings/get_fields';
  console.log(test_url);
  console.log('Fetch: Requesting data from ' + path + ' using ' + method + ' method');
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
const request = async (path, method = 'POST', data = {}) => {
  const args = {
    path,
    method,
    data
  };
  args.path = _config__WEBPACK_IMPORTED_MODULE_3__.API_BASE_PATH + args.path + (0,_helpers_glue__WEBPACK_IMPORTED_MODULE_1__["default"])() + '&token=' + Math.random().toString(36).substring(2, 7);
  args.data = {
    ...data,
    nonce: _config__WEBPACK_IMPORTED_MODULE_3__.NONCE
  };
  console.log('request : ', args);
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

/***/ "./src/components/Blocks/Block.jsx":
/*!*****************************************!*\
  !*** ./src/components/Blocks/Block.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const Block = (0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(({
  className = '',
  children
}) => {
  const classes = `bg-white shadow-md rounded-md  ${className}`;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classes
  }, children);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);

/***/ }),

/***/ "./src/components/Blocks/BlockContent.jsx":
/*!************************************************!*\
  !*** ./src/components/Blocks/BlockContent.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const BlockContent = ({
  children,
  className = 'p-5 pt-0'
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: className
  }, children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockContent);

/***/ }),

/***/ "./src/components/Blocks/BlockHeading.jsx":
/*!************************************************!*\
  !*** ./src/components/Blocks/BlockHeading.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const BlockHeading = ({
  title,
  controls
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "py-4 px-5 flex justify-between items-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "text-base font-bold"
  }, title), controls);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockHeading);

/***/ }),

/***/ "./src/components/Fields/EmailField.jsx":
/*!**********************************************!*\
  !*** ./src/components/Fields/EmailField.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Inputs_TextInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Inputs/TextInput */ "./src/components/Inputs/TextInput.jsx");
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.jsx");




/**
 * TextField component
 * @param {string} label
 * @param {string} value
 * @param {function} onChange
 * @param {object} props
 * @return {JSX.Element}
 * @constructor
 */
const EmailField = ({
  label,
  value,
  onChange,
  ...props
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: label
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_TextInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: 'email',
    value: value,
    onChange: onChange,
    ...props
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmailField);

/***/ }),

/***/ "./src/components/Fields/SwitchField.jsx":
/*!***********************************************!*\
  !*** ./src/components/Fields/SwitchField.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.jsx");
/* harmony import */ var _Inputs_SwitchInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Inputs/SwitchInput */ "./src/components/Inputs/SwitchInput.jsx");




/**
 * TextField component
 * @param {string} label
 * @param {string} value
 * @param {function} onChange
 * @param {object} props
 * @return {JSX.Element}
 * @constructor
 */
const SwitchField = ({
  label,
  value,
  onChange,
  ...props
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_1__["default"], {
    label: label,
    reverseLabel: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_SwitchInput__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: value,
    onChange: onChange,
    ...props
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SwitchField);

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
/* harmony import */ var _Inputs_TextInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Inputs/TextInput */ "./src/components/Inputs/TextInput.jsx");
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.jsx");





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
  // Generate a unique ID for the input if not provided
  const inputId = props.id || field.name;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: label,
    help: help,
    error: fieldState.error?.message,
    context: context,
    className: className,
    inputId: inputId
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_TextInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
    ...field,
    id: inputId,
    type: "text",
    ...props
  }));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextField);

/***/ }),

/***/ "./src/components/Forms/FieldWrapper.jsx":
/*!***********************************************!*\
  !*** ./src/components/Forms/FieldWrapper.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _radix_ui_react_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-label */ "./node_modules/@radix-ui/react-label/dist/index.mjs");



/**
 * FieldWrapper component
 * @param {string} label
 * @param {string} context
 * @param {string} help
 * @param {string} error
 * @param {boolean} reverseLabel
 * @param {string} className
 * @param {string} inputId
 * @param {JSX.Element} children
 */
const FieldWrapper = ({
  label,
  context,
  help,
  error,
  reverseLabel = false,
  className = '',
  inputId,
  children
}) => {
  const colReverse = reverseLabel ? "flex-col-reverse" : "";
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `flex flex-col w-full ${className} pt-4`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `flex w-full flex-col ${colReverse}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_label__WEBPACK_IMPORTED_MODULE_1__.Root, {
    className: "font-medium text-gray-700 cursor-pointer pb-1",
    htmlFor: inputId // Associate the label with the input ID
  }, label), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-xs font-light text-gray-600 pb-1"
  }, help) // Placeholder for the help component
  , children), error && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "w-full text-xs pb-1font-light text-red-600"
  }, error), context && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "w-full pb-1 text-xs font-light text-gray-600"
  }, context));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FieldWrapper);

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
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Fields/TextField */ "./src/components/Fields/TextField.jsx");
/* harmony import */ var _Fields_SwitchField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Fields/SwitchField */ "./src/components/Fields/SwitchField.jsx");
/* harmony import */ var _Fields_EmailField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Fields/EmailField */ "./src/components/Fields/EmailField.jsx");
/* harmony import */ var _components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Common/ErrorBoundary */ "./src/components/Common/ErrorBoundary.jsx");







const fieldComponents = {
  text: _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__["default"],
  api: _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__["default"],
  switch: _Fields_SwitchField__WEBPACK_IMPORTED_MODULE_2__["default"],
  email: _Fields_EmailField__WEBPACK_IMPORTED_MODULE_3__["default"]
};
const FormField = (0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(({
  setting,
  control,
  ...props
}) => {
  if (setting.visible === false) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "hidden",
      value: setting.value || setting.default
    });
  }
  const FieldComponent = fieldComponents[setting.type];
  if (!FieldComponent) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "w-full"
    }, "Unknown field type: ", setting.type, " ", setting.id);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
    name: setting.id // Use setting.id as the name
    ,
    control: control,
    rules: setting.validation,
    defaultValue: setting.value || setting.default,
    render: ({
      field,
      fieldState
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FieldComponent, {
      field: field,
      fieldState: fieldState,
      label: setting.label || setting.id,
      disabled: props.settingsIsUpdating || setting.disabled,
      options: setting.options,
      ...props
    })
  }));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormField);

/***/ }),

/***/ "./src/components/Forms/FormFooter.jsx":
/*!*********************************************!*\
  !*** ./src/components/Forms/FormFooter.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FormScrollProgressLine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormScrollProgressLine */ "./src/components/Forms/FormScrollProgressLine.jsx");
/* harmony import */ var _Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.jsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");






function FormFooter({
  onSubmit,
  control
}) {
  const {
    isDirty,
    isSubmitting,
    isValidating,
    isValid,
    dirtyFields
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useFormState)({
    control
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sticky bg-gray-50 shadow-md rounded-b-md z-10"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FormScrollProgressLine__WEBPACK_IMPORTED_MODULE_1__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-row p-5 justify-end"
  }, isDirty && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You have unsaved changes', 'simplybook')), isSubmitting && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saving...', 'simplybook')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onClick: onSubmit,
    disabled: isSubmitting
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save', 'simplybook'))), "dirtyFields: ", JSON.stringify(dirtyFields));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormFooter);

/***/ }),

/***/ "./src/components/Forms/FormScrollProgressLine.jsx":
/*!*********************************************************!*\
  !*** ./src/components/Forms/FormScrollProgressLine.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const FormScrollProgressLine = () => {
  const [scrollProgress, setScrollProgress] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.round(window.scrollY / scrollable * 100));
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const canScroll = document.documentElement.scrollHeight > window.innerHeight;
  if (!canScroll) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-full bg-gray-200 h-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-blue-500 h-full",
    style: {
      width: `${Math.max(scrollProgress, 10)}%`
    }
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormScrollProgressLine);

/***/ }),

/***/ "./src/components/Inputs/ButtonInput.jsx":
/*!***********************************************!*\
  !*** ./src/components/Inputs/ButtonInput.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/link.js");


const ButtonInput = ({
  children,
  onClick,
  link = {},
  variant = "primary",
  disabled = false,
  ...props
}) => {
  // Base styles for both variants
  const baseStyles = "font-bold py-2 px-6 rounded-md transition-all duration-200";

  // Variants for primary and secondary buttons
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "border border-blue-600 text-blue-600 hover:bg-blue-100 active:bg-blue-200"
  };

  // Disabled styles
  const disabledStyles = "opacity-50 cursor-not-allowed";

  // Final className based on variant and disabled state
  const className = `${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ""}`;
  if (link.to) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.Link, {
      to: link.to,
      className: className,
      ...props,
      onClick: disabled ? e => e.preventDefault() : undefined
    }, children);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: onClick,
    className: className,
    disabled: disabled,
    ...props
  }, children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonInput);

/***/ }),

/***/ "./src/components/Inputs/SwitchInput.jsx":
/*!***********************************************!*\
  !*** ./src/components/Inputs/SwitchInput.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-switch */ "./node_modules/@radix-ui/react-switch/dist/index.mjs");


const SwitchInput = ({
  value,
  onChange,
  onError
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_1__.Root, {
    checked: value,
    onCheckedChange: checked => onChange(checked),
    className: "relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200",
    onError: onError
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_1__.Thumb, {
    className: "inline-block h-4 w-4 transform bg-white rounded-full transition-transform"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SwitchInput);

/***/ }),

/***/ "./src/components/Inputs/TextInput.jsx":
/*!*********************************************!*\
  !*** ./src/components/Inputs/TextInput.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);



/**
 * Styled text input component
 * @param type
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const TextInput = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  type = "text",
  ...props
}, ref) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: type,
    className: " w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring disabled:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 ",
    ...props
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInput);

/***/ }),

/***/ "./src/components/Settings/SettingsGroupBlock.jsx":
/*!********************************************************!*\
  !*** ./src/components/Settings/SettingsGroupBlock.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Blocks_Block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Blocks/Block */ "./src/components/Blocks/Block.jsx");
/* harmony import */ var _Blocks_BlockHeading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Blocks/BlockHeading */ "./src/components/Blocks/BlockHeading.jsx");
/* harmony import */ var _Blocks_BlockContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Blocks/BlockContent */ "./src/components/Blocks/BlockContent.jsx");
/* harmony import */ var _Forms_FormField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Forms/FormField */ "./src/components/Forms/FormField.jsx");






const SettingsGroupBlock = (0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(({
  group,
  currentGroupFields,
  control,
  isLastGroup
}) => {
  const className = isLastGroup ? 'rounded-b-none' : 'mb-5';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Blocks_Block__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: group.id,
    className: className
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Blocks_BlockHeading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: group.title
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Blocks_BlockContent__WEBPACK_IMPORTED_MODULE_3__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-wrap"
  }, currentGroupFields.map(field => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FormField__WEBPACK_IMPORTED_MODULE_4__["default"], {
    setting: field,
    key: field.id,
    control: control
  })))));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsGroupBlock);

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
    queryKey: ['settings_fields'],
    queryFn: () => (0,_api_endpoints_getSettingsFields__WEBPACK_IMPORTED_MODULE_0__["default"])({
      withValues: true
    }),
    staleTime: 1000 * 60 * 5,
    // 5 minutes
    initialData: window.simplybook && window.simplybook.settings_fields,
    retry: 0,
    select: data => [...data] // create a new array so dependencies are updated
  });

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
      queryClient.invalidateQueries(['settings_fields']);
    }
  });
  return {
    settings: query.data,
    saveSettings,
    isSavingSettings,
    invalidateSettings: () => queryClient.invalidateQueries(['settings_fields'])
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSettingsData);

/***/ }),

/***/ "./src/hooks/useSettingsMenu.js":
/*!**************************************!*\
  !*** ./src/hooks/useSettingsMenu.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _routes_settings_$settingsId_lazy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../routes/settings/$settingsId.lazy */ "./src/routes/settings/$settingsId.lazy.jsx");



const useSettingsMenu = () => {
  const {
    settingsId
  } = _routes_settings_$settingsId_lazy__WEBPACK_IMPORTED_MODULE_1__.Route.useParams();
  // Query for fetching settings from server
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
    queryKey: ['settings_menu'],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        // window.simplybook && window.simplybook.settings_menu
        if (window.simplybook && window.simplybook.settings_menu) {
          resolve(window.simplybook.settings_menu);
        }
        reject(new Error('Settings menu not found'));
      });
    },
    initialData: window.simplybook && window.simplybook.settings_menu,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
  const currentForm = query.data.find(section => section.id === settingsId) || {};
  return {
    menu: query.data,
    currentForm,
    menuIsLoading: query.isLoading,
    menuIsError: query.isError
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSettingsMenu);

/***/ }),

/***/ "./src/routes/settings/$settingsId.lazy.jsx":
/*!**************************************************!*\
  !*** ./src/routes/settings/$settingsId.lazy.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _hooks_useSettingsMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useSettingsMenu */ "./src/hooks/useSettingsMenu.js");
/* harmony import */ var _components_Forms_FormField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Forms/FormField */ "./src/components/Forms/FormField.jsx");
/* harmony import */ var _components_Forms_FormFooter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Forms/FormFooter */ "./src/components/Forms/FormFooter.jsx");
/* harmony import */ var _components_Blocks_Block__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Blocks/Block */ "./src/components/Blocks/Block.jsx");
/* harmony import */ var _components_Blocks_BlockHeading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Blocks/BlockHeading */ "./src/components/Blocks/BlockHeading.jsx");
/* harmony import */ var _components_Blocks_BlockContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Blocks/BlockContent */ "./src/components/Blocks/BlockContent.jsx");
/* harmony import */ var _components_Settings_SettingsGroupBlock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Settings/SettingsGroupBlock */ "./src/components/Settings/SettingsGroupBlock.jsx");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/useBlocker.js");













const useSettingsLoader = settingsId => {
  const menuData = window.simplybook?.settings_menu || [];
  const settingsData = menuData.find(item => item.id === settingsId);
  if (!settingsData) {
    throw new Error("Settings not found");
  }
  return {
    settingsData
  };
};

// Route Definition
const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_9__.createLazyFileRoute)("/settings/$settingsId")({
  loader: ({
    params
  }) => useSettingsLoader(params.settingsId),
  component: Settings
});

// Settings Component
function Settings() {
  const {
    settingsId
  } = Route.useParams();
  const {
    settings,
    saveSettings
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const {
    currentForm
  } = (0,_hooks_useSettingsMenu__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const currentFormFields = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => settings.filter(setting => setting.menu_id === settingsId), [settings, settingsId]);
  const currentFormDefaultValues = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => extractFormValuesPerMenuId(settings, settingsId), [settings, settingsId]);
  const currentFormValues = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => extractFormValuesPerMenuId(settings, settingsId, 'value'), [settings, settingsId]);
  const lastGroup = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => currentForm.groups[currentForm.groups.length - 1], [currentForm.groups]);

  // Initialize useForm with default values from the fetched settings data
  const {
    handleSubmit,
    control,
    reset,
    formState: {
      isDirty
    }
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_10__.useForm)({
    defaultValues: currentFormDefaultValues,
    values: currentFormValues
  });
  (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_11__.useBlocker)({
    blockerFn: () => window.confirm('Are you sure you want to leave?'),
    condition: isDirty
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", null, currentForm.groups?.map(group => {
    const isLastGroup = lastGroup.id === group.id;
    const currentGroupFields = currentFormFields.filter(field => field.group_id === group.id);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Settings_SettingsGroupBlock__WEBPACK_IMPORTED_MODULE_8__["default"], {
      key: group.id,
      group: group,
      currentGroupFields: currentGroupFields,
      control: control,
      isLastGroup: isLastGroup
    });
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Forms_FormFooter__WEBPACK_IMPORTED_MODULE_4__["default"], {
    onSubmit: handleSubmit(formData => {
      saveSettings(formData).then(() => {
        reset(currentFormDefaultValues);
      });
    }),
    control: control
  }));
}
const extractFormValuesPerMenuId = (settings, menuId, key = 'default') => {
  // Extract default values from settings data where menu_id ===  settingsId
  const formValues = {};
  settings.forEach(setting => {
    if (setting.menu_id === menuId) {
      formValues[setting.id] = setting[key];
    }
  });
  return formValues;
};

/***/ })

}]);
//# sourceMappingURL=src_hooks_useSettingsMenu_js-src_routes_settings_settingsId_lazy_jsx.js.map