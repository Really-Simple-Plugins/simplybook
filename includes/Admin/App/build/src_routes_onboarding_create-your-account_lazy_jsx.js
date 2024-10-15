"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_onboarding_create-your-account_lazy_jsx"],{

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
/* harmony import */ var _Forms_InputField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Forms/InputField */ "./src/components/Forms/InputField.jsx");




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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_InputField__WEBPACK_IMPORTED_MODULE_2__["default"], {
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
/* harmony import */ var _Forms_InputField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Forms/InputField */ "./src/components/Forms/InputField.jsx");
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Forms_InputField__WEBPACK_IMPORTED_MODULE_1__["default"], {
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

/***/ "./src/components/Forms/InputField.jsx":
/*!*********************************************!*\
  !*** ./src/components/Forms/InputField.jsx ***!
  \*********************************************/
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
 * @param {JSX.Element} children
 * @constructor
 */
const InputField = ({
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
    className: `flex flex-col ${className || ""}`
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputField);

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
  ...props
}) => {
  const className = "bg-red-500 hover:bg-red-700 hover:text-white text-white  text-center font-bold py-2 px-24 rounded-2xl";
  if (link.to) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.Link, {
      to: link.to,
      className: className,
      ...props
    }, children);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: onClick,
    className: className,
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

const TextInput = ({
  type = "text",
  value,
  onChange,
  onError
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: type,
    value: value,
    onChange: e => onChange(e.target.value),
    onError: onError,
    className: "w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring"
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInput);

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
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Inputs_SwitchInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Inputs/SwitchInput */ "./src/components/Inputs/SwitchInput.jsx");
/* harmony import */ var _components_Forms_InputField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Forms/InputField */ "./src/components/Forms/InputField.jsx");
/* harmony import */ var _components_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.jsx");
/* harmony import */ var _components_Fields_EmailField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Fields/EmailField */ "./src/components/Fields/EmailField.jsx");
/* harmony import */ var _components_Fields_SwitchField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Fields/SwitchField */ "./src/components/Fields/SwitchField.jsx");








const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_7__.createLazyFileRoute)("/onboarding/create-your-account")({
  component: () => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-span-4 col-start-3 my-12 flex flex-col text-black"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-6 text-center"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
      className: "text-3xl font-semibold text-black"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Create your free account", "simplybook")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "mt-2 text-base font-light text-black"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("100% free. No credit card needed.", "simplybook"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "flex flex-col"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Fields_EmailField__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Email address", "simplybook"),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("We'll never share your email with anyone else.", "simplybook"),
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter your email address", "simplybook")
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_4__["default"], {
      onClick: () => {},
      link: {
        to: "/onboarding/tips-and-tricks"
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Verify email", "simplybook")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Fields_SwitchField__WEBPACK_IMPORTED_MODULE_6__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("I have read the Terms & Conditions", "simplybook"),
      value: true,
      onChange: () => {}
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "mt-4 text-center text-xs font-light text-gray-600"
    }, "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-span-4 col-start-7 row-span-2 my-12"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
      width: "100%",
      className: "aspect-video",
      src: "https://www.youtube-nocookie.com/embed/adYNTa9Gicw?si=A1cJfYkkfvlE9Yn0",
      title: "YouTube video player",
      frameborder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      referrerpolicy: "strict-origin-when-cross-origin",
      allowfullscreen: true
    })));
  }
});

/***/ })

}]);
//# sourceMappingURL=src_routes_onboarding_create-your-account_lazy_jsx.js.map