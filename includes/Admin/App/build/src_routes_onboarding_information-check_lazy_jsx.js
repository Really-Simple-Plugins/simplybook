"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_onboarding_information-check_lazy_jsx"],{

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
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Inputs_TextInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Inputs/TextInput */ "./src/components/Inputs/TextInput.jsx");
/* harmony import */ var _components_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.jsx");
/* harmony import */ var _components_Fields_TextField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Fields/TextField */ "./src/components/Fields/TextField.jsx");






const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.createLazyFileRoute)('/onboarding/information-check')({
  component: () => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-span-4 col-start-3 row-span-2 my-12 flex flex-col text-black"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-1 text-center"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: " text-base font-light text-black"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Nice to meet you Aert!", "simplybook")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
      className: "mt-2 text-3xl font-semibold text-black"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Is this information correct?", "simplybook"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-8 grid grid-cols-2 gap-3"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Fields_TextField__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "col-span-2",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Company Name", "simplybook"),
      value: "My Business Name"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Fields_TextField__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "col-span-1",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Business Category", "simplybook"),
      value: "My Business Category"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Fields_TextField__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "col-span-1",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Service", "simplybook"),
      value: "My Service"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Fields_TextField__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "col-span-1",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Street", "simplybook"),
      value: "My Street"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Fields_TextField__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "col-span-1",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No.", "simplybook"),
      value: "123"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Fields_TextField__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "col-span-1",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Postal Code", "simplybook"),
      value: "12345"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Fields_TextField__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "col-span-1",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("City", "simplybook"),
      value: "My City"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Fields_TextField__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "col-span-2",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Country", "simplybook"),
      value: "My Country"
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_3__["default"], {
      onClick: () => {},
      link: {
        to: "/onboarding/style-widget"
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Next Step: Styling", "simplybook"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-span-4 col-start-7 py-12"
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
//# sourceMappingURL=src_routes_onboarding_information-check_lazy_jsx.js.map