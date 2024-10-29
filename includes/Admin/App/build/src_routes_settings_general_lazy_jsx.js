"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_settings_general_lazy_jsx"],{

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
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _hooks_useSettingsData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useSettingsData */ "./src/hooks/useSettingsData.js");
/* harmony import */ var _components_Blocks_Block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Blocks/Block */ "./src/components/Blocks/Block.jsx");
/* harmony import */ var _components_Blocks_BlockHeading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Blocks/BlockHeading */ "./src/components/Blocks/BlockHeading.jsx");
/* harmony import */ var _components_Blocks_BlockContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Blocks/BlockContent */ "./src/components/Blocks/BlockContent.jsx");







const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.createLazyFileRoute)("/settings/general")({
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
  if (isLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading settings...");
  }
  if (isError) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Error loading settings");
  }

  // only get settings for the current menu_id
  const currentSettings = settings[menu_id];

  // loop through object currentSettings and create groups of settings, loop
  // again for fields

  const lastBlockClass = "rounded-b-none";
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, currentSettings && Object.keys(currentSettings).map(group => {
    const isLastGroup = Object.keys(currentSettings).indexOf(group) === Object.keys(currentSettings).length - 1;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Blocks_Block__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: group,
      title: group,
      className: isLastGroup ? lastBlockClass : "mb-5"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Blocks_BlockHeading__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: group
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Blocks_BlockContent__WEBPACK_IMPORTED_MODULE_4__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Group: ", group)));
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sticky bg-white shadow-md rounded-b-md z-10"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ScrollProgressLine, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-row p-5 justify-end"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: saveSettings,
    disabled: isSaving
  }, isSaving ? "Saving..." : "Save"), isSaving && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Saving..."))));
};
const ScrollProgressLine = () => {
  const [scrollProgress, setScrollProgress] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.round(window.scrollY / scrollable * 100));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const canScroll = document.documentElement.scrollHeight > window.innerHeight;
  if (!canScroll) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-full bg-gray-200 h-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-blue-500 h-full",
    style: {
      width: `${Math.max(scrollProgress, 10)}%`
    }
  }));
};

/***/ })

}]);
//# sourceMappingURL=src_routes_settings_general_lazy_jsx.js.map