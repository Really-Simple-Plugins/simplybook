"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_settings_settings_lazy_tsx"],{

/***/ "./src/components/Block/BlockHeading.jsx":
/*!***********************************************!*\
  !*** ./src/components/Block/BlockHeading.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

// @todo move to separate file
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

/***/ "./src/routes/settings/settings.lazy.tsx":
/*!***********************************************!*\
  !*** ./src/routes/settings/settings.lazy.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/link.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/Match.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Block_BlockHeading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Block/BlockHeading */ "./src/components/Block/BlockHeading.jsx");




var Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__.createLazyFileRoute)('/settings/settings')({
  component: Settings
});
function Settings() {
  var linkClassName = 'py-2 px-5 border-l-4  border-transparent [&.active]:border-blue-500 focus:outline-none';
  var navigate = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__.useNavigate)({
    from: '/settings'
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "grid grid-cols-12 grid-rows-5 gap-5 w-full min-h-full",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "col-span-3 bg-white shadow-md rounded-md row-span-4",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Block_BlockHeading__WEBPACK_IMPORTED_MODULE_2__["default"], {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings', 'simplybook'),
        controls: null
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col justify-start",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
          to: "/settings/",
          className: linkClassName,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('General', 'simplybook')
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
          to: "/settings/providers",
          className: linkClassName,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Providers', 'simplybook')
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
          to: "/settings/services",
          className: linkClassName,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Services', 'simplybook')
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
          to: "/settings/design",
          className: linkClassName,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Design', 'simplybook')
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
          to: "/settings/notifications",
          className: linkClassName,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Notifications', 'simplybook')
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
          to: "/settings/custom",
          className: linkClassName,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom', 'simplybook')
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
          to: "/settings/schedule",
          className: linkClassName,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Schedule', 'simplybook')
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
          href: 'https://simplybook.me',
          className: linkClassName,
          children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bookings', 'simplybook'), " (O)"]
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "col-span-6  row-span-4",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__.Outlet, {})
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "col-span-3 rounded-md row-span-4",
      children: "Hello from settings!"
    })]
  });
}

/***/ })

}]);
//# sourceMappingURL=src_routes_settings_settings_lazy_tsx.js.map