"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_onboarding_tips-and-tricks_lazy_jsx"],{

/***/ "./src/routes/onboarding/tips-and-tricks.lazy.jsx":
/*!********************************************************!*\
  !*** ./src/routes/onboarding/tips-and-tricks.lazy.jsx ***!
  \********************************************************/
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
/* harmony import */ var _components_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.tsx");




const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__.createLazyFileRoute)('/onboarding/tips-and-tricks')({
  component: () => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-span-4 col-start-3 row-span-2 my-12 flex flex-col text-black"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "my-6 text-center"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
      className: "text-3xl font-semibold text-black"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Tips & Tricks", "simplybook")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "mt-2 text-base font-light text-black"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Get weekly tips & tricks for your business and working with SimplyBook.me\n" + "to book success.", "simplybook"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "grid grid-cols-2 gap-4"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "p-5"
    }, "Review 1"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "p-5"
    }, "Review 2")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "flex flex-col"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_2__["default"], {
      onClick: () => {},
      link: {
        to: "/onboarding/information-check"
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Continue", "simplybook")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "mt-4 text-center text-xs font-light text-gray-600"
    }, "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    btnVariant = _b === void 0 ? "primary" : _b,
    _c = _a.disabled,
    disabled = _c === void 0 ? false : _c,
    props = __rest(_a, ["children", "onClick", "btnVariant", "disabled"]);
  // Base styles for both variants
  var baseStyles = "font-bold py-2 px-6 rounded-md transition-all duration-200";
  // Variants for primary and secondary buttons
  var variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "border border-blue-600 text-blue-600 hover:bg-blue-100 active:bg-blue-200"
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonInput);

/***/ })

}]);
//# sourceMappingURL=src_routes_onboarding_tips-and-tricks_lazy_jsx.js.map