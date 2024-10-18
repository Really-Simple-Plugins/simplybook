"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_settings_general_lazy_jsx"],{

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
  colSpan,
  rowSpan,
  children
}) => {
  const classes = `bg-white shadow-md rounded-md col-span-${colSpan} row-span-${rowSpan}`;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classes
  }, children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);

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
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(placeholderSettings);
      }, 1000);
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
    staleTime: 60000 // Keep data fresh for 1 minute
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

/***/ "./src/routes/settings/general.lazy.jsx":
/*!**********************************************!*\
  !*** ./src/routes/settings/general.lazy.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _components_Blocks_Block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Blocks/Block */ "./src/components/Blocks/Block.jsx");
/* harmony import */ var _components_Blocks_BlockHeading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Blocks/BlockHeading */ "./src/components/Blocks/BlockHeading.jsx");





const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__.createLazyFileRoute)('/settings/general')({
  component: () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Settings, {
    menu_id: "general"
  })
});
const Settings = ({
  menu_id
}) => {
  const {
    settings,
    updateSetting,
    saveSettings,
    isLoading,
    isSaving,
    isError
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_1__["default"])();
  if (isLoading) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading settings...");
  if (isError) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Error loading settings");

  // only get settings for the current menu_id
  const currentSettings = settings[menu_id];

  // loop through object currentSettings and create groups of settings, loop again for fields
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, currentSettings && Object.keys(currentSettings).map(group => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Blocks_Block__WEBPACK_IMPORTED_MODULE_2__["default"], {
    key: group,
    title: group
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Blocks_BlockHeading__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: group
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Group: ", group))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: saveSettings,
    disabled: isSaving
  }, isSaving ? 'Saving...' : 'Save'));
};

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/mutationObserver.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/mutationObserver.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MutationObserver: () => (/* binding */ MutationObserver)
/* harmony export */ });
/* harmony import */ var _mutation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mutation.js */ "./node_modules/@tanstack/query-core/build/modern/mutation.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/mutationObserver.ts




var MutationObserver = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  #client;
  #currentResult = void 0;
  #currentMutation;
  #mutateOptions;
  constructor(client, options) {
    super();
    this.#client = client;
    this.setOptions(options);
    this.bindMethods();
    this.#updateResult();
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    this.options = this.#client.defaultMutationOptions(options);
    if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.shallowEqualObjects)(this.options, prevOptions)) {
      this.#client.getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: this.#currentMutation,
        observer: this
      });
    }
    if (prevOptions?.mutationKey && this.options.mutationKey && (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hashKey)(prevOptions.mutationKey) !== (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hashKey)(this.options.mutationKey)) {
      this.reset();
    } else if (this.#currentMutation?.state.status === "pending") {
      this.#currentMutation.setOptions(this.options);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#currentMutation?.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    this.#updateResult();
    this.#notify(action);
  }
  getCurrentResult() {
    return this.#currentResult;
  }
  reset() {
    this.#currentMutation?.removeObserver(this);
    this.#currentMutation = void 0;
    this.#updateResult();
    this.#notify();
  }
  mutate(variables, options) {
    this.#mutateOptions = options;
    this.#currentMutation?.removeObserver(this);
    this.#currentMutation = this.#client.getMutationCache().build(this.#client, this.options);
    this.#currentMutation.addObserver(this);
    return this.#currentMutation.execute(variables);
  }
  #updateResult() {
    const state = this.#currentMutation?.state ?? (0,_mutation_js__WEBPACK_IMPORTED_MODULE_2__.getDefaultState)();
    this.#currentResult = {
      ...state,
      isPending: state.status === "pending",
      isSuccess: state.status === "success",
      isError: state.status === "error",
      isIdle: state.status === "idle",
      mutate: this.mutate,
      reset: this.reset
    };
  }
  #notify(action) {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      if (this.#mutateOptions && this.hasListeners()) {
        const variables = this.#currentResult.variables;
        const context = this.#currentResult.context;
        if (action?.type === "success") {
          this.#mutateOptions.onSuccess?.(action.data, variables, context);
          this.#mutateOptions.onSettled?.(action.data, null, variables, context);
        } else if (action?.type === "error") {
          this.#mutateOptions.onError?.(action.error, variables, context);
          this.#mutateOptions.onSettled?.(
            void 0,
            action.error,
            variables,
            context
          );
        }
      }
      this.listeners.forEach((listener) => {
        listener(this.#currentResult);
      });
    });
  }
};

//# sourceMappingURL=mutationObserver.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/useMutation.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/useMutation.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMutation: () => (/* binding */ useMutation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/query-core */ "./node_modules/@tanstack/query-core/build/modern/mutationObserver.js");
/* harmony import */ var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/query-core */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _QueryClientProvider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueryClientProvider.js */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/react-query/build/modern/utils.js");
"use client";

// src/useMutation.ts




function useMutation(options, queryClient) {
  const client = (0,_QueryClientProvider_js__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)(queryClient);
  const [observer] = react__WEBPACK_IMPORTED_MODULE_0__.useState(
    () => new _tanstack_query_core__WEBPACK_IMPORTED_MODULE_2__.MutationObserver(
      client,
      options
    )
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = react__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore(
    react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
      (onStoreChange) => observer.subscribe(_tanstack_query_core__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
    },
    [observer]
  );
  if (result.error && (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.shouldThrowError)(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}

//# sourceMappingURL=useMutation.js.map

/***/ })

}]);
//# sourceMappingURL=src_routes_settings_general_lazy_jsx.js.map