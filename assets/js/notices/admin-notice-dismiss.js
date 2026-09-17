/**
 * SimplyBook Admin Notice Handler
 *
 * @since 3.2.1
 */
jQuery(function ($) {
    'use strict';

    $('.simplybook-notice[data-notice-id]').each(function () {
        const $notice = $(this);
        const noticeId = $notice.data('noticeId');

        // X button: dismiss the notice for the current user.
        $notice.find('.notice-dismiss').on('click', function () {
            dismissNoticeForUser(noticeId);
        });

        // "Later" button: snooze the notice for the whole site.
        $notice.find('[data-notice-action="snooze"]').on('click', function () {
            snoozeNotice(noticeId);
            $notice.remove();
        });

        // "Never" button: dismiss the notice for the whole site.
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
