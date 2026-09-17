/**
 * SimplyBook Admin Notice Handler
 *
 * Dismisses or snoozes admin notices via the REST API. The X button
 * dismisses the notice for the current user. The buttons with a
 * data-notice-action attribute dismiss ("dismiss") or snooze ("snooze")
 * the notice for the whole site.
 *
 * WordPress adds the X button on jQuery ready. This script depends on
 * jquery, so its ready callback runs after that.
 *
 * @since 3.2.1
 */
jQuery(function () {
    'use strict';

    document.querySelectorAll('.notice[data-notice-type]').forEach(function (notice) {
        const noticeId = notice.dataset.noticeType;

        const dismissButton = notice.querySelector('.notice-dismiss');
        if (dismissButton) {
            dismissButton.addEventListener('click', function () {
                sendRequest(simplybookNoticesConfig?.dismissForUserUrl, noticeId);
            });
        }

        const snoozeButton = notice.querySelector('[data-notice-action="snooze"]');
        if (snoozeButton) {
            snoozeButton.addEventListener('click', function () {
                sendRequest(simplybookNoticesConfig?.snoozeUrl, noticeId);
                notice.remove();
            });
        }

        const neverButton = notice.querySelector('[data-notice-action="dismiss"]');
        if (neverButton) {
            neverButton.addEventListener('click', function () {
                sendRequest(simplybookNoticesConfig?.dismissUrl, noticeId);
                notice.remove();
            });
        }
    });

    function sendRequest(url, noticeId) {
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
            body: JSON.stringify({ notice_id: noticeId })
        });
    }
});
