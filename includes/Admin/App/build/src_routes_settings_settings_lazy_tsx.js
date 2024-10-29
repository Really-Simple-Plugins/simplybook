"use strict";
(self["webpackChunksimplybook_app"] = self["webpackChunksimplybook_app"] || []).push([["src_routes_settings_settings_lazy_tsx"],{

/***/ "./src/routes/settings/settings.lazy.tsx":
/*!***********************************************!*\
  !*** ./src/routes/settings/settings.lazy.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/link.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/Match.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/Blocks/BlockHeading.jsx'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/Header'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/Blocks/Block'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/Common/ErrorBoundary'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());







var Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__.createLazyFileRoute)('/settings/settings')({
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
  var settingsId = Route.useParams().settingsId;
  var linkClassName = 'py-2 px-5 border-l-4 text-black  border-transparent [&.active]:border-blue-500 focus:outline-none hover:border-gray-500 hover:bg-gray-100 focus:outline-none';
  var navigate = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__.useNavigate)({
    from: '/settings'
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/Header'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
      children: ["test: ", settingsId]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "flex mx-auto max-w-screen-2xl",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-12 grid-rows-5 gap-5 w-full min-h-full m-5",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/Blocks/Block'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
          colSpan: 3,
          rowSpan: 4,
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/Blocks/BlockHeading.jsx'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings', 'simplybook'),
            controls: null
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-col justify-start",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
              to: "/settings/general",
              className: linkClassName,
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('General', 'simplybook')
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
              to: "/settings/providers",
              className: linkClassName,
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Providers', 'simplybook')
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
              to: "/settings/services",
              className: linkClassName,
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Services', 'simplybook')
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
              to: "/settings/design",
              className: linkClassName,
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Design', 'simplybook')
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
              to: "/settings/notifications",
              className: linkClassName,
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Notifications', 'simplybook')
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
              to: "/settings/custom",
              className: linkClassName,
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom', 'simplybook')
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.Link, {
              to: "/settings/schedule",
              className: linkClassName,
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Schedule', 'simplybook')
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
              href: 'https://simplybook.me',
              className: linkClassName,
              children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bookings', 'simplybook'), " (O)"]
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "col-span-6  row-span-4 flex flex-col",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/Common/ErrorBoundary'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__.Outlet, {})
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "col-span-3 rounded-md row-span-4",
          children: "Hello from settings!"
        })]
      })
    })]
  });
}

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
//# sourceMappingURL=src_routes_settings_settings_lazy_tsx.js.map