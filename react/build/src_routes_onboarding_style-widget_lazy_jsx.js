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

/***/ "./src/api/endpoints/getDomain.js":
/*!****************************************!*\
  !*** ./src/api/endpoints/getDomain.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _requests_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requests/request */ "./src/api/requests/request.js");

const getDomain = async () => {
  const res = await (0,_requests_request__WEBPACK_IMPORTED_MODULE_0__["default"])("get_domain", "POST");
  if (!res || !res.data.domain) {
    return '';
  }
  return res.data.domain;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getDomain);

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
  if (!res || !res.data.simplybook_dashboard_url) {
    return {
      simplybook_dashboard_url: ""
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_4__);






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
    console.error("fetch error", fetchError);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);

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
/* harmony import */ var _hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var _hooks_useWidgetData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useWidgetData */ "./src/hooks/useWidgetData.js");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _hooks_useWaitForRegistrationCallback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/useWaitForRegistrationCallback */ "./src/hooks/useWaitForRegistrationCallback.js");







const Calendar = () => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(30);
  const {
    widgetScript,
    invalidateAndRefetchWidgetScript
  } = (0,_hooks_useWidgetData__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const {
    isSavingSettings,
    settings
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const {
    onboardingCompleted
  } = (0,_hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const {
    startPolling,
    pollingEnabled
  } = (0,_hooks_useWaitForRegistrationCallback__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const [isLoadingScript, setIsLoadingScript] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  let t0;
  if ($[0] !== widgetScript) {
    t0 = async () => {
      const targetObj = document.createElement("script");
      targetObj.id = "simplybook-inline-script";
      const script = widgetScript.replaceAll("DOMContentLoaded", "customDOMContentLoaded");
      console.log("updated script: ", script);
      targetObj.innerHTML = script;
      ;
      try {
        document.head.appendChild(targetObj);
        const customEvent = new Event("customDOMContentLoaded");
        document.dispatchEvent(customEvent);
        document.removeEventListener("DOMContentLoaded", instantiateSimplybookWidget);
      } catch (t1) {
        const exception = t1;
        throw "Something went wrong " + exception + " while loading " + script;
      }
    };
    $[0] = widgetScript;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const runInlineScript = t0;
  let t1;
  if ($[2] !== pollingEnabled || $[3] !== startPolling) {
    t1 = () => {
      if (pollingEnabled) {
        console.log("polling already enabled, exit");
        return;
      }
      console.log("start polling");
      startPolling();
    };
    $[2] = pollingEnabled;
    $[3] = startPolling;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  let t2;
  if ($[5] !== onboardingCompleted) {
    t2 = [onboardingCompleted];
    $[5] = onboardingCompleted;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(t1, t2);
  let clearInlineScript;
  let setupPreview;
  if ($[7] !== isLoadingScript || $[8] !== runInlineScript) {
    setupPreview = async () => {
      if (isLoadingScript) {
        return;
      }
      setIsLoadingScript(true);
      clearInlineScript();
      let script_0 = document.head.querySelector("#simplybook-src-script");
      if (script_0) {
        console.log("Script already loaded, run inline script");
        await runInlineScript();
        setIsLoadingScript(false);
      } else {
        console.log("Script not loaded, load it now");
        script_0 = document.createElement("script");
        script_0.id = "simplybook-src-script";
        script_0.src = "https://simplybook.me/v2/widget/widget.js";
        script_0.onload = async () => {
          console.log("src Script loaded successfully!");
          await runInlineScript();
          setIsLoadingScript(false);
        };
        document.head.appendChild(script_0);
      }
    };
    clearInlineScript = _temp;
    $[7] = isLoadingScript;
    $[8] = runInlineScript;
    $[9] = clearInlineScript;
    $[10] = setupPreview;
  } else {
    clearInlineScript = $[9];
    setupPreview = $[10];
  }
  let t3;
  if ($[11] !== clearInlineScript || $[12] !== isSavingSettings || $[13] !== onboardingCompleted || $[14] !== setupPreview || $[15] !== widgetScript.length) {
    t3 = () => {
      console.log("useeffect for preview setup", "onboardingcompleted", onboardingCompleted, "isSavingSettings", isSavingSettings, "widgetScript.length", widgetScript.length);
      if (!onboardingCompleted) {
        return;
      }
      if (widgetScript.length === 0) {
        return;
      }
      setupPreview();
      return () => {
        const srcScript = document.head.querySelector("#simplybook-src-script");
        if (srcScript) {
          document.head.removeChild(srcScript);
        }
        clearInlineScript();
      };
    };
    $[11] = clearInlineScript;
    $[12] = isSavingSettings;
    $[13] = onboardingCompleted;
    $[14] = setupPreview;
    $[15] = widgetScript.length;
    $[16] = t3;
  } else {
    t3 = $[16];
  }
  let t4;
  if ($[17] !== onboardingCompleted || $[18] !== widgetScript) {
    t4 = [widgetScript, onboardingCompleted];
    $[17] = onboardingCompleted;
    $[18] = widgetScript;
    $[19] = t4;
  } else {
    t4 = $[19];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(t3, t4);
  let t5;
  if ($[20] !== invalidateAndRefetchWidgetScript || $[21] !== isSavingSettings || $[22] !== onboardingCompleted) {
    t5 = () => {
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
    };
    $[20] = invalidateAndRefetchWidgetScript;
    $[21] = isSavingSettings;
    $[22] = onboardingCompleted;
    $[23] = t5;
  } else {
    t5 = $[23];
  }
  let t6;
  if ($[24] !== isSavingSettings || $[25] !== onboardingCompleted || $[26] !== settings) {
    t6 = [isSavingSettings, onboardingCompleted, settings];
    $[24] = isSavingSettings;
    $[25] = onboardingCompleted;
    $[26] = settings;
    $[27] = t6;
  } else {
    t6 = $[27];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(t5, t6);
  if (!onboardingCompleted) {
    let t7;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
      t7 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_CalendarLoading__WEBPACK_IMPORTED_MODULE_2__["default"], null);
      $[28] = t7;
    } else {
      t7 = $[28];
    }
    return t7;
  }
  let t7;
  if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
    t7 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "h-full",
      id: "sbw_z0hg2i"
    });
    $[29] = t7;
  } else {
    t7 = $[29];
  }
  return t7;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Calendar);
function _temp() {
  const inlineScript = document.head.querySelector("#simplybook-inline-script");
  if (inlineScript) {
    console.log("removing inline script");
    document.head.removeChild(inlineScript);
  }
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
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.mjs");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }




// Map your icons to keys for easy referencing
const iconMap = {
  "xmark": _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faXmark,
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
    icon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faCircle;
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
/* harmony import */ var _Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.tsx");
/* harmony import */ var _hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var _hooks_useLoginData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useLoginData */ "./src/hooks/useLoginData.tsx");






const LoginLink = t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(20);
  const {
    className,
    page,
    isButton: t1,
    size: t2,
    btnVariant,
    children
  } = t0;
  const isButton = t1 === undefined ? false : t1;
  const size = t2 === undefined ? "md" : t2;
  const {
    fetchLinkData
  } = (0,_hooks_useLoginData__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const {
    onboardingCompleted
  } = (0,_hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_4__["default"])();
  let t3;
  if ($[0] !== fetchLinkData) {
    t3 = async (e, page_0) => {
      e.preventDefault();
      const loginData = await fetchLinkData();
      const link = loginData.simplybook_dashboard_url;
      let finalUrl = "";
      if (!link) {
        console.log("Link is not fetched");
      } else {
        finalUrl = link ? `${link}` : `${link}?back_url=/${page_0}/`;
      }
      window.open(finalUrl, "_blank");
      window.focus();
    };
    $[0] = fetchLinkData;
    $[1] = t3;
  } else {
    t3 = $[1];
  }
  const loginTo = t3;
  const externalLinkClass = onboardingCompleted ? "" : "pointer-events-none opacity-50 cursor-not-allowed";
  const combinedClassName = `${externalLinkClass}${className} `;
  if (isButton) {
    const t4 = !onboardingCompleted;
    let t5;
    if ($[2] !== loginTo || $[3] !== page) {
      t5 = e_0 => loginTo(e_0, page);
      $[2] = loginTo;
      $[3] = page;
      $[4] = t5;
    } else {
      t5 = $[4];
    }
    let t6;
    if ($[5] !== btnVariant || $[6] !== children || $[7] !== combinedClassName || $[8] !== size || $[9] !== t4 || $[10] !== t5) {
      t6 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_3__["default"], {
        disabled: t4,
        label: children,
        onClick: t5,
        className: combinedClassName,
        btnVariant: btnVariant,
        size: size
      }, children);
      $[5] = btnVariant;
      $[6] = children;
      $[7] = combinedClassName;
      $[8] = size;
      $[9] = t4;
      $[10] = t5;
      $[11] = t6;
    } else {
      t6 = $[11];
    }
    return t6;
  }
  const t4 = `${className} ${externalLinkClass}`;
  let t5;
  if ($[12] !== loginTo || $[13] !== page) {
    t5 = e_1 => loginTo(e_1, page);
    $[12] = loginTo;
    $[13] = page;
    $[14] = t5;
  } else {
    t5 = $[14];
  }
  let t6;
  if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
    t6 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
      name: "square-arrow-up-right",
      className: "px-2"
    });
    $[15] = t6;
  } else {
    t6 = $[15];
  }
  let t7;
  if ($[16] !== children || $[17] !== t4 || $[18] !== t5) {
    t7 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
      href: "#",
      className: t4,
      onClick: t5
    }, children, t6);
    $[16] = children;
    $[17] = t4;
    $[18] = t5;
    $[19] = t7;
  } else {
    t7 = $[19];
  }
  return t7;
};
LoginLink.displayName = "LoginLink";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginLink);

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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


const Error = t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(7);
  const {
    error,
    errorHeading
  } = t0;
  if (!error) {
    return null;
  }
  let t1;
  if ($[0] !== errorHeading) {
    t1 = /*#__PURE__*/React.createElement("strong", {
      className: "font-bold"
    }, errorHeading);
    $[0] = errorHeading;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  let t2;
  if ($[2] !== error) {
    t2 = /*#__PURE__*/React.createElement("p", {
      className: "m-0 mt-[0.5rem]"
    }, error);
    $[2] = error;
    $[3] = t2;
  } else {
    t2 = $[3];
  }
  let t3;
  if ($[4] !== t1 || $[5] !== t2) {
    t3 = /*#__PURE__*/React.createElement("div", {
      className: "animate-floatIn mt-4 bg-red-100 border border-red-500 text-red-500 border-2 px-4 py-3 rounded relative shadow-lg",
      role: "alert"
    }, t1, t2);
    $[4] = t1;
    $[5] = t2;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  return t3;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Error);

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
/* harmony import */ var _api_requests_request__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../api/requests/request */ "./src/api/requests/request.js");
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
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(26);
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
  const handleLogoutClick = _temp;
  const t1 = fieldState?.error?.message;
  const t2 = props.required;
  const t3 = !!fieldState?.error?.message;
  let t4;
  if ($[8] !== inputId || $[9] !== props || $[10] !== t3) {
    t4 = /*#__PURE__*/React.createElement(_Inputs_TextInput__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
      id: inputId,
      type: "text",
      "aria-invalid": t3
    }, props));
    $[8] = inputId;
    $[9] = props;
    $[10] = t3;
    $[11] = t4;
  } else {
    t4 = $[11];
  }
  const t5 = !!fieldState?.error?.message;
  let t6;
  if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
    t6 = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Log out", "simplybook");
    $[12] = t6;
  } else {
    t6 = $[12];
  }
  let t7;
  if ($[13] !== inputId || $[14] !== t5) {
    t7 = /*#__PURE__*/React.createElement(_ButtonField__WEBPACK_IMPORTED_MODULE_4__["default"], {
      id: inputId,
      type: "button",
      "aria-invalid": t5,
      label: t6,
      onClick: handleLogoutClick
    });
    $[13] = inputId;
    $[14] = t5;
    $[15] = t7;
  } else {
    t7 = $[15];
  }
  let t8;
  if ($[16] !== className || $[17] !== context || $[18] !== help || $[19] !== inputId || $[20] !== label || $[21] !== props.required || $[22] !== t1 || $[23] !== t4 || $[24] !== t7) {
    t8 = /*#__PURE__*/React.createElement(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: label,
      help: help,
      error: t1,
      context: context,
      className: className,
      inputId: inputId,
      required: t2
    }, t4, t7);
    $[16] = className;
    $[17] = context;
    $[18] = help;
    $[19] = inputId;
    $[20] = label;
    $[21] = props.required;
    $[22] = t1;
    $[23] = t4;
    $[24] = t7;
    $[25] = t8;
  } else {
    t8 = $[25];
  }
  return t8;
});
AuthenticationField.displayName = "AuthenticationField";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthenticationField);
async function _temp(e) {
  e.preventDefault();
  const confirmed = window.confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Are you sure you want to logout?", "simplybook"));
  if (!confirmed) {
    return;
  }
  const response = await (0,_api_requests_request__WEBPACK_IMPORTED_MODULE_6__["default"])("logout");
  if (!response) {
    return console.error("Logout failed");
  }
  window.location.href = "/wp-admin/admin.php?page=simplybook";
}

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
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(17);
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
      ...t5
    } = t0;
    label = t1;
    help = t2;
    context = t3;
    className = t4;
    props = t5;
    $[0] = t0;
    $[1] = className;
    $[2] = context;
    $[3] = help;
    $[4] = label;
    $[5] = props;
  } else {
    className = $[1];
    context = $[2];
    help = $[3];
    label = $[4];
    props = $[5];
  }
  let t1;
  if ($[6] !== props.showLoader) {
    t1 = props.showLoader && /*#__PURE__*/React.createElement(_Common_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
      color: "white",
      name: "spinner",
      size: "1x",
      className: "mr-2"
    });
    $[6] = props.showLoader;
    $[7] = t1;
  } else {
    t1 = $[7];
  }
  let t2;
  if ($[8] !== label || $[9] !== props || $[10] !== t1) {
    t2 = /*#__PURE__*/React.createElement(_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_2__["default"], props, t1, label);
    $[8] = label;
    $[9] = props;
    $[10] = t1;
    $[11] = t2;
  } else {
    t2 = $[11];
  }
  let t3;
  if ($[12] !== className || $[13] !== context || $[14] !== help || $[15] !== t2) {
    t3 = /*#__PURE__*/React.createElement(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: "",
      help: help,
      context: context,
      className: className,
      inputId: ""
    }, t2);
    $[12] = className;
    $[13] = context;
    $[14] = help;
    $[15] = t2;
    $[16] = t3;
  } else {
    t3 = $[16];
  }
  return t3;
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
/* harmony import */ var _radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @radix-ui/react-popover */ "./node_modules/@radix-ui/react-popover/dist/index.mjs");
/* harmony import */ var _hooks_useWaitForRegistrationCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useWaitForRegistrationCallback */ "./src/hooks/useWaitForRegistrationCallback.js");







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
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(34);
  let className;
  let context;
  let fieldState;
  let help;
  let label;
  let onChange;
  let props;
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
      ...t8
    } = t0;
    setting = t1;
    fieldState = t2;
    label = t3;
    help = t4;
    context = t5;
    className = t6;
    onChange = t7;
    props = t8;
    $[0] = t0;
    $[1] = className;
    $[2] = context;
    $[3] = fieldState;
    $[4] = help;
    $[5] = label;
    $[6] = onChange;
    $[7] = props;
    $[8] = setting;
  } else {
    className = $[1];
    context = $[2];
    fieldState = $[3];
    help = $[4];
    label = $[5];
    onChange = $[6];
    props = $[7];
    setting = $[8];
  }
  const defaultColor = setting.value || setting.default;
  const {
    isPolling
  } = (0,_hooks_useWaitForRegistrationCallback__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const [popoverOpen, setPopoverOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [color, setColor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultColor);
  let t1;
  if ($[9] !== color || $[10] !== props.value) {
    t1 = () => {
      if (props.value !== color) {
        setColor(props.value);
      }
    };
    $[9] = color;
    $[10] = props.value;
    $[11] = t1;
  } else {
    t1 = $[11];
  }
  let t2;
  if ($[12] !== props.value) {
    t2 = [props.value];
    $[12] = props.value;
    $[13] = t2;
  } else {
    t2 = $[13];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(t1, t2);
  let t3;
  if ($[14] !== isPolling) {
    t3 = open => {
      if (!isPolling) {
        setPopoverOpen(open);
      }
    };
    $[14] = isPolling;
    $[15] = t3;
  } else {
    t3 = $[15];
  }
  const handlePopoverOpenChange = t3;
  let t4;
  if ($[16] !== color || $[17] !== handlePopoverOpenChange || $[18] !== onChange || $[19] !== popoverOpen || $[20] !== setting.disabled) {
    t4 = t5 => {
      const {
        label: label_0
      } = t5;
      const handleColorChange = (color_0, event) => {
        setColor(color_0);
        onChange(color_0);
      };
      const disabledClass = setting.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
      return /*#__PURE__*/React.createElement(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__.Root, {
        open: popoverOpen,
        onOpenChange: handlePopoverOpenChange
      }, /*#__PURE__*/React.createElement(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__.Trigger, {
        className: "p-[5px] mr-2 bg-transparent rounded-md border border-gray-400 min-w-[140px] text-sm"
      }, /*#__PURE__*/React.createElement("div", {
        className: disabledClass + " whitespace-nowrap min-w-5 flex p-1.5 gap-3.5 items-center"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rounded-full min-w-5 h-5 border border-gray-300",
        style: {
          backgroundColor: color
        }
      }), label_0)), /*#__PURE__*/React.createElement(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__.Portal, null, /*#__PURE__*/React.createElement(_radix_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__.Content, null, /*#__PURE__*/React.createElement(_Inputs_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
        colorValue: color,
        onChangeComplete: handleColorChange
      }))));
    };
    $[16] = color;
    $[17] = handlePopoverOpenChange;
    $[18] = onChange;
    $[19] = popoverOpen;
    $[20] = setting.disabled;
    $[21] = t4;
  } else {
    t4 = $[21];
  }
  const ColorPickerElement = t4;
  const t5 = fieldState?.error?.message;
  let t6;
  if ($[22] !== ColorPickerElement || $[23] !== label || $[24] !== setting) {
    t6 = /*#__PURE__*/React.createElement("div", {
      className: ""
    }, /*#__PURE__*/React.createElement(ColorPickerElement, {
      setting: setting,
      label: label
    }));
    $[22] = ColorPickerElement;
    $[23] = label;
    $[24] = setting;
    $[25] = t6;
  } else {
    t6 = $[25];
  }
  let t7;
  if ($[26] !== className || $[27] !== context || $[28] !== help || $[29] !== props.required || $[30] !== setting.id || $[31] !== t5 || $[32] !== t6) {
    t7 = /*#__PURE__*/React.createElement(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: "",
      help: help,
      error: t5,
      context: context,
      className: className,
      inputId: setting.id,
      required: props.required
    }, t6);
    $[26] = className;
    $[27] = context;
    $[28] = help;
    $[29] = props.required;
    $[30] = setting.id;
    $[31] = t5;
    $[32] = t6;
    $[33] = t7;
  } else {
    t7 = $[33];
  }
  return t7;
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
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(17);
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
    setValue,
    invalidateSettings
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_2__["default"])();
  let t1;
  if ($[5] !== invalidateSettings || $[6] !== onChange || $[7] !== props.setting.id || $[8] !== setValue) {
    t1 = async value_0 => {
      await setValue(props.setting.id, value_0);
      console.log("invalidate Settings from implementation");
      await invalidateSettings();
      onChange(value_0);
    };
    $[5] = invalidateSettings;
    $[6] = onChange;
    $[7] = props.setting.id;
    $[8] = setValue;
    $[9] = t1;
  } else {
    t1 = $[9];
  }
  const handleChange = t1;
  let t2;
  if ($[10] !== handleChange) {
    t2 = value_1 => handleChange(value_1);
    $[10] = handleChange;
    $[11] = t2;
  } else {
    t2 = $[11];
  }
  let t3;
  if ($[12] !== actualValue || $[13] !== options || $[14] !== props || $[15] !== t2) {
    t3 = /*#__PURE__*/React.createElement("div", {
      className: "p-6"
    }, /*#__PURE__*/React.createElement(_Inputs_ImplementationInput__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
      options: options,
      value: actualValue,
      onChange: t2
    }, props)));
    $[12] = actualValue;
    $[13] = options;
    $[14] = props;
    $[15] = t2;
    $[16] = t3;
  } else {
    t3 = $[16];
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
/* harmony import */ var _hooks_useServicesData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useServicesData */ "./src/hooks/useServicesData.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ListItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ListItem */ "./src/components/Fields/ListItem.js");
/* harmony import */ var _hooks_useProviderData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useProviderData */ "./src/hooks/useProviderData.js");






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
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(27);
  const {
    setting,
    label
  } = t0;
  const {
    services
  } = (0,_hooks_useServicesData__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const {
    providers
  } = (0,_hooks_useProviderData__WEBPACK_IMPORTED_MODULE_5__["default"])();
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = [];
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  const [listArray, setListArray] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(t1);
  let t2;
  if ($[1] !== providers || $[2] !== services) {
    t2 = {
      services,
      providers
    };
    $[1] = providers;
    $[2] = services;
    $[3] = t2;
  } else {
    t2 = $[3];
  }
  const sourceData = t2;
  let t3;
  if ($[4] !== setting.source || $[5] !== sourceData) {
    t3 = () => {
      console.log("loading listArray for ", setting.source);
      setListArray(sourceData[setting.source]);
    };
    $[4] = setting.source;
    $[5] = sourceData;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  const t4 = sourceData[setting.source];
  let t5;
  if ($[7] !== t4) {
    t5 = [t4];
    $[7] = t4;
    $[8] = t5;
  } else {
    t5 = $[8];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(t3, t5);
  if (!listArray) {
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
      t6 = /*#__PURE__*/React.createElement(React.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Loading, please wait a few seconds..."));
      $[9] = t6;
    } else {
      t6 = $[9];
    }
    return t6;
  }
  console.log("listArray for ", setting.source, listArray);
  if (!Array.isArray(listArray)) {
    let t6;
    if ($[10] !== setting.label) {
      t6 = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("No items found for %s"), setting.label);
      $[10] = setting.label;
      $[11] = t6;
    } else {
      t6 = $[11];
    }
    let t7;
    if ($[12] !== t6) {
      t7 = /*#__PURE__*/React.createElement(React.Fragment, null, t6);
      $[12] = t6;
      $[13] = t7;
    } else {
      t7 = $[13];
    }
    return t7;
  }
  let t6;
  if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
    t6 = {
      id: "upgrade",
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Want more services?"),
      picture_preview: ""
    };
    $[14] = t6;
  } else {
    t6 = $[14];
  }
  const premiumItem = t6;
  let t7;
  if ($[15] !== label || $[16] !== listArray || $[17] !== setting.link) {
    let t8;
    if ($[19] !== label || $[20] !== setting.link) {
      t8 = item => /*#__PURE__*/React.createElement(_ListItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
        upgrade: false,
        key: item.id + item.source,
        label: label,
        link: setting.link,
        item: item
      });
      $[19] = label;
      $[20] = setting.link;
      $[21] = t8;
    } else {
      t8 = $[21];
    }
    t7 = listArray.map(t8);
    $[15] = label;
    $[16] = listArray;
    $[17] = setting.link;
    $[18] = t7;
  } else {
    t7 = $[18];
  }
  let t8;
  if ($[22] !== label) {
    t8 = /*#__PURE__*/React.createElement(_ListItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
      upgrade: true,
      label: label,
      link: "r/payment-widget",
      item: premiumItem
    });
    $[22] = label;
    $[23] = t8;
  } else {
    t8 = $[23];
  }
  let t9;
  if ($[24] !== t7 || $[25] !== t8) {
    t9 = /*#__PURE__*/React.createElement("div", {
      className: "w-full"
    }, t7, t8);
    $[24] = t7;
    $[25] = t8;
    $[26] = t9;
  } else {
    t9 = $[26];
  }
  return t9;
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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Common_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Icon */ "./src/components/Common/Icon.jsx");
/* harmony import */ var _Common_LoginLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Common/LoginLink */ "./src/components/Common/LoginLink.jsx");
/* harmony import */ var _hooks_useDomainData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/useDomainData */ "./src/hooks/useDomainData.tsx");







/**
 * HiddenField component
 * @param {string} id
 * @param {string} name

 */
const ListItem = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((t0, ref) => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(36);
  const {
    upgrade,
    link,
    item,
    label
  } = t0;
  const [visible, setVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!!item?.is_visible || false);
  let t1;
  if ($[0] !== item.id) {
    t1 = e => {
      console.log("onChange", e.target.checked, "for id ", item.id);
      setVisible(e.target.checked);
    };
    $[0] = item.id;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const onChange = t1;
  const {
    domain,
    domainFetched
  } = (0,_hooks_useDomainData__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const hasPicture = domainFetched && item.picture_preview && item.picture_preview.length > 0;
  let t2;
  if ($[2] !== label || $[3] !== upgrade) {
    t2 = upgrade ? " |  " + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Get unlimited %s", "simplybook"), label) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Edit", "simplybook");
    $[2] = label;
    $[3] = upgrade;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  const fullLabel = t2;
  let t3;
  if ($[5] !== domain || $[6] !== hasPicture || $[7] !== item.picture_preview) {
    t3 = hasPicture && /*#__PURE__*/React.createElement("img", {
      className: "w-15 h-15 max-w-[40px] max-h-[40px]",
      src: domain + item.picture_preview,
      alt: item.picture_preview
    });
    $[5] = domain;
    $[6] = hasPicture;
    $[7] = item.picture_preview;
    $[8] = t3;
  } else {
    t3 = $[8];
  }
  let t4;
  if ($[9] !== hasPicture) {
    t4 = !hasPicture && /*#__PURE__*/React.createElement("div", {
      className: "min-w-[40px] min-h-[40px] flex items-center justify-center"
    }, /*#__PURE__*/React.createElement(_Common_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
      name: "cart"
    }));
    $[9] = hasPicture;
    $[10] = t4;
  } else {
    t4 = $[10];
  }
  let t5;
  if ($[11] !== t3 || $[12] !== t4) {
    t5 = /*#__PURE__*/React.createElement("div", null, t3, t4);
    $[11] = t3;
    $[12] = t4;
    $[13] = t5;
  } else {
    t5 = $[13];
  }
  let t6;
  if ($[14] !== item.name) {
    t6 = /*#__PURE__*/React.createElement("div", {
      className: "font-bold"
    }, item.name);
    $[14] = item.name;
    $[15] = t6;
  } else {
    t6 = $[15];
  }
  let t7;
  if ($[16] !== fullLabel || $[17] !== link) {
    t7 = /*#__PURE__*/React.createElement(_Common_LoginLink__WEBPACK_IMPORTED_MODULE_5__["default"], {
      page: link
    }, fullLabel);
    $[16] = fullLabel;
    $[17] = link;
    $[18] = t7;
  } else {
    t7 = $[18];
  }
  let t8;
  if ($[19] !== t5 || $[20] !== t6 || $[21] !== t7) {
    t8 = /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-3"
    }, t5, t6, t7);
    $[19] = t5;
    $[20] = t6;
    $[21] = t7;
    $[22] = t8;
  } else {
    t8 = $[22];
  }
  let t9;
  if ($[23] !== item.id || $[24] !== onChange || $[25] !== upgrade || $[26] !== visible) {
    t9 = !upgrade && /*#__PURE__*/React.createElement(_Inputs_CheckboxInput__WEBPACK_IMPORTED_MODULE_2__["default"], {
      label: "",
      id: item.id,
      checked: visible,
      onChange: e_0 => onChange(e_0)
    });
    $[23] = item.id;
    $[24] = onChange;
    $[25] = upgrade;
    $[26] = visible;
    $[27] = t9;
  } else {
    t9 = $[27];
  }
  let t10;
  if ($[28] !== upgrade) {
    t10 = upgrade && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: `inline-block w-[100px] text-center px-3 py-1.5 rounded-md text-xs font-medium bg-tertiary text-white`
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Upgrade", "simplybook")));
    $[28] = upgrade;
    $[29] = t10;
  } else {
    t10 = $[29];
  }
  let t11;
  if ($[30] !== t10 || $[31] !== t9) {
    t11 = /*#__PURE__*/React.createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ml-4 relative"
    }, t9, t10));
    $[30] = t10;
    $[31] = t9;
    $[32] = t11;
  } else {
    t11 = $[32];
  }
  let t12;
  if ($[33] !== t11 || $[34] !== t8) {
    t12 = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "w-full flex items-center justify-between px-4 py-5 bg-gray-100 mb-4"
    }, t8, t11));
    $[33] = t11;
    $[34] = t8;
    $[35] = t12;
  } else {
    t12 = $[35];
  }
  return t12;
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
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
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
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(26);
  let className;
  let context;
  let fieldState;
  let help;
  let label;
  let name;
  let props;
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
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = context;
    $[3] = fieldState;
    $[4] = help;
    $[5] = label;
    $[6] = name;
    $[7] = props;
    $[8] = setting;
    $[9] = type;
  } else {
    className = $[1];
    context = $[2];
    fieldState = $[3];
    help = $[4];
    label = $[5];
    name = $[6];
    props = $[7];
    setting = $[8];
    type = $[9];
  }
  const inputId = setting.id;
  const t1 = fieldState?.error?.message;
  const t2 = !!fieldState?.error?.message;
  let t3;
  if ($[10] !== inputId || $[11] !== name || $[12] !== props || $[13] !== ref || $[14] !== t2 || $[15] !== type) {
    t3 = /*#__PURE__*/React.createElement(_Inputs_TextInput__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
      name: name,
      ref: ref,
      id: inputId,
      type: type,
      "aria-invalid": t2
    }, props));
    $[10] = inputId;
    $[11] = name;
    $[12] = props;
    $[13] = ref;
    $[14] = t2;
    $[15] = type;
    $[16] = t3;
  } else {
    t3 = $[16];
  }
  let t4;
  if ($[17] !== className || $[18] !== context || $[19] !== help || $[20] !== inputId || $[21] !== label || $[22] !== props.required || $[23] !== t1 || $[24] !== t3) {
    t4 = /*#__PURE__*/React.createElement(_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: label,
      help: help,
      error: t1,
      context: context,
      className: className,
      inputId: inputId,
      requiredMessage: props.required
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
  authentication: _Fields_AuthenticationField__WEBPACK_IMPORTED_MODULE_12__["default"]
};
const FormField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_5__.memo)(({
  setting,
  control,
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
    await saveSettings(settings);
  };
  let defaultValue = setting.value || setting.default;
  if (setting.type === "checkbox") {
    defaultValue = defaultValue === "1" || defaultValue === true || defaultValue === 1;
  }
  return /*#__PURE__*/React.createElement(_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/React.createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
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




/**
 * The form field wrapper component is created to allow some fields to be grouped, and to be displayed in a row.
 * @param fields
 * @param control
 * @returns {Element}
 * @constructor
 */
const FormFieldWrapper = t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(11);
  const {
    fields,
    control
  } = t0;
  let t1;
  let t2;
  if ($[0] !== control || $[1] !== fields) {
    const groupedFields = fields.reduce(_temp, {});
    let t3;
    if ($[4] !== control) {
      t3 = field_1 => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_FormField__WEBPACK_IMPORTED_MODULE_2__["default"], {
        setting: field_1,
        key: field_1.id,
        control: control
      });
      $[4] = control;
      $[5] = t3;
    } else {
      t3 = $[5];
    }
    t1 = fields.filter(_temp2).map(t3);
    let t4;
    if ($[6] !== control) {
      t4 = t5 => {
        const [groupKey, fields_0] = t5;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
          className: "flex flex-row",
          key: groupKey
        }, fields_0.map(field_2 => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_FormField__WEBPACK_IMPORTED_MODULE_2__["default"], {
          setting: field_2,
          key: field_2.id,
          control: control
        })));
      };
      $[6] = control;
      $[7] = t4;
    } else {
      t4 = $[7];
    }
    t2 = Object.entries(groupedFields).map(t4);
    $[0] = control;
    $[1] = fields;
    $[2] = t1;
    $[3] = t2;
  } else {
    t1 = $[2];
    t2 = $[3];
  }
  let t3;
  if ($[8] !== t1 || $[9] !== t2) {
    t3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, t1, t2);
    $[8] = t1;
    $[9] = t2;
    $[10] = t3;
  } else {
    t3 = $[10];
  }
  return t3;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormFieldWrapper);
function _temp(groups, field) {
  if (field.inline_group) {
    groups[field.inline_group] = groups[field.inline_group] || [];
    groups[field.inline_group].push(field);
  }
  return groups;
}
function _temp2(field_0) {
  return !field_0.inline_group;
}

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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useOnboardingData */ "./src/hooks/useOnboardingData.js");
/* harmony import */ var _Fields_ButtonField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Fields/ButtonField */ "./src/components/Fields/ButtonField.jsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _Forms_FormFieldWrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Forms/FormFieldWrapper */ "./src/components/Forms/FormFieldWrapper.jsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Errors_Error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Errors/Error */ "./src/components/Errors/Error.jsx");










const OnboardingStep = t0 => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(33);
  const {
    path,
    rightColumn,
    bottomText,
    primaryButton: t1,
    secondaryButton: t2,
    customHtml: t3
  } = t0;
  let t4;
  if ($[0] !== t1) {
    t4 = t1 === undefined ? {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Next", "simplybook")
    } : t1;
    $[0] = t1;
    $[1] = t4;
  } else {
    t4 = $[1];
  }
  const primaryButton = t4;
  const secondaryButton = t2 === undefined ? null : t2;
  t3 === undefined ? null : t3;
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
  } = (0,_hooks_useOnboardingData__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const navigate = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_8__.useNavigate)();
  let t5;
  if ($[2] !== data || $[3] !== defaultData) {
    t5 = {
      defaultValues: defaultData,
      values: data,
      mode: "onBlur"
    };
    $[2] = data;
    $[3] = defaultData;
    $[4] = t5;
  } else {
    t5 = $[4];
  }
  const {
    watch,
    handleSubmit,
    control
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_9__.useForm)(t5);
  const {
    getValue
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const [, setCompanyName] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)("");
  const currentStep = getCurrentStep(path);
  const [disabled, setDisabled] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
  let t6;
  if ($[5] !== watch) {
    t6 = watch();
    $[5] = watch;
    $[6] = t6;
  } else {
    t6 = $[6];
  }
  const formData = t6;
  let t7;
  if ($[7] !== formData || $[8] !== updateData) {
    t7 = () => {
      updateData({
        "confirmation-code": formData["confirmation-code"]
      });
    };
    $[7] = formData;
    $[8] = updateData;
    $[9] = t7;
  } else {
    t7 = $[9];
  }
  const t8 = formData["confirmation-code"];
  let t9;
  if ($[10] !== t8) {
    t9 = [t8];
    $[10] = t8;
    $[11] = t9;
  } else {
    t9 = $[11];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(t7, t9);
  let t10;
  if ($[12] !== getCurrentStepId || $[13] !== getURLForStep || $[14] !== navigate || $[15] !== path) {
    t10 = () => {
      const currentStep_0 = getCurrentStepId(path);
      const completedStepNext = parseInt(simplybook.completed_step) + 1;
      if (completedStepNext > 1 && completedStepNext > currentStep_0) {
        navigate({
          to: getURLForStep(completedStepNext)
        });
      }
    };
    $[12] = getCurrentStepId;
    $[13] = getURLForStep;
    $[14] = navigate;
    $[15] = path;
    $[16] = t10;
  } else {
    t10 = $[16];
  }
  let t11;
  if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
    t11 = [];
    $[17] = t11;
  } else {
    t11 = $[17];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(t10, t11);
  const onSubmit = async (formData_0, t12) => {
    const buttonType = t12 === undefined ? "primary" : t12;
    setApiError(null);
    setDisabled(true);
    let updatedFormData = {
      ...formData_0
    };
    updatedFormData.recaptchaToken = recaptchaToken;
    if (buttonType === "primary" && primaryButton.modifyData) {
      updatedFormData = primaryButton.modifyData(updatedFormData);
    } else {
      if (buttonType === "secondary" && secondaryButton.modifyData) {
        updatedFormData = secondaryButton.modifyData(updatedFormData);
      }
    }
    if (currentStep.beforeSubmit) {
      ;
      try {
        const shouldContinue = await currentStep.beforeSubmit(updatedFormData);
        if (shouldContinue === false) {
          setDisabled(false);
          return;
        }
      } catch (t13) {
        const error = t13;
        setDisabled(false);
        console.error("Submission cancelled:", error);
        return;
      }
    }
    await updateData(updatedFormData);
    setDisabled(false);
    if (buttonType === "primary" && primaryButton.navigateTo) {
      navigate({
        to: primaryButton.navigateTo
      });
    } else {
      if (buttonType === "secondary" && secondaryButton.navigateTo) {
        navigate({
          to: secondaryButton.navigateTo
        });
      } else {
        if (isLastStep(path)) {
          navigate({
            to: "/"
          });
        } else {
          const currentStep_1 = getCurrentStep(path);
          if (currentStep_1.id <= 4 && onboardingCompleted) {
            navigate({
              to: getURLForStep(5)
            });
          } else {
            navigate({
              to: getURLForStep(getCurrentStepId(path) + 1)
            });
          }
        }
      }
    }
  };
  let t14;
  let t15;
  if ($[18] !== getValue) {
    t14 = () => {
      const companyName_0 = getValue("company_name");
      if (companyName_0 && companyName_0.length > 0) {
        setCompanyName(companyName_0);
      }
    };
    t15 = getValue("company_name");
    $[18] = getValue;
    $[19] = t14;
    $[20] = t15;
  } else {
    t14 = $[19];
    t15 = $[20];
  }
  let t16;
  if ($[21] !== t15) {
    t16 = [t15];
    $[21] = t15;
    $[22] = t16;
  } else {
    t16 = $[22];
  }
  (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(t14, t16);
  const T0 = _Fields_ButtonField__WEBPACK_IMPORTED_MODULE_2__["default"];
  const t17 = "primary";
  const t18 = primaryButton.label;
  const t19 = handleSubmit(data_0 => onSubmit(data_0, "primary"));
  let t20;
  if ($[23] !== T0 || $[24] !== bottomText || $[25] !== disabled || $[26] !== primaryButton.label || $[27] !== t19) {
    t20 = /*#__PURE__*/React.createElement(T0, {
      showLoader: disabled,
      btnVariant: t17,
      label: t18,
      context: bottomText,
      disabled: disabled,
      onClick: t19
    });
    $[23] = T0;
    $[24] = bottomText;
    $[25] = disabled;
    $[26] = primaryButton.label;
    $[27] = t19;
    $[28] = t20;
  } else {
    t20 = $[28];
  }
  let t21;
  if ($[29] !== apiError) {
    t21 = /*#__PURE__*/React.createElement(_Errors_Error__WEBPACK_IMPORTED_MODULE_7__["default"], {
      error: apiError
    });
    $[29] = apiError;
    $[30] = t21;
  } else {
    t21 = $[30];
  }
  let t22;
  if ($[31] !== rightColumn) {
    t22 = /*#__PURE__*/React.createElement("div", {
      className: "col-span-4 col-start-7 row-span-2 my-12"
    }, rightColumn);
    $[31] = rightColumn;
    $[32] = t22;
  } else {
    t22 = $[32];
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "col-span-4 col-start-3 my-12 flex flex-col text-black"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement(_Forms_FormFieldWrapper__WEBPACK_IMPORTED_MODULE_5__["default"], {
    fields: currentStep.fields,
    control: control
  }), t20)), t21), t22);
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
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("I agree to the terms and conditions", "simplybook")
    }],
    beforeSubmit: async data => {
      console.log("submit email step");
      let response = await (0,_api_endpoints_onBoarding_registerEmail__WEBPACK_IMPORTED_MODULE_3__["default"])({
        data
      });
      if (response.status !== "success") {
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
    beforeSubmit: async data_0 => {
      console.log("submit tips and tricks step");
      await (0,_api_endpoints_onBoarding_registerTipsTricks__WEBPACK_IMPORTED_MODULE_4__["default"])({
        data: data_0
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
    beforeSubmit: async data_1 => {
      console.log("submit information check step");
      console.log(data_1);
      let response_0 = await (0,_api_endpoints_onBoarding_registerCompany__WEBPACK_IMPORTED_MODULE_5__["default"])({
        data: data_1
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
    id: 4,
    path: "/onboarding/confirm-email",
    fields: [{
      id: "confirmation-code",
      type: "text",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Confirmation Code", "simplybook")
    }],
    beforeSubmit: async data_2 => {
      if (!data_2.recaptchaToken) {
        console.log("missing recaptchatoken, cancel submit");
        return false;
      }
      console.log("found recaptcha token ", data_2.recaptchaToken);
      console.log("confirm email step");
      console.log(data_2);
      let response_1 = await (0,_api_endpoints_onBoarding_confirmEmail__WEBPACK_IMPORTED_MODULE_6__["default"])({
        data: data_2
      });
      if (response_1.status !== "success") {
        console.log("setting api error to ", response_1.message);
        setApiError(response_1.message);
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
      label: "",
      default: "generated",
      save_on_change: true,
      options: [{
        value: "generated",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Generated", "simplybook"),
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Generate pages.", "simplybook")
      }, {
        value: "manual",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Shortcode", "simplybook"),
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Do it yourself", "simplybook")
      }, {
        value: "templates",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Templates", "simplybook"),
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Premium", "simplybook"),
        is_premium: true
      }]
    }],
    beforeSubmit: async data_3 => {
      if (getValue("implementation") !== "manual") {
        console.log("submit implementation step ", bookingPageUrl, calendarPageUrl);
        const data_4 = {
          bookingPageUrl: bookingPageUrl,
          calendarPageUrl: calendarPageUrl
        };
        let response_2 = await (0,_api_endpoints_onBoarding_generatePages__WEBPACK_IMPORTED_MODULE_8__["default"])({
          data: data_4
        });
        if (response_2.status !== "success") {
          return false;
        }
      }
    }
  }];
  const [bookingPageUrl, setBookingPageUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(simplybook.site_url + "/" + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("my-booking", "simplybook"));
  const [calendarPageUrl, setCalendarPageUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(simplybook.site_url + "/" + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("calendar", "simplybook"));
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
      queryClient.setQueryData(["onboarding_data"], oldData_0 => ({
        ...oldData_0,
        onboardingCompleted: completed
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["onboarding_data"]);
    }
  });
  const {
    mutate: updateCalendarPageNameAvailable
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_12__.useMutation)({
    mutationFn: async () => {
      // Verify if the page title is available based on URL
      const response_3 = await (0,_api_endpoints_onBoarding_isPageTitleAvailable__WEBPACK_IMPORTED_MODULE_9__["default"])({
        data: {
          url: calendarPageUrl
        }
      });
      const isAvailable = response_3.status === "success";

      // Update the query data with the new page name and availability status
      queryClient.setQueryData(["onboarding_data"], oldData_1 => ({
        ...oldData_1,
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
      // Verify if the page title is available based on URL
      const response_4 = await (0,_api_endpoints_onBoarding_isPageTitleAvailable__WEBPACK_IMPORTED_MODULE_9__["default"])({
        data: {
          url: bookingPageUrl
        }
      });
      const isAvailable_0 = response_4.status === "success";
      // Simulate API update call if needed, otherwise update the cache directly
      queryClient.setQueryData(["onboarding_data"], oldData_2 => ({
        ...oldData_2,
        bookingPageNameAvailable: isAvailable_0
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["onboarding_data"]);
    }
  });
  const debouncedSetBookingPageName = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(pageName => updateBookingPageNameAvailable(pageName), 500),
  // 500ms delay
  []);
  const handleBookingPageNameChange = pageName_0 => {
    setBookingPageUrl(pageName_0);
    debouncedSetBookingPageName(pageName_0);
  };
  const debouncedSetCalendarPageName = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(pageName_1 => updateCalendarPageNameAvailable(pageName_1), 500),
  // 500ms delay
  []);
  const handleCalendarPageNameChange = pageName_2 => {
    setCalendarPageUrl(pageName_2);
    debouncedSetCalendarPageName(pageName_2);
  };
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
    setBookingPageName: pageName_3 => handleBookingPageNameChange(pageName_3),
    setCalendarPageName: pageName_4 => handleCalendarPageNameChange(pageName_4),
    bookingPageName: bookingPageUrl,
    calendarPageName: calendarPageUrl,
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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _api_endpoints_getProviders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/endpoints/getProviders */ "./src/api/endpoints/getProviders.js");



/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useProvidersData = () => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(3);
  (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = {
      queryKey: ["providers"],
      queryFn: _temp,
      staleTime: 300000,
      retry: 0,
      select: _temp2
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useQuery)(t0);
  let t1;
  if ($[1] !== query.data) {
    t1 = {
      providers: query.data
    };
    $[1] = query.data;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  return t1;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useProvidersData);
function _temp() {
  return (0,_api_endpoints_getProviders__WEBPACK_IMPORTED_MODULE_1__["default"])();
}
function _temp2(data) {
  return [...data];
}

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
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-compiler-runtime */ "./node_modules/react-compiler-runtime/dist/index.js");
/* harmony import */ var react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _api_endpoints_getServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/endpoints/getServices */ "./src/api/endpoints/getServices.js");



/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useServicesData = () => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(3);
  (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = {
      queryKey: ["services"],
      queryFn: _temp,
      staleTime: 300000,
      retry: 0,
      select: _temp2
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useQuery)(t0);
  let t1;
  if ($[1] !== query.data) {
    t1 = {
      services: query.data
    };
    $[1] = query.data;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  return t1;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useServicesData);
function _temp() {
  return (0,_api_endpoints_getServices__WEBPACK_IMPORTED_MODULE_1__["default"])();
}
function _temp2(data) {
  return [...data];
}

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
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useMutation.js");
/* harmony import */ var _api_endpoints_getSettingsFields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/endpoints/getSettingsFields */ "./src/api/endpoints/getSettingsFields.js");
/* harmony import */ var _api_endpoints_saveSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/endpoints/saveSettings */ "./src/api/endpoints/saveSettings.js");





/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useSettingsData = () => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(18);
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useQueryClient)();
  const transformData = _temp2;
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = ["settings_fields"];
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  let t1;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = {
      queryKey: t0,
      queryFn: _temp3,
      staleTime: 300000,
      initialData: transformData(window.simplybook && window.simplybook.settings_fields),
      retry: 0,
      select: _temp4
    };
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.useQuery)(t1);
  let t2;
  if ($[2] !== query.data) {
    t2 = id => query.data.find(field_0 => field_0.id === id)?.value;
    $[2] = query.data;
    $[3] = t2;
  } else {
    t2 = $[3];
  }
  const getValue = t2;
  let t3;
  if ($[4] !== queryClient) {
    t3 = (id_0, value) => {
      queryClient.setQueryData(["settings_fields"], oldData => oldData.map(field_1 => field_1.id === id_0 ? {
        ...field_1,
        value
      } : field_1));
    };
    $[4] = queryClient;
    $[5] = t3;
  } else {
    t3 = $[5];
  }
  const setValue = t3;
  let t4;
  if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
    t4 = async data_1 => {
      console.log("saving data", data_1);
      const settings = await (0,_api_endpoints_saveSettings__WEBPACK_IMPORTED_MODULE_2__["default"])(data_1);
      return transformData(settings);
    };
    $[6] = t4;
  } else {
    t4 = $[6];
  }
  let t5;
  if ($[7] !== queryClient) {
    t5 = {
      mutationFn: t4,
      onSuccess: async data_2 => {
        queryClient.setQueryData(["settings_fields"], oldData_0 => data_2 ? [...data_2] : []);
        queryClient.invalidateQueries(["settings_fields"]);
      }
    };
    $[7] = queryClient;
    $[8] = t5;
  } else {
    t5 = $[8];
  }
  const {
    mutateAsync: saveSettings
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.useMutation)(t5);
  const t6 = query.isLoading || query.fetchStatus === "fetching";
  let t7;
  if ($[9] !== queryClient) {
    t7 = () => queryClient.invalidateQueries(["settings_fields"]);
    $[9] = queryClient;
    $[10] = t7;
  } else {
    t7 = $[10];
  }
  let t8;
  if ($[11] !== getValue || $[12] !== query.data || $[13] !== saveSettings || $[14] !== setValue || $[15] !== t6 || $[16] !== t7) {
    t8 = {
      settings: query.data,
      saveSettings,
      getValue,
      setValue,
      isSavingSettings: t6,
      invalidateSettings: t7
    };
    $[11] = getValue;
    $[12] = query.data;
    $[13] = saveSettings;
    $[14] = setValue;
    $[15] = t6;
    $[16] = t7;
    $[17] = t8;
  } else {
    t8 = $[17];
  }
  return t8;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSettingsData);
function _temp(field) {
  if (field.type === "checkbox") {
    field.value = !!field.value;
  }
  return field;
}
function _temp2(data) {
  return data.map(_temp);
}
function _temp3() {
  return (0,_api_endpoints_getSettingsFields__WEBPACK_IMPORTED_MODULE_1__["default"])({
    withValues: true
  });
}
function _temp4(data_0) {
  return data_0 ? [...data_0] : [];
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
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(19);
  const {
    setOnboardingCompleted
  } = (0,_useOnboardingData__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const [pollingEnabled, setPollingEnabled] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);
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
  if ($[16] !== isFetching || $[17] !== pollingEnabled) {
    t9 = {
      startPolling: t8,
      pollingEnabled,
      isPolling: isFetching
    };
    $[16] = isFetching;
    $[17] = pollingEnabled;
    $[18] = t9;
  } else {
    t9 = $[18];
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
/* harmony import */ var _api_endpoints_getWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/endpoints/getWidget */ "./src/api/endpoints/getWidget.js");



const useWidgetData = () => {
  const $ = (0,react_compiler_runtime__WEBPACK_IMPORTED_MODULE_0__.c)(7);
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = {
      queryKey: ["widget_script"],
      queryFn: _temp,
      staleTime: 300000,
      initialData: "",
      retry: 0,
      enabled: false
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useQuery)(t0);
  let t1;
  if ($[1] !== query || $[2] !== queryClient) {
    t1 = async () => {
      console.log("invalidate and refetch widget script");
      queryClient.invalidateQueries(["widget_script"]);
      await query.refetch();
    };
    $[1] = query;
    $[2] = queryClient;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  const invalidateAndRefetchWidgetScript = t1;
  let t2;
  if ($[4] !== invalidateAndRefetchWidgetScript || $[5] !== query.data) {
    t2 = {
      widgetScript: query.data,
      invalidateAndRefetchWidgetScript
    };
    $[4] = invalidateAndRefetchWidgetScript;
    $[5] = query.data;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  return t2;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useWidgetData);
function _temp() {
  return (0,_api_endpoints_getWidget__WEBPACK_IMPORTED_MODULE_1__["default"])();
}

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
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Onboarding_OnboardingStep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Onboarding/OnboardingStep */ "./src/components/Onboarding/OnboardingStep.jsx");
/* harmony import */ var _components_Common_Calendar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Common/Calendar */ "./src/components/Common/Calendar.jsx");




const path = "/onboarding/style-widget";
const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__.createLazyFileRoute)(path)({
  component: () => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_components_Onboarding_OnboardingStep__WEBPACK_IMPORTED_MODULE_1__["default"], {
      path: path,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("What's your style?", "simplybook"),
      buttonLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Next Step: Finish", "simplybook"),
      rightColumn: /*#__PURE__*/React.createElement("div", {
        className: "h-full"
      }, /*#__PURE__*/React.createElement(_components_Common_Calendar__WEBPACK_IMPORTED_MODULE_2__["default"], null))
    }));
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
/* harmony import */ var _radix_ui_react_label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-label */ "./node_modules/@radix-ui/react-label/dist/index.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Errors_Error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Errors/Error */ "./src/components/Errors/Error.jsx");





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
    _d = _a.requiredMessage,
    requiredMessage = _d === void 0 ? false : _d,
    _e = _a.type,
    type = _e === void 0 ? "text" : _e,
    children = _a.children;
  var wrapperClasses = ["flex w-full flex-col", className, "mb-4"].filter(Boolean).join(" ");
  var contentClasses = ["flex w-full flex-col", reverseLabel ? "flex-col-reverse" : ""].filter(Boolean).join(" ");
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: wrapperClasses,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: contentClasses,
      children: [type === 'checkbox' && children, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_label__WEBPACK_IMPORTED_MODULE_4__.Root, {
        className: "cursor-pointer pb-2 font-medium text-black text-label ",
        htmlFor: inputId,
        children: [label, requiredMessage]
      }), help && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "pb-1 text-xs font-light text-gray-600",
        children: help
      }), type !== 'checkbox' && children]
    }), error && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Errors_Error__WEBPACK_IMPORTED_MODULE_3__["default"], {
      errorHeading: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Something wen't wrong...", "simplybook"),
      error: error
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
  var type = _a.type,
    children = _a.children,
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
  "rounded-full transition-all duration-200 p-4 cursor-pointer", {
    'bg-secondary text-white hover:bg-secondary-dark ': btnVariant === 'primary',
    'bg-tertiary text-white hover:bg-tertiary-dark ': btnVariant === 'secondary',
    'border-2 border-tertiary bg-transparent text-black hover:bg-tertiary-light ': btnVariant === 'tertiary'
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
    type: type,
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
var CheckboxInput = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (_a, ref) {
  var label = _a.label,
    className = _a.className,
    checked = _a.checked,
    value = _a.value,
    onChange = _a.onChange,
    props = __rest(_a, ["label", "className", "checked", "value", "onChange"]);
  // Change the absolute position depending if there's text next to the checkbox
  // Do we accept no text next to a checkbox?
  // Change it later to Tailwindcss v4 syntax
  var top = !label || label.length === 0 ? "0.5" : "1";
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
    className: "relative inline-flex items-center cursor-pointer",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", __assign({
      type: "checkbox",
      checked: checked,
      onChange: onChange,
      className: "sr-only peer"
    }, props)), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "w-10 h-6 bg-gray-200  peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-" + top + " after:left-0.5 after:bg-white after:border-gray-200 after:border after:rounded-full after:aspect-square after:h-4 after:w-4 after:transition-all"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "ml-2 leading-5 font-medium text-black text-label ".concat(className || ""),
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
    onClick: function (e) {
      return handleChange();
    },
    className: "cursor-pointer",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      className: "pb-1 font-medium text-black text-md ",
      children: label
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex space-x-2 pb-4",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "border border-gray-300 p-2 gap-2 flex",
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
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("select", __assign({
    className: "input-base",
    name: name,
    value: value,
    onChange: onChange,
    ref: ref
  }, props, {
    children: normalizedOptions.map(function (option) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
        value: option.value,
        children: option.label
      }, option.key);
    })
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
var TextInput = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (_a, ref) {
  var name = _a.name,
    placeholder = _a.placeholder,
    type = _a.type,
    className = _a.className,
    clickToSelect = _a.clickToSelect,
    props = __rest(_a, ["name", "placeholder", "type", "className", "clickToSelect"]);
  var _b = react__WEBPACK_IMPORTED_MODULE_1___default().useState(""),
    copiedFeedback = _b[0],
    setCopiedFeedback = _b[1];
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
      name: name,
      placeholder: placeholder,
      ref: ref,
      type: type,
      className: "input-base p-[0.5rem] shadow-md text-base border-2 border-gray-200 focus:border-tertiary focus:outline-hidden focus:ring disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 ".concat(className || ""),
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
/* harmony import */ var _api_endpoints_getDomain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/endpoints/getDomain */ "./src/api/endpoints/getDomain.js");
/* harmony import */ var _useOnboardingData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useOnboardingData */ "./src/hooks/useOnboardingData.js");
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



var useDomainData = function () {
  var _a, _b;
  var onboardingCompleted = (0,_useOnboardingData__WEBPACK_IMPORTED_MODULE_1__["default"])().onboardingCompleted;
  var query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
    queryKey: ["domain_data"],
    queryFn: function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!onboardingCompleted) {
                return [2 /*return*/, ''];
              }
              return [4 /*yield*/, (0,_api_endpoints_getDomain__WEBPACK_IMPORTED_MODULE_0__["default"])()];
            case 1:
              response = _a.sent();
              console.log("getdomain response", response);
              return [2 /*return*/, response];
          }
        });
      });
    },
    staleTime: 1000 * 60 * 60,
    retry: 0,
    enabled: !!onboardingCompleted
  });
  return {
    domain: query.data,
    domainFetched: ((_b = (_a = query.data) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0
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
/* harmony import */ var _api_endpoints_getLoginUrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/endpoints/getLoginUrl */ "./src/api/endpoints/getLoginUrl.js");
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
  simplybook_dashboard_url: ""
};
var useLoginData = function () {
  var queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();
  var query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
    // Set the key where to store the data
    queryKey: ["login_data"],
    // Run the query
    queryFn: function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, (0,_api_endpoints_getLoginUrl__WEBPACK_IMPORTED_MODULE_0__["default"])()];
            case 1:
              response = _a.sent();
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
            queryClient.setQueryData(["login_data"], response.data);
            return [2 /*return*/, response.data];
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

/***/ "./src/types/LoginData.ts":
/*!********************************!*\
  !*** ./src/types/LoginData.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ })

}]);
//# sourceMappingURL=src_routes_onboarding_style-widget_lazy_jsx.js.map