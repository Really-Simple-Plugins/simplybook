/**
 * SimplyBook Admin Notice Dismiss Handler
 *
 * Handles permanent dismissal of admin notices via REST API.
 * Uses event delegation to handle dynamically added dismiss buttons.
 *
 * @since 3.2.1
 */
(function() {
    'use strict';

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        handleNoticeDismiss('.rsp-trial.is-dismissible', 'trial');
        handleNoticeDismiss('.rsp-review.is-dismissible', 'review');
    }

    function handleNoticeDismiss(selector, noticeType) {
        const notice = document.querySelector(selector);

        if (notice) {
            notice.addEventListener('click', function(e) {
                if (e.target.classList.contains('notice-dismiss') || e.target.closest('.notice-dismiss')) {
                    dismissNotice(noticeType);
                }
            });
        }
    }

    function dismissNotice(noticeType) {
        const config = simplybookNoticesConfig || {};

        if (!config.restUrl || !config.nonce) {
            return;
        }

        fetch(config.restUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': config.nonce
            },
            credentials: 'same-origin',
            body: JSON.stringify({ notice_type: noticeType })
        });
    }

})();