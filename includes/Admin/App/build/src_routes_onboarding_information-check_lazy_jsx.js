"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_onboarding_information-check_lazy_jsx"],{

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
  return await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("onboarding/confirm_email", "POST", {
    data
  });
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
  return await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("onboarding/company_registration", "POST", {
    data
  });
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
  return await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("onboarding/register_email", "POST", {
    data
  });
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

/***/ "./src/components/Common/Icon.jsx":
/*!****************************************!*\
  !*** ./src/components/Common/Icon.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.mjs");




// Map your icons to keys for easy referencing
const iconMap = {
  "square-arrow-up-right": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faSquareArrowUpRight,
  "spinner": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faSpinner,
  "chevron-down": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faChevronDown,
  "chevron-up": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faChevronUp,
  "check": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faCheck
};
const Icon = ({
  name,
  color = "black",
  size = "1x",
  className = "",
  ...props
}) => {
  let icon = iconMap[name];
  if (!icon) {
    console.warn(`Icon "${name}" does not exist in iconMap.`);
    // set circle as default icon
    icon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faCircle;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
    icon: icon,
    size: size,
    className: className,
    ...props
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Icon);

/***/ }),

/***/ "./src/components/Errors/Error.jsx":
/*!*****************************************!*\
  !*** ./src/components/Errors/Error.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


const Error = ({
  error,
  ...props
}) => {
  if (!error) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
    role: "alert"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", {
    className: "font-bold"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Something went wrong!", "simplybook")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "block sm:inline"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, error)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Error);

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
  setting,
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
  setting,
  fieldState,
  label,
  help,
  context,
  className,
  ...props
}, ref) => {
  const inputId = setting.id;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: label,
    help: help,
    error: fieldState?.error?.message,
    context: context,
    className: className,
    inputId: inputId,
    required: props.required
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_CheckboxInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
    id: inputId,
    type: "checkbox",
    "aria-invalid": !!fieldState?.error?.message,
    ...props
  }));
});
CheckboxField.displayName = 'CheckboxField';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckboxField);

/***/ }),

/***/ "./src/components/Fields/ColorPickerField.jsx":
/*!****************************************************!*\
  !*** ./src/components/Fields/ColorPickerField.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Inputs_ColorPicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Inputs/ColorPicker */ "./src/components/Inputs/ColorPicker.tsx");
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.tsx");
/* harmony import */ var _radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-popover */ "./node_modules/@radix-ui/react-popover/dist/index.mjs");






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
const ColorPickerField = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  setting,
  fieldState,
  label,
  help,
  context,
  className,
  onChange,
  defaultValue,
  ...props
}, ref) => {
  const defaultColor = setting.value || setting.default;
  const [color, setColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultColor);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (props.value !== color) {
      setColor(props.value);
    }
  }, [props.value]);
  const ColorPickerElement = ({
    label
  }) => {
    const handleColorChange = (color, event) => {
      setColor(color);
      onChange(color);
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_3__.Root, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_3__.Trigger, {
      className: "p-[5px] mr-2 bg-transparent rounded-md border border-gray-400 min-w-[140px] text-sm"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "cursor-pointer min-w-5 flex p-1.5 gap-3.5 items-center"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "rounded-full min-w-5 h-5 border border-gray-300",
      style: {
        backgroundColor: color
      }
    }), label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_3__.Portal, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_3__.Content, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_ColorPicker__WEBPACK_IMPORTED_MODULE_1__["default"], {
      colorValue: color,
      onChangeComplete: handleColorChange
    }))));
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: "",
    help: help,
    error: fieldState?.error?.message,
    context: context,
    className: className,
    inputId: setting.id,
    required: props.required
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: ""
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPickerElement, {
    setting: setting,
    label: label
  })));
});
ColorPickerField.displayName = "ColorPickerField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPickerField);

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
 * @param {object} setting
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
  setting,
  field,
  fieldState,
  label,
  help,
  context,
  className,
  ...props
}, ref) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_HiddenInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
    ...field,
    id: setting.id,
    type: "hidden",
    "aria-invalid": !!fieldState?.error?.message,
    ...props
  });
});
HiddenField.displayName = 'HiddenField';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HiddenField);

/***/ }),

/***/ "./src/components/Fields/SelectField.jsx":
/*!***********************************************!*\
  !*** ./src/components/Fields/SelectField.jsx ***!
  \***********************************************/
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
const SelectField = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  setting,
  fieldState,
  label,
  help,
  context,
  className,
  options,
  ...props
}, ref) => {
  const inputId = setting.id;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_1__["default"], {
    label: label,
    help: help,
    error: fieldState?.error?.message,
    context: context,
    className: className,
    inputId: inputId,
    required: props.required
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_SelectInput__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: setting.value,
    id: inputId,
    options: options,
    "aria-invalid": !!fieldState?.error?.message,
    setting: setting,
    ...props
  }));
});
SelectField.displayName = "SelectField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectField);

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
  setting,
  fieldState,
  label,
  help,
  context,
  className,
  ...props
}, ref) => {
  const inputId = setting.id;
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
    ...props
  }));
});
TextField.displayName = "TextField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextField);

/***/ }),

/***/ "./src/components/Forms/FormField.js":
/*!*******************************************!*\
  !*** ./src/components/Forms/FormField.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Fields/TextField */ "./src/components/Fields/TextField.jsx");
/* harmony import */ var _Fields_HiddenField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Fields/HiddenField */ "./src/components/Fields/HiddenField.js");
/* harmony import */ var _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Fields/CheckboxField */ "./src/components/Fields/CheckboxField.js");
/* harmony import */ var _Fields_SelectField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Fields/SelectField */ "./src/components/Fields/SelectField.jsx");
/* harmony import */ var _components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Common/ErrorBoundary */ "./src/components/Common/ErrorBoundary.jsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Fields_ColorPickerField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Fields/ColorPickerField */ "./src/components/Fields/ColorPickerField.jsx");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");











const fieldComponents = {
  text: _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__["default"],
  api: _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__["default"],
  hidden: _Fields_HiddenField__WEBPACK_IMPORTED_MODULE_2__["default"],
  checkbox: _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_3__["default"],
  select: _Fields_SelectField__WEBPACK_IMPORTED_MODULE_4__["default"],
  colorpicker: _Fields_ColorPickerField__WEBPACK_IMPORTED_MODULE_7__["default"]
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
  const {
    saveSettings,
    setValue,
    getValue,
    settings
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_8__["default"])();
  if (!FieldComponent) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "w-full"
    }, "Unknown field type: ", setting.type, " ", setting.id);
  }
  const validationRules = {
    ...(setting.required && {
      validate: {
        required: value => !!value || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)("This field is required", "simplybook") // This works for both checkboxes and non-checkboxes
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
  const handleSaveOnChange = async fieldValue => {
    console.log("handleSaveOnChange", setting.id, fieldValue, setting.save_on_change);
    setValue(setting.id, fieldValue);
    if (setting.mapping) {
      //mapping is an array of id's, [id1, id2, id3]
      //loop through the mapping array, and for each id, update it with the same value
      setting.mapping.forEach(id => {
        setValue(id, fieldValue);
      });
    }
    console.log("saving formdata", settings);
    await saveSettings(settings);
  };
  let defaultValue = setting.value || setting.default;
  if (setting.type === "checkbox") {
    defaultValue = defaultValue === "1";
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_5__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_9__.Controller, {
    name: setting.id,
    control: control,
    rules: validationRules,
    defaultValue: defaultValue,
    render: ({
      field,
      fieldState
    }) => {
      (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        let curValue = getValue(setting.id);
        if (curValue === field.value) {
          return;
        }

        //save on change currently only in use in the wizard, so we can prevent saving of empty values
        //which would not be ideal in the settings pages.
        if (setting.save_on_change && field.value.length > 0) {
          handleSaveOnChange(field.value);
        }
      }, [field.value]);
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FieldComponent, {
        className: setting.inline_group ? "inline-flex" : "",
        setting: setting,
        fieldState: fieldState,
        required: setting.required,
        label: setting.label,
        disabled: props.settingsIsUpdating || setting.disabled,
        context: setting.context,
        help: setting.help,
        options: setting.options,
        ...props,
        ...field
      });
    }
  }));
});
FormField.displayName = "FormField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormField);

/***/ }),

/***/ "./src/components/Forms/FormFieldWrapper.jsx":
/*!***************************************************!*\
  !*** ./src/components/Forms/FormFieldWrapper.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FormField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormField */ "./src/components/Forms/FormField.js");




/**
 * The form field wrapper component is created to allow some fields to be grouped, and to be displayed in a row.
 * @param fields
 * @param control
 * @returns {Element}
 * @constructor
 */
const FormFieldWrapper = ({
  fields,
  control
}) => {
  // Group fields by `inline_group`
  const groupedFields = fields.reduce((groups, field) => {
    if (field.inline_group) {
      groups[field.inline_group] = groups[field.inline_group] || [];
      groups[field.inline_group].push(field);
    }
    return groups;
  }, {});
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, fields.filter(field => !field.inline_group).map(field => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FormField__WEBPACK_IMPORTED_MODULE_1__["default"], {
    setting: field,
    key: field.id,
    control: control
  })), Object.entries(groupedFields).map(([groupKey, fields]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-row",
    key: groupKey
  }, fields.map(field => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FormField__WEBPACK_IMPORTED_MODULE_1__["default"], {
    setting: field,
    key: field.id,
    control: control
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormFieldWrapper);

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
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var _Fields_ButtonField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Fields/ButtonField */ "./src/components/Fields/ButtonField.jsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _Forms_FormFieldWrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Forms/FormFieldWrapper */ "./src/components/Forms/FormFieldWrapper.jsx");
/* harmony import */ var _Errors_Error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Errors/Error */ "./src/components/Errors/Error.jsx");










const OnboardingStep = ({
  path,
  title,
  subtitle,
  rightColumn,
  bottomText,
  primaryButton = {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Next", "simplybook")
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
    recaptchaToken,
    apiError,
    setApiError,
    onboardingCompleted
  } = (0,_hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const navigate = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();
  const {
    watch,
    handleSubmit,
    control,
    formState: {
      isDirty,
      errors
    }
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useForm)({
    defaultValues: defaultData,
    values: data,
    mode: "onBlur"
  });
  const currentStep = getCurrentStep(path);
  const [disabled, setDisabled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Update confirmation code in onboarding data. Otherwise the recaptcha code clears the confirmation code
  const formData = watch();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    updateData({
      'confirmation-code': formData['confirmation-code']
    });
  }, [formData['confirmation-code']]);

  //onload of this component, check completed step simplybook.completed_step and navigate to the next step if it's above 0
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let currentStep = getCurrentStepId(path);
    let completedStepNext = parseInt(simplybook.completed_step) + 1;
    if (completedStepNext > 1 && completedStepNext > currentStep) {
      console.log("has completed step, navigate to next step ", completedStepNext);
      console.log(getURLForStep(completedStepNext));
      navigate({
        to: getURLForStep(completedStepNext)
      });
    }
  }, []);
  const onSubmit = async (formData, buttonType = "primary") => {
    setApiError(null);
    setDisabled(true);
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
    await updateData(updatedFormData);
    setDisabled(false);
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
      let currentStep = getCurrentStep(path);

      //if onboarding already completed, skip steps 1, 2 3 and 4, and continue from step 5
      if (currentStep.id <= 4 && onboardingCompleted) {
        navigate({
          to: getURLForStep(5)
        });
      } else {
        navigate({
          to: getURLForStep(getCurrentStepId(path) + 1)
        });
      }
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
  }, subtitle), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Errors_Error__WEBPACK_IMPORTED_MODULE_6__["default"], {
    error: apiError
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-col"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FormFieldWrapper__WEBPACK_IMPORTED_MODULE_5__["default"], {
    fields: currentStep.fields,
    control: control
  }), customHtml, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_ButtonField__WEBPACK_IMPORTED_MODULE_2__["default"], {
    showLoader: disabled,
    btnVariant: "primary",
    label: primaryButton.label,
    context: bottomText,
    disabled: disabled,
    onClick: handleSubmit(data => onSubmit(data, "primary"))
  }), secondaryButton && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_ButtonField__WEBPACK_IMPORTED_MODULE_2__["default"], {
    btnVariant: "tertiary",
    disabled: disabled,
    label: secondaryButton.label,
    onClick: handleSubmit(data => onSubmit(data, "secondary"))
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Errors_Error__WEBPACK_IMPORTED_MODULE_6__["default"], {
    error: apiError
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useMutation.js");
/* harmony import */ var _api_endpoints_onBoarding_registerEmail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerEmail */ "./src/api/endpoints/onBoarding/registerEmail.js");
/* harmony import */ var _api_endpoints_onBoarding_registerTipsTricks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerTipsTricks */ "./src/api/endpoints/onBoarding/registerTipsTricks.js");
/* harmony import */ var _api_endpoints_onBoarding_registerCompany__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerCompany */ "./src/api/endpoints/onBoarding/registerCompany.js");
/* harmony import */ var _api_endpoints_onBoarding_confirmEmail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/endpoints/onBoarding/confirmEmail */ "./src/api/endpoints/onBoarding/confirmEmail.js");
/* harmony import */ var _useSettingsData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);








const useOnboardingData = () => {
  const steps = [{
    id: 1,
    path: "/onboarding/create-your-account",
    fields: [{
      id: "email",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Email", "simplybook"),
      required: true,
      validation: {
        regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Please enter a valid email address", "simplybook")
      }
    }, {
      required: true,
      id: "terms-and-conditions",
      type: "checkbox",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("I agree to the terms and conditions", "simplybook")
    }],
    beforeSubmit: async data => {
      console.log("submit email step");
      let response = await (0,_api_endpoints_onBoarding_registerEmail__WEBPACK_IMPORTED_MODULE_1__["default"])({
        data
      });
      if (response.status !== 'success') {
        console.log("setting api error to ", response.message);
        setApiError(response.message);
        return false;
      }
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
      id: "company_name",
      type: "text",
      label: "Company name"
    }, {
      id: "category",
      type: "select",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Business category", "simplybook"),
      options: [{
        value: "3",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Beauty and wellness", "simplybook")
      }, {
        value: "43",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Sport and fitness", "simplybook")
      }, {
        value: "5",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Personal meetings and services", "simplybook")
      }, {
        value: "1",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Medical", "simplybook")
      }, {
        value: "4",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Events and entertainment", "simplybook")
      }, {
        value: "6",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Education", "simplybook")
      }, {
        value: "75",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Retailers", "simplybook")
      }, {
        value: "7",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Officials", "simplybook")
      }, {
        value: "8",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Other category", "simplybook")
      }]
    }, {
      id: "service",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("What service do you provide?", "simplybook")
    }, {
      id: "phone",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Phone", "simplybook"),
      validation: {
        regex: "^\\+?[0-9\\s\\-().]+$",
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Please enter a valid phone number", "simplybook")
      }
    }, {
      id: "address",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Address", "simplybook")
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
      type: "select",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Country", "simplybook"),
      options: [{
        value: "NL",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Netherlands", "simplybook")
      }, {
        value: "DE",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Germany", "simplybook")
      }, {
        value: "BE",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Belgium", "simplybook")
      }, {
        value: "US",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("United States", "simplybook")
      }]
    }],
    beforeSubmit: async data => {
      console.log("submit information check step");
      console.log(data);
      let response = await (0,_api_endpoints_onBoarding_registerCompany__WEBPACK_IMPORTED_MODULE_3__["default"])({
        data
      });
      console.log("registercompany response ", response);
      if (response.status !== 'success') {
        console.log("setting api error to ", response.message);
        setApiError(response.message);
        return false;
      }
      setApiError("");
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
      let response = await (0,_api_endpoints_onBoarding_confirmEmail__WEBPACK_IMPORTED_MODULE_4__["default"])({
        data
      });
      if (response.status !== 'success') {
        console.log("setting api error to ", response.message);
        setApiError(response.message);
        return false;
      }
      setApiError("");
    }
  }, {
    id: 5,
    path: "/onboarding/style-widget",
    fields: [{
      id: "primary_color",
      type: "colorpicker",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Primary color", "simplybook"),
      default: "#DD3649",
      inline_group: "widget",
      save_on_change: true,
      mapping: ["btn_color_1", "sb_busy", "booking_nav_bg_color"]
    }, {
      id: "secondary_color",
      type: "colorpicker",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Secondary", "simplybook"),
      default: "#DD3649",
      inline_group: "widget",
      save_on_change: true,
      mapping: ["btn_color_2", "sb_available", "sb_base_color"]
    }, {
      id: "sb_selected",
      type: "colorpicker",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Active", "simplybook"),
      default: "#DD3649",
      inline_group: "widget2",
      save_on_change: true
    }, {
      id: "body_bg_color",
      type: "colorpicker",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Background color", "simplybook"),
      default: "#fff",
      inline_group: "widget2",
      save_on_change: true
    }]
  }, {
    id: 6,
    path: "/onboarding/implementation",
    fields: [{
      id: "primary_color",
      type: "colorpicker",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Primary color", "simplybook"),
      default: "#DD3649",
      inline_group: "widget",
      save_on_change: true
    }],
    beforeSubmit: async data => {
      console.log("submit implementation step");
      console.log(data);
    }
  }];
  const [apiError, setApiError] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)("");
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__.useQueryClient)();
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
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__.useQuery)({
    queryKey: ["onboarding_data"],
    initialData: {
      ...initialData,
      ...prefilledData,
      onboardingCompleted: simplybook.is_onboarding_completed // Include onboardingCompleted
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Mutation for updating data
  const {
    mutate: updateData
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__.useMutation)({
    mutationFn: async newData => {
      queryClient.setQueryData(["onboarding_data"], oldData => ({
        ...oldData,
        ...newData
      }));
      queryClient.invalidateQueries(["onboarding_data"]);
    }
  });

  // Mutation for updating onboardingCompleted
  const {
    mutate: updateOnboardingCompleted
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__.useMutation)({
    mutationFn: async completed => {
      // Simulate API update call if needed, otherwise update the cache directly
      queryClient.setQueryData(["onboarding_data"], oldData => ({
        ...oldData,
        onboardingCompleted: completed
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["onboarding_data"]);
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
    }),
    onboardingCompleted: query.data?.onboardingCompleted || false,
    // Use query data
    setOnboardingCompleted: value => updateOnboardingCompleted(value),
    // Use mutation
    apiError,
    setApiError
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useOnboardingData);

/***/ }),

/***/ "./src/routes/onboarding/information-check.lazy.jsx":
/*!**********************************************************!*\
  !*** ./src/routes/onboarding/information-check.lazy.jsx ***!
  \**********************************************************/
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




const path = "/onboarding/information-check";
const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__.createLazyFileRoute)(path)({
  component: () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Onboarding_OnboardingStep__WEBPACK_IMPORTED_MODULE_2__["default"], {
    path: path,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Is this information correct?", "simplybook"),
    subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Nice to meet you %s!", "simplybook").replace('%s', simplybook.first_name),
    buttonLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Next Step: Styling", "simplybook"),
    rightColumn: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "relative w-full aspect-w-16 aspect-h-9"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
      className: "absolute inset-0 w-full h-full",
      src: "https://www.youtube.com/embed/qgMn9dKJAt4",
      title: "How to get started with SimplyBook.me",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      referrerPolicy: "strict-origin-when-cross-origin"
    }))
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
    _d = _a.showLoader,
    showLoader = _d === void 0 ? false : _d,
    _e = _a.size,
    size = _e === void 0 ? "md" : _e,
    props = __rest(_a, ["children", "onClick", "link", "btnVariant", "disabled", "showLoader", "size"]);
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
    checked = _a.checked,
    value = _a.value,
    onChange = _a.onChange,
    props = __rest(_a, ["type", "className", "checked", "value", "onChange"]);
  var handleChange = function (e) {
    console.log('CheckboxInput handleChange', e.target.checked);
    // Call onChange to propagate the event to the Controller
    if (onChange) {
      onChange(e);
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", __assign({
    checked: checked,
    ref: ref,
    onChange: handleChange,
    type: type,
    className: "rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 ".concat(className || "")
  }, props));
});
CheckboxInput.displayName = "CheckboxInput";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckboxInput);

/***/ }),

/***/ "./src/components/Inputs/ColorPicker.tsx":
/*!***********************************************!*\
  !*** ./src/components/Inputs/ColorPicker.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-color */ "./node_modules/react-color/es/index.js");



/**
 * Styled color picker component
 * @param props - Props for the color picker
 * @returns {JSX.Element} The rendered color picker element
 */
var ColorPicker = (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (_a, ref) {
  var _b = _a.colorValue,
    colorValue = _b === void 0 ? "#ffffff" : _b,
    onChangeComplete = _a.onChangeComplete;
  var _c = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(colorValue),
    color = _c[0],
    setColor = _c[1];
  var handleChange = function (color) {
    setColor(color.hex);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    ref: ref,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_color__WEBPACK_IMPORTED_MODULE_2__.ChromePicker, {
      color: color,
      onChange: handleChange,
      onChangeComplete: function (color) {
        return onChangeComplete === null || onChangeComplete === void 0 ? void 0 : onChangeComplete(color.hex);
      },
      disableAlpha: true
    })
  });
});
ColorPicker.displayName = "ColorPicker";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPicker);

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
/* harmony import */ var _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-select */ "./node_modules/@radix-ui/react-select/dist/index.mjs");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _Common_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Icon */ "./src/components/Common/Icon.jsx");
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
    options = _b === void 0 ? [] : _b,
    setting = _a.setting,
    props = __rest(_a, ["value", "onChange", "options", "setting"]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Root, {
    value: value,
    onValueChange: function (value) {
      return onChange(value);
    },
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Trigger, {
      ref: ref,
      className: "flex w-full items-center justify-between rounded-md border border-gray-300 p-2 focus:border-tertiary focus:outline-none focus:ring",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Value, {
        placeholder: "Select an option\u2026"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Icon, {
        className: "ml-2",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
          name: "chevron-down"
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Portal, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Content, {
        className: "rounded-md border border-gray-300 bg-white shadow-lg",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.ScrollUpButton, {
          className: "flex items-center justify-center p-2",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
            name: "chevron-up"
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Viewport, {
          className: "p-2",
          children: options.map(function (option) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectItem, {
              value: option.value,
              children: option.label
            }, option.value);
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.ScrollDownButton, {
          className: "flex items-center justify-center p-2",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
            name: "chevron-down"
          })
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
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Item, __assign({
    ref: ref,
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__.clsx)("flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-100 focus:bg-gray-200", className)
  }, props, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.ItemText, {
      children: children
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.ItemIndicator, {
      className: "ml-2",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
        name: "check"
      }), " "]
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
//# sourceMappingURL=src_routes_onboarding_information-check_lazy_jsx.js.map