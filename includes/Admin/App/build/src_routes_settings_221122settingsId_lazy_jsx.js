"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_settings_221122settingsId_lazy_jsx"],{

/***/ "./src/routes/settings/221122settingsId.lazy.jsx":
/*!*******************************************************!*\
  !*** ./src/routes/settings/221122settingsId.lazy.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

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
const Route = createLazyFileRoute('/settings/221122settingsId')({
  loader: ({
    params
  }) => useSettingsLoader(params.settingsId),
  component: Settings
});

// Settings Component
function Settings() {
  const {
    currentSettings,
    settingsIsLoading,
    updateSettings,
    settingsIsUpdating,
    defaultValues
  } = useSettingsData();
  // @todo make sure defaultValues is not empty before using it. I should make it a new component and wrap it in a conditional
  const {
    menuIsError,
    menuIsLoading,
    currentSection
  } = useSettingsMenu();
  console.log('defaultValues', defaultValues);
  if (menuIsLoading) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  if (menuIsError) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Error loading settings menu");
  const handleFormSubmit = values => {
    updateSettings(values, {
      onSuccess: () => reset()
    });
  };
  const lastGroup = currentSection.groups[currentSection.groups.length - 1];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, currentSection.groups?.map(group => {
    const isLastGroup = lastGroup.id === group.id;
    // const groupSettings = currentSettings.filter(
    //     (setting) => setting.group_id === group.id
    // );
    const className = isLastGroup ? 'rounded-b-none' : 'mb-5';
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Block, {
      key: group.id,
      className: className
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockHeading, {
      title: group.title
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockContent, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "flex flex-wrap"
    }, groupSettings.map(setting => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Controller, {
      key: setting.id,
      name: setting.id,
      control: control,
      render: ({
        field
      }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FormField, {
        setting: setting,
        ...field,
        settingsIsUpdating: settingsIsUpdating
      })
    })))));
  }));
}

/***/ })

}]);
//# sourceMappingURL=src_routes_settings_221122settingsId_lazy_jsx.js.map