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

            const noticeId = notice.dataset.noticeType;

            if (e.target.closest('.notice-dismiss')) {
                dismissNoticeForUser(noticeId);
                return;
            }

            const button = e.target.closest('[data-notice-action]');
            if (!button) {
                return;
            }

            e.preventDefault();

            if (button.dataset.noticeAction === 'snooze') {
                snoozeNotice(noticeId);
            } else {
                dismissNotice(noticeId);
            }

            notice.remove();
        });
    }

    function dismissNoticeForUser(noticeId) {
        sendRequest(simplybookNoticesConfig?.dismissForUserUrl, { notice_id: noticeId });
    }

    function dismissNotice(noticeId) {
        sendRequest(simplybookNoticesConfig?.dismissUrl, { notice_id: noticeId });
    }

    function snoozeNotice(noticeId) {
        sendRequest(simplybookNoticesConfig?.snoozeUrl, { notice_id: noticeId });
    }

    function sendRequest(url, data) {
        if (!url || !simplybookNoticesConfig?.nonce) {
            return;
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': simplybookNoticesConfig.nonce
            },
            credentials: 'same-origin',
            body: JSON.stringify(data)
        });
    }

})();
