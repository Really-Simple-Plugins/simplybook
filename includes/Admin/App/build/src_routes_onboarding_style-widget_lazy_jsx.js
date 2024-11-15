"use strict";
(self["webpackChunksimplybook_app"] =
  self["webpackChunksimplybook_app"] || []).push([
  ["src_routes_onboarding_style-widget_lazy_jsx"],
  {
    /***/ "./src/components/Fields/TextField.jsx":
      /*!*********************************************!*\
  !*** ./src/components/Fields/TextField.jsx ***!
  \*********************************************/
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
        /* harmony import */ var _Inputs_TextInput__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../Inputs/TextInput */ "./src/components/Inputs/TextInput.tsx",
          );
        /* harmony import */ var _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../Forms/FieldWrapper */ "./src/components/Forms/FieldWrapper.jsx",
          );

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
        const TextField = (0, react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
          (
            { field, fieldState, label, help, context, className, ...props },
            ref,
          ) => {
            // Generate a unique ID for the input if not provided
            const inputId = props.id || field.name;
            return (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
              _Forms_FieldWrapper__WEBPACK_IMPORTED_MODULE_2__["default"],
              {
                label: label,
                help: help,
                error: fieldState.error?.message,
                context: context,
                className: className,
                inputId: inputId,
              },
              (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                _Inputs_TextInput__WEBPACK_IMPORTED_MODULE_1__["default"],
                {
                  ...field,
                  id: inputId,
                  type: "text",
                  ...props,
                },
              ),
            );
          },
        );
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          TextField;

        /***/
      },

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

    /***/ "./src/routes/onboarding/style-widget.lazy.jsx":
      /*!*****************************************************!*\
  !*** ./src/routes/onboarding/style-widget.lazy.jsx ***!
  \*****************************************************/
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
        /* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js",
          );
        /* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
        /* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__,
          );
        /* harmony import */ var _components_Inputs_TextInput__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../../components/Inputs/TextInput */ "./src/components/Inputs/TextInput.tsx",
          );
        /* harmony import */ var _components_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../../components/Inputs/ButtonInput */ "./src/components/Inputs/ButtonInput.tsx",
          );
        /* harmony import */ var _components_Fields_TextField__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ../../components/Fields/TextField */ "./src/components/Fields/TextField.jsx",
          );

        const Route = (0,
        _tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.createLazyFileRoute)(
          "/onboarding/style-widget",
        )({
          component: () => {
            return (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
              react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
              null,
              (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                "div",
                {
                  className:
                    "col-span-4 col-start-3 row-span-2 my-12 flex flex-col text-black",
                },
                (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                  "div",
                  {
                    className: "my-1 text-center",
                  },
                  (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                    "h2",
                    {
                      className: "mt-6 text-base",
                    },
                    (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(
                      "Alpha Bedum Beauty & Welness",
                    ),
                  ),
                  (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                    "h1",
                    {
                      className: "mt-2 text-2xl font-bold",
                    },
                    (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(
                      "What's your style?",
                      "simplybook",
                    ),
                  ),
                ),
                (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                  "div",
                  {
                    className: "grid grid-cols-2 gap-3 my-8",
                  },
                  (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                    _components_Fields_TextField__WEBPACK_IMPORTED_MODULE_4__[
                      "default"
                    ],
                    {
                      className: "col-span-2",
                      label: (0,
                      _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(
                        "Company Name",
                        "simplybook",
                      ),
                      value: "My Business Name",
                      context: (0,
                      _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(
                        "More customisation available under settings",
                        "simplybook",
                      ),
                    },
                  ),
                ),
                (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                  _components_Inputs_ButtonInput__WEBPACK_IMPORTED_MODULE_3__[
                    "default"
                  ],
                  {
                    onClick: () => {},
                    link: {
                      to: "/onboarding/implementation",
                    },
                  },
                  (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(
                    "Next Step: Finish",
                    "simplybook",
                  ),
                ),
              ),
              (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
                "div",
                {
                  className: "col-span-4 col-start-7 py-12",
                },
                "Calender hier",
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

    /***/ "./src/components/Inputs/TextInput.tsx":
      /*!*********************************************!*\
  !*** ./src/components/Inputs/TextInput.tsx ***!
  \*********************************************/
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
         * Styled text input component
         * @param props - Props for the input component
         * @returns {JSX.Element} The rendered input element
         */
        var TextInput = (0, react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
          function (_a, ref) {
            var _b = _a.type,
              type = _b === void 0 ? "text" : _b,
              props = __rest(_a, ["type"]);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              "input",
              __assign(
                {
                  ref: ref,
                  type: type,
                  className:
                    "w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200",
                },
                props,
              ),
            );
          },
        );
        TextInput.displayName = "TextInput";
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          TextInput;

        /***/
      },

    /***/ "./node_modules/@radix-ui/react-compose-refs/dist/index.mjs":
      /*!******************************************************************!*\
  !*** ./node_modules/@radix-ui/react-compose-refs/dist/index.mjs ***!
  \******************************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ composeRefs: () => /* binding */ composeRefs,
          /* harmony export */ useComposedRefs: () =>
            /* binding */ useComposedRefs,
          /* harmony export */
        });
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! react */ "react");
        // packages/react/compose-refs/src/composeRefs.tsx

        function setRef(ref, value) {
          if (typeof ref === "function") {
            ref(value);
          } else if (ref !== null && ref !== void 0) {
            ref.current = value;
          }
        }
        function composeRefs(...refs) {
          return (node) => refs.forEach((ref) => setRef(ref, node));
        }
        function useComposedRefs(...refs) {
          return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
            composeRefs(...refs),
            refs,
          );
        }

        //# sourceMappingURL=index.mjs.map

        /***/
      },

    /***/ "./node_modules/@radix-ui/react-label/dist/index.mjs":
      /*!***********************************************************!*\
  !*** ./node_modules/@radix-ui/react-label/dist/index.mjs ***!
  \***********************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Label: () => /* binding */ Label,
          /* harmony export */ Root: () => /* binding */ Root,
          /* harmony export */
        });
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! react */ "react");
        /* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @radix-ui/react-primitive */ "./node_modules/@radix-ui/react-primitive/dist/index.mjs",
          );
        /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js",
          );
        ("use client");

        // packages/react/label/src/Label.tsx

        var NAME = "Label";
        var Label = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
          (props, forwardedRef) => {
            return /* @__PURE__ */ (0,
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
              _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__.Primitive
                .label,
              {
                ...props,
                ref: forwardedRef,
                onMouseDown: (event) => {
                  const target = event.target;
                  if (target.closest("button, input, select, textarea")) return;
                  props.onMouseDown?.(event);
                  if (!event.defaultPrevented && event.detail > 1)
                    event.preventDefault();
                },
              },
            );
          },
        );
        Label.displayName = NAME;
        var Root = Label;

        //# sourceMappingURL=index.mjs.map

        /***/
      },

    /***/ "./node_modules/@radix-ui/react-primitive/dist/index.mjs":
      /*!***************************************************************!*\
  !*** ./node_modules/@radix-ui/react-primitive/dist/index.mjs ***!
  \***************************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Primitive: () => /* binding */ Primitive,
          /* harmony export */ Root: () => /* binding */ Root,
          /* harmony export */ dispatchDiscreteCustomEvent: () =>
            /* binding */ dispatchDiscreteCustomEvent,
          /* harmony export */
        });
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! react */ "react");
        /* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! react-dom */ "react-dom");
        /* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! @radix-ui/react-slot */ "./node_modules/@radix-ui/react-slot/dist/index.mjs",
          );
        /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js",
          );
        // packages/react/primitive/src/Primitive.tsx

        var NODES = [
          "a",
          "button",
          "div",
          "form",
          "h2",
          "h3",
          "img",
          "input",
          "label",
          "li",
          "nav",
          "ol",
          "p",
          "span",
          "svg",
          "ul",
        ];
        var Primitive = NODES.reduce((primitive, node) => {
          const Node = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
            (props, forwardedRef) => {
              const { asChild, ...primitiveProps } = props;
              const Comp = asChild
                ? _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__.Slot
                : node;
              if (typeof window !== "undefined") {
                window[Symbol.for("radix-ui")] = true;
              }
              return /* @__PURE__ */ (0,
              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Comp, {
                ...primitiveProps,
                ref: forwardedRef,
              });
            },
          );
          Node.displayName = `Primitive.${node}`;
          return { ...primitive, [node]: Node };
        }, {});
        function dispatchDiscreteCustomEvent(target, event) {
          if (target)
            react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(() =>
              target.dispatchEvent(event),
            );
        }
        var Root = Primitive;

        //# sourceMappingURL=index.mjs.map

        /***/
      },

    /***/ "./node_modules/@radix-ui/react-slot/dist/index.mjs":
      /*!**********************************************************!*\
  !*** ./node_modules/@radix-ui/react-slot/dist/index.mjs ***!
  \**********************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Root: () => /* binding */ Root,
          /* harmony export */ Slot: () => /* binding */ Slot,
          /* harmony export */ Slottable: () => /* binding */ Slottable,
          /* harmony export */
        });
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! react */ "react");
        /* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! @radix-ui/react-compose-refs */ "./node_modules/@radix-ui/react-compose-refs/dist/index.mjs",
          );
        /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js",
          );
        // packages/react/slot/src/Slot.tsx

        var Slot = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
          (props, forwardedRef) => {
            const { children, ...slotProps } = props;
            const childrenArray =
              react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(children);
            const slottable = childrenArray.find(isSlottable);
            if (slottable) {
              const newElement = slottable.props.children;
              const newChildren = childrenArray.map((child) => {
                if (child === slottable) {
                  if (
                    react__WEBPACK_IMPORTED_MODULE_0__.Children.count(
                      newElement,
                    ) > 1
                  )
                    return react__WEBPACK_IMPORTED_MODULE_0__.Children.only(
                      null,
                    );
                  return react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(
                    newElement,
                  )
                    ? newElement.props.children
                    : null;
                } else {
                  return child;
                }
              });
              return /* @__PURE__ */ (0,
              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SlotClone, {
                ...slotProps,
                ref: forwardedRef,
                children: react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(
                  newElement,
                )
                  ? react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(
                      newElement,
                      void 0,
                      newChildren,
                    )
                  : null,
              });
            }
            return /* @__PURE__ */ (0,
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SlotClone, {
              ...slotProps,
              ref: forwardedRef,
              children,
            });
          },
        );
        Slot.displayName = "Slot";
        var SlotClone = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
          (props, forwardedRef) => {
            const { children, ...slotProps } = props;
            if (react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(children)) {
              const childrenRef = getElementRef(children);
              return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, {
                ...mergeProps(slotProps, children.props),
                // @ts-ignore
                ref: forwardedRef
                  ? (0,
                    _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__.composeRefs)(
                      forwardedRef,
                      childrenRef,
                    )
                  : childrenRef,
              });
            }
            return react__WEBPACK_IMPORTED_MODULE_0__.Children.count(children) >
              1
              ? react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null)
              : null;
          },
        );
        SlotClone.displayName = "SlotClone";
        var Slottable = ({ children }) => {
          return /* @__PURE__ */ (0,
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,
            { children },
          );
        };
        function isSlottable(child) {
          return (
            react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(child) &&
            child.type === Slottable
          );
        }
        function mergeProps(slotProps, childProps) {
          const overrideProps = { ...childProps };
          for (const propName in childProps) {
            const slotPropValue = slotProps[propName];
            const childPropValue = childProps[propName];
            const isHandler = /^on[A-Z]/.test(propName);
            if (isHandler) {
              if (slotPropValue && childPropValue) {
                overrideProps[propName] = (...args) => {
                  childPropValue(...args);
                  slotPropValue(...args);
                };
              } else if (slotPropValue) {
                overrideProps[propName] = slotPropValue;
              }
            } else if (propName === "style") {
              overrideProps[propName] = { ...slotPropValue, ...childPropValue };
            } else if (propName === "className") {
              overrideProps[propName] = [slotPropValue, childPropValue]
                .filter(Boolean)
                .join(" ");
            }
          }
          return { ...slotProps, ...overrideProps };
        }
        function getElementRef(element) {
          let getter = Object.getOwnPropertyDescriptor(
            element.props,
            "ref",
          )?.get;
          let mayWarn =
            getter && "isReactWarning" in getter && getter.isReactWarning;
          if (mayWarn) {
            return element.ref;
          }
          getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
          mayWarn =
            getter && "isReactWarning" in getter && getter.isReactWarning;
          if (mayWarn) {
            return element.props.ref;
          }
          return element.props.ref || element.ref;
        }
        var Root = Slot;

        //# sourceMappingURL=index.mjs.map

        /***/
      },
  },
]);
//# sourceMappingURL=src_routes_onboarding_style-widget_lazy_jsx.js.map
