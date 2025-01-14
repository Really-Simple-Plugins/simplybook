"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_hooks_useSettingsMenu_js-src_routes_settings_settingsId_lazy_jsx"],{

/***/ "./src/api/endpoints/getLoginUrl.js":
/*!******************************************!*\
  !*** ./src/api/endpoints/getLoginUrl.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requests/request */ "./src/api/requests/request.js");


/**
 * Update an onboarding step
 * @return {Promise<string>}
 */
const getLoginUrl = async () => {
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("get_login_url", "POST");
  if (!res || !res.data.url) {
    return {
      'url': '',
      'login_url': ''
    };
  }
  return res.data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getLoginUrl);

/***/ }),

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
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");


const BlockContent = ({
  children,
  className = ""
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(className, "p-5 flex-grow")
  }, children);
};
BlockContent.displayName = "BlockContent";
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
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");


const BlockHeading = ({
  title,
  controls,
  className = ""
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(className, "flex items-center justify-between px-5 py-4")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "text-base font-bold"
  }, title), controls);
};
BlockHeading.displayName = "BlockHeading";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockHeading);

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
  "check": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faCheck,
  "info": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faInfoCircle
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
    style: {
      color
    },
    size: size,
    className: className,
    ...props
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Icon);

/***/ }),

/***/ "./src/components/Common/LoginLink.jsx":
/*!*********************************************!*\
  !*** ./src/components/Common/LoginLink.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon */ "./src/components/Common/Icon.jsx");
/* harmony import */ var _api_endpoints_getLoginUrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api/endpoints/getLoginUrl */ "./src/api/endpoints/getLoginUrl.js");
/* harmony import */ var _Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.tsx");
/* harmony import */ var _hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useOnboardingData */ "./src/hooks/useOnboardingData.js");






const LoginLink = ({
  title,
  className,
  page,
  isButton = false,
  btnVariant,
  ...props
}) => {
  const [alreadyLoggedIn, setAlreadyLoggedIn] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [loginUrl, setLoginUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [directUrl, setDirectUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const {
    onboardingCompleted
  } = (0,_hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const loginTo = async (e, page) => {
    e.preventDefault();
    console.log("Get login URL for", page);
    let tempLoginUrl = loginUrl;
    let tempDirectUrl = directUrl;
    if (!alreadyLoggedIn) {
      console.log("Not logged in yet, getting login URL");
      const loginData = await (0,_api_endpoints_getLoginUrl__WEBPACK_IMPORTED_MODULE_2__["default"])();
      console.log("Received login data", loginData);
      tempDirectUrl = loginData.url;
      tempLoginUrl = loginData.login_url;
      setLoginUrl(tempLoginUrl);
      setDirectUrl(tempDirectUrl);
    }
    const finalUrl = alreadyLoggedIn ? `${tempDirectUrl}/${page}` : `${tempLoginUrl}?back_url=/${page}/`;
    console.log("Final URL", finalUrl);

    // Open a new tab with the login URL
    window.open(finalUrl, "_blank");
    window.focus();
    setAlreadyLoggedIn(true);
  };

  // Apply conditional classes
  const externalLinkClass = onboardingCompleted ? "" : "pointer-events-none opacity-50 cursor-not-allowed";
  const combinedClassName = `${externalLinkClass}${className} `;
  if (isButton) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_3__["default"], {
      disabled: false,
      label: title,
      onClick: e => loginTo(e, page),
      className: combinedClassName,
      btnVariant: btnVariant
    }, title);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: `${className} ${externalLinkClass}`,
    onClick: e => loginTo(e, page)
  }, title, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    name: "square-arrow-up-right",
    className: "px-2"
  }));
};
LoginLink.displayName = "LoginLink";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginLink);

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
 * HiddenField component
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

/***/ "./src/components/Fields/ImplementationField.js":
/*!******************************************************!*\
  !*** ./src/components/Fields/ImplementationField.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Inputs_ImplementationInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Inputs/ImplementationInput */ "./src/components/Inputs/ImplementationInput.tsx");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");



const ImplementationField = ({
  options,
  value,
  onChange,
  ...props
}) => {
  let defaultValue = props.setting && props.setting.default ? props.setting.default : "";
  let actualValue = value || defaultValue;
  const {
    setValue,
    invalidateSettings
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const handleChange = async value => {
    await setValue(props.setting.id, value);
    await invalidateSettings();
    onChange(value);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "p-6"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_ImplementationInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
    options: options,
    value: actualValue,
    onChange: value => handleChange(value),
    ...props
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImplementationField);

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
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Fields/TextField */ "./src/components/Fields/TextField.jsx");
/* harmony import */ var _Fields_HiddenField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Fields/HiddenField */ "./src/components/Fields/HiddenField.js");
/* harmony import */ var _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Fields/CheckboxField */ "./src/components/Fields/CheckboxField.js");
/* harmony import */ var _Fields_SelectField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Fields/SelectField */ "./src/components/Fields/SelectField.jsx");
/* harmony import */ var _components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Common/ErrorBoundary */ "./src/components/Common/ErrorBoundary.jsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Fields_ColorPickerField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Fields/ColorPickerField */ "./src/components/Fields/ColorPickerField.jsx");
/* harmony import */ var _Fields_ImplementationField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Fields/ImplementationField */ "./src/components/Fields/ImplementationField.js");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");












const fieldComponents = {
  text: _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__["default"],
  api: _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__["default"],
  hidden: _Fields_HiddenField__WEBPACK_IMPORTED_MODULE_2__["default"],
  checkbox: _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_3__["default"],
  select: _Fields_SelectField__WEBPACK_IMPORTED_MODULE_4__["default"],
  colorpicker: _Fields_ColorPickerField__WEBPACK_IMPORTED_MODULE_7__["default"],
  implementation: _Fields_ImplementationField__WEBPACK_IMPORTED_MODULE_8__["default"]
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
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_9__["default"])();
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_5__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_10__.Controller, {
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
/* harmony import */ var _Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.tsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");





function FormFooter({
  onSubmit,
  control
}) {
  const {
    isDirty,
    isSubmitting,
    isValidating,
    isValid
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useFormState)({
    control
  });
  const formStates = [{
    condition: isSubmitting,
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Saving...", "simplybook"),
    color: "blue"
  }, {
    condition: isValidating,
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Validating...", "simplybook"),
    color: "blue"
  }, {
    condition: !isValid,
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Form contains errors", "simplybook"),
    color: "red"
  }, {
    condition: isDirty,
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("You have unsaved changes", "simplybook"),
    color: "amber"
  }];
  const currentState = formStates.find(state => state.condition);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sticky bottom-0 start-0 z-10 rounded-b-md bg-gray-50 shadow-md"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FormScrollProgressLine__WEBPACK_IMPORTED_MODULE_1__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-row justify-end gap-2 items-center p-5"
  }, currentState && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: `text-sm text-${currentState.color}-500 flex items-center gap-2`
  }, currentState.message), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onClick: onSubmit,
    disabled: isSubmitting || isValidating
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Save", "simplybook"))));
}
FormFooter.displayName = "FormFooter";
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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const canScroll = document.documentElement.scrollHeight > window.innerHeight;
  if (!canScroll) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "h-1 w-full bg-gray-200"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "h-full bg-blue-500",
    style: {
      width: `${Math.max(scrollProgress, 10)}%`
    }
  }));
};
FormScrollProgressLine.displayName = 'FormScrollProgressLine';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormScrollProgressLine);

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
/* harmony import */ var _Blocks_Block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Blocks/Block */ "./src/components/Blocks/Block.tsx");
/* harmony import */ var _Blocks_BlockHeading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Blocks/BlockHeading */ "./src/components/Blocks/BlockHeading.jsx");
/* harmony import */ var _Blocks_BlockContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Blocks/BlockContent */ "./src/components/Blocks/BlockContent.jsx");
/* harmony import */ var _Forms_FormField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Forms/FormField */ "./src/components/Forms/FormField.js");






const SettingsGroupBlock = (0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(({
  group,
  currentGroupFields,
  control,
  isLastGroup
}) => {
  const className = isLastGroup ? "rounded-b-none" : "mb-5";
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
SettingsGroupBlock.displayName = 'SettingsGroupBlock';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsGroupBlock);

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
      id: "implementation",
      type: "implementation",
      label: '',
      default: "generated",
      save_on_change: true,
      options: [{
        value: "generated",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Generated", 'simplybook'),
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Generate pages.", 'simplybook')
      }, {
        value: "manual",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Shortcode", 'simplybook'),
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Do it yourself", 'simplybook')
      }, {
        value: "templates",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Templates", 'simplybook'),
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Premium", 'simplybook'),
        is_premium: true
      }]
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
    queryKey: ["settings_menu"],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        // window.simplybook && window.simplybook.settings_menu
        if (window.simplybook && window.simplybook.settings_menu) {
          resolve(window.simplybook.settings_menu);
        }
        reject(new Error("Settings menu not found"));
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
/* harmony import */ var _components_Forms_FormField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Forms/FormField */ "./src/components/Forms/FormField.js");
/* harmony import */ var _components_Forms_FormFooter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Forms/FormFooter */ "./src/components/Forms/FormFooter.jsx");
/* harmony import */ var _components_Blocks_Block__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Blocks/Block */ "./src/components/Blocks/Block.tsx");
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
  const currentFormValues = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => extractFormValuesPerMenuId(settings, settingsId, "value"), [settings, settingsId]);
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
    blockerFn: () => window.confirm("Are you sure you want to leave?"),
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
      console.log("save settings", formData);
      saveSettings(formData).then(() => {
        reset(currentFormDefaultValues);
      });
    }),
    control: control
  }));
}
const extractFormValuesPerMenuId = (settings, menuId, key = "default") => {
  // Extract default values from settings data where menu_id ===  settingsId
  const formValues = {};
  settings.forEach(setting => {
    if (setting.menu_id === menuId) {
      formValues[setting.id] = setting[key];
    }
  });
  return formValues;
};

/***/ }),

/***/ "./src/components/Blocks/Block.tsx":
/*!*****************************************!*\
  !*** ./src/components/Blocks/Block.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");



var Block = (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(function (_a) {
  var _b = _a.className,
    className = _b === void 0 ? "" : _b,
    children = _a.children;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(className, "bg-white shadow-md rounded-xl flex flex-col"),
    children: children
  });
});
Block.displayName = "Block";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);

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
  //if props.className is not empty, replace className with props.className
  if (props.className) {
    className = props.className;
  }
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

/***/ "./src/components/Inputs/ImplementationInput.tsx":
/*!*******************************************************!*\
  !*** ./src/components/Inputs/ImplementationInput.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Common_LoginLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common/LoginLink */ "./src/components/Common/LoginLink.jsx");



var ImplementationInput = function (_a) {
  var options = _a.options,
    value = _a.value,
    onChange = _a.onChange;
  var handleOnChange = function (e, value, option) {
    e.preventDefault();
    if (option.is_premium) {
      return;
    }
    onChange(value);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "flex gap-4",
    children: options.map(function (option) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        onClick: function (e) {
          return handleOnChange(e, option.value, option);
        },
        className: "relative flex flex-col items-center justify-center p-4 rounded-lg border  text-center \n            transition duration-300 ease-in-out \n            ".concat(option.is_premium ? "bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed" : value === option.value ? "bg-blue-50 border-blue-500 cursor-pointer" : "bg-gray-100 hover:bg-gray-200 border-gray-300 cursor-pointer"),
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "text-lg font-medium",
          children: option.label
        }), option.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "text-sm text-gray-500 mt-1",
          children: option.description
        }), option.is_premium && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "absolute -top-3 -right-5 cursor-pointer",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_LoginLink__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "cursor-pointer",
            isButton: true,
            btnVariant: 'premium',
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Premium', 'simplybook'),
            page: "client"
          })
        })]
      }, option.value);
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImplementationInput);

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
/* harmony import */ var _Common_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common/Icon */ "./src/components/Common/Icon.jsx");
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
 *
 * @todo: tailwind css classes don't seem to work, added inline styles until this is figured out.
 */
var SelectInput = react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(function (_a, ref) {
  var value = _a.value,
    onChange = _a.onChange,
    _b = _a.options,
    options = _b === void 0 ? [] : _b,
    setting = _a.setting,
    props = __rest(_a, ["value", "onChange", "options", "setting"]);
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
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
          name: "chevron-down"
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Portal, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Content, {
        style: {
          width: '100%',
          // Full width
          borderRadius: '0.375rem',
          borderWidth: '1px',
          borderColor: '#D1D5DB',
          backgroundColor: 'white',
          zIndex: 50,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          transitionProperty: 'all',
          transitionTimingFunction: 'ease-in-out',
          transitionDuration: '200ms'
        },
        className: "rounded-md border border-gray-300 bg-white z-50 shadow-lg transition ease-in-out duration-200",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.ScrollUpButton, {
          className: "flex items-center justify-center p-2",
          style: {
            display: 'flex',
            alignItems: 'center',
            // Vertically centers the content
            justifyContent: 'center',
            // Optionally centers horizontally if needed
            margin: '0.5rem' // Adjust the margin for spacing
          },
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
            name: "chevron-up"
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Viewport, {
          className: "p-2 bg-white",
          children: options.map(function (option) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectItem, {
              value: option.value,
              children: option.label
            }, option.value);
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.ScrollDownButton, {
          className: "flex items-center justify-center p-2",
          style: {
            display: 'flex',
            alignItems: 'center',
            // Vertically centers the content
            justifyContent: 'center',
            // Optionally centers horizontally if needed
            margin: '0.5rem' // Adjust the margin for spacing
          },
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
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
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Item, __assign({
    ref: ref,
    className: "flex cursor-pointer items-center justify-between bg-white shadow-lg rounded-md p-2 hover:bg-gray-100 focus:bg-gray-200 " + className,
    style: {
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      borderRadius: '0.375rem',
      padding: '0.5rem',
      width: '100%' // Full width
    }
  }, props, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.ItemText, {
      children: children
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.ItemIndicator, {
      className: "ml-2",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
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
    clickToSelect = _a.clickToSelect,
    props = __rest(_a, ["type", "className", "clickToSelect"]);
  var _c = react__WEBPACK_IMPORTED_MODULE_1___default().useState(""),
    copiedFeedback = _c[0],
    setCopiedFeedback = _c[1];
  var handleClick = function (event) {
    if (clickToSelect) {
      var input = event.target;
      input.select();
      document.execCommand("copy");
      setCopiedFeedback((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Copied!", "simplybook"));
      setTimeout(function () {
        setCopiedFeedback("");
      }, 2000);
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", __assign({
      ref: ref,
      type: type,
      className: "w-full rounded-md border border-gray-300 p-2 focus:border-tertiary focus:outline-none focus:ring disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 ".concat(className || ""),
      onClick: handleClick
    }, props)), copiedFeedback && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "text-green-500 -mt-4",
      children: copiedFeedback
    })]
  });
});
TextInput.displayName = "TextInput";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInput);

/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useBlocker.js":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useBlocker.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Block: () => (/* binding */ Block),
/* harmony export */   useBlocker: () => (/* binding */ useBlocker)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");


function useBlocker(blockerFnOrOpts, condition) {
  const { blockerFn, blockerCondition } = blockerFnOrOpts ? typeof blockerFnOrOpts === "function" ? { blockerFn: blockerFnOrOpts, blockerCondition: condition ?? true } : {
    blockerFn: blockerFnOrOpts.blockerFn,
    blockerCondition: blockerFnOrOpts.condition ?? true
  } : { blockerFn: void 0, blockerCondition: condition ?? true };
  const { history } = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  const [resolver, setResolver] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    status: "idle",
    proceed: () => {
    },
    reset: () => {
    }
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const blockerFnComposed = async () => {
      if (blockerFn) {
        return await blockerFn();
      }
      const promise = new Promise((resolve) => {
        setResolver({
          status: "blocked",
          proceed: () => resolve(true),
          reset: () => resolve(false)
        });
      });
      const canNavigateAsync = await promise;
      setResolver({
        status: "idle",
        proceed: () => {
        },
        reset: () => {
        }
      });
      return canNavigateAsync;
    };
    return !blockerCondition ? void 0 : history.block(blockerFnComposed);
  }, [blockerFn, blockerCondition, history]);
  return resolver;
}
function Block({ blockerFn, condition, children }) {
  const resolver = useBlocker({ blockerFn, condition });
  return children ? typeof children === "function" ? children(resolver) : children : null;
}

//# sourceMappingURL=useBlocker.js.map


/***/ })

}]);
//# sourceMappingURL=src_hooks_useSettingsMenu_js-src_routes_settings_settingsId_lazy_jsx.js.map