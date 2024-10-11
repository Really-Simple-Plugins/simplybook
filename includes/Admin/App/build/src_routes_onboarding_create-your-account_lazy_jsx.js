"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_onboarding_create-your-account_lazy_jsx"],{

/***/ "./src/components/Inputs/Button.jsx":
/*!******************************************!*\
  !*** ./src/components/Inputs/Button.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/link.js");


const Button = ({
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./src/components/Inputs/InputSwitch.jsx":
/*!***********************************************!*\
  !*** ./src/components/Inputs/InputSwitch.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-switch */ "./node_modules/@radix-ui/react-switch/dist/index.mjs");


const InputSwitch = ({
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputSwitch);

/***/ }),

/***/ "./src/components/Inputs/InputText.jsx":
/*!*********************************************!*\
  !*** ./src/components/Inputs/InputText.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const InputText = ({
  value,
  onChange,
  onError
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: value,
    onChange: e => onChange(e.target.value),
    onError: onError,
    className: "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputText);

/***/ }),

/***/ "./src/components/Inputs/InputWrapper.jsx":
/*!************************************************!*\
  !*** ./src/components/Inputs/InputWrapper.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _radix_ui_react_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-label */ "./node_modules/@radix-ui/react-label/dist/index.mjs");



const InputWrapper = ({
  label,
  context,
  help,
  error,
  reverseLabel = false,
  children
}) => {
  const colReverse = reverseLabel ? "flex-col-reverse" : "";
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "my-4 flex flex-col"
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
    className: "w-full flex flex-col"
  }, children)), error && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "w-full text-xs my-1 font-light text-red-600"
  }, error), context && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "w-full my-1 text-xs font-light text-gray-600"
  }, context));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputWrapper);

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
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Inputs_InputText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Inputs/InputText */ "./src/components/Inputs/InputText.jsx");
/* harmony import */ var _components_Inputs_InputSwitch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Inputs/InputSwitch */ "./src/components/Inputs/InputSwitch.jsx");
/* harmony import */ var _components_Inputs_InputWrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Inputs/InputWrapper */ "./src/components/Inputs/InputWrapper.jsx");
/* harmony import */ var _components_Inputs_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Inputs/Button */ "./src/components/Inputs/Button.jsx");







const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__.createLazyFileRoute)("/onboarding/create-your-account")({
  component: () => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-span-5 col-start-2 my-12 flex flex-col text-black"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-6 text-center"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
      className: "text-3xl font-semibold text-black"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Create your free account", "simplybook")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "mt-2 text-base font-light text-black"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("100% free. No credit card needed.", "simplybook"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "flex flex-col"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Inputs_InputWrapper__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Email address", "simplybook")
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Inputs_InputText__WEBPACK_IMPORTED_MODULE_2__["default"], {
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Email address", "simplybook")
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Inputs_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
      onClick: () => {},
      link: {
        to: "/onboarding/tips-and-tricks"
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Verify email", "simplybook")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Inputs_InputWrapper__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("I have read the Terms & Conditions", "simplybook"),
      reverseLabel: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Inputs_InputSwitch__WEBPACK_IMPORTED_MODULE_3__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "mt-4 text-xs text-center font-light text-gray-600"
    }, "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-span-5 col-start-7 my-12"
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