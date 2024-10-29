"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_hooks_useSettingsMenu_js-src_routes_settings_settingsId_lazy_tsx"],{

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);



/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useSettingsData = () => {
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();

  // Store for managing local changes before saving
  const [localSettings, setLocalSettings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});

  // Placeholder settings array to simulate settings from server
  const placeholderSettings = {
    'general': {
      'authentication': {
        'apiKey': {
          'label': 'API Key',
          'type': 'text',
          'value': '1234567890'
        },
        'apiSecret': {
          'label': 'API Secret',
          'type': 'text',
          'value': '1234567890'
        }
      },
      'widgets': {
        'bookings_page': {
          'label': 'Bookings Page',
          'type': 'text',
          'value': 'https://simplybook.me'
        },
        'calendar_page': {
          'label': 'Calendar Page',
          'type': 'text',
          'value': 'https://simplybook.me'
        },
        'short_code': {
          'label': 'Short Code',
          'type': 'text',
          'value': '1234567890'
        }
      }
    },
    'providers': {
      'name': {
        'label': 'Name',
        'type': 'text',
        'value': 'John Doe'
      },
      'email': {
        'label': 'Email',
        'type': 'email',
        'value': ''
      },
      'phone': {
        'label': 'Phone',
        'type': 'tel',
        'value': ''
      }
    }
  };

  // Placeholder function for fetching settings from server
  const fetchSettings = async () => {
    // Simulate an API call
    return new Promise((resolve, reject) => {
      // window.simplybook && window.simplybook.settings_fields
      if (window.simplybook && window.simplybook.settings_fields) {
        resolve(window.simplybook.settings_fields);
      }
      reject(new Error('Settings fields not found'));
    });
  };

  // Placeholder function for updating settings on server
  const updateSettings = async updatedSettings => {
    // Simulate an API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(updatedSettings);
      }, 1000);
    });
  };

  // Query for fetching settings from server
  const {
    data: settings,
    isLoading,
    isError
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
    queryKey: ['settings'],
    queryFn: fetchSettings,
    onSuccess: data => {
      // Set initial settings to state
      setLocalSettings(data);
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Mutation for updating settings on server
  const updateSettingsMutation = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({
    mutationFn: updateSettings,
    onSuccess: () => {
      // Invalidate and refetch settings after successful update
      queryClient.invalidateQueries(['settings']);
    }
  });

  /**
   * Function to handle updating local settings state.
   *
   * @param {string} key - The key of the setting to update.
   * @param {any} value - The new value for the setting.
   */
  const updateSetting = (key, value) => {
    setLocalSettings(prevSettings => ({
      ...prevSettings,
      [key]: value
    }));
  };

  /**
   * Function to save the updated settings to the server.
   */
  const saveSettings = () => {
    updateSettingsMutation.mutate(localSettings);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Sync localSettings with fetched settings
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);
  return {
    settings: localSettings,
    updateSetting,
    saveSettings,
    isLoading,
    isError,
    isSaving: updateSettingsMutation.isLoading
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
/* harmony import */ var _routes_settings_$settingsId_lazy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../routes/settings/$settingsId.lazy */ "./src/routes/settings/$settingsId.lazy.tsx");



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

/***/ "./src/routes/settings/$settingsId.lazy.tsx":
/*!**************************************************!*\
  !*** ./src/routes/settings/$settingsId.lazy.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _components_Blocks_BlockHeading_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Blocks/BlockHeading.jsx */ "./src/components/Blocks/BlockHeading.jsx");
/* harmony import */ var _components_Blocks_Block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Blocks/Block */ "./src/components/Blocks/Block.jsx");
/* harmony import */ var _hooks_useSettingsMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useSettingsMenu */ "./src/hooks/useSettingsMenu.js");
/* harmony import */ var _components_Blocks_BlockContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Blocks/BlockContent */ "./src/components/Blocks/BlockContent.jsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _components_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.jsx");









var Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_8__.createLazyFileRoute)('/settings/$settingsId')({
  // @todo move to a seperate function? or a hook?
  loader: function (_a) {
    var _b;
    var params = _a.params;
    // Instead of fetching from an API, we access the localized menu data
    var menuData = ((_b = window.simplybook) === null || _b === void 0 ? void 0 : _b.settings_menu) || [];
    var settingsData = menuData.find(function (item) {
      return item.id === params.settingsId;
    });
    if (!settingsData) {
      throw new Error('Settings not found');
    }
    return {
      settingsData: settingsData
    };
  },
  component: Settings
});
function Settings() {
  var _a = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_6__["default"])(),
    settings = _a.settings,
    saveSettings = _a.saveSettings,
    isSaving = _a.isSaving,
    isLoading = _a.isLoading;
  var _b = (0,_hooks_useSettingsMenu__WEBPACK_IMPORTED_MODULE_3__["default"])(),
    menu = _b.menu,
    menuIsError = _b.menuIsError,
    menuIsLoading = _b.menuIsLoading,
    currentSection = _b.currentSection;
  var settingsId = Route.useParams().settingsId;
  if (menuIsLoading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: "Loading..."
    });
  }
  if (menuIsError) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: "Error loading settings menu"
    });
  }
  var lastGroupId = currentSection.groups[currentSection.groups.length - 1].id;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [currentSection.groups && currentSection.groups.map(function (group) {
      // if last block add class
      var className = lastGroupId === group.id ? 'rounded-b-none' : 'mb-5';
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Blocks_Block__WEBPACK_IMPORTED_MODULE_2__["default"], {
        className: className,
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Blocks_BlockHeading_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
          title: group.title
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Blocks_BlockContent__WEBPACK_IMPORTED_MODULE_4__["default"], {
          children: isLoading ? 'Loading settings fields...' : group.title
        })]
      }, group.id);
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: 'sticky bg-gray-50 shadow-md rounded-b-md z-10',
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ScrollProgressLine, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: 'flex flex-row p-5 justify-end',
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_7__["default"], {
          onClick: saveSettings,
          disabled: isSaving,
          children: isSaving ? 'Saving...' : 'Save'
        }), isSaving && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: "Saving..."
        })]
      })]
    })]
  });
}
var ScrollProgressLine = function () {
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(0),
    scrollProgress = _a[0],
    setScrollProgress = _a[1];
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(function () {
    var onScroll = function () {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.round(window.scrollY / scrollable * 100));
    };
    window.addEventListener('scroll', onScroll);
    return function () {
      return window.removeEventListener('scroll', onScroll);
    };
  }, []);
  var canScroll = document.documentElement.scrollHeight > window.innerHeight;
  if (!canScroll) {
    return null;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "w-full bg-gray-200 h-1",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "bg-blue-500 h-full",
      style: {
        width: "".concat(Math.max(scrollProgress, 10), "%")
      }
    })
  });
};

/***/ })

}]);
//# sourceMappingURL=src_hooks_useSettingsMenu_js-src_routes_settings_settingsId_lazy_tsx.js.map