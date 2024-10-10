"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_onboarding_create-your-account_lazy_jsx"],{

/***/ "./src/components/Inputs/Button.jsx":
/*!******************************************!*\
  !*** ./src/components/Inputs/Button.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/link.js");


const Button = ({
  children,
  onClick,
  link = {},
  ...props
}) => {
  const className = "bg-red-500 hover:bg-red-700 hover:text-white text-white font-bold py-2 px-24 rounded-2xl max-w-xs mx-auto";
  if (link.to) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.Link, {
      to: link.to,
      className: className,
      ...props
    }, children);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: onClick,
    className: className,
    ...props
  }, children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./src/components/Inputs/InputText.jsx":
/*!*********************************************!*\
  !*** ./src/components/Inputs/InputText.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const InputText = ({
  value,
  onChange,
  ...props
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    value: value,
    onChange: onChange,
    ...props
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputText);

/***/ }),

/***/ "./src/routes/onboarding/create-your-account.lazy.jsx":
/*!************************************************************!*\
  !*** ./src/routes/onboarding/create-your-account.lazy.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Inputs_InputText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Inputs/InputText */ "./src/components/Inputs/InputText.jsx");
/* harmony import */ var _components_Inputs_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Inputs/Button */ "./src/components/Inputs/Button.jsx");





const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__.createLazyFileRoute)('/onboarding/create-your-account')({
  component: () => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-span-12 col-start-2 py-12 text-center flex flex-col"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
      className: "text-2xl font-bold mt-6"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Create your free account', 'simplybook')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "text-base mt-2 mb-8"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('100% free. No credit card needed.')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Inputs_InputText__WEBPACK_IMPORTED_MODULE_2__["default"], {
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Email address', 'simplybook')
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Inputs_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
      onClick: () => {},
      link: {
        to: '/onboarding/tips-and-tricks'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Verify email', 'simplybook'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-span-5 col-start-7 py-12"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
      width: "100%",
      className: "aspect-video",
      src: "https://www.youtube-nocookie.com/embed/adYNTa9Gicw?si=A1cJfYkkfvlE9Yn0",
      title: "YouTube video player",
      frameborder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      referrerpolicy: "strict-origin-when-cross-origin",
      allowfullscreen: true
    })));
  }
});

/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/link.js":
/*!**************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/link.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Link: () => (/* binding */ Link),
/* harmony export */   createLink: () => (/* binding */ createLink),
/* harmony export */   useLinkProps: () => (/* binding */ useLinkProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/react-router/dist/esm/utils.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./path.js */ "./node_modules/@tanstack/react-router/dist/esm/path.js");
"use client";







const preloadWarning = "Error preloading route! ☝️";
function useLinkProps(options, forwardedRef) {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const [isTransitioning, setIsTransitioning] = react__WEBPACK_IMPORTED_MODULE_1__.useState(false);
  const innerRef = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.useForwardedRef)(forwardedRef);
  const {
    // custom props
    activeProps = () => ({ className: "active" }),
    inactiveProps = () => ({}),
    activeOptions,
    hash,
    search,
    params,
    to,
    state,
    mask,
    preload: userPreload,
    preloadDelay: userPreloadDelay,
    replace,
    startTransition,
    resetScroll,
    viewTransition,
    // element props
    children,
    target,
    disabled,
    style,
    className,
    onClick,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    ignoreBlocker,
    ...rest
  } = options;
  const type = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => {
    try {
      new URL(`${to}`);
      return "external";
    } catch {
    }
    return "internal";
  }, [to]);
  const next = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
    () => router.buildLocation(options),
    [router, options]
  );
  const preload = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
    () => userPreload ?? router.options.defaultPreload,
    [router.options.defaultPreload, userPreload]
  );
  const preloadDelay = userPreloadDelay ?? router.options.defaultPreloadDelay ?? 0;
  const isActive = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (s) => {
      const currentPathSplit = (0,_path_js__WEBPACK_IMPORTED_MODULE_6__.removeTrailingSlash)(
        s.location.pathname,
        router.basepath
      ).split("/");
      const nextPathSplit = (0,_path_js__WEBPACK_IMPORTED_MODULE_6__.removeTrailingSlash)(
        next.pathname,
        router.basepath
      ).split("/");
      const pathIsFuzzyEqual = nextPathSplit.every(
        (d, i) => d === currentPathSplit[i]
      );
      const pathTest = (activeOptions == null ? void 0 : activeOptions.exact) ? (0,_path_js__WEBPACK_IMPORTED_MODULE_6__.exactPathTest)(s.location.pathname, next.pathname, router.basepath) : pathIsFuzzyEqual;
      const hashTest = (activeOptions == null ? void 0 : activeOptions.includeHash) ? s.location.hash === next.hash : true;
      const searchTest = (activeOptions == null ? void 0 : activeOptions.includeSearch) ?? true ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.deepEqual)(s.location.search, next.search, !(activeOptions == null ? void 0 : activeOptions.exact)) : true;
      return pathTest && hashTest && searchTest;
    }
  });
  const doPreload = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(() => {
    router.preloadRoute(options).catch((err) => {
      console.warn(err);
      console.warn(preloadWarning);
    });
  }, [options, router]);
  const preloadViewportIoCallback = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(
    (entry) => {
      if (entry == null ? void 0 : entry.isIntersecting) {
        doPreload();
      }
    },
    [doPreload]
  );
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.useIntersectionObserver)(
    innerRef,
    preloadViewportIoCallback,
    { rootMargin: "100px" },
    { disabled: !!disabled || preload !== "viewport" }
  );
  if (type === "external") {
    return {
      ...rest,
      ref: innerRef,
      type,
      href: to,
      ...children && { children },
      ...target && { target },
      ...disabled && { disabled },
      ...style && { style },
      ...className && { className },
      ...onClick && { onClick },
      ...onFocus && { onFocus },
      ...onMouseEnter && { onMouseEnter },
      ...onMouseLeave && { onMouseLeave },
      ...onTouchStart && { onTouchStart }
    };
  }
  const handleClick = (e) => {
    if (!disabled && !isCtrlEvent(e) && !e.defaultPrevented && (!target || target === "_self") && e.button === 0) {
      e.preventDefault();
      (0,react_dom__WEBPACK_IMPORTED_MODULE_2__.flushSync)(() => {
        setIsTransitioning(true);
      });
      const unsub = router.subscribe("onResolved", () => {
        unsub();
        setIsTransitioning(false);
      });
      router.commitLocation({
        ...next,
        replace,
        resetScroll,
        startTransition,
        viewTransition,
        ignoreBlocker
      });
    }
  };
  const handleFocus = (_) => {
    if (disabled) return;
    if (preload) {
      doPreload();
    }
  };
  const handleTouchStart = handleFocus;
  const handleEnter = (e) => {
    if (disabled) return;
    const eventTarget = e.target || {};
    if (preload) {
      if (eventTarget.preloadTimeout) {
        return;
      }
      eventTarget.preloadTimeout = setTimeout(() => {
        eventTarget.preloadTimeout = null;
        doPreload();
      }, preloadDelay);
    }
  };
  const handleLeave = (e) => {
    if (disabled) return;
    const eventTarget = e.target || {};
    if (eventTarget.preloadTimeout) {
      clearTimeout(eventTarget.preloadTimeout);
      eventTarget.preloadTimeout = null;
    }
  };
  const composeHandlers = (handlers) => (e) => {
    var _a;
    (_a = e.persist) == null ? void 0 : _a.call(e);
    handlers.filter(Boolean).forEach((handler) => {
      if (e.defaultPrevented) return;
      handler(e);
    });
  };
  const resolvedActiveProps = isActive ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.functionalUpdate)(activeProps, {}) ?? {} : {};
  const resolvedInactiveProps = isActive ? {} : (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.functionalUpdate)(inactiveProps, {});
  const resolvedClassName = [
    className,
    resolvedActiveProps.className,
    resolvedInactiveProps.className
  ].filter(Boolean).join(" ");
  const resolvedStyle = {
    ...style,
    ...resolvedActiveProps.style,
    ...resolvedInactiveProps.style
  };
  return {
    ...rest,
    ...resolvedActiveProps,
    ...resolvedInactiveProps,
    href: disabled ? void 0 : next.maskedLocation ? router.history.createHref(next.maskedLocation.href) : router.history.createHref(next.href),
    ref: innerRef,
    onClick: composeHandlers([onClick, handleClick]),
    onFocus: composeHandlers([onFocus, handleFocus]),
    onMouseEnter: composeHandlers([onMouseEnter, handleEnter]),
    onMouseLeave: composeHandlers([onMouseLeave, handleLeave]),
    onTouchStart: composeHandlers([onTouchStart, handleTouchStart]),
    disabled: !!disabled,
    target,
    ...Object.keys(resolvedStyle).length && { style: resolvedStyle },
    ...resolvedClassName && { className: resolvedClassName },
    ...disabled && {
      role: "link",
      "aria-disabled": true
    },
    ...isActive && { "data-status": "active", "aria-current": "page" },
    ...isTransitioning && { "data-transitioning": "transitioning" }
  };
}
function createLink(Comp) {
  return react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function CreatedLink(props, ref) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Link, { ...props, _asChild: Comp, ref });
  });
}
const Link = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(
  (props, ref) => {
    const { _asChild, ...rest } = props;
    const { type, ref: innerRef, ...linkProps } = useLinkProps(rest, ref);
    const children = typeof rest.children === "function" ? rest.children({
      isActive: linkProps["data-status"] === "active"
    }) : rest.children;
    if (typeof _asChild === "undefined") {
      delete linkProps.disabled;
    }
    return react__WEBPACK_IMPORTED_MODULE_1__.createElement(
      _asChild ? _asChild : "a",
      {
        ...linkProps,
        ref: innerRef
      },
      children
    );
  }
);
function isCtrlEvent(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}

//# sourceMappingURL=link.js.map


/***/ })

}]);
//# sourceMappingURL=src_routes_onboarding_create-your-account_lazy_jsx.js.map