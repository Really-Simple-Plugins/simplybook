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
        // Single event listener for all notices
        document.addEventListener('click', function(e) {
            if (!e.target.classList.contains('notice-dismiss') && !e.target.closest('.notice-dismiss')) {
                return;
            }

            const notice = e.target.closest('.notice.is-dismissible[data-notice-type]');
            const noticeType = notice?.dataset.noticeType;

            if (!notice || !noticeType) {
                return;
            }

            dismissNotice(noticeType);
        });
    }

    function dismissNotice(noticeType) {
        if (!simplybookNoticesConfig?.restUrl || !simplybookNoticesConfig?.nonce) {
            return;
        }

        fetch(simplybookNoticesConfig.restUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': simplybookNoticesConfig.nonce
            },
            credentials: 'same-origin',
            body: JSON.stringify({ notice_type: noticeType })
        });
    }

})();