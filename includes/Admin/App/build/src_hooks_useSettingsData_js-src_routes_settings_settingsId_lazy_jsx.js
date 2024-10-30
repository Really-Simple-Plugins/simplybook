"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_hooks_useSettingsData_js-src_routes_settings_settingsId_lazy_jsx"],{

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
/* harmony import */ var _routes_settings_$settingsId_lazy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../routes/settings/$settingsId.lazy */ "./src/routes/settings/$settingsId.lazy.jsx");



/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useSettingsData = () => {
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();

  // Query for fetching settings from server
  const query = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)({
    queryKey: ['settings_fields'],
    queryFn: () => {
      // @todo replace with actual api call.
      return new Promise((resolve, reject) => {
        console.log('call api');
        if (window.simplybook && window.simplybook.settings_fields) {
          resolve(window.simplybook.settings_fields);
        }
        reject(new Error('Settings not found'));
      });
    },
    staleTime: 1000 * 60 * 5,
    // 5 minutes
    initialData: window.simplybook && window.simplybook.settings_fields
  });

  // Update Mutation for settings data with destructured values
  const {
    mutate: saveSettings,
    isLoading: isSavingSettings
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({
    mutationFn: data => {
      console.log('mutate data', data);
      // Simulate async operation
      return new Promise(resolve => setTimeout(resolve, 10000));
    },
    onSuccess: () => {
      // Invalidate cache by specific query key for updated data
      queryClient.invalidateQueries(['settings_fields']);
    }
  });
  return {
    settings: query.data,
    saveSettings: saveSettings,
    isSavingSettings: isSavingSettings,
    invalidateSettings: () => queryClient.invalidateQueries(['settings_fields'])
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSettingsData);

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");




const useSettingsLoader = settingsId => {
  const menuData = window.simplybook?.settings_menu || [];
  const settingsData = menuData.find(item => item.id === settingsId);
  if (!settingsData) {
    throw new Error('Settings not found');
  }
  return {
    settingsData
  };
};

// Route Definition
const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_2__.createLazyFileRoute)('/settings/$settingsId')({
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
    saveSettings,
    isSavingSettings
  } = (0,_hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const {
    currentSection
  } = useSettingsMenu();
  const defaultValues = extractDefaultValues(settings, settingsId);
  console.log('defaultValues', defaultValues);
  console.log('settings', settings);
  // Initialize useForm with default values from the fetched settings data
  const {
    register,
    handleSubmit,
    formState
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useForm)({
    defaultValues: defaultValues
  });
  const onSubmit = formData => {
    saveSettings(formData); // Triggers the mutation to save settings
  };
  console.log('groups', groups);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    onSubmit: handleSubmit(onSubmit)
  }, groups?.map(group => {
    const isLastGroup = lastGroup.id === group.id;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: group.id
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, group.title), group.settings.map(setting => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: setting.id
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: setting.id
    }, setting.label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      id: setting.id,
      type: "text",
      ...register(setting.id)
    }))));
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "submit",
    disabled: isSavingSettings
  }, "Save"));
}
const extractDefaultValues = (settings, settingsId) => {
  // Extract default values from settings data where menu_id ===  settingsId
  const defaultValues = {};
  settings.forEach(setting => {
    if (setting.menu_id === settingsId) {
      defaultValues[setting.id] = setting.value;
    }
  });
  return defaultValues;
};

/***/ })

}]);
//# sourceMappingURL=src_hooks_useSettingsData_js-src_routes_settings_settingsId_lazy_jsx.js.map