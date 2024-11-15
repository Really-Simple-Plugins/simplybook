"use strict";
(self["webpackChunksimplybook_app"] =
  self["webpackChunksimplybook_app"] || []).push([
  ["src_routes_onboarding_create-your-account_lazy_jsx"],
  {
    /***/ "./src/components/Forms/FieldWrapper.jsx":
      /*!***********************************************!*\
  !*** ./src/components/Forms/FieldWrapper.jsx ***!
  \***********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! react */ "react");
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            react__WEBPACK_IMPORTED_MODULE_0__,
          );
        /* harmony import */ var _radix_ui_react_label__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! @radix-ui/react-label */ "./node_modules/@radix-ui/react-label/dist/index.mjs",
          );

        /**
         * FieldWrapper component
         * @param {string} label
         * @param {string} context
         * @param {string} help
         * @param {string} error
         * @param {boolean} reverseLabel
         * @param {string} className
         * @param {string} inputId
         * @param {JSX.Element} children
         */
        const FieldWrapper = ({
          label,
          context,
          help,
          error,
          reverseLabel = false,
          className = "",
          inputId,
          children,
        }) => {
          const colReverse = reverseLabel ? "flex-col-reverse" : "";
          return (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
            "div",
            {
              className: `flex flex-col w-full ${className} pt-4`,
            },
            (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
              "div",
              {
                className: `flex w-full flex-col ${colReverse}`,
              },
              (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                _radix_ui_react_label__WEBPACK_IMPORTED_MODULE_1__.Root,
                {
                  className: "font-medium text-gray-700 cursor-pointer pb-1",
                  htmlFor: inputId, // Associate the label with the input ID
                },
                label,
              ),
              help &&
                (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                  "p",
                  {
                    className: "text-xs font-light text-gray-600 pb-1",
                  },
                  help,
                ), // Placeholder for the help component
              children,
            ),
            error &&
              (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                "p",
                {
                  className: "w-full text-xs pb-1font-light text-red-600",
                },
                error,
              ),
            context &&
              (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                "p",
                {
                  className: "w-full pb-1 text-xs font-light text-gray-600",
                },
                context,
              ),
          );
        };
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          FieldWrapper;

        /***/
      },

    /***/ "./src/routes/onboarding/create-your-account.lazy.jsx":
      /*!************************************************************!*\
  !*** ./src/routes/onboarding/create-your-account.lazy.jsx ***!
  \************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Route: () => /* binding */ Route,
          /* harmony export */
        });
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! react */ "react");
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            react__WEBPACK_IMPORTED_MODULE_0__,
          );
        /* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js",
          );
        /* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
        /* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__,
          );
        /* harmony import */ var _components_Inputs_SwitchInput__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../../components/Inputs/SwitchInput */ "./src/components/Inputs/SwitchInput.tsx",
          );
        /* harmony import */ var _components_Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../../components/Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.jsx",
          );
        /* harmony import */ var _components_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ../../components/Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.tsx",
          );
        Object(
          (function webpackMissingModule() {
            var e = new Error(
              "Cannot find module '../../components/Fields/EmailField'",
            );
            e.code = "MODULE_NOT_FOUND";
            throw e;
          })(),
        );
        Object(
          (function webpackMissingModule() {
            var e = new Error(
              "Cannot find module '../../components/Fields/SwitchField'",
            );
            e.code = "MODULE_NOT_FOUND";
            throw e;
          })(),
        );

        const Route = (0,
        _tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__.createLazyFileRoute)(
          "/onboarding/create-your-account",
        )({
          component: () => {
            return (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
              react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
              null,
              (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                "div",
                {
                  className:
                    "col-span-4 col-start-3 my-12 flex flex-col text-black",
                },
                (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                  "div",
                  {
                    className: "my-6 text-center",
                  },
                  (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                    "h1",
                    {
                      className: "text-3xl font-semibold text-black",
                    },
                    (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(
                      "Create your free account",
                      "simplybook",
                    ),
                  ),
                  (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                    "h2",
                    {
                      className: "mt-2 text-base font-light text-black",
                    },
                    (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(
                      "100% free. No credit card needed.",
                      "simplybook",
                    ),
                  ),
                ),
                (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                  "div",
                  {
                    className: "flex flex-col",
                  },
                  (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                    Object(
                      (function webpackMissingModule() {
                        var e = new Error(
                          "Cannot find module '../../components/Fields/EmailField'",
                        );
                        e.code = "MODULE_NOT_FOUND";
                        throw e;
                      })(),
                    ),
                    {
                      label: (0,
                      _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(
                        "Email address",
                        "simplybook",
                      ),
                      help: (0,
                      _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(
                        "We'll never share your email with anyone else.",
                        "simplybook",
                      ),
                      placeholder: (0,
                      _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(
                        "Enter your email address",
                        "simplybook",
                      ),
                    },
                  ),
                  (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                    _components_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_4__[
                      "default"
                    ],
                    {
                      onClick: () => {},
                      link: {
                        to: "/onboarding/tips-and-tricks",
                      },
                    },
                    (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(
                      "Verify email",
                      "simplybook",
                    ),
                  ),
                  (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                    Object(
                      (function webpackMissingModule() {
                        var e = new Error(
                          "Cannot find module '../../components/Fields/SwitchField'",
                        );
                        e.code = "MODULE_NOT_FOUND";
                        throw e;
                      })(),
                    ),
                    {
                      label: (0,
                      _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(
                        "I have read the Terms & Conditions",
                        "simplybook",
                      ),
                      value: true,
                      onChange: () => {},
                    },
                  ),
                  (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                    "p",
                    {
                      className:
                        "mt-4 text-center text-xs font-light text-gray-600",
                    },
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
                  ),
                ),
              ),
              (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                "div",
                {
                  className: "col-span-4 col-start-7 row-span-2 my-12",
                },
                (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                  "iframe",
                  {
                    width: "100%",
                    className: "aspect-video",
                    src: "https://www.youtube-nocookie.com/embed/adYNTa9Gicw?si=A1cJfYkkfvlE9Yn0",
                    title: "YouTube video player",
                    frameborder: "0",
                    allow:
                      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                    referrerpolicy: "strict-origin-when-cross-origin",
                    allowfullscreen: true,
                  },
                ),
              ),
            );
          },
        });

        /***/
      },

    /***/ "./src/components/Inputs/ButtonInput.tsx":
      /*!***********************************************!*\
  !*** ./src/components/Inputs/ButtonInput.tsx ***!
  \***********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js",
          );
        var __assign =
          (undefined && undefined.__assign) ||
          function () {
            __assign =
              Object.assign ||
              function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
              };
            return __assign.apply(this, arguments);
          };
        var __rest =
          (undefined && undefined.__rest) ||
          function (s, e) {
            var t = {};
            for (var p in s)
              if (
                Object.prototype.hasOwnProperty.call(s, p) &&
                e.indexOf(p) < 0
              )
                t[p] = s[p];
            if (s != null && typeof Object.getOwnPropertySymbols === "function")
              for (
                var i = 0, p = Object.getOwnPropertySymbols(s);
                i < p.length;
                i++
              ) {
                if (
                  e.indexOf(p[i]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(s, p[i])
                )
                  t[p[i]] = s[p[i]];
              }
            return t;
          };

        /**
         * Styled button component
         */
        var ButtonInput = function (_a) {
          var children = _a.children,
            onClick = _a.onClick,
            _b = _a.btnVariant,
            btnVariant = _b === void 0 ? "primary" : _b,
            _c = _a.disabled,
            disabled = _c === void 0 ? false : _c,
            props = __rest(_a, [
              "children",
              "onClick",
              "btnVariant",
              "disabled",
            ]);
          // Base styles for both variants
          var baseStyles =
            "font-bold py-2 px-6 rounded-md transition-all duration-200";
          // Variants for primary and secondary buttons
          var variants = {
            primary:
              "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
            secondary:
              "border border-blue-600 text-blue-600 hover:bg-blue-100 active:bg-blue-200",
          };
          // Disabled styles
          var disabledStyles = "opacity-50 cursor-not-allowed";
          // Final className based on variant and disabled state
          var className = ""
            .concat(baseStyles, " ")
            .concat(variants[btnVariant], " ")
            .concat(disabled ? disabledStyles : "");
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            "button",
            __assign(
              {
                onClick: onClick,
                className: className,
                disabled: disabled,
              },
              props,
              {
                children: children,
              },
            ),
          );
        };
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          ButtonInput;

        /***/
      },

    /***/ "./src/components/Inputs/SwitchInput.tsx":
      /*!***********************************************!*\
  !*** ./src/components/Inputs/SwitchInput.tsx ***!
  \***********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js",
          );
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! react */ "react");
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            react__WEBPACK_IMPORTED_MODULE_1__,
          );
        /* harmony import */ var _radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @radix-ui/react-switch */ "./node_modules/@radix-ui/react-switch/dist/index.mjs",
          );

        /**
         * Styled switch input component
         * @param props - Props for the switch component
         * @returns {JSX.Element} The rendered switch component
         */
        var SwitchInput =
          react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(
            function (_a, ref) {
              var value = _a.value,
                onChange = _a.onChange;
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_2__.Root,
                {
                  ref: ref,
                  checked: value,
                  onChange: function (e) {
                    return onChange(e);
                  },
                  className:
                    "relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200",
                  children: (0,
                  react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_2__.Thumb,
                    {
                      className:
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    },
                  ),
                },
              );
            },
          );
        SwitchInput.displayName = "SwitchInput"; // Add a displayName for better debugging
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          SwitchInput;

        /***/
      },
  },
]);
//# sourceMappingURL=src_routes_onboarding_create-your-account_lazy_jsx.js.map
