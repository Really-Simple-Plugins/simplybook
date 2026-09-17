/**
 * SimplyBook Admin Notice Handler
 *
 * Dismisses or snoozes admin notices via the REST API. The X button
 * dismisses the notice. Buttons with a data-notice-action attribute
 * dismiss ("dismiss") or snooze ("snooze") the notice and hide it.
 * Uses event delegation to handle dynamically added buttons.
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
            const notice = e.target.closest('.notice.is-dismissible[data-notice-type]');
            if (!notice || !notice.dataset.noticeType) {
                return;
            }

            if (e.target.closest('.notice-dismiss')) {
                sendRequest('dismiss', notice.dataset.noticeType);
                return;
            }

            const button = e.target.closest('[data-notice-action]');
            if (!button) {
                return;
            }

            e.preventDefault();
            sendRequest(button.dataset.noticeAction, notice.dataset.noticeType, button.dataset.snoozeSeconds);
            notice.remove();
        });
    }

    function sendRequest(action, noticeId, snoozeSeconds) {
        const url = (action === 'snooze') ? simplybookNoticesConfig?.snoozeUrl : simplybookNoticesConfig?.dismissUrl;
        if (!url || !simplybookNoticesConfig?.nonce) {
            return;
        }

        const body = { notice_id: noticeId };
        if (action === 'snooze' && snoozeSeconds) {
            body.seconds = parseInt(snoozeSeconds, 10);
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': simplybookNoticesConfig.nonce
            },
            credentials: 'same-origin',
            body: JSON.stringify(body)
        });
    }

})();
