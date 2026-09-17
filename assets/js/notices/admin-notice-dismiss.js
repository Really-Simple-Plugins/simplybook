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
jQuery(function ($) {
    'use strict';

    $('.notice[data-notice-type]').each(function () {
        const $notice = $(this);
        const noticeId = $notice.data('noticeType');

        $notice.find('.notice-dismiss').on('click', function () {
            dismissNoticeForUser(noticeId);
        });

        $notice.find('[data-notice-action="snooze"]').on('click', function () {
            snoozeNotice(noticeId);
            $notice.remove();
        });

        $notice.find('[data-notice-action="dismiss"]').on('click', function () {
            dismissNotice(noticeId);
            $notice.remove();
        });
    });

    function dismissNoticeForUser(noticeId) {
        sendRequest('notices/dismiss-for-user', noticeId);
    }

    function dismissNotice(noticeId) {
        sendRequest('notices/dismiss', noticeId);
    }

    function snoozeNotice(noticeId) {
        sendRequest('notices/snooze', noticeId);
    }

    function sendRequest(route, noticeId) {
        if (!simplybookNoticesConfig?.restUrl || !simplybookNoticesConfig?.nonce) {
            return;
        }

        fetch(simplybookNoticesConfig.restUrl + route, {
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
