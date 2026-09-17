/**
 * SimplyBook Admin Notice Handler
 *
 * Dismisses or snoozes admin notices via the REST API. The X button
 * dismisses the notice for the current user. The buttons with a
 * data-notice-action attribute dismiss ("dismiss") or snooze ("snooze")
 * the notice for the whole site.
 *
 * WordPress adds the X button on jQuery ready. This script depends on
 * jquery, so its ready callback runs after that. wp.apiFetch adds the
 * REST root URL and the nonce to each request.
 *
 * @since 3.2.1
 */
jQuery(function ($) {
    'use strict';

    $('.simplybook-notice[data-notice-id]').each(function () {
        const $notice = $(this);
        const noticeId = $notice.data('noticeId');

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
        wp.apiFetch({
            path: 'simplybook/v1/' + route,
            method: 'POST',
            data: { notice_id: noticeId }
        });
    }
});
