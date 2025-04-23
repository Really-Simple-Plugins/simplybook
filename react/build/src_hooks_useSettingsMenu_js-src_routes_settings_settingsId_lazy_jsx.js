"use strict";
(globalThis["webpackChunksimplybook_app"] = globalThis["webpackChunksimplybook_app"] || []).push([["src_hooks_useSettingsMenu_js-src_routes_settings_settingsId_lazy_jsx"],{

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
/* harmony export */   SB_API_URL: () => (/* binding */ SB_API_URL),
/* harmony export */   SIMPLYBOOK_DOMAINS: () => (/* binding */ SIMPLYBOOK_DOMAINS),
/* harmony export */   SITE_URL: () => (/* binding */ SITE_URL),
/* harmony export */   TEXT_DOMAIN: () => (/* binding */ TEXT_DOMAIN),
/* harmony export */   X_WP_NONCE: () => (/* binding */ X_WP_NONCE)
/* harmony export */ });
// src/api/config.js

// Token for authenticated requests; fix to get the SimplyBook nonce
const NONCE = simplybook.nonce;
const X_WP_NONCE = simplybook.x_wp_nonce;

// Base URL for SimplyBook API requests
const API_BASE_PATH = simplybook.rest_namespace + "/" + simplybook.rest_version + "/";
const SB_API_URL = simplybook.rest_url + simplybook.rest_namespace + "/" + simplybook.rest_version + "/";

// URLs for the site and AJAX endpoint
const SITE_URL = getSiteUrl("rest_url");
const AJAX_URL = getSiteUrl("ajax_url");

// Text domain for SimplyBook translations
const TEXT_DOMAIN = "simplybook";

// Handy constants
const SIMPLYBOOK_DOMAINS = simplybook.simplybook_domains;

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

/***/ "./src/api/endpoints/onBoarding/finishOnboarding.js":
/*!**********************************************************!*\
  !*** ./src/api/endpoints/onBoarding/finishOnboarding.js ***!
  \**********************************************************/
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
const finishOnboarding = async ({
  data = true
}) => {
  return await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("onboarding/finish_onboarding", "POST", {
    data
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (finishOnboarding);

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
 * Update an onboarding step. Callback will verify if the page title is
 * available based on the URL within data.
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
  return await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("onboarding/register_email", "POST", {
    data
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (registerEmail);

/***/ }),

/***/ "./src/api/endpoints/onBoarding/saveWidgetStyle.js":
/*!*********************************************************!*\
  !*** ./src/api/endpoints/onBoarding/saveWidgetStyle.js ***!
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
const saveWidgetStyle = async ({
  primary_color = '',
  secondary_color = '',
  active_color = ''
}) => {
  return await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("onboarding/save_widget_style", "POST", {
    primary_color,
    secondary_color,
    active_color
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (saveWidgetStyle);

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
 * @deprecated use {@link HttpClient} instead
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
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);

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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");


const BlockContent = t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(5);
  const {
    children,
    className: t1
  } = t0;
  const className = t1 === undefined ? "" : t1;
  let t2;
  if ($[0] !== className) {
    t2 = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])("block-content flex-grow", className);
    $[0] = className;
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  let t3;
  if ($[2] !== children || $[3] !== t2) {
    t3 = /*#__PURE__*/React.createElement("div", {
      className: t2
    }, children);
    $[2] = children;
    $[3] = t2;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  return t3;
};
BlockContent.displayName = "BlockContent";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockContent);

/***/ }),

/***/ "./src/components/Blocks/BlockFooter.jsx":
/*!***********************************************!*\
  !*** ./src/components/Blocks/BlockFooter.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");


const BlockFooter = t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(5);
  const {
    children,
    className: t1
  } = t0;
  const className = t1 === undefined ? "" : t1;
  let t2;
  if ($[0] !== className) {
    t2 = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])("block-footer flex px-4 py-4", className);
    $[0] = className;
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  let t3;
  if ($[2] !== children || $[3] !== t2) {
    t3 = /*#__PURE__*/React.createElement("div", {
      className: t2
    }, children);
    $[2] = children;
    $[3] = t2;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  return t3;
};
BlockFooter.displayName = "BlockFooter";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockFooter);

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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");


const BlockHeading = t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(14);
  const {
    title,
    controls,
    className: t1,
    help: t2
  } = t0;
  const className = t1 === undefined ? "" : t1;
  const help = t2 === undefined ? "" : t2;
  const titleSpacing = help ? "pt-4" : "py-4";
  let t3;
  if ($[0] !== className || $[1] !== titleSpacing) {
    t3 = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(className, "flex items-center justify-between p-4", titleSpacing);
    $[0] = className;
    $[1] = titleSpacing;
    $[2] = t3;
  } else {
    t3 = $[2];
  }
  let t4;
  if ($[3] !== title) {
    t4 = /*#__PURE__*/React.createElement("h2", {
      className: "text-lg font-bold m-0"
    }, title);
    $[3] = title;
    $[4] = t4;
  } else {
    t4 = $[4];
  }
  let t5;
  if ($[5] !== controls || $[6] !== t3 || $[7] !== t4) {
    t5 = /*#__PURE__*/React.createElement("div", {
      className: t3
    }, t4, controls);
    $[5] = controls;
    $[6] = t3;
    $[7] = t4;
    $[8] = t5;
  } else {
    t5 = $[8];
  }
  let t6;
  if ($[9] !== help) {
    t6 = help && /*#__PURE__*/React.createElement("div", {
      className: "px-5 py-2 text-sm text-gray-500"
    }, help);
    $[9] = help;
    $[10] = t6;
  } else {
    t6 = $[10];
  }
  let t7;
  if ($[11] !== t5 || $[12] !== t6) {
    t7 = /*#__PURE__*/React.createElement(React.Fragment, null, t5, t6);
    $[11] = t5;
    $[12] = t6;
    $[13] = t7;
  } else {
    t7 = $[13];
  }
  return t7;
};
BlockHeading.displayName = "BlockHeading";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockHeading);

/***/ }),

/***/ "./src/components/Common/Calendar.jsx":
/*!********************************************!*\
  !*** ./src/components/Common/Calendar.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CalendarLoading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CalendarLoading */ "./src/components/Common/CalendarLoading.jsx");
/* harmony import */ var _hooks_useWidgetData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useWidgetData */ "./src/hooks/useWidgetData.js");
/* harmony import */ var _hooks_useWaitForRegistrationCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useWaitForRegistrationCallback */ "./src/hooks/useWaitForRegistrationCallback.js");





const Calendar = t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(12);
  const {
    primary,
    secondary,
    active,
    onboardingCompleted
  } = t0;
  const {
    createPreviewWidget
  } = (0,_hooks_useWidgetData__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const {
    startPolling,
    pollingEnabled,
    pollingSuccess
  } = (0,_hooks_useWaitForRegistrationCallback__WEBPACK_IMPORTED_MODULE_4__["default"])();
  let t1;
  if ($[0] !== pollingEnabled || $[1] !== startPolling) {
    t1 = () => {
      if (pollingEnabled === false) {
        startPolling();
      }
    };
    $[0] = pollingEnabled;
    $[1] = startPolling;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  let t2;
  if ($[3] !== onboardingCompleted) {
    t2 = [onboardingCompleted];
    $[3] = onboardingCompleted;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(t1, t2);
  let t3;
  if ($[5] !== active || $[6] !== pollingSuccess || $[7] !== primary || $[8] !== secondary) {
    t3 = [primary, secondary, active, pollingSuccess];
    $[5] = active;
    $[6] = pollingSuccess;
    $[7] = primary;
    $[8] = secondary;
    $[9] = t3;
  } else {
    t3 = $[9];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (pollingSuccess) {
      runInlineScript(primary, secondary, active);
    }
  }, t3);
  const runInlineScript = (primaryColor, secondaryColor, activeColor) => {
    createPreviewWidget({
      "onboarding": true,
      "primary": primaryColor,
      "secondary": secondaryColor,
      "active": activeColor
    }).then(_temp);
  };
  if (!onboardingCompleted) {
    let t4;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
      t4 = /*#__PURE__*/React.createElement(_CalendarLoading__WEBPACK_IMPORTED_MODULE_2__["default"], null);
      $[10] = t4;
    } else {
      t4 = $[10];
    }
    return t4;
  }
  let t4;
  if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
    t4 = /*#__PURE__*/React.createElement("div", {
      id: "sbw_z0hg2i_calendar",
      className: " w-full -mt-20",
      style: {
        height: "1200px"
      }
    });
    $[11] = t4;
  } else {
    t4 = $[11];
  }
  return t4;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Calendar);
function _temp(response) {
  const inlineScriptElement = document.createElement("script");
  inlineScriptElement.id = "simplybook-preview-widget-script";
  inlineScriptElement.innerHTML = response.data.widget;
  document.head.appendChild(inlineScriptElement);
  document.dispatchEvent(new CustomEvent("loadSimplyBookPreviewWidget"));
}

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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




const CalendarLoading = () => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(21);
  const [progress, setProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const {
    onboardingCompleted
  } = (0,_hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const [warning, setWarning] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [iterations, setIterations] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  let t0;
  if ($[0] !== iterations || $[1] !== onboardingCompleted) {
    t0 = () => {
      const timer = setInterval(() => {
        setProgress(prev => {
          let nextProgress = prev + 0.3333333333333333;
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
            return 100;
          }
          return nextProgress;
        });
      }, 100);
      return () => clearInterval(timer);
    };
    $[0] = iterations;
    $[1] = onboardingCompleted;
    $[2] = t0;
  } else {
    t0 = $[2];
  }
  let t1;
  if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = [];
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(t0, t1);
  let t2;
  if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = window.location.href.includes("onboarding");
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  const isInOnboardingProcess = t2;
  const animateClass = isInOnboardingProcess ? "animate-pulse" : "";
  let t3;
  if ($[5] !== progress) {
    t3 = isInOnboardingProcess && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "w-full h-1 bg-gray-200 rounded-t-lg overflow-hidden"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "h-full bg-blue-500 transition-all duration-100",
      style: {
        width: `${progress}%`
      }
    })));
    $[5] = progress;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  let t4;
  if ($[7] !== iterations || $[8] !== warning) {
    t4 = isInOnboardingProcess && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, iterations <= 5 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, !warning && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Please wait while your registration is being processed. This usually takes about 30 seconds.", "simplybook")), warning && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("This is taking a bit longer than expected. Please wait while we retry a few times.", "simplybook"))), iterations > 5 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("We're sorry, but it seems there is a problem with your registration. Please try again later.", "simplybook")));
    $[7] = iterations;
    $[8] = warning;
    $[9] = t4;
  } else {
    t4 = $[9];
  }
  let t5;
  if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
    t5 = !isInOnboardingProcess && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Please complete the onboarding first to register your account.", "simplybook"));
    $[10] = t5;
  } else {
    t5 = $[10];
  }
  let t6;
  if ($[11] !== t4) {
    t6 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: `text-gray-400 text-center p-3  ${"bg-gray-100"}`
    }, t4, t5);
    $[11] = t4;
    $[12] = t6;
  } else {
    t6 = $[12];
  }
  let t7;
  if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
    t7 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "p-4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "text-center h-40"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: `w-full h-full ${"bg-gray-100"} rounded-md`
    })));
    $[13] = t7;
  } else {
    t7 = $[13];
  }
  let t8;
  if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
    t8 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("h4", {
      className: "text-gray-700 font-bold mb-4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: `h-6 ${"bg-gray-100"} rounded-md`
    }));
    $[14] = t8;
  } else {
    t8 = $[14];
  }
  let t9;
  if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
    t9 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "grid grid-cols-3 gap-3"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: `text-white text-center py-2 rounded-md ${"bg-gray-100"} w-full h-10`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: `text-white text-center py-2 rounded-md ${"bg-gray-100"} w-full h-10`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: `text-white text-center py-2 rounded-md ${"bg-gray-100"} w-full h-10`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: `text-white text-center py-2 rounded-md ${"bg-gray-100"} w-full h-10`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: `text-white text-center py-2 rounded-md ${"bg-gray-100"} w-full h-10`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: `text-white text-center py-2 rounded-md ${"bg-gray-100"} w-full h-10`
    }));
    $[15] = t9;
  } else {
    t9 = $[15];
  }
  let t10;
  if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
    t10 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
      className: `inline-block w-3 h-3 rounded-full ${"bg-gray-100"}`
    });
    $[16] = t10;
  } else {
    t10 = $[16];
  }
  let t11;
  if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
    t11 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "p-4 border-t"
    }, t8, t9, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "text-gray-500 text-sm mt-3"
    }, t10, " - ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
      className: "font-medium"
    })));
    $[17] = t11;
  } else {
    t11 = $[17];
  }
  let t12;
  if ($[18] !== t3 || $[19] !== t6) {
    t12 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "w-full max-w-md bg-white shadow-md mt-5 " + animateClass
    }, t3, t6, t7, t11);
    $[18] = t3;
    $[19] = t6;
    $[20] = t12;
  } else {
    t12 = $[20];
  }
  return t12;
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.mjs");
/* harmony import */ var _fortawesome_pro_regular_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/pro-regular-svg-icons */ "./node_modules/@fortawesome/pro-regular-svg-icons/index.mjs");
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ "./node_modules/@fortawesome/free-brands-svg-icons/index.mjs");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }


/**
 * Import the icon packages you want to use
 * Look at https://docs.fontawesome.com/web/use-with/react/add-icons for more information
 *
 * the authentication for FA is in the .npmrc which should only
 * be visible local and not pushed to main/production
 */




// Map your icons to keys for easy referencing
const iconMap = {
  "retry": _fortawesome_pro_regular_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faFileCircleXmark,
  "square-arrow-up-right": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faSquareArrowUpRight,
  "circle-check": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faCircleCheck,
  "circle-xmark": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faCircleXmark,
  "spinner": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faSpinner,
  "chevron-down": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faChevronDown,
  "chevron-up": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faChevronUp,
  "check": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faCheck,
  "info": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faInfoCircle,
  "times": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faTimes,
  "trophy": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faTrophy,
  "user-group": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faUserGroup,
  "eye": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faEye,
  "bullhorn": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faBullhorn,
  "support": _fortawesome_pro_regular_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faGlobe,
  "clock": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faClock,
  "circle": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faCircle,
  "cart": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faShoppingCart,
  "target-blank": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faArrowUpRightFromSquare,
  "youtube": _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faYoutube,
  "tips": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faLinesLeaning
};
const Icon = t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(18);
  let name;
  let props;
  let t1;
  let t2;
  let t3;
  if ($[0] !== t0) {
    ({
      name,
      color: t1,
      size: t2,
      className: t3,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = name;
    $[2] = props;
    $[3] = t1;
    $[4] = t2;
    $[5] = t3;
  } else {
    name = $[1];
    props = $[2];
    t1 = $[3];
    t2 = $[4];
    t3 = $[5];
  }
  const color = t1 === undefined ? "black" : t1;
  const size = t2 === undefined ? "1x" : t2;
  const className = t3 === undefined ? "" : t3;
  let icon = iconMap[name];
  if (!icon) {
    console.warn(`Icon "${name}" does not exist in iconMap.`);
    icon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faCircle;
  }
  const t4 = name === "spinner";
  let t5;
  if ($[6] !== name) {
    t5 = name === "spinner" && {
      animationDuration: "2s"
    };
    $[6] = name;
    $[7] = t5;
  } else {
    t5 = $[7];
  }
  let t6;
  if ($[8] !== color || $[9] !== t5) {
    t6 = {
      color,
      ...t5
    };
    $[8] = color;
    $[9] = t5;
    $[10] = t6;
  } else {
    t6 = $[10];
  }
  let t7;
  if ($[11] !== className || $[12] !== icon || $[13] !== props || $[14] !== size || $[15] !== t4 || $[16] !== t6) {
    t7 = /*#__PURE__*/React.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, _extends({
      icon: icon,
      size: size,
      spin: t4,
      className: className,
      style: t6
    }, props));
    $[11] = className;
    $[12] = icon;
    $[13] = props;
    $[14] = size;
    $[15] = t4;
    $[16] = t6;
    $[17] = t7;
  } else {
    t7 = $[17];
  }
  return t7;
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon */ "./src/components/Common/Icon.jsx");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.tsx");
/* harmony import */ var _hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var _hooks_useLoginData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/useLoginData */ "./src/hooks/useLoginData.tsx");







const LoginLink = t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(26);
  const {
    className: t1,
    page: t2,
    isButton: t3,
    size: t4,
    btnVariant: t5,
    children: t6,
    disabled: t7,
    iconName: t8,
    iconSize: t9,
    iconClass: t10,
    iconStyle: t11,
    onClick: t12,
    reverseIcon: t13
  } = t0;
  const className = t1 === undefined ? "" : t1;
  const page = t2 === undefined ? "" : t2;
  const isButton = t3 === undefined ? false : t3;
  const size = t4 === undefined ? "md" : t4;
  const btnVariant = t5 === undefined ? "primary" : t5;
  const children = t6 === undefined ? "" : t6;
  const disabled = t7 === undefined ? false : t7;
  const iconName = t8 === undefined ? "" : t8;
  const iconSize = t9 === undefined ? "" : t9;
  const iconClass = t10 === undefined ? "" : t10;
  const iconStyle = t11 === undefined ? "" : t11;
  t12 === undefined ? _temp : t12;
  const reverseIcon = t13 === undefined ? false : t13;
  const {
    fetchLinkData
  } = (0,_hooks_useLoginData__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_5__["default"])();
  let t14;
  if ($[0] !== fetchLinkData) {
    t14 = (e, page_0) => {
      e.preventDefault();
      fetchLinkData().then(response => {
        const link = response?.data.simplybook_dashboard_url;
        if (!link) {
          console.error("No link found in response");
          return;
        }
        let finalUrl = `${link}/${page_0}/`;
        if (link.includes("by-hash")) {
          finalUrl = `${link}?back_url=/${page_0}/`;
        }
        window.open(finalUrl, "_blank");
        window.focus();
      }).catch(_temp2);
    };
    $[0] = fetchLinkData;
    $[1] = t14;
  } else {
    t14 = $[1];
  }
  const loginTo = t14;
  const externalLinkClass = disabled ? "pointer-events-none opacity-50 cursor-not-allowed" : "";
  const combinedClassName = `${externalLinkClass}${className} `;
  if (isButton) {
    let t15;
    if ($[2] !== loginTo || $[3] !== page) {
      t15 = e_0 => loginTo(e_0, page);
      $[2] = loginTo;
      $[3] = page;
      $[4] = t15;
    } else {
      t15 = $[4];
    }
    let t16;
    if ($[5] !== btnVariant || $[6] !== children || $[7] !== combinedClassName || $[8] !== disabled || $[9] !== size || $[10] !== t15) {
      t16 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_4__["default"], {
        disabled: disabled,
        label: children,
        onClick: t15,
        className: combinedClassName,
        btnVarisant: btnVariant,
        size: size
      }, children);
      $[5] = btnVariant;
      $[6] = children;
      $[7] = combinedClassName;
      $[8] = disabled;
      $[9] = size;
      $[10] = t15;
      $[11] = t16;
    } else {
      t16 = $[11];
    }
    return t16;
  }
  let t15;
  if ($[12] !== loginTo || $[13] !== page) {
    t15 = e_1 => loginTo(e_1, page);
    $[12] = loginTo;
    $[13] = page;
    $[14] = t15;
  } else {
    t15 = $[14];
  }
  let t16;
  if ($[15] !== iconClass || $[16] !== iconName || $[17] !== iconSize || $[18] !== iconStyle || $[19] !== reverseIcon) {
    t16 = iconName.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(iconClass, {
        "mr-2": !reverseIcon,
        "ml-2": reverseIcon
      }),
      name: iconName,
      size: iconSize,
      style: iconStyle
    });
    $[15] = iconClass;
    $[16] = iconName;
    $[17] = iconSize;
    $[18] = iconStyle;
    $[19] = reverseIcon;
    $[20] = t16;
  } else {
    t16 = $[20];
  }
  let t17;
  if ($[21] !== children || $[22] !== combinedClassName || $[23] !== t15 || $[24] !== t16) {
    t17 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
      href: "#",
      className: combinedClassName,
      onClick: t15
    }, children, t16);
    $[21] = children;
    $[22] = combinedClassName;
    $[23] = t15;
    $[24] = t16;
    $[25] = t17;
  } else {
    t17 = $[25];
  }
  return t17;
};
LoginLink.displayName = "LoginLink";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginLink);
function _temp() {}
function _temp2(error) {
  console.error("Error fetching login URL:", error);
}

/***/ }),

/***/ "./src/components/Fields/AuthenticationField.jsx":
/*!*******************************************************!*\
  !*** ./src/components/Fields/AuthenticationField.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Inputs_TextInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Inputs/TextInput */ "./src/components/Inputs/TextInput.tsx");
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.tsx");
/* harmony import */ var _ButtonField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ButtonField */ "./src/components/Fields/ButtonField.jsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../api/requests/HttpClient */ "./src/api/requests/HttpClient.tsx");
/* harmony import */ var _Buttons_ButtonLink__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Buttons/ButtonLink */ "./src/components/Buttons/ButtonLink.tsx");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }









/**
 * AuthenticationField component
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 */
const AuthenticationField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(28);
  let className;
  let context;
  let fieldState;
  let help;
  let label;
  let props;
  let setting;
  if ($[0] !== t0) {
    ({
      setting,
      fieldState,
      label,
      help,
      context,
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = context;
    $[3] = fieldState;
    $[4] = help;
    $[5] = label;
    $[6] = props;
    $[7] = setting;
  } else {
    className = $[1];
    context = $[2];
    fieldState = $[3];
    help = $[4];
    label = $[5];
    props = $[6];
    setting = $[7];
  }
  const inputId = setting.id;
  let t1;
  if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
    const client = new _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_6__["default"]("logout");
    t1 = async e => {
      e.preventDefault();
      const confirmed = window.confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Are you sure you want to logout? All settings will be lost.", "simplybook"));
      if (!confirmed) {
        return;
      }
      ;
      try {
        await client.post();
      } catch (t2) {
        const error = t2;
        console.error("Logout request failed", error);
        return;
      }
      window.location.href = "/wp-admin/admin.php?page=simplybook";
    };
    $[8] = t1;
  } else {
    t1 = $[8];
  }
  const handleLogoutClick = t1;
  const t2 = fieldState?.error?.message;
  const t3 = props.required;
  const t4 = !!fieldState?.error?.message;
  let t5;
  if ($[9] !== inputId || $[10] !== props || $[11] !== t4) {
    t5 = /*#__PURE__*/React.createElement(_Inputs_TextInput__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
      className: "mb-4",
      id: inputId,
      type: "text",
      "aria-invalid": t4
    }, props));
    $[9] = inputId;
    $[10] = props;
    $[11] = t4;
    $[12] = t5;
  } else {
    t5 = $[12];
  }
  const t6 = !!fieldState?.error?.message;
  let t7;
  if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
    t7 = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Log out", "simplybook");
    $[13] = t7;
  } else {
    t7 = $[13];
  }
  let t8;
  if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
    t8 = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Log out", "simplybook");
    $[14] = t8;
  } else {
    t8 = $[14];
  }
  let t9;
  if ($[15] !== inputId || $[16] !== t6) {
    t9 = /*#__PURE__*/React.createElement(_Buttons_ButtonLink__WEBPACK_IMPORTED_MODULE_7__["default"], {
      id: inputId,
      btnVariant: "tertiary-small",
      "aria-invalid": t6,
      label: t7,
      onClick: handleLogoutClick
    }, t8);
    $[15] = inputId;
    $[16] = t6;
    $[17] = t9;
  } else {
    t9 = $[17];
  }
  let t10;
  if ($[18] !== className || $[19] !== context || $[20] !== help || $[21] !== inputId || $[22] !== label || $[23] !== props.required || $[24] !== t2 || $[25] !== t5 || $[26] !== t9) {
    t10 = /*#__PURE__*/React.createElement(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: label,
      help: help,
      error: t2,
      context: context,
      className: className,
      inputId: inputId,
      required: t3
    }, t5, t9);
    $[18] = className;
    $[19] = context;
    $[20] = help;
    $[21] = inputId;
    $[22] = label;
    $[23] = props.required;
    $[24] = t2;
    $[25] = t5;
    $[26] = t9;
    $[27] = t10;
  } else {
    t10 = $[27];
  }
  return t10;
});
AuthenticationField.displayName = "AuthenticationField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthenticationField);

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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.tsx");
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.tsx");
/* harmony import */ var _Common_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Icon */ "./src/components/Common/Icon.jsx");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }





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
const ButtonField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(22);
  let button;
  let className;
  let context;
  let help;
  let label;
  let props;
  if ($[0] !== t0) {
    const {
      setting,
      label: t1,
      help: t2,
      context: t3,
      className: t4,
      button: t5,
      ...t6
    } = t0;
    label = t1;
    help = t2;
    context = t3;
    className = t4;
    button = t5;
    props = t6;
    $[0] = t0;
    $[1] = button;
    $[2] = className;
    $[3] = context;
    $[4] = help;
    $[5] = label;
    $[6] = props;
  } else {
    button = $[1];
    className = $[2];
    context = $[3];
    help = $[4];
    label = $[5];
    props = $[6];
  }
  const t1 = button?.btnVariant;
  const t2 = button?.disabled;
  const t3 = button?.showLoader;
  const t4 = button?.onClick;
  let t5;
  if ($[7] !== props.showLoader) {
    t5 = props.showLoader && /*#__PURE__*/React.createElement(_Common_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
      color: "white",
      name: "spinner",
      size: "1x",
      className: "mr-2"
    });
    $[7] = props.showLoader;
    $[8] = t5;
  } else {
    t5 = $[8];
  }
  let t6;
  if ($[9] !== label || $[10] !== props || $[11] !== t1 || $[12] !== t2 || $[13] !== t3 || $[14] !== t4 || $[15] !== t5) {
    t6 = /*#__PURE__*/React.createElement(_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
      btnVariant: t1,
      disabled: t2,
      showLoader: t3,
      onClick: t4
    }, props), t5, label);
    $[9] = label;
    $[10] = props;
    $[11] = t1;
    $[12] = t2;
    $[13] = t3;
    $[14] = t4;
    $[15] = t5;
    $[16] = t6;
  } else {
    t6 = $[16];
  }
  let t7;
  if ($[17] !== className || $[18] !== context || $[19] !== help || $[20] !== t6) {
    t7 = /*#__PURE__*/React.createElement(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: "",
      help: help,
      context: context,
      className: className,
      inputId: ""
    }, t6);
    $[17] = className;
    $[18] = context;
    $[19] = help;
    $[20] = t6;
    $[21] = t7;
  } else {
    t7 = $[21];
  }
  return t7;
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Inputs_CheckboxInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Inputs/CheckboxInput */ "./src/components/Inputs/CheckboxInput.tsx");
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.tsx");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }





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
const CheckboxField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(21);
  let className;
  let context;
  let fieldState;
  let help;
  let label;
  let props;
  let setting;
  if ($[0] !== t0) {
    ({
      setting,
      fieldState,
      label,
      help,
      context,
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = context;
    $[3] = fieldState;
    $[4] = help;
    $[5] = label;
    $[6] = props;
    $[7] = setting;
  } else {
    className = $[1];
    context = $[2];
    fieldState = $[3];
    help = $[4];
    label = $[5];
    props = $[6];
    setting = $[7];
  }
  const inputId = setting.id;
  const t1 = fieldState?.error?.message;
  const t2 = !!fieldState?.error?.message;
  let t3;
  if ($[8] !== inputId || $[9] !== label || $[10] !== props || $[11] !== t2) {
    t3 = /*#__PURE__*/React.createElement(_Inputs_CheckboxInput__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
      label: label,
      id: inputId,
      "aria-invalid": t2
    }, props));
    $[8] = inputId;
    $[9] = label;
    $[10] = props;
    $[11] = t2;
    $[12] = t3;
  } else {
    t3 = $[12];
  }
  let t4;
  if ($[13] !== className || $[14] !== context || $[15] !== help || $[16] !== inputId || $[17] !== props.required || $[18] !== t1 || $[19] !== t3) {
    t4 = /*#__PURE__*/React.createElement(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: "",
      help: help,
      error: t1,
      context: context,
      className: className,
      inputId: inputId,
      required: props.required,
      type: "checkbox"
    }, t3);
    $[13] = className;
    $[14] = context;
    $[15] = help;
    $[16] = inputId;
    $[17] = props.required;
    $[18] = t1;
    $[19] = t3;
    $[20] = t4;
  } else {
    t4 = $[20];
  }
  return t4;
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Inputs_ColorPicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Inputs/ColorPicker */ "./src/components/Inputs/ColorPicker.tsx");
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.tsx");
/* harmony import */ var _radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @radix-ui/react-popover */ "./node_modules/@radix-ui/react-popover/dist/index.mjs");
/* harmony import */ var _hooks_useWaitForRegistrationCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useWaitForRegistrationCallback */ "./src/hooks/useWaitForRegistrationCallback.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_5__);






 // You can use lodash's debounce function

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
const ColorPickerField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(38);
  let className;
  let context;
  let fieldState;
  let help;
  let label;
  let onChange;
  let props;
  let setColorOnClose;
  let setting;
  if ($[0] !== t0) {
    const {
      setting: t1,
      fieldState: t2,
      label: t3,
      help: t4,
      context: t5,
      className: t6,
      onChange: t7,
      defaultValue,
      setColorOnClose: t8,
      ...t9
    } = t0;
    setting = t1;
    fieldState = t2;
    label = t3;
    help = t4;
    context = t5;
    className = t6;
    onChange = t7;
    setColorOnClose = t8;
    props = t9;
    $[0] = t0;
    $[1] = className;
    $[2] = context;
    $[3] = fieldState;
    $[4] = help;
    $[5] = label;
    $[6] = onChange;
    $[7] = props;
    $[8] = setColorOnClose;
    $[9] = setting;
  } else {
    className = $[1];
    context = $[2];
    fieldState = $[3];
    help = $[4];
    label = $[5];
    onChange = $[6];
    props = $[7];
    setColorOnClose = $[8];
    setting = $[9];
  }
  const [color, setColor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(setting.value || setting.default);
  const [popoverOpen, setPopoverOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  let t1;
  if ($[10] !== color || $[11] !== props.value) {
    t1 = () => {
      if (props.value && props.value !== color) {
        setColor(props.value);
      }
    };
    $[10] = color;
    $[11] = props.value;
    $[12] = t1;
  } else {
    t1 = $[12];
  }
  let t2;
  if ($[13] !== props.value) {
    t2 = [props.value];
    $[13] = props.value;
    $[14] = t2;
  } else {
    t2 = $[14];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(t1, t2);
  let t3;
  if ($[15] !== color || $[16] !== setColorOnClose) {
    t3 = open => {
      setPopoverOpen(open);
      if (!open && setColorOnClose) {
        setColorOnClose(color);
      }
    };
    $[15] = color;
    $[16] = setColorOnClose;
    $[17] = t3;
  } else {
    t3 = $[17];
  }
  const handlePopoverOpenChange = t3;
  let t4;
  if ($[18] !== onChange) {
    t4 = (color_0, event) => {
      setColor(color_0);
      if (onChange) {
        onChange(color_0);
      }
    };
    $[18] = onChange;
    $[19] = t4;
  } else {
    t4 = $[19];
  }
  const handleColorChange = t4;
  let t5;
  if ($[20] !== color || $[21] !== handleColorChange || $[22] !== handlePopoverOpenChange || $[23] !== popoverOpen || $[24] !== setting.disabled) {
    t5 = t6 => {
      const {
        label: label_0
      } = t6;
      const disabledClass = setting.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_6__.Root, {
        open: popoverOpen,
        onOpenChange: handlePopoverOpenChange
      }, /*#__PURE__*/React.createElement(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_6__.Trigger, {
        className: "p-1 w-full bg-transparent rounded-md border border-gray-400 min-w-[140px] text-base"
      }, /*#__PURE__*/React.createElement("div", {
        className: disabledClass + " whitespace-nowrap min-w-5 flex p-1.5 gap-3.5 items-center"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rounded-full min-w-5 h-5 border border-gray-300",
        style: {
          backgroundColor: color
        }
      }), label_0)), /*#__PURE__*/React.createElement(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_6__.Portal, null, /*#__PURE__*/React.createElement(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_6__.Content, null, /*#__PURE__*/React.createElement(_Inputs_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
        colorValue: color,
        onChangeComplete: handleColorChange
      })))));
    };
    $[20] = color;
    $[21] = handleColorChange;
    $[22] = handlePopoverOpenChange;
    $[23] = popoverOpen;
    $[24] = setting.disabled;
    $[25] = t5;
  } else {
    t5 = $[25];
  }
  const ColorPickerElement = t5;
  const t6 = fieldState?.error?.message;
  let t7;
  if ($[26] !== ColorPickerElement || $[27] !== label || $[28] !== setting) {
    t7 = /*#__PURE__*/React.createElement(ColorPickerElement, {
      setting: setting,
      label: label
    });
    $[26] = ColorPickerElement;
    $[27] = label;
    $[28] = setting;
    $[29] = t7;
  } else {
    t7 = $[29];
  }
  let t8;
  if ($[30] !== className || $[31] !== context || $[32] !== help || $[33] !== props.required || $[34] !== setting.id || $[35] !== t6 || $[36] !== t7) {
    t8 = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: "",
      help: help,
      error: t6,
      context: context,
      className: className,
      inputId: setting.id,
      required: props.required
    }, t7));
    $[30] = className;
    $[31] = context;
    $[32] = help;
    $[33] = props.required;
    $[34] = setting.id;
    $[35] = t6;
    $[36] = t7;
    $[37] = t8;
  } else {
    t8 = $[37];
  }
  return t8;
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Inputs_HiddenInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Inputs/HiddenInput */ "./src/components/Inputs/HiddenInput.tsx");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }




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
const HiddenField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(10);
  let field;
  let fieldState;
  let props;
  let setting;
  if ($[0] !== t0) {
    const {
      setting: t1,
      field: t2,
      fieldState: t3,
      label,
      help,
      context,
      className,
      ...t4
    } = t0;
    setting = t1;
    field = t2;
    fieldState = t3;
    props = t4;
    $[0] = t0;
    $[1] = field;
    $[2] = fieldState;
    $[3] = props;
    $[4] = setting;
  } else {
    field = $[1];
    fieldState = $[2];
    props = $[3];
    setting = $[4];
  }
  const t1 = !!fieldState?.error?.message;
  let t2;
  if ($[5] !== field || $[6] !== props || $[7] !== setting.id || $[8] !== t1) {
    t2 = /*#__PURE__*/React.createElement(_Inputs_HiddenInput__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, field, {
      id: setting.id,
      type: "hidden",
      "aria-invalid": t1
    }, props));
    $[5] = field;
    $[6] = props;
    $[7] = setting.id;
    $[8] = t1;
    $[9] = t2;
  } else {
    t2 = $[9];
  }
  return t2;
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Inputs_ImplementationInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Inputs/ImplementationInput */ "./src/components/Inputs/ImplementationInput.tsx");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }



const ImplementationField = t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(16);
  let onChange;
  let options;
  let props;
  let value;
  if ($[0] !== t0) {
    ({
      options,
      value,
      onChange,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = onChange;
    $[2] = options;
    $[3] = props;
    $[4] = value;
  } else {
    onChange = $[1];
    options = $[2];
    props = $[3];
    value = $[4];
  }
  const defaultValue = props.setting && props.setting.default ? props.setting.default : "";
  const actualValue = value || defaultValue;
  const {
    setValue
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_2__["default"])();
  let t1;
  if ($[5] !== onChange || $[6] !== props.setting.id || $[7] !== setValue) {
    t1 = async value_0 => {
      await setValue(props.setting.id, value_0);
      onChange(value_0);
    };
    $[5] = onChange;
    $[6] = props.setting.id;
    $[7] = setValue;
    $[8] = t1;
  } else {
    t1 = $[8];
  }
  const handleChange = t1;
  let t2;
  if ($[9] !== handleChange) {
    t2 = value_1 => handleChange(value_1);
    $[9] = handleChange;
    $[10] = t2;
  } else {
    t2 = $[10];
  }
  let t3;
  if ($[11] !== actualValue || $[12] !== options || $[13] !== props || $[14] !== t2) {
    t3 = /*#__PURE__*/React.createElement("div", {
      className: "w-full mb-8"
    }, /*#__PURE__*/React.createElement(_Inputs_ImplementationInput__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
      options: options,
      value: actualValue,
      onChange: t2
    }, props)));
    $[11] = actualValue;
    $[12] = options;
    $[13] = props;
    $[14] = t2;
    $[15] = t3;
  } else {
    t3 = $[15];
  }
  return t3;
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useServicesData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useServicesData */ "./src/hooks/useServicesData.tsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ListItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ListItem */ "./src/components/Fields/ListItem.js");
/* harmony import */ var _hooks_useProviderData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useProviderData */ "./src/hooks/useProviderData.tsx");






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
const ListField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(39);
  const {
    setting,
    label
  } = t0;
  const {
    services,
    servicesFetched
  } = (0,_hooks_useServicesData__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const {
    providers,
    providersFetched
  } = (0,_hooks_useProviderData__WEBPACK_IMPORTED_MODULE_5__["default"])();
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = [];
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  const [listArray, setListArray] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(t1);
  const [listFetched, setListFetched] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  let t2;
  if ($[1] !== services || $[2] !== servicesFetched) {
    t2 = {
      fetched: servicesFetched,
      data: services
    };
    $[1] = services;
    $[2] = servicesFetched;
    $[3] = t2;
  } else {
    t2 = $[3];
  }
  let t3;
  if ($[4] !== providers || $[5] !== providersFetched) {
    t3 = {
      fetched: providersFetched,
      data: providers
    };
    $[4] = providers;
    $[5] = providersFetched;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  let t4;
  if ($[7] !== t2 || $[8] !== t3) {
    t4 = {
      services: t2,
      providers: t3
    };
    $[7] = t2;
    $[8] = t3;
    $[9] = t4;
  } else {
    t4 = $[9];
  }
  const sourceData = t4;
  let t5;
  if ($[10] !== setting.source || $[11] !== sourceData) {
    t5 = () => {
      setListArray(sourceData[setting.source]?.data);
      setListFetched(sourceData[setting.source]?.fetched);
    };
    $[10] = setting.source;
    $[11] = sourceData;
    $[12] = t5;
  } else {
    t5 = $[12];
  }
  const t6 = sourceData[setting.source];
  let t7;
  if ($[13] !== t6) {
    t7 = [t6];
    $[13] = t6;
    $[14] = t7;
  } else {
    t7 = $[14];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(t5, t7);
  let t8;
  if ($[15] !== setting.edit_link || $[16] !== setting.link) {
    t8 = id => setting?.edit_link?.replace("{ID}", id) ?? setting.link;
    $[15] = setting.edit_link;
    $[16] = setting.link;
    $[17] = t8;
  } else {
    t8 = $[17];
  }
  const getEditLink = t8;
  if (listFetched && !Array.isArray(listArray)) {
    let t9;
    if ($[18] !== setting.label) {
      t9 = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("No %s found."), setting.label.toLowerCase());
      $[18] = setting.label;
      $[19] = t9;
    } else {
      t9 = $[19];
    }
    let t10;
    if ($[20] !== t9) {
      t10 = /*#__PURE__*/React.createElement(React.Fragment, null, t9);
      $[20] = t9;
      $[21] = t10;
    } else {
      t10 = $[21];
    }
    return t10;
  }
  let t9;
  if ($[22] !== setting.premiumText) {
    t9 = {
      id: "upgrade",
      name: setting.premiumText,
      picture_preview: ""
    };
    $[22] = setting.premiumText;
    $[23] = t9;
  } else {
    t9 = $[23];
  }
  const premiumItem = t9;
  let t10;
  if ($[24] !== listFetched || $[25] !== setting.label) {
    t10 = !listFetched && /*#__PURE__*/React.createElement("p", {
      className: "mb-4"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Loading %s..."), setting.label.toLowerCase()));
    $[24] = listFetched;
    $[25] = setting.label;
    $[26] = t10;
  } else {
    t10 = $[26];
  }
  let t11;
  if ($[27] !== getEditLink || $[28] !== label || $[29] !== listArray || $[30] !== listFetched) {
    t11 = listFetched && listArray.map(item => /*#__PURE__*/React.createElement(_ListItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
      upgrade: false,
      key: item.id + item.source,
      label: label,
      link: getEditLink(item.id),
      item: item
    }));
    $[27] = getEditLink;
    $[28] = label;
    $[29] = listArray;
    $[30] = listFetched;
    $[31] = t11;
  } else {
    t11 = $[31];
  }
  let t12;
  if ($[32] !== label || $[33] !== premiumItem) {
    t12 = /*#__PURE__*/React.createElement(_ListItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
      upgrade: true,
      label: label,
      link: "v2/r/payment-widget",
      item: premiumItem
    });
    $[32] = label;
    $[33] = premiumItem;
    $[34] = t12;
  } else {
    t12 = $[34];
  }
  let t13;
  if ($[35] !== t10 || $[36] !== t11 || $[37] !== t12) {
    t13 = /*#__PURE__*/React.createElement("div", {
      className: "w-full"
    }, t10, t11, t12);
    $[35] = t10;
    $[36] = t11;
    $[37] = t12;
    $[38] = t13;
  } else {
    t13 = $[38];
  }
  return t13;
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Inputs_CheckboxInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Inputs/CheckboxInput */ "./src/components/Inputs/CheckboxInput.tsx");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Common_Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Common/Icon */ "./src/components/Common/Icon.jsx");
/* harmony import */ var _Common_LoginLink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Common/LoginLink */ "./src/components/Common/LoginLink.jsx");
/* harmony import */ var _hooks_useDomainData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../hooks/useDomainData */ "./src/hooks/useDomainData.tsx");
/* harmony import */ var _Buttons_ButtonLink__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Buttons/ButtonLink */ "./src/components/Buttons/ButtonLink.tsx");









/**
 * HiddenField component
 * @param {string} id
 * @param {string} name

 */
const ListItem = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(44);
  const {
    upgrade,
    link,
    item,
    label
  } = t0;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!!item?.is_visible || false);
  const {
    domain,
    domainFetched,
    hasError: domainHasError
  } = (0,_hooks_useDomainData__WEBPACK_IMPORTED_MODULE_7__["default"])();
  const hasPicture = domainFetched && item.picture_preview && item.picture_preview.length > 0;
  let t1;
  if ($[0] !== label || $[1] !== upgrade) {
    t1 = upgrade ? " |  " + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Get unlimited %s", "simplybook"), label.toLowerCase()) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Edit", "simplybook");
    $[0] = label;
    $[1] = upgrade;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  const fullLabel = t1;
  const t2 = upgrade ? "justify-start" : "justify-between";
  let t3;
  if ($[3] !== t2) {
    t3 = (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(t2, "flex flex-row items-center w-full space-x-3 text-base");
    $[3] = t2;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  let t4;
  if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
    t4 = (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])("flex items-center");
    $[5] = t4;
  } else {
    t4 = $[5];
  }
  let t5;
  if ($[6] !== domain || $[7] !== domainFetched || $[8] !== domainHasError || $[9] !== hasPicture || $[10] !== item.picture_preview) {
    t5 = domainFetched && !domainHasError && hasPicture && /*#__PURE__*/React.createElement("img", {
      className: "w-20 h-20 max-w-[48px] max-h-[48px] bg-blue-100 text-xs flex items-center justify-center overflow-hidden rounded-md",
      src: domain + item.picture_preview,
      alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Loading", "simplybook")
    });
    $[6] = domain;
    $[7] = domainFetched;
    $[8] = domainHasError;
    $[9] = hasPicture;
    $[10] = item.picture_preview;
    $[11] = t5;
  } else {
    t5 = $[11];
  }
  let t6;
  if ($[12] !== domainFetched || $[13] !== domainHasError || $[14] !== hasPicture || $[15] !== item.name) {
    t6 = domainFetched && !domainHasError && !hasPicture && /*#__PURE__*/React.createElement("div", {
      className: "w-20 h-20 max-w-[48px] max-h-[48px] bg-blue-100 text-xs flex items-center justify-center overflow-hidden rounded-md font-bold"
    }, item.name.charAt(0).toUpperCase());
    $[12] = domainFetched;
    $[13] = domainHasError;
    $[14] = hasPicture;
    $[15] = item.name;
    $[16] = t6;
  } else {
    t6 = $[16];
  }
  let t7;
  if ($[17] !== item.name) {
    t7 = /*#__PURE__*/React.createElement("div", {
      className: "font-bold ml-4"
    }, item.name);
    $[17] = item.name;
    $[18] = t7;
  } else {
    t7 = $[18];
  }
  let t8;
  if ($[19] !== t5 || $[20] !== t6 || $[21] !== t7) {
    t8 = /*#__PURE__*/React.createElement("div", {
      className: t4
    }, t5, t6, t7);
    $[19] = t5;
    $[20] = t6;
    $[21] = t7;
    $[22] = t8;
  } else {
    t8 = $[22];
  }
  let t9;
  if ($[23] !== fullLabel || $[24] !== upgrade) {
    t9 = upgrade && /*#__PURE__*/React.createElement("p", null, fullLabel);
    $[23] = fullLabel;
    $[24] = upgrade;
    $[25] = t9;
  } else {
    t9 = $[25];
  }
  let t10;
  if ($[26] !== domainFetched || $[27] !== domainHasError || $[28] !== fullLabel || $[29] !== link || $[30] !== upgrade) {
    t10 = !upgrade && domainFetched && !domainHasError && /*#__PURE__*/React.createElement(_Common_LoginLink__WEBPACK_IMPORTED_MODULE_6__["default"], {
      icon: true,
      iconName: "square-arrow-up-right",
      iconClass: "px-2",
      className: "text-black flex items-center",
      page: link
    }, fullLabel);
    $[26] = domainFetched;
    $[27] = domainHasError;
    $[28] = fullLabel;
    $[29] = link;
    $[30] = upgrade;
    $[31] = t10;
  } else {
    t10 = $[31];
  }
  let t11;
  if ($[32] !== t10 || $[33] !== t3 || $[34] !== t8 || $[35] !== t9) {
    t11 = /*#__PURE__*/React.createElement("div", {
      className: t3
    }, t8, t9, t10);
    $[32] = t10;
    $[33] = t3;
    $[34] = t8;
    $[35] = t9;
    $[36] = t11;
  } else {
    t11 = $[36];
  }
  let t12;
  if ($[37] !== upgrade) {
    t12 = upgrade && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Buttons_ButtonLink__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: "bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary",
      btnVariant: "square-small",
      target: "_blank",
      loginLink: "v2/r/payment-widget"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Upgrade", "simplybook")));
    $[37] = upgrade;
    $[38] = t12;
  } else {
    t12 = $[38];
  }
  let t13;
  if ($[39] !== t12) {
    t13 = /*#__PURE__*/React.createElement("div", {
      className: "flex items-center flex-grow"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative"
    }, t12));
    $[39] = t12;
    $[40] = t13;
  } else {
    t13 = $[40];
  }
  let t14;
  if ($[41] !== t11 || $[42] !== t13) {
    t14 = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "w-full flex items-center justify-between px-4 py-5 bg-gray-100 mb-4"
    }, t11, t13));
    $[41] = t11;
    $[42] = t13;
    $[43] = t14;
  } else {
    t14 = $[43];
  }
  return t14;
});
ListItem.displayName = 'ListItem';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListItem);

/***/ }),

/***/ "./src/components/Fields/PalettesField.jsx":
/*!*************************************************!*\
  !*** ./src/components/Fields/PalettesField.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.tsx");
/* harmony import */ var _Inputs_PaletteInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Inputs/PaletteInput */ "./src/components/Inputs/PaletteInput.tsx");
/* harmony import */ var _Common_Calendar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Calendar */ "./src/components/Common/Calendar.jsx");






/**
 * PalettesField component
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 */
const PalettesField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(29);
  let className;
  let context;
  let fieldState;
  let help;
  let label;
  let props;
  let setting;
  if ($[0] !== t0) {
    ({
      setting,
      fieldState,
      label,
      help,
      context,
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = context;
    $[3] = fieldState;
    $[4] = help;
    $[5] = label;
    $[6] = props;
    $[7] = setting;
  } else {
    className = $[1];
    context = $[2];
    fieldState = $[3];
    help = $[4];
    label = $[5];
    props = $[6];
    setting = $[7];
  }
  const inputId = setting.id;
  const [showPreview, setShowPreview] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const previewRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  let t1;
  let t2;
  if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = () => {
      const handleClickOutside = event => {
        if (previewRef.current && !previewRef.current.contains(event.target)) {
          setShowPreview && setShowPreview(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    };
    t2 = [setShowPreview];
    $[8] = t1;
    $[9] = t2;
  } else {
    t1 = $[8];
    t2 = $[9];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(t1, t2);
  const t3 = fieldState?.error?.message;
  const t4 = className + " relative";
  const t5 = props.required;
  let t6;
  if ($[10] !== props.onChange || $[11] !== props.value || $[12] !== setting.options) {
    let t7;
    if ($[14] !== props.onChange || $[15] !== props.value) {
      t7 = (option, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Inputs_PaletteInput__WEBPACK_IMPORTED_MODULE_3__["default"], {
        key: index,
        id: option.id,
        label: option.label,
        colors: option.colors,
        onChange: props?.onChange,
        value: props?.value,
        setShowPreview: setShowPreview
      });
      $[14] = props.onChange;
      $[15] = props.value;
      $[16] = t7;
    } else {
      t7 = $[16];
    }
    t6 = setting.options.map(t7);
    $[10] = props.onChange;
    $[11] = props.value;
    $[12] = setting.options;
    $[13] = t6;
  } else {
    t6 = $[13];
  }
  let t7;
  if ($[17] !== showPreview) {
    t7 = showPreview && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      ref: previewRef,
      style: {
        right: "-200px"
      },
      className: "absolute top-0"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Common_Calendar__WEBPACK_IMPORTED_MODULE_4__["default"], null));
    $[17] = showPreview;
    $[18] = t7;
  } else {
    t7 = $[18];
  }
  let t8;
  if ($[19] !== context || $[20] !== help || $[21] !== inputId || $[22] !== label || $[23] !== props.required || $[24] !== t3 || $[25] !== t4 || $[26] !== t6 || $[27] !== t7) {
    t8 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
      label: label,
      help: help,
      error: t3,
      context: context,
      className: t4,
      inputId: inputId,
      required: t5
    }, t6, t7);
    $[19] = context;
    $[20] = help;
    $[21] = inputId;
    $[22] = label;
    $[23] = props.required;
    $[24] = t3;
    $[25] = t4;
    $[26] = t6;
    $[27] = t7;
    $[28] = t8;
  } else {
    t8 = $[28];
  }
  return t8;
});
PalettesField.displayName = "PalettesField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PalettesField);

/***/ }),

/***/ "./src/components/Fields/Partials/ThemeConfigGroup.jsx":
/*!*************************************************************!*\
  !*** ./src/components/Fields/Partials/ThemeConfigGroup.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemeConfigGroupItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemeConfigGroupItem */ "./src/components/Fields/Partials/ThemeConfigGroupItem.jsx");



const ThemeConfigGroup = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(14);
  const {
    control,
    parentSetting,
    selectedTheme
  } = t0;
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = {
      "checkbox": 10,
      "select": 9,
      "color": 8
    };
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  const configTypePriority = t1;
  let t2;
  let t3;
  if ($[1] !== control || $[2] !== parentSetting?.translations || $[3] !== selectedTheme?.config) {
    let t4;
    if ($[6] !== parentSetting?.translations) {
      t4 = (groups, t5) => {
        const [, originalConfig] = t5;
        if (originalConfig.is_visible == false || originalConfig.widget_support == false) {
          return groups;
        }
        const config = {
          ...originalConfig
        };
        let configType = config.config_type;
        if (configType.includes("color")) {
          configType = "color";
        }
        if (!groups[configType]) {
          groups[configType] = [];
        }
        if (configType === "select") {
          config.values = Object.entries(config.values).map(t6 => {
            const [key, value] = t6;
            return {
              key,
              value,
              label: String(parentSetting?.translations?.[value] ?? value)
            };
          });
        }
        if (!config.config_title) {
          config.config_title = parentSetting?.translations[config.config_key] ?? config.config_key;
        } else {
          config.config_title = parentSetting?.translations[config.config_title] ?? config.config_title;
        }
        groups[configType].push(config);
        return groups;
      };
      $[6] = parentSetting?.translations;
      $[7] = t4;
    } else {
      t4 = $[7];
    }
    const groupedSettings = Object.entries(selectedTheme?.config).reduce(t4, {});
    let t5;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
      t5 = (t6, t7) => {
        const [a] = t6;
        const [b] = t7;
        return (configTypePriority[b] ?? 0) - (configTypePriority[a] ?? 0);
      };
      $[8] = t5;
    } else {
      t5 = $[8];
    }
    const sortedGroupSettings = Object.entries(groupedSettings).sort(t5);
    t2 = "theme-config";
    let t6;
    if ($[9] !== control) {
      t6 = t7 => {
        const [configType_0, configs] = t7;
        return /*#__PURE__*/React.createElement("div", {
          key: configType_0,
          className: `theme-config-group theme-config-group-${configType_0}`
        }, configs.map(config_0 => /*#__PURE__*/React.createElement(_ThemeConfigGroupItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
          key: config_0.config_key,
          control: control,
          item: config_0
        })));
      };
      $[9] = control;
      $[10] = t6;
    } else {
      t6 = $[10];
    }
    t3 = sortedGroupSettings.map(t6);
    $[1] = control;
    $[2] = parentSetting?.translations;
    $[3] = selectedTheme?.config;
    $[4] = t2;
    $[5] = t3;
  } else {
    t2 = $[4];
    t3 = $[5];
  }
  let t4;
  if ($[11] !== t2 || $[12] !== t3) {
    t4 = /*#__PURE__*/React.createElement("div", {
      className: t2
    }, t3);
    $[11] = t2;
    $[12] = t3;
    $[13] = t4;
  } else {
    t4 = $[13];
  }
  return t4;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeConfigGroup);

/***/ }),

/***/ "./src/components/Fields/Partials/ThemeConfigGroupItem.jsx":
/*!*****************************************************************!*\
  !*** ./src/components/Fields/Partials/ThemeConfigGroupItem.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CheckboxField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CheckboxField */ "./src/components/Fields/CheckboxField.js");
/* harmony import */ var _ColorPickerField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ColorPickerField */ "./src/components/Fields/ColorPickerField.jsx");
/* harmony import */ var _SelectField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SelectField */ "./src/components/Fields/SelectField.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }







/**
 * ThemeConfigGroupItem component
 * @param {object} props - Props passed from parent component
 * @param {object} props.control - Control object from react-hook-form, without it, the field won't work
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly control?: *, readonly item?: *}> & React.RefAttributes<unknown>>}
 */
const ThemeConfigGroupItem = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_4__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(7);
  const {
    control,
    item
  } = t0;
  const t1 = `theme_settings.${item.config_key}`;
  const t2 = item?.value ?? item.default_value;
  let t3;
  if ($[0] !== item) {
    t3 = t4 => {
      const {
        field
      } = t4;
      if (item.is_visible == false || item.widget_support == false) {
        return null;
      }
      if (item.config_type === "checkbox") {
        return /*#__PURE__*/React.createElement(_CheckboxField__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({}, field, {
          setting: item,
          label: item.config_title,
          className: "theme-config-field"
        }));
      }
      if (item.config_type.includes("color")) {
        return /*#__PURE__*/React.createElement(_ColorPickerField__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, field, {
          setting: item,
          label: item.config_title,
          className: "theme-config-field"
        }));
      }
      if (item.config_type === "select") {
        return /*#__PURE__*/React.createElement(_SelectField__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, field, {
          setting: item,
          label: item.config_title,
          options: item.values,
          className: "theme-config-field"
        }));
      }
      return null;
    };
    $[0] = item;
    $[1] = t3;
  } else {
    t3 = $[1];
  }
  let t4;
  if ($[2] !== control || $[3] !== t1 || $[4] !== t2 || $[5] !== t3) {
    t4 = /*#__PURE__*/React.createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      control: control,
      name: t1,
      defaultValue: t2,
      render: t3
    });
    $[2] = control;
    $[3] = t1;
    $[4] = t2;
    $[5] = t3;
    $[6] = t4;
  } else {
    t4 = $[6];
  }
  return t4;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeConfigGroupItem);

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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.tsx");
/* harmony import */ var _Inputs_SelectInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Inputs/SelectInput */ "./src/components/Inputs/SelectInput.tsx");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }





/**
 * SelectField component
 * @param {object} field - Provided by react-hook-form's Controller
 * @param {object} fieldState - Contains validation state
 * @param {string} label
 * @param {string} help
 * @param {string} context
 * @param {string} className
 * @param {object} options
 * @return {JSX.Element}
 */
const SelectField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(26);
  let className;
  let context;
  let field;
  let fieldState;
  let help;
  let label;
  let options;
  let props;
  let setting;
  if ($[0] !== t0) {
    ({
      setting,
      field,
      fieldState,
      label,
      help,
      context,
      className,
      options,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = context;
    $[3] = field;
    $[4] = fieldState;
    $[5] = help;
    $[6] = label;
    $[7] = options;
    $[8] = props;
    $[9] = setting;
  } else {
    className = $[1];
    context = $[2];
    field = $[3];
    fieldState = $[4];
    help = $[5];
    label = $[6];
    options = $[7];
    props = $[8];
    setting = $[9];
  }
  const inputId = setting.id;
  const t1 = fieldState?.error?.message;
  const t2 = !!fieldState?.error?.message;
  let t3;
  if ($[10] !== field || $[11] !== inputId || $[12] !== options || $[13] !== props || $[14] !== ref || $[15] !== t2) {
    t3 = /*#__PURE__*/React.createElement(_Inputs_SelectInput__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({
      id: inputId,
      options: options,
      "aria-invalid": t2
    }, field, {
      ref: ref
    }, props));
    $[10] = field;
    $[11] = inputId;
    $[12] = options;
    $[13] = props;
    $[14] = ref;
    $[15] = t2;
    $[16] = t3;
  } else {
    t3 = $[16];
  }
  let t4;
  if ($[17] !== className || $[18] !== context || $[19] !== help || $[20] !== inputId || $[21] !== label || $[22] !== props.required || $[23] !== t1 || $[24] !== t3) {
    t4 = /*#__PURE__*/React.createElement(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
      label: label,
      help: help,
      error: t1,
      context: context,
      className: className,
      inputId: inputId,
      required: props.required
    }, t3);
    $[17] = className;
    $[18] = context;
    $[19] = help;
    $[20] = inputId;
    $[21] = label;
    $[22] = props.required;
    $[23] = t1;
    $[24] = t3;
    $[25] = t4;
  } else {
    t4 = $[25];
  }
  return t4;
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Inputs_TextInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Inputs/TextInput */ "./src/components/Inputs/TextInput.tsx");
/* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.tsx");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }





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
const TextField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(29);
  let className;
  let context;
  let copyField;
  let fieldState;
  let help;
  let label;
  let name;
  let props;
  let required;
  let setting;
  let type;
  if ($[0] !== t0) {
    ({
      setting,
      fieldState,
      name,
      label,
      help,
      context,
      className,
      type,
      copyField,
      required,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = context;
    $[3] = copyField;
    $[4] = fieldState;
    $[5] = help;
    $[6] = label;
    $[7] = name;
    $[8] = props;
    $[9] = required;
    $[10] = setting;
    $[11] = type;
  } else {
    className = $[1];
    context = $[2];
    copyField = $[3];
    fieldState = $[4];
    help = $[5];
    label = $[6];
    name = $[7];
    props = $[8];
    required = $[9];
    setting = $[10];
    type = $[11];
  }
  const inputId = setting.id;
  const t1 = fieldState?.error?.message;
  const t2 = !!fieldState?.error?.message;
  let t3;
  if ($[12] !== copyField || $[13] !== inputId || $[14] !== name || $[15] !== props || $[16] !== ref || $[17] !== t2 || $[18] !== type) {
    t3 = /*#__PURE__*/React.createElement(_Inputs_TextInput__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
      name: name,
      ref: ref,
      id: inputId,
      type: type,
      "aria-invalid": t2,
      clickToSelect: copyField
    }, props));
    $[12] = copyField;
    $[13] = inputId;
    $[14] = name;
    $[15] = props;
    $[16] = ref;
    $[17] = t2;
    $[18] = type;
    $[19] = t3;
  } else {
    t3 = $[19];
  }
  let t4;
  if ($[20] !== className || $[21] !== context || $[22] !== help || $[23] !== inputId || $[24] !== label || $[25] !== required || $[26] !== t1 || $[27] !== t3) {
    t4 = /*#__PURE__*/React.createElement(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: label,
      help: help,
      error: t1,
      context: context,
      className: className,
      inputId: inputId,
      required: required
    }, t3);
    $[20] = className;
    $[21] = context;
    $[22] = help;
    $[23] = inputId;
    $[24] = label;
    $[25] = required;
    $[26] = t1;
    $[27] = t3;
    $[28] = t4;
  } else {
    t4 = $[28];
  }
  return t4;
});
TextField.displayName = "TextField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextField);

/***/ }),

/***/ "./src/components/Fields/ThemeField.jsx":
/*!**********************************************!*\
  !*** ./src/components/Fields/ThemeField.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api/requests/HttpClient */ "./src/api/requests/HttpClient.tsx");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var _SelectField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SelectField */ "./src/components/Fields/SelectField.jsx");
/* harmony import */ var _Partials_ThemeConfigGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Partials/ThemeConfigGroup */ "./src/components/Fields/Partials/ThemeConfigGroup.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }










/**
 * ThemeConfigField component
 * @param {object} props - Props passed from parent component
 * @param {object} props.control - Control object from react-hook-form, without it, the field won't work
 * @return {JSX.Element}
 */
const ThemeField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(33);
  let control;
  let props;
  if ($[0] !== t0) {
    const {
      control: t1,
      reset,
      ...t2
    } = t0;
    control = t1;
    props = t2;
    $[0] = t0;
    $[1] = control;
    $[2] = props;
  } else {
    control = $[1];
    props = $[2];
  }
  const {
    onboardingCompleted
  } = (0,_hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const [selectedTheme, setSelectedTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  let t1;
  if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = new _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_2__["default"]("theme_list");
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  const client = t1;
  let t2;
  let t3;
  if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = ["theme_list"];
    t3 = () => client.get();
    $[4] = t2;
    $[5] = t3;
  } else {
    t2 = $[4];
    t3 = $[5];
  }
  const t4 = !!onboardingCompleted;
  let t5;
  if ($[6] !== t4) {
    t5 = {
      queryKey: t2,
      queryFn: t3,
      staleTime: 3600000,
      retry: 0,
      enabled: t4
    };
    $[6] = t4;
    $[7] = t5;
  } else {
    t5 = $[7];
  }
  const {
    isLoading,
    error,
    data: response
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__.useQuery)(t5);
  let t6;
  if ($[8] !== props?.setting?.default || $[9] !== props?.setting?.value || $[10] !== response || $[11] !== selectedTheme) {
    t6 = () => {
      if (!selectedTheme && response?.data?.length > 0) {
        const defaultTheme = response.data.find(theme => theme.name === (props?.setting?.value ?? props?.setting?.default));
        setSelectedTheme(defaultTheme);
      }
    };
    $[8] = props?.setting?.default;
    $[9] = props?.setting?.value;
    $[10] = response;
    $[11] = selectedTheme;
    $[12] = t6;
  } else {
    t6 = $[12];
  }
  const t7 = props?.setting?.default;
  let t8;
  if ($[13] !== response || $[14] !== t7) {
    t8 = [response, t7];
    $[13] = response;
    $[14] = t7;
    $[15] = t8;
  } else {
    t8 = $[15];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(t6, t8);
  if (error !== null) {
    console.error("Error fetching domain data:", error.message);
  }
  let t9;
  if ($[16] !== response?.data) {
    t9 = response?.data?.map(_temp);
    $[16] = response?.data;
    $[17] = t9;
  } else {
    t9 = $[17];
  }
  const mappedSelectedThemeOptions = t9;
  let t10;
  if ($[18] !== response?.data) {
    t10 = e => {
      const selectedOnChange = response?.data?.find(theme_1 => theme_1.name === e.target.value);
      setSelectedTheme(selectedOnChange);
    };
    $[18] = response?.data;
    $[19] = t10;
  } else {
    t10 = $[19];
  }
  const setSelectedThemeOnChange = t10;
  let t11;
  if ($[20] !== error) {
    t11 = error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "error-message"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)("Error fetching theme settings. Please try again later.", "simplybook"));
    $[20] = error;
    $[21] = t11;
  } else {
    t11 = $[21];
  }
  let t12;
  if ($[22] !== control || $[23] !== error || $[24] !== isLoading || $[25] !== mappedSelectedThemeOptions || $[26] !== props?.setting || $[27] !== selectedTheme || $[28] !== setSelectedThemeOnChange) {
    t12 = !isLoading && !error && selectedTheme && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_8__.Controller, {
      control: control,
      name: props?.setting?.id,
      defaultValue: selectedTheme?.name || "",
      render: t13 => {
        const {
          field
        } = t13;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_SelectField__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({}, field, {
          setting: props?.setting,
          options: mappedSelectedThemeOptions,
          label: props?.setting?.label,
          help: props?.setting?.help,
          required: props?.setting?.required,
          disabled: isLoading,
          className: "w-full",
          onChange: e_0 => {
            field.onChange(e_0);
            setSelectedThemeOnChange(e_0);
          }
        }));
      }
    }), selectedTheme?.config && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Partials_ThemeConfigGroup__WEBPACK_IMPORTED_MODULE_5__["default"], {
      control: control,
      parentSetting: props?.setting,
      selectedTheme: selectedTheme
    }));
    $[22] = control;
    $[23] = error;
    $[24] = isLoading;
    $[25] = mappedSelectedThemeOptions;
    $[26] = props?.setting;
    $[27] = selectedTheme;
    $[28] = setSelectedThemeOnChange;
    $[29] = t12;
  } else {
    t12 = $[29];
  }
  let t13;
  if ($[30] !== t11 || $[31] !== t12) {
    t13 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, t11, t12);
    $[30] = t11;
    $[31] = t12;
    $[32] = t13;
  } else {
    t13 = $[32];
  }
  return t13;
});
ThemeField.displayName = "ThemeField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeField);
function _temp(theme_0) {
  return {
    label: theme_0.title.charAt(0).toUpperCase() + theme_0.title.slice(1),
    value: theme_0.name,
    key: theme_0.id
  };
}

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
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _Fields_TextField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Fields/TextField */ "./src/components/Fields/TextField.jsx");
/* harmony import */ var _Fields_HiddenField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Fields/HiddenField */ "./src/components/Fields/HiddenField.jsx");
/* harmony import */ var _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Fields/CheckboxField */ "./src/components/Fields/CheckboxField.js");
/* harmony import */ var _Fields_SelectField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Fields/SelectField */ "./src/components/Fields/SelectField.jsx");
/* harmony import */ var _Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/ErrorBoundary */ "./src/components/Common/ErrorBoundary.jsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Fields_ColorPickerField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Fields/ColorPickerField */ "./src/components/Fields/ColorPickerField.jsx");
/* harmony import */ var _Fields_ImplementationField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Fields/ImplementationField */ "./src/components/Fields/ImplementationField.js");
/* harmony import */ var _Fields_ListField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Fields/ListField */ "./src/components/Fields/ListField.jsx");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _Fields_PalettesField__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Fields/PalettesField */ "./src/components/Fields/PalettesField.jsx");
/* harmony import */ var _Fields_AuthenticationField__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Fields/AuthenticationField */ "./src/components/Fields/AuthenticationField.jsx");
/* harmony import */ var _Fields_ThemeField__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Fields/ThemeField */ "./src/components/Fields/ThemeField.jsx");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }















const fieldComponents = {
  text: _Fields_TextField__WEBPACK_IMPORTED_MODULE_0__["default"],
  api: _Fields_TextField__WEBPACK_IMPORTED_MODULE_0__["default"],
  hidden: _Fields_HiddenField__WEBPACK_IMPORTED_MODULE_1__["default"],
  checkbox: _Fields_CheckboxField__WEBPACK_IMPORTED_MODULE_2__["default"],
  select: _Fields_SelectField__WEBPACK_IMPORTED_MODULE_3__["default"],
  colorpicker: _Fields_ColorPickerField__WEBPACK_IMPORTED_MODULE_7__["default"],
  implementation: _Fields_ImplementationField__WEBPACK_IMPORTED_MODULE_8__["default"],
  list: _Fields_ListField__WEBPACK_IMPORTED_MODULE_9__["default"],
  palettes: _Fields_PalettesField__WEBPACK_IMPORTED_MODULE_11__["default"],
  authentication: _Fields_AuthenticationField__WEBPACK_IMPORTED_MODULE_12__["default"],
  theme: _Fields_ThemeField__WEBPACK_IMPORTED_MODULE_13__["default"]
};
const FormField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_5__.memo)(({
  setting,
  control,
  reset,
  ...props
}) => {
  if (setting.visible === false) {
    return /*#__PURE__*/React.createElement("input", {
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
    return /*#__PURE__*/React.createElement("div", {
      className: "w-full"
    }, "Unknown field type:", setting.type, ", id:", setting.id);
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
    setValue(setting.id, fieldValue);
    if (setting.mapping) {
      //mapping is an array of id's, [id1, id2, id3]
      //loop through the mapping array, and for each id, update it with the same value
      setting.mapping.forEach(id => {
        setValue(id, fieldValue);
      });
    }
  };
  let defaultValue = setting.value || setting.default;
  if (setting.type === "checkbox") {
    defaultValue = defaultValue === "1" || defaultValue === true || defaultValue === 1;
  }

  /**
   * If the field is a self-controlled field, we don't need to use the
   * Controller from react-hook-form. This is used for fields that are
   * controlled by the field itself, like the theme field.
   */
  if (setting?.control === 'self') {
    return /*#__PURE__*/React.createElement(_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/React.createElement(FieldComponent, _extends({
      className: setting.inline_group ? "inline-flex" : "",
      setting: setting,
      required: setting.required,
      label: setting.label,
      disabled: props.settingsIsUpdating || setting.disabled,
      context: setting.context,
      help: setting.help,
      options: setting.options,
      control: control,
      reset: reset
    }, props, fieldComponents[setting.type])));
  }
  return /*#__PURE__*/React.createElement(_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/React.createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_14__.Controller, {
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
      return /*#__PURE__*/React.createElement(FieldComponent, _extends({
        className: setting.inline_group ? "inline-flex" : "",
        setting: setting,
        fieldState: fieldState,
        required: setting.required,
        label: setting.label,
        copyField: setting.copy_field,
        disabled: props.settingsIsUpdating || setting.disabled,
        context: setting.context,
        help: setting.help,
        options: setting.options
      }, props, field));
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FormField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormField */ "./src/components/Forms/FormField.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");





/**
 * The form field wrapper component is created to allow some fields to be grouped, and to be displayed in a row.
 * @param fields
 * @param control
 * @param getValues
 * @returns {Element}
 * @constructor
 */
const FormFieldWrapper = t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(9);
  const {
    fields,
    control,
    reset
  } = t0;
  let t1;
  if ($[0] !== control || $[1] !== fields || $[2] !== reset) {
    let t2;
    if ($[4] !== control || $[5] !== reset) {
      t2 = field => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_FormField__WEBPACK_IMPORTED_MODULE_2__["default"], {
        className: field?.style == "inline" ? "form-field-inline" : "w-full",
        setting: field,
        key: field.id,
        control: control,
        reset: reset
      });
      $[4] = control;
      $[5] = reset;
      $[6] = t2;
    } else {
      t2 = $[6];
    }
    t1 = fields.map(t2);
    $[0] = control;
    $[1] = fields;
    $[2] = reset;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  let t2;
  if ($[7] !== t1) {
    t2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, t1);
    $[7] = t1;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  return t2;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormFieldWrapper);

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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FormScrollProgressLine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormScrollProgressLine */ "./src/components/Forms/FormScrollProgressLine.jsx");
/* harmony import */ var _Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.tsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _Common_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Icon */ "./src/components/Common/Icon.jsx");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _Buttons_ButtonLink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Buttons/ButtonLink */ "./src/components/Buttons/ButtonLink.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);










const FormFooter = t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(31);
  const {
    onSubmit,
    control
  } = t0;
  let t1;
  if ($[0] !== control) {
    t1 = {
      control
    };
    $[0] = control;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const {
    isDirty,
    isSubmitting,
    isValidating,
    isValid
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useFormState)(t1);
  const {
    isSavingSettings
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_5__["default"])();
  let t2;
  if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Saving...", "simplybook");
    $[2] = t2;
  } else {
    t2 = $[2];
  }
  let t3;
  if ($[3] !== isSubmitting) {
    t3 = {
      condition: isSubmitting,
      message: t2,
      color: "blue"
    };
    $[3] = isSubmitting;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  let t4;
  if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
    t4 = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Validating...", "simplybook");
    $[5] = t4;
  } else {
    t4 = $[5];
  }
  let t5;
  if ($[6] !== isValidating) {
    t5 = {
      condition: isValidating,
      message: t4,
      color: "blue"
    };
    $[6] = isValidating;
    $[7] = t5;
  } else {
    t5 = $[7];
  }
  const t6 = !isValid;
  let t7;
  if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
    t7 = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Form contains errors", "simplybook");
    $[8] = t7;
  } else {
    t7 = $[8];
  }
  let t8;
  if ($[9] !== t6) {
    t8 = {
      condition: t6,
      message: t7,
      color: "red"
    };
    $[9] = t6;
    $[10] = t8;
  } else {
    t8 = $[10];
  }
  let t9;
  if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
    t9 = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("You have unsaved changes", "simplybook");
    $[11] = t9;
  } else {
    t9 = $[11];
  }
  let t10;
  if ($[12] !== isDirty) {
    t10 = {
      condition: isDirty,
      message: t9,
      color: "amber"
    };
    $[12] = isDirty;
    $[13] = t10;
  } else {
    t10 = $[13];
  }
  let t11;
  if ($[14] !== t10 || $[15] !== t3 || $[16] !== t5 || $[17] !== t8) {
    t11 = [t3, t5, t8, t10];
    $[14] = t10;
    $[15] = t3;
    $[16] = t5;
    $[17] = t8;
    $[18] = t11;
  } else {
    t11 = $[18];
  }
  const formStates = t11;
  let t12;
  if ($[19] !== formStates) {
    t12 = formStates.find(_temp);
    $[19] = formStates;
    $[20] = t12;
  } else {
    t12 = $[20];
  }
  const currentState = t12;
  let t13;
  if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
    t13 = /*#__PURE__*/React.createElement(_FormScrollProgressLine__WEBPACK_IMPORTED_MODULE_1__["default"], null);
    $[21] = t13;
  } else {
    t13 = $[21];
  }
  let t14;
  if ($[22] !== currentState) {
    t14 = currentState && /*#__PURE__*/React.createElement("p", {
      className: `text-sm text-${currentState.color}-500 flex items-center gap-2`
    }, currentState.message);
    $[22] = currentState;
    $[23] = t14;
  } else {
    t14 = $[23];
  }
  const t15 = !isDirty || isSubmitting || isValidating || isSavingSettings;
  let t16;
  if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
    t16 = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Save", "simplybook");
    $[24] = t16;
  } else {
    t16 = $[24];
  }
  let t17;
  if ($[25] !== onSubmit || $[26] !== t15) {
    t17 = /*#__PURE__*/React.createElement(_Buttons_ButtonLink__WEBPACK_IMPORTED_MODULE_6__["default"], {
      disabled: t15,
      btnVariant: "secondary-small",
      onClick: onSubmit
    }, t16);
    $[25] = onSubmit;
    $[26] = t15;
    $[27] = t17;
  } else {
    t17 = $[27];
  }
  let t18;
  if ($[28] !== t14 || $[29] !== t17) {
    t18 = /*#__PURE__*/React.createElement("div", {
      className: "sticky bottom-0 start-0 z-10 rounded-b-md bg-gray-50 shadow-md"
    }, t13, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row justify-end gap-2 items-center p-5"
    }, t14, t17));
    $[28] = t14;
    $[29] = t17;
    $[30] = t18;
  } else {
    t18 = $[30];
  }
  return t18;
};
FormFooter.displayName = "FormFooter";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormFooter);
function _temp(state) {
  return state.condition;
}

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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const FormScrollProgressLine = () => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(4);
  const [scrollProgress, setScrollProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  let t0;
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = () => {
      const onScroll = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(Math.round(window.scrollY / scrollable * 100));
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    };
    t1 = [];
    $[0] = t0;
    $[1] = t1;
  } else {
    t0 = $[0];
    t1 = $[1];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(t0, t1);
  const canScroll = document.documentElement.scrollHeight > window.innerHeight;
  if (!canScroll) {
    return null;
  }
  const t2 = `${Math.max(scrollProgress, 10)}%`;
  let t3;
  if ($[2] !== t2) {
    t3 = /*#__PURE__*/React.createElement("div", {
      className: "h-1 w-full bg-gray-200"
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-full bg-blue-500",
      style: {
        width: t2
      }
    }));
    $[2] = t2;
    $[3] = t3;
  } else {
    t3 = $[3];
  }
  return t3;
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Blocks_Block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Blocks/Block */ "./src/components/Blocks/Block.tsx");
/* harmony import */ var _Blocks_BlockHeading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Blocks/BlockHeading */ "./src/components/Blocks/BlockHeading.jsx");
/* harmony import */ var _Blocks_BlockContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Blocks/BlockContent */ "./src/components/Blocks/BlockContent.jsx");
/* harmony import */ var _Forms_FormFieldWrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Forms/FormFieldWrapper */ "./src/components/Forms/FormFieldWrapper.jsx");
/* harmony import */ var _Blocks_BlockFooter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Blocks/BlockFooter */ "./src/components/Blocks/BlockFooter.jsx");
/* harmony import */ var _Inputs_PreviewButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Inputs/PreviewButton */ "./src/components/Inputs/PreviewButton.tsx");








const SettingsGroupBlock = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(17);
  const {
    group,
    currentGroupFields,
    control,
    isLastGroup,
    formHasSettings,
    getValues,
    reset
  } = t0;
  const className = isLastGroup && formHasSettings ? "rounded-b-none" : "mb-5";
  const t1 = group?.help ?? "";
  let t2;
  if ($[0] !== group.title || $[1] !== t1) {
    t2 = /*#__PURE__*/React.createElement(_Blocks_BlockHeading__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: group.title,
      help: t1
    });
    $[0] = group.title;
    $[1] = t1;
    $[2] = t2;
  } else {
    t2 = $[2];
  }
  let t3;
  if ($[3] !== control || $[4] !== currentGroupFields || $[5] !== getValues || $[6] !== reset) {
    t3 = /*#__PURE__*/React.createElement(_Blocks_BlockContent__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "px-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap justify-between gap-4"
    }, /*#__PURE__*/React.createElement(_Forms_FormFieldWrapper__WEBPACK_IMPORTED_MODULE_5__["default"], {
      fields: currentGroupFields,
      control: control,
      getValues: getValues,
      reset: reset
    })));
    $[3] = control;
    $[4] = currentGroupFields;
    $[5] = getValues;
    $[6] = reset;
    $[7] = t3;
  } else {
    t3 = $[7];
  }
  let t4;
  if ($[8] !== getValues || $[9] !== group.has_preview) {
    t4 = group.has_preview && /*#__PURE__*/React.createElement(_Blocks_BlockFooter__WEBPACK_IMPORTED_MODULE_6__["default"], {
      className: "rounded-xl bg-gray-50"
    }, /*#__PURE__*/React.createElement(_Inputs_PreviewButton__WEBPACK_IMPORTED_MODULE_7__["default"], {
      btnVariant: "tertiary",
      getValues: getValues
    }));
    $[8] = getValues;
    $[9] = group.has_preview;
    $[10] = t4;
  } else {
    t4 = $[10];
  }
  let t5;
  if ($[11] !== className || $[12] !== group.id || $[13] !== t2 || $[14] !== t3 || $[15] !== t4) {
    t5 = /*#__PURE__*/React.createElement(_Blocks_Block__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: group.id,
      className: className
    }, t2, t3, t4);
    $[11] = className;
    $[12] = group.id;
    $[13] = t2;
    $[14] = t3;
    $[15] = t4;
    $[16] = t5;
  } else {
    t5 = $[16];
  }
  return t5;
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useMutation.js");
/* harmony import */ var _api_endpoints_onBoarding_registerEmail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerEmail */ "./src/api/endpoints/onBoarding/registerEmail.js");
/* harmony import */ var _api_endpoints_onBoarding_registerCompany__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/endpoints/onBoarding/registerCompany */ "./src/api/endpoints/onBoarding/registerCompany.js");
/* harmony import */ var _api_endpoints_onBoarding_confirmEmail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api/endpoints/onBoarding/confirmEmail */ "./src/api/endpoints/onBoarding/confirmEmail.js");
/* harmony import */ var _useSettingsData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _api_endpoints_onBoarding_generatePages__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../api/endpoints/onBoarding/generatePages */ "./src/api/endpoints/onBoarding/generatePages.js");
/* harmony import */ var _api_endpoints_onBoarding_isPageTitleAvailable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../api/endpoints/onBoarding/isPageTitleAvailable */ "./src/api/endpoints/onBoarding/isPageTitleAvailable.js");
/* harmony import */ var _api_endpoints_onBoarding_finishOnboarding__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../api/endpoints/onBoarding/finishOnboarding */ "./src/api/endpoints/onBoarding/finishOnboarding.js");
/* harmony import */ var _api_endpoints_onBoarding_saveWidgetStyle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../api/endpoints/onBoarding/saveWidgetStyle */ "./src/api/endpoints/onBoarding/saveWidgetStyle.js");

 // You can use lodash's debounce function











const useOnboardingData = () => {
  const {
    getValue
  } = (0,_useSettingsData__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const [calendarPageNameAvailable, setCalendarPageNameAvailable] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [bookingPageNameAvailable, setBookingPageNameAvailable] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // Fallback countries
  let mappedCountries = {
    NL: "Netherlands",
    DE: "Germany",
    AT: "Austria",
    BE: "Belgium"
  };
  if (simplybook?.simplybook_countries) {
    mappedCountries = Object.entries(simplybook.simplybook_countries).reduce((acc, [code, name]) => {
      acc[code] = name;
      return acc;
    }, {});
  }
  const steps = [{
    id: 1,
    path: "/onboarding/create-your-account",
    fields: [{
      id: "email",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Email address", "simplybook"),
      required: true,
      validation: {
        regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please enter a valid email address", "simplybook")
      }
    }, {
      required: true,
      id: "terms-and-conditions",
      type: "checkbox",
      label: sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("I agree to the %sterms and conditions%s", "simplybook"), '<a href="https://simplybook.me/terms-and-conditions" target="_blank">', "</a>")
    }],
    beforeSubmit: async data => {
      let response = await (0,_api_endpoints_onBoarding_registerEmail__WEBPACK_IMPORTED_MODULE_3__["default"])({
        data
      });
      if (response.status !== "success") {
        setApiError(response.message);
        return false;
      }
      return true;
    }
  }, {
    id: 2,
    path: "/onboarding/information-check",
    fields: [{
      id: "company_name",
      type: "text",
      label: "Company name",
      required: true
    }, {
      id: "category",
      type: "select",
      style: "inline",
      required: true,
      inline_group: true,
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
      style: "inline",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("What service do you provide?", "simplybook"),
      required: true
    }, {
      id: "phone",
      type: "text",
      style: "inline",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Phone", "simplybook"),
      validation: {
        regex: "^\\+?[0-9\\s\\-().]+$",
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please enter a valid phone number", "simplybook")
      },
      required: true
    }, {
      id: "address",
      type: "text",
      style: "inline",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Address", "simplybook"),
      required: true
    }, {
      id: "zip",
      type: "text",
      style: "inline",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Postal Code", "simplybook"),
      required: true
    }, {
      id: "city",
      type: "text",
      style: "inline",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("City", "simplybook"),
      required: true
    }, {
      id: "country",
      type: "select",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Country", "simplybook"),
      options: mappedCountries,
      required: true
    }],
    beforeSubmit: async data_0 => {
      console.log("submit information check step");
      console.log(data_0);
      let response_0 = await (0,_api_endpoints_onBoarding_registerCompany__WEBPACK_IMPORTED_MODULE_4__["default"])({
        data: data_0
      });
      console.log("registercompany response ", response_0);
      if (response_0.status !== "success") {
        console.log("setting api error to ", response_0.message);
        setApiError(response_0.message);
        return false;
      }
      setApiError("");
    }
  }, {
    id: 3,
    path: "/onboarding/confirm-email",
    fields: [{
      id: "confirmation-code",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Confirmation Code", "simplybook"),
      required: true
    }],
    beforeSubmit: async data_1 => {
      let response_1 = await (0,_api_endpoints_onBoarding_confirmEmail__WEBPACK_IMPORTED_MODULE_5__["default"])({
        data: data_1
      });
      if (response_1.status !== "success") {
        setApiError(response_1.message);
        return false;
      }
      setApiError("");
      return true;
    }
  }, {
    id: 4,
    path: "/onboarding/style-widget",
    beforeSubmit: async data_2 => {
      await (0,_api_endpoints_onBoarding_saveWidgetStyle__WEBPACK_IMPORTED_MODULE_10__["default"])({
        primary_color: data_2.primary_color,
        secondary_color: data_2.secondary_color,
        active_color: data_2.active_color
      });
      return true;
    },
    fields: [] // On purpose. All fields are in style-widget.lazy.jsx
  }, {
    id: 5,
    path: "/onboarding/implementation",
    fields: [{
      id: "implementation",
      type: "implementation",
      label: "",
      default: "generated",
      save_on_change: true,
      options: [{
        value: "generated",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Simple", "simplybook"),
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Generate pages", "simplybook")
      }, {
        value: "manual",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Shortcode", "simplybook"),
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Do it yourself", "simplybook")
      }]
    }],
    beforeSubmit: async data_3 => {
      if (getValue("implementation") === "generated") {
        const data_4 = {
          bookingPageUrl: bookingPageUrl,
          calendarPageUrl: calendarPageUrl
        };
        let pagesResponse = await (0,_api_endpoints_onBoarding_generatePages__WEBPACK_IMPORTED_MODULE_7__["default"])({
          data: data_4
        });
        if (pagesResponse.status !== "success") {
          setApiError(pagesResponse.message);
          return false;
        }
        return true;
      }
      if (getValue("implementation") === "manual") {
        let finishResponse = await (0,_api_endpoints_onBoarding_finishOnboarding__WEBPACK_IMPORTED_MODULE_9__["default"])({
          data: data_3
        });
        if (finishResponse.status !== "success") {
          setApiError(finishResponse.message);
          return false;
        }
        return true;
      }
      return false;
    }
  }];
  const [bookingPageUrl, setBookingPageUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(simplybook.site_url + "/" + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("my-booking", "simplybook"));
  const [calendarPageUrl, setCalendarPageUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(simplybook.site_url + "/" + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("calendar", "simplybook"));
  const [apiError, setApiError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__.useQueryClient)();
  const {
    settings
  } = (0,_useSettingsData__WEBPACK_IMPORTED_MODULE_6__["default"])();

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
  const debouncedSetBookingPageName = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(async pageName => setBookingPageNameAvailable(await checkPageTitleAvailability(pageName)), 500),
  // 500ms delay
  []);
  const debouncedSetCalendarPageName = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(async pageName_0 => setCalendarPageNameAvailable(await checkPageTitleAvailability(pageName_0)), 500),
  // 500ms delay
  []);
  const checkPageTitleAvailability = async pageName_1 => {
    const response_2 = await (0,_api_endpoints_onBoarding_isPageTitleAvailable__WEBPACK_IMPORTED_MODULE_8__["default"])({
      data: {
        url: pageName_1
      }
    });
    return response_2.status === "success";
  };
  const handleBookingPageNameChange = pageName_2 => {
    setBookingPageUrl(pageName_2);
    debouncedSetBookingPageName(pageName_2);
  };
  const handleCalendarPageNameChange = pageName_3 => {
    setCalendarPageUrl(pageName_3);
    debouncedSetCalendarPageName(pageName_3);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const checkAvailability = async () => {
      if (simplybook.is_onboarding_completed) return;
      setCalendarPageNameAvailable(await checkPageTitleAvailability(calendarPageUrl));
      setBookingPageNameAvailable(await checkPageTitleAvailability(bookingPageUrl));
    };
    checkAvailability();
  }, []);
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_12__.useQuery)({
    queryKey: ["onboarding_data"],
    initialData: {
      ...initialData,
      ...prefilledData,
      onboardingCompleted: simplybook.is_onboarding_completed,
      // Include onboardingCompleted
      calendarPageNameAvailable: calendarPageNameAvailable,
      bookingPageNameAvailable: bookingPageNameAvailable
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Mutation for updating data
  const {
    mutate: updateData
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_13__.useMutation)({
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
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_13__.useMutation)({
    mutationFn: async completed => {
      queryClient.setQueryData(["onboarding_data"], oldData_0 => ({
        ...oldData_0,
        onboardingCompleted: completed
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["onboarding_data"]);
    }
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setApiError('');
  }, [getValue('implementation')]);
  return {
    steps,
    data: query.data,
    defaultData: initialData,
    updateData,
    getCurrentStepId: path => steps.find(step_0 => step_0.path === path)?.id,
    getCurrentStep: path_0 => steps.find(step_1 => step_1.path === path_0),
    getURLForStep: step_2 => steps[step_2 - 1]?.path,
    isLastStep: path_1 => steps.length === steps.find(step_3 => step_3.path === path_1)?.id,
    recaptchaToken: query.data?.recaptchaToken || "",
    setRecaptchaToken: token => updateData({
      recaptchaToken: token
    }),
    onboardingCompleted: query.data?.onboardingCompleted || false,
    // Use query data
    setOnboardingCompleted: value => updateOnboardingCompleted(value),
    // Use mutation
    setBookingPageName: pageName_4 => handleBookingPageNameChange(pageName_4),
    setCalendarPageName: pageName_5 => handleCalendarPageNameChange(pageName_5),
    bookingPageName: bookingPageUrl,
    calendarPageName: calendarPageUrl,
    calendarPageNameAvailable: calendarPageNameAvailable,
    bookingPageNameAvailable: bookingPageNameAvailable,
    apiError,
    setApiError
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useOnboardingData);

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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useMutation.js");
/* harmony import */ var _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/requests/HttpClient */ "./src/api/requests/HttpClient.tsx");




/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useSettingsData = () => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(21);
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = new _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_1__["default"]();
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const client = t0;
  let t1;
  let t2;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = ["setting_fields"];
    t2 = () => client.setRoute("settings/get").setPayload({
      withValues: true
    }).post();
    $[1] = t1;
    $[2] = t2;
  } else {
    t1 = $[1];
    t2 = $[2];
  }
  let t3;
  if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
    t3 = {
      queryKey: t1,
      queryFn: t2,
      staleTime: 300000,
      initialData: {
        data: window.simplybook?.settings_fields
      },
      retry: 0,
      select: _temp
    };
    $[3] = t3;
  } else {
    t3 = $[3];
  }
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useQuery)(t3);
  let t4;
  if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
    t4 = async data_0 => {
      const settings = await client.setRoute("settings/save").setPayload(data_0).post();
      return settings?.data;
    };
    $[4] = t4;
  } else {
    t4 = $[4];
  }
  let t5;
  if ($[5] !== queryClient) {
    t5 = {
      mutationFn: t4,
      onSuccess: data_1 => {
        queryClient.setQueryData(["setting_fields"], oldResponse => data_1 ? [...data_1] : []);
        queryClient.invalidateQueries({
          queryKey: ["setting_fields"]
        });
      }
    };
    $[5] = queryClient;
    $[6] = t5;
  } else {
    t5 = $[6];
  }
  const {
    mutateAsync: saveSettings
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.useMutation)(t5);
  let t6;
  if ($[7] !== query?.data) {
    t6 = id => query?.data.find(field => field.id === id)?.value;
    $[7] = query?.data;
    $[8] = t6;
  } else {
    t6 = $[8];
  }
  const getValue = t6;
  let t7;
  if ($[9] !== query?.data || $[10] !== saveSettings) {
    t7 = (id_0, value) => {
      const newSettings = query?.data?.map(field_0 => field_0.id === id_0 ? {
        ...field_0,
        value
      } : field_0);
      if (newSettings) {
        saveSettings(newSettings);
      }
    };
    $[9] = query?.data;
    $[10] = saveSettings;
    $[11] = t7;
  } else {
    t7 = $[11];
  }
  const setValue = t7;
  const t8 = query?.data;
  const t9 = query?.isLoading;
  let t10;
  if ($[12] !== queryClient) {
    t10 = () => queryClient.invalidateQueries({
      queryKey: ["setting_fields"]
    });
    $[12] = queryClient;
    $[13] = t10;
  } else {
    t10 = $[13];
  }
  let t11;
  if ($[14] !== getValue || $[15] !== saveSettings || $[16] !== setValue || $[17] !== t10 || $[18] !== t8 || $[19] !== t9) {
    t11 = {
      settings: t8,
      saveSettings,
      getValue,
      setValue,
      isSavingSettings: t9,
      invalidateSettings: t10
    };
    $[14] = getValue;
    $[15] = saveSettings;
    $[16] = setValue;
    $[17] = t10;
    $[18] = t8;
    $[19] = t9;
    $[20] = t11;
  } else {
    t11 = $[20];
  }
  return t11;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSettingsData);
function _temp(data) {
  return data?.data ?? data;
}

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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _routes_settings_$settingsId_lazy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../routes/settings/$settingsId.lazy */ "./src/routes/settings/$settingsId.lazy.jsx");




const useSettingsMenu = () => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(10);
  const {
    settingsId
  } = _routes_settings_$settingsId_lazy__WEBPACK_IMPORTED_MODULE_2__.Route.useParams();
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = ["settings_menu"];
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  let t1;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = {
      queryKey: t0,
      queryFn: _temp2,
      initialData: window.simplybook && window.simplybook.settings_menu,
      staleTime: 300000
    };
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useQuery)(t1);
  let t2;
  if ($[2] !== query.data || $[3] !== settingsId) {
    t2 = query.data.find(section => section.id === settingsId) || {};
    $[2] = query.data;
    $[3] = settingsId;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  const currentForm = t2;
  let t3;
  if ($[5] !== currentForm || $[6] !== query.data || $[7] !== query.isError || $[8] !== query.isLoading) {
    t3 = {
      menu: query.data,
      currentForm,
      menuIsLoading: query.isLoading,
      menuIsError: query.isError
    };
    $[5] = currentForm;
    $[6] = query.data;
    $[7] = query.isError;
    $[8] = query.isLoading;
    $[9] = t3;
  } else {
    t3 = $[9];
  }
  return t3;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSettingsMenu);
function _temp(resolve, reject) {
  if (window.simplybook && window.simplybook.settings_menu) {
    resolve(window.simplybook.settings_menu);
  }
  reject(new Error("Settings menu not found"));
}
function _temp2() {
  return new Promise(_temp);
}

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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _api_requests_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/requests/request */ "./src/api/requests/request.js");
/* harmony import */ var _useOnboardingData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);





const useWaitForRegistrationCallback = () => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(20);
  const {
    onboardingCompleted,
    setOnboardingCompleted
  } = (0,_useOnboardingData__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const [pollingEnabled, setPollingEnabled] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(!onboardingCompleted);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = {
      status: "waiting"
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const [queryData, setQueryData] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(t0);
  const [count, setCount] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(0);
  const [pollingSuccess, setPollingSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  let t1;
  let t2;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = ["registration_callback_status"];
    t2 = {
      status: "waiting"
    };
    $[1] = t1;
    $[2] = t2;
  } else {
    t1 = $[1];
    t2 = $[2];
  }
  let t3;
  if ($[3] !== count || $[4] !== pollingEnabled || $[5] !== queryData || $[6] !== setOnboardingCompleted) {
    t3 = async () => {
      if (!pollingEnabled) {
        console.log("Polling disabled");
        return queryData;
      }
      setCount(count + 1);
      const res = await (0,_api_requests_request__WEBPACK_IMPORTED_MODULE_1__["default"])("check_registration_callback_status", "POST", {
        data: {
          status: "waiting"
        }
      });
      setQueryData(res.data);
      if (res.data.status === "completed") {
        setPollingEnabled(false);
        setPollingSuccess(true);
        setOnboardingCompleted(true);
      }
      if (count > 100) {
        setPollingEnabled(false);
      }
      return res.data;
    };
    $[3] = count;
    $[4] = pollingEnabled;
    $[5] = queryData;
    $[6] = setOnboardingCompleted;
    $[7] = t3;
  } else {
    t3 = $[7];
  }
  const t4 = !!pollingEnabled;
  let t5;
  if ($[8] !== pollingEnabled) {
    t5 = queryData_0 => pollingEnabled ? 3000 : false;
    $[8] = pollingEnabled;
    $[9] = t5;
  } else {
    t5 = $[9];
  }
  let t6;
  if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
    t6 = error => {
      setPollingEnabled(false);
    };
    $[10] = t6;
  } else {
    t6 = $[10];
  }
  let t7;
  if ($[11] !== t3 || $[12] !== t4 || $[13] !== t5) {
    t7 = {
      queryKey: t1,
      initialData: t2,
      queryFn: t3,
      enabled: t4,
      refetchInterval: t5,
      onError: t6
    };
    $[11] = t3;
    $[12] = t4;
    $[13] = t5;
    $[14] = t7;
  } else {
    t7 = $[14];
  }
  const {
    isFetching
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.useQuery)(t7);
  let t8;
  if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
    t8 = () => setPollingEnabled(true);
    $[15] = t8;
  } else {
    t8 = $[15];
  }
  let t9;
  if ($[16] !== isFetching || $[17] !== pollingEnabled || $[18] !== pollingSuccess) {
    t9 = {
      startPolling: t8,
      pollingEnabled,
      isPolling: isFetching,
      pollingSuccess
    };
    $[16] = isFetching;
    $[17] = pollingEnabled;
    $[18] = pollingSuccess;
    $[19] = t9;
  } else {
    t9 = $[19];
  }
  return t9;
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/requests/HttpClient */ "./src/api/requests/HttpClient.tsx");



const useWidgetData = () => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(9);
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = new _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_1__["default"]();
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const client = t0;
  let t1;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = {
      queryKey: ["get_widget"],
      queryFn: () => client.setRoute("get_widget").get(),
      staleTime: 300000,
      retry: 0,
      enabled: false
    };
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const {
    data: response,
    refetch
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useQuery)(t1);
  let t2;
  if ($[2] !== queryClient || $[3] !== refetch) {
    t2 = async () => {
      queryClient.invalidateQueries({
        queryKey: ["get_widget"]
      }).then(function (response_0) {
        return refetch();
      });
    };
    $[2] = queryClient;
    $[3] = refetch;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  const invalidateAndRefetchWidgetScript = t2;
  let t3;
  if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
    t3 = async formData => await client.setRoute("get_preview_widget").setPayload(formData).post();
    $[5] = t3;
  } else {
    t3 = $[5];
  }
  const createPreviewWidget = t3;
  const t4 = response?.data?.widget;
  let t5;
  if ($[6] !== invalidateAndRefetchWidgetScript || $[7] !== t4) {
    t5 = {
      widgetScript: t4,
      invalidateAndRefetchWidgetScript,
      createPreviewWidget
    };
    $[6] = invalidateAndRefetchWidgetScript;
    $[7] = t4;
    $[8] = t5;
  } else {
    t5 = $[8];
  }
  return t5;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useWidgetData);

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
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _hooks_useSettingsMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useSettingsMenu */ "./src/hooks/useSettingsMenu.js");
/* harmony import */ var _components_Forms_FormFooter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Forms/FormFooter */ "./src/components/Forms/FormFooter.jsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Settings_SettingsGroupBlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Settings/SettingsGroupBlock */ "./src/components/Settings/SettingsGroupBlock.jsx");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/useBlocker.js");









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
const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__.createLazyFileRoute)("/settings/$settingsId")({
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
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const {
    currentForm
  } = (0,_hooks_useSettingsMenu__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const currentFormFields = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => settings.filter(setting => setting.menu_id === settingsId), [settings, settingsId]);
  const currentFormValues = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => extractFormValuesPerMenuId(settings, settingsId), [settings, settingsId]);
  const lastGroup = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => currentForm.groups[currentForm.groups.length - 1], [currentForm.groups]);
  const formHasSettings = currentForm.has_settings ?? true;

  // Initialize useForm with default values from the fetched settings data
  const {
    handleSubmit,
    control,
    reset,
    formState: {
      isDirty
    },
    getValues
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_7__.useForm)({
    defaultValues: currentFormValues
  });
  (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_8__.useBlocker)({
    blockerFn: () => window.confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("You have unsaved changes. Are you sure you want to leave?", "simplybook")),
    condition: isDirty
  });
  return /*#__PURE__*/React.createElement("form", null, currentForm.groups?.map(group => {
    const isLastGroup = lastGroup.id === group.id;
    const currentGroupFields = currentFormFields.filter(field => field.group_id === group.id);
    return /*#__PURE__*/React.createElement(_components_Settings_SettingsGroupBlock__WEBPACK_IMPORTED_MODULE_5__["default"], {
      key: group.id,
      group: group,
      currentGroupFields: currentGroupFields,
      control: control,
      isLastGroup: isLastGroup,
      formHasSettings: formHasSettings,
      getValues: getValues,
      reset: reset
    });
  }), formHasSettings && /*#__PURE__*/React.createElement(_components_Forms_FormFooter__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onSubmit: handleSubmit(formData => {
      saveSettings(formData).then(() => {
        reset(formData);
      });
    }),
    control: control
  }));
}

/**
 * Extract form values for the current menu ID from the settings data. For
 * example, if the menu ID is "design", it will extract all settings with
 * menu_id === "design" and adds the key->value to the formValues object.
 */
const extractFormValuesPerMenuId = (settings, menuId) => {
  // Extract default values from settings data where menu_id ===  settingsId
  const formValues = {};
  settings.forEach(setting => {
    if (setting.menu_id === menuId) {
      let defaultValue = setting['default'] ?? '';
      formValues[setting.id] = setting['value'] ?? defaultValue;
    }
  });
  return formValues;
};

/***/ }),

/***/ "./src/api/requests/HttpClient.tsx":
/*!*****************************************!*\
  !*** ./src/api/requests/HttpClient.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/api/config.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
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


/**
 * HttpClient class to handle HTTP requests.
 */
var HttpClient = /** @class */function () {
  /**
   * Constructor to initialize the route URL.
   * @param route - The API route to be used.
   */
  function HttpClient(route) {
    this.route = null;
    this.getMethodHeaders = {
      'X-WP-NONCE': _config__WEBPACK_IMPORTED_MODULE_0__.X_WP_NONCE
    };
    this.postMethodHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-WP-NONCE': _config__WEBPACK_IMPORTED_MODULE_0__.X_WP_NONCE
    };
    this.payload = {
      'nonce': _config__WEBPACK_IMPORTED_MODULE_0__.NONCE
    };
    if (route) {
      this.route = _config__WEBPACK_IMPORTED_MODULE_0__.SB_API_URL + route;
    }
  }
  /**
   * Performs a GET request.
   * @returns The response data in JSON format.
   * @throws An error if the response is not ok or route is not set.
   */
  HttpClient.prototype.get = function () {
    return __awaiter(this, void 0, void 0, function () {
      var response, errorData;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this.route) {
              throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Route is not set', 'simplybook'));
            }
            return [4 /*yield*/, fetch(this.route, {
              method: 'GET',
              headers: this.getMethodHeaders
            })];
          case 1:
            response = _a.sent();
            if (!!response.ok) return [3 /*break*/, 3];
            return [4 /*yield*/, response.json()];
          case 2:
            errorData = _a.sent();
            return [2 /*return*/, this.handleError(errorData)];
          case 3:
            return [2 /*return*/, response.json()];
        }
      });
    });
  };
  /**
   * Performs a POST request.
   * @param body - The body of the POST request.
   * @returns The response data in JSON format.
   * @throws An error if the response is not ok or route is not set.
   */
  HttpClient.prototype.post = function (body) {
    return __awaiter(this, void 0, void 0, function () {
      var payload, response, errorData;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            payload = body !== null && body !== void 0 ? body : this.payload;
            if (!payload) {
              throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Payload is not set', 'simplybook'));
            }
            if (!this.route) {
              throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Route is not set', 'simplybook'));
            }
            return [4 /*yield*/, fetch(this.route, {
              method: 'POST',
              headers: this.postMethodHeaders,
              body: JSON.stringify(__assign(__assign({}, payload), {
                nonce: _config__WEBPACK_IMPORTED_MODULE_0__.NONCE
              }))
            })];
          case 1:
            response = _a.sent();
            if (!!response.ok) return [3 /*break*/, 3];
            return [4 /*yield*/, response.json()];
          case 2:
            errorData = _a.sent();
            return [2 /*return*/, this.handleError(errorData)];
          case 3:
            return [2 /*return*/, response.json()];
        }
      });
    });
  };
  /**
   * Sets the route URL.
   * @param route - The API route to be used.
   * @returns The HttpClient instance.
   */
  HttpClient.prototype.setRoute = function (route) {
    this.route = _config__WEBPACK_IMPORTED_MODULE_0__.SB_API_URL + route;
    return this;
  };
  /**
   * Sets custom headers for GET or POST requests.
   * @param headers - The headers to be set.
   * @param method - The HTTP method ('get' or 'post').
   * @returns The HttpClient instance.
   */
  HttpClient.prototype.setHeaders = function (headers, method) {
    if (method === 'get') {
      this.getMethodHeaders = __assign(__assign({}, this.getMethodHeaders), headers);
      return this;
    }
    if (method === 'post') {
      this.postMethodHeaders = __assign(__assign({}, this.postMethodHeaders), headers);
      return this;
    }
    return this;
  };
  /**
   * Sets additional payload data.
   * @param payload - The payload data to be set.
   * @returns The HttpClient instance.
   */
  HttpClient.prototype.setPayload = function (payload) {
    this.payload = __assign(__assign({}, this.payload), payload);
    return this;
  };
  /**
   * Handles errors from the server response.
   * @param errorData - The error data from the server.
   * @throws An error with a message.
   */
  HttpClient.prototype.handleError = function (errorData) {
    var error = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An error occurred', 'simplybook');
    if (typeof errorData === 'string') {
      error = errorData;
    }
    if (errorData === null || errorData === void 0 ? void 0 : errorData.message) {
      error = errorData.message;
    }
    if (errorData === null || errorData === void 0 ? void 0 : errorData.error) {
      error = errorData.error;
    }
    throw new Error(error);
  };
  return HttpClient;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HttpClient);

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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");



var Block = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(function (_a) {
  var _b = _a.className,
    className = _b === void 0 ? "" : _b,
    children = _a.children;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])("bg-white shadow-md rounded-xl flex flex-col", className),
    children: children
  });
});
Block.displayName = "Block";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);

/***/ }),

/***/ "./src/components/Buttons/ButtonLink.tsx":
/*!***********************************************!*\
  !*** ./src/components/Buttons/ButtonLink.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/link.js");
/* harmony import */ var _Common_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common/Icon */ "./src/components/Common/Icon.jsx");
/* harmony import */ var _hooks_useLoginData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useLoginData */ "./src/hooks/useLoginData.tsx");





var ButtonLink = function (_a) {
  var _b = _a.className,
    className = _b === void 0 ? "" : _b,
    children = _a.children,
    _c = _a.link,
    link = _c === void 0 ? "" : _c,
    _d = _a.linkClassName,
    linkClassName = _d === void 0 ? "" : _d,
    btnVariant = _a.btnVariant,
    _e = _a.disabled,
    disabled = _e === void 0 ? false : _e,
    target = _a.target,
    _f = _a.loginLink,
    loginLink = _f === void 0 ? "" : _f,
    _g = _a.icon,
    icon = _g === void 0 ? false : _g,
    _h = _a.iconName,
    iconName = _h === void 0 ? "" : _h,
    _j = _a.iconSize,
    iconSize = _j === void 0 ? "" : _j,
    _k = _a.iconClass,
    iconClass = _k === void 0 ? "" : _k,
    iconStyle = _a.iconStyle,
    onClick = _a.onClick,
    _l = _a.reverseIcon,
    reverseIcon = _l === void 0 ? false : _l;
  var fetchLinkData = (0,_hooks_useLoginData__WEBPACK_IMPORTED_MODULE_3__["default"])().fetchLinkData;
  var loginTo = function (e, page) {
    e.preventDefault();
    // Start fetch when the link is clicked
    fetchLinkData().then(function (response) {
      var _a;
      var link = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.simplybook_dashboard_url;
      if (!link) {
        console.error("No link found in response");
        return;
      }
      var finalUrl = "".concat(link, "/").concat(page, "/");
      if (link.includes("by-hash")) {
        finalUrl = "".concat(link, "?back_url=/").concat(page, "/");
      }
      window.open(finalUrl, "_blank");
      window.focus();
    }).catch(function (error) {
      console.error("Error fetching login URL:", error);
    });
  };
  var buttonVariants = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(
  // Base styles
  "flex items-center justify-center rounded-full transition-all duration-200 px-3 py-1", {
    'bg-primary text-white hover:bg-primary-dark !p-4 text-base': btnVariant == 'primary',
    'bg-primary text-white hover:bg-primary-dark ': btnVariant == 'primary-small',
    'bg-secondary text-white hover:bg-secondary-dark !p-4 text-base': btnVariant == 'secondary',
    'bg-secondary text-white hover:bg-secondary-dark ': btnVariant == 'secondary-small',
    'bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary !p-4 text-base': btnVariant == 'tertiary',
    'bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary': btnVariant == 'tertiary-small',
    'border-2 border-black bg-transparent !p-4 text-base': btnVariant == 'ghost',
    'border-2 border-black bg-transparent': btnVariant == 'ghost-small',
    'bg-primary text-white rounded-md hover:bg-primary-dark !p-4 text-base': btnVariant == 'square',
    'rounded-md text-white': btnVariant == 'square-small',
    'border-2 border-primary text-primary rounded-md !p-4 text-base': btnVariant == 'square-ghost',
    'border-2 border-primary text-primary rounded-md': btnVariant == 'square-ghost-small',
    // Disabled styles
    'opacity-50 cursor-not-allowed pointer-events-none': disabled,
    'cursor-pointer': !disabled
  });
  var disabledClass = 'opacity-50 cursor-not-allowed';
  if (className.length > 0) {
    buttonVariants = buttonVariants + ' ' + className;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__.Link, {
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(linkClassName, "text-sm font-semibold"),
      to: link,
      onClick: loginLink ? function (e) {
        return loginTo(e, loginLink);
      } : onClick,
      target: target,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(disabled ? disabledClass + buttonVariants : buttonVariants, className),
        children: [iconName && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
          className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(iconClass, {
            'mr-2': !reverseIcon,
            'ml-2': reverseIcon
          }),
          name: iconName,
          size: iconSize,
          style: iconStyle
        }), children]
      })
    })
  });
};
ButtonLink.displayName = "ButtonLink";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonLink);

/***/ }),

/***/ "./src/components/Common/Modal.tsx":
/*!*****************************************!*\
  !*** ./src/components/Common/Modal.tsx ***!
  \*****************************************/
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



var Modal = function (_a) {
  var title = _a.title,
    closeButton = _a.closeButton,
    isOpen = _a.isOpen,
    onClose = _a.onClose,
    children = _a.children;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var handleOutsideClick = function (event) {
      if (event.target.id === "modal-overlay") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
      document.body.classList.add("overflow-hidden");
    } else {
      document.removeEventListener("click", handleOutsideClick);
      document.body.classList.remove("overflow-hidden");
    }
    return function () {
      document.removeEventListener("click", handleOutsideClick);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "fixed inset-0 flex items-center justify-center z-99999",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      id: "modal-overlay",
      className: "modal-background bg-black/50 cursor-pointer inset-0 absolute"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      id: "modal-body",
      className: "bg-white p-6 rounded shadow-lg z-60 cursor-default relative w-[50vw] h-auto overflow-y-scroll",
      children: [title && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        id: "modal-header",
        className: "leading-none",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
          children: title
        })
      }), children, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        id: "modal-footer",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
          className: "bg-secondary text-white rounded px-4 py-2 hover:bg-secondary-dark cursor-pointer",
          onClick: onClose,
          children: closeButton || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Close', 'simplybook')
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

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
/* harmony import */ var _radix_ui_react_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-label */ "./node_modules/@radix-ui/react-label/dist/index.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



var FieldWrapper = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(function (_a) {
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
  var wrapperClasses = ["flex flex-col", className, "mb-4"].filter(Boolean).join(" ");
  var contentClasses = ["flex flex-col w-full", reverseLabel ? "flex-col-reverse" : ""].filter(Boolean).join(" ");
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: wrapperClasses,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: contentClasses,
      children: [type === 'checkbox' && children, label && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_label__WEBPACK_IMPORTED_MODULE_2__.Root, {
        className: "cursor-pointer pb-2 font-medium text-black text-label ",
        htmlFor: inputId,
        children: [label, required]
      }), help && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "pb-1 text-xs font-light text-gray-600",
        children: help
      }), type !== 'checkbox' && children]
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
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");


/**
 * Styled button component
 */
var ButtonInput = function (_a) {
  var _b = _a.className,
    className = _b === void 0 ? "" : _b,
    type = _a.type,
    children = _a.children,
    onClick = _a.onClick,
    _c = _a.btnVariant,
    btnVariant = _c === void 0 ? "primary" : _c,
    _d = _a.disabled,
    disabled = _d === void 0 ? false : _d;
  var buttonVariants = (0,clsx__WEBPACK_IMPORTED_MODULE_1__.clsx)(
  // Base styles
  "flex items-center justify-center rounded-full transition-all duration-200 px-3 py-1", {
    'bg-primary text-white hover:bg-primary-dark !p-4 text-base': btnVariant == 'primary',
    'bg-primary text-white hover:bg-primary-dark ': btnVariant == 'primary-small',
    'bg-secondary text-white hover:bg-secondary-dark !p-4 text-base': btnVariant == 'secondary',
    'bg-secondary text-white hover:bg-secondary-dark ': btnVariant == 'secondary-small',
    'bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary !p-4 text-base': btnVariant == 'tertiary',
    'bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary': btnVariant == 'tertiary-small',
    'border-2 border-black bg-transparent !p-4 text-base': btnVariant == 'ghost',
    'border-2 border-black bg-transparent': btnVariant == 'ghost-small',
    'bg-primary text-white rounded-md hover:bg-primary-dark !p-4 text-base': btnVariant == 'square',
    'rounded-md text-white': btnVariant == 'square-small',
    'border-2 border-primary text-primary rounded-md !p-4 text-base': btnVariant == 'square-ghost',
    'border-2 border-primary text-primary rounded-md': btnVariant == 'square-ghost-small',
    // Disabled styles
    'opacity-50 cursor-not-allowed': disabled,
    'cursor-pointer': !disabled
  });
  //if props.className is not empty, replace className with props.className
  if (className.length > 0) {
    buttonVariants = buttonVariants + ' ' + className;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
    type: type,
    onClick: onClick,
    className: buttonVariants,
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
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.es.mjs");
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
var CheckboxInput = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (_a, ref) {
  var label = _a.label,
    className = _a.className,
    value = _a.value,
    onChange = _a.onChange,
    props = __rest(_a, ["label", "className", "value", "onChange"]);
  // Default is a truthy value. (true, 1, "1", "true")
  // @ts-ignore
  var _b = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(value == true),
    checked = _b[0],
    setChecked = _b[1];
  // @ts-ignore
  var _c = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(value == true ? 1 : 0),
    valueState = _c[0],
    setValueState = _c[1];
  var checkBoxClasses = (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])("w-10 h-6 bg-gray-200  peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-0.5 after:bg-white after:border-gray-200 after:border after:rounded-full after:aspect-square after:h-4 after:w-4 after:transition-all");
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
    className: "relative inline-flex items-center cursor-pointer",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", __assign({
      type: "checkbox",
      checked: checked,
      onChange: function (e) {
        setValueState(e.target.checked ? 1 : 0);
        setChecked(e.target.checked);
        if (onChange) {
          onChange(e);
        }
      },
      className: "sr-only peer",
      value: valueState
    }, props)), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(checkBoxClasses, className)
    }), label && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "ml-2 leading-5 font-medium text-black text-label ".concat(className || ""),
      dangerouslySetInnerHTML: {
        __html: dompurify__WEBPACK_IMPORTED_MODULE_3__["default"].sanitize(label)
      }
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
var ColorPicker = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (_a, ref) {
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
      onChangeComplete: function (color_0) {
        return onChangeComplete === null || onChangeComplete === void 0 ? void 0 : onChangeComplete(color_0.hex);
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
var HiddenInput = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (_a, ref) {
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
        className: "relative flex flex-col items-start justify-start px-4 py-3 rounded-lg border text-center \n            transition duration-300 ease-in-out w-full \n            ".concat(value === option.value ? "bg-primary-lighter border-blue-500 cursor-pointer" : "bg-white hover:bg-primary-lighter border-gray-300 hover:border-blue-500 cursor-pointer"),
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "text-lg font-medium",
          children: option.label
        }), option.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "text-sm text-gray-500 mt-1",
          children: option.description
        })]
      }, option.value);
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImplementationInput);

/***/ }),

/***/ "./src/components/Inputs/PaletteInput.tsx":
/*!************************************************!*\
  !*** ./src/components/Inputs/PaletteInput.tsx ***!
  \************************************************/
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
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _Common_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Icon */ "./src/components/Common/Icon.jsx");





/**
 * Styled button component
 */
var PaletteInput = function (_a) {
  var id = _a.id,
    label = _a.label,
    colors = _a.colors,
    onChange = _a.onChange,
    value = _a.value,
    setShowPreview = _a.setShowPreview;
  var _b = react__WEBPACK_IMPORTED_MODULE_1___default().useState(colors),
    actualColors = _b[0],
    setActualColors = _b[1];
  //
  // @ts-ignore
  var _c = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_3__["default"])(),
    getValue = _c.getValue,
    setValue = _c.setValue,
    settings = _c.settings,
    saveSettings = _c.saveSettings,
    invalidateSettings = _c.invalidateSettings;
  var handleChange = function () {
    console.log(id);
    if (onChange && id) {
      //also update all colors
      if (id !== 'custom' && Array.isArray(colors)) {
        var colorMapping = {
          'sb_base_color': 0,
          'booking_nav_bg_color': 0,
          'btn_color_1': 1,
          'body_bg_color': 2,
          'light_font_color': 3,
          'dark_font_color': 4
        };
        Object.entries(colorMapping).forEach(function (_a) {
          var color = _a[0],
            index = _a[1];
          if (colors && colors.hasOwnProperty(index)) {
            console.log("set color", color, colors[index], "of index", index);
            setValue(color, colors[index]);
          }
        });
      }
      console.log("palettes", id, "value", value);
      setValue("palette", id);
      onChange(id);
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    //when custom, we load the custom colors in this palette.
    if (id === 'custom') {
      var customColors = [];
      customColors.push(getValue('sb_base_color'));
      customColors.push(getValue('btn_color_1'));
      customColors.push(getValue('body_bg_color'));
      customColors.push(getValue('light_font_color'));
      customColors.push(getValue('dark_font_color'));
      setActualColors(customColors);
    }
  }, [settings]);
  console.log("value ", value);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      className: "pb-1 font-medium text-black text-md ",
      children: label
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex space-x-2 pb-4",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "border border-gray-300 p-2 gap-2 flex cursor-pointer",
        onClick: function (e) {
          return handleChange();
        },
        children: actualColors === null || actualColors === void 0 ? void 0 : actualColors.map(function (color, index) {
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            style: {
              backgroundColor: color
            },
            className: "w-20 h-6 border border-gray-300"
          }, index);
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center space-x-2 cursor-pointer",
        onClick: function (e_0) {
          return setShowPreview && setShowPreview(true);
        },
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
          name: "eye"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          children: value === id ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('live', 'simplybook') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('preview', 'simplybook')
        })]
      })]
    })]
  });
};
PaletteInput.displayName = 'PaletteInput';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaletteInput);

/***/ }),

/***/ "./src/components/Inputs/PreviewButton.tsx":
/*!*************************************************!*\
  !*** ./src/components/Inputs/PreviewButton.tsx ***!
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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Modal */ "./src/components/Common/Modal.tsx");
/* harmony import */ var _hooks_useWidgetData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useWidgetData */ "./src/hooks/useWidgetData.js");





var PreviewButtonInput = function (_a) {
  var _b = _a.className,
    className = _b === void 0 ? "" : _b,
    getValues = _a.getValues;
  var _c = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    isModalOpen = _c[0],
    setIsModalOpen = _c[1];
  var createPreviewWidget = (0,_hooks_useWidgetData__WEBPACK_IMPORTED_MODULE_4__["default"])().createPreviewWidget;
  var localClassName = "rounded-full transition-all duration-200 p-4 cursor-pointer bg-secondary text-white" + " hover:bg-secondary-dark";
  if (className.length > 0) {
    localClassName = localClassName + ' ' + className;
  }
  /**
   * Function to handle button click that opens the modal. In our case it also
   * sends the request to create the preview widget.
   */
  var onClick = function () {
    var formData = []; // Empty creates preview based on database
    if (getValues) {
      formData = getValues();
    }
    // Open before sending request to make sure container exists
    setIsModalOpen(true);
    // @ts-ignore
    createPreviewWidget(formData).then(function (response) {
      // Create the script element
      var newScriptElement = document.createElement('script');
      newScriptElement.id = 'simplybook-preview-widget-script';
      newScriptElement.innerHTML = response.data.widget;
      document.head.appendChild(newScriptElement);
      // Dispatch custom element to load the widget
      document.dispatchEvent(new CustomEvent('loadSimplyBookPreviewWidget'));
    });
  };
  /**
   * Function to close the modal
   */
  var closeModal = function () {
    setIsModalOpen(false);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
      type: "button",
      onClick: onClick,
      className: localClassName,
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preview', 'simplybook')
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Common_Modal__WEBPACK_IMPORTED_MODULE_3__["default"], {
      isOpen: isModalOpen,
      onClose: closeModal,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preview', 'simplybook'),
      closeButton: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Close', 'simplybook'),
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        id: "sbw_z0hg2i_calendar",
        className: "h-[70vh] overflow-y-scroll my-4"
      })
    })]
  });
};
PreviewButtonInput.displayName = 'PreviewButtonInput';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PreviewButtonInput);

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
/* harmony import */ var _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-select */ "./node_modules/@radix-ui/react-select/dist/index.mjs");
/* harmony import */ var _Common_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common/Icon */ "./src/components/Common/Icon.jsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
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
var SelectInput = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(function (_a, ref) {
  var name = _a.name,
    value = _a.value,
    onChange = _a.onChange,
    _b = _a.options,
    options = _b === void 0 ? [] : _b,
    props = __rest(_a, ["name", "value", "onChange", "options"]);
  // Normalize options if it's an object
  var normalizedOptions = Array.isArray(options) ? options : Object.keys(options).map(function (index) {
    return {
      key: index,
      value: index,
      label: options[index]
    };
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", __assign({
    className: "input-base",
    name: name,
    value: value,
    onChange: onChange,
    ref: ref
  }, props, {
    children: [!value && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
      value: "",
      disabled: true,
      children: ["- ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Select an option", "simplybook"), " -"]
    }), normalizedOptions.map(function (option) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
        value: option.value,
        children: option.label
      }, option.key ? option.key : option.value);
    })]
  }));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectInput);
/**
 * Styled select item component
 * @param props - Props for the select item component
 * @returns {JSX.Element} The rendered select item component
 */
var SelectItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(function (_a, ref) {
  var children = _a.children,
    className = _a.className,
    props = __rest(_a, ["children", "className"]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Item, __assign({
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
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.ItemText, {
      children: children
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.ItemIndicator, {
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
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
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
var TextInput = function (_a) {
  var name = _a.name,
    placeholder = _a.placeholder,
    type = _a.type,
    className = _a.className,
    _b = _a.clickToSelect,
    clickToSelect = _b === void 0 ? false : _b,
    _c = _a.disabled,
    disabled = _c === void 0 ? false : _c,
    ref = _a.ref,
    props = __rest(_a, ["name", "placeholder", "type", "className", "clickToSelect", "disabled", "ref"]);
  var _d = react__WEBPACK_IMPORTED_MODULE_1___default().useState("Copy"),
    copiedFeedback = _d[0],
    setCopiedFeedback = _d[1];
  var _e = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false),
    copySucces = _e[0],
    setCopySucces = _e[1];
  var copyOnClick = function () {
    var copyButton = document.querySelector(".copy-button");
    var copyInput = document.querySelector('.copy-input');
    if (typeof props.value === 'string') {
      navigator.clipboard.writeText(props.value).then(function () {
        if (!copyButton) {
          throw new Error('Button not found');
        }
        var inputElement = copyInput;
        (function (clipText) {
          return inputElement.value += clipText;
        });
        setCopiedFeedback("Copied!");
        setCopySucces(true);
        setTimeout(function () {
          setCopiedFeedback("Copy");
          setCopySucces(false);
        }, 1000);
      }).catch(function (error) {
        console.error("Error copying text: ", error);
      });
    }
  };
  var copySpanClass = "absolute cursor-pointer right-[0.5rem] top-5.5 transform -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold";
  var textInputClass = "input-base copy-input";
  var disabledClass = 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed';
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "w-full relative",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", __assign({
        name: name,
        placeholder: placeholder,
        ref: ref,
        type: type,
        onClick: clickToSelect ? copyOnClick : undefined,
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(!disabled ? textInputClass + " " + className : textInputClass + " " + disabledClass + " " + className)
      }, props)), clickToSelect && copiedFeedback && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
        onClick: clickToSelect ? copyOnClick : undefined,
        type: "button",
        "aria-label": name,
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(copySucces ? "bg-green-100 text-green-600" : "bg-gray-50 text-gray-600", copySpanClass + ' ' + "copy-button"),
        children: copiedFeedback
      })]
    })
  });
};
TextInput.displayName = "TextInput";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInput);

/***/ }),

/***/ "./src/context/NotificationContext.tsx":
/*!*********************************************!*\
  !*** ./src/context/NotificationContext.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotificationProvider: () => (/* binding */ NotificationProvider),
/* harmony export */   useNotifications: () => (/* binding */ useNotifications)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useNotificationsData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks/useNotificationsData */ "./src/hooks/useNotificationsData.ts");
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};



/**
 * Default values for the notification context. This is used to create a
 * default context value that can be used when the provider is not
 * available. As of writing this can be the case when we are on
 * the Dashboard page.
 */
var NotificationContextStub = {
  activeNotifications: [],
  getNotification: function () {
    return undefined;
  },
  triggerNotification: function () {
    return false;
  },
  triggerNotificationById: function () {
    return false;
  },
  getAllNotifications: function () {
    return false;
  }
};
/**
 * Set up a context for notifications.
 */
var NotificationContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(NotificationContextStub);
/**
 * Custom hook to use the notification context. This hook will throw an error
 * if used outside the NotificationProvider.
 */
var useNotifications = function () {
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(NotificationContext);
};
/**
 * Provider component for the notification context. This component will fetch
 * the notifications data and provide it to the rest of the application. The
 * children can then trigger notifications when needed.
 */
var NotificationProvider = function (_a) {
  var children = _a.children;
  var _b = (0,_hooks_useNotificationsData__WEBPACK_IMPORTED_MODULE_2__["default"])(),
    allNotices = _b.allNotices,
    isLoading = _b.isLoading;
  var _c = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    activeNotifications = _c[0],
    setActiveNotifications = _c[1];
  /**
   * Get specific notice object from the list of all notices by id.
   */
  var getNoticeObject = function (id) {
    return allNotices.find(function (item) {
      return item.id === id;
    });
  };
  /**
   * Trigger a notification by adding its object to the active notifications
   * array.
   */
  var triggerNotification = function (notice) {
    setActiveNotifications(function (prev) {
      if (prev.some(function (n) {
        return n.id === notice.id;
      })) return prev;
      return __spreadArray(__spreadArray([], prev, true), [notice], false);
    });
  };
  /**
   * Trigger a notification by its id. This will first get the notice object
   * by its id and then call the triggerNotification function.
   */
  var triggerNotificationById = function (id) {
    var template = getNoticeObject(id);
    if (!template) {
      return console.warn("Notification \"".concat(id, "\" not found"));
    }
    triggerNotification(template);
  };
  /**
   * Get all notifications. Can be useful during development to see all
   * registered notifications.
   */
  var getAllNotifications = function () {
    return activeNotifications;
  };
  /**
   * Prevent the provider from rendering if the notifications dats is still
   * loading.
   */
  if (isLoading) {
    return;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NotificationContext.Provider, {
    value: {
      activeNotifications: activeNotifications,
      getNotification: getNoticeObject,
      triggerNotification: triggerNotification,
      triggerNotificationById: triggerNotificationById,
      getAllNotifications: getAllNotifications
    },
    children: children
  });
};

/***/ }),

/***/ "./src/hooks/useDomainData.tsx":
/*!*************************************!*\
  !*** ./src/hooks/useDomainData.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _useOnboardingData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/requests/HttpClient */ "./src/api/requests/HttpClient.tsx");



var useDomainData = function () {
  var _a, _b;
  var onboardingCompleted = (0,_useOnboardingData__WEBPACK_IMPORTED_MODULE_0__["default"])().onboardingCompleted;
  var route = 'get_domain';
  var client = new _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_1__["default"](route);
  var _c = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
      queryKey: [route],
      queryFn: function () {
        return client.get();
      },
      staleTime: 1000 * 60 * 60,
      retry: 0,
      enabled: !!onboardingCompleted
    }),
    isLoading = _c.isLoading,
    error = _c.error,
    response = _c.data;
  if (error !== null) {
    console.error('Error fetching domain data:', error.message);
  }
  return {
    domain: (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.domain,
    domainFetched: !isLoading,
    hasError: error !== null,
    message: (_b = response === null || response === void 0 ? void 0 : response.message) !== null && _b !== void 0 ? _b : error === null || error === void 0 ? void 0 : error.message
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useDomainData);

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
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/requests/HttpClient */ "./src/api/requests/HttpClient.tsx");
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
  data: {
    simplybook_dashboard_url: ""
  }
};
var useLoginData = function () {
  var queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();
  var route = 'get_login_url';
  var client = new _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_0__["default"](route);
  var query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
    queryKey: [route],
    queryFn: function () {
      return client.get();
    },
    staleTime: 1000 * 60 * 60,
    retry: 0,
    enabled: false,
    // Only fetch on request
    initialData: defaultLoginData,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });
  /**
   * Refetch query to refresh data when  something has changed
   * @returns
   */
  var fetchAndInvalidate = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, query.refetch()];
          case 1:
            response = _a.sent();
            queryClient.setQueryData([route], response === null || response === void 0 ? void 0 : response.data);
            return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
        }
      });
    });
  };
  return {
    loginData: query.data,
    fetchLinkData: fetchAndInvalidate
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useLoginData);

/***/ }),

/***/ "./src/hooks/useNotificationsData.ts":
/*!*******************************************!*\
  !*** ./src/hooks/useNotificationsData.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/requests/HttpClient */ "./src/api/requests/HttpClient.tsx");


var useNotificationsData = function () {
  var _a;
  var getNoticesRoute = 'get_notices';
  var client = new _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_0__["default"]();
  /**
   * Fetches notices from the server using Tanstack Query.
   */
  var _b = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)({
      queryKey: [getNoticesRoute],
      queryFn: function () {
        return client.setRoute(getNoticesRoute).get();
      },
      staleTime: 1000 * 60 * 5 // 5 minutes
    }),
    response = _b.data,
    isLoading = _b.isLoading,
    error = _b.error;
  /**
   * Log an error message if the request fails.
   */
  if (error !== null) {
    console.error('Error fetching notices: ', error.message);
  }
  return {
    allNotices: response === null || response === void 0 ? void 0 : response.data,
    isLoading: isLoading,
    hasError: error !== null,
    message: (_a = response === null || response === void 0 ? void 0 : response.message) !== null && _a !== void 0 ? _a : error === null || error === void 0 ? void 0 : error.message
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useNotificationsData);

/***/ }),

/***/ "./src/hooks/useProviderData.tsx":
/*!***************************************!*\
  !*** ./src/hooks/useProviderData.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/requests/HttpClient */ "./src/api/requests/HttpClient.tsx");
/* harmony import */ var _context_NotificationContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/NotificationContext */ "./src/context/NotificationContext.tsx");



var useProviderData = function () {
  var _a, _b;
  var triggerNotificationById = (0,_context_NotificationContext__WEBPACK_IMPORTED_MODULE_1__.useNotifications)().triggerNotificationById;
  var route = 'providers';
  var client = new _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_0__["default"](route);
  // Query for fetching settings from server
  var _c = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
      queryKey: [route],
      queryFn: function () {
        return client.get();
      },
      staleTime: 1000 * 60 * 5,
      // 5 minutes
      retry: 0
    }),
    isLoading = _c.isLoading,
    error = _c.error,
    response = _c.data;
  if (error !== null) {
    console.error('Error fetching providers: ', error.message);
  }
  if (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.length) === 0) {
    triggerNotificationById('add_mandatory_provider');
  }
  return {
    providers: response === null || response === void 0 ? void 0 : response.data,
    providersFetched: !isLoading,
    providersHasError: error !== null,
    providersMessage: (_b = response === null || response === void 0 ? void 0 : response.message) !== null && _b !== void 0 ? _b : error === null || error === void 0 ? void 0 : error.message
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useProviderData);

/***/ }),

/***/ "./src/hooks/useServicesData.tsx":
/*!***************************************!*\
  !*** ./src/hooks/useServicesData.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/requests/HttpClient */ "./src/api/requests/HttpClient.tsx");
/* harmony import */ var _context_NotificationContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/NotificationContext */ "./src/context/NotificationContext.tsx");



var useServicesData = function () {
  var _a, _b;
  var triggerNotificationById = (0,_context_NotificationContext__WEBPACK_IMPORTED_MODULE_1__.useNotifications)().triggerNotificationById;
  var route = 'services';
  var client = new _api_requests_HttpClient__WEBPACK_IMPORTED_MODULE_0__["default"](route);
  // Query for fetching settings from server
  var _c = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
      queryKey: [route],
      queryFn: function () {
        return client.get();
      },
      staleTime: 1000 * 60 * 5,
      // 5 minutes
      retry: 0
    }),
    isLoading = _c.isLoading,
    error = _c.error,
    response = _c.data;
  if (error !== null) {
    console.error('Error fetching services: ', error.message);
  }
  if (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.length) === 0) {
    triggerNotificationById('add_mandatory_service');
  }
  return {
    services: response === null || response === void 0 ? void 0 : response.data,
    servicesFetched: !isLoading,
    servicesHasError: error !== null,
    servicesMessage: (_b = response === null || response === void 0 ? void 0 : response.message) !== null && _b !== void 0 ? _b : error === null || error === void 0 ? void 0 : error.message
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useServicesData);

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


function _resolveBlockerOpts(opts, condition) {
  if (opts === void 0) {
    return {
      shouldBlockFn: () => true,
      withResolver: false
    };
  }
  if ("shouldBlockFn" in opts) {
    return opts;
  }
  if (typeof opts === "function") {
    const shouldBlock2 = Boolean(condition ?? true);
    const _customBlockerFn2 = async () => {
      if (shouldBlock2) return await opts();
      return false;
    };
    return {
      shouldBlockFn: _customBlockerFn2,
      enableBeforeUnload: shouldBlock2,
      withResolver: false
    };
  }
  const shouldBlock = Boolean(opts.condition ?? true);
  const fn = opts.blockerFn;
  const _customBlockerFn = async () => {
    if (shouldBlock && fn !== void 0) {
      return await fn();
    }
    return shouldBlock;
  };
  return {
    shouldBlockFn: _customBlockerFn,
    enableBeforeUnload: shouldBlock,
    withResolver: fn === void 0
  };
}
function useBlocker(opts, condition) {
  const {
    shouldBlockFn,
    enableBeforeUnload = true,
    disabled = false,
    withResolver = false
  } = _resolveBlockerOpts(opts, condition);
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  const { history } = router;
  const [resolver, setResolver] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    status: "idle",
    current: void 0,
    next: void 0,
    action: void 0,
    proceed: void 0,
    reset: void 0
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const blockerFnComposed = async (blockerFnArgs) => {
      function getLocation(location) {
        const parsedLocation = router.parseLocation(void 0, location);
        const matchedRoutes = router.getMatchedRoutes(parsedLocation);
        if (matchedRoutes.foundRoute === void 0) {
          throw new Error(`No route found for location ${location.href}`);
        }
        return {
          routeId: matchedRoutes.foundRoute.id,
          fullPath: matchedRoutes.foundRoute.fullPath,
          pathname: parsedLocation.pathname,
          params: matchedRoutes.routeParams,
          search: parsedLocation.search
        };
      }
      const current = getLocation(blockerFnArgs.currentLocation);
      const next = getLocation(blockerFnArgs.nextLocation);
      const shouldBlock = await shouldBlockFn({
        action: blockerFnArgs.action,
        current,
        next
      });
      if (!withResolver) {
        return shouldBlock;
      }
      if (!shouldBlock) {
        return false;
      }
      const promise = new Promise((resolve) => {
        setResolver({
          status: "blocked",
          current,
          next,
          action: blockerFnArgs.action,
          proceed: () => resolve(false),
          reset: () => resolve(true)
        });
      });
      const canNavigateAsync = await promise;
      setResolver({
        status: "idle",
        current: void 0,
        next: void 0,
        action: void 0,
        proceed: void 0,
        reset: void 0
      });
      return canNavigateAsync;
    };
    return disabled ? void 0 : history.block({ blockerFn: blockerFnComposed, enableBeforeUnload });
  }, [
    shouldBlockFn,
    enableBeforeUnload,
    disabled,
    withResolver,
    history,
    router
  ]);
  return resolver;
}
const _resolvePromptBlockerArgs = (props) => {
  if ("shouldBlockFn" in props) {
    return { ...props };
  }
  const shouldBlock = Boolean(props.condition ?? true);
  const fn = props.blockerFn;
  const _customBlockerFn = async () => {
    if (shouldBlock && fn !== void 0) {
      return await fn();
    }
    return shouldBlock;
  };
  return {
    shouldBlockFn: _customBlockerFn,
    enableBeforeUnload: shouldBlock,
    withResolver: fn === void 0
  };
};
function Block(opts) {
  const { children, ...rest } = opts;
  const args = _resolvePromptBlockerArgs(rest);
  const resolver = useBlocker(args);
  return children ? typeof children === "function" ? children(resolver) : children : null;
}

//# sourceMappingURL=useBlocker.js.map


/***/ })

}]);
//# sourceMappingURL=src_hooks_useSettingsMenu_js-src_routes_settings_settingsId_lazy_jsx.js.map