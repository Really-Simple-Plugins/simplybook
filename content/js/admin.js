
var SimplybookAdminInterface = function (options) {
    this.init(options);
};


jQuery.extend(SimplybookAdminInterface.prototype, {

    options : {
        login : 'simplydemo',
        apiUrl : 'https://user-api.simplybook.me/public',
        node : '.booking-system',
        template : 'default',
        themeparams : null,
    },

    keyTranslations : {
        "flexible_week": "Flexible weekly",
        "flexible_provider": "Flexible Provider",
        "modern": "Modern",
        "flexible": "Flexible",
        "modern_week": "Slots weekly",
        "grid_week": "Weekly classes",
        "classes_plugin": "Daily classes",
        "classes": "Modern provider",
        "as_slots": "as slots",
        "as_table": "as table",
       // "Display timeline": "Display calendar (for modern layout only)",
        "Display timeline": "Display calendar",
        "sb_base_color": "Base theme color",
        "Hide unavailable time" : "Show only available time",
        "Hide past days on calendar" : "Hide unavailable days on calendar",
        "Display timeline sidebar" : "Display calendar layout sidebar (some themes only)",
        "Image fit mode": "Image scale mode",
       // "Show end time" : "Show end time (for modern, slots weekly, modern provider, weekly & daily classes layouts only)",
    },

    api : null,
    apiReady : false,
    themes : null,
    timelines : null,
    domain : 'simplydemo.simplybook.me',

    node : null,
    errTimer : null,
    themeSettingsTemplate : null,
    ingoreSettingsKeys : ['main_page_mode'],
    sortSettingsTypes : ["select", "color", "base_color", "gradient", , "checkbox", "text"],

    init : function (opts) {
        this.options = jQuery.extend({}, this.options, opts);
        var _this = this;
        this.node = jQuery(this.options.node);

        if(this.options.login) {
            try {
                this.initApi(this.options.login, true, function () {
                    _this.initStartApiData(function () {
                        _this.initDom();
                        _this.initEvents();
                    });
                });
            } catch (e) {
                _this.showError(e);
            }
        } else {
            this.initDom();
            this.initEvents();
        }
    },

    isLocalStorageAvailable : function(){
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    },

    // Clear the cache
    clearCache: function () {
        if(this.isLocalStorageAvailable()) {
            localStorage.removeItem('apiData');
            localStorage.removeItem('apiDataExpiry');
        }
    },

    localStorageSet: function (key, value) {
        if(this.isLocalStorageAvailable()) {
            localStorage.setItem(key, value);
        }
    },

    localStorageGet: function (key) {
        if(this.isLocalStorageAvailable()) {
            return localStorage.getItem(key);
        }
        return undefined;
    },


    isApiCacheValid: function () {
        var _this = this;
        // Check if _this.options.login has changed, and clear the cache if it has
        var cachedLogin = _this.localStorageGet('cachedLogin');
        if (cachedLogin !== _this.options.login) {
            // Clear the cache
            _this.clearCache();
            _this.localStorageSet('cachedLogin', _this.options.login);
            return false;
        }

        // Check if data is already cached in localStorage
        var cachedData = _this.localStorageGet('apiData');
        var cacheExpiry = _this.localStorageGet('apiDataExpiry');

        if (cachedData && cacheExpiry) {
            var currentTime = new Date().getTime();
            if (currentTime < parseInt(cacheExpiry)) {
                return true;
            }
            // Cache has expired, clear it
            _this.clearCache();
        }

        return false;
    },

    initStartApiData: function (callback) {
        var _this = this;

        if(this.isApiCacheValid()){
            // Data is still valid, parse and use it
            // Check if data is already cached in localStorage
            var cachedData = _this.localStorageGet('apiData');
            var parsedData = JSON.parse(cachedData);
            _this.themes = parsedData.themes;
            _this.domain = parsedData.domain;
            _this.timelines = parsedData.timelines;
            _this.apiReady = true;
            callback();
            return; // Exit the function early
        }

        var error = function (error) {
            _this.apiReady = false;
            _this.showError(error);
            _this.hideLoader();
            callback();
        };

        this.showLoader();
        this.api.getThemeList(function (themes) {
            _this.themes = themes;
            _this.api.getCompanyDomain(_this.options.login, function (domain) {
                _this.domain = _this._prepareDomain(domain);
                _this.api.getTimelineList(function (timelines) {
                    _this.timelines = timelines;

                    // Cache the data with a 1-day expiration
                    var dataToCache = {
                        themes: _this.themes,
                        domain: _this.domain,
                        timelines: _this.timelines
                    };
                    _this.localStorageSet('apiData', JSON.stringify(dataToCache));

                    var expirationTime = new Date().getTime() + 1 * 60 * 60 * 1000; // 1 hour
                    _this.localStorageSet('apiDataExpiry', expirationTime.toString());

                    _this.hideLoader();
                    callback();
                }, error);
            }, error);
        }, error);
    },

    _prepareDomain : function(domain){
        // if(domain && String(domain).length && String(domain).indexOf('.')){
        //     var domainArr = String(domain).split('.');
        //
        //     if(domainArr && domainArr.length>2 && String(domainArr[1]).length === 2){
        //         domain = String(domain).replace('.' + domainArr[1] + '.', '.');
        //     }
        // }

        console.log(domain);
        return domain;
    },

    setViewApiData : function(){
        var _this = this;

        if( this.apiReady) {
            var serverNode = this.node.find(':input[name=server]');
            var themesContainer = jQuery('#themes-container');
            var timelineSelector = jQuery('#timeline_type');

            timelineSelector.on('change', function () {
                var timeline = jQuery(this).val();
                jQuery('#sb-settings-container').removeClass (function (index, className) {
                    return (className.match (/(^|\s)timeline-\S+/g) || []).join(' ');
                }).addClass('timeline-' + timeline);
            });

            jQuery.each(this.themes, function (num, theme) {
                var imageUrl = 'https://' + _this.domain + theme.image;
                var themeItem = jQuery(
                    "<input type='radio' class='theme-select' name='template' id='theme"+theme.name+"' value='"+theme.name+"' />" +
                    "<label class='theme-item' for='theme"+theme.name+"' id='label-theme"+theme.name+"'>" +
                        "<div class='name'>" + _this.__(theme.title) + "</div>" +
                        "<div class='image' style=\"background-image:url('" + imageUrl + "')\"></div>" +
                    "</label>"
                );
                themesContainer.append(themeItem);

                if(_this.options.template === theme.name){
                    themeItem.closest(':input').prop('checked', true);

                    //scroll to selected theme
                    setTimeout(function () {
                        var labelOffsetTop = jQuery("#label-theme" + theme.name).offset().top;
                        var themesContainerOffsetTop = themesContainer.offset().top;
                        var scrollTop = labelOffsetTop - themesContainerOffsetTop;
                        themesContainer.scrollTop(scrollTop);
                    }, 400);

                    _this.onTemplateSelect(theme.name);
                }
            });

            serverNode.val(this.domain);
            this.node.find('.api-data').removeClass('hidden');

            ///////////////////////////////////////////////

            timelineSelector.empty();

            if(!_this.options.timeline_type){
                _this.options.timeline_type = 'modern';
            }

            jQuery.each(_this.timelines, function (num, value) {
                timelineSelector.append(
                    "<option " + (value==_this.options.timeline_type?'selected="selected"':'') + " value='" + value + "'>" + _this.__(_this.keyTranslations[value]?_this.keyTranslations[value]:value) + "</option>"
                )
            });

        }
    },

    initDom : function(){
        var _this = this;
        //var res = this.api.getThemeList();
        //var res = this.api.getCompanyDomain(this.options.login);
        this.setViewApiData();

        //set default widget params to work widget
        if(!_this.options.themeparams && this.isLocalStorageAvailable()) {
            var cachedParams = this.localStorageGet('apiData');
            if (cachedParams) {
                setTimeout(function () {
                    var $form = jQuery('#sb-widget-form');
                    var formParams = _this._getFormData(true);
                    var formUrl = $form.attr('action');

                    //make POST ajax request
                    jQuery.ajax({
                        url: formUrl,
                        type: 'POST',
                        data: formParams,
                        success: function(response) {

                        }
                    });
                },300);
            }
        }
        _this._onPredefinedChange();

        _this._initDashboardTabs();
        _this._initCollapse();
        _this._initStickyBtnBar();
    },


    initEvents : function(){
        var _this = this;

        this.node.on('change keyup', ':input[name=login]', _.debounce(function () {
            var login = jQuery(this).val();
            _this.resetCompanyLogin(login);
        }, 2000));

        this.node.on('change', ':input[name=template]', function () {
            var template = jQuery(this).val();
            _this.options.themeparams = null;
            //todo: restore params if select old selected theme
            _this.onTemplateSelect(template);
        });

        this.node.on('change', 'input[type="checkbox"]', function(){
            //check if class custom-checkbox--input is exist

            if(jQuery(this).hasClass('custom-checkbox--input')){
                //add hidden input with value 0 or 1, check if hidden input already exist
                var hiddenInput = jQuery(this).closest('.custom-checkbox').find('input[type="hidden"]');
                if(!hiddenInput.length){
                    jQuery(this).after('<input type="hidden" name="'+jQuery(this).attr('name')+'" value="0">');
                    //remove name from checkbox
                    jQuery(this).removeAttr('name');
                } else {
                    hiddenInput.val(this.checked ? 1 : 0);
                }
            } else {
                jQuery(this).val(this.checked ? 1 : 0);
            }

        }).change();

        this.node.on('click', '#sb-reset', function () {
            _this.onTemplateSelect(_this.options.template, true);
        });

        this.node.on('change', '#predefined_location, #predefined_category, #predefined_provider, #predefined_service', function () {
            _this._onPredefinedChange();
        });

        this.node.on('click', '#sb-copy-shortcode', function () {
            var shortcode = '[simplybook_widget]';
            //add to clipboard
            var $temp = jQuery("<input>");
            jQuery("body").append($temp);
            $temp.val(shortcode).select();
            document.execCommand("copy");
            $temp.remove();

            jQuery(this).append('<span class="copied">Copied</span>').find('.copied').fadeOut(2000);
        });

        this.node.on('click', '#sb-copy-shortcode-predefined', function () {
            var shortcode = jQuery('.sb-widget-tag').text();
            console.log(shortcode);
            //add to clipboard
            var $temp = jQuery("<input>");
            jQuery("body").append($temp);
            $temp.val(shortcode).select();
            document.execCommand("copy");
            $temp.remove();

            jQuery(this).append('<span class="copied">Copied</span>').find('.copied').fadeOut(2000);
        });

        this.node.on('click', '.palette-item .color-view', function () {
            var key = jQuery(this).closest('.palette-item').data('key');

            var confirm = window.confirm(_this.__('Are you sure you want to apply this palette? It will overwrite some theme settings!'));

            if(confirm) {
                _this.onTemplateSelect(_this.options.template, false, key);
            }
        });

        this.node.on('click', '#sb-delete-page', function () {
            console.log(_this.options.deletePageUrl);
            var confirm = window.confirm(_this.__('Are you sure you want to delete default page with the widget? This action cannot be undone, and you will need to create a new page with the plugin widget.'));
            if(confirm) {
                jQuery.ajax({
                    url: _this.options.deletePageUrl,
                    type: 'POST',
                    data: {
                        _wpnonce: _this.options._wpnonce,
                    },
                    success: function(response) {
                        window.location.reload();
                    },
                });
            }
        });

        this.node.on('click', '#sb-logout', function (e) {
            e.preventDefault();
            var aLink = jQuery(this).attr('href');

            var confirm = window.confirm(_this.__('Are you sure you want to logout?'));
            if(confirm) {
                _this.clearLocalStorage();
                window.location.href = aLink;
            } else {
                return false;
            }
        });

        this.node.on('click', '#sb-preview', function () {
            var formData = _this._getFormData(true);

            jQuery.ajax({
                url: _this.options.ajaxurl,
                type: 'POST',
                data: _.extend({}, {
                    action: 'sb_preview_widget',
                    formData: formData,
                }),
                success: function(response) {
                    jQuery('#sb-preview-widget').remove();

                    var $div = jQuery('<div>', {
                        id: 'sb-preview-widget',
                        css: {
                            display: 'none',
                        },
                    });

                    $div.append(jQuery('<div>' + response.html + '</div>'));
                    $div.appendTo(_this.node);

                    var [width, height] = [jQuery(window.top).width() * 0.7, jQuery(window.top).height() * 0.7];

                    tb_show('Widget preview', '#TB_inline?width='+width+'&height='+height+'&inlineId=sb-preview-widget');
                    //trigger DOMContentLoaded
                    var DOMContentLoaded_event = document.createEvent("Event");
                    DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true);
                    window.document.dispatchEvent(DOMContentLoaded_event);


                    jQuery( 'body' ).one( 'thickbox:removed', function() {
                        jQuery('#sb-preview-widget').remove();
                    });
                },
            });
        });
    },

    _onPredefinedChange: function (){
        var _this = this;

        var $location = jQuery('#predefined_location'),
            $category = jQuery('#predefined_category'),
            $provider = jQuery('#predefined_provider'),
            $service = jQuery('#predefined_service'),
            $warn = jQuery('#sb-widget-install-predefined .booking-system-description'),
            $copyBtn = jQuery('#sb-copy-shortcode-predefined');

        $copyBtn.detach().appendTo('BODY').detach();

        //jQuery('#predefined_location, #predefined_category, #predefined_provider, #predefined_service').find('option').removeAttr('disabled');

        var location = $location.length ? $location.val() : null;
        var category = $category.length ? $category.val() : null;
        var provider = $provider.length ? $provider.val() : null;
        var service = $service.length ? $service.val() : null;

        var isAnySelected = location || category || provider || service;
        //
        // var availableLocations = this.options.locations ? _.map(this.options.locations, function (location) {
        //     return location.id;
        // }) : null;
        //
        // var availableCategories = this.options.categories ? _.map(this.options.categories, function (category) {
        //     return category.id;
        // }) : null;
        //
        // var availableProviders = this.options.providers ? _.map(this.options.providers, function (provider) {
        //     return provider.id;
        // }) : null;
        //
        // var availableServices = this.options.services ? _.map(this.options.services, function (service) {
        //     return service.id;
        // }) : null;
        //
        // //todo:


        var warnMessage = '<p class="wp-sb--p wp-sb--p_hint">' + _this.__("If you need multiple pages with different predefined locations, categories, providers, or services, you can use the shortcode with the corresponding parameters.") + '</p>';

        if(isAnySelected){
            var warnCode = '[simplybook_widget';

            if(location){
                warnCode += ' location=' + location;
            }
            if(category){
                warnCode += ' category=' + category;
            }
            if(provider){
                warnCode += ' provider=' + provider;
            }
            if(service){
                warnCode += ' service=' + service;
            }
            warnCode += ']';
            warnMessage += '<br>' + _this.__(sprintf("Here is an example of a shortcode with the selected parameters: %s", "<div class='divider'</div><div class='sb-widget-tag'><span>"+warnCode+"</span></div>"));
        } else {
            warnMessage += '<br>' + _this.__(sprintf("For example, %s", "<div class='divider'></div><div class='sb-widget-tag'><span>[simplybook_widget location=1 category=2 provider=3 service=4]</span></div>"));
        }

        $warn.html(warnMessage).find('.sb-widget-tag').append($copyBtn);

    },

    // _getRelations: function (){
    //     var locationProviders = this.options.locations ? _.reduce(this.options.locations, function (acc, location) {
    //         acc[location.id] = location.providers;
    //         return acc;
    //     }, {}) : null;
    //
    //     var categoryServices = this.options.categories ? _.reduce(this.options.categories, function (acc, category) {
    //         acc[category.id] = category.services;
    //         return acc;
    //     }, {}) : null;
    //
    //     var providerServices = this.options.providers ? _.reduce(this.options.providers, function (acc, provider) {
    //         acc[provider.id] = provider.services;
    //         return acc;
    //     }, {}) : null;
    //
    //     var serviceProviders = this.options.services ? _.reduce(this.options.services, function (acc, service) {
    //         acc[service.id] = service.providers;
    //         return acc;
    //     } , {}) : null;
    //
    //    return [serviceProviders, providerServices, categoryServices, locationProviders];
    // },
    //
    //
    // _getAvailableServices: function (servicesList, category, provider) {
    //     var [serviceProviders, providerServices, categoryServices, locationProviders] = this._getRelations();
    //
    //     if (provider && providerServices && providerServices[provider]) {
    //         servicesList = _.intersection(servicesList, providerServices[provider]);
    //     }
    //
    //     if (category && categoryServices && categoryServices[category]) {
    //         servicesList = _.intersection(servicesList, categoryServices[category]);
    //     }
    //
    //     return servicesList;
    // },
    //
    // _getAvailableProviders: function (providersList, location, service) {
    //     var [serviceProviders, providerServices, categoryServices, locationProviders] = this._getRelations();
    //
    //     if (location && locationProviders && locationProviders[location]) {
    //         providersList = _.intersection(providersList, locationProviders[location]);
    //     }
    //
    //     if (service && serviceProviders && serviceProviders[service]) {
    //         providersList = _.intersection(providersList, serviceProviders[service]);
    //     }
    //
    //     return providersList;
    // },
    //
    // _getAvailableCategories: function (categoriesList, service) {
    //     var [serviceProviders, providerServices, categoryServices, locationProviders] = this._getRelations();
    //
    //     if(service && categoryServices){
    //         categoriesList = _.reduce(categoryServices, function (acc, services, category) {
    //             if(_.indexOf(services, service) >= 0 && categoriesList.indexOf(category) >= 0){
    //                 acc.push(category);
    //             }
    //             return acc;
    //         }, []);
    //     }
    //     return categoriesList;
    // },
    //
    // _getAvailableLocations: function (locationsList, provider) {
    //     var [serviceProviders, providerServices, categoryServices, locationProviders] = this._getRelations();
    //
    //     if(provider && locationProviders){
    //         locationsList = _.reduce(locationProviders, function (acc, providers, location) {
    //             if(_.indexOf(providers, provider) >= 0 && locationsList.indexOf(location) >= 0){
    //                 acc.push(location);
    //             }
    //             return acc;
    //         }, []);
    //     }
    //     return locationsList;
    // },


    resetCompanyLogin : function(login){
        var _this = this;
        this.initApi(login, false, function () {
            _this.initStartApiData(function () {
                if( _this.apiReady) {
                    console.log('api ready');
                    _this.setViewApiData();
                }
            });
        });
    },

    _getFormData : function(convertToObj){
        var data = this.node.find(':input').serializeArray();
        var formData = _.reduce(data, function (acc, item) {
            acc[item.name] = item.value;
            return acc;
        } , {});

        // formData = _.extend({}, formData, _.reduce(this.node.find(':input:checkbox') , function (acc, item) {
        //     acc[item.name] = item.checked ? 1 : 0;
        //     return acc;
        // } , {}));

        if(convertToObj) {
            //convert 'key[*]' to object key: {key: [*]}
            _.each(formData, function (value, key) {
                if (key.indexOf('[') > 0) {
                    var keyParts = key.split('[');
                    var keyName = keyParts[0];
                    var keyIndex = keyParts[1].replace(']', '');

                    if (!_.isObject(formData[keyName])) {
                        formData[keyName] = {};
                    }
                    formData[keyName][keyIndex] = value;
                    delete formData[key];
                }
            });
        }

        return formData;
    },

    onTemplateSelect : function(template, ignoreSaved, selectPalette){
        var _this = this;

        jQuery('#sb-settings-container').removeClass (function (index, className) {
            return (className.match (/(^|\s)theme-\S+/g) || []).join(' ');
        }).addClass('theme-' + template);

        var themeSettings = this._getThemeSettings(template);
        var palettes = this._getThemePalettes(template);
        var selectedPalette = null;
        var firstPalette = palettes && Object.keys(palettes).length ? palettes[Object.keys(palettes)[0]] : null;

        if(palettes && Object.keys(palettes).length && selectPalette && palettes[selectPalette]){
            selectedPalette = palettes[selectPalette];
        }

        var currentFormParams = null;

        if(themeSettings && selectPalette && selectedPalette){
            var formParams = _this._getFormData();
            //get only themeparams[*] params as *
            currentFormParams = _.reduce(formParams, function (acc, value, key) {
                if(key.indexOf('themeparams[') === 0){
                    acc[key.replace('themeparams[', '').replace(']', '')] = value;
                }
                return acc;
            }, {});
        }

        _this.options.template = template;

        if(themeSettings){
            if(!this.themeSettingsTemplate) {
                this.themeSettingsTemplate = this.node.find('.theme-data.template');
                this.themeSettingsTemplate.detach().removeClass('hidden').addClass('dynamic-item');
            }

            //console.log(_this.themeSettingsTemplate);

            if(!this.themeSettingsTemplate || !this.themeSettingsTemplate.length){
                return;
            }

            this.node.find('.theme-data.dynamic-item').remove(); //remove old items

            var settingsKeys = Object.keys(themeSettings);

            settingsKeys.sort(function(a,b) {
                var aType = themeSettings[a].config_type;
                var bType = themeSettings[b].config_type;
                var aPos = _this.sortSettingsTypes.indexOf(aType);
                var bPos = _this.sortSettingsTypes.indexOf(bType);

                if(aPos >= 0 && bPos == -1){
                    return -1;
                }
                if(bPos >= 0 && aPos == -1){
                    return 1;
                }
                return aPos-bPos;
            });

            jQuery.each(settingsKeys, function (num,key) {
                var param = jQuery.extend({}, themeSettings[key]);

                if(_this.ingoreSettingsKeys.indexOf(key) >= 0){
                    return;
                }

                var itemNode = _this.themeSettingsTemplate.clone();
                var title = param.config_title ? param.config_title : param.config_key;
                itemNode.find('.title').text(_this.__(_this.keyTranslations[title]?_this.keyTranslations[title]:title));
                itemNode.addClass('theme-data-' + key);

                if(!ignoreSaved || selectPalette) {
                    var isSet = false;
                    if (_this.options.themeparams && _.isObject(_this.options.themeparams)) {
                        //if saved param not exist
                        if (!_.isUndefined(_this.options.themeparams[key])) {
                            param.default_value = _this.options.themeparams[key];
                            isSet = true;
                        }
                    }
                    if(!isSet && firstPalette && firstPalette[key]){
                        param.default_value = firstPalette[key];
                    }

                    //if palette selected
                    if(selectPalette && selectedPalette && selectedPalette[key]){
                        param.default_value = selectedPalette[key];
                    } else if(selectPalette && selectedPalette && !selectedPalette[key] && currentFormParams){
                        //if palette not have param, get from saved
                        param.default_value = currentFormParams[key];
                    }
                }

                switch (param.config_type){
                    case "color":
                    case "base_color":
                        itemNode.find('.data-input').html(
                            "<span class='color-view' style='background-color:" + param.default_value + "'></span>" +
                            "<input type='text' name='themeparams["+ key +"]' value='" + param.default_value + "'>"
                        );

                        // itemNode.find(':input, .color-view').colpick({
                        //     onSubmit: function (hsb, hex, rgb, el, bySetColor) {
                        //         jQuery(el).closest('.data-input').find(':input').val('#' + hex);
                        //         jQuery(el).closest('.data-input').find('.color-view').css('background-color', '#' + hex);
                        //         jQuery(el).colpickHide();
                        //     }
                        // });
                        //change colpick to alwan
                        let $previewNode = itemNode.find('.color-view');
                        let $inputNode = itemNode.find(':input');

                        //set inputnode visible only (not editable)
                        $inputNode.attr('readonly', 'readonly');

                        let alwan = new Alwan($previewNode.get(0), {
                            color: param.default_value,
                            classname: 'color-view',
                            inputs: {
                                hex: true,
                                rgb: false,
                                hsl: false,
                            }
                        });

                        alwan.on('change', function (color) {
                            $inputNode.val(color.hex);
                        });

                        $inputNode.on('click focus touchstart', function () {
                            alwan.open();
                        });
                        break;

                    case "gradient":
                        //console.log(param);
                        var [color1_def, color2_def, color3_def] = param.default_value.split(',');
                        itemNode.find('.data-input').html(
                            "<span class='color-view' data-color='1' style='background-color:" + color1_def + "'></span>" +
                            "<span class='color-view' data-color='2' style='background-color:" + color2_def + "'></span>" +
                            "<span class='color-view' data-color='3' style='background-color:" + color3_def + "'></span>" +
                            "<div class='gradient-view' style='background-image: linear-gradient(to right, " + param.default_value + ")'></div>" +
                            "<input type='text' class='invisible' name='themeparams["+ key +"]' value='" + param.default_value + "'>"
                        );
                        // itemNode.find(':input, .color-view').colpick({
                        //     onSubmit: function (hsb, hex, rgb, el, bySetColor) {
                        //         var colorN = jQuery(el).data('color');
                        //         var $input = jQuery(el).closest('.data-input').find(':input');
                        //         var val = $input.val();
                        //         var colors = val.split(',');
                        //         colors[colorN-1] = '#' + hex;
                        //         $input.val(colors.join(','));
                        //         jQuery(el).closest('.data-input').find('.color-view[data-color='+colorN+']').css('background-color', '#' + hex);
                        //         jQuery(el).closest('.data-input').find('.gradient-view').css('background-image', 'linear-gradient(to right, ' + colors.join(',') + ')');
                        //         jQuery(el).colpickHide();
                        //     }
                        // });

                        //change colpick to alwan
                        let $previewNodes = itemNode.find('.color-view');
                        let $gradientInputNode = itemNode.find(':input');
                        let $gradientNode = itemNode.find('.gradient-view');
                        let colorValues = param.default_value.split(',');

                        //set inputnode visible only (not editable)
                        $gradientInputNode.attr('readonly', 'readonly');

                        jQuery.each($previewNodes, function (num, previewNode) {
                            let alwan = new Alwan(previewNode, {
                                color: colorValues[num],
                                classname: 'color-view',
                                inputs: {
                                    hex: true,
                                    rgb: false,
                                    hsl: false,
                                },
                            });

                            alwan.on('change', function (color) {
                                colorValues[num] = color.hex;
                                $gradientInputNode.val(colorValues.join(','));
                                $gradientNode.css('background-image', 'linear-gradient(to right, ' + colorValues.join(',') + ')');
                            });

                            $gradientInputNode.on('click focus touchstart', function () {
                                alwan.open();
                            });
                        });

                        break;

                    case "checkbox":
                        // <div class="custom-checkbox--wrapper">
                        //     <input type="checkbox" id="clear_session" class="custom-checkbox--input">
                        //     <input type="hidden" name="clear_session">
                        //     <div class="custom-checkbox--checkbox">
                        //         <div class="custom-checkbox--icon"></div>
                        //     </div>
                        // </div>

                        itemNode.find('.data-input').html(
                            "<div class='custom-checkbox'>" +
                                "<input type='hidden' name='themeparams["+ key +"]' value='" + param.default_value + "'>" +
                                "<input type='checkbox' id='themeparams["+ key +"]' class='custom-checkbox--input' " + (parseInt(param.default_value)?'checked="checked"':'') + ">" +
                                "<div class='custom-checkbox--checkbox'>" +
                                    "<div class='custom-checkbox--icon'></div>" +
                                "</div>" +
                            "</div>"
                        );

                        //add "for" to label
                        itemNode.find('label').attr('for', 'themeparams['+ key +']');
                        
                        // itemNode.find('.data-input').html(
                        //     "<input " + (parseInt(param.default_value)?'checked="checked"':'') + " type='checkbox' name='themeparams["+ key +"]' value='" + param.default_value + "' >"
                        // );
                        break;

                    case "select":
                        var cnode = jQuery(
                            "<select name='themeparams["+ key +"]'></select>"
                        );
                        jQuery.each(param.values, function (num, value) {
                           cnode.append(
                               "<option " + (value==param.default_value?'selected="selected"':'') + " value='" + value + "'>" + _this.__(_this.keyTranslations[value]?_this.keyTranslations[value]:value) + "</option>"
                           )
                        });
                        itemNode.find('.data-input').append(cnode);
                        break;

                    case "text":
                        console.log(key, param);
                        return;
                        break;

                    case "background_image":
                    case "logo_image":
                    case "image":
                        //@todo: upload image
                        return;
                        break;

                    default:
                        console.log(key, param);
                        return;
                        break;
                }

                _this.node.find('.theme-data').last().after(itemNode);
            });

            this.node.find('.theme-data').removeClass('hidden');
        }

        this._showPalettes(template);

    },


    clearLocalStorage: function(){
        var keysToDelete = ['activeTab', 'apiData', 'apiDataExpiry', 'cachedLogin'];
        _.each(keysToDelete, function (key) {
            localStorage.removeItem(key);
        });
    },

    _showPalettes : function(template){
        var _this = this;
        var palettes = this._getThemePalettes(template);

        var $palettesNode = this.node.find('#palettes-data');
        var $palettesContainer = $palettesNode.find('#palettes-data-content');

        $palettesNode.addClass('hidden');
        $palettesContainer.empty();


        if(palettes && Object.keys(palettes).length){
            $palettesNode.removeClass('hidden');

            jQuery.each(palettes, function (key, palette) {
                if(key.indexOf('palette_') !== false){
                    var paletteNode = jQuery(
                        "<div class='palette-item' data-key='"+key+"'>" +
                            "<div class='palette-title'>" + _this.__(palette['name']) + "</div>" +
                            "<div class='palette-colors'></div>" +
                        "</div>" +
                        "<div class='clear'></div>"
                    );

                    jQuery.each(palette, function (num, color) {
                        if(num.indexOf('name') === 0){
                            return;
                        }

                        var isGradient = color && color.indexOf(',') > 1;
                        var backroundColorCSS ="background-color:" + color + ";";

                        if(isGradient){
                            backroundColorCSS = "background-image: linear-gradient(to right, " + color + ");";
                        }

                        paletteNode.find('.palette-colors').append(
                            "<span class='color-view attr_" + num + "' style='" + backroundColorCSS + "'></span>"
                        );
                    } );

                    $palettesContainer.append(paletteNode);
                } else {
                    //ignore not palette keys
                }
            });
        }
    },

    _getThemeSettings : function(template, param){
        if(!param){
            param = 'config';
        }
        var res = null;
        if( this.apiReady) {
            //search theme and return settings
            var s = jQuery.grep(this.themes, function (theme) {
                return theme.name === template;
            });
            return s && s.length ? s[0][param] : null;
        }
        return res;
    },

    _getThemePalettes : function(template){
        return this._getThemeSettings(template, 'palettes');
    },


    initApi : function (login, hideError, callback) {
        var _this = this;

        if(!login){
            return;
        }

        if(this.isApiCacheValid()){
            _this.options.login = login;
            callback(true);
            return;
        }

        new JSONRpcClient({
            'url': this.options.apiUrl,
            'headers': {
                'X-Company-Login': login
            },
            'onerror': function (error) {
                if(!hideError) {
                    _this.showError(error);
                }
                _this.apiReady = false;
                callback(false);
            }, 
            'onready' : function () {
                _this.options.login = login;
                _this.api = this;
                _this.apiReady = true;
                callback(true);
            }
        });
    },

    _hideSettings : function(){
        this.node.find('.theme-data, .api-data').addClass('hidden');
    },

    showError(error){
        clearTimeout(this.errTimer);

        this._hideSettings();
        var errNode = jQuery('.error').first();
        errNode.empty();

        if(_.isObject(error)) {
            errNode.append("<p><strong>CODE</strong>: " + error.code + " <strong>ERROR</strong>: " + error.message + " </p>");
        } else{
            errNode.append("<p><strong>ERROR</strong>: " + error + "</p>");
        }

        this.errTimer = setTimeout(function () {
            errNode.empty();
        }, 10000);
        console.warn(error);
    },

    showLoader : function () {
        if(!this.loader){
            this.loader = jQuery(
                '<div class="loader-container">' +
                '<div class="loader-overlay"></div>' +
                '<div class="loader"><div style="width:100%;height:100%" class="lds-eclipse"><div></div></div>' +
                '</div>'
            ).hide();

            jQuery('BODY').append(this.loader);
        }

        this.loader.show();
    },

    hideLoader : function () {
        if(this.loader){
            this.loader.hide();
        }
    },

    __: function (text) {
        var { __, _x, _n, _nx } = wp.i18n;
        const stackTrace = new Error().stack;
        const stackLines = stackTrace.split('\n');


        const callingFunctionLine = stackLines[2];
        const parts = callingFunctionLine.split(/\s+/);

        // Отримуємо номер рядка з кінця рядка
        const lineNumber = callingFunctionLine.match(/:(\d+):/);
        const lineNumberValue = lineNumber ? lineNumber[1] : 'unknown';

        // Отримуємо ім'я файлу, яке знаходиться між останнім "/" і ":" перед номером рядка
        const fileName = callingFunctionLine.match(/\/([^/]+):/);
        const fileNameValue = fileName ? fileName[1].split('?')[0] : 'unknown';

        var log = "# " + fileNameValue + ":" + lineNumberValue + "\n";
        log += "msgid \"" + text + "\"\nmsgstr \"\"\n\n";

        //console.log(log);
        return __(text, 'simplybook');
    },

    _initDashboardTabs : function(){
        //console.log('_initDashboardTabs')
        var _this = this;
        const tabs = document.querySelectorAll('.wp-sb--tabs-nav_item-link');
        const tabContents = document.querySelectorAll('.wp-sb--tab');

        function showTab(target) {
            tabs.forEach(tab => tab.classList.remove('--active'));
            target.classList.add('--active');

            const contentId = target.getAttribute('href').substring(1);
            tabContents.forEach(content => content.classList.remove('show'));
            document.getElementById(contentId).classList.add('show');
        }

        tabs.forEach(tab => tab.addEventListener('click', (event) => {
            event.preventDefault();
            showTab(event.currentTarget);

            if (event.target.hasAttribute('href')) {
                const activeTabId = event.target.getAttribute('href').substring(1);
                localStorage.setItem('activeTab', activeTabId);
                //console.log('selected tab == ', activeTabId);
            }
        }));

        // Restore active tab from local storage
        const storedActiveTab = localStorage.getItem('activeTab');
        if (storedActiveTab) {

            const activeLink = document.querySelector(`a[href="#${storedActiveTab}"]`);
            if (activeLink) {
                showTab(activeLink);
            }
        }
    },

    _initCollapse : function(){
        var collapsibleElements = document.querySelectorAll('[data-toggle="collapse"]');

        collapsibleElements.forEach(function(element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();

                var targetId = this.getAttribute('data-target') || this.getAttribute('href');
                var targetElement = document.querySelector(targetId);

                if (targetElement.classList.contains('show')) {
                    collapse(targetElement);
                    element.setAttribute('aria-expanded', 'false');
                } else {
                    expand(targetElement);
                    element.setAttribute('aria-expanded', 'true');
                }

                if(element.getAttribute('aria-expanded') == 'true') {
                    element.classList.toggle('collapseOpen');
                } else {
                    element.classList.remove('collapseOpen');
                }
            });
        });

        function collapse(element) {
            element.style.height = element.scrollHeight + 'px';
            element.classList.add('collapsing');
            element.classList.remove('collapse', 'show');

            setTimeout(function() {
                element.style.height = '0';
                element.removeAttribute('style');
            }, 10);

            element.addEventListener('transitionend', function() {
                element.classList.remove('collapsing');
                element.classList.add('collapse');
                element.style.height = '';
            }, { once: true });
        }

        function expand(element) {
            element.classList.remove('collapse');
            element.classList.add('collapsing');
            element.style.display = 'block';
            var height = element.scrollHeight;
            element.style.height = '0';

            setTimeout(function() {
                element.style.height = height + 'px';
            }, 10);

            element.addEventListener('transitionend', function() {
                element.classList.remove('collapsing');
                element.classList.add('collapse', 'show');
                element.style.height = '';
            }, { once: true });
        }
    },

    _initStickyBtnBar: function (){
        const btnBar = document.querySelector('.btn-bar__sticky');
        const btnBarPhantom = document.querySelector('.btn-bar__sticky-phantom');

        function setStickyClass(){
            if ((window.scrollY + window.innerHeight) < (document.documentElement.scrollHeight - (btnBar.clientHeight + 10))) {
                btnBar.classList.add("sticky");
                btnBar.style.bottom = '40px';

                //phantom style
                btnBarPhantom.style.height = (btnBar.clientHeight + 10) + 'px';
                btnBarPhantom.classList.remove('hidden');
            } else {
                btnBar.classList.remove("sticky");
                btnBar.style.bottom = '';

                btnBarPhantom.classList.add('hidden');
            }
        }

        setTimeout(function (){setStickyClass()}, 300)

        window.addEventListener("scroll", function() {
            setStickyClass();
        });
    },
});

