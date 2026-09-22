/**
 * SimplyBook Widget Loader
 *
 * Creates a SimplybookWidget for each element with the class
 * "simplybook-widget". The element carries the widget configuration as JSON
 * in the "data-config" attribute.
 */
(function() {
    'use strict';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        if (typeof SimplybookWidget !== 'function') {
            return;
        }

        document.querySelectorAll('.simplybook-widget').forEach(function(element) {
            new SimplybookWidget(JSON.parse(element.dataset.config));
        });
    }
})();
