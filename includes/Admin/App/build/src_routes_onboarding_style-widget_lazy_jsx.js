"use strict";
(globalThis["webpackChunksimplybook_app"] = globalThis["webpackChunksimplybook_app"] || []).push([["src_routes_onboarding_style-widget_lazy_jsx"],{

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
const API_BASE_PATH = "simplybook/v1/";

// URLs for the site and AJAX endpoint
const SITE_URL = getSiteUrl("rest_url");
const AJAX_URL = getSiteUrl("ajax_url");

// Text domain for SimplyBook translations
const TEXT_DOMAIN = "simplybook";

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
  if (window.location.protocol === "https:" && !url.includes("https://")) {
    url = url.replace("http://", "https://");
  }
  return url;
}

/***/ }),

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
/* harmony import */ var _types_LoginData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types/LoginData */ "./src/types/LoginData.ts");


/**
 * Update an onboarding step
 * @return {Promise<LoginData>}
 */
const getLoginUrl = async () => {
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("get_login_url", "POST");
  if (!res || !res.data.url) {
    return {
      'url': '',
      'login_url': '',
      'domain': ''
    };
  }
  return res.data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getLoginUrl);

/***/ }),

/***/ "./src/api/endpoints/getProviders.js":
/*!*******************************************!*\
  !*** ./src/api/endpoints/getProviders.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requests/request */ "./src/api/requests/request.js");


/**
 * Update an onboarding step
 * @return {Promise<array>}
 */
const getProviders = async () => {
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("providers", "POST");
  if (!res || !res.data) {
    console.log("no Providers found");
    return [];
  }
  console.log("getProviders response ", res);
  return res.data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getProviders);

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
 * @return {Promise<array>}
 */
const getServices = async () => {
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("services", "POST");
  if (!res || !res.data) {
    console.log("no services found");
    return [];
  }
  console.log("getServices response ", res);
  return res.data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getServices);

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
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("settings/get", "POST", {
    withValues
  });
  return res.data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getSettingsFields);

/***/ }),

/***/ "./src/api/endpoints/getWidget.js":
/*!****************************************!*\
  !*** ./src/api/endpoints/getWidget.js ***!
  \****************************************/
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
const getWidget = async () => {
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("get_widget", "POST");
  if (!res || !res.data.widget) {
    return {
      'widget': ''
    };
  }
  return res.data.widget;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getWidget);

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

/***/ "./src/api/endpoints/onBoarding/generatePages.js":
/*!*******************************************************!*\
  !*** ./src/api/endpoints/onBoarding/generatePages.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../requests/request */ "./src/api/requests/request.js");


/**
 * Update an onboarding step
 * @param data
 * @return {Promise<void>}
 */
const generatePages = async ({
  data = true
}) => {
  return await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("onboarding/generate_pages", "POST", {
    data
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generatePages);

/***/ }),

/***/ "./src/api/endpoints/onBoarding/isPageTitleAvailable.js":
/*!**************************************************************!*\
  !*** ./src/api/endpoints/onBoarding/isPageTitleAvailable.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../requests/request */ "./src/api/requests/request.js");


/**
 * Update an onboarding step
 * @param data
 * @return {Promise<void>}
 */
const isPageTitleAvailable = async ({
  data = true
}) => {
  return await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("onboarding/is_page_title_available", "POST", {
    data
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPageTitleAvailable);

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

/***/ "./src/api/endpoints/saveSettings.js":
/*!*******************************************!*\
  !*** ./src/api/endpoints/saveSettings.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requests/request */ "./src/api/requests/request.js");


/**
 * Get settings fields (with or without values)
 * @param data
 * @return {Promise<void>}
 */
const saveSettingsFields = async data => {
  console.log("saving settings", data);
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("settings/save", "POST", data);
  console.log("save settings fields response", res.data);
  return res.data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (saveSettingsFields);

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

const usesPlainPermalinks = () => _config__WEBPACK_IMPORTED_MODULE_0__.SITE_URL.includes("?");
const glue = () => usesPlainPermalinks() ? "&" : "?";
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
const fetchRequest = async (path, method = "POST", data = {}, url) => {
  const args = {
    path,
    method,
    data
  };
  const test_url = "simplybook/v1/settings/get_fields";
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
const request = async (path, method = "POST", data = {}) => {
  const args = {
    path,
    method,
    data
  };
  args.path = _config__WEBPACK_IMPORTED_MODULE_3__.API_BASE_PATH + args.path + (0,_helpers_glue__WEBPACK_IMPORTED_MODULE_1__["default"])() + "&token=" + Math.random().toString(36).substring(2, 7);
  args.data = {
    ...data,
    nonce: _config__WEBPACK_IMPORTED_MODULE_3__.NONCE
  };
  if (method === 'GET') {
    console.log("the request method is not adjusted for GET requests yet. ");
  }
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

/***/ "./src/components/Common/CalendarLoading.jsx":
/*!***************************************************!*\
  !*** ./src/components/Common/CalendarLoading.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const CalendarLoading = () => {
  let grayBackground = "bg-gray-100";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "w-full max-w-md bg-white shadow-md rounded-lg animate-pulse mt-5",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: `text-white text-center py-3 rounded-t-lg ${grayBackground}`,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
        className: "h-10"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "p-4",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "text-center h-40",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: `w-full h-full ${grayBackground} rounded-md`
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "p-4 border-t",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h4", {
        className: "text-gray-700 font-bold mb-4",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: `h-6 ${grayBackground} rounded-md`
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "grid grid-cols-3 gap-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: `text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: `text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: `text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: `text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: `text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: `text-white text-center py-2 rounded-md ${grayBackground} w-full h-10`
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "text-gray-500 text-sm mt-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          className: `inline-block w-3 h-3 rounded-full ${grayBackground}`
        }), " - ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          className: "font-medium"
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CalendarLoading);

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
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);



// Map your icons to keys for easy referencing

const iconMap = {
  "square-arrow-up-right": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faSquareArrowUpRight,
  "spinner": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faSpinner,
  "chevron-down": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faChevronDown,
  "chevron-up": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faChevronUp,
  "check": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faCheck,
  "info": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faInfoCircle,
  "times": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faTimes,
  "trophy": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faTrophy,
  "user-group": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faUserGroup,
  "eye": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faEye,
  "bullhorn": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faBullhorn,
  "clock": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faClock,
  "circle": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faCircle,
  "cart": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faShoppingCart
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_0__.FontAwesomeIcon, {
    icon: icon,
    size: size,
    spin: name === 'spinner',
    className: className,
    style: {
      color,
      ...(name === 'spinner' && {
        animationDuration: '2s'
      })
    },
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
/* harmony import */ var _Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.tsx");
/* harmony import */ var _hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var _hooks_useLoginData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useLoginData */ "./src/hooks/useLoginData.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






const LoginLink = ({
  className,
  page,
  isButton = false,
  size = "md",
  btnVariant,
  children
}) => {
  const {
    alreadyLoggedIn,
    setAlreadyLoggedIn,
    directUrl,
    loginUrl,
    loginUrlFetched,
    fetchLinkData
  } = (0,_hooks_useLoginData__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const {
    onboardingCompleted
  } = (0,_hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const loginTo = async (e, page) => {
    e.preventDefault();
    let link = alreadyLoggedIn ? directUrl : loginUrl;
    console.log("Get login URL for", page);
    if (!loginUrlFetched) {
      console.log("not fetched yet");
      const loginData = await fetchLinkData();
      console.log("logindata response after promise", loginData);
      link = alreadyLoggedIn ? loginData.url : loginData.login_url;
    } else {
      console.log("already fetched");
    }
    console.log("Already logged in", alreadyLoggedIn);
    console.log("all data ", link);
    const finalUrl = alreadyLoggedIn ? `${link}/${page}` : `${link}?back_url=/${page}/`;
    console.log("Final URL", finalUrl);
    setAlreadyLoggedIn(true);
    // Open a new tab with the login URL
    window.open(finalUrl, "_blank");
    window.focus();
  };

  // Apply conditional classes
  const externalLinkClass = onboardingCompleted ? "" : "pointer-events-none opacity-50 cursor-not-allowed";
  const combinedClassName = `${externalLinkClass}${className} `;
  if (isButton) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_2__["default"], {
      disabled: !onboardingCompleted,
      label: children,
      onClick: e => loginTo(e, page),
      className: combinedClassName,
      btnVariant: btnVariant,
      size: size,
      children: children
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
    href: "#",
    className: `${className} ${externalLinkClass}`,
    onClick: e => loginTo(e, page),
    children: [children, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
      name: "square-arrow-up-right",
      className: "px-2"
    })]
  });
};
LoginLink.displayName = "LoginLink";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginLink);

/***/ }),

/***/ "./src/components/Common/ProgressBar.jsx":
/*!***********************************************!*\
  !*** ./src/components/Common/ProgressBar.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Icon */ "./src/components/Common/Icon.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const ProgressBar = () => {
  const [progress, setProgress] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const {
    onboardingCompleted
  } = (0,_hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const [warning, setWarning] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [iterations, setIterations] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // The total duration for the progress bar to complete
    const duration = 30000; // 20 seconds in milliseconds
    const interval = 100; // Update interval in milliseconds
    const increment = 100 / (duration / interval);
    const timer = setInterval(() => {
      setProgress(prev => {
        let nextProgress = prev + increment;
        //if almost there, but onboarding not completed, reset a bit
        if (nextProgress > 90 && !onboardingCompleted) {
          setWarning(true);
          nextProgress = 5;
          setIterations(iterations + 1);
        }
        if (iterations > 5 && !onboardingCompleted) {
          nextProgress = 100;
        }
        if (nextProgress >= 100) {
          clearInterval(timer);
          setWarning(false);
          return 100; // Ensure it ends exactly at 100%
        }
        return nextProgress;
      });
    }, interval);
    return () => clearInterval(timer); // Cleanup the interval on unmount
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "w-full",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "w-full h-4 bg-gray-200 rounded-lg overflow-hidden",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "h-full bg-blue-500 transition-all duration-100",
        style: {
          width: `${progress}%`
        }
      })
    }), iterations <= 5 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [!warning && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please wait while your registration is being processed. This usually takes about 30 seconds.", "simplybook")
      }), warning && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This is taking a bit longer than expected. Please wait while we retry a few times.', 'simplybook')
      })]
    }), iterations > 5 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("We're sorry, but it seems there is a problem with your registration. Please try again later.", "simplybook")
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgressBar);

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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const Error = ({
  error,
  ...props
}) => {
  if (!error) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
    role: "alert",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("strong", {
      className: "font-bold",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Something went wrong!", "simplybook")
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
      className: "block sm:inline",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
        children: error
      })
    })]
  });
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
/* harmony import */ var _Common_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Icon */ "./src/components/Common/Icon.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);




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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: "",
    help: help,
    context: context,
    className: className,
    inputId: "",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
      ...props,
      children: [props.showLoader && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
        color: "white",
        name: "spinner",
        size: "1x",
        className: "mr-2"
      }), label]
    })
  });
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: '',
    help: help,
    error: fieldState?.error?.message,
    context: context,
    className: className,
    inputId: inputId,
    required: props.required,
    type: "checkbox",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Inputs_CheckboxInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
      label: label,
      id: inputId,
      "aria-invalid": !!fieldState?.error?.message,
      ...props
    })
  });
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
/* harmony import */ var _radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @radix-ui/react-popover */ "./node_modules/@radix-ui/react-popover/dist/index.mjs");
/* harmony import */ var _hooks_useWaitForRegistrationCallback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useWaitForRegistrationCallback */ "./src/hooks/useWaitForRegistrationCallback.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);






/**
 * ColorPickerField component
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
  const {
    isPolling
  } = (0,_hooks_useWaitForRegistrationCallback__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const [popoverOpen, setPopoverOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [color, setColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultColor);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (props.value !== color) {
      setColor(props.value);
    }
  }, [props.value]);
  const handlePopoverOpenChange = open => {
    // Prevent Popover from closing if `isPolling` is true
    if (!isPolling) {
      setPopoverOpen(open);
    }
  };
  const ColorPickerElement = ({
    label
  }) => {
    const handleColorChange = (color, event) => {
      setColor(color);
      onChange(color);
    };
    let disabledClass = setting.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__.Root, {
      open: popoverOpen,
      onOpenChange: handlePopoverOpenChange,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__.Trigger, {
        className: "p-[5px] mr-2 bg-transparent rounded-md border border-gray-400 min-w-[140px] text-sm",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: disabledClass + " min-w-5 flex p-1.5 gap-3.5 items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "rounded-full min-w-5 h-5 border border-gray-300",
            style: {
              backgroundColor: color
            }
          }), label]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__.Portal, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__.Content, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Inputs_ColorPicker__WEBPACK_IMPORTED_MODULE_1__["default"], {
            colorValue: color,
            onChangeComplete: handleColorChange
          })
        })
      })]
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: "",
    help: help,
    error: fieldState?.error?.message,
    context: context,
    className: className,
    inputId: setting.id,
    required: props.required,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ColorPickerElement, {
        setting: setting,
        label: label
      })
    })
  });
});
ColorPickerField.displayName = "ColorPickerField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPickerField);

/***/ }),

/***/ "./src/components/Fields/HiddenField.jsx":
/*!***********************************************!*\
  !*** ./src/components/Fields/HiddenField.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Inputs_HiddenInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Inputs/HiddenInput */ "./src/components/Inputs/HiddenInput.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Inputs_HiddenInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
/* harmony import */ var _Inputs_ImplementationInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Inputs/ImplementationInput */ "./src/components/Inputs/ImplementationInput.tsx");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



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
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const handleChange = async value => {
    await setValue(props.setting.id, value);
    console.log("invalidate Settings from implementation");
    await invalidateSettings();
    onChange(value);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "p-6",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Inputs_ImplementationInput__WEBPACK_IMPORTED_MODULE_0__["default"], {
      options: options,
      value: actualValue,
      onChange: value => handleChange(value),
      ...props
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImplementationField);

/***/ }),

/***/ "./src/components/Fields/ListField.jsx":
/*!*********************************************!*\
  !*** ./src/components/Fields/ListField.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useServicesData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useServicesData */ "./src/hooks/useServicesData.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ListItem */ "./src/components/Fields/ListItem.js");
/* harmony import */ var _hooks_useProviderData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useProviderData */ "./src/hooks/useProviderData.js");
/* harmony import */ var _hooks_useLoginData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useLoginData */ "./src/hooks/useLoginData.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);






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

const ListField = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  setting,
  field,
  fieldState,
  label,
  help,
  context,
  className,
  ...props
}, ref) => {
  const {
    services
  } = (0,_hooks_useServicesData__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const {
    providers
  } = (0,_hooks_useProviderData__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const [listArray, setListArray] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const sourceData = {
    services: services,
    providers: providers
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    console.log("loading listArray for ", setting.source);
    setListArray(sourceData[setting.source]);
  }, [sourceData[setting.source]]);
  if (!listArray) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Loading, please wait a few seconds...")
    });
  }
  console.log('listArray for ', setting.source, listArray);
  if (!Array.isArray(listArray)) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No items found for %s"), setting.label)
    });
  }
  const premiumItem = {
    id: "upgrade",
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Want more services?"),
    picture_preview: ""
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "w-full",
    children: [listArray.map(item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ListItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
      upgrade: false,
      label: label,
      link: setting.link,
      item: item
    }, item.id)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ListItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
      upgrade: true,
      label: label,
      link: "r/payment-widget",
      item: premiumItem
    })]
  });
});
ListField.displayName = 'ListField';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListField);

/***/ }),

/***/ "./src/components/Fields/ListItem.js":
/*!*******************************************!*\
  !*** ./src/components/Fields/ListItem.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Inputs_CheckboxInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Inputs/CheckboxInput */ "./src/components/Inputs/CheckboxInput.tsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Icon */ "./src/components/Common/Icon.jsx");
/* harmony import */ var _Common_LoginLink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/LoginLink */ "./src/components/Common/LoginLink.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);





// import useLoginData from "../../hooks/useLoginData";
/**
 * HiddenField component
 * @param {string} id
 * @param {string} name

 */

const ListItem = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  upgrade,
  link,
  item,
  label,
  ...props
}, ref) => {
  const [visible, setVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(item.is_visible);
  const onChange = e => {
    console.log('onChange', e.target.checked, "for id ", item.id);
    setVisible(e.target.checked);
  };
  // const { domain, loginUrlFetched } = useLoginData();
  const hasPicture = false; //loginUrlFetched && item.picture_preview && item.picture_preview.length > 0;
  const fullLabel = upgrade ? ' |  ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Get unlimited %s", "simplybook"), label) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Edit", "simplybook");
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "w-full flex items-center justify-between px-4 py-5 bg-gray-100 mb-4",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "flex items-center space-x-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          children: [hasPicture && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
            className: "w-15 h-15 max-w-[40px] max-h-[40px]",
            src: domain + item.picture_preview,
            alt: item.picture_preview
          }), !hasPicture && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "min-w-[40px] min-h-[40px] flex items-center justify-center",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
              name: "cart"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "font-bold",
          children: item.name
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Common_LoginLink__WEBPACK_IMPORTED_MODULE_4__["default"], {
          page: link,
          children: fullLabel
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "flex items-center",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "ml-4 relative",
          children: [!upgrade && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Inputs_CheckboxInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
            label: "",
            id: item.id,
            checked: visible,
            onChange: onChange
          }), upgrade && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: `inline-block w-[100px] text-center px-3 py-1.5 rounded-md text-xs font-medium bg-tertiary text-white`,
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Upgrade", "simplybook")
            })
          })]
        })
      })]
    })
  });
});
ListItem.displayName = 'ListItem';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListItem);

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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);




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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_1__["default"], {
    label: label,
    help: help,
    error: fieldState?.error?.message,
    context: context,
    className: className,
    inputId: inputId,
    required: props.required,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Inputs_SelectInput__WEBPACK_IMPORTED_MODULE_2__["default"], {
      value: setting.value,
      id: inputId,
      options: options,
      "aria-invalid": !!fieldState?.error?.message,
      setting: setting,
      ...props
    })
  });
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: label,
    help: help,
    error: fieldState?.error?.message,
    context: context,
    className: className,
    inputId: inputId,
    required: props.required,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Inputs_TextInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
      id: inputId,
      type: "text",
      "aria-invalid": !!fieldState?.error?.message,
      ...props
    })
  });
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
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _Fields_TextField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Fields/TextField */ "./src/components/Fields/TextField.jsx");
/* harmony import */ var _Fields_HiddenField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Fields/HiddenField */ "./src/components/Fields/HiddenField.jsx");
/* harmony import */ var _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Fields/CheckboxField */ "./src/components/Fields/CheckboxField.js");
/* harmony import */ var _Fields_SelectField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Fields/SelectField */ "./src/components/Fields/SelectField.jsx");
/* harmony import */ var _components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Common/ErrorBoundary */ "./src/components/Common/ErrorBoundary.jsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Fields_ColorPickerField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Fields/ColorPickerField */ "./src/components/Fields/ColorPickerField.jsx");
/* harmony import */ var _Fields_ImplementationField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Fields/ImplementationField */ "./src/components/Fields/ImplementationField.js");
/* harmony import */ var _Fields_ListField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Fields/ListField */ "./src/components/Fields/ListField.jsx");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _hooks_useWaitForRegistrationCallback__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../hooks/useWaitForRegistrationCallback */ "./src/hooks/useWaitForRegistrationCallback.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);














const fieldComponents = {
  text: _Fields_TextField__WEBPACK_IMPORTED_MODULE_0__["default"],
  api: _Fields_TextField__WEBPACK_IMPORTED_MODULE_0__["default"],
  hidden: _Fields_HiddenField__WEBPACK_IMPORTED_MODULE_1__["default"],
  checkbox: _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_2__["default"],
  select: _Fields_SelectField__WEBPACK_IMPORTED_MODULE_3__["default"],
  colorpicker: _Fields_ColorPickerField__WEBPACK_IMPORTED_MODULE_7__["default"],
  implementation: _Fields_ImplementationField__WEBPACK_IMPORTED_MODULE_8__["default"],
  list: _Fields_ListField__WEBPACK_IMPORTED_MODULE_9__["default"]
};
const FormField = (0,react__WEBPACK_IMPORTED_MODULE_5__.memo)(({
  setting,
  control,
  ...props
}) => {
  if (setting.visible === false) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("input", {
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
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_10__["default"])();
  if (!FieldComponent) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
      className: "w-full",
      children: ["Unknown field type: ", setting.type, " ", setting.id]
    });
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
    console.log("handleSaveOnChange", setting.id, fieldValue);
    setValue(setting.id, fieldValue);
    console.log("new settings array ", settings);
    if (setting.mapping) {
      //mapping is an array of id's, [id1, id2, id3]
      //loop through the mapping array, and for each id, update it with the same value
      setting.mapping.forEach(id => {
        setValue(id, fieldValue);
      });
    }
    await saveSettings(settings);
  };
  let defaultValue = setting.value || setting.default;
  if (setting.type === "checkbox") {
    defaultValue = defaultValue === "1" || defaultValue === true || defaultValue === 1;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__["default"], {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
      name: setting.id,
      control: control,
      rules: validationRules,
      defaultValue: defaultValue,
      render: ({
        field,
        fieldState
      }) => {
        (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
          let curValue = getValue(setting.id);
          if (curValue === field.value) {
            return;
          }

          //save on change currently only in use in the wizard, so we can prevent saving of empty values
          //which would not be ideal in the settings pages.
          if (setting.save_on_change && field.value.length > 0) {
            console.log("saving field on change", setting.id, field.value);
            handleSaveOnChange(field.value);
          }
        }, [field.value]);
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(FieldComponent, {
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
    })
  });
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [fields.filter(field => !field.inline_group).map(field => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_FormField__WEBPACK_IMPORTED_MODULE_1__["default"], {
      setting: field,
      control: control
    }, field.id)), Object.entries(groupedFields).map(([groupKey, fields]) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "flex flex-row",
      children: fields.map(field => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_FormField__WEBPACK_IMPORTED_MODULE_1__["default"], {
        setting: field,
        control: control
      }, field.id))
    }, groupKey))]
  });
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
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../hooks/useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var _Fields_ButtonField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Fields/ButtonField */ "./src/components/Fields/ButtonField.jsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _Forms_FormFieldWrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Forms/FormFieldWrapper */ "./src/components/Forms/FormFieldWrapper.jsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Errors_Error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Errors/Error */ "./src/components/Errors/Error.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);










const OnboardingStep = ({
  path,
  title,
  subtitle,
  rightColumn,
  bottomText,
  primaryButton = {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Next", "simplybook")
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
  } = (0,_hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const navigate = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_8__.useNavigate)();
  const {
    watch,
    handleSubmit,
    control,
    formState: {
      isDirty,
      errors
    }
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_9__.useForm)({
    defaultValues: defaultData,
    values: data,
    mode: "onBlur"
  });
  const {
    getValue
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const [companyName, setCompanyName] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("");
  const currentStep = getCurrentStep(path);
  const [disabled, setDisabled] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);

  // Update confirmation code in onboarding data. Otherwise the recaptcha code clears the confirmation code
  const formData = watch();
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    updateData({
      'confirmation-code': formData['confirmation-code']
    });
  }, [formData['confirmation-code']]);

  //onload of this component, check completed step simplybook.completed_step and navigate to the next step if it's above 0
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    let currentStep = getCurrentStepId(path);
    let completedStepNext = parseInt(simplybook.completed_step) + 1;
    if (completedStepNext > 1 && completedStepNext > currentStep) {
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
          setDisabled(false);
          return; // Cancel submission only if beforeSubmit explicitly returns false
        }
      } catch (error) {
        setDisabled(false);
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
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    let companyName = getValue("company_name");
    if (companyName && companyName.length > 0) {
      setCompanyName(companyName);
    }
  }, [getValue("company_name")]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      className: "col-span-4 col-start-3 my-12 flex flex-col text-black",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "my-6 text-center",
        children: [companyName.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h1", {
          className: "text-2xl text-gray-500 mb-4",
          children: companyName
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h1", {
          className: "text-3xl font-semibold text-black",
          children: title
        }), subtitle && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h2", {
          className: "mt-2 text-base font-light text-black",
          children: subtitle
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Errors_Error__WEBPACK_IMPORTED_MODULE_6__["default"], {
          error: apiError
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "flex flex-col",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("form", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Forms_FormFieldWrapper__WEBPACK_IMPORTED_MODULE_4__["default"], {
            fields: currentStep.fields,
            control: control
          }), customHtml, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Fields_ButtonField__WEBPACK_IMPORTED_MODULE_1__["default"], {
            showLoader: disabled,
            btnVariant: "primary",
            label: primaryButton.label,
            context: bottomText,
            disabled: disabled,
            onClick: handleSubmit(data => onSubmit(data, "primary"))
          }), secondaryButton && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Fields_ButtonField__WEBPACK_IMPORTED_MODULE_1__["default"], {
            btnVariant: "tertiary",
            disabled: disabled,
            label: secondaryButton.label,
            onClick: handleSubmit(data => onSubmit(data, "secondary"))
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Errors_Error__WEBPACK_IMPORTED_MODULE_6__["default"], {
        error: apiError
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "col-span-4 col-start-7 row-span-2 my-12",
      children: rightColumn
    })]
  });
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useMutation.js");
/* harmony import */ var _api_endpoints_onBoarding_registerEmail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerEmail */ "./src/api/endpoints/onBoarding/registerEmail.js");
/* harmony import */ var _api_endpoints_onBoarding_registerTipsTricks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerTipsTricks */ "./src/api/endpoints/onBoarding/registerTipsTricks.js");
/* harmony import */ var _api_endpoints_onBoarding_registerCompany__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerCompany */ "./src/api/endpoints/onBoarding/registerCompany.js");
/* harmony import */ var _api_endpoints_onBoarding_confirmEmail__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api/endpoints/onBoarding/confirmEmail */ "./src/api/endpoints/onBoarding/confirmEmail.js");
/* harmony import */ var _useSettingsData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _api_endpoints_onBoarding_generatePages__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../api/endpoints/onBoarding/generatePages */ "./src/api/endpoints/onBoarding/generatePages.js");
/* harmony import */ var _api_endpoints_onBoarding_isPageTitleAvailable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../api/endpoints/onBoarding/isPageTitleAvailable */ "./src/api/endpoints/onBoarding/isPageTitleAvailable.js");

 // You can use lodash's debounce function










const useOnboardingData = () => {
  const {
    getValue
  } = (0,_useSettingsData__WEBPACK_IMPORTED_MODULE_7__["default"])();
  const [localOnboardingCompleted, setLocalOnboardingCompleted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const steps = [{
    id: 1,
    path: "/onboarding/create-your-account",
    fields: [{
      id: "email",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Email", "simplybook"),
      required: true,
      validation: {
        regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please enter a valid email address", "simplybook")
      }
    }, {
      required: true,
      id: "terms-and-conditions",
      type: "checkbox",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("I agree to the terms and conditions", "simplybook")
    }],
    beforeSubmit: async data => {
      console.log("submit email step");
      let response = await (0,_api_endpoints_onBoarding_registerEmail__WEBPACK_IMPORTED_MODULE_3__["default"])({
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
      await (0,_api_endpoints_onBoarding_registerTipsTricks__WEBPACK_IMPORTED_MODULE_4__["default"])({
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
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Business category", "simplybook"),
      options: [{
        value: "3",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Beauty and wellness", "simplybook")
      }, {
        value: "43",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Sport and fitness", "simplybook")
      }, {
        value: "5",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Personal meetings and services", "simplybook")
      }, {
        value: "1",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Medical", "simplybook")
      }, {
        value: "4",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Events and entertainment", "simplybook")
      }, {
        value: "6",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Education", "simplybook")
      }, {
        value: "75",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Retailers", "simplybook")
      }, {
        value: "7",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Officials", "simplybook")
      }, {
        value: "8",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Other category", "simplybook")
      }]
    }, {
      id: "service",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("What service do you provide?", "simplybook")
    }, {
      id: "phone",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Phone", "simplybook"),
      validation: {
        regex: "^\\+?[0-9\\s\\-().]+$",
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please enter a valid phone number", "simplybook")
      }
    }, {
      id: "address",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Address", "simplybook")
    }, {
      id: "zip",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Postal Code", "simplybook")
    }, {
      id: "city",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("City", "simplybook")
    }, {
      id: "country",
      type: "select",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Country", "simplybook"),
      options: [{
        value: "NL",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Netherlands", "simplybook")
      }, {
        value: "DE",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Germany", "simplybook")
      }, {
        value: "BE",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Belgium", "simplybook")
      }, {
        value: "US",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("United States", "simplybook")
      }]
    }],
    beforeSubmit: async data => {
      console.log("submit information check step");
      console.log(data);
      let response = await (0,_api_endpoints_onBoarding_registerCompany__WEBPACK_IMPORTED_MODULE_5__["default"])({
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
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Confirmation Code", "simplybook")
    }],
    beforeSubmit: async data => {
      if (!data.recaptchaToken) {
        console.log("missing recaptchatoken, cancel submit");
        return false;
      }
      console.log("found recaptcha token ", data.recaptchaToken);
      console.log("confirm email step");
      console.log(data);
      let response = await (0,_api_endpoints_onBoarding_confirmEmail__WEBPACK_IMPORTED_MODULE_6__["default"])({
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
      id: "sb_base_color",
      type: "colorpicker",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Primary", "simplybook"),
      default: "#DD3649",
      inline_group: "widget",
      save_on_change: true,
      mapping: ["btn_color_1", "sb_company_label_color", "booking_nav_bg_color"]
      // disabled: !localOnboardingCompleted,
    }, {
      id: "sb_busy",
      type: "colorpicker",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Secondary", "simplybook"),
      default: "#DD3649",
      inline_group: "widget",
      save_on_change: true
      // disabled: !localOnboardingCompleted,
    }, {
      id: "sb_available",
      type: "colorpicker",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Active", "simplybook"),
      default: "#DD3649",
      inline_group: "widget",
      save_on_change: true
      // disabled: !localOnboardingCompleted,
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
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Generated", 'simplybook'),
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Generate pages.", 'simplybook')
      }, {
        value: "manual",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Shortcode", 'simplybook'),
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Do it yourself", 'simplybook')
      }, {
        value: "templates",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Templates", 'simplybook'),
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Premium", 'simplybook'),
        is_premium: true
      }]
    }],
    beforeSubmit: async data => {
      if (getValue("implementation") !== 'manual') {
        console.log("submit implementation step ", bookingPageName, calendarPageName);
        const data = {
          bookingPageName: bookingPageName,
          calendarPageName: calendarPageName
        };
        let response = await (0,_api_endpoints_onBoarding_generatePages__WEBPACK_IMPORTED_MODULE_8__["default"])({
          data
        });
        if (response.status !== 'success') {
          return false;
        }
      }
    }
  }];
  const [bookingPageName, setBookingPageName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(simplybook.site_url + '/' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('my-booking', 'simplybook'));
  const [calendarPageName, setCalendarPageName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(simplybook.site_url + '/' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('calendar', 'simplybook'));
  const [apiError, setApiError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_10__.useQueryClient)();
  const {
    settings
  } = (0,_useSettingsData__WEBPACK_IMPORTED_MODULE_7__["default"])();

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
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__.useQuery)({
    queryKey: ["onboarding_data"],
    initialData: {
      ...initialData,
      ...prefilledData,
      onboardingCompleted: simplybook.is_onboarding_completed,
      // Include onboardingCompleted
      calendarPageNameAvailable: true,
      bookingPageNameAvailable: true
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Mutation for updating data
  const {
    mutate: updateData
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_12__.useMutation)({
    mutationFn: async newData => {
      queryClient.setQueryData(["onboarding_data"], oldData => ({
        ...oldData,
        ...newData
      }));
      queryClient.invalidateQueries(["onboarding_data"]);
    }
  });
  const {
    mutate: updateOnboardingCompleted
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_12__.useMutation)({
    mutationFn: async completed => {
      queryClient.setQueryData(["onboarding_data"], oldData => ({
        ...oldData,
        onboardingCompleted: completed
      }));
      setLocalOnboardingCompleted(completed);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["onboarding_data"]);
    }
  });
  const {
    mutate: updateCalendarPageNameAvailable
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_12__.useMutation)({
    mutationFn: async () => {
      // Verify if the page title is available
      const response = await (0,_api_endpoints_onBoarding_isPageTitleAvailable__WEBPACK_IMPORTED_MODULE_9__["default"])({
        data: {
          title: calendarPageName
        }
      });
      const isAvailable = response.status === 'success';

      // Update the query data with the new page name and availability status
      queryClient.setQueryData(["onboarding_data"], oldData => ({
        ...oldData,
        calendarPageNameAvailable: isAvailable
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["onboarding_data"]);
    }
  });
  const {
    mutate: updateBookingPageNameAvailable
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_12__.useMutation)({
    mutationFn: async () => {
      const response = await (0,_api_endpoints_onBoarding_isPageTitleAvailable__WEBPACK_IMPORTED_MODULE_9__["default"])({
        data: {
          title: bookingPageName
        }
      });
      const isAvailable = response.status === 'success';
      // Simulate API update call if needed, otherwise update the cache directly
      queryClient.setQueryData(["onboarding_data"], oldData => ({
        ...oldData,
        bookingPageNameAvailable: isAvailable
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["onboarding_data"]);
    }
  });
  const debouncedSetBookingPageName = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(pageName => updateBookingPageNameAvailable(pageName), 500),
  // 500ms delay
  []);
  const handleBookingPageNameChange = pageName => {
    setBookingPageName(pageName);
    debouncedSetBookingPageName(pageName);
  };
  const debouncedSetCalendarPageName = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(pageName => updateCalendarPageNameAvailable(pageName), 500),
  // 500ms delay
  []);
  const handleCalendarPageNameChange = pageName => {
    setCalendarPageName(pageName);
    debouncedSetCalendarPageName(pageName);
  };
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
    setBookingPageName: pageName => handleBookingPageNameChange(pageName),
    setCalendarPageName: pageName => handleCalendarPageNameChange(pageName),
    bookingPageName,
    calendarPageName,
    calendarPageNameAvailable: query.data?.calendarPageNameAvailable,
    bookingPageNameAvailable: query.data?.bookingPageNameAvailable,
    apiError,
    setApiError
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useOnboardingData);

/***/ }),

/***/ "./src/hooks/useProviderData.js":
/*!**************************************!*\
  !*** ./src/hooks/useProviderData.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _api_endpoints_getProviders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/endpoints/getProviders */ "./src/api/endpoints/getProviders.js");


/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useProvidersData = () => {
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();

  // Query for fetching settings from server
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
    queryKey: ["providers"],
    queryFn: () => (0,_api_endpoints_getProviders__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    staleTime: 1000 * 60 * 5,
    // 5 minutes
    retry: 0,
    select: data => [...data]
  });
  return {
    providers: query.data
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useProvidersData);

/***/ }),

/***/ "./src/hooks/useServicesData.js":
/*!**************************************!*\
  !*** ./src/hooks/useServicesData.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _api_endpoints_getServices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/endpoints/getServices */ "./src/api/endpoints/getServices.js");


/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useServicesData = () => {
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();

  // Query for fetching settings from server
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
    queryKey: ["services"],
    queryFn: () => (0,_api_endpoints_getServices__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    staleTime: 1000 * 60 * 5,
    // 5 minutes
    retry: 0,
    select: data => [...data]
  });
  return {
    services: query.data
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useServicesData);

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
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useMutation.js");
/* harmony import */ var _api_endpoints_getSettingsFields__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/endpoints/getSettingsFields */ "./src/api/endpoints/getSettingsFields.js");
/* harmony import */ var _api_endpoints_saveSettings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/endpoints/saveSettings */ "./src/api/endpoints/saveSettings.js");




/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useSettingsData = () => {
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
  const transformData = data => {
    //find all items with type===checkbox, and ensure that the value is a boolean
    return data.map(field => {
      if (field.type === "checkbox") {
        field.value = !!field.value;
      }
      return field;
    });
  };
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useQuery)({
    queryKey: ["settings_fields"],
    queryFn: () => (0,_api_endpoints_getSettingsFields__WEBPACK_IMPORTED_MODULE_0__["default"])({
      withValues: true
    }),
    staleTime: 1000 * 60 * 5,
    // 5 minutes
    initialData: transformData(window.simplybook && window.simplybook.settings_fields),
    retry: 0,
    select: data => data ? [...data] : []
  });
  const getValue = id => {
    return query.data.find(field => field.id === id)?.value;
  };
  const setValue = (id, value) => {
    const field = query.data.find(field => field.id === id);
    if (field) {
      field.value = value;
    }
    queryClient.setQueryData(["settings_fields"], oldData => {
      return oldData.map(field => field.id === id ? {
        ...field,
        value
      } : field);
    });
  };

  // Update Mutation for settings data with destructured values
  const {
    mutateAsync: saveSettings,
    isLoading: isSavingSettings
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.useMutation)({
    mutationFn: async data => {
      console.log("saving data", data);
      let settings = await (0,_api_endpoints_saveSettings__WEBPACK_IMPORTED_MODULE_1__["default"])(data);
      return transformData(settings);
    },
    onSuccess: async data => {
      queryClient.setQueryData(["settings_fields"], oldData => {
        return data ? [...data] : [];
      });
      queryClient.invalidateQueries(["settings_fields"]);
    }
  });
  return {
    settings: query.data,
    saveSettings,
    getValue,
    setValue,
    isSavingSettings: query.isLoading,
    invalidateSettings: () => queryClient.invalidateQueries(["settings_fields"])
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSettingsData);

/***/ }),

/***/ "./src/hooks/useWaitForRegistrationCallback.js":
/*!*****************************************************!*\
  !*** ./src/hooks/useWaitForRegistrationCallback.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _api_requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/requests/request */ "./src/api/requests/request.js");
/* harmony import */ var _useOnboardingData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);




const useWaitForRegistrationCallback = () => {
  const {
    setOnboardingCompleted
  } = (0,_useOnboardingData__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const [pollingEnabled, setPollingEnabled] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true);
  const [queryData, setQueryData] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({
    status: "waiting"
  });
  const [count, setCount] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
  const {
    data,
    refetch,
    isFetching
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useQuery)({
    queryKey: ["registration_callback_status"],
    initialData: {
      status: "waiting"
    },
    queryFn: async () => {
      if (!pollingEnabled) {
        console.log("Polling disabled");
        return queryData;
      }
      setCount(count + 1);
      const res = await (0,_api_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("check_registration_callback_status", "POST", {
        data: {
          status: "waiting"
        }
      });
      setQueryData(res.data);
      if (res.data.status === 'completed') {
        setPollingEnabled(false);
        setOnboardingCompleted(true);
      }
      if (count > 100) {
        setPollingEnabled(false);
      }
      return res.data;
    },
    enabled: pollingEnabled,
    refetchInterval: queryData => {
      return pollingEnabled ? 3000 : false;
    },
    onError: error => {
      setPollingEnabled(false);
    }
  });
  return {
    startPolling: () => setPollingEnabled(true),
    pollingEnabled,
    isPolling: isFetching
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useWaitForRegistrationCallback);

/***/ }),

/***/ "./src/hooks/useWidgetData.js":
/*!************************************!*\
  !*** ./src/hooks/useWidgetData.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _api_endpoints_getWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/endpoints/getWidget */ "./src/api/endpoints/getWidget.js");


const useWidgetData = () => {
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
    queryKey: ["widget_script"],
    queryFn: () => (0,_api_endpoints_getWidget__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    staleTime: 1000 * 60 * 5,
    // 5 minutes
    initialData: '',
    retry: 0,
    enabled: false
  });
  const invalidateAndRefetchWidgetScript = async () => {
    console.log("invalidate and refetch widget script");
    queryClient.invalidateQueries(["widget_script"]);
    await query.refetch();
  };
  return {
    widgetScript: query.data,
    invalidateAndRefetchWidgetScript
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useWidgetData);

/***/ }),

/***/ "./src/routes/onboarding/style-widget.lazy.jsx":
/*!*****************************************************!*\
  !*** ./src/routes/onboarding/style-widget.lazy.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Onboarding_OnboardingStep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Onboarding/OnboardingStep */ "./src/components/Onboarding/OnboardingStep.jsx");
/* harmony import */ var _hooks_useWaitForRegistrationCallback__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useWaitForRegistrationCallback */ "./src/hooks/useWaitForRegistrationCallback.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _hooks_useWidgetData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/useWidgetData */ "./src/hooks/useWidgetData.js");
/* harmony import */ var _components_Common_ProgressBar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Common/ProgressBar */ "./src/components/Common/ProgressBar.jsx");
/* harmony import */ var _components_Common_CalendarLoading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Common/CalendarLoading */ "./src/components/Common/CalendarLoading.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);











const path = "/onboarding/style-widget";
const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_10__.createLazyFileRoute)(path)({
  component: () => {
    const {
      widgetScript,
      invalidateAndRefetchWidgetScript
    } = (0,_hooks_useWidgetData__WEBPACK_IMPORTED_MODULE_6__["default"])();
    const {
      isSavingSettings,
      settings
    } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_5__["default"])();
    const {
      onboardingCompleted
    } = (0,_hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_4__["default"])();
    const {
      startPolling,
      pollingEnabled,
      isPolling
    } = (0,_hooks_useWaitForRegistrationCallback__WEBPACK_IMPORTED_MODULE_2__["default"])();
    const [isLoadingScript, setIsLoadingScript] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const runInlineScript = async () => {
      let targetObj = document.createElement("script");
      targetObj.id = "simplybook-inline-script";
      let script = widgetScript.replaceAll('DOMContentLoaded', 'customDOMContentLoaded');
      console.log("updated script: ", script);
      targetObj.innerHTML = script;
      try {
        document.head.appendChild(targetObj);
        const customEvent = new Event("customDOMContentLoaded");
        document.dispatchEvent(customEvent);
        document.removeEventListener("DOMContentLoaded", instantiateSimplybookWidget);
      } catch (exception) {
        throw "Something went wrong " + exception + " while loading " + script;
      }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
      if (pollingEnabled) {
        console.log("polling already enabled, exit");
        return;
      }
      console.log("start polling");
      startPolling();
    }, [onboardingCompleted]);
    const setupPreview = async () => {
      if (isLoadingScript) {
        return;
      }
      setIsLoadingScript(true);
      clearInlineScript();
      let script = document.head.querySelector('#simplybook-src-script');
      if (script) {
        console.log("Script already loaded, run inline script");
        await runInlineScript();
        setIsLoadingScript(false);
      } else {
        console.log("Script not loaded, load it now");
        script = document.createElement("script");
        script.id = "simplybook-src-script";
        script.src = "https://simplybook.me/v2/widget/widget.js";
        script.onload = async () => {
          console.log("src Script loaded successfully!");
          await runInlineScript();
          setIsLoadingScript(false);
        };
        document.head.appendChild(script);
      }
    };
    const clearInlineScript = () => {
      const inlineScript = document.head.querySelector('#simplybook-inline-script');
      if (inlineScript) {
        console.log("removing inline script");
        document.head.removeChild(inlineScript);
      }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
      console.log("useeffect for preview setup", "onboardingcompleted", onboardingCompleted, "isSavingSettings", isSavingSettings, "widgetScript.length", widgetScript.length);
      if (!onboardingCompleted) {
        return;
      }
      if (widgetScript.length === 0) {
        return;
      }
      setupPreview();
      return () => {
        const srcScript = document.head.querySelector('#simplybook-src-script');
        if (srcScript) {
          document.head.removeChild(srcScript);
        }
        clearInlineScript();
      };
    }, [widgetScript, onboardingCompleted]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
      console.log("settings, isSavingSettings, onboardingcompleted UseEffect ", isSavingSettings, onboardingCompleted);
      if (!onboardingCompleted) {
        console.log("onboarding not completed, do not reload script");
        return;
      }
      if (isSavingSettings) {
        console.log("saving settings, do not reload script");
        return;
      }
      console.log("invalidate and refetch widget script");
      invalidateAndRefetchWidgetScript();
    }, [isSavingSettings, onboardingCompleted, settings]);
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Onboarding_OnboardingStep__WEBPACK_IMPORTED_MODULE_1__["default"], {
        path: path,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("What's your style?", "simplybook"),
        buttonLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Next Step: Finish", "simplybook"),
        rightColumn: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "h-full",
          children: [!onboardingCompleted && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            children: ["Not completed", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Common_ProgressBar__WEBPACK_IMPORTED_MODULE_7__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Common_CalendarLoading__WEBPACK_IMPORTED_MODULE_8__["default"], {})]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
            className: "h-full",
            id: "sbw_z0hg2i"
          })]
        })
      })
    });
  }
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
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
    _e = _a.type,
    type = _e === void 0 ? "text" : _e,
    children = _a.children;
  var wrapperClasses = ["flex w-full flex-col", className, "pt-4"].filter(Boolean).join(" ");
  var contentClasses = ["flex w-full flex-col", reverseLabel ? "flex-col-reverse" : ""].filter(Boolean).join(" ");
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: wrapperClasses,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: contentClasses,
      children: [type === 'checkbox' && children, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_label__WEBPACK_IMPORTED_MODULE_3__.Root, {
          className: "cursor-pointer pb-1 font-medium text-black text-md ",
          htmlFor: inputId,
          children: [label, required && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: "ml-1 text-gray-500 font-normal text-xs",
            children: ["(", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Required", 'simplybook'), ")"]
          })]
        }), help && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "pb-1 text-xs font-light text-gray-600",
          children: help
        })]
      }), type !== 'checkbox' && children]
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/link.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");



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
    _f = _a.className,
    className = _f === void 0 ? "" : _f;
  var localClassName = (0,clsx__WEBPACK_IMPORTED_MODULE_1__.clsx)(
  // Base styles
  "rounded-full transition-all duration-200 ", {
    'bg-secondary text-white hover:bg-secondary-dark ': btnVariant === 'primary',
    'bg-tertiary text-white hover:bg-tertiary-dark ': btnVariant === 'secondary',
    'border-2 border-tertiary bg-transparent text-black hover:bg-tertiary-light ': btnVariant === 'tertiary'
  }, {
    'py-.5 px-3 font-normal text-xs border-1 ': size === 'sm',
    'py-2 px-6 font-semibold ': size === 'md',
    'py-3 px-8 text-lg font-semibold ': size === 'lg'
  }, {
    'opacity-50 cursor-not-allowed ': disabled
  });
  //if props.className is not empty, replace className with props.className
  if (className.length > 0) {
    localClassName = localClassName + ' ' + className;
  }
  if (link) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: link.to,
      className: localClassName,
      children: children
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
    onClick: onClick,
    className: localClassName,
    disabled: disabled,
    children: children
  });
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
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
  var label = _a.label,
    className = _a.className,
    checked = _a.checked,
    value = _a.value,
    onChange = _a.onChange,
    props = __rest(_a, ["label", "className", "checked", "value", "onChange"]);
  var top = !label || label.length === 0 ? "0.5" : "1";
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
    className: "relative inline-flex items-center cursor-pointer",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", __assign({
      type: "checkbox",
      checked: checked,
      onChange: onChange,
      className: "sr-only peer"
    }, props)), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "w-8 h-4 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-" + top + " after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "ml-2 font-medium text-black text-md ".concat(className || ""),
      children: label
    })]
  });
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
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
            page: "client",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Premium', 'simplybook')
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
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
    setting = _a.setting;
  // Normalize options if it's an object
  var normalizedOptions = Array.isArray(options) ? options : Object.keys(options).map(function (index) {
    return {
      value: index,
      label: options[index]
    };
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Root, {
    value: value,
    onValueChange: onChange,
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
          width: "100%",
          borderRadius: "0.375rem",
          borderWidth: "1px",
          borderColor: "#D1D5DB",
          backgroundColor: "white",
          zIndex: 50,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          transitionProperty: "all",
          transitionTimingFunction: "ease-in-out",
          transitionDuration: "200ms"
        },
        className: "rounded-md border border-gray-300 bg-white z-50 shadow-lg transition ease-in-out duration-200",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.ScrollUpButton, {
          className: "flex items-center justify-center p-2",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0.5rem"
          },
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
            name: "chevron-up"
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.Viewport, {
          className: "p-2 bg-white",
          children: normalizedOptions.map(function (option) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectItem, {
              value: option.value,
              children: option.label
            }, option.value);
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.ScrollDownButton, {
          className: "flex items-center justify-center p-2",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0.5rem"
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
    className: "flex cursor-pointer items-center justify-between bg-white shadow-lg rounded-md p-2 hover:bg-gray-100 focus:bg-gray-200 ".concat(className),
    style: {
      display: "flex",
      cursor: "pointer",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      borderRadius: "0.375rem",
      padding: "0.5rem",
      width: "100%"
    }
  }, props, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.ItemText, {
      children: children
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_3__.ItemIndicator, {
      className: "ml-2",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
        name: "check"
      })
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
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

/***/ "./src/hooks/useLoginData.tsx":
/*!************************************!*\
  !*** ./src/hooks/useLoginData.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_endpoints_getLoginUrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/endpoints/getLoginUrl */ "./src/api/endpoints/getLoginUrl.js");
/* harmony import */ var _useOnboardingData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useOnboardingData */ "./src/hooks/useOnboardingData.js");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};




var defaultLoginData = {
  url: '',
  login_url: '',
  domain: ''
};
var useLoginData = function () {
  var _a, _b, _c;
  var queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useQueryClient)();
  var _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    alreadyLoggedIn = _d[0],
    setAlreadyLoggedIn = _d[1];
  var onboardingCompleted = (0,_useOnboardingData__WEBPACK_IMPORTED_MODULE_2__["default"])().onboardingCompleted;
  var query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.useQuery)({
    queryKey: ["login_data"],
    queryFn: function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!onboardingCompleted) {
                return [2 /*return*/, defaultLoginData];
              }
              return [4 /*yield*/, (0,_api_endpoints_getLoginUrl__WEBPACK_IMPORTED_MODULE_1__["default"])()];
            case 1:
              response = _a.sent();
              console.log("getLoginUrl response", response);
              return [2 /*return*/, response];
          }
        });
      });
    },
    staleTime: 1000 * 60 * 60,
    retry: 0,
    enabled: false,
    initialData: defaultLoginData,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });
  var fetchAndInvalidate = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, query.refetch()];
          case 1:
            response = _a.sent();
            queryClient.setQueryData(["login_data"], response.data);
            console.log("queried data", response.data);
            return [2 /*return*/, response.data];
        }
      });
    });
  };
  return {
    loginData: query.data,
    loginUrlFetched: query.isFetched,
    directUrl: (_a = query.data) === null || _a === void 0 ? void 0 : _a.url,
    loginUrl: (_b = query.data) === null || _b === void 0 ? void 0 : _b.login_url,
    domain: (_c = query.data) === null || _c === void 0 ? void 0 : _c.domain,
    alreadyLoggedIn: alreadyLoggedIn,
    setAlreadyLoggedIn: setAlreadyLoggedIn,
    fetchLinkData: fetchAndInvalidate
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useLoginData);

/***/ }),

/***/ "./src/types/LoginData.ts":
/*!********************************!*\
  !*** ./src/types/LoginData.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ })

}]);
//# sourceMappingURL=src_routes_onboarding_style-widget_lazy_jsx.js.map