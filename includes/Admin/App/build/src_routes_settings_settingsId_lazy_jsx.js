"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_settings_settingsId_lazy_jsx"],{

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

const Block = ({
  className = '',
  children
}) => {
  const classes = `bg-white shadow-md rounded-md  ${className}`;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classes
  }, children);
};
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
  className = 'p-5'
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
 * @param {string} label
 * @param {string} value
 * @param {function} onChange
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 * @constructor
 */
const TextField = ({
  label,
  value,
  onChange,
  className,
  ...props
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: label,
    className: className
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_TextInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
    type: 'text',
    value: value,
    onChange: onChange,
    ...props
  }));
};
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
 * InputWrapper component
  * @param {string} label
 * @param {string} context
 * @param {string} help
 * @param {string} error
 * @param {boolean} reverseLabel
 * @param {string} className
 * @param {JSX.Element} children
 * @constructor
 */
const FieldWrapper = ({
  label,
  context,
  help,
  error,
  reverseLabel = false,
  className,
  children
}) => {
  const colReverse = reverseLabel ? "flex-col-reverse" : "";
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `flex flex-col w-full ${className || ""}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_label__WEBPACK_IMPORTED_MODULE_1__.Root, {
    className: "flex w-full cursor-pointer flex-col " + colReverse
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-full flex gap-1 my-1"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "font-medium text-gray-700"
  }, label), label && help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-xs font-light text-gray-600"
  }, help) // Placeholder for the help component
  ), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-col"
  }, children)), error && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "w-full text-xs my-1 font-light text-red-600"
  }, error), context && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "w-full my-1 text-xs font-light text-gray-600"
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
/* harmony import */ var _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Fields/TextField */ "./src/components/Fields/TextField.jsx");
/* harmony import */ var _Fields_SwitchField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Fields/SwitchField */ "./src/components/Fields/SwitchField.jsx");
/* harmony import */ var _Fields_EmailField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Fields/EmailField */ "./src/components/Fields/EmailField.jsx");
/* harmony import */ var _components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Common/ErrorBoundary */ "./src/components/Common/ErrorBoundary.jsx");





const fieldComponents = {
  text: _Fields_TextField__WEBPACK_IMPORTED_MODULE_1__["default"],
  switch: _Fields_SwitchField__WEBPACK_IMPORTED_MODULE_2__["default"],
  email: _Fields_EmailField__WEBPACK_IMPORTED_MODULE_3__["default"]
};
const FormField = ({
  setting,
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
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Unknown field type: ", setting.type);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FieldComponent, {
    ...props,
    label: setting.label,
    disabled: props.settingsIsUpdating || setting.disabled,
    key: setting.id,
    defaultValue: setting.value || setting.default,
    options: setting.options // For fields like select, radio, etc.
  }));
};
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




function FormFooter({
  isDirty,
  onSubmit
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sticky bg-gray-50 shadow-md rounded-b-md z-10"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FormScrollProgressLine__WEBPACK_IMPORTED_MODULE_1__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-row p-5 justify-end"
  }, isDirty && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You have unsaved changes', 'simplybook')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onClick: onSubmit
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save', 'simplybook'))));
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
const TextInput = ({
  type = "text",
  ...props
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: type,
    className: " w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring disabled:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200 ",
    ...props
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInput);

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
/* harmony import */ var _routes_settings_$settingsId_lazy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../routes/settings/$settingsId.lazy */ "./src/routes/settings/$settingsId.lazy.jsx");



/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useSettingsData = () => {
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();
  const {
    settingsId
  } = _routes_settings_$settingsId_lazy__WEBPACK_IMPORTED_MODULE_0__.Route.useParams();

  // Query for fetching settings from server
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
    queryKey: ['settings_fields'],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        if (window.simplybook && window.simplybook.settings_fields) {
          resolve(window.simplybook.settings_fields);
        }
        reject(new Error('Settings fields not found'));
      });
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Update Mutation for settings data with destructured values
  const {
    mutate: updateSettings,
    isLoading: settingsIsUpdating
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({
    mutationFn: data => {
      console.log('mutate data', data);
      // Simulate async operation
      return new Promise(resolve => setTimeout(resolve, 10000));
    },
    onSuccess: () => {
      // Invalidate cache by specific query key for updated data
      queryClient.invalidateQueries(['settings_fields']);
    }
  });

  // Filtered settings based on the current settingsId
  const currentSettings = query.isFetched ? query.data.filter(setting => setting.menu_id === settingsId) : {};
  console.log('currentSettings', currentSettings);
  // get default values id: value
  // if currentSettings is not empty

  const defaultValues = currentSettings.length > 0 ? currentSettings.reduce((acc, setting) => {
    acc[setting.id] = setting.value || setting.default;
    return acc;
  }, {}) : {};
  console.log('currentSettings', currentSettings);
  console.log('settingsIsUpdating', settingsIsUpdating);
  return {
    settings: query.data,
    currentSettings: currentSettings,
    settingsIsLoading: query.isLoading,
    settingsIsError: query.isError,
    settingsIsUpdating,
    // @todo fix as this does not work
    updateSettings,
    defaultValues
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
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
  const currentSection = query.isFetched && query.data.find(section => section.id === settingsId) || {};
  return {
    menu: query.data,
    currentSection,
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
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _components_Forms_FormFooter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Forms/FormFooter */ "./src/components/Forms/FormFooter.jsx");
/* harmony import */ var _hooks_useSettingsMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useSettingsMenu */ "./src/hooks/useSettingsMenu.js");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _components_Blocks_Block__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Blocks/Block */ "./src/components/Blocks/Block.jsx");
/* harmony import */ var _components_Blocks_BlockHeading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Blocks/BlockHeading */ "./src/components/Blocks/BlockHeading.jsx");
/* harmony import */ var _components_Blocks_BlockContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Blocks/BlockContent */ "./src/components/Blocks/BlockContent.jsx");
/* harmony import */ var _components_Forms_FormField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Forms/FormField */ "./src/components/Forms/FormField.jsx");










const useSettingsLoader = settingsId => {
  const menuData = window.simplybook?.settings_menu || [];
  const settingsData = menuData.find(item => item.id === settingsId);
  if (!settingsData) {
    throw new Error('Settings not found');
  }
  return {
    settingsData
  };
};

// Route Definition
const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_8__.createLazyFileRoute)('/settings/$settingsId')({
  loader: ({
    params
  }) => useSettingsLoader(params.settingsId),
  component: Settings
});

// Settings Component
function Settings() {
  const {
    currentSettings,
    settingsIsLoading,
    updateSettings,
    settingsIsUpdating,
    defaultValues
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_3__["default"])();
  // @todo make sure defaultValues is not empty before using it. I should make it a new component and wrap it in a conditional
  const {
    control,
    handleSubmit,
    reset,
    formState: {
      isDirty
    }
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_9__.useForm)({
    defaultValues
  });
  const {
    menuIsError,
    menuIsLoading,
    currentSection
  } = (0,_hooks_useSettingsMenu__WEBPACK_IMPORTED_MODULE_2__["default"])();
  console.log('defaultValues', defaultValues);
  if (menuIsLoading) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  if (menuIsError) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Error loading settings menu");
  const handleFormSubmit = values => {
    updateSettings(values, {
      onSuccess: () => reset()
    });
  };
  const lastGroup = currentSection.groups[currentSection.groups.length - 1];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, currentSection.groups?.map(group => {
    const isLastGroup = lastGroup.id === group.id;
    const groupSettings = currentSettings.filter(setting => setting.group_id === group.id);
    const className = isLastGroup ? "rounded-b-none" : "mb-5";
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Blocks_Block__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: group.id,
      className: className
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Blocks_BlockHeading__WEBPACK_IMPORTED_MODULE_5__["default"], {
      title: group.title
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Blocks_BlockContent__WEBPACK_IMPORTED_MODULE_6__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "flex flex-wrap"
    }, groupSettings.map(setting => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_9__.Controller, {
      key: setting.id,
      name: setting.id,
      control: control,
      render: ({
        field
      }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Forms_FormField__WEBPACK_IMPORTED_MODULE_7__["default"], {
        setting: setting,
        ...field,
        settingsIsUpdating: settingsIsUpdating
      })
    })))));
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Forms_FormFooter__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isDirty: isDirty,
    onSubmit: handleSubmit(handleFormSubmit)
  }));
}

/***/ })

}]);
//# sourceMappingURL=src_routes_settings_settingsId_lazy_jsx.js.map