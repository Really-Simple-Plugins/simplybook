/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Common/ErrorBoundary.jsx":
/*!*************************************************!*\
  !*** ./src/components/Common/ErrorBoundary.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



class ErrorBoundary extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false
    };
    this.resetError = this.resetError.bind(this);
    this.copyError = this.copyError.bind(this);
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // You can also log the error to an error reporting service
  }
  resetError() {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  }
  copyError() {
    navigator.clipboard.writeText(`${this.state.error && this.state.error.toString()}\nStack trace: ${this.state.errorInfo && this.state.errorInfo.componentStack}`);
    this.setState({
      copied: true
    });
  }
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/React.createElement("div", {
        className: "rounded-md bg-white p-5 text-black shadow-md"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "mb-4 text-xl font-bold text-black"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Uh-oh! We stumbled upon an error.", "simplybook")), /*#__PURE__*/React.createElement("div", {
        className: "mb-6 rounded-sm border bg-gray-50 p-4"
      }, /*#__PURE__*/React.createElement("p", {
        className: "mb-2 text-base text-black"
      }, this.state.error && this.state.error.toString()), /*#__PURE__*/React.createElement("p", {
        className: "max-h-48 overflow-x-scroll text-xs text-black"
      }, "Stack trace:", " ", this.state.errorInfo && this.state.errorInfo.componentStack), /*#__PURE__*/React.createElement("button", {
        className: `mt-4 rounded-md px-4 py-2 font-medium text-white ${this.state.copied ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"} focus:outline-none focus:ring-2 focus:ring-blue-500`,
        onClick: this.copyError
      }, this.state.copied ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Copied", "simplybook") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Copy Error", "simplybook"))), /*#__PURE__*/React.createElement("p", {
        className: "mb-4 text-black"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("We're sorry for the trouble. Please take a moment to report this issue on the WordPress forums so we can work on fixing it. Here’s how you can report the issue:", "simplybook")), /*#__PURE__*/React.createElement("ol", {
        className: "list-inside list-decimal space-y-2 text-black"
      }, /*#__PURE__*/React.createElement("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Copy the error details by clicking the %s button above.", "simplybook"), '"Copy Error"')), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "https://wordpress.org/support/plugin/simplybook/#new-topic-0",
        className: "text-blue-600 underline hover:text-blue-800"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Navigate to the Support Forum.", "simplybook"))), /*#__PURE__*/React.createElement("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("If you haven’t already, log in to your WordPress.org account or create a new account.", "simplybook")), /*#__PURE__*/React.createElement("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Once logged in, click on %s under the Burst Statistics forum.", "simplybook"), '"Create Topic"')), /*#__PURE__*/React.createElement("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Title: Mention %s along with a brief hint of the error.", "simplybook"), "'Error Encountered'")), /*#__PURE__*/React.createElement("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Description: Paste the copied error details and explain what you were doing when the error occurred.", "simplybook")), /*#__PURE__*/React.createElement("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Click %s to post your topic. Our team will look into the issue and provide assistance.", "simplybook"), '"Submit"'))));
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),
  fallback: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node)
};
ErrorBoundary.displayName = "ErrorBoundary";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBoundary);

/***/ }),

/***/ "./src/routes/__root.jsx":
/*!*******************************!*\
  !*** ./src/routes/__root.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/route.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/Match.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Common/ErrorBoundary */ "./src/components/Common/ErrorBoundary.jsx");




const getData = async ({
  queryKey
}) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return false;
};

// Lazy load router devtools
const TanStackRouterDevtools = React.lazy(() => __webpack_require__.e(/*! import() */ "vendors-node_modules_tanstack_router-devtools_dist_esm_index_js").then(__webpack_require__.bind(__webpack_require__, /*! @tanstack/router-devtools */ "./node_modules/@tanstack/router-devtools/dist/esm/index.js")).then(d => ({
  default: d.TanStackRouterDevtools
})));
const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_2__.createRootRoute)({
  component: () => {
    return /*#__PURE__*/React.createElement(_components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/React.createElement(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__.Outlet, null),  true && /*#__PURE__*/React.createElement(React.Suspense, null, /*#__PURE__*/React.createElement(TanStackRouterDevtools, null)));
  }
});

/***/ }),

/***/ "./src/routeTree.gen.ts":
/*!******************************!*\
  !*** ./src/routeTree.gen.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routeTree: () => (/* binding */ routeTree)
/* harmony export */ });
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _routes_root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes/__root */ "./src/routes/__root.jsx");
/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

// Create Virtual Routes
var SettingsLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/settings')();
var OnboardingLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding')();
var IndexLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/')();
var SettingsSettingsIdLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/settings/$settingsId')();
var OnboardingTipsAndTricksLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding/tips-and-tricks')();
var OnboardingStyleWidgetLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding/style-widget')();
var OnboardingInformationCheckLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding/information-check')();
var OnboardingImplementationLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding/implementation')();
var OnboardingCreateYourAccountLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding/create-your-account')();
var OnboardingConfirmEmailLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding/confirm-email')();
// Create/Update Routes
var SettingsLazyRoute = SettingsLazyImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: function () {
    return _routes_root__WEBPACK_IMPORTED_MODULE_0__.Route;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-compiler-runtime_dist_index_js"), __webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_lodash_debounce_i-173c37"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-label_dist_index_mjs-94b30d"), __webpack_require__.e("src_routes_settings_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/settings.lazy */ "./src/routes/settings.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingLazyRoute = OnboardingLazyImport.update({
  id: '/onboarding',
  path: '/onboarding',
  getParentRoute: function () {
    return _routes_root__WEBPACK_IMPORTED_MODULE_0__.Route;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-compiler-runtime_dist_index_js"), __webpack_require__.e("src_routes_onboarding_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding.lazy */ "./src/routes/onboarding.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: function () {
    return _routes_root__WEBPACK_IMPORTED_MODULE_0__.Route;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-compiler-runtime_dist_index_js"), __webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_lodash_debounce_i-173c37"), __webpack_require__.e("src_routes_index_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/index.lazy */ "./src/routes/index.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var SettingsSettingsIdLazyRoute = SettingsSettingsIdLazyImport.update({
  id: '/$settingsId',
  path: '/$settingsId',
  getParentRoute: function () {
    return SettingsLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-compiler-runtime_dist_index_js"), __webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_lodash_debounce_i-173c37"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-label_dist_index_mjs-94b30d"), __webpack_require__.e("src_hooks_useSettingsMenu_js-src_routes_settings_settingsId_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/settings/$settingsId.lazy */ "./src/routes/settings/$settingsId.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingTipsAndTricksLazyRoute = OnboardingTipsAndTricksLazyImport.update({
  id: '/tips-and-tricks',
  path: '/tips-and-tricks',
  getParentRoute: function () {
    return OnboardingLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-compiler-runtime_dist_index_js"), __webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_lodash_debounce_i-173c37"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-label_dist_index_mjs-94b30d"), __webpack_require__.e("src_routes_onboarding_tips-and-tricks_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding/tips-and-tricks.lazy */ "./src/routes/onboarding/tips-and-tricks.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingStyleWidgetLazyRoute = OnboardingStyleWidgetLazyImport.update({
  id: '/style-widget',
  path: '/style-widget',
  getParentRoute: function () {
    return OnboardingLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-compiler-runtime_dist_index_js"), __webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_lodash_debounce_i-173c37"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-label_dist_index_mjs-94b30d"), __webpack_require__.e("src_routes_onboarding_style-widget_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding/style-widget.lazy */ "./src/routes/onboarding/style-widget.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingInformationCheckLazyRoute = OnboardingInformationCheckLazyImport.update({
  id: '/information-check',
  path: '/information-check',
  getParentRoute: function () {
    return OnboardingLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-compiler-runtime_dist_index_js"), __webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_lodash_debounce_i-173c37"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-label_dist_index_mjs-94b30d"), __webpack_require__.e("src_routes_onboarding_information-check_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding/information-check.lazy */ "./src/routes/onboarding/information-check.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingImplementationLazyRoute = OnboardingImplementationLazyImport.update({
  id: '/implementation',
  path: '/implementation',
  getParentRoute: function () {
    return OnboardingLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-compiler-runtime_dist_index_js"), __webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_lodash_debounce_i-173c37"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-label_dist_index_mjs-94b30d"), __webpack_require__.e("src_routes_onboarding_implementation_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding/implementation.lazy */ "./src/routes/onboarding/implementation.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingCreateYourAccountLazyRoute = OnboardingCreateYourAccountLazyImport.update({
  id: '/create-your-account',
  path: '/create-your-account',
  getParentRoute: function () {
    return OnboardingLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-compiler-runtime_dist_index_js"), __webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_lodash_debounce_i-173c37"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-label_dist_index_mjs-94b30d"), __webpack_require__.e("src_routes_onboarding_create-your-account_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding/create-your-account.lazy */ "./src/routes/onboarding/create-your-account.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingConfirmEmailLazyRoute = OnboardingConfirmEmailLazyImport.update({
  id: '/confirm-email',
  path: '/confirm-email',
  getParentRoute: function () {
    return OnboardingLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-compiler-runtime_dist_index_js"), __webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_lodash_debounce_i-173c37"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-label_dist_index_mjs-94b30d"), __webpack_require__.e("src_routes_onboarding_confirm-email_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding/confirm-email.lazy */ "./src/routes/onboarding/confirm-email.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingLazyRouteChildren = {
  OnboardingConfirmEmailLazyRoute: OnboardingConfirmEmailLazyRoute,
  OnboardingCreateYourAccountLazyRoute: OnboardingCreateYourAccountLazyRoute,
  OnboardingImplementationLazyRoute: OnboardingImplementationLazyRoute,
  OnboardingInformationCheckLazyRoute: OnboardingInformationCheckLazyRoute,
  OnboardingStyleWidgetLazyRoute: OnboardingStyleWidgetLazyRoute,
  OnboardingTipsAndTricksLazyRoute: OnboardingTipsAndTricksLazyRoute
};
var OnboardingLazyRouteWithChildren = OnboardingLazyRoute._addFileChildren(OnboardingLazyRouteChildren);
var SettingsLazyRouteChildren = {
  SettingsSettingsIdLazyRoute: SettingsSettingsIdLazyRoute
};
var SettingsLazyRouteWithChildren = SettingsLazyRoute._addFileChildren(SettingsLazyRouteChildren);
var rootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  OnboardingLazyRoute: OnboardingLazyRouteWithChildren,
  SettingsLazyRoute: SettingsLazyRouteWithChildren
};
var routeTree = _routes_root__WEBPACK_IMPORTED_MODULE_0__.Route._addFileChildren(rootRouteChildren)._addFileTypes();
/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/onboarding",
        "/settings"
      ]
    },
    "/": {
      "filePath": "index.lazy.jsx"
    },
    "/onboarding": {
      "filePath": "onboarding.lazy.jsx",
      "children": [
        "/onboarding/confirm-email",
        "/onboarding/create-your-account",
        "/onboarding/implementation",
        "/onboarding/information-check",
        "/onboarding/style-widget",
        "/onboarding/tips-and-tricks"
      ]
    },
    "/settings": {
      "filePath": "settings.lazy.jsx",
      "children": [
        "/settings/$settingsId"
      ]
    },
    "/onboarding/confirm-email": {
      "filePath": "onboarding/confirm-email.lazy.jsx",
      "parent": "/onboarding"
    },
    "/onboarding/create-your-account": {
      "filePath": "onboarding/create-your-account.lazy.jsx",
      "parent": "/onboarding"
    },
    "/onboarding/implementation": {
      "filePath": "onboarding/implementation.lazy.jsx",
      "parent": "/onboarding"
    },
    "/onboarding/information-check": {
      "filePath": "onboarding/information-check.lazy.jsx",
      "parent": "/onboarding"
    },
    "/onboarding/style-widget": {
      "filePath": "onboarding/style-widget.lazy.jsx",
      "parent": "/onboarding"
    },
    "/onboarding/tips-and-tricks": {
      "filePath": "onboarding/tips-and-tricks.lazy.jsx",
      "parent": "/onboarding"
    },
    "/settings/$settingsId": {
      "filePath": "settings/$settingsId.lazy.jsx",
      "parent": "/settings"
    }
  }
}
ROUTE_MANIFEST_END */

/***/ }),

/***/ "./node_modules/jsesc/jsesc.js":
/*!*************************************!*\
  !*** ./node_modules/jsesc/jsesc.js ***!
  \*************************************/
/***/ ((module) => {

"use strict";


const object = {};
const hasOwnProperty = object.hasOwnProperty;
const forOwn = (object, callback) => {
	for (const key in object) {
		if (hasOwnProperty.call(object, key)) {
			callback(key, object[key]);
		}
	}
};

const extend = (destination, source) => {
	if (!source) {
		return destination;
	}
	forOwn(source, (key, value) => {
		destination[key] = value;
	});
	return destination;
};

const forEach = (array, callback) => {
	const length = array.length;
	let index = -1;
	while (++index < length) {
		callback(array[index]);
	}
};

const fourHexEscape = (hex) => {
	return '\\u' + ('0000' + hex).slice(-4);
}

const hexadecimal = (code, lowercase) => {
	let hexadecimal = code.toString(16);
	if (lowercase) return hexadecimal;
	return hexadecimal.toUpperCase();
};

const toString = object.toString;
const isArray = Array.isArray;
const isBuffer = (value) => {
	return typeof Buffer === 'function' && Buffer.isBuffer(value);
};
const isObject = (value) => {
	// This is a very simple check, but it’s good enough for what we need.
	return toString.call(value) == '[object Object]';
};
const isString = (value) => {
	return typeof value == 'string' ||
		toString.call(value) == '[object String]';
};
const isNumber = (value) => {
	return typeof value == 'number' ||
		toString.call(value) == '[object Number]';
};
const isBigInt = (value) => {
  return typeof value == 'bigint';
};
const isFunction = (value) => {
	return typeof value == 'function';
};
const isMap = (value) => {
	return toString.call(value) == '[object Map]';
};
const isSet = (value) => {
	return toString.call(value) == '[object Set]';
};

/*--------------------------------------------------------------------------*/

// https://mathiasbynens.be/notes/javascript-escapes#single
const singleEscapes = {
	'\\': '\\\\',
	'\b': '\\b',
	'\f': '\\f',
	'\n': '\\n',
	'\r': '\\r',
	'\t': '\\t'
	// `\v` is omitted intentionally, because in IE < 9, '\v' == 'v'.
	// '\v': '\\x0B'
};
const regexSingleEscape = /[\\\b\f\n\r\t]/;

const regexDigit = /[0-9]/;
const regexWhitespace = /[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;

const escapeEverythingRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^]/g;
const escapeNonAsciiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^ !#-&\(-\[\]-_a-~]/g;

const jsesc = (argument, options) => {
	const increaseIndentation = () => {
		oldIndent = indent;
		++options.indentLevel;
		indent = options.indent.repeat(options.indentLevel)
	};
	// Handle options
	const defaults = {
		'escapeEverything': false,
		'minimal': false,
		'isScriptContext': false,
		'quotes': 'single',
		'wrap': false,
		'es6': false,
		'json': false,
		'compact': true,
		'lowercaseHex': false,
		'numbers': 'decimal',
		'indent': '\t',
		'indentLevel': 0,
		'__inline1__': false,
		'__inline2__': false
	};
	const json = options && options.json;
	if (json) {
		defaults.quotes = 'double';
		defaults.wrap = true;
	}
	options = extend(defaults, options);
	if (
		options.quotes != 'single' &&
		options.quotes != 'double' &&
		options.quotes != 'backtick'
	) {
		options.quotes = 'single';
	}
	const quote = options.quotes == 'double' ?
		'"' :
		(options.quotes == 'backtick' ?
			'`' :
			'\''
		);
	const compact = options.compact;
	const lowercaseHex = options.lowercaseHex;
	let indent = options.indent.repeat(options.indentLevel);
	let oldIndent = '';
	const inline1 = options.__inline1__;
	const inline2 = options.__inline2__;
	const newLine = compact ? '' : '\n';
	let result;
	let isEmpty = true;
	const useBinNumbers = options.numbers == 'binary';
	const useOctNumbers = options.numbers == 'octal';
	const useDecNumbers = options.numbers == 'decimal';
	const useHexNumbers = options.numbers == 'hexadecimal';

	if (json && argument && isFunction(argument.toJSON)) {
		argument = argument.toJSON();
	}

	if (!isString(argument)) {
		if (isMap(argument)) {
			if (argument.size == 0) {
				return 'new Map()';
			}
			if (!compact) {
				options.__inline1__ = true;
				options.__inline2__ = false;
			}
			return 'new Map(' + jsesc(Array.from(argument), options) + ')';
		}
		if (isSet(argument)) {
			if (argument.size == 0) {
				return 'new Set()';
			}
			return 'new Set(' + jsesc(Array.from(argument), options) + ')';
		}
		if (isBuffer(argument)) {
			if (argument.length == 0) {
				return 'Buffer.from([])';
			}
			return 'Buffer.from(' + jsesc(Array.from(argument), options) + ')';
		}
		if (isArray(argument)) {
			result = [];
			options.wrap = true;
			if (inline1) {
				options.__inline1__ = false;
				options.__inline2__ = true;
			}
			if (!inline2) {
				increaseIndentation();
			}
			forEach(argument, (value) => {
				isEmpty = false;
				if (inline2) {
					options.__inline2__ = false;
				}
				result.push(
					(compact || inline2 ? '' : indent) +
					jsesc(value, options)
				);
			});
			if (isEmpty) {
				return '[]';
			}
			if (inline2) {
				return '[' + result.join(', ') + ']';
			}
			return '[' + newLine + result.join(',' + newLine) + newLine +
				(compact ? '' : oldIndent) + ']';
		} else if (isNumber(argument) || isBigInt(argument)) {
			if (json) {
				// Some number values (e.g. `Infinity`) cannot be represented in JSON.
				// `BigInt` values less than `-Number.MAX_VALUE` or greater than
        // `Number.MAX_VALUE` cannot be represented in JSON so they will become
        // `-Infinity` or `Infinity`, respectively, and then become `null` when
        // stringified.
				return JSON.stringify(Number(argument));
			}

      let result;
			if (useDecNumbers) {
				result = String(argument);
			} else if (useHexNumbers) {
				let hexadecimal = argument.toString(16);
				if (!lowercaseHex) {
					hexadecimal = hexadecimal.toUpperCase();
				}
				result = '0x' + hexadecimal;
			} else if (useBinNumbers) {
				result = '0b' + argument.toString(2);
			} else if (useOctNumbers) {
				result = '0o' + argument.toString(8);
			}

      if (isBigInt(argument)) {
        return result + 'n';
      }
      return result;
		} else if (isBigInt(argument)) {
			if (json) {
				// `BigInt` values less than `-Number.MAX_VALUE` or greater than
        // `Number.MAX_VALUE` will become `-Infinity` or `Infinity`,
        // respectively, and cannot be represented in JSON.
				return JSON.stringify(Number(argument));
			}
      return argument + 'n';
    } else if (!isObject(argument)) {
			if (json) {
				// For some values (e.g. `undefined`, `function` objects),
				// `JSON.stringify(value)` returns `undefined` (which isn’t valid
				// JSON) instead of `'null'`.
				return JSON.stringify(argument) || 'null';
			}
			return String(argument);
		} else { // it’s an object
			result = [];
			options.wrap = true;
			increaseIndentation();
			forOwn(argument, (key, value) => {
				isEmpty = false;
				result.push(
					(compact ? '' : indent) +
					jsesc(key, options) + ':' +
					(compact ? '' : ' ') +
					jsesc(value, options)
				);
			});
			if (isEmpty) {
				return '{}';
			}
			return '{' + newLine + result.join(',' + newLine) + newLine +
				(compact ? '' : oldIndent) + '}';
		}
	}

	const regex = options.escapeEverything ? escapeEverythingRegex : escapeNonAsciiRegex;
	result = argument.replace(regex, (char, pair, lone, quoteChar, index, string) => {
		if (pair) {
			if (options.minimal) return pair;
			const first = pair.charCodeAt(0);
			const second = pair.charCodeAt(1);
			if (options.es6) {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				const codePoint = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
				const hex = hexadecimal(codePoint, lowercaseHex);
				return '\\u{' + hex + '}';
			}
			return fourHexEscape(hexadecimal(first, lowercaseHex)) + fourHexEscape(hexadecimal(second, lowercaseHex));
		}

		if (lone) {
			return fourHexEscape(hexadecimal(lone.charCodeAt(0), lowercaseHex));
		}

		if (
			char == '\0' &&
			!json &&
			!regexDigit.test(string.charAt(index + 1))
		) {
			return '\\0';
		}

		if (quoteChar) {
			if (quoteChar == quote || options.escapeEverything) {
				return '\\' + quoteChar;
			}
			return quoteChar;
		}

		if (regexSingleEscape.test(char)) {
			// no need for a `hasOwnProperty` check here
			return singleEscapes[char];
		}

		if (options.minimal && !regexWhitespace.test(char)) {
			return char;
		}

		const hex = hexadecimal(char.charCodeAt(0), lowercaseHex);
		if (json || hex.length > 2) {
			return fourHexEscape(hex);
		}

		return '\\x' + ('00' + hex).slice(-2);
	});

	if (quote == '`') {
		result = result.replace(/\$\{/g, '\\${');
	}
	if (options.isScriptContext) {
		// https://mathiasbynens.be/notes/etago
		result = result
			.replace(/<\/(script|style)/gi, '<\\/$1')
			.replace(/<!--/g, json ? '\\u003C!--' : '\\x3C!--');
	}
	if (options.wrap) {
		result = quote + result + quote;
	}
	return result;
};

jsesc.version = '3.0.2';

module.exports = jsesc;


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/tiny-warning/dist/tiny-warning.esm.js":
/*!************************************************************!*\
  !*** ./node_modules/tiny-warning/dist/tiny-warning.esm.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var isProduction = "development" === 'production';
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }

    var text = "Warning: " + message;

    if (typeof console !== 'undefined') {
      console.warn(text);
    }

    try {
      throw Error(text);
    } catch (x) {}
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (warning);


/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


 true &&
  (function () {
    function is(x, y) {
      return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
    }
    function useSyncExternalStore$2(subscribe, getSnapshot) {
      didWarnOld18Alpha ||
        void 0 === React.startTransition ||
        ((didWarnOld18Alpha = !0),
        console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
        ));
      var value = getSnapshot();
      if (!didWarnUncachedGetSnapshot) {
        var cachedValue = getSnapshot();
        objectIs(value, cachedValue) ||
          (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ),
          (didWarnUncachedGetSnapshot = !0));
      }
      cachedValue = useState({
        inst: { value: value, getSnapshot: getSnapshot }
      });
      var inst = cachedValue[0].inst,
        forceUpdate = cachedValue[1];
      useLayoutEffect(
        function () {
          inst.value = value;
          inst.getSnapshot = getSnapshot;
          checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
        },
        [subscribe, value, getSnapshot]
      );
      useEffect(
        function () {
          checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
          return subscribe(function () {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
          });
        },
        [subscribe]
      );
      useDebugValue(value);
      return value;
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return !0;
      }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
      return getSnapshot();
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __webpack_require__(/*! react */ "react"),
      objectIs = "function" === typeof Object.is ? Object.is : is,
      useState = React.useState,
      useEffect = React.useEffect,
      useLayoutEffect = React.useLayoutEffect,
      useDebugValue = React.useDebugValue,
      didWarnOld18Alpha = !1,
      didWarnUncachedGetSnapshot = !1,
      shim =
        "undefined" === typeof window ||
        "undefined" === typeof window.document ||
        "undefined" === typeof window.document.createElement
          ? useSyncExternalStore$1
          : useSyncExternalStore$2;
    exports.useSyncExternalStore =
      void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();


/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


 true &&
  (function () {
    function is(x, y) {
      return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __webpack_require__(/*! react */ "react"),
      shim = __webpack_require__(/*! use-sync-external-store/shim */ "./node_modules/use-sync-external-store/shim/index.js"),
      objectIs = "function" === typeof Object.is ? Object.is : is,
      useSyncExternalStore = shim.useSyncExternalStore,
      useRef = React.useRef,
      useEffect = React.useEffect,
      useMemo = React.useMemo,
      useDebugValue = React.useDebugValue;
    exports.useSyncExternalStoreWithSelector = function (
      subscribe,
      getSnapshot,
      getServerSnapshot,
      selector,
      isEqual
    ) {
      var instRef = useRef(null);
      if (null === instRef.current) {
        var inst = { hasValue: !1, value: null };
        instRef.current = inst;
      } else inst = instRef.current;
      instRef = useMemo(
        function () {
          function memoizedSelector(nextSnapshot) {
            if (!hasMemo) {
              hasMemo = !0;
              memoizedSnapshot = nextSnapshot;
              nextSnapshot = selector(nextSnapshot);
              if (void 0 !== isEqual && inst.hasValue) {
                var currentSelection = inst.value;
                if (isEqual(currentSelection, nextSnapshot))
                  return (memoizedSelection = currentSelection);
              }
              return (memoizedSelection = nextSnapshot);
            }
            currentSelection = memoizedSelection;
            if (objectIs(memoizedSnapshot, nextSnapshot))
              return currentSelection;
            var nextSelection = selector(nextSnapshot);
            if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
              return (memoizedSnapshot = nextSnapshot), currentSelection;
            memoizedSnapshot = nextSnapshot;
            return (memoizedSelection = nextSelection);
          }
          var hasMemo = !1,
            memoizedSnapshot,
            memoizedSelection,
            maybeGetServerSnapshot =
              void 0 === getServerSnapshot ? null : getServerSnapshot;
          return [
            function () {
              return memoizedSelector(getSnapshot());
            },
            null === maybeGetServerSnapshot
              ? void 0
              : function () {
                  return memoizedSelector(maybeGetServerSnapshot());
                }
          ];
        },
        [getSnapshot, getServerSnapshot, selector, isEqual]
      );
      var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
      useEffect(
        function () {
          inst.hasValue = !0;
          inst.value = value;
        },
        [value]
      );
      useDebugValue(value);
      return value;
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();


/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/index.js":
/*!************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/index.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js");
}


/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/with-selector.js":
/*!********************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/with-selector.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim/with-selector.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@tanstack/history/dist/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@tanstack/history/dist/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBrowserHistory: () => (/* binding */ createBrowserHistory),
/* harmony export */   createHashHistory: () => (/* binding */ createHashHistory),
/* harmony export */   createHistory: () => (/* binding */ createHistory),
/* harmony export */   createMemoryHistory: () => (/* binding */ createMemoryHistory),
/* harmony export */   parseHref: () => (/* binding */ parseHref)
/* harmony export */ });
const stateIndexKey = "__TSR_index";
const popStateEvent = "popstate";
const beforeUnloadEvent = "beforeunload";
function createHistory(opts) {
  let location = opts.getLocation();
  const subscribers = /* @__PURE__ */ new Set();
  const notify = (action) => {
    location = opts.getLocation();
    subscribers.forEach((subscriber) => subscriber({ location, action }));
  };
  const handleIndexChange = (action) => {
    if (opts.notifyOnIndexChange ?? true) notify(action);
    else location = opts.getLocation();
  };
  const tryNavigation = async ({
    task,
    navigateOpts,
    ...actionInfo
  }) => {
    var _a, _b;
    const ignoreBlocker = (navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false;
    if (ignoreBlocker) {
      task();
      return;
    }
    const blockers = ((_a = opts.getBlockers) == null ? void 0 : _a.call(opts)) ?? [];
    const isPushOrReplace = actionInfo.type === "PUSH" || actionInfo.type === "REPLACE";
    if (typeof document !== "undefined" && blockers.length && isPushOrReplace) {
      for (const blocker of blockers) {
        const nextLocation = parseHref(actionInfo.path, actionInfo.state);
        const isBlocked = await blocker.blockerFn({
          currentLocation: location,
          nextLocation,
          action: actionInfo.type
        });
        if (isBlocked) {
          (_b = opts.onBlocked) == null ? void 0 : _b.call(opts);
          return;
        }
      }
    }
    task();
  };
  return {
    get location() {
      return location;
    },
    get length() {
      return opts.getLength();
    },
    subscribers,
    subscribe: (cb) => {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
    push: (path, state, navigateOpts) => {
      const currentIndex = location.state[stateIndexKey];
      state = assignKeyAndIndex(currentIndex + 1, state);
      tryNavigation({
        task: () => {
          opts.pushState(path, state);
          notify({ type: "PUSH" });
        },
        navigateOpts,
        type: "PUSH",
        path,
        state
      });
    },
    replace: (path, state, navigateOpts) => {
      const currentIndex = location.state[stateIndexKey];
      state = assignKeyAndIndex(currentIndex, state);
      tryNavigation({
        task: () => {
          opts.replaceState(path, state);
          notify({ type: "REPLACE" });
        },
        navigateOpts,
        type: "REPLACE",
        path,
        state
      });
    },
    go: (index, navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.go(index);
          handleIndexChange({ type: "GO", index });
        },
        navigateOpts,
        type: "GO"
      });
    },
    back: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.back((navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false);
          handleIndexChange({ type: "BACK" });
        },
        navigateOpts,
        type: "BACK"
      });
    },
    forward: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.forward((navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false);
          handleIndexChange({ type: "FORWARD" });
        },
        navigateOpts,
        type: "FORWARD"
      });
    },
    canGoBack: () => location.state[stateIndexKey] !== 0,
    createHref: (str) => opts.createHref(str),
    block: (blocker) => {
      var _a;
      if (!opts.setBlockers) return () => {
      };
      const blockers = ((_a = opts.getBlockers) == null ? void 0 : _a.call(opts)) ?? [];
      opts.setBlockers([...blockers, blocker]);
      return () => {
        var _a2, _b;
        const blockers2 = ((_a2 = opts.getBlockers) == null ? void 0 : _a2.call(opts)) ?? [];
        (_b = opts.setBlockers) == null ? void 0 : _b.call(opts, blockers2.filter((b) => b !== blocker));
      };
    },
    flush: () => {
      var _a;
      return (_a = opts.flush) == null ? void 0 : _a.call(opts);
    },
    destroy: () => {
      var _a;
      return (_a = opts.destroy) == null ? void 0 : _a.call(opts);
    },
    notify
  };
}
function assignKeyAndIndex(index, state) {
  if (!state) {
    state = {};
  }
  return {
    ...state,
    key: createRandomKey(),
    [stateIndexKey]: index
  };
}
function createBrowserHistory(opts) {
  var _a;
  const win = (opts == null ? void 0 : opts.window) ?? (typeof document !== "undefined" ? window : void 0);
  const originalPushState = win.history.pushState;
  const originalReplaceState = win.history.replaceState;
  let blockers = [];
  const _getBlockers = () => blockers;
  const _setBlockers = (newBlockers) => blockers = newBlockers;
  const createHref = (opts == null ? void 0 : opts.createHref) ?? ((path) => path);
  const parseLocation = (opts == null ? void 0 : opts.parseLocation) ?? (() => parseHref(
    `${win.location.pathname}${win.location.search}${win.location.hash}`,
    win.history.state
  ));
  if (!((_a = win.history.state) == null ? void 0 : _a.key)) {
    win.history.replaceState(
      {
        [stateIndexKey]: 0,
        key: createRandomKey()
      },
      ""
    );
  }
  let currentLocation = parseLocation();
  let rollbackLocation;
  let nextPopIsGo = false;
  let ignoreNextPop = false;
  let skipBlockerNextPop = false;
  let ignoreNextBeforeUnload = false;
  const getLocation = () => currentLocation;
  let next;
  let scheduled;
  const flush = () => {
    if (!next) {
      return;
    }
    history._ignoreSubscribers = true;
    (next.isPush ? win.history.pushState : win.history.replaceState)(
      next.state,
      "",
      next.href
    );
    history._ignoreSubscribers = false;
    next = void 0;
    scheduled = void 0;
    rollbackLocation = void 0;
  };
  const queueHistoryAction = (type, destHref, state) => {
    const href = createHref(destHref);
    if (!scheduled) {
      rollbackLocation = currentLocation;
    }
    currentLocation = parseHref(destHref, state);
    next = {
      href,
      state,
      isPush: (next == null ? void 0 : next.isPush) || type === "push"
    };
    if (!scheduled) {
      scheduled = Promise.resolve().then(() => flush());
    }
  };
  const onPushPop = (type) => {
    currentLocation = parseLocation();
    history.notify({ type });
  };
  const onPushPopEvent = async () => {
    if (ignoreNextPop) {
      ignoreNextPop = false;
      return;
    }
    const nextLocation = parseLocation();
    const delta = nextLocation.state[stateIndexKey] - currentLocation.state[stateIndexKey];
    const isForward = delta === 1;
    const isBack = delta === -1;
    const isGo = !isForward && !isBack || nextPopIsGo;
    nextPopIsGo = false;
    const action = isGo ? "GO" : isBack ? "BACK" : "FORWARD";
    const notify = isGo ? {
      type: "GO",
      index: delta
    } : {
      type: isBack ? "BACK" : "FORWARD"
    };
    if (skipBlockerNextPop) {
      skipBlockerNextPop = false;
    } else {
      const blockers2 = _getBlockers();
      if (typeof document !== "undefined" && blockers2.length) {
        for (const blocker of blockers2) {
          const isBlocked = await blocker.blockerFn({
            currentLocation,
            nextLocation,
            action
          });
          if (isBlocked) {
            ignoreNextPop = true;
            win.history.go(1);
            history.notify(notify);
            return;
          }
        }
      }
    }
    currentLocation = parseLocation();
    history.notify(notify);
  };
  const onBeforeUnload = (e) => {
    if (ignoreNextBeforeUnload) {
      ignoreNextBeforeUnload = false;
      return;
    }
    let shouldBlock = false;
    const blockers2 = _getBlockers();
    if (typeof document !== "undefined" && blockers2.length) {
      for (const blocker of blockers2) {
        const shouldHaveBeforeUnload = blocker.enableBeforeUnload ?? true;
        if (shouldHaveBeforeUnload === true) {
          shouldBlock = true;
          break;
        }
        if (typeof shouldHaveBeforeUnload === "function" && shouldHaveBeforeUnload() === true) {
          shouldBlock = true;
          break;
        }
      }
    }
    if (shouldBlock) {
      e.preventDefault();
      return e.returnValue = "";
    }
    return;
  };
  const history = createHistory({
    getLocation,
    getLength: () => win.history.length,
    pushState: (href, state) => queueHistoryAction("push", href, state),
    replaceState: (href, state) => queueHistoryAction("replace", href, state),
    back: (ignoreBlocker) => {
      if (ignoreBlocker) skipBlockerNextPop = true;
      ignoreNextBeforeUnload = true;
      return win.history.back();
    },
    forward: (ignoreBlocker) => {
      if (ignoreBlocker) skipBlockerNextPop = true;
      ignoreNextBeforeUnload = true;
      win.history.forward();
    },
    go: (n) => {
      nextPopIsGo = true;
      win.history.go(n);
    },
    createHref: (href) => createHref(href),
    flush,
    destroy: () => {
      win.history.pushState = originalPushState;
      win.history.replaceState = originalReplaceState;
      win.removeEventListener(beforeUnloadEvent, onBeforeUnload, {
        capture: true
      });
      win.removeEventListener(popStateEvent, onPushPopEvent);
    },
    onBlocked: () => {
      if (rollbackLocation && currentLocation !== rollbackLocation) {
        currentLocation = rollbackLocation;
      }
    },
    getBlockers: _getBlockers,
    setBlockers: _setBlockers,
    notifyOnIndexChange: false
  });
  win.addEventListener(beforeUnloadEvent, onBeforeUnload, { capture: true });
  win.addEventListener(popStateEvent, onPushPopEvent);
  win.history.pushState = function(...args) {
    const res = originalPushState.apply(win.history, args);
    if (!history._ignoreSubscribers) onPushPop("PUSH");
    return res;
  };
  win.history.replaceState = function(...args) {
    const res = originalReplaceState.apply(win.history, args);
    if (!history._ignoreSubscribers) onPushPop("REPLACE");
    return res;
  };
  return history;
}
function createHashHistory(opts) {
  const win = (opts == null ? void 0 : opts.window) ?? (typeof document !== "undefined" ? window : void 0);
  return createBrowserHistory({
    window: win,
    parseLocation: () => {
      const hashHref = win.location.hash.split("#").slice(1).join("#") ?? "/";
      return parseHref(hashHref, win.history.state);
    },
    createHref: (href) => `${win.location.pathname}${win.location.search}#${href}`
  });
}
function createMemoryHistory(opts = {
  initialEntries: ["/"]
}) {
  const entries = opts.initialEntries;
  let index = opts.initialIndex ? Math.min(Math.max(opts.initialIndex, 0), entries.length - 1) : entries.length - 1;
  const states = entries.map(
    (_entry, index2) => assignKeyAndIndex(index2, void 0)
  );
  const getLocation = () => parseHref(entries[index], states[index]);
  return createHistory({
    getLocation,
    getLength: () => entries.length,
    pushState: (path, state) => {
      if (index < entries.length - 1) {
        entries.splice(index + 1);
        states.splice(index + 1);
      }
      states.push(state);
      entries.push(path);
      index = Math.max(entries.length - 1, 0);
    },
    replaceState: (path, state) => {
      states[index] = state;
      entries[index] = path;
    },
    back: () => {
      index = Math.max(index - 1, 0);
    },
    forward: () => {
      index = Math.min(index + 1, entries.length - 1);
    },
    go: (n) => {
      index = Math.min(Math.max(index + n, 0), entries.length - 1);
    },
    createHref: (path) => path
  });
}
function parseHref(href, state) {
  const hashIndex = href.indexOf("#");
  const searchIndex = href.indexOf("?");
  return {
    href,
    pathname: href.substring(
      0,
      hashIndex > 0 ? searchIndex > 0 ? Math.min(hashIndex, searchIndex) : hashIndex : searchIndex > 0 ? searchIndex : href.length
    ),
    hash: hashIndex > -1 ? href.substring(hashIndex) : "",
    search: searchIndex > -1 ? href.slice(searchIndex, hashIndex === -1 ? void 0 : hashIndex) : "",
    state: state || { [stateIndexKey]: 0, key: createRandomKey() }
  };
}
function createRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/focusManager.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/focusManager.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusManager: () => (/* binding */ FocusManager),
/* harmony export */   focusManager: () => (/* binding */ focusManager)
/* harmony export */ });
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/focusManager.ts


var FocusManager = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  #focused;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onFocus) => {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    const changed = this.#focused !== focused;
    if (changed) {
      this.#focused = focused;
      this.onFocus();
    }
  }
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  isFocused() {
    if (typeof this.#focused === "boolean") {
      return this.#focused;
    }
    return globalThis.document?.visibilityState !== "hidden";
  }
};
var focusManager = new FocusManager();

//# sourceMappingURL=focusManager.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasNextPage: () => (/* binding */ hasNextPage),
/* harmony export */   hasPreviousPage: () => (/* binding */ hasPreviousPage),
/* harmony export */   infiniteQueryBehavior: () => (/* binding */ infiniteQueryBehavior)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/infiniteQueryBehavior.ts

function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      const options = context.options;
      const direction = context.fetchOptions?.meta?.fetchMore?.direction;
      const oldPages = context.state.data?.pages || [];
      const oldPageParams = context.state.data?.pageParams || [];
      let result = { pages: [], pageParams: [] };
      let currentPage = 0;
      const fetchFn = async () => {
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              if (context.signal.aborted) {
                cancelled = true;
              } else {
                context.signal.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.ensureQueryFn)(context.options, context.fetchOptions);
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject();
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const queryFnContext = {
            client: context.client,
            queryKey: context.queryKey,
            pageParam: param,
            direction: previous ? "backward" : "forward",
            meta: context.options.meta
          };
          addSignalProperty(queryFnContext);
          const page = await queryFn(
            queryFnContext
          );
          const { maxPages } = context.options;
          const addTo = previous ? _utils_js__WEBPACK_IMPORTED_MODULE_0__.addToStart : _utils_js__WEBPACK_IMPORTED_MODULE_0__.addToEnd;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          const remainingPages = pages ?? oldPages.length;
          do {
            const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
            if (currentPage > 0 && param == null) {
              break;
            }
            result = await fetchPage(result, param);
            currentPage++;
          } while (currentPage < remainingPages);
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          return context.options.persister?.(
            fetchFn,
            {
              client: context.client,
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal
            },
            query
          );
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(
    pages[lastIndex],
    pages,
    pageParams[lastIndex],
    pageParams
  ) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}
function hasNextPage(options, data) {
  if (!data)
    return false;
  return getNextPageParam(options, data) != null;
}
function hasPreviousPage(options, data) {
  if (!data || !options.getPreviousPageParam)
    return false;
  return getPreviousPageParam(options, data) != null;
}

//# sourceMappingURL=infiniteQueryBehavior.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/mutation.js":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/mutation.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mutation: () => (/* binding */ Mutation),
/* harmony export */   getDefaultState: () => (/* binding */ getDefaultState)
/* harmony export */ });
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _removable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removable.js */ "./node_modules/@tanstack/query-core/build/modern/removable.js");
/* harmony import */ var _retryer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retryer.js */ "./node_modules/@tanstack/query-core/build/modern/retryer.js");
// src/mutation.ts



var Mutation = class extends _removable_js__WEBPACK_IMPORTED_MODULE_0__.Removable {
  #observers;
  #mutationCache;
  #retryer;
  constructor(config) {
    super();
    this.mutationId = config.mutationId;
    this.#mutationCache = config.mutationCache;
    this.#observers = [];
    this.state = config.state || getDefaultState();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = options;
    this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(observer) {
    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer);
      this.clearGcTimeout();
      this.#mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    this.#observers = this.#observers.filter((x) => x !== observer);
    this.scheduleGc();
    this.#mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!this.#observers.length) {
      if (this.state.status === "pending") {
        this.scheduleGc();
      } else {
        this.#mutationCache.remove(this);
      }
    }
  }
  continue() {
    return this.#retryer?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(variables) {
    this.#retryer = (0,_retryer_js__WEBPACK_IMPORTED_MODULE_1__.createRetryer)({
      fn: () => {
        if (!this.options.mutationFn) {
          return Promise.reject(new Error("No mutationFn found"));
        }
        return this.options.mutationFn(variables);
      },
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" });
      },
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#mutationCache.canRun(this)
    });
    const restored = this.state.status === "pending";
    const isPaused = !this.#retryer.canStart();
    try {
      if (!restored) {
        this.#dispatch({ type: "pending", variables, isPaused });
        await this.#mutationCache.config.onMutate?.(
          variables,
          this
        );
        const context = await this.options.onMutate?.(variables);
        if (context !== this.state.context) {
          this.#dispatch({
            type: "pending",
            context,
            variables,
            isPaused
          });
        }
      }
      const data = await this.#retryer.start();
      await this.#mutationCache.config.onSuccess?.(
        data,
        variables,
        this.state.context,
        this
      );
      await this.options.onSuccess?.(data, variables, this.state.context);
      await this.#mutationCache.config.onSettled?.(
        data,
        null,
        this.state.variables,
        this.state.context,
        this
      );
      await this.options.onSettled?.(data, null, variables, this.state.context);
      this.#dispatch({ type: "success", data });
      return data;
    } catch (error) {
      try {
        await this.#mutationCache.config.onError?.(
          error,
          variables,
          this.state.context,
          this
        );
        await this.options.onError?.(
          error,
          variables,
          this.state.context
        );
        await this.#mutationCache.config.onSettled?.(
          void 0,
          error,
          this.state.variables,
          this.state.context,
          this
        );
        await this.options.onSettled?.(
          void 0,
          error,
          variables,
          this.state.context
        );
        throw error;
      } finally {
        this.#dispatch({ type: "error", error });
      }
    } finally {
      this.#mutationCache.runNext(this);
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "pending":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: action.isPaused,
            status: "pending",
            variables: action.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
      }
    };
    this.state = reducer(this.state);
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.#observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.#mutationCache.notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}

//# sourceMappingURL=mutation.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/mutationCache.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/mutationCache.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MutationCache: () => (/* binding */ MutationCache)
/* harmony export */ });
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _mutation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutation.js */ "./node_modules/@tanstack/query-core/build/modern/mutation.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
// src/mutationCache.ts




var MutationCache = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#mutations = /* @__PURE__ */ new Set();
    this.#scopes = /* @__PURE__ */ new Map();
    this.#mutationId = 0;
  }
  #mutations;
  #scopes;
  #mutationId;
  build(client, options, state) {
    const mutation = new _mutation_js__WEBPACK_IMPORTED_MODULE_1__.Mutation({
      mutationCache: this,
      mutationId: ++this.#mutationId,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    this.#mutations.add(mutation);
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const scopedMutations = this.#scopes.get(scope);
      if (scopedMutations) {
        scopedMutations.push(mutation);
      } else {
        this.#scopes.set(scope, [mutation]);
      }
    }
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    if (this.#mutations.delete(mutation)) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const scopedMutations = this.#scopes.get(scope);
        if (scopedMutations) {
          if (scopedMutations.length > 1) {
            const index = scopedMutations.indexOf(mutation);
            if (index !== -1) {
              scopedMutations.splice(index, 1);
            }
          } else if (scopedMutations[0] === mutation) {
            this.#scopes.delete(scope);
          }
        }
      }
    }
    this.notify({ type: "removed", mutation });
  }
  canRun(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const mutationsWithSameScope = this.#scopes.get(scope);
      const firstPendingMutation = mutationsWithSameScope?.find(
        (m) => m.state.status === "pending"
      );
      return !firstPendingMutation || firstPendingMutation === mutation;
    } else {
      return true;
    }
  }
  runNext(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const foundMutation = this.#scopes.get(scope)?.find((m) => m !== mutation && m.state.isPaused);
      return foundMutation?.continue() ?? Promise.resolve();
    } else {
      return Promise.resolve();
    }
  }
  clear() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.#mutations.forEach((mutation) => {
        this.notify({ type: "removed", mutation });
      });
      this.#mutations.clear();
      this.#scopes.clear();
    });
  }
  getAll() {
    return Array.from(this.#mutations);
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (mutation) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(defaultedFilters, mutation)
    );
  }
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(filters, mutation));
  }
  notify(event) {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(
      () => Promise.all(
        pausedMutations.map((mutation) => mutation.continue().catch(_utils_js__WEBPACK_IMPORTED_MODULE_3__.noop))
      )
    );
  }
};
function scopeFor(mutation) {
  return mutation.options.scope?.id;
}

//# sourceMappingURL=mutationCache.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/notifyManager.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNotifyManager: () => (/* binding */ createNotifyManager),
/* harmony export */   notifyManager: () => (/* binding */ notifyManager)
/* harmony export */ });
// src/notifyManager.ts
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = (cb) => setTimeout(cb, 0);
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  return {
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush();
        }
      }
      return result;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    schedule,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
var notifyManager = createNotifyManager();

//# sourceMappingURL=notifyManager.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/onlineManager.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/onlineManager.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OnlineManager: () => (/* binding */ OnlineManager),
/* harmony export */   onlineManager: () => (/* binding */ onlineManager)
/* harmony export */ });
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/onlineManager.ts


var OnlineManager = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  #online = true;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onOnline) => {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isServer && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup(this.setOnline.bind(this));
  }
  setOnline(online) {
    const changed = this.#online !== online;
    if (changed) {
      this.#online = online;
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return this.#online;
  }
};
var onlineManager = new OnlineManager();

//# sourceMappingURL=onlineManager.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/query.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/query.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Query: () => (/* binding */ Query),
/* harmony export */   fetchState: () => (/* binding */ fetchState)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _retryer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retryer.js */ "./node_modules/@tanstack/query-core/build/modern/retryer.js");
/* harmony import */ var _removable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removable.js */ "./node_modules/@tanstack/query-core/build/modern/removable.js");
// src/query.ts




var Query = class extends _removable_js__WEBPACK_IMPORTED_MODULE_0__.Removable {
  #initialState;
  #revertState;
  #cache;
  #client;
  #retryer;
  #defaultOptions;
  #abortSignalConsumed;
  constructor(config) {
    super();
    this.#abortSignalConsumed = false;
    this.#defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.#client = config.client;
    this.#cache = this.#client.getQueryCache();
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.#initialState = getDefaultState(this.options);
    this.state = config.state ?? this.#initialState;
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    return this.#retryer?.promise;
  }
  setOptions(options) {
    this.options = { ...this.#defaultOptions, ...options };
    this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      this.#cache.remove(this);
    }
  }
  setData(newData, options) {
    const data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.replaceData)(this.state.data, newData, this.options);
    this.#dispatch({
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    this.#dispatch({ type: "setState", state, setStateOptions });
  }
  cancel(options) {
    const promise = this.#retryer?.promise;
    this.#retryer?.cancel(options);
    return promise ? promise.then(_utils_js__WEBPACK_IMPORTED_MODULE_1__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_1__.noop) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  reset() {
    this.destroy();
    this.setState(this.#initialState);
  }
  isActive() {
    return this.observers.some(
      (observer) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.resolveEnabled)(observer.options.enabled, this) !== false
    );
  }
  isDisabled() {
    if (this.getObserversCount() > 0) {
      return !this.isActive();
    }
    return this.options.queryFn === _utils_js__WEBPACK_IMPORTED_MODULE_1__.skipToken || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStale() {
    if (this.state.isInvalidated) {
      return true;
    }
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => observer.getCurrentResult().isStale
      );
    }
    return this.state.data === void 0;
  }
  isStaleByTime(staleTime = 0) {
    return this.state.isInvalidated || this.state.data === void 0 || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.timeUntilStale)(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  onOnline() {
    const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.#cache.notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x) => x !== observer);
      if (!this.observers.length) {
        if (this.#retryer) {
          if (this.#abortSignalConsumed) {
            this.#retryer.cancel({ revert: true });
          } else {
            this.#retryer.cancelRetry();
          }
        }
        this.scheduleGc();
      }
      this.#cache.notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      this.#dispatch({ type: "invalidate" });
    }
  }
  fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle") {
      if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) {
        this.cancel({ silent: true });
      } else if (this.#retryer) {
        this.#retryer.continueRetry();
        return this.#retryer.promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    if (true) {
      if (!Array.isArray(this.options.queryKey)) {
        console.error(
          `As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`
        );
      }
    }
    const abortController = new AbortController();
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          this.#abortSignalConsumed = true;
          return abortController.signal;
        }
      });
    };
    const fetchFn = () => {
      const queryFn = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.ensureQueryFn)(this.options, fetchOptions);
      const queryFnContext = {
        client: this.#client,
        queryKey: this.queryKey,
        meta: this.meta
      };
      addSignalProperty(queryFnContext);
      this.#abortSignalConsumed = false;
      if (this.options.persister) {
        return this.options.persister(
          queryFn,
          queryFnContext,
          this
        );
      }
      return queryFn(queryFnContext);
    };
    const context = {
      fetchOptions,
      options: this.options,
      queryKey: this.queryKey,
      client: this.#client,
      state: this.state,
      fetchFn
    };
    addSignalProperty(context);
    this.options.behavior?.onFetch(
      context,
      this
    );
    this.#revertState = this.state;
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
      this.#dispatch({ type: "fetch", meta: context.fetchOptions?.meta });
    }
    const onError = (error) => {
      if (!((0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error) && error.silent)) {
        this.#dispatch({
          type: "error",
          error
        });
      }
      if (!(0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error)) {
        this.#cache.config.onError?.(
          error,
          this
        );
        this.#cache.config.onSettled?.(
          this.state.data,
          error,
          this
        );
      }
      this.scheduleGc();
    };
    this.#retryer = (0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.createRetryer)({
      initialPromise: fetchOptions?.initialPromise,
      fn: context.fetchFn,
      abort: abortController.abort.bind(abortController),
      onSuccess: (data) => {
        if (data === void 0) {
          if (true) {
            console.error(
              `Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`
            );
          }
          onError(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        try {
          this.setData(data);
        } catch (error) {
          onError(error);
          return;
        }
        this.#cache.config.onSuccess?.(data, this);
        this.#cache.config.onSettled?.(
          data,
          this.state.error,
          this
        );
        this.scheduleGc();
      },
      onError,
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true
    });
    return this.#retryer.start();
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            ...fetchState(state.data, this.options),
            fetchMeta: action.meta ?? null
          };
        case "success":
          return {
            ...state,
            data: action.data,
            dataUpdateCount: state.dataUpdateCount + 1,
            dataUpdatedAt: action.dataUpdatedAt ?? Date.now(),
            error: null,
            isInvalidated: false,
            status: "success",
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
        case "error":
          const error = action.error;
          if ((0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error) && error.revert && this.#revertState) {
            return { ...this.#revertState, fetchStatus: "idle" };
          }
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error"
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate();
      });
      this.#cache.notify({ query: this, type: "updated", action });
    });
  }
};
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: (0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.canFetch)(options.networkMode) ? "fetching" : "paused",
    ...data === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== void 0;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}

//# sourceMappingURL=query.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/queryCache.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/queryCache.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryCache: () => (/* binding */ QueryCache)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _query_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query.js */ "./node_modules/@tanstack/query-core/build/modern/query.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
// src/queryCache.ts




var QueryCache = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#queries = /* @__PURE__ */ new Map();
  }
  #queries;
  build(client, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hashQueryKeyByOptions)(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new _query_js__WEBPACK_IMPORTED_MODULE_2__.Query({
        client,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = this.#queries.get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) {
        this.#queries.delete(query.queryHash);
      }
      this.notify({ type: "removed", query });
    }
  }
  clear() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return this.#queries.get(queryHash);
  }
  getAll() {
    return [...this.#queries.values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (query) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(defaultedFilters, query)
    );
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(filters, query)) : queries;
  }
  notify(event) {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
};

//# sourceMappingURL=queryCache.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/queryClient.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/queryClient.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClient: () => (/* binding */ QueryClient)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _queryCache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./queryCache.js */ "./node_modules/@tanstack/query-core/build/modern/queryCache.js");
/* harmony import */ var _mutationCache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutationCache.js */ "./node_modules/@tanstack/query-core/build/modern/mutationCache.js");
/* harmony import */ var _focusManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./focusManager.js */ "./node_modules/@tanstack/query-core/build/modern/focusManager.js");
/* harmony import */ var _onlineManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./onlineManager.js */ "./node_modules/@tanstack/query-core/build/modern/onlineManager.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./infiniteQueryBehavior.js */ "./node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js");
// src/queryClient.ts







var QueryClient = class {
  #queryCache;
  #mutationCache;
  #defaultOptions;
  #queryDefaults;
  #mutationDefaults;
  #mountCount;
  #unsubscribeFocus;
  #unsubscribeOnline;
  constructor(config = {}) {
    this.#queryCache = config.queryCache || new _queryCache_js__WEBPACK_IMPORTED_MODULE_0__.QueryCache();
    this.#mutationCache = config.mutationCache || new _mutationCache_js__WEBPACK_IMPORTED_MODULE_1__.MutationCache();
    this.#defaultOptions = config.defaultOptions || {};
    this.#queryDefaults = /* @__PURE__ */ new Map();
    this.#mutationDefaults = /* @__PURE__ */ new Map();
    this.#mountCount = 0;
  }
  mount() {
    this.#mountCount++;
    if (this.#mountCount !== 1)
      return;
    this.#unsubscribeFocus = _focusManager_js__WEBPACK_IMPORTED_MODULE_2__.focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations();
        this.#queryCache.onFocus();
      }
    });
    this.#unsubscribeOnline = _onlineManager_js__WEBPACK_IMPORTED_MODULE_3__.onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations();
        this.#queryCache.onOnline();
      }
    });
  }
  unmount() {
    this.#mountCount--;
    if (this.#mountCount !== 0)
      return;
    this.#unsubscribeFocus?.();
    this.#unsubscribeFocus = void 0;
    this.#unsubscribeOnline?.();
    this.#unsubscribeOnline = void 0;
  }
  isFetching(filters) {
    return this.#queryCache.findAll({ ...filters, fetchStatus: "fetching" }).length;
  }
  isMutating(filters) {
    return this.#mutationCache.findAll({ ...filters, status: "pending" }).length;
  }
  getQueryData(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(options.queryHash)?.state.data;
  }
  ensureQueryData(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    const query = this.#queryCache.build(this, defaultedOptions);
    const cachedData = query.state.data;
    if (cachedData === void 0) {
      return this.fetchQuery(options);
    }
    if (options.revalidateIfStale && query.isStaleByTime((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.resolveStaleTime)(defaultedOptions.staleTime, query))) {
      void this.prefetchQuery(defaultedOptions);
    }
    return Promise.resolve(cachedData);
  }
  getQueriesData(filters) {
    return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const query = this.#queryCache.get(
      defaultedOptions.queryHash
    );
    const prevData = query?.state.data;
    const data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.functionalUpdate)(updater, prevData);
    if (data === void 0) {
      return void 0;
    }
    return this.#queryCache.build(this, defaultedOptions).setData(data, { ...options, manual: true });
  }
  setQueriesData(filters, updater, options) {
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(
      () => this.#queryCache.findAll(filters).map(({ queryKey }) => [
        queryKey,
        this.setQueryData(queryKey, updater, options)
      ])
    );
  }
  getQueryState(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(
      options.queryHash
    )?.state;
  }
  removeQueries(filters) {
    const queryCache = this.#queryCache;
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(filters, options) {
    const queryCache = this.#queryCache;
    const refetchFilters = {
      type: "active",
      ...filters
    };
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(refetchFilters, options);
    });
  }
  cancelQueries(filters, cancelOptions = {}) {
    const defaultedCancelOptions = { revert: true, ...cancelOptions };
    const promises = _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(
      () => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
    );
    return Promise.all(promises).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  invalidateQueries(filters, options = {}) {
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      this.#queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters?.refetchType === "none") {
        return Promise.resolve();
      }
      const refetchFilters = {
        ...filters,
        type: filters?.refetchType ?? filters?.type ?? "active"
      };
      return this.refetchQueries(refetchFilters, options);
    });
  }
  refetchQueries(filters, options = {}) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options.cancelRefetch ?? true
    };
    const promises = _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(
      () => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled()).map((query) => {
        let promise = query.fetch(void 0, fetchOptions);
        if (!fetchOptions.throwOnError) {
          promise = promise.catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
        }
        return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
      })
    );
    return Promise.all(promises).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) {
      defaultedOptions.retry = false;
    }
    const query = this.#queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.resolveStaleTime)(defaultedOptions.staleTime, query)
    ) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  fetchInfiniteQuery(options) {
    options.behavior = (0,_infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__.infiniteQueryBehavior)(options.pages);
    return this.fetchQuery(options);
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  ensureInfiniteQueryData(options) {
    options.behavior = (0,_infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__.infiniteQueryBehavior)(options.pages);
    return this.ensureQueryData(options);
  }
  resumePausedMutations() {
    if (_onlineManager_js__WEBPACK_IMPORTED_MODULE_3__.onlineManager.isOnline()) {
      return this.#mutationCache.resumePausedMutations();
    }
    return Promise.resolve();
  }
  getQueryCache() {
    return this.#queryCache;
  }
  getMutationCache() {
    return this.#mutationCache;
  }
  getDefaultOptions() {
    return this.#defaultOptions;
  }
  setDefaultOptions(options) {
    this.#defaultOptions = options;
  }
  setQueryDefaults(queryKey, options) {
    this.#queryDefaults.set((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.hashKey)(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  getQueryDefaults(queryKey) {
    const defaults = [...this.#queryDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.partialMatchKey)(queryKey, queryDefault.queryKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  setMutationDefaults(mutationKey, options) {
    this.#mutationDefaults.set((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.hashKey)(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  getMutationDefaults(mutationKey) {
    const defaults = [...this.#mutationDefaults.values()];
    let result = {};
    defaults.forEach((queryDefault) => {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.partialMatchKey)(mutationKey, queryDefault.mutationKey)) {
        result = { ...result, ...queryDefault.defaultOptions };
      }
    });
    return result;
  }
  defaultQueryOptions(options) {
    if (options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...this.#defaultOptions.queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) {
      defaultedOptions.queryHash = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.hashQueryKeyByOptions)(
        defaultedOptions.queryKey,
        defaultedOptions
      );
    }
    if (defaultedOptions.refetchOnReconnect === void 0) {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (defaultedOptions.throwOnError === void 0) {
      defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    }
    if (!defaultedOptions.networkMode && defaultedOptions.persister) {
      defaultedOptions.networkMode = "offlineFirst";
    }
    if (defaultedOptions.queryFn === _utils_js__WEBPACK_IMPORTED_MODULE_4__.skipToken) {
      defaultedOptions.enabled = false;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options?._defaulted) {
      return options;
    }
    return {
      ...this.#defaultOptions.mutations,
      ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    this.#queryCache.clear();
    this.#mutationCache.clear();
  }
};

//# sourceMappingURL=queryClient.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/removable.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/removable.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Removable: () => (/* binding */ Removable)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/removable.ts

var Removable = class {
  #gcTimeout;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isValidTimeout)(this.gcTime)) {
      this.#gcTimeout = setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime);
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isServer ? Infinity : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    if (this.#gcTimeout) {
      clearTimeout(this.#gcTimeout);
      this.#gcTimeout = void 0;
    }
  }
};

//# sourceMappingURL=removable.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/retryer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/retryer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CancelledError: () => (/* binding */ CancelledError),
/* harmony export */   canFetch: () => (/* binding */ canFetch),
/* harmony export */   createRetryer: () => (/* binding */ createRetryer),
/* harmony export */   isCancelledError: () => (/* binding */ isCancelledError)
/* harmony export */ });
/* harmony import */ var _focusManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./focusManager.js */ "./node_modules/@tanstack/query-core/build/modern/focusManager.js");
/* harmony import */ var _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./onlineManager.js */ "./node_modules/@tanstack/query-core/build/modern/onlineManager.js");
/* harmony import */ var _thenable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./thenable.js */ "./node_modules/@tanstack/query-core/build/modern/thenable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/retryer.ts




function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__.onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError");
    this.revert = options?.revert;
    this.silent = options?.silent;
  }
};
function isCancelledError(value) {
  return value instanceof CancelledError;
}
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let isResolved = false;
  let continueFn;
  const thenable = (0,_thenable_js__WEBPACK_IMPORTED_MODULE_1__.pendingThenable)();
  const cancel = (cancelOptions) => {
    if (!isResolved) {
      reject(new CancelledError(cancelOptions));
      config.abort?.();
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => _focusManager_js__WEBPACK_IMPORTED_MODULE_2__.focusManager.isFocused() && (config.networkMode === "always" || _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__.onlineManager.isOnline()) && config.canRun();
  const canStart = () => canFetch(config.networkMode) && config.canRun();
  const resolve = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onSuccess?.(value);
      continueFn?.();
      thenable.resolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onError?.(value);
      continueFn?.();
      thenable.reject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        if (isResolved || canContinue()) {
          continueResolve(value);
        }
      };
      config.onPause?.();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved) {
        config.onContinue?.();
      }
    });
  };
  const run = () => {
    if (isResolved) {
      return;
    }
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
    try {
      promiseOrValue = initialPromise ?? config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved) {
        return;
      }
      const retry = config.retry ?? (_utils_js__WEBPACK_IMPORTED_MODULE_3__.isServer ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.sleep)(delay).then(() => {
        return canContinue() ? void 0 : pause();
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  return {
    promise: thenable,
    cancel,
    continue: () => {
      continueFn?.();
      return thenable;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) {
        run();
      } else {
        pause().then(run);
      }
      return thenable;
    }
  };
}

//# sourceMappingURL=retryer.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/subscribable.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/subscribable.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Subscribable: () => (/* binding */ Subscribable)
/* harmony export */ });
// src/subscribable.ts
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

//# sourceMappingURL=subscribable.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/thenable.js":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/thenable.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pendingThenable: () => (/* binding */ pendingThenable)
/* harmony export */ });
// src/thenable.ts
function pendingThenable() {
  let resolve;
  let reject;
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  thenable.status = "pending";
  thenable.catch(() => {
  });
  function finalize(data) {
    Object.assign(thenable, data);
    delete thenable.resolve;
    delete thenable.reject;
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value
    });
    resolve(value);
  };
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason
    });
    reject(reason);
  };
  return thenable;
}

//# sourceMappingURL=thenable.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/utils.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToEnd: () => (/* binding */ addToEnd),
/* harmony export */   addToStart: () => (/* binding */ addToStart),
/* harmony export */   ensureQueryFn: () => (/* binding */ ensureQueryFn),
/* harmony export */   functionalUpdate: () => (/* binding */ functionalUpdate),
/* harmony export */   hashKey: () => (/* binding */ hashKey),
/* harmony export */   hashQueryKeyByOptions: () => (/* binding */ hashQueryKeyByOptions),
/* harmony export */   isPlainArray: () => (/* binding */ isPlainArray),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   isServer: () => (/* binding */ isServer),
/* harmony export */   isValidTimeout: () => (/* binding */ isValidTimeout),
/* harmony export */   keepPreviousData: () => (/* binding */ keepPreviousData),
/* harmony export */   matchMutation: () => (/* binding */ matchMutation),
/* harmony export */   matchQuery: () => (/* binding */ matchQuery),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   partialMatchKey: () => (/* binding */ partialMatchKey),
/* harmony export */   replaceData: () => (/* binding */ replaceData),
/* harmony export */   replaceEqualDeep: () => (/* binding */ replaceEqualDeep),
/* harmony export */   resolveEnabled: () => (/* binding */ resolveEnabled),
/* harmony export */   resolveStaleTime: () => (/* binding */ resolveStaleTime),
/* harmony export */   shallowEqualObjects: () => (/* binding */ shallowEqualObjects),
/* harmony export */   skipToken: () => (/* binding */ skipToken),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   timeUntilStale: () => (/* binding */ timeUntilStale)
/* harmony export */ });
// src/utils.ts
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveEnabled(enabled, query) {
  return typeof enabled === "function" ? enabled(query) : enabled;
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = options?.queryKeyHashFn || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function partialMatchKey(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return !Object.keys(b).some((key) => !partialMatchKey(a[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = isPlainArray(a) && isPlainArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aItems = array ? a : Object.keys(a);
    const aSize = aItems.length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      if ((!array && aItems.includes(key) || array) && a[key] === void 0 && b[key] === void 0) {
        copy[key] = void 0;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(a[key], b[key]);
        if (copy[key] === a[key] && a[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function shallowEqualObjects(a, b) {
  if (!b || Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (ctor === void 0) {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  if (Object.getPrototypeOf(o) !== Object.prototype) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    if (true) {
      try {
        return replaceEqualDeep(prevData, data);
      } catch (error) {
        console.error(
          `Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${options.queryHash}]: ${error}`
        );
      }
    }
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function keepPreviousData(previousData) {
  return previousData;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = Symbol();
function ensureQueryFn(options, fetchOptions) {
  if (true) {
    if (options.queryFn === skipToken) {
      console.error(
        `Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${options.queryHash}'`
      );
    }
  }
  if (!options.queryFn && fetchOptions?.initialPromise) {
    return () => fetchOptions.initialPromise;
  }
  if (!options.queryFn || options.queryFn === skipToken) {
    return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
  }
  return options.queryFn;
}

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClientContext: () => (/* binding */ QueryClientContext),
/* harmony export */   QueryClientProvider: () => (/* binding */ QueryClientProvider),
/* harmony export */   useQueryClient: () => (/* binding */ useQueryClient)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";

// src/QueryClientProvider.tsx


var QueryClientContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  void 0
);
var useQueryClient = (queryClient) => {
  const client = react__WEBPACK_IMPORTED_MODULE_0__.useContext(QueryClientContext);
  if (queryClient) {
    return queryClient;
  }
  if (!client) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return client;
};
var QueryClientProvider = ({
  client,
  children
}) => {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(QueryClientContext.Provider, { value: client, children });
};

//# sourceMappingURL=QueryClientProvider.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CatchBoundary: () => (/* binding */ CatchBoundary),
/* harmony export */   ErrorComponent: () => (/* binding */ ErrorComponent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");


function CatchBoundary(props) {
  const errorComponent = props.errorComponent ?? ErrorComponent;
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    CatchBoundaryImpl,
    {
      getResetKey: props.getResetKey,
      onCatch: props.onCatch,
      children: ({ error, reset }) => {
        if (error) {
          return react__WEBPACK_IMPORTED_MODULE_1__.createElement(errorComponent, {
            error,
            reset
          });
        }
        return props.children;
      }
    }
  );
}
class CatchBoundaryImpl extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor() {
    super(...arguments);
    this.state = { error: null };
  }
  static getDerivedStateFromProps(props) {
    return { resetKey: props.getResetKey() };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  reset() {
    this.setState({ error: null });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.error && prevState.resetKey !== this.state.resetKey) {
      this.reset();
    }
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onCatch) {
      this.props.onCatch(error, errorInfo);
    }
  }
  render() {
    return this.props.children({
      error: this.state.resetKey !== this.props.getResetKey() ? null : this.state.error,
      reset: () => {
        this.reset();
      }
    });
  }
}
function ErrorComponent({ error }) {
  const [show, setShow] = react__WEBPACK_IMPORTED_MODULE_1__.useState("development" !== "production");
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { padding: ".5rem", maxWidth: "100%" }, children: [
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: ".5rem" }, children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { style: { fontSize: "1rem" }, children: "Something went wrong!" }),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
        "button",
        {
          style: {
            appearance: "none",
            fontSize: ".6em",
            border: "1px solid currentColor",
            padding: ".1rem .2rem",
            fontWeight: "bold",
            borderRadius: ".25rem"
          },
          onClick: () => setShow((d) => !d),
          children: show ? "Hide Error" : "Show Error"
        }
      )
    ] }),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { height: ".25rem" } }),
    show ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      "pre",
      {
        style: {
          fontSize: ".7em",
          border: "1px solid red",
          borderRadius: ".25rem",
          padding: ".3rem",
          color: "red",
          overflow: "auto"
        },
        children: error.message ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", { children: error.message }) : null
      }
    ) }) : null
  ] });
}

//# sourceMappingURL=CatchBoundary.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/Match.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/Match.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Match: () => (/* binding */ Match),
/* harmony export */   MatchInner: () => (/* binding */ MatchInner),
/* harmony export */   Outlet: () => (/* binding */ Outlet)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/root.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/router.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");
/* harmony import */ var _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CatchBoundary.js */ "./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _not_found_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./not-found.js */ "./node_modules/@tanstack/react-router/dist/esm/not-found.js");
/* harmony import */ var _redirects_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./redirects.js */ "./node_modules/@tanstack/react-router/dist/esm/redirects.js");
/* harmony import */ var _matchContext_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./matchContext.js */ "./node_modules/@tanstack/react-router/dist/esm/matchContext.js");
/* harmony import */ var _SafeFragment_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SafeFragment.js */ "./node_modules/@tanstack/react-router/dist/esm/SafeFragment.js");
/* harmony import */ var _renderRouteNotFound_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./renderRouteNotFound.js */ "./node_modules/@tanstack/react-router/dist/esm/renderRouteNotFound.js");
/* harmony import */ var _scroll_restoration_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./scroll-restoration.js */ "./node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js");
"use client";














const Match = react__WEBPACK_IMPORTED_MODULE_1__.memo(function MatchImpl({
  matchId
}) {
  var _a, _b;
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const routeId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      var _a2;
      return (_a2 = s.matches.find((d) => d.id === matchId)) == null ? void 0 : _a2.routeId;
    }
  });
  (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_2__["default"])(
    routeId,
    `Could not find routeId for matchId "${matchId}". Please file an issue!`
  );
  const route = router.routesById[routeId];
  const PendingComponent = route.options.pendingComponent ?? router.options.defaultPendingComponent;
  const pendingElement = PendingComponent ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PendingComponent, {}) : null;
  const routeErrorComponent = route.options.errorComponent ?? router.options.defaultErrorComponent;
  const routeOnCatch = route.options.onCatch ?? router.options.defaultOnCatch;
  const routeNotFoundComponent = route.isRoot ? (
    // If it's the root route, use the globalNotFound option, with fallback to the notFoundRoute's component
    route.options.notFoundComponent ?? ((_a = router.options.notFoundRoute) == null ? void 0 : _a.options.component)
  ) : route.options.notFoundComponent;
  const ResolvedSuspenseBoundary = (
    // If we're on the root route, allow forcefully wrapping in suspense
    (!route.isRoot || route.options.wrapInSuspense) && (route.options.wrapInSuspense ?? PendingComponent ?? ((_b = route.options.errorComponent) == null ? void 0 : _b.preload)) ? react__WEBPACK_IMPORTED_MODULE_1__.Suspense : _SafeFragment_js__WEBPACK_IMPORTED_MODULE_5__.SafeFragment
  );
  const ResolvedCatchBoundary = routeErrorComponent ? _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_6__.CatchBoundary : _SafeFragment_js__WEBPACK_IMPORTED_MODULE_5__.SafeFragment;
  const ResolvedNotFoundBoundary = routeNotFoundComponent ? _not_found_js__WEBPACK_IMPORTED_MODULE_7__.CatchNotFound : _SafeFragment_js__WEBPACK_IMPORTED_MODULE_5__.SafeFragment;
  const resetKey = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => s.loadedAt
  });
  const parentRouteId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      var _a2;
      const index = s.matches.findIndex((d) => d.id === matchId);
      return (_a2 = s.matches[index - 1]) == null ? void 0 : _a2.routeId;
    }
  });
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_matchContext_js__WEBPACK_IMPORTED_MODULE_8__.matchContext.Provider, { value: matchId, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ResolvedSuspenseBoundary, { fallback: pendingElement, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      ResolvedCatchBoundary,
      {
        getResetKey: () => resetKey,
        errorComponent: routeErrorComponent || _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_6__.ErrorComponent,
        onCatch: (error, errorInfo) => {
          if ((0,_not_found_js__WEBPACK_IMPORTED_MODULE_7__.isNotFound)(error)) throw error;
          (0,tiny_warning__WEBPACK_IMPORTED_MODULE_9__["default"])(false, `Error in route match: ${matchId}`);
          routeOnCatch == null ? void 0 : routeOnCatch(error, errorInfo);
        },
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
          ResolvedNotFoundBoundary,
          {
            fallback: (error) => {
              if (!routeNotFoundComponent || error.routeId && error.routeId !== routeId || !error.routeId && !route.isRoot)
                throw error;
              return react__WEBPACK_IMPORTED_MODULE_1__.createElement(routeNotFoundComponent, error);
            },
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MatchInner, { matchId })
          }
        )
      }
    ) }) }),
    parentRouteId === _tanstack_router_core__WEBPACK_IMPORTED_MODULE_10__.rootRouteId ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OnRendered, {}),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_scroll_restoration_js__WEBPACK_IMPORTED_MODULE_11__.ScrollRestoration, {})
    ] }) : null
  ] });
});
function OnRendered() {
  var _a;
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const prevLocationRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef(
    void 0
  );
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "script",
    {
      suppressHydrationWarning: true,
      ref: (el) => {
        if (el) {
          router.emit({
            type: "onRendered",
            ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_12__.getLocationChangeInfo)(router.state)
          });
        } else {
          prevLocationRef.current = router.state.resolvedLocation;
        }
      }
    },
    (_a = router.state.resolvedLocation) == null ? void 0 : _a.state.key
  );
}
const MatchInner = react__WEBPACK_IMPORTED_MODULE_1__.memo(function MatchInnerImpl({
  matchId
}) {
  var _a, _b, _c;
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const { match, key, routeId } = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      const matchIndex = s.matches.findIndex((d) => d.id === matchId);
      const match2 = s.matches[matchIndex];
      const routeId2 = match2.routeId;
      const remountFn = router.routesById[routeId2].options.remountDeps ?? router.options.defaultRemountDeps;
      const remountDeps = remountFn == null ? void 0 : remountFn({
        routeId: routeId2,
        loaderDeps: match2.loaderDeps,
        params: match2._strictParams,
        search: match2._strictSearch
      });
      const key2 = remountDeps ? JSON.stringify(remountDeps) : void 0;
      return {
        key: key2,
        routeId: routeId2,
        match: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_13__.pick)(match2, ["id", "status", "error"])
      };
    },
    structuralSharing: true
  });
  const route = router.routesById[routeId];
  const out = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => {
    const Comp = route.options.component ?? router.options.defaultComponent;
    if (Comp) {
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Comp, {}, key);
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Outlet, {});
  }, [key, route.options.component, router.options.defaultComponent]);
  const RouteErrorComponent = (route.options.errorComponent ?? router.options.defaultErrorComponent) || _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_6__.ErrorComponent;
  if (match.status === "notFound") {
    (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_not_found_js__WEBPACK_IMPORTED_MODULE_7__.isNotFound)(match.error), "Expected a notFound error");
    return (0,_renderRouteNotFound_js__WEBPACK_IMPORTED_MODULE_14__.renderRouteNotFound)(router, route, match.error);
  }
  if (match.status === "redirected") {
    (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_redirects_js__WEBPACK_IMPORTED_MODULE_15__.isRedirect)(match.error), "Expected a redirect error");
    throw (_a = router.getMatch(match.id)) == null ? void 0 : _a.loadPromise;
  }
  if (match.status === "error") {
    if (router.isServer) {
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
        RouteErrorComponent,
        {
          error: match.error,
          reset: void 0,
          info: {
            componentStack: ""
          }
        }
      );
    }
    throw match.error;
  }
  if (match.status === "pending") {
    const pendingMinMs = route.options.pendingMinMs ?? router.options.defaultPendingMinMs;
    if (pendingMinMs && !((_b = router.getMatch(match.id)) == null ? void 0 : _b.minPendingPromise)) {
      if (!router.isServer) {
        const minPendingPromise = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_13__.createControlledPromise)();
        Promise.resolve().then(() => {
          router.updateMatch(match.id, (prev) => ({
            ...prev,
            minPendingPromise
          }));
        });
        setTimeout(() => {
          minPendingPromise.resolve();
          router.updateMatch(match.id, (prev) => ({
            ...prev,
            minPendingPromise: void 0
          }));
        }, pendingMinMs);
      }
    }
    throw (_c = router.getMatch(match.id)) == null ? void 0 : _c.loadPromise;
  }
  return out;
});
const Outlet = react__WEBPACK_IMPORTED_MODULE_1__.memo(function OutletImpl() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const matchId = react__WEBPACK_IMPORTED_MODULE_1__.useContext(_matchContext_js__WEBPACK_IMPORTED_MODULE_8__.matchContext);
  const routeId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      var _a;
      return (_a = s.matches.find((d) => d.id === matchId)) == null ? void 0 : _a.routeId;
    }
  });
  const route = router.routesById[routeId];
  const parentGlobalNotFound = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      const matches = s.matches;
      const parentMatch = matches.find((d) => d.id === matchId);
      (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_2__["default"])(
        parentMatch,
        `Could not find parent match for matchId "${matchId}"`
      );
      return parentMatch.globalNotFound;
    }
  });
  const childMatchId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      var _a;
      const matches = s.matches;
      const index = matches.findIndex((d) => d.id === matchId);
      return (_a = matches[index + 1]) == null ? void 0 : _a.id;
    }
  });
  if (parentGlobalNotFound) {
    return (0,_renderRouteNotFound_js__WEBPACK_IMPORTED_MODULE_14__.renderRouteNotFound)(router, route, void 0);
  }
  if (!childMatchId) {
    return null;
  }
  const nextMatch = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Match, { matchId: childMatchId });
  const pendingElement = router.options.defaultPendingComponent ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.defaultPendingComponent, {}) : null;
  if (matchId === _tanstack_router_core__WEBPACK_IMPORTED_MODULE_10__.rootRouteId) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, { fallback: pendingElement, children: nextMatch });
  }
  return nextMatch;
});

//# sourceMappingURL=Match.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/Matches.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/Matches.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MatchRoute: () => (/* binding */ MatchRoute),
/* harmony export */   Matches: () => (/* binding */ Matches),
/* harmony export */   useChildMatches: () => (/* binding */ useChildMatches),
/* harmony export */   useMatchRoute: () => (/* binding */ useMatchRoute),
/* harmony export */   useMatches: () => (/* binding */ useMatches),
/* harmony export */   useParentMatches: () => (/* binding */ useParentMatches)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CatchBoundary.js */ "./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _Transitioner_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Transitioner.js */ "./node_modules/@tanstack/react-router/dist/esm/Transitioner.js");
/* harmony import */ var _matchContext_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./matchContext.js */ "./node_modules/@tanstack/react-router/dist/esm/matchContext.js");
/* harmony import */ var _Match_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Match.js */ "./node_modules/@tanstack/react-router/dist/esm/Match.js");
/* harmony import */ var _SafeFragment_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SafeFragment.js */ "./node_modules/@tanstack/react-router/dist/esm/SafeFragment.js");










function Matches() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
  const pendingElement = router.options.defaultPendingComponent ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.defaultPendingComponent, {}) : null;
  const ResolvedSuspense = router.isServer || typeof document !== "undefined" && router.clientSsr ? _SafeFragment_js__WEBPACK_IMPORTED_MODULE_3__.SafeFragment : react__WEBPACK_IMPORTED_MODULE_1__.Suspense;
  const inner = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ResolvedSuspense, { fallback: pendingElement, children: [
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Transitioner_js__WEBPACK_IMPORTED_MODULE_4__.Transitioner, {}),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MatchesInner, {})
  ] });
  return router.options.InnerWrap ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.InnerWrap, { children: inner }) : inner;
}
function MatchesInner() {
  const matchId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (s) => {
      var _a;
      return (_a = s.matches[0]) == null ? void 0 : _a.id;
    }
  });
  const resetKey = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (s) => s.loadedAt
  });
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_matchContext_js__WEBPACK_IMPORTED_MODULE_6__.matchContext.Provider, { value: matchId, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_7__.CatchBoundary,
    {
      getResetKey: () => resetKey,
      errorComponent: _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_7__.ErrorComponent,
      onCatch: (error) => {
        (0,tiny_warning__WEBPACK_IMPORTED_MODULE_8__["default"])(
          false,
          `The following error wasn't caught by any route! At the very least, consider setting an 'errorComponent' in your RootRoute!`
        );
        (0,tiny_warning__WEBPACK_IMPORTED_MODULE_8__["default"])(false, error.message || error.toString());
      },
      children: matchId ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Match_js__WEBPACK_IMPORTED_MODULE_9__.Match, { matchId }) : null
    }
  ) });
}
function useMatchRoute() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
  (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (s) => {
      var _a;
      return [s.location.href, (_a = s.resolvedLocation) == null ? void 0 : _a.href, s.status];
    },
    structuralSharing: true
  });
  return react__WEBPACK_IMPORTED_MODULE_1__.useCallback(
    (opts) => {
      const { pending, caseSensitive, fuzzy, includeSearch, ...rest } = opts;
      return router.matchRoute(rest, {
        pending,
        caseSensitive,
        fuzzy,
        includeSearch
      });
    },
    [router]
  );
}
function MatchRoute(props) {
  const matchRoute = useMatchRoute();
  const params = matchRoute(props);
  if (typeof props.children === "function") {
    return props.children(params);
  }
  return params ? props.children : null;
}
function useMatches(opts) {
  return (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (state) => {
      const matches = state.matches;
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    },
    structuralSharing: opts == null ? void 0 : opts.structuralSharing
  });
}
function useParentMatches(opts) {
  const contextMatchId = react__WEBPACK_IMPORTED_MODULE_1__.useContext(_matchContext_js__WEBPACK_IMPORTED_MODULE_6__.matchContext);
  return useMatches({
    select: (matches) => {
      matches = matches.slice(
        0,
        matches.findIndex((d) => d.id === contextMatchId)
      );
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    },
    structuralSharing: opts == null ? void 0 : opts.structuralSharing
  });
}
function useChildMatches(opts) {
  const contextMatchId = react__WEBPACK_IMPORTED_MODULE_1__.useContext(_matchContext_js__WEBPACK_IMPORTED_MODULE_6__.matchContext);
  return useMatches({
    select: (matches) => {
      matches = matches.slice(
        matches.findIndex((d) => d.id === contextMatchId) + 1
      );
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    },
    structuralSharing: opts == null ? void 0 : opts.structuralSharing
  });
}

//# sourceMappingURL=Matches.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/RouterProvider.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/RouterProvider.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RouterContextProvider: () => (/* binding */ RouterContextProvider),
/* harmony export */   RouterProvider: () => (/* binding */ RouterProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _Matches_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Matches.js */ "./node_modules/@tanstack/react-router/dist/esm/Matches.js");
/* harmony import */ var _routerContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routerContext.js */ "./node_modules/@tanstack/react-router/dist/esm/routerContext.js");



function RouterContextProvider({
  router,
  children,
  ...rest
}) {
  router.update({
    ...router.options,
    ...rest,
    context: {
      ...router.options.context,
      ...rest.context
    }
  });
  const routerContext = (0,_routerContext_js__WEBPACK_IMPORTED_MODULE_1__.getRouterContext)();
  const provider = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(routerContext.Provider, { value: router, children });
  if (router.options.Wrap) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.Wrap, { children: provider });
  }
  return provider;
}
function RouterProvider({ router, ...rest }) {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RouterContextProvider, { router, ...rest, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Matches_js__WEBPACK_IMPORTED_MODULE_2__.Matches, {}) });
}

//# sourceMappingURL=RouterProvider.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/SafeFragment.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/SafeFragment.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SafeFragment: () => (/* binding */ SafeFragment)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");

function SafeFragment(props) {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: props.children });
}

//# sourceMappingURL=SafeFragment.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/ScriptOnce.js":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/ScriptOnce.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScriptOnce: () => (/* binding */ ScriptOnce)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var jsesc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsesc */ "./node_modules/jsesc/jsesc.js");


function ScriptOnce({
  children,
  log
}) {
  if (typeof document !== "undefined") {
    return null;
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "script",
    {
      className: "tsr-once",
      dangerouslySetInnerHTML: {
        __html: [
          children,
          (log ?? true) && "development" === "development" ? `console.info(\`Injected From Server:
${jsesc__WEBPACK_IMPORTED_MODULE_1__(children.toString(), { quotes: "backtick" })}\`)` : "",
          'if (typeof __TSR_SSR__ !== "undefined") __TSR_SSR__.cleanScripts()'
        ].filter(Boolean).join("\n")
      }
    }
  );
}

//# sourceMappingURL=ScriptOnce.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/Transitioner.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/Transitioner.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transitioner: () => (/* binding */ Transitioner)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/path.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/router.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/react-router/dist/esm/utils.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");





function Transitioner() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  const mountLoadForRouter = react__WEBPACK_IMPORTED_MODULE_0__.useRef({ router, mounted: false });
  const isLoading = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_2__.useRouterState)({
    select: ({ isLoading: isLoading2 }) => isLoading2
  });
  const [isTransitioning, setIsTransitioning] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const hasPendingMatches = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_2__.useRouterState)({
    select: (s) => s.matches.some((d) => d.status === "pending"),
    structuralSharing: true
  });
  const previousIsLoading = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.usePrevious)(isLoading);
  const isAnyPending = isLoading || isTransitioning || hasPendingMatches;
  const previousIsAnyPending = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.usePrevious)(isAnyPending);
  const isPagePending = isLoading || hasPendingMatches;
  const previousIsPagePending = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.usePrevious)(isPagePending);
  if (!router.isServer) {
    router.startReactTransition = (fn) => {
      setIsTransitioning(true);
      react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => {
        fn();
        setIsTransitioning(false);
      });
    };
  }
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const unsub = router.history.subscribe(router.load);
    const nextLocation = router.buildLocation({
      to: router.latestLocation.pathname,
      search: true,
      params: true,
      hash: true,
      state: true,
      _includeValidateSearch: true
    });
    if ((0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_4__.trimPathRight)(router.latestLocation.href) !== (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_4__.trimPathRight)(nextLocation.href)) {
      router.commitLocation({ ...nextLocation, replace: true });
    }
    return () => {
      unsub();
    };
  }, [router, router.history]);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(() => {
    if (typeof window !== "undefined" && router.clientSsr || mountLoadForRouter.current.router === router && mountLoadForRouter.current.mounted) {
      return;
    }
    mountLoadForRouter.current = { router, mounted: true };
    const tryLoad = async () => {
      try {
        await router.load();
      } catch (err) {
        console.error(err);
      }
    };
    tryLoad();
  }, [router]);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(() => {
    if (previousIsLoading && !isLoading) {
      router.emit({
        type: "onLoad",
        // When the new URL has committed, when the new matches have been loaded into state.matches
        ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.getLocationChangeInfo)(router.state)
      });
    }
  }, [previousIsLoading, router, isLoading]);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(() => {
    if (previousIsPagePending && !isPagePending) {
      router.emit({
        type: "onBeforeRouteMount",
        ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.getLocationChangeInfo)(router.state)
      });
    }
  }, [isPagePending, previousIsPagePending, router]);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(() => {
    if (previousIsAnyPending && !isAnyPending) {
      router.emit({
        type: "onResolved",
        ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.getLocationChangeInfo)(router.state)
      });
      router.__store.setState((s) => ({
        ...s,
        status: "idle",
        resolvedLocation: s.location
      }));
    }
  }, [isAnyPending, previousIsAnyPending, router]);
  return null;
}

//# sourceMappingURL=Transitioner.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/fileRoute.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileRoute: () => (/* binding */ FileRoute),
/* harmony export */   FileRouteLoader: () => (/* binding */ FileRouteLoader),
/* harmony export */   LazyRoute: () => (/* binding */ LazyRoute),
/* harmony export */   createFileRoute: () => (/* binding */ createFileRoute),
/* harmony export */   createLazyFileRoute: () => (/* binding */ createLazyFileRoute),
/* harmony export */   createLazyRoute: () => (/* binding */ createLazyRoute)
/* harmony export */ });
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _route_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./route.js */ "./node_modules/@tanstack/react-router/dist/esm/route.js");
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");
/* harmony import */ var _useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useLoaderDeps.js */ "./node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js");
/* harmony import */ var _useLoaderData_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useLoaderData.js */ "./node_modules/@tanstack/react-router/dist/esm/useLoaderData.js");
/* harmony import */ var _useSearch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useSearch.js */ "./node_modules/@tanstack/react-router/dist/esm/useSearch.js");
/* harmony import */ var _useParams_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useParams.js */ "./node_modules/@tanstack/react-router/dist/esm/useParams.js");
/* harmony import */ var _useNavigate_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useNavigate.js */ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js");








function createFileRoute(path) {
  return new FileRoute(path, {
    silent: true
  }).createRoute;
}
class FileRoute {
  constructor(path, _opts) {
    this.path = path;
    this.createRoute = (options) => {
      (0,tiny_warning__WEBPACK_IMPORTED_MODULE_0__["default"])(
        this.silent,
        "FileRoute is deprecated and will be removed in the next major version. Use the createFileRoute(path)(options) function instead."
      );
      const route = (0,_route_js__WEBPACK_IMPORTED_MODULE_1__.createRoute)(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts == null ? void 0 : _opts.silent;
  }
}
function FileRouteLoader(_path) {
  (0,tiny_warning__WEBPACK_IMPORTED_MODULE_0__["default"])(
    false,
    `FileRouteLoader is deprecated and will be removed in the next major version. Please place the loader function in the the main route file, inside the \`createFileRoute('/path/to/file')(options)\` options`
  );
  return (loaderFn) => loaderFn;
}
class LazyRoute {
  constructor(opts) {
    this.useMatch = (opts2) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_2__.useMatch)({
        select: opts2 == null ? void 0 : opts2.select,
        from: this.options.id,
        structuralSharing: opts2 == null ? void 0 : opts2.structuralSharing
      });
    };
    this.useRouteContext = (opts2) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_2__.useMatch)({
        from: this.options.id,
        select: (d) => (opts2 == null ? void 0 : opts2.select) ? opts2.select(d.context) : d.context
      });
    };
    this.useSearch = (opts2) => {
      return (0,_useSearch_js__WEBPACK_IMPORTED_MODULE_3__.useSearch)({
        select: opts2 == null ? void 0 : opts2.select,
        structuralSharing: opts2 == null ? void 0 : opts2.structuralSharing,
        from: this.options.id
      });
    };
    this.useParams = (opts2) => {
      return (0,_useParams_js__WEBPACK_IMPORTED_MODULE_4__.useParams)({
        select: opts2 == null ? void 0 : opts2.select,
        structuralSharing: opts2 == null ? void 0 : opts2.structuralSharing,
        from: this.options.id
      });
    };
    this.useLoaderDeps = (opts2) => {
      return (0,_useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_5__.useLoaderDeps)({ ...opts2, from: this.options.id });
    };
    this.useLoaderData = (opts2) => {
      return (0,_useLoaderData_js__WEBPACK_IMPORTED_MODULE_6__.useLoaderData)({ ...opts2, from: this.options.id });
    };
    this.useNavigate = () => {
      return (0,_useNavigate_js__WEBPACK_IMPORTED_MODULE_7__.useNavigate)({ from: this.options.id });
    };
    this.options = opts;
    this.$$typeof = Symbol.for("react.memo");
  }
}
function createLazyRoute(id) {
  return (opts) => {
    return new LazyRoute({ id, ...opts });
  };
}
function createLazyFileRoute(id) {
  return (opts) => new LazyRoute({ id, ...opts });
}

//# sourceMappingURL=fileRoute.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/matchContext.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/matchContext.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dummyMatchContext: () => (/* binding */ dummyMatchContext),
/* harmony export */   matchContext: () => (/* binding */ matchContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

const matchContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
const dummyMatchContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  void 0
);

//# sourceMappingURL=matchContext.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/not-found.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/not-found.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CatchNotFound: () => (/* binding */ CatchNotFound),
/* harmony export */   DefaultGlobalNotFound: () => (/* binding */ DefaultGlobalNotFound),
/* harmony export */   isNotFound: () => (/* binding */ isNotFound),
/* harmony export */   notFound: () => (/* binding */ notFound)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CatchBoundary.js */ "./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");



function notFound(options = {}) {
  options.isNotFound = true;
  if (options.throw) throw options;
  return options;
}
function isNotFound(obj) {
  return !!(obj == null ? void 0 : obj.isNotFound);
}
function CatchNotFound(props) {
  const resetKey = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_1__.useRouterState)({
    select: (s) => `not-found-${s.location.pathname}-${s.status}`
  });
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_2__.CatchBoundary,
    {
      getResetKey: () => resetKey,
      onCatch: (error, errorInfo) => {
        var _a;
        if (isNotFound(error)) {
          (_a = props.onCatch) == null ? void 0 : _a.call(props, error, errorInfo);
        } else {
          throw error;
        }
      },
      errorComponent: ({ error }) => {
        var _a;
        if (isNotFound(error)) {
          return (_a = props.fallback) == null ? void 0 : _a.call(props, error);
        } else {
          throw error;
        }
      },
      children: props.children
    }
  );
}
function DefaultGlobalNotFound() {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", { children: "Not Found" });
}

//# sourceMappingURL=not-found.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/redirects.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/redirects.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isRedirect: () => (/* binding */ isRedirect),
/* harmony export */   isResolvedRedirect: () => (/* binding */ isResolvedRedirect),
/* harmony export */   redirect: () => (/* binding */ redirect)
/* harmony export */ });
function redirect(opts) {
  opts.isRedirect = true;
  opts.statusCode = opts.statusCode || opts.code || 307;
  opts.headers = opts.headers || {};
  if (!opts.reloadDocument) {
    opts.reloadDocument = false;
    try {
      new URL(`${opts.href}`);
      opts.reloadDocument = true;
    } catch {
    }
  }
  if (opts.throw) {
    throw opts;
  }
  return opts;
}
function isRedirect(obj) {
  return !!(obj == null ? void 0 : obj.isRedirect);
}
function isResolvedRedirect(obj) {
  return !!(obj == null ? void 0 : obj.isRedirect) && obj.href;
}

//# sourceMappingURL=redirects.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/renderRouteNotFound.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/renderRouteNotFound.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderRouteNotFound: () => (/* binding */ renderRouteNotFound)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _not_found_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./not-found.js */ "./node_modules/@tanstack/react-router/dist/esm/not-found.js");



function renderRouteNotFound(router, route, data) {
  if (!route.options.notFoundComponent) {
    if (router.options.defaultNotFoundComponent) {
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.defaultNotFoundComponent, { data });
    }
    if (true) {
      (0,tiny_warning__WEBPACK_IMPORTED_MODULE_1__["default"])(
        route.options.notFoundComponent,
        `A notFoundError was encountered on the route with ID "${route.id}", but a notFoundComponent option was not configured, nor was a router level defaultNotFoundComponent configured. Consider configuring at least one of these to avoid TanStack Router's overly generic defaultNotFoundComponent (<div>Not Found<div>)`
      );
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_not_found_js__WEBPACK_IMPORTED_MODULE_2__.DefaultGlobalNotFound, {});
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(route.options.notFoundComponent, { data });
}

//# sourceMappingURL=renderRouteNotFound.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/route.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/route.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotFoundRoute: () => (/* binding */ NotFoundRoute),
/* harmony export */   RootRoute: () => (/* binding */ RootRoute),
/* harmony export */   Route: () => (/* binding */ Route),
/* harmony export */   RouteApi: () => (/* binding */ RouteApi),
/* harmony export */   createRootRoute: () => (/* binding */ createRootRoute),
/* harmony export */   createRootRouteWithContext: () => (/* binding */ createRootRouteWithContext),
/* harmony export */   createRoute: () => (/* binding */ createRoute),
/* harmony export */   createRouteMask: () => (/* binding */ createRouteMask),
/* harmony export */   getRouteApi: () => (/* binding */ getRouteApi),
/* harmony export */   rootRouteWithContext: () => (/* binding */ rootRouteWithContext)
/* harmony export */ });
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/root.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/path.js");
/* harmony import */ var _useLoaderData_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useLoaderData.js */ "./node_modules/@tanstack/react-router/dist/esm/useLoaderData.js");
/* harmony import */ var _useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useLoaderDeps.js */ "./node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js");
/* harmony import */ var _useParams_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useParams.js */ "./node_modules/@tanstack/react-router/dist/esm/useParams.js");
/* harmony import */ var _useSearch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useSearch.js */ "./node_modules/@tanstack/react-router/dist/esm/useSearch.js");
/* harmony import */ var _not_found_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./not-found.js */ "./node_modules/@tanstack/react-router/dist/esm/not-found.js");
/* harmony import */ var _useNavigate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useNavigate.js */ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js");
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");









function getRouteApi(id) {
  return new RouteApi({ id });
}
class RouteApi {
  /**
   * @deprecated Use the `getRouteApi` function instead.
   */
  constructor({ id }) {
    this.useMatch = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_1__.useMatch)({
        select: opts == null ? void 0 : opts.select,
        from: this.id,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_1__.useMatch)({
        from: this.id,
        select: (d) => (opts == null ? void 0 : opts.select) ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return (0,_useSearch_js__WEBPACK_IMPORTED_MODULE_2__.useSearch)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return (0,_useParams_js__WEBPACK_IMPORTED_MODULE_3__.useParams)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return (0,_useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_4__.useLoaderDeps)({ ...opts, from: this.id, strict: false });
    };
    this.useLoaderData = (opts) => {
      return (0,_useLoaderData_js__WEBPACK_IMPORTED_MODULE_5__.useLoaderData)({ ...opts, from: this.id, strict: false });
    };
    this.useNavigate = () => {
      return (0,_useNavigate_js__WEBPACK_IMPORTED_MODULE_6__.useNavigate)({ from: this.id });
    };
    this.notFound = (opts) => {
      return (0,_not_found_js__WEBPACK_IMPORTED_MODULE_7__.notFound)({ routeId: this.id, ...opts });
    };
    this.id = id;
  }
}
class Route {
  /**
   * @deprecated Use the `createRoute` function instead.
   */
  constructor(options) {
    this.init = (opts) => {
      var _a, _b;
      this.originalIndex = opts.originalIndex;
      const options2 = this.options;
      const isRoot = !(options2 == null ? void 0 : options2.path) && !(options2 == null ? void 0 : options2.id);
      this.parentRoute = (_b = (_a = this.options).getParentRoute) == null ? void 0 : _b.call(_a);
      if (isRoot) {
        this._path = _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId;
      } else {
        (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
          this.parentRoute,
          `Child Route instances must pass a 'getParentRoute: () => ParentRoute' option that returns a Route instance.`
        );
      }
      let path = isRoot ? _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId : options2.path;
      if (path && path !== "/") {
        path = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_9__.trimPathLeft)(path);
      }
      const customId = (options2 == null ? void 0 : options2.id) || path;
      let id = isRoot ? _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId : (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_9__.joinPaths)([
        this.parentRoute.id === _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId ? "" : this.parentRoute.id,
        customId
      ]);
      if (path === _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId) {
        path = "/";
      }
      if (id !== _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId) {
        id = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_9__.joinPaths)(["/", id]);
      }
      const fullPath = id === _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId ? "/" : (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_9__.joinPaths)([this.parentRoute.fullPath, path]);
      this._path = path;
      this._id = id;
      this._fullPath = fullPath;
      this._to = fullPath;
      this._ssr = (options2 == null ? void 0 : options2.ssr) ?? opts.defaultSsr ?? true;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn) => {
      this.lazyFn = lazyFn;
      return this;
    };
    this.useMatch = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_1__.useMatch)({
        select: opts == null ? void 0 : opts.select,
        from: this.id,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_1__.useMatch)({
        ...opts,
        from: this.id,
        select: (d) => (opts == null ? void 0 : opts.select) ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return (0,_useSearch_js__WEBPACK_IMPORTED_MODULE_2__.useSearch)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return (0,_useParams_js__WEBPACK_IMPORTED_MODULE_3__.useParams)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return (0,_useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_4__.useLoaderDeps)({ ...opts, from: this.id });
    };
    this.useLoaderData = (opts) => {
      return (0,_useLoaderData_js__WEBPACK_IMPORTED_MODULE_5__.useLoaderData)({ ...opts, from: this.id });
    };
    this.useNavigate = () => {
      return (0,_useNavigate_js__WEBPACK_IMPORTED_MODULE_6__.useNavigate)({ from: this.id });
    };
    this.options = options || {};
    this.isRoot = !(options == null ? void 0 : options.getParentRoute);
    (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
      !((options == null ? void 0 : options.id) && (options == null ? void 0 : options.path)),
      `Route cannot have both an 'id' and a 'path' option.`
    );
    this.$$typeof = Symbol.for("react.memo");
  }
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
  get ssr() {
    return this._ssr;
  }
  addChildren(children) {
    return this._addFileChildren(children);
  }
  _addFileChildren(children) {
    if (Array.isArray(children)) {
      this.children = children;
    }
    if (typeof children === "object" && children !== null) {
      this.children = Object.values(children);
    }
    return this;
  }
}
function createRoute(options) {
  return new Route(options);
}
function createRootRouteWithContext() {
  return (options) => {
    return createRootRoute(options);
  };
}
const rootRouteWithContext = createRootRouteWithContext;
class RootRoute extends Route {
  /**
   * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
   */
  constructor(options) {
    super(options);
  }
  addChildren(children) {
    super.addChildren(children);
    return this;
  }
  _addFileChildren(children) {
    super._addFileChildren(children);
    return this;
  }
  _addFileTypes() {
    return this;
  }
}
function createRootRoute(options) {
  return new RootRoute(options);
}
function createRouteMask(opts) {
  return opts;
}
class NotFoundRoute extends Route {
  constructor(options) {
    super({
      ...options,
      id: "404"
    });
  }
}

//# sourceMappingURL=route.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/router.js":
/*!****************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/router.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PathParamError: () => (/* binding */ PathParamError),
/* harmony export */   Router: () => (/* binding */ Router),
/* harmony export */   SearchParamError: () => (/* binding */ SearchParamError),
/* harmony export */   componentTypes: () => (/* binding */ componentTypes),
/* harmony export */   createRouter: () => (/* binding */ createRouter),
/* harmony export */   getInitialRouterState: () => (/* binding */ getInitialRouterState),
/* harmony export */   lazyFn: () => (/* binding */ lazyFn)
/* harmony export */ });
/* harmony import */ var _tanstack_history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/history */ "./node_modules/@tanstack/history/dist/esm/index.js");
/* harmony import */ var _tanstack_react_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-store */ "./node_modules/@tanstack/store/dist/esm/store.js");
/* harmony import */ var _tanstack_react_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-store */ "./node_modules/@tanstack/store/dist/esm/scheduler.js");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/path.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/root.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/router.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/searchParams.js");
/* harmony import */ var _redirects_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./redirects.js */ "./node_modules/@tanstack/react-router/dist/esm/redirects.js");
/* harmony import */ var _not_found_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./not-found.js */ "./node_modules/@tanstack/react-router/dist/esm/not-found.js");
/* harmony import */ var _scroll_restoration_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scroll-restoration.js */ "./node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js");







const componentTypes = [
  "component",
  "errorComponent",
  "pendingComponent",
  "notFoundComponent"
];
function routeNeedsPreload(route) {
  var _a;
  for (const componentType of componentTypes) {
    if ((_a = route.options[componentType]) == null ? void 0 : _a.preload) {
      return true;
    }
  }
  return false;
}
function validateSearch(validateSearch2, input) {
  if (validateSearch2 == null) return {};
  if ("~standard" in validateSearch2) {
    const result = validateSearch2["~standard"].validate(input);
    if (result instanceof Promise)
      throw new SearchParamError("Async validation not supported");
    if (result.issues)
      throw new SearchParamError(JSON.stringify(result.issues, void 0, 2), {
        cause: result
      });
    return result.value;
  }
  if ("parse" in validateSearch2) {
    return validateSearch2.parse(input);
  }
  if (typeof validateSearch2 === "function") {
    return validateSearch2(input);
  }
  return {};
}
function createRouter(options) {
  return new Router(options);
}
class Router {
  /**
   * @deprecated Use the `createRouter` function instead
   */
  constructor(options) {
    this.tempLocationKey = `${Math.round(
      Math.random() * 1e7
    )}`;
    this.resetNextScroll = true;
    this.shouldViewTransition = void 0;
    this.isViewTransitionTypesSupported = void 0;
    this.subscribers = /* @__PURE__ */ new Set();
    this.isScrollRestoring = false;
    this.isScrollRestorationSetup = false;
    this.startReactTransition = (fn) => fn();
    this.update = (newOptions) => {
      var _a;
      if (newOptions.notFoundRoute) {
        console.warn(
          "The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/framework/react/guide/not-found-errors#migrating-from-notfoundroute for more info."
        );
      }
      const previousOptions = this.options;
      this.options = {
        ...this.options,
        ...newOptions
      };
      this.isServer = this.options.isServer ?? typeof document === "undefined";
      this.pathParamsDecodeCharMap = this.options.pathParamsAllowedCharacters ? new Map(
        this.options.pathParamsAllowedCharacters.map((char) => [
          encodeURIComponent(char),
          char
        ])
      ) : void 0;
      if (!this.basepath || newOptions.basepath && newOptions.basepath !== previousOptions.basepath) {
        if (newOptions.basepath === void 0 || newOptions.basepath === "" || newOptions.basepath === "/") {
          this.basepath = "/";
        } else {
          this.basepath = `/${(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.trimPath)(newOptions.basepath)}`;
        }
      }
      if (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        !this.history || this.options.history && this.options.history !== this.history
      ) {
        this.history = this.options.history ?? (this.isServer ? (0,_tanstack_history__WEBPACK_IMPORTED_MODULE_2__.createMemoryHistory)({
          initialEntries: [this.basepath || "/"]
        }) : (0,_tanstack_history__WEBPACK_IMPORTED_MODULE_2__.createBrowserHistory)());
        this.latestLocation = this.parseLocation();
      }
      if (this.options.routeTree !== this.routeTree) {
        this.routeTree = this.options.routeTree;
        this.buildRouteTree();
      }
      if (!this.__store) {
        this.__store = new _tanstack_react_store__WEBPACK_IMPORTED_MODULE_3__.Store(getInitialRouterState(this.latestLocation), {
          onUpdate: () => {
            this.__store.state = {
              ...this.state,
              cachedMatches: this.state.cachedMatches.filter(
                (d) => !["redirected"].includes(d.status)
              )
            };
          }
        });
        (0,_scroll_restoration_js__WEBPACK_IMPORTED_MODULE_4__.setupScrollRestoration)(this);
      }
      if (typeof window !== "undefined" && "CSS" in window && // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      typeof ((_a = window.CSS) == null ? void 0 : _a.supports) === "function") {
        this.isViewTransitionTypesSupported = window.CSS.supports(
          "selector(:active-view-transition-type(a)"
        );
      }
    };
    this.buildRouteTree = () => {
      this.routesById = {};
      this.routesByPath = {};
      const notFoundRoute = this.options.notFoundRoute;
      if (notFoundRoute) {
        notFoundRoute.init({
          originalIndex: 99999999999,
          defaultSsr: this.options.defaultSsr
        });
        this.routesById[notFoundRoute.id] = notFoundRoute;
      }
      const recurseRoutes = (childRoutes) => {
        childRoutes.forEach((childRoute, i) => {
          childRoute.init({
            originalIndex: i,
            defaultSsr: this.options.defaultSsr
          });
          const existingRoute = this.routesById[childRoute.id];
          (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
            !existingRoute,
            `Duplicate routes found with id: ${String(childRoute.id)}`
          );
          this.routesById[childRoute.id] = childRoute;
          if (!childRoute.isRoot && childRoute.path) {
            const trimmedFullPath = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.trimPathRight)(childRoute.fullPath);
            if (!this.routesByPath[trimmedFullPath] || childRoute.fullPath.endsWith("/")) {
              this.routesByPath[trimmedFullPath] = childRoute;
            }
          }
          const children = childRoute.children;
          if (children == null ? void 0 : children.length) {
            recurseRoutes(children);
          }
        });
      };
      recurseRoutes([this.routeTree]);
      const scoredRoutes = [];
      const routes = Object.values(this.routesById);
      routes.forEach((d, i) => {
        var _a;
        if (d.isRoot || !d.path) {
          return;
        }
        const trimmed = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.trimPathLeft)(d.fullPath);
        const parsed = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.parsePathname)(trimmed);
        while (parsed.length > 1 && ((_a = parsed[0]) == null ? void 0 : _a.value) === "/") {
          parsed.shift();
        }
        const scores = parsed.map((segment) => {
          if (segment.value === "/") {
            return 0.75;
          }
          if (segment.type === "param") {
            return 0.5;
          }
          if (segment.type === "wildcard") {
            return 0.25;
          }
          return 1;
        });
        scoredRoutes.push({ child: d, trimmed, parsed, index: i, scores });
      });
      this.flatRoutes = scoredRoutes.sort((a, b) => {
        const minLength = Math.min(a.scores.length, b.scores.length);
        for (let i = 0; i < minLength; i++) {
          if (a.scores[i] !== b.scores[i]) {
            return b.scores[i] - a.scores[i];
          }
        }
        if (a.scores.length !== b.scores.length) {
          return b.scores.length - a.scores.length;
        }
        for (let i = 0; i < minLength; i++) {
          if (a.parsed[i].value !== b.parsed[i].value) {
            return a.parsed[i].value > b.parsed[i].value ? 1 : -1;
          }
        }
        return a.index - b.index;
      }).map((d, i) => {
        d.child.rank = i;
        return d.child;
      });
    };
    this.subscribe = (eventType, fn) => {
      const listener = {
        eventType,
        fn
      };
      this.subscribers.add(listener);
      return () => {
        this.subscribers.delete(listener);
      };
    };
    this.emit = (routerEvent) => {
      this.subscribers.forEach((listener) => {
        if (listener.eventType === routerEvent.type) {
          listener.fn(routerEvent);
        }
      });
    };
    this.parseLocation = (previousLocation, locationToParse) => {
      const parse = ({
        pathname,
        search,
        hash,
        state
      }) => {
        const parsedSearch = this.options.parseSearch(search);
        const searchStr = this.options.stringifySearch(parsedSearch);
        return {
          pathname,
          searchStr,
          search: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousLocation == null ? void 0 : previousLocation.search, parsedSearch),
          hash: hash.split("#").reverse()[0] ?? "",
          href: `${pathname}${searchStr}${hash}`,
          state: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousLocation == null ? void 0 : previousLocation.state, state)
        };
      };
      const location = parse(locationToParse ?? this.history.location);
      const { __tempLocation, __tempKey } = location.state;
      if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
        const parsedTempLocation = parse(__tempLocation);
        parsedTempLocation.state.key = location.state.key;
        delete parsedTempLocation.state.__tempLocation;
        return {
          ...parsedTempLocation,
          maskedLocation: location
        };
      }
      return location;
    };
    this.resolvePathWithBase = (from, path) => {
      const resolvedPath = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.resolvePath)({
        basepath: this.basepath,
        base: from,
        to: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.cleanPath)(path),
        trailingSlash: this.options.trailingSlash,
        caseSensitive: this.options.caseSensitive
      });
      return resolvedPath;
    };
    this.getMatchedRoutes = (next, dest) => {
      let routeParams = {};
      const trimmedPath = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.trimPathRight)(next.pathname);
      const getMatchedParams = (route) => {
        const result = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.matchPathname)(this.basepath, trimmedPath, {
          to: route.fullPath,
          caseSensitive: route.options.caseSensitive ?? this.options.caseSensitive,
          fuzzy: true
        });
        return result;
      };
      let foundRoute = (dest == null ? void 0 : dest.to) !== void 0 ? this.routesByPath[dest.to] : void 0;
      if (foundRoute) {
        routeParams = getMatchedParams(foundRoute);
      } else {
        foundRoute = this.flatRoutes.find((route) => {
          const matchedParams = getMatchedParams(route);
          if (matchedParams) {
            routeParams = matchedParams;
            return true;
          }
          return false;
        });
      }
      let routeCursor = foundRoute || this.routesById[_tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__.rootRouteId];
      const matchedRoutes = [routeCursor];
      while (routeCursor.parentRoute) {
        routeCursor = routeCursor.parentRoute;
        matchedRoutes.unshift(routeCursor);
      }
      return { matchedRoutes, routeParams, foundRoute };
    };
    this.cancelMatch = (id) => {
      const match = this.getMatch(id);
      if (!match) return;
      match.abortController.abort();
      clearTimeout(match.pendingTimeout);
    };
    this.cancelMatches = () => {
      var _a;
      (_a = this.state.pendingMatches) == null ? void 0 : _a.forEach((match) => {
        this.cancelMatch(match.id);
      });
    };
    this.buildLocation = (opts) => {
      const build = (dest = {}, matchedRoutesResult) => {
        var _a, _b, _c, _d, _e, _f;
        const fromMatches = dest._fromLocation ? this.matchRoutes(dest._fromLocation, { _buildLocation: true }) : this.state.matches;
        const fromMatch = dest.from != null ? fromMatches.find(
          (d) => (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.matchPathname)(this.basepath, (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.trimPathRight)(d.pathname), {
            to: dest.from,
            caseSensitive: false,
            fuzzy: false
          })
        ) : void 0;
        const fromPath = (fromMatch == null ? void 0 : fromMatch.pathname) || this.latestLocation.pathname;
        (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
          dest.from == null || fromMatch != null,
          "Could not find match for from: " + dest.from
        );
        const fromSearch = ((_a = this.state.pendingMatches) == null ? void 0 : _a.length) ? (_b = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.last)(this.state.pendingMatches)) == null ? void 0 : _b.search : ((_c = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.last)(fromMatches)) == null ? void 0 : _c.search) || this.latestLocation.search;
        const stayingMatches = matchedRoutesResult == null ? void 0 : matchedRoutesResult.matchedRoutes.filter(
          (d) => fromMatches.find((e) => e.routeId === d.id)
        );
        let pathname;
        if (dest.to) {
          pathname = this.resolvePathWithBase(fromPath, `${dest.to}`);
        } else {
          const fromRouteByFromPathRouteId = this.routesById[(_d = stayingMatches == null ? void 0 : stayingMatches.find((route) => {
            const interpolatedPath = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.interpolatePath)({
              path: route.fullPath,
              params: (matchedRoutesResult == null ? void 0 : matchedRoutesResult.routeParams) ?? {},
              decodeCharMap: this.pathParamsDecodeCharMap
            }).interpolatedPath;
            const pathname2 = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([this.basepath, interpolatedPath]);
            return pathname2 === fromPath;
          })) == null ? void 0 : _d.id];
          pathname = this.resolvePathWithBase(
            fromPath,
            (fromRouteByFromPathRouteId == null ? void 0 : fromRouteByFromPathRouteId.to) ?? fromPath
          );
        }
        const prevParams = { ...(_e = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.last)(fromMatches)) == null ? void 0 : _e.params };
        let nextParams = (dest.params ?? true) === true ? prevParams : {
          ...prevParams,
          ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.functionalUpdate)(dest.params, prevParams)
        };
        if (Object.keys(nextParams).length > 0) {
          matchedRoutesResult == null ? void 0 : matchedRoutesResult.matchedRoutes.map((route) => {
            var _a2;
            return ((_a2 = route.options.params) == null ? void 0 : _a2.stringify) ?? route.options.stringifyParams;
          }).filter(Boolean).forEach((fn) => {
            nextParams = { ...nextParams, ...fn(nextParams) };
          });
        }
        pathname = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.interpolatePath)({
          path: pathname,
          params: nextParams ?? {},
          leaveWildcards: false,
          leaveParams: opts.leaveParams,
          decodeCharMap: this.pathParamsDecodeCharMap
        }).interpolatedPath;
        let search = fromSearch;
        if (opts._includeValidateSearch && ((_f = this.options.search) == null ? void 0 : _f.strict)) {
          let validatedSearch = {};
          matchedRoutesResult == null ? void 0 : matchedRoutesResult.matchedRoutes.forEach((route) => {
            try {
              if (route.options.validateSearch) {
                validatedSearch = {
                  ...validatedSearch,
                  ...validateSearch(route.options.validateSearch, {
                    ...validatedSearch,
                    ...search
                  }) ?? {}
                };
              }
            } catch {
            }
          });
          search = validatedSearch;
        }
        const applyMiddlewares = (search2) => {
          const allMiddlewares = (matchedRoutesResult == null ? void 0 : matchedRoutesResult.matchedRoutes.reduce(
            (acc, route) => {
              var _a2;
              const middlewares = [];
              if ("search" in route.options) {
                if ((_a2 = route.options.search) == null ? void 0 : _a2.middlewares) {
                  middlewares.push(...route.options.search.middlewares);
                }
              } else if (route.options.preSearchFilters || route.options.postSearchFilters) {
                const legacyMiddleware = ({
                  search: search3,
                  next
                }) => {
                  let nextSearch = search3;
                  if ("preSearchFilters" in route.options && route.options.preSearchFilters) {
                    nextSearch = route.options.preSearchFilters.reduce(
                      (prev, next2) => next2(prev),
                      search3
                    );
                  }
                  const result = next(nextSearch);
                  if ("postSearchFilters" in route.options && route.options.postSearchFilters) {
                    return route.options.postSearchFilters.reduce(
                      (prev, next2) => next2(prev),
                      result
                    );
                  }
                  return result;
                };
                middlewares.push(legacyMiddleware);
              }
              if (opts._includeValidateSearch && route.options.validateSearch) {
                const validate = ({ search: search3, next }) => {
                  try {
                    const result = next(search3);
                    const validatedSearch = {
                      ...result,
                      ...validateSearch(
                        route.options.validateSearch,
                        result
                      ) ?? {}
                    };
                    return validatedSearch;
                  } catch {
                  }
                };
                middlewares.push(validate);
              }
              return acc.concat(middlewares);
            },
            []
          )) ?? [];
          const final = ({ search: search3 }) => {
            if (!dest.search) {
              return {};
            }
            if (dest.search === true) {
              return search3;
            }
            return (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.functionalUpdate)(dest.search, search3);
          };
          allMiddlewares.push(final);
          const applyNext = (index, currentSearch) => {
            if (index >= allMiddlewares.length) {
              return currentSearch;
            }
            const middleware = allMiddlewares[index];
            const next = (newSearch) => {
              return applyNext(index + 1, newSearch);
            };
            return middleware({ search: currentSearch, next });
          };
          return applyNext(0, search2);
        };
        search = applyMiddlewares(search);
        search = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(fromSearch, search);
        const searchStr = this.options.stringifySearch(search);
        const hash = dest.hash === true ? this.latestLocation.hash : dest.hash ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.functionalUpdate)(dest.hash, this.latestLocation.hash) : void 0;
        const hashStr = hash ? `#${hash}` : "";
        let nextState = dest.state === true ? this.latestLocation.state : dest.state ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.functionalUpdate)(dest.state, this.latestLocation.state) : {};
        nextState = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(this.latestLocation.state, nextState);
        return {
          pathname,
          search,
          searchStr,
          state: nextState,
          hash: hash ?? "",
          href: `${pathname}${searchStr}${hashStr}`,
          unmaskOnReload: dest.unmaskOnReload
        };
      };
      const buildWithMatches = (dest = {}, maskedDest) => {
        var _a;
        const next = build(dest);
        let maskedNext = maskedDest ? build(maskedDest) : void 0;
        if (!maskedNext) {
          let params = {};
          const foundMask = (_a = this.options.routeMasks) == null ? void 0 : _a.find((d) => {
            const match = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.matchPathname)(this.basepath, next.pathname, {
              to: d.from,
              caseSensitive: false,
              fuzzy: false
            });
            if (match) {
              params = match;
              return true;
            }
            return false;
          });
          if (foundMask) {
            const { from: _from, ...maskProps } = foundMask;
            maskedDest = {
              ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.pick)(opts, ["from"]),
              ...maskProps,
              params
            };
            maskedNext = build(maskedDest);
          }
        }
        const nextMatches = this.getMatchedRoutes(next, dest);
        const final = build(dest, nextMatches);
        if (maskedNext) {
          const maskedMatches = this.getMatchedRoutes(maskedNext, maskedDest);
          const maskedFinal = build(maskedDest, maskedMatches);
          final.maskedLocation = maskedFinal;
        }
        return final;
      };
      if (opts.mask) {
        return buildWithMatches(opts, {
          ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.pick)(opts, ["from"]),
          ...opts.mask
        });
      }
      return buildWithMatches(opts);
    };
    this.commitLocation = ({
      viewTransition,
      ignoreBlocker,
      ...next
    }) => {
      const isSameState = () => {
        next.state.key = this.latestLocation.state.key;
        const isEqual = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.deepEqual)(next.state, this.latestLocation.state);
        delete next.state.key;
        return isEqual;
      };
      const isSameUrl = this.latestLocation.href === next.href;
      const previousCommitPromise = this.commitLocationPromise;
      this.commitLocationPromise = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)(() => {
        previousCommitPromise == null ? void 0 : previousCommitPromise.resolve();
      });
      if (isSameUrl && isSameState()) {
        this.load();
      } else {
        let { maskedLocation, hashScrollIntoView, ...nextHistory } = next;
        if (maskedLocation) {
          nextHistory = {
            ...maskedLocation,
            state: {
              ...maskedLocation.state,
              __tempKey: void 0,
              __tempLocation: {
                ...nextHistory,
                search: nextHistory.searchStr,
                state: {
                  ...nextHistory.state,
                  __tempKey: void 0,
                  __tempLocation: void 0,
                  key: void 0
                }
              }
            }
          };
          if (nextHistory.unmaskOnReload ?? this.options.unmaskOnReload ?? false) {
            nextHistory.state.__tempKey = this.tempLocationKey;
          }
        }
        nextHistory.state.__hashScrollIntoViewOptions = hashScrollIntoView ?? this.options.defaultHashScrollIntoView ?? true;
        this.shouldViewTransition = viewTransition;
        this.history[next.replace ? "replace" : "push"](
          nextHistory.href,
          nextHistory.state,
          { ignoreBlocker }
        );
      }
      this.resetNextScroll = next.resetScroll ?? true;
      if (!this.history.subscribers.size) {
        this.load();
      }
      return this.commitLocationPromise;
    };
    this.buildAndCommitLocation = ({
      replace,
      resetScroll,
      hashScrollIntoView,
      viewTransition,
      ignoreBlocker,
      href,
      ...rest
    } = {}) => {
      if (href) {
        const currentIndex = this.history.location.state.__TSR_index;
        const parsed = (0,_tanstack_history__WEBPACK_IMPORTED_MODULE_2__.parseHref)(href, {
          __TSR_index: replace ? currentIndex : currentIndex + 1
        });
        rest.to = parsed.pathname;
        rest.search = this.options.parseSearch(parsed.search);
        rest.hash = parsed.hash.slice(1);
      }
      const location = this.buildLocation({
        ...rest,
        _includeValidateSearch: true
      });
      return this.commitLocation({
        ...location,
        viewTransition,
        replace,
        resetScroll,
        hashScrollIntoView,
        ignoreBlocker
      });
    };
    this.navigate = ({ to, reloadDocument, href, ...rest }) => {
      if (reloadDocument) {
        if (!href) {
          const location = this.buildLocation({ to, ...rest });
          href = location.href;
        }
        if (rest.replace) {
          window.location.replace(href);
        } else {
          window.location.href = href;
        }
        return;
      }
      return this.buildAndCommitLocation({
        ...rest,
        href,
        to
      });
    };
    this.load = async (opts) => {
      this.latestLocation = this.parseLocation(this.latestLocation);
      let redirect;
      let notFound;
      let loadPromise;
      loadPromise = new Promise((resolve) => {
        this.startReactTransition(async () => {
          var _a;
          try {
            const next = this.latestLocation;
            const prevLocation = this.state.resolvedLocation;
            this.cancelMatches();
            let pendingMatches;
            (0,_tanstack_react_store__WEBPACK_IMPORTED_MODULE_7__.batch)(() => {
              pendingMatches = this.matchRoutes(next);
              this.__store.setState((s) => ({
                ...s,
                status: "pending",
                isLoading: true,
                location: next,
                pendingMatches,
                // If a cached moved to pendingMatches, remove it from cachedMatches
                cachedMatches: s.cachedMatches.filter((d) => {
                  return !pendingMatches.find((e) => e.id === d.id);
                })
              }));
            });
            if (!this.state.redirect) {
              this.emit({
                type: "onBeforeNavigate",
                ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.getLocationChangeInfo)({
                  resolvedLocation: prevLocation,
                  location: next
                })
              });
            }
            this.emit({
              type: "onBeforeLoad",
              ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.getLocationChangeInfo)({
                resolvedLocation: prevLocation,
                location: next
              })
            });
            await this.loadMatches({
              sync: opts == null ? void 0 : opts.sync,
              matches: pendingMatches,
              location: next,
              // eslint-disable-next-line @typescript-eslint/require-await
              onReady: async () => {
                this.startViewTransition(async () => {
                  let exitingMatches;
                  let enteringMatches;
                  let stayingMatches;
                  (0,_tanstack_react_store__WEBPACK_IMPORTED_MODULE_7__.batch)(() => {
                    this.__store.setState((s) => {
                      const previousMatches = s.matches;
                      const newMatches = s.pendingMatches || s.matches;
                      exitingMatches = previousMatches.filter(
                        (match) => !newMatches.find((d) => d.id === match.id)
                      );
                      enteringMatches = newMatches.filter(
                        (match) => !previousMatches.find((d) => d.id === match.id)
                      );
                      stayingMatches = previousMatches.filter(
                        (match) => newMatches.find((d) => d.id === match.id)
                      );
                      return {
                        ...s,
                        isLoading: false,
                        loadedAt: Date.now(),
                        matches: newMatches,
                        pendingMatches: void 0,
                        cachedMatches: [
                          ...s.cachedMatches,
                          ...exitingMatches.filter((d) => d.status !== "error")
                        ]
                      };
                    });
                    this.clearExpiredCache();
                  });
                  [
                    [exitingMatches, "onLeave"],
                    [enteringMatches, "onEnter"],
                    [stayingMatches, "onStay"]
                  ].forEach(([matches, hook]) => {
                    matches.forEach((match) => {
                      var _a2, _b;
                      (_b = (_a2 = this.looseRoutesById[match.routeId].options)[hook]) == null ? void 0 : _b.call(_a2, match);
                    });
                  });
                });
              }
            });
          } catch (err) {
            if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isResolvedRedirect)(err)) {
              redirect = err;
              if (!this.isServer) {
                this.navigate({
                  ...redirect,
                  replace: true,
                  ignoreBlocker: true
                });
              }
            } else if ((0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err)) {
              notFound = err;
            }
            this.__store.setState((s) => ({
              ...s,
              statusCode: redirect ? redirect.statusCode : notFound ? 404 : s.matches.some((d) => d.status === "error") ? 500 : 200,
              redirect
            }));
          }
          if (this.latestLoadPromise === loadPromise) {
            (_a = this.commitLocationPromise) == null ? void 0 : _a.resolve();
            this.latestLoadPromise = void 0;
            this.commitLocationPromise = void 0;
          }
          resolve();
        });
      });
      this.latestLoadPromise = loadPromise;
      await loadPromise;
      while (this.latestLoadPromise && loadPromise !== this.latestLoadPromise) {
        await this.latestLoadPromise;
      }
    };
    this.startViewTransition = (fn) => {
      const shouldViewTransition = this.shouldViewTransition ?? this.options.defaultViewTransition;
      delete this.shouldViewTransition;
      if (shouldViewTransition && typeof document !== "undefined" && "startViewTransition" in document && typeof document.startViewTransition === "function") {
        let startViewTransitionParams;
        if (typeof shouldViewTransition === "object" && this.isViewTransitionTypesSupported) {
          startViewTransitionParams = {
            update: fn,
            types: shouldViewTransition.types
          };
        } else {
          startViewTransitionParams = fn;
        }
        document.startViewTransition(startViewTransitionParams);
      } else {
        fn();
      }
    };
    this.updateMatch = (id, updater) => {
      var _a;
      let updated;
      const isPending = (_a = this.state.pendingMatches) == null ? void 0 : _a.find((d) => d.id === id);
      const isMatched = this.state.matches.find((d) => d.id === id);
      const isCached = this.state.cachedMatches.find((d) => d.id === id);
      const matchesKey = isPending ? "pendingMatches" : isMatched ? "matches" : isCached ? "cachedMatches" : "";
      if (matchesKey) {
        this.__store.setState((s) => {
          var _a2;
          return {
            ...s,
            [matchesKey]: (_a2 = s[matchesKey]) == null ? void 0 : _a2.map(
              (d) => d.id === id ? updated = updater(d) : d
            )
          };
        });
      }
      return updated;
    };
    this.getMatch = (matchId) => {
      return [
        ...this.state.cachedMatches,
        ...this.state.pendingMatches ?? [],
        ...this.state.matches
      ].find((d) => d.id === matchId);
    };
    this.loadMatches = async ({
      location,
      matches,
      preload: allPreload,
      onReady,
      updateMatch = this.updateMatch,
      sync
    }) => {
      let firstBadMatchIndex;
      let rendered = false;
      const triggerOnReady = async () => {
        if (!rendered) {
          rendered = true;
          await (onReady == null ? void 0 : onReady());
        }
      };
      const resolvePreload = (matchId) => {
        return !!(allPreload && !this.state.matches.find((d) => d.id === matchId));
      };
      if (!this.isServer && !this.state.matches.length) {
        triggerOnReady();
      }
      const handleRedirectAndNotFound = (match, err) => {
        var _a, _b, _c, _d;
        if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isResolvedRedirect)(err)) {
          if (!err.reloadDocument) {
            throw err;
          }
        }
        if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isRedirect)(err) || (0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err)) {
          updateMatch(match.id, (prev) => ({
            ...prev,
            status: (0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isRedirect)(err) ? "redirected" : (0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err) ? "notFound" : "error",
            isFetching: false,
            error: err,
            beforeLoadPromise: void 0,
            loaderPromise: void 0
          }));
          if (!err.routeId) {
            err.routeId = match.routeId;
          }
          (_a = match.beforeLoadPromise) == null ? void 0 : _a.resolve();
          (_b = match.loaderPromise) == null ? void 0 : _b.resolve();
          (_c = match.loadPromise) == null ? void 0 : _c.resolve();
          if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isRedirect)(err)) {
            rendered = true;
            err = this.resolveRedirect({ ...err, _fromLocation: location });
            throw err;
          } else if ((0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err)) {
            this._handleNotFound(matches, err, {
              updateMatch
            });
            (_d = this.serverSsr) == null ? void 0 : _d.onMatchSettled({
              router: this,
              match: this.getMatch(match.id)
            });
            throw err;
          }
        }
      };
      try {
        await new Promise((resolveAll, rejectAll) => {
          ;
          (async () => {
            var _a, _b, _c;
            try {
              const handleSerialError = (index, err, routerCode) => {
                var _a2, _b2;
                const { id: matchId, routeId } = matches[index];
                const route = this.looseRoutesById[routeId];
                if (err instanceof Promise) {
                  throw err;
                }
                err.routerCode = routerCode;
                firstBadMatchIndex = firstBadMatchIndex ?? index;
                handleRedirectAndNotFound(this.getMatch(matchId), err);
                try {
                  (_b2 = (_a2 = route.options).onError) == null ? void 0 : _b2.call(_a2, err);
                } catch (errorHandlerErr) {
                  err = errorHandlerErr;
                  handleRedirectAndNotFound(this.getMatch(matchId), err);
                }
                updateMatch(matchId, (prev) => {
                  var _a3, _b3;
                  (_a3 = prev.beforeLoadPromise) == null ? void 0 : _a3.resolve();
                  (_b3 = prev.loadPromise) == null ? void 0 : _b3.resolve();
                  return {
                    ...prev,
                    error: err,
                    status: "error",
                    isFetching: false,
                    updatedAt: Date.now(),
                    abortController: new AbortController(),
                    beforeLoadPromise: void 0
                  };
                });
              };
              for (const [index, { id: matchId, routeId }] of matches.entries()) {
                const existingMatch = this.getMatch(matchId);
                const parentMatchId = (_a = matches[index - 1]) == null ? void 0 : _a.id;
                const route = this.looseRoutesById[routeId];
                const pendingMs = route.options.pendingMs ?? this.options.defaultPendingMs;
                const shouldPending = !!(onReady && !this.isServer && !resolvePreload(matchId) && (route.options.loader || route.options.beforeLoad) && typeof pendingMs === "number" && pendingMs !== Infinity && (route.options.pendingComponent ?? this.options.defaultPendingComponent));
                let executeBeforeLoad = true;
                if (
                  // If we are in the middle of a load, either of these will be present
                  // (not to be confused with `loadPromise`, which is always defined)
                  existingMatch.beforeLoadPromise || existingMatch.loaderPromise
                ) {
                  if (shouldPending) {
                    setTimeout(() => {
                      try {
                        triggerOnReady();
                      } catch {
                      }
                    }, pendingMs);
                  }
                  await existingMatch.beforeLoadPromise;
                  executeBeforeLoad = this.getMatch(matchId).status !== "success";
                }
                if (executeBeforeLoad) {
                  try {
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      loadPromise: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)(() => {
                        var _a2;
                        (_a2 = prev.loadPromise) == null ? void 0 : _a2.resolve();
                      }),
                      beforeLoadPromise: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)()
                    }));
                    const abortController = new AbortController();
                    let pendingTimeout;
                    if (shouldPending) {
                      pendingTimeout = setTimeout(() => {
                        try {
                          triggerOnReady();
                        } catch {
                        }
                      }, pendingMs);
                    }
                    const { paramsError, searchError } = this.getMatch(matchId);
                    if (paramsError) {
                      handleSerialError(index, paramsError, "PARSE_PARAMS");
                    }
                    if (searchError) {
                      handleSerialError(index, searchError, "VALIDATE_SEARCH");
                    }
                    const getParentMatchContext = () => parentMatchId ? this.getMatch(parentMatchId).context : this.options.context ?? {};
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      isFetching: "beforeLoad",
                      fetchCount: prev.fetchCount + 1,
                      abortController,
                      pendingTimeout,
                      context: {
                        ...getParentMatchContext(),
                        ...prev.__routeContext
                      }
                    }));
                    const { search, params, context, cause } = this.getMatch(matchId);
                    const preload = resolvePreload(matchId);
                    const beforeLoadFnContext = {
                      search,
                      abortController,
                      params,
                      preload,
                      context,
                      location,
                      navigate: (opts) => this.navigate({ ...opts, _fromLocation: location }),
                      buildLocation: this.buildLocation,
                      cause: preload ? "preload" : cause,
                      matches
                    };
                    const beforeLoadContext = await ((_c = (_b = route.options).beforeLoad) == null ? void 0 : _c.call(_b, beforeLoadFnContext)) ?? {};
                    if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isRedirect)(beforeLoadContext) || (0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(beforeLoadContext)) {
                      handleSerialError(index, beforeLoadContext, "BEFORE_LOAD");
                    }
                    updateMatch(matchId, (prev) => {
                      return {
                        ...prev,
                        __beforeLoadContext: beforeLoadContext,
                        context: {
                          ...getParentMatchContext(),
                          ...prev.__routeContext,
                          ...beforeLoadContext
                        },
                        abortController
                      };
                    });
                  } catch (err) {
                    handleSerialError(index, err, "BEFORE_LOAD");
                  }
                  updateMatch(matchId, (prev) => {
                    var _a2;
                    (_a2 = prev.beforeLoadPromise) == null ? void 0 : _a2.resolve();
                    return {
                      ...prev,
                      beforeLoadPromise: void 0,
                      isFetching: false
                    };
                  });
                }
              }
              const validResolvedMatches = matches.slice(0, firstBadMatchIndex);
              const matchPromises = [];
              validResolvedMatches.forEach(({ id: matchId, routeId }, index) => {
                matchPromises.push(
                  (async () => {
                    const { loaderPromise: prevLoaderPromise } = this.getMatch(matchId);
                    let loaderShouldRunAsync = false;
                    let loaderIsRunningAsync = false;
                    if (prevLoaderPromise) {
                      await prevLoaderPromise;
                      const match = this.getMatch(matchId);
                      if (match.error) {
                        handleRedirectAndNotFound(match, match.error);
                      }
                    } else {
                      const parentMatchPromise = matchPromises[index - 1];
                      const route = this.looseRoutesById[routeId];
                      const getLoaderContext = () => {
                        const {
                          params,
                          loaderDeps,
                          abortController,
                          context,
                          cause
                        } = this.getMatch(matchId);
                        const preload2 = resolvePreload(matchId);
                        return {
                          params,
                          deps: loaderDeps,
                          preload: !!preload2,
                          parentMatchPromise,
                          abortController,
                          context,
                          location,
                          navigate: (opts) => this.navigate({ ...opts, _fromLocation: location }),
                          cause: preload2 ? "preload" : cause,
                          route
                        };
                      };
                      const age = Date.now() - this.getMatch(matchId).updatedAt;
                      const preload = resolvePreload(matchId);
                      const staleAge = preload ? route.options.preloadStaleTime ?? this.options.defaultPreloadStaleTime ?? 3e4 : route.options.staleTime ?? this.options.defaultStaleTime ?? 0;
                      const shouldReloadOption = route.options.shouldReload;
                      const shouldReload = typeof shouldReloadOption === "function" ? shouldReloadOption(getLoaderContext()) : shouldReloadOption;
                      updateMatch(matchId, (prev) => ({
                        ...prev,
                        loaderPromise: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)(),
                        preload: !!preload && !this.state.matches.find((d) => d.id === matchId)
                      }));
                      const runLoader = async () => {
                        var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i;
                        try {
                          const potentialPendingMinPromise = async () => {
                            const latestMatch = this.getMatch(matchId);
                            if (latestMatch.minPendingPromise) {
                              await latestMatch.minPendingPromise;
                            }
                          };
                          try {
                            this.loadRouteChunk(route);
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              isFetching: "loader"
                            }));
                            const loaderData = await ((_b2 = (_a2 = route.options).loader) == null ? void 0 : _b2.call(_a2, getLoaderContext()));
                            handleRedirectAndNotFound(
                              this.getMatch(matchId),
                              loaderData
                            );
                            await route._lazyPromise;
                            await potentialPendingMinPromise();
                            const headFnContent = (_d = (_c2 = route.options).head) == null ? void 0 : _d.call(_c2, {
                              matches,
                              match: this.getMatch(matchId),
                              params: this.getMatch(matchId).params,
                              loaderData
                            });
                            const meta = headFnContent == null ? void 0 : headFnContent.meta;
                            const links = headFnContent == null ? void 0 : headFnContent.links;
                            const scripts = headFnContent == null ? void 0 : headFnContent.scripts;
                            const headers = (_f = (_e = route.options).headers) == null ? void 0 : _f.call(_e, {
                              loaderData
                            });
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              error: void 0,
                              status: "success",
                              isFetching: false,
                              updatedAt: Date.now(),
                              loaderData,
                              meta,
                              links,
                              scripts,
                              headers
                            }));
                          } catch (e) {
                            let error = e;
                            await potentialPendingMinPromise();
                            handleRedirectAndNotFound(this.getMatch(matchId), e);
                            try {
                              (_h = (_g = route.options).onError) == null ? void 0 : _h.call(_g, e);
                            } catch (onErrorError) {
                              error = onErrorError;
                              handleRedirectAndNotFound(
                                this.getMatch(matchId),
                                onErrorError
                              );
                            }
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              error,
                              status: "error",
                              isFetching: false
                            }));
                          }
                          (_i = this.serverSsr) == null ? void 0 : _i.onMatchSettled({
                            router: this,
                            match: this.getMatch(matchId)
                          });
                          await route._componentsPromise;
                        } catch (err) {
                          updateMatch(matchId, (prev) => ({
                            ...prev,
                            loaderPromise: void 0
                          }));
                          handleRedirectAndNotFound(this.getMatch(matchId), err);
                        }
                      };
                      const { status, invalid } = this.getMatch(matchId);
                      loaderShouldRunAsync = status === "success" && (invalid || (shouldReload ?? age > staleAge));
                      if (preload && route.options.preload === false) {
                      } else if (loaderShouldRunAsync && !sync) {
                        loaderIsRunningAsync = true;
                        (async () => {
                          try {
                            await runLoader();
                            const { loaderPromise, loadPromise } = this.getMatch(matchId);
                            loaderPromise == null ? void 0 : loaderPromise.resolve();
                            loadPromise == null ? void 0 : loadPromise.resolve();
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              loaderPromise: void 0
                            }));
                          } catch (err) {
                            if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isResolvedRedirect)(err)) {
                              await this.navigate(err);
                            }
                          }
                        })();
                      } else if (status !== "success" || loaderShouldRunAsync && sync) {
                        await runLoader();
                      }
                    }
                    if (!loaderIsRunningAsync) {
                      const { loaderPromise, loadPromise } = this.getMatch(matchId);
                      loaderPromise == null ? void 0 : loaderPromise.resolve();
                      loadPromise == null ? void 0 : loadPromise.resolve();
                    }
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      isFetching: loaderIsRunningAsync ? prev.isFetching : false,
                      loaderPromise: loaderIsRunningAsync ? prev.loaderPromise : void 0,
                      invalid: false
                    }));
                    return this.getMatch(matchId);
                  })()
                );
              });
              await Promise.all(matchPromises);
              resolveAll();
            } catch (err) {
              rejectAll(err);
            }
          })();
        });
        await triggerOnReady();
      } catch (err) {
        if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isRedirect)(err) || (0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err)) {
          if ((0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err) && !allPreload) {
            await triggerOnReady();
          }
          throw err;
        }
      }
      return matches;
    };
    this.invalidate = (opts) => {
      const invalidate = (d) => {
        var _a;
        if (((_a = opts == null ? void 0 : opts.filter) == null ? void 0 : _a.call(opts, d)) ?? true) {
          return {
            ...d,
            invalid: true,
            ...d.status === "error" ? { status: "pending", error: void 0 } : {}
          };
        }
        return d;
      };
      this.__store.setState((s) => {
        var _a;
        return {
          ...s,
          matches: s.matches.map(invalidate),
          cachedMatches: s.cachedMatches.map(invalidate),
          pendingMatches: (_a = s.pendingMatches) == null ? void 0 : _a.map(invalidate)
        };
      });
      return this.load({ sync: opts == null ? void 0 : opts.sync });
    };
    this.resolveRedirect = (err) => {
      const redirect = err;
      if (!redirect.href) {
        redirect.href = this.buildLocation(redirect).href;
      }
      return redirect;
    };
    this.clearCache = (opts) => {
      const filter = opts == null ? void 0 : opts.filter;
      if (filter !== void 0) {
        this.__store.setState((s) => {
          return {
            ...s,
            cachedMatches: s.cachedMatches.filter(
              (m) => !filter(m)
            )
          };
        });
      } else {
        this.__store.setState((s) => {
          return {
            ...s,
            cachedMatches: []
          };
        });
      }
    };
    this.clearExpiredCache = () => {
      const filter = (d) => {
        const route = this.looseRoutesById[d.routeId];
        if (!route.options.loader) {
          return true;
        }
        const gcTime = (d.preload ? route.options.preloadGcTime ?? this.options.defaultPreloadGcTime : route.options.gcTime ?? this.options.defaultGcTime) ?? 5 * 60 * 1e3;
        return !(d.status !== "error" && Date.now() - d.updatedAt < gcTime);
      };
      this.clearCache({ filter });
    };
    this.loadRouteChunk = (route) => {
      if (route._lazyPromise === void 0) {
        if (route.lazyFn) {
          route._lazyPromise = route.lazyFn().then((lazyRoute) => {
            const { id: _id, ...options2 } = lazyRoute.options;
            Object.assign(route.options, options2);
          });
        } else {
          route._lazyPromise = Promise.resolve();
        }
      }
      if (route._componentsPromise === void 0) {
        route._componentsPromise = route._lazyPromise.then(
          () => Promise.all(
            componentTypes.map(async (type) => {
              const component = route.options[type];
              if (component == null ? void 0 : component.preload) {
                await component.preload();
              }
            })
          )
        );
      }
      return route._componentsPromise;
    };
    this.preloadRoute = async (opts) => {
      const next = this.buildLocation(opts);
      let matches = this.matchRoutes(next, {
        throwOnError: true,
        preload: true,
        dest: opts
      });
      const activeMatchIds = new Set(
        [...this.state.matches, ...this.state.pendingMatches ?? []].map(
          (d) => d.id
        )
      );
      const loadedMatchIds = /* @__PURE__ */ new Set([
        ...activeMatchIds,
        ...this.state.cachedMatches.map((d) => d.id)
      ]);
      (0,_tanstack_react_store__WEBPACK_IMPORTED_MODULE_7__.batch)(() => {
        matches.forEach((match) => {
          if (!loadedMatchIds.has(match.id)) {
            this.__store.setState((s) => ({
              ...s,
              cachedMatches: [...s.cachedMatches, match]
            }));
          }
        });
      });
      try {
        matches = await this.loadMatches({
          matches,
          location: next,
          preload: true,
          updateMatch: (id, updater) => {
            if (activeMatchIds.has(id)) {
              matches = matches.map((d) => d.id === id ? updater(d) : d);
            } else {
              this.updateMatch(id, updater);
            }
          }
        });
        return matches;
      } catch (err) {
        if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isRedirect)(err)) {
          if (err.reloadDocument) {
            return void 0;
          }
          return await this.preloadRoute({
            ...err,
            _fromLocation: next
          });
        }
        if (!(0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err)) {
          console.error(err);
        }
        return void 0;
      }
    };
    this.matchRoute = (location, opts) => {
      const matchLocation = {
        ...location,
        to: location.to ? this.resolvePathWithBase(
          location.from || "",
          location.to
        ) : void 0,
        params: location.params || {},
        leaveParams: true
      };
      const next = this.buildLocation(matchLocation);
      if ((opts == null ? void 0 : opts.pending) && this.state.status !== "pending") {
        return false;
      }
      const pending = (opts == null ? void 0 : opts.pending) === void 0 ? !this.state.isLoading : opts.pending;
      const baseLocation = pending ? this.latestLocation : this.state.resolvedLocation || this.state.location;
      const match = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.matchPathname)(this.basepath, baseLocation.pathname, {
        ...opts,
        to: next.pathname
      });
      if (!match) {
        return false;
      }
      if (location.params) {
        if (!(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.deepEqual)(match, location.params, { partial: true })) {
          return false;
        }
      }
      if (match && ((opts == null ? void 0 : opts.includeSearch) ?? true)) {
        return (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.deepEqual)(baseLocation.search, next.search, { partial: true }) ? match : false;
      }
      return match;
    };
    this._handleNotFound = (matches, err, {
      updateMatch = this.updateMatch
    } = {}) => {
      const matchesByRouteId = Object.fromEntries(
        matches.map((match2) => [match2.routeId, match2])
      );
      let routeCursor = (err.global ? this.looseRoutesById[_tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__.rootRouteId] : this.looseRoutesById[err.routeId]) || this.looseRoutesById[_tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__.rootRouteId];
      while (!routeCursor.options.notFoundComponent && !this.options.defaultNotFoundComponent && routeCursor.id !== _tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__.rootRouteId) {
        routeCursor = routeCursor.parentRoute;
        (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
          routeCursor,
          "Found invalid route tree while trying to find not-found handler."
        );
      }
      const match = matchesByRouteId[routeCursor.id];
      (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(match, "Could not find match for route: " + routeCursor.id);
      updateMatch(match.id, (prev) => ({
        ...prev,
        status: "notFound",
        error: err,
        isFetching: false
      }));
      if (err.routerCode === "BEFORE_LOAD" && routeCursor.parentRoute) {
        err.routeId = routeCursor.parentRoute.id;
        this._handleNotFound(matches, err, {
          updateMatch
        });
      }
    };
    this.hasNotFoundMatch = () => {
      return this.__store.state.matches.some(
        (d) => d.status === "notFound" || d.globalNotFound
      );
    };
    this.update({
      defaultPreloadDelay: 50,
      defaultPendingMs: 1e3,
      defaultPendingMinMs: 500,
      context: void 0,
      ...options,
      caseSensitive: options.caseSensitive ?? false,
      notFoundMode: options.notFoundMode ?? "fuzzy",
      stringifySearch: options.stringifySearch ?? _tanstack_router_core__WEBPACK_IMPORTED_MODULE_11__.defaultStringifySearch,
      parseSearch: options.parseSearch ?? _tanstack_router_core__WEBPACK_IMPORTED_MODULE_11__.defaultParseSearch
    });
    if (typeof document !== "undefined") {
      window.__TSR_ROUTER__ = this;
    }
  }
  get state() {
    return this.__store.state;
  }
  get looseRoutesById() {
    return this.routesById;
  }
  matchRoutes(pathnameOrNext, locationSearchOrOpts, opts) {
    if (typeof pathnameOrNext === "string") {
      return this.matchRoutesInternal(
        {
          pathname: pathnameOrNext,
          search: locationSearchOrOpts
        },
        opts
      );
    } else {
      return this.matchRoutesInternal(pathnameOrNext, locationSearchOrOpts);
    }
  }
  matchRoutesInternal(next, opts) {
    const { foundRoute, matchedRoutes, routeParams } = this.getMatchedRoutes(
      next,
      opts == null ? void 0 : opts.dest
    );
    let isGlobalNotFound = false;
    if (
      // If we found a route, and it's not an index route and we have left over path
      foundRoute ? foundRoute.path !== "/" && routeParams["**"] : (
        // Or if we didn't find a route and we have left over path
        (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.trimPathRight)(next.pathname)
      )
    ) {
      if (this.options.notFoundRoute) {
        matchedRoutes.push(this.options.notFoundRoute);
      } else {
        isGlobalNotFound = true;
      }
    }
    const globalNotFoundRouteId = (() => {
      if (!isGlobalNotFound) {
        return void 0;
      }
      if (this.options.notFoundMode !== "root") {
        for (let i = matchedRoutes.length - 1; i >= 0; i--) {
          const route = matchedRoutes[i];
          if (route.children) {
            return route.id;
          }
        }
      }
      return _tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__.rootRouteId;
    })();
    const parseErrors = matchedRoutes.map((route) => {
      var _a;
      let parsedParamsError;
      const parseParams = ((_a = route.options.params) == null ? void 0 : _a.parse) ?? route.options.parseParams;
      if (parseParams) {
        try {
          const parsedParams = parseParams(routeParams);
          Object.assign(routeParams, parsedParams);
        } catch (err) {
          parsedParamsError = new PathParamError(err.message, {
            cause: err
          });
          if (opts == null ? void 0 : opts.throwOnError) {
            throw parsedParamsError;
          }
          return parsedParamsError;
        }
      }
      return;
    });
    const matches = [];
    const getParentContext = (parentMatch) => {
      const parentMatchId = parentMatch == null ? void 0 : parentMatch.id;
      const parentContext = !parentMatchId ? this.options.context ?? {} : parentMatch.context ?? this.options.context ?? {};
      return parentContext;
    };
    matchedRoutes.forEach((route, index) => {
      var _a, _b, _c, _d;
      const parentMatch = matches[index - 1];
      const [preMatchSearch, strictMatchSearch, searchError] = (() => {
        const parentSearch = (parentMatch == null ? void 0 : parentMatch.search) ?? next.search;
        const parentStrictSearch = (parentMatch == null ? void 0 : parentMatch._strictSearch) ?? {};
        try {
          const strictSearch = validateSearch(route.options.validateSearch, { ...parentSearch }) ?? {};
          return [
            {
              ...parentSearch,
              ...strictSearch
            },
            { ...parentStrictSearch, ...strictSearch },
            void 0
          ];
        } catch (err) {
          let searchParamError = err;
          if (!(err instanceof SearchParamError)) {
            searchParamError = new SearchParamError(err.message, {
              cause: err
            });
          }
          if (opts == null ? void 0 : opts.throwOnError) {
            throw searchParamError;
          }
          return [parentSearch, {}, searchParamError];
        }
      })();
      const loaderDeps = ((_b = (_a = route.options).loaderDeps) == null ? void 0 : _b.call(_a, {
        search: preMatchSearch
      })) ?? "";
      const loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) : "";
      const { usedParams, interpolatedPath } = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.interpolatePath)({
        path: route.fullPath,
        params: routeParams,
        decodeCharMap: this.pathParamsDecodeCharMap
      });
      const matchId = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.interpolatePath)({
        path: route.id,
        params: routeParams,
        leaveWildcards: true,
        decodeCharMap: this.pathParamsDecodeCharMap
      }).interpolatedPath + loaderDepsHash;
      const existingMatch = this.getMatch(matchId);
      const previousMatch = this.state.matches.find(
        (d) => d.routeId === route.id
      );
      const cause = previousMatch ? "stay" : "enter";
      let match;
      if (existingMatch) {
        match = {
          ...existingMatch,
          cause,
          params: previousMatch ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.params, routeParams) : routeParams,
          _strictParams: usedParams,
          search: previousMatch ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.search, preMatchSearch) : (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(existingMatch.search, preMatchSearch),
          _strictSearch: strictMatchSearch
        };
      } else {
        const status = route.options.loader || route.options.beforeLoad || route.lazyFn || routeNeedsPreload(route) ? "pending" : "success";
        match = {
          id: matchId,
          index,
          routeId: route.id,
          params: previousMatch ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.params, routeParams) : routeParams,
          _strictParams: usedParams,
          pathname: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([this.basepath, interpolatedPath]),
          updatedAt: Date.now(),
          search: previousMatch ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.search, preMatchSearch) : preMatchSearch,
          _strictSearch: strictMatchSearch,
          searchError: void 0,
          status,
          isFetching: false,
          error: void 0,
          paramsError: parseErrors[index],
          __routeContext: {},
          __beforeLoadContext: {},
          context: {},
          abortController: new AbortController(),
          fetchCount: 0,
          cause,
          loaderDeps: previousMatch ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.loaderDeps, loaderDeps) : loaderDeps,
          invalid: false,
          preload: false,
          links: void 0,
          scripts: void 0,
          meta: void 0,
          staticData: route.options.staticData || {},
          loadPromise: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)(),
          fullPath: route.fullPath
        };
      }
      if (match.status === "success") {
        match.headers = (_d = (_c = route.options).headers) == null ? void 0 : _d.call(_c, {
          loaderData: match.loaderData
        });
      }
      if (!(opts == null ? void 0 : opts.preload)) {
        match.globalNotFound = globalNotFoundRouteId === route.id;
      }
      match.searchError = searchError;
      const parentContext = getParentContext(parentMatch);
      match.context = {
        ...parentContext,
        ...match.__routeContext,
        ...match.__beforeLoadContext
      };
      matches.push(match);
    });
    matches.forEach((match, index) => {
      var _a, _b, _c, _d;
      const route = this.looseRoutesById[match.routeId];
      const existingMatch = this.getMatch(match.id);
      if (!existingMatch && (opts == null ? void 0 : opts._buildLocation) !== true) {
        const parentMatch = matches[index - 1];
        const parentContext = getParentContext(parentMatch);
        const contextFnContext = {
          deps: match.loaderDeps,
          params: match.params,
          context: parentContext,
          location: next,
          navigate: (opts2) => this.navigate({ ...opts2, _fromLocation: next }),
          buildLocation: this.buildLocation,
          cause: match.cause,
          abortController: match.abortController,
          preload: !!match.preload,
          matches
        };
        match.__routeContext = ((_b = (_a = route.options).context) == null ? void 0 : _b.call(_a, contextFnContext)) ?? {};
        match.context = {
          ...parentContext,
          ...match.__routeContext,
          ...match.__beforeLoadContext
        };
      }
      const headFnContent = (_d = (_c = route.options).head) == null ? void 0 : _d.call(_c, {
        matches,
        match,
        params: match.params,
        loaderData: match.loaderData ?? void 0
      });
      match.links = headFnContent == null ? void 0 : headFnContent.links;
      match.scripts = headFnContent == null ? void 0 : headFnContent.scripts;
      match.meta = headFnContent == null ? void 0 : headFnContent.meta;
    });
    return matches;
  }
}
function lazyFn(fn, key) {
  return async (...args) => {
    const imported = await fn();
    return imported[key || "default"](...args);
  };
}
class SearchParamError extends Error {
}
class PathParamError extends Error {
}
function getInitialRouterState(location) {
  return {
    loadedAt: 0,
    isLoading: false,
    isTransitioning: false,
    status: "idle",
    resolvedLocation: void 0,
    location,
    matches: [],
    pendingMatches: [],
    cachedMatches: [],
    statusCode: 200
  };
}

//# sourceMappingURL=router.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/routerContext.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/routerContext.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRouterContext: () => (/* binding */ getRouterContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

const routerContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
function getRouterContext() {
  if (typeof document === "undefined") {
    return routerContext;
  }
  if (window.__TSR_ROUTER_CONTEXT__) {
    return window.__TSR_ROUTER_CONTEXT__;
  }
  window.__TSR_ROUTER_CONTEXT__ = routerContext;
  return routerContext;
}

//# sourceMappingURL=routerContext.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScrollRestoration: () => (/* binding */ ScrollRestoration),
/* harmony export */   defaultGetScrollRestorationKey: () => (/* binding */ defaultGetScrollRestorationKey),
/* harmony export */   getCssSelector: () => (/* binding */ getCssSelector),
/* harmony export */   restoreScroll: () => (/* binding */ restoreScroll),
/* harmony export */   scrollRestorationCache: () => (/* binding */ scrollRestorationCache),
/* harmony export */   setupScrollRestoration: () => (/* binding */ setupScrollRestoration),
/* harmony export */   storageKey: () => (/* binding */ storageKey)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _ScriptOnce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ScriptOnce.js */ "./node_modules/@tanstack/react-router/dist/esm/ScriptOnce.js");




const storageKey = "tsr-scroll-restoration-v1_3";
const sessionsStorage = typeof window !== "undefined" && window.sessionStorage;
const throttle = (fn, wait) => {
  let timeout;
  return (...args) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        fn(...args);
        timeout = null;
      }, wait);
    }
  };
};
const scrollRestorationCache = sessionsStorage ? (() => {
  const state = JSON.parse(window.sessionStorage.getItem(storageKey) || "null") || {};
  return {
    state,
    // This setter is simply to make sure that we set the sessionStorage right
    // after the state is updated. It doesn't necessarily need to be a functional
    // update.
    set: (updater) => (scrollRestorationCache.state = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.functionalUpdate)(updater, scrollRestorationCache.state) || scrollRestorationCache.state, window.sessionStorage.setItem(
      storageKey,
      JSON.stringify(scrollRestorationCache.state)
    ))
  };
})() : void 0;
const defaultGetScrollRestorationKey = (location) => {
  return location.state.key || location.href;
};
function getCssSelector(el) {
  const path = [];
  let parent;
  while (parent = el.parentNode) {
    path.unshift(
      `${el.tagName}:nth-child(${[].indexOf.call(parent.children, el) + 1})`
    );
    el = parent;
  }
  return `${path.join(" > ")}`.toLowerCase();
}
let ignoreScroll = false;
function restoreScroll(storageKey2, key, behavior, shouldScrollRestoration) {
  var _a;
  let byKey;
  try {
    byKey = JSON.parse(sessionStorage.getItem(storageKey2) || "{}");
  } catch (error) {
    console.error(error);
    return;
  }
  const resolvedKey = key || ((_a = window.history.state) == null ? void 0 : _a.key);
  const elementEntries = byKey[resolvedKey];
  ignoreScroll = true;
  (() => {
    if (shouldScrollRestoration && elementEntries) {
      for (const elementSelector in elementEntries) {
        const entry = elementEntries[elementSelector];
        if (elementSelector === "window") {
          window.scrollTo({
            top: entry.scrollY,
            left: entry.scrollX,
            behavior
          });
        } else if (elementSelector) {
          const element = document.querySelector(elementSelector);
          if (element) {
            element.scrollLeft = entry.scrollX;
            element.scrollTop = entry.scrollY;
          }
        }
      }
      return;
    }
    const hash = window.location.hash.split("#")[1];
    if (hash) {
      const hashScrollIntoViewOptions = (window.history.state || {}).__hashScrollIntoViewOptions ?? true;
      if (hashScrollIntoViewOptions) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView(hashScrollIntoViewOptions);
        }
      }
      return;
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior
    });
  })();
  ignoreScroll = false;
}
function setupScrollRestoration(router, force) {
  const shouldScrollRestoration = force ?? router.options.scrollRestoration ?? false;
  if (shouldScrollRestoration) {
    router.isScrollRestoring = true;
  }
  if (typeof document === "undefined" || router.isScrollRestorationSetup) {
    return;
  }
  router.isScrollRestorationSetup = true;
  ignoreScroll = false;
  const getKey = router.options.getScrollRestorationKey || defaultGetScrollRestorationKey;
  window.history.scrollRestoration = "manual";
  const onScroll = (event) => {
    if (ignoreScroll || !router.isScrollRestoring) {
      return;
    }
    let elementSelector = "";
    if (event.target === document || event.target === window) {
      elementSelector = "window";
    } else {
      const attrId = event.target.getAttribute(
        "data-scroll-restoration-id"
      );
      if (attrId) {
        elementSelector = `[data-scroll-restoration-id="${attrId}"]`;
      } else {
        elementSelector = getCssSelector(event.target);
      }
    }
    const restoreKey = getKey(router.state.location);
    scrollRestorationCache.set((state) => {
      const keyEntry = state[restoreKey] = state[restoreKey] || {};
      const elementEntry = keyEntry[elementSelector] = keyEntry[elementSelector] || {};
      if (elementSelector === "window") {
        elementEntry.scrollX = window.scrollX || 0;
        elementEntry.scrollY = window.scrollY || 0;
      } else if (elementSelector) {
        const element = document.querySelector(elementSelector);
        if (element) {
          elementEntry.scrollX = element.scrollLeft || 0;
          elementEntry.scrollY = element.scrollTop || 0;
        }
      }
      return state;
    });
  };
  if (typeof document !== "undefined") {
    document.addEventListener("scroll", throttle(onScroll, 100), true);
  }
  router.subscribe("onRendered", (event) => {
    const cacheKey = getKey(event.toLocation);
    if (!router.resetNextScroll) {
      router.resetNextScroll = true;
      return;
    }
    restoreScroll(
      storageKey,
      cacheKey,
      router.options.scrollRestorationBehavior,
      router.isScrollRestoring
    );
    if (router.isScrollRestoring) {
      scrollRestorationCache.set((state) => {
        state[cacheKey] = state[cacheKey] || {};
        return state;
      });
    }
  });
}
function ScrollRestoration() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
  const getKey = router.options.getScrollRestorationKey || defaultGetScrollRestorationKey;
  const userKey = getKey(router.latestLocation);
  const resolvedKey = userKey !== defaultGetScrollRestorationKey(router.latestLocation) ? userKey : null;
  if (!router.isScrollRestoring || !router.isServer) {
    return null;
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    _ScriptOnce_js__WEBPACK_IMPORTED_MODULE_3__.ScriptOnce,
    {
      children: `(${restoreScroll.toString()})(${JSON.stringify(storageKey)},${JSON.stringify(resolvedKey)}, undefined, true)`,
      log: false
    }
  );
}

//# sourceMappingURL=scroll-restoration.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useLoaderData.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useLoaderData.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLoaderData: () => (/* binding */ useLoaderData)
/* harmony export */ });
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");

function useLoaderData(opts) {
  return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_0__.useMatch)({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (s) => {
      return opts.select ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}

//# sourceMappingURL=useLoaderData.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLoaderDeps: () => (/* binding */ useLoaderDeps)
/* harmony export */ });
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");

function useLoaderDeps(opts) {
  const { select, ...rest } = opts;
  return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_0__.useMatch)({
    ...rest,
    select: (s) => {
      return select ? select(s.loaderDeps) : s.loaderDeps;
    }
  });
}

//# sourceMappingURL=useLoaderDeps.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js":
/*!******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useMatch.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMatch: () => (/* binding */ useMatch)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");
/* harmony import */ var _matchContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./matchContext.js */ "./node_modules/@tanstack/react-router/dist/esm/matchContext.js");




function useMatch(opts) {
  const nearestMatchId = react__WEBPACK_IMPORTED_MODULE_0__.useContext(
    opts.from ? _matchContext_js__WEBPACK_IMPORTED_MODULE_2__.dummyMatchContext : _matchContext_js__WEBPACK_IMPORTED_MODULE_2__.matchContext
  );
  const matchSelection = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_3__.useRouterState)({
    select: (state) => {
      const match = state.matches.find(
        (d) => opts.from ? opts.from === d.routeId : d.id === nearestMatchId
      );
      (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_1__["default"])(
        !((opts.shouldThrow ?? true) && !match),
        `Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`
      );
      if (match === void 0) {
        return void 0;
      }
      return opts.select ? opts.select(match) : match;
    },
    structuralSharing: opts.structuralSharing
  });
  return matchSelection;
}

//# sourceMappingURL=useMatch.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useNavigate.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Navigate: () => (/* binding */ Navigate),
/* harmony export */   useNavigate: () => (/* binding */ useNavigate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");


function useNavigate(_defaultOpts) {
  const { navigate } = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (options) => {
      return navigate({
        ...options
      });
    },
    [navigate]
  );
}
function Navigate(props) {
  const { navigate } = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    navigate({
      ...props
    });
  }, [navigate, props]);
  return null;
}

//# sourceMappingURL=useNavigate.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useParams.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useParams.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useParams: () => (/* binding */ useParams)
/* harmony export */ });
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");

function useParams(opts) {
  return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_0__.useMatch)({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.params) : match.params;
    }
  });
}

//# sourceMappingURL=useParams.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useRouter.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRouter: () => (/* binding */ useRouter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _routerContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routerContext.js */ "./node_modules/@tanstack/react-router/dist/esm/routerContext.js");



function useRouter(opts) {
  const value = react__WEBPACK_IMPORTED_MODULE_0__.useContext((0,_routerContext_js__WEBPACK_IMPORTED_MODULE_1__.getRouterContext)());
  (0,tiny_warning__WEBPACK_IMPORTED_MODULE_2__["default"])(
    !(((opts == null ? void 0 : opts.warn) ?? true) && !value),
    "useRouter must be used inside a <RouterProvider> component!"
  );
  return value;
}

//# sourceMappingURL=useRouter.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useRouterState.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRouterState: () => (/* binding */ useRouterState)
/* harmony export */ });
/* harmony import */ var _tanstack_react_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-store */ "./node_modules/@tanstack/react-store/dist/esm/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");




function useRouterState(opts) {
  const contextRouter = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)({
    warn: (opts == null ? void 0 : opts.router) === void 0
  });
  const router = (opts == null ? void 0 : opts.router) || contextRouter;
  const previousResult = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(void 0);
  return (0,_tanstack_react_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(router.__store, (state) => {
    if (opts == null ? void 0 : opts.select) {
      if (opts.structuralSharing ?? router.options.defaultStructuralSharing) {
        const newSlice = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_3__.replaceEqualDeep)(
          previousResult.current,
          opts.select(state)
        );
        previousResult.current = newSlice;
        return newSlice;
      }
      return opts.select(state);
    }
    return state;
  });
}

//# sourceMappingURL=useRouterState.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useSearch.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useSearch.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSearch: () => (/* binding */ useSearch)
/* harmony export */ });
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");

function useSearch(opts) {
  return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_0__.useMatch)({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}

//# sourceMappingURL=useSearch.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/utils.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/utils.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useForwardedRef: () => (/* binding */ useForwardedRef),
/* harmony export */   useIntersectionObserver: () => (/* binding */ useIntersectionObserver),
/* harmony export */   useLayoutEffect: () => (/* binding */ useLayoutEffect),
/* harmony export */   usePrevious: () => (/* binding */ usePrevious),
/* harmony export */   useStableCallback: () => (/* binding */ useStableCallback)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

function useStableCallback(fn) {
  const fnRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(fn);
  fnRef.current = fn;
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef((...args) => fnRef.current(...args));
  return ref.current;
}
const useLayoutEffect = typeof window !== "undefined" ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
function usePrevious(value) {
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef({
    value,
    prev: null
  });
  const current = ref.current.value;
  if (value !== current) {
    ref.current = {
      value,
      prev: current
    };
  }
  return ref.current.prev;
}
function useIntersectionObserver(ref, callback, intersectionObserverOptions = {}, options = {}) {
  const isIntersectionObserverAvailable = react__WEBPACK_IMPORTED_MODULE_0__.useRef(
    typeof IntersectionObserver === "function"
  );
  const observerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!ref.current || !isIntersectionObserverAvailable.current || options.disabled) {
      return;
    }
    observerRef.current = new IntersectionObserver(([entry]) => {
      callback(entry);
    }, intersectionObserverOptions);
    observerRef.current.observe(ref.current);
    return () => {
      var _a;
      (_a = observerRef.current) == null ? void 0 : _a.disconnect();
    };
  }, [callback, intersectionObserverOptions, options.disabled, ref]);
  return observerRef.current;
}
function useForwardedRef(ref) {
  const innerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });
  return innerRef;
}

//# sourceMappingURL=utils.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-store/dist/esm/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@tanstack/react-store/dist/esm/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Derived: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.Derived),
/* harmony export */   Effect: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.Effect),
/* harmony export */   Store: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.Store),
/* harmony export */   __depsThatHaveWrittenThisTick: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.__depsThatHaveWrittenThisTick),
/* harmony export */   __derivedToStore: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.__derivedToStore),
/* harmony export */   __flush: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.__flush),
/* harmony export */   __storeToDerived: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.__storeToDerived),
/* harmony export */   batch: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.batch),
/* harmony export */   shallow: () => (/* binding */ shallow),
/* harmony export */   useStore: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! use-sync-external-store/shim/with-selector.js */ "./node_modules/use-sync-external-store/shim/with-selector.js");
/* harmony import */ var _tanstack_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/store */ "./node_modules/@tanstack/store/dist/esm/index.js");


function useStore(store, selector = (d) => d) {
  const slice = (0,use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStoreWithSelector)(
    store.subscribe,
    () => store.state,
    () => store.state,
    selector,
    shallow
  );
  return slice;
}
function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false;
    for (const [k, v] of objA) {
      if (!objB.has(k) || !Object.is(v, objB.get(k))) return false;
    }
    return true;
  }
  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false;
    for (const v of objA) {
      if (!objB.has(v)) return false;
    }
    return true;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/path.js":
/*!*************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/path.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanPath: () => (/* binding */ cleanPath),
/* harmony export */   exactPathTest: () => (/* binding */ exactPathTest),
/* harmony export */   interpolatePath: () => (/* binding */ interpolatePath),
/* harmony export */   joinPaths: () => (/* binding */ joinPaths),
/* harmony export */   matchByPath: () => (/* binding */ matchByPath),
/* harmony export */   matchPathname: () => (/* binding */ matchPathname),
/* harmony export */   parsePathname: () => (/* binding */ parsePathname),
/* harmony export */   removeBasepath: () => (/* binding */ removeBasepath),
/* harmony export */   removeTrailingSlash: () => (/* binding */ removeTrailingSlash),
/* harmony export */   resolvePath: () => (/* binding */ resolvePath),
/* harmony export */   trimPath: () => (/* binding */ trimPath),
/* harmony export */   trimPathLeft: () => (/* binding */ trimPathLeft),
/* harmony export */   trimPathRight: () => (/* binding */ trimPathRight)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");

function joinPaths(paths) {
  return cleanPath(
    paths.filter((val) => {
      return val !== void 0;
    }).join("/")
  );
}
function cleanPath(path) {
  return path.replace(/\/{2,}/g, "/");
}
function trimPathLeft(path) {
  return path === "/" ? path : path.replace(/^\/{1,}/, "");
}
function trimPathRight(path) {
  return path === "/" ? path : path.replace(/\/{1,}$/, "");
}
function trimPath(path) {
  return trimPathRight(trimPathLeft(path));
}
function removeTrailingSlash(value, basepath) {
  if (value.endsWith("/") && value !== "/" && value !== `${basepath}/`) {
    return value.slice(0, -1);
  }
  return value;
}
function exactPathTest(pathName1, pathName2, basepath) {
  return removeTrailingSlash(pathName1, basepath) === removeTrailingSlash(pathName2, basepath);
}
function resolvePath({
  basepath,
  base,
  to,
  trailingSlash = "never",
  caseSensitive
}) {
  var _a, _b;
  base = removeBasepath(basepath, base, caseSensitive);
  to = removeBasepath(basepath, to, caseSensitive);
  let baseSegments = parsePathname(base);
  const toSegments = parsePathname(to);
  if (baseSegments.length > 1 && ((_a = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.last)(baseSegments)) == null ? void 0 : _a.value) === "/") {
    baseSegments.pop();
  }
  toSegments.forEach((toSegment, index) => {
    if (toSegment.value === "/") {
      if (!index) {
        baseSegments = [toSegment];
      } else if (index === toSegments.length - 1) {
        baseSegments.push(toSegment);
      } else ;
    } else if (toSegment.value === "..") {
      baseSegments.pop();
    } else if (toSegment.value === ".") ;
    else {
      baseSegments.push(toSegment);
    }
  });
  if (baseSegments.length > 1) {
    if (((_b = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.last)(baseSegments)) == null ? void 0 : _b.value) === "/") {
      if (trailingSlash === "never") {
        baseSegments.pop();
      }
    } else if (trailingSlash === "always") {
      baseSegments.push({ type: "pathname", value: "/" });
    }
  }
  const joined = joinPaths([basepath, ...baseSegments.map((d) => d.value)]);
  return cleanPath(joined);
}
function parsePathname(pathname) {
  if (!pathname) {
    return [];
  }
  pathname = cleanPath(pathname);
  const segments = [];
  if (pathname.slice(0, 1) === "/") {
    pathname = pathname.substring(1);
    segments.push({
      type: "pathname",
      value: "/"
    });
  }
  if (!pathname) {
    return segments;
  }
  const split = pathname.split("/").filter(Boolean);
  segments.push(
    ...split.map((part) => {
      if (part === "$" || part === "*") {
        return {
          type: "wildcard",
          value: part
        };
      }
      if (part.charAt(0) === "$") {
        return {
          type: "param",
          value: part
        };
      }
      return {
        type: "pathname",
        value: decodeURI(part)
      };
    })
  );
  if (pathname.slice(-1) === "/") {
    pathname = pathname.substring(1);
    segments.push({
      type: "pathname",
      value: "/"
    });
  }
  return segments;
}
function interpolatePath({
  path,
  params,
  leaveWildcards,
  leaveParams,
  decodeCharMap
}) {
  const interpolatedPathSegments = parsePathname(path);
  function encodeParam(key) {
    const value = params[key];
    const isValueString = typeof value === "string";
    if (["*", "_splat"].includes(key)) {
      return isValueString ? encodeURI(value) : value;
    } else {
      return isValueString ? encodePathParam(value, decodeCharMap) : value;
    }
  }
  const usedParams = {};
  const interpolatedPath = joinPaths(
    interpolatedPathSegments.map((segment) => {
      if (segment.type === "wildcard") {
        usedParams._splat = params._splat;
        const value = encodeParam("_splat");
        if (leaveWildcards) return `${segment.value}${value ?? ""}`;
        return value;
      }
      if (segment.type === "param") {
        const key = segment.value.substring(1);
        usedParams[key] = params[key];
        if (leaveParams) {
          const value = encodeParam(segment.value);
          return `${segment.value}${value ?? ""}`;
        }
        return encodeParam(key) ?? "undefined";
      }
      return segment.value;
    })
  );
  return { usedParams, interpolatedPath };
}
function encodePathParam(value, decodeCharMap) {
  let encoded = encodeURIComponent(value);
  if (decodeCharMap) {
    for (const [encodedChar, char] of decodeCharMap) {
      encoded = encoded.replaceAll(encodedChar, char);
    }
  }
  return encoded;
}
function matchPathname(basepath, currentPathname, matchLocation) {
  const pathParams = matchByPath(basepath, currentPathname, matchLocation);
  if (matchLocation.to && !pathParams) {
    return;
  }
  return pathParams ?? {};
}
function removeBasepath(basepath, pathname, caseSensitive = false) {
  const normalizedBasepath = caseSensitive ? basepath : basepath.toLowerCase();
  const normalizedPathname = caseSensitive ? pathname : pathname.toLowerCase();
  switch (true) {
    // default behaviour is to serve app from the root - pathname
    // left untouched
    case normalizedBasepath === "/":
      return pathname;
    // shortcut for removing the basepath if it matches the pathname
    case normalizedPathname === normalizedBasepath:
      return "";
    // in case pathname is shorter than basepath - there is
    // nothing to remove
    case pathname.length < basepath.length:
      return pathname;
    // avoid matching partial segments - strict equality handled
    // earlier, otherwise, basepath separated from pathname with
    // separator, therefore lack of separator means partial
    // segment match (`/app` should not match `/application`)
    case normalizedPathname[normalizedBasepath.length] !== "/":
      return pathname;
    // remove the basepath from the pathname if it starts with it
    case normalizedPathname.startsWith(normalizedBasepath):
      return pathname.slice(basepath.length);
    // otherwise, return the pathname as is
    default:
      return pathname;
  }
}
function matchByPath(basepath, from, matchLocation) {
  if (basepath !== "/" && !from.startsWith(basepath)) {
    return void 0;
  }
  from = removeBasepath(basepath, from, matchLocation.caseSensitive);
  const to = removeBasepath(
    basepath,
    `${matchLocation.to ?? "$"}`,
    matchLocation.caseSensitive
  );
  const baseSegments = parsePathname(from);
  const routeSegments = parsePathname(to);
  if (!from.startsWith("/")) {
    baseSegments.unshift({
      type: "pathname",
      value: "/"
    });
  }
  if (!to.startsWith("/")) {
    routeSegments.unshift({
      type: "pathname",
      value: "/"
    });
  }
  const params = {};
  const isMatch = (() => {
    for (let i = 0; i < Math.max(baseSegments.length, routeSegments.length); i++) {
      const baseSegment = baseSegments[i];
      const routeSegment = routeSegments[i];
      const isLastBaseSegment = i >= baseSegments.length - 1;
      const isLastRouteSegment = i >= routeSegments.length - 1;
      if (routeSegment) {
        if (routeSegment.type === "wildcard") {
          const _splat = decodeURI(
            joinPaths(baseSegments.slice(i).map((d) => d.value))
          );
          params["*"] = _splat;
          params["_splat"] = _splat;
          return true;
        }
        if (routeSegment.type === "pathname") {
          if (routeSegment.value === "/" && !(baseSegment == null ? void 0 : baseSegment.value)) {
            return true;
          }
          if (baseSegment) {
            if (matchLocation.caseSensitive) {
              if (routeSegment.value !== baseSegment.value) {
                return false;
              }
            } else if (routeSegment.value.toLowerCase() !== baseSegment.value.toLowerCase()) {
              return false;
            }
          }
        }
        if (!baseSegment) {
          return false;
        }
        if (routeSegment.type === "param") {
          if (baseSegment.value === "/") {
            return false;
          }
          if (baseSegment.value.charAt(0) !== "$") {
            params[routeSegment.value.substring(1)] = decodeURIComponent(
              baseSegment.value
            );
          }
        }
      }
      if (!isLastBaseSegment && isLastRouteSegment) {
        params["**"] = joinPaths(baseSegments.slice(i + 1).map((d) => d.value));
        return !!matchLocation.fuzzy && (routeSegment == null ? void 0 : routeSegment.value) !== "/";
      }
    }
    return true;
  })();
  return isMatch ? params : void 0;
}

//# sourceMappingURL=path.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/qss.js":
/*!************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/qss.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   encode: () => (/* binding */ encode)
/* harmony export */ });
function encode(obj, pfx) {
  let k, i, tmp, str = "";
  for (k in obj) {
    if ((tmp = obj[k]) !== void 0) {
      if (Array.isArray(tmp)) {
        for (i = 0; i < tmp.length; i++) {
          str && (str += "&");
          str += encodeURIComponent(k) + "=" + encodeURIComponent(tmp[i]);
        }
      } else {
        str && (str += "&");
        str += encodeURIComponent(k) + "=" + encodeURIComponent(tmp);
      }
    }
  }
  return (pfx || "") + str;
}
function toValue(mix) {
  if (!mix) return "";
  const str = decodeURIComponent(mix);
  if (str === "false") return false;
  if (str === "true") return true;
  return +str * 0 === 0 && +str + "" === str ? +str : str;
}
function decode(str, pfx) {
  let tmp, k;
  const out = {}, arr = (pfx ? str.substr(pfx.length) : str).split("&");
  while (tmp = arr.shift()) {
    const equalIndex = tmp.indexOf("=");
    if (equalIndex !== -1) {
      k = tmp.slice(0, equalIndex);
      k = decodeURIComponent(k);
      const value = tmp.slice(equalIndex + 1);
      if (out[k] !== void 0) {
        out[k] = [].concat(out[k], toValue(value));
      } else {
        out[k] = toValue(value);
      }
    } else {
      k = tmp;
      k = decodeURIComponent(k);
      out[k] = "";
    }
  }
  return out;
}

//# sourceMappingURL=qss.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/root.js":
/*!*************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/root.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rootRouteId: () => (/* binding */ rootRouteId)
/* harmony export */ });
const rootRouteId = "__root__";

//# sourceMappingURL=root.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/router.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/router.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultSerializeError: () => (/* binding */ defaultSerializeError),
/* harmony export */   getLocationChangeInfo: () => (/* binding */ getLocationChangeInfo)
/* harmony export */ });
function defaultSerializeError(err) {
  if (err instanceof Error) {
    const obj = {
      name: err.name,
      message: err.message
    };
    if (true) {
      obj.stack = err.stack;
    }
    return obj;
  }
  return {
    data: err
  };
}
function getLocationChangeInfo(routerState) {
  const fromLocation = routerState.resolvedLocation;
  const toLocation = routerState.location;
  const pathChanged = (fromLocation == null ? void 0 : fromLocation.pathname) !== toLocation.pathname;
  const hrefChanged = (fromLocation == null ? void 0 : fromLocation.href) !== toLocation.href;
  const hashChanged = (fromLocation == null ? void 0 : fromLocation.hash) !== toLocation.hash;
  return { fromLocation, toLocation, pathChanged, hrefChanged, hashChanged };
}

//# sourceMappingURL=router.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/searchParams.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/searchParams.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultParseSearch: () => (/* binding */ defaultParseSearch),
/* harmony export */   defaultStringifySearch: () => (/* binding */ defaultStringifySearch),
/* harmony export */   parseSearchWith: () => (/* binding */ parseSearchWith),
/* harmony export */   stringifySearchWith: () => (/* binding */ stringifySearchWith)
/* harmony export */ });
/* harmony import */ var _qss_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./qss.js */ "./node_modules/@tanstack/router-core/dist/esm/qss.js");

const defaultParseSearch = parseSearchWith(JSON.parse);
const defaultStringifySearch = stringifySearchWith(
  JSON.stringify,
  JSON.parse
);
function parseSearchWith(parser) {
  return (searchStr) => {
    if (searchStr.substring(0, 1) === "?") {
      searchStr = searchStr.substring(1);
    }
    const query = (0,_qss_js__WEBPACK_IMPORTED_MODULE_0__.decode)(searchStr);
    for (const key in query) {
      const value = query[key];
      if (typeof value === "string") {
        try {
          query[key] = parser(value);
        } catch (err) {
        }
      }
    }
    return query;
  };
}
function stringifySearchWith(stringify, parser) {
  function stringifyValue(val) {
    if (typeof val === "object" && val !== null) {
      try {
        return stringify(val);
      } catch (err) {
      }
    } else if (typeof val === "string" && typeof parser === "function") {
      try {
        parser(val);
        return stringify(val);
      } catch (err) {
      }
    }
    return val;
  }
  return (search) => {
    search = { ...search };
    Object.keys(search).forEach((key) => {
      const val = search[key];
      if (typeof val === "undefined" || val === void 0) {
        delete search[key];
      } else {
        search[key] = stringifyValue(val);
      }
    });
    const searchStr = (0,_qss_js__WEBPACK_IMPORTED_MODULE_0__.encode)(search).toString();
    return searchStr ? `?${searchStr}` : "";
  };
}

//# sourceMappingURL=searchParams.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/utils.js":
/*!**************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/utils.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createControlledPromise: () => (/* binding */ createControlledPromise),
/* harmony export */   deepEqual: () => (/* binding */ deepEqual),
/* harmony export */   escapeJSON: () => (/* binding */ escapeJSON),
/* harmony export */   functionalUpdate: () => (/* binding */ functionalUpdate),
/* harmony export */   isPlainArray: () => (/* binding */ isPlainArray),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   last: () => (/* binding */ last),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   replaceEqualDeep: () => (/* binding */ replaceEqualDeep),
/* harmony export */   shallow: () => (/* binding */ shallow)
/* harmony export */ });
function last(arr) {
  return arr[arr.length - 1];
}
function isFunction(d) {
  return typeof d === "function";
}
function functionalUpdate(updater, previous) {
  if (isFunction(updater)) {
    return updater(previous);
  }
  return updater;
}
function pick(parent, keys) {
  return keys.reduce((obj, key) => {
    obj[key] = parent[key];
    return obj;
  }, {});
}
function replaceEqualDeep(prev, _next) {
  if (prev === _next) {
    return prev;
  }
  const next = _next;
  const array = isPlainArray(prev) && isPlainArray(next);
  if (array || isPlainObject(prev) && isPlainObject(next)) {
    const prevItems = array ? prev : Object.keys(prev);
    const prevSize = prevItems.length;
    const nextItems = array ? next : Object.keys(next);
    const nextSize = nextItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < nextSize; i++) {
      const key = array ? i : nextItems[i];
      if ((!array && prevItems.includes(key) || array) && prev[key] === void 0 && next[key] === void 0) {
        copy[key] = void 0;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(prev[key], next[key]);
        if (copy[key] === prev[key] && prev[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return prevSize === nextSize && equalItems === prevSize ? prev : copy;
  }
  return next;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function getObjectKeys(obj, ignoreUndefined) {
  let keys = Object.keys(obj);
  if (ignoreUndefined) {
    keys = keys.filter((key) => obj[key] !== void 0);
  }
  return keys;
}
function deepEqual(a, b, opts) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const ignoreUndefined = (opts == null ? void 0 : opts.ignoreUndefined) ?? true;
    const aKeys = getObjectKeys(a, ignoreUndefined);
    const bKeys = getObjectKeys(b, ignoreUndefined);
    if (!(opts == null ? void 0 : opts.partial) && aKeys.length !== bKeys.length) {
      return false;
    }
    return bKeys.every((key) => deepEqual(a[key], b[key], opts));
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return !a.some((item, index) => !deepEqual(item, b[index], opts));
  }
  return false;
}
function createControlledPromise(onResolve) {
  let resolveLoadPromise;
  let rejectLoadPromise;
  const controlledPromise = new Promise((resolve, reject) => {
    resolveLoadPromise = resolve;
    rejectLoadPromise = reject;
  });
  controlledPromise.status = "pending";
  controlledPromise.resolve = (value) => {
    controlledPromise.status = "resolved";
    controlledPromise.value = value;
    resolveLoadPromise(value);
    onResolve == null ? void 0 : onResolve(value);
  };
  controlledPromise.reject = (e) => {
    controlledPromise.status = "rejected";
    rejectLoadPromise(e);
  };
  return controlledPromise;
}
function escapeJSON(jsonString) {
  return jsonString.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');
}
function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (const item of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, item) || !Object.is(objA[item], objB[item])) {
      return false;
    }
  }
  return true;
}

//# sourceMappingURL=utils.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/derived.js":
/*!**********************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/derived.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Derived: () => (/* binding */ Derived)
/* harmony export */ });
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store.js */ "./node_modules/@tanstack/store/dist/esm/store.js");
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/@tanstack/store/dist/esm/scheduler.js");


class Derived {
  constructor(options) {
    this.listeners = /* @__PURE__ */ new Set();
    this._subscriptions = [];
    this.lastSeenDepValues = [];
    this.getDepVals = () => {
      const prevDepVals = [];
      const currDepVals = [];
      for (const dep of this.options.deps) {
        prevDepVals.push(dep.prevState);
        currDepVals.push(dep.state);
      }
      this.lastSeenDepValues = currDepVals;
      return {
        prevDepVals,
        currDepVals,
        prevVal: this.prevState ?? void 0
      };
    };
    this.recompute = () => {
      var _a, _b;
      this.prevState = this.state;
      const { prevDepVals, currDepVals, prevVal } = this.getDepVals();
      this.state = this.options.fn({
        prevDepVals,
        currDepVals,
        prevVal
      });
      (_b = (_a = this.options).onUpdate) == null ? void 0 : _b.call(_a);
    };
    this.checkIfRecalculationNeededDeeply = () => {
      for (const dep of this.options.deps) {
        if (dep instanceof Derived) {
          dep.checkIfRecalculationNeededDeeply();
        }
      }
      let shouldRecompute = false;
      const lastSeenDepValues = this.lastSeenDepValues;
      const { currDepVals } = this.getDepVals();
      for (let i = 0; i < currDepVals.length; i++) {
        if (currDepVals[i] !== lastSeenDepValues[i]) {
          shouldRecompute = true;
          break;
        }
      }
      if (shouldRecompute) {
        this.recompute();
      }
    };
    this.mount = () => {
      this.registerOnGraph();
      this.checkIfRecalculationNeededDeeply();
      return () => {
        this.unregisterFromGraph();
        for (const cleanup of this._subscriptions) {
          cleanup();
        }
      };
    };
    this.subscribe = (listener) => {
      var _a, _b;
      this.listeners.add(listener);
      const unsub = (_b = (_a = this.options).onSubscribe) == null ? void 0 : _b.call(_a, listener, this);
      return () => {
        this.listeners.delete(listener);
        unsub == null ? void 0 : unsub();
      };
    };
    this.options = options;
    this.state = options.fn({
      prevDepVals: void 0,
      prevVal: void 0,
      currDepVals: this.getDepVals().currDepVals
    });
  }
  registerOnGraph(deps = this.options.deps) {
    for (const dep of deps) {
      if (dep instanceof Derived) {
        dep.registerOnGraph();
        this.registerOnGraph(dep.options.deps);
      } else if (dep instanceof _store_js__WEBPACK_IMPORTED_MODULE_0__.Store) {
        let relatedLinkedDerivedVals = _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__storeToDerived.get(dep);
        if (!relatedLinkedDerivedVals) {
          relatedLinkedDerivedVals = /* @__PURE__ */ new Set();
          _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__storeToDerived.set(dep, relatedLinkedDerivedVals);
        }
        relatedLinkedDerivedVals.add(this);
        let relatedStores = _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__derivedToStore.get(this);
        if (!relatedStores) {
          relatedStores = /* @__PURE__ */ new Set();
          _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__derivedToStore.set(this, relatedStores);
        }
        relatedStores.add(dep);
      }
    }
  }
  unregisterFromGraph(deps = this.options.deps) {
    for (const dep of deps) {
      if (dep instanceof Derived) {
        this.unregisterFromGraph(dep.options.deps);
      } else if (dep instanceof _store_js__WEBPACK_IMPORTED_MODULE_0__.Store) {
        const relatedLinkedDerivedVals = _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__storeToDerived.get(dep);
        if (relatedLinkedDerivedVals) {
          relatedLinkedDerivedVals.delete(this);
        }
        const relatedStores = _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__derivedToStore.get(this);
        if (relatedStores) {
          relatedStores.delete(dep);
        }
      }
    }
  }
}

//# sourceMappingURL=derived.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/effect.js":
/*!*********************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/effect.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Effect: () => (/* binding */ Effect)
/* harmony export */ });
/* harmony import */ var _derived_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./derived.js */ "./node_modules/@tanstack/store/dist/esm/derived.js");

class Effect {
  constructor(opts) {
    const { eager, fn, ...derivedProps } = opts;
    this._derived = new _derived_js__WEBPACK_IMPORTED_MODULE_0__.Derived({
      ...derivedProps,
      fn: () => {
      },
      onUpdate() {
        fn();
      }
    });
    if (eager) {
      fn();
    }
  }
  mount() {
    return this._derived.mount();
  }
}

//# sourceMappingURL=effect.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Derived: () => (/* reexport safe */ _derived_js__WEBPACK_IMPORTED_MODULE_0__.Derived),
/* harmony export */   Effect: () => (/* reexport safe */ _effect_js__WEBPACK_IMPORTED_MODULE_1__.Effect),
/* harmony export */   Store: () => (/* reexport safe */ _store_js__WEBPACK_IMPORTED_MODULE_2__.Store),
/* harmony export */   __depsThatHaveWrittenThisTick: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.__depsThatHaveWrittenThisTick),
/* harmony export */   __derivedToStore: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.__derivedToStore),
/* harmony export */   __flush: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.__flush),
/* harmony export */   __storeToDerived: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.__storeToDerived),
/* harmony export */   batch: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.batch)
/* harmony export */ });
/* harmony import */ var _derived_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./derived.js */ "./node_modules/@tanstack/store/dist/esm/derived.js");
/* harmony import */ var _effect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effect.js */ "./node_modules/@tanstack/store/dist/esm/effect.js");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store.js */ "./node_modules/@tanstack/store/dist/esm/store.js");
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/@tanstack/store/dist/esm/scheduler.js");





//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/scheduler.js":
/*!************************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/scheduler.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __depsThatHaveWrittenThisTick: () => (/* binding */ __depsThatHaveWrittenThisTick),
/* harmony export */   __derivedToStore: () => (/* binding */ __derivedToStore),
/* harmony export */   __flush: () => (/* binding */ __flush),
/* harmony export */   __storeToDerived: () => (/* binding */ __storeToDerived),
/* harmony export */   batch: () => (/* binding */ batch)
/* harmony export */ });
/* harmony import */ var _derived_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./derived.js */ "./node_modules/@tanstack/store/dist/esm/derived.js");

const __storeToDerived = /* @__PURE__ */ new WeakMap();
const __derivedToStore = /* @__PURE__ */ new WeakMap();
const __depsThatHaveWrittenThisTick = {
  current: []
};
let __isFlushing = false;
let __batchDepth = 0;
const __pendingUpdates = /* @__PURE__ */ new Set();
const __initialBatchValues = /* @__PURE__ */ new Map();
function __flush_internals(relatedVals) {
  const sorted = Array.from(relatedVals).sort((a, b) => {
    if (a instanceof _derived_js__WEBPACK_IMPORTED_MODULE_0__.Derived && a.options.deps.includes(b)) return 1;
    if (b instanceof _derived_js__WEBPACK_IMPORTED_MODULE_0__.Derived && b.options.deps.includes(a)) return -1;
    return 0;
  });
  for (const derived of sorted) {
    if (__depsThatHaveWrittenThisTick.current.includes(derived)) {
      continue;
    }
    __depsThatHaveWrittenThisTick.current.push(derived);
    derived.recompute();
    const stores = __derivedToStore.get(derived);
    if (stores) {
      for (const store of stores) {
        const relatedLinkedDerivedVals = __storeToDerived.get(store);
        if (!relatedLinkedDerivedVals) continue;
        __flush_internals(relatedLinkedDerivedVals);
      }
    }
  }
}
function __notifyListeners(store) {
  store.listeners.forEach(
    (listener) => listener({
      prevVal: store.prevState,
      currentVal: store.state
    })
  );
}
function __notifyDerivedListeners(derived) {
  derived.listeners.forEach(
    (listener) => listener({
      prevVal: derived.prevState,
      currentVal: derived.state
    })
  );
}
function __flush(store) {
  if (__batchDepth > 0 && !__initialBatchValues.has(store)) {
    __initialBatchValues.set(store, store.prevState);
  }
  __pendingUpdates.add(store);
  if (__batchDepth > 0) return;
  if (__isFlushing) return;
  try {
    __isFlushing = true;
    while (__pendingUpdates.size > 0) {
      const stores = Array.from(__pendingUpdates);
      __pendingUpdates.clear();
      for (const store2 of stores) {
        const prevState = __initialBatchValues.get(store2) ?? store2.prevState;
        store2.prevState = prevState;
        __notifyListeners(store2);
      }
      for (const store2 of stores) {
        const derivedVals = __storeToDerived.get(store2);
        if (!derivedVals) continue;
        __depsThatHaveWrittenThisTick.current.push(store2);
        __flush_internals(derivedVals);
      }
      for (const store2 of stores) {
        const derivedVals = __storeToDerived.get(store2);
        if (!derivedVals) continue;
        for (const derived of derivedVals) {
          __notifyDerivedListeners(derived);
        }
      }
    }
  } finally {
    __isFlushing = false;
    __depsThatHaveWrittenThisTick.current = [];
    __initialBatchValues.clear();
  }
}
function batch(fn) {
  __batchDepth++;
  try {
    fn();
  } finally {
    __batchDepth--;
    if (__batchDepth === 0) {
      const pendingUpdateToFlush = Array.from(__pendingUpdates)[0];
      if (pendingUpdateToFlush) {
        __flush(pendingUpdateToFlush);
      }
    }
  }
}

//# sourceMappingURL=scheduler.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/store.js":
/*!********************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/store.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Store: () => (/* binding */ Store)
/* harmony export */ });
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/@tanstack/store/dist/esm/scheduler.js");

class Store {
  constructor(initialState, options) {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = (listener) => {
      var _a, _b;
      this.listeners.add(listener);
      const unsub = (_b = (_a = this.options) == null ? void 0 : _a.onSubscribe) == null ? void 0 : _b.call(_a, listener, this);
      return () => {
        this.listeners.delete(listener);
        unsub == null ? void 0 : unsub();
      };
    };
    this.setState = (updater) => {
      var _a, _b, _c;
      this.prevState = this.state;
      this.state = ((_a = this.options) == null ? void 0 : _a.updateFn) ? this.options.updateFn(this.prevState)(updater) : updater(this.prevState);
      (_c = (_b = this.options) == null ? void 0 : _b.onUpdate) == null ? void 0 : _c.call(_b);
      (0,_scheduler_js__WEBPACK_IMPORTED_MODULE_0__.__flush)(this);
    };
    this.prevState = initialState;
    this.state = initialState;
    this.options = options;
  }
}

//# sourceMappingURL=store.js.map


/***/ }),

/***/ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js":
/*!****************************************************************!*\
  !*** ./node_modules/tiny-invariant/dist/esm/tiny-invariant.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ invariant)
/* harmony export */ });
var isProduction = "development" === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix);
    }
    var provided = typeof message === 'function' ? message() : message;
    var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
    throw new Error(value);
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "simplybook_app:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunksimplybook_app"] = globalThis["webpackChunksimplybook_app"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/query-core/build/modern/queryCache.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/query-core/build/modern/queryClient.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/history/dist/esm/index.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/route.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/router.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/RouterProvider.js");
/* harmony import */ var _routes_root_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes/__root.jsx */ "./src/routes/__root.jsx");
/* harmony import */ var _routeTree_gen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routeTree.gen */ "./src/routeTree.gen.ts");





// Import the generated route tree

const hashHistory = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__.createHashHistory)();
const HOUR_IN_SECONDS = 3600;
const queryCache = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.QueryCache({
  onError: error => {
    // any error handling code...
  }
});
let config = {
  defaultOptions: {
    queries: {
      staleTime: HOUR_IN_SECONDS * 1000,
      // hour in ms
      refetchOnWindowFocus: false,
      retry: false,
      suspense: false
    }
  }
};

// merge queryCache with config
config = {
  ...config,
  ...{
    queryCache
  }
};
const queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.QueryClient(config);
const notFoundRoute = new _tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__.NotFoundRoute({
  getParentRoute: () => _routes_root_jsx__WEBPACK_IMPORTED_MODULE_1__.Route,
  component: () => /*#__PURE__*/React.createElement("div", {
    className: "simplybook"
  }, "404 Not Found")
});
const router = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_7__.createRouter)({
  routeTree: _routeTree_gen__WEBPACK_IMPORTED_MODULE_2__.routeTree,
  notFoundRoute,
  context: {
    queryClient
  },
  history: hashHistory,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0
});

// Lazy load dev tools
const ReactQueryDevtools = React.lazy(() => __webpack_require__.e(/*! import() */ "vendors-node_modules_tanstack_react-query-devtools_build_modern_index_js").then(__webpack_require__.bind(__webpack_require__, /*! @tanstack/react-query-devtools */ "./node_modules/@tanstack/react-query-devtools/build/modern/index.js")).then(d => ({
  default: d.ReactQueryDevtools
})));
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("simplybook_app");
  if (container) {
    // Disable React Query's suspense by default
    config.defaultOptions.queries.suspense = false;

    // Don't clear the container immediately
    const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(container, {
      hydrate: true,
      // Tell React to hydrate instead of render
      onRecoverableError: err => {
        console.warn('Hydration error (usually harmless):', err);
      }
    });
    root.render(/*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__.QueryClientProvider, {
      client: queryClient
    }, /*#__PURE__*/React.createElement(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_9__.RouterProvider, {
      router: router
    }),  true && /*#__PURE__*/React.createElement(React.Suspense, null, /*#__PURE__*/React.createElement(ReactQueryDevtools, null)))));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map