/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _setting_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./setting.modal */ "./src/setting.modal.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);








function Edit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();
  const [isModalOpen, setIsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isPreviewOpen, setIsPreviewOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isUserAuthorized, setIsUserAuthorized] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [locations, setLocations] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [categories, setCategories] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [services, setServices] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [providers, setProviders] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [modalContent, setModalContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const previewModal = react__WEBPACK_IMPORTED_MODULE_6___default().createRef();
  const apiUrl = '/wp-json/simplybook/';
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchData = async endpoint => {
      const response = await fetch(apiUrl + endpoint);
      const data = await response.json();
      return data;
    };
    fetchData('is-authorized').then(setIsUserAuthorized);
    if (isUserAuthorized) {
      Promise.all([fetchData('locations'), fetchData('categories'), fetchData('services'), fetchData('providers')]).then(([locations, categories, services, providers]) => {
        setLocations(locations);
        setCategories(categories);
        setServices(services);
        setProviders(providers);
      });
    }
  }, [isUserAuthorized]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openPreview = () => setIsPreviewOpen(true);
  const closePreview = () => setIsPreviewOpen(false);
  const saveParameters = () => {
    setAttributes(attributes);
    closeModal();
  };
  const getBlockControls = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
    onClick: () => previewWidget(),
    icon: "visibility"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preview', 'simplybook'))));
  const previewWidget = () => {
    console.log('preview');
    let ajaxUrl = '/wp-admin/admin-ajax.php';
    let formData = new FormData();

    //action: sb_preview_widget
    //formData[predefined][provider]
    //formData[predefined][service]
    //formData[predefined][category]
    //formData[predefined][location]

    formData.append('action', 'sb_preview_widget');
    if (attributes.location) {
      formData.append('formData[predefined][location]', attributes.location);
    }
    if (attributes.category) {
      formData.append('formData[predefined][category]', attributes.category);
    }
    if (attributes.service) {
      formData.append('formData[predefined][service]', attributes.service);
    }
    if (attributes.provider) {
      formData.append('formData[predefined][provider]', attributes.provider);
    }
    formData.append('_wpnonce', window.simplybookData?.nonce);

    //convert to string  'orem=ipsum&name=binny';
    formData = new URLSearchParams(formData).toString();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', ajaxUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
        var data = JSON.parse(xhr.responseText);
        if (data && data.html) {
          //add html to modal by ref
          setModalContent(data.html);
          openPreview();
          setTimeout(() => {
            var scripts = document.getElementById('simplybook-preview-modal').getElementsByTagName('script');
            //check if script exists
            if (scripts.length === 0) {
              console.warn('No script found in widget preview');
              return;
            }
            //replace event DOMContentLoaded to custom event
            var scriptContent = scripts[0].innerHTML.replace('DOMContentLoaded', 'sbDOMContentLoaded');
            window.eval(scriptContent);
            //trigger custom event
            var event = new Event('sbDOMContentLoaded');
            document.dispatchEvent(event);
          }, 300);
        }
      }
    };
    xhr.send(formData);
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, getBlockControls(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'sb-widget-container'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Dashicon, {
    icon: "simplybook",
    size: 25,
    className: "sb-widget-icon"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: 'wp-sb-title wp-sb-title_h3 sb-widget-title'
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('SimplyBook.me Widget', 'simplybook')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wp-sb-txt wp-sb--p wp-sb--p_secondary --subtitle"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Easily customize and streamline your booking process with predefined options for services, providers, categories and locations.', 'simplybook')), !isUserAuthorized ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "sb-widget-alert"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You are not authorized in ', 'simplybook'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "/wp-admin/admin.php?page=simplybook-integration"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('SimplyBook.me plugin', 'simplybook'))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, locations.length > 0 && attributes.location ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wp-sb--p sb-widget-predefined sb-widget-location"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Location: ', 'simplybook') + locations.find(loc => loc.id === attributes.location).name) : null, categories.length > 0 && attributes.category ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wp-sb--p sb-widget-predefined sb-widget-category"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Category: ', 'simplybook') + categories.find(cat => cat.id === attributes.category).name) : null, services.length > 0 && attributes.service ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wp-sb--p sb-widget-predefined sb-widget-service"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Service: ', 'simplybook') + services.find(serv => serv.id === attributes.service).name) : null, providers.length > 0 && attributes.provider ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wp-sb--p sb-widget-predefined sb-widget-provider"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Provider: ', 'simplybook') + providers.find(prov => prov.id === attributes.provider).name) : null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    onClick: openModal,
    className: "sb-widget-edit-btn",
    isPrimary: true
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Edit predefined parameters', 'simplybook')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      clear: 'both'
    }
  })))), isModalOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_setting_modal__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isUserAuthorized: isUserAuthorized,
    locations: locations,
    categories: categories,
    services: services,
    providers: providers,
    attributes: attributes,
    setAttributes: setAttributes,
    saveParameters: saveParameters,
    closeModal: closeModal
  }), isPreviewOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Modal, {
    className: "sb-widget-modal sb-widget-preview-modal",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('WidgetPreview', 'simplybook'),
    onRequestClose: closePreview,
    ref: previewModal
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: modalContent
    },
    id: "simplybook-preview-modal"
  })))));
}

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


function save() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null));
}

/***/ }),

/***/ "./src/setting.modal.js":
/*!******************************!*\
  !*** ./src/setting.modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SettingsModal)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




function SettingsModal(options) {
  var {
    isUserAuthorized,
    locations,
    categories,
    services,
    providers,
    attributes,
    setAttributes,
    closeModal,
    saveParameters
  } = options;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Modal, {
    className: "sb-widget-modal",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit predefined parameters', 'simplybook'),
    onRequestClose: closeModal
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, null, !isUserAuthorized ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "sb-widget-alert"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('You are not authorized in ', 'simplybook'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "/wp-admin/admin.php?page=simplybook-integration"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('SimplyBook.me plugin', 'simplybook'))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-sb-popup-info"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wp-sb--p"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This feature allows you to customize your booking widget specifically for a service, provider, category, or location.', 'simplybook')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wp-sb--p"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('For example, if you have two services, A and B, and choose service A as predefined, the widget will open directly on that service, skipping the step of choosing a service. This is useful if you want to display only certain services on a specific page of your website. Note that if you select a provider not connected to the chosen service, the widget will not work. These settings will immediately apply to the widget, ensuring a streamlined booking process.', 'simplybook'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-sb-popup-predefine-form"
  }, locations.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Predefined location', 'simplybook'),
    value: attributes.location,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select location', 'simplybook'),
      value: 0
    }, ...locations.map(location => ({
      label: location.name,
      value: location.id
    }))],
    onChange: newLocation => setAttributes({
      location: parseInt(newLocation)
    })
  }), categories.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Predefined category', 'simplybook'),
    value: attributes.category,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select category', 'simplybook'),
      value: 0
    }, ...categories.map(category => ({
      label: category.name,
      value: category.id
    }))],
    onChange: newCategory => setAttributes({
      category: parseInt(newCategory)
    })
  }), services.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Predefined service', 'simplybook'),
    value: attributes.service,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select service', 'simplybook'),
      value: 0
    }, ...services.map(service => ({
      label: service.name,
      value: service.id
    }))],
    onChange: newService => setAttributes({
      service: parseInt(newService)
    })
  }), providers.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Predefined provider', 'simplybook'),
    value: attributes.provider,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select provider', 'simplybook'),
      value: 0
    }, ...providers.map(provider => ({
      label: provider.name,
      value: provider.id
    }))],
    onChange: newProvider => {
      if (newProvider === 'any') {
        setAttributes({
          provider: 'any'
        });
        return;
      }
      setAttributes({
        provider: parseInt(newProvider)
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-sb-popup-predefine-btnBar"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    onClick: saveParameters,
    className: "sb-widget-save-btn",
    isPrimary: true
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save', 'simplybook'))))));
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":2,"name":"simplybook/widget","title":"Simplybook Widget","category":"widgets","icon":"simplybook","description":"A widget for Simplybook.me","attributes":{"location":{"type":"number","default":0},"category":{"type":"number","default":0},"service":{"type":"number","default":0},"provider":{"type":"string","default":0}},"editorScript":"file:./index.js","editorStyle":"file:./editor.scss","style":"file:./style.scss"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/block.json");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"],
  attributes: _block_json__WEBPACK_IMPORTED_MODULE_3__.attributes
});
/******/ })()
;
//# sourceMappingURL=index.js.map