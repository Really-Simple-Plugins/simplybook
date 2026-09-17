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
            sendRequest('notices/dismiss-for-user', noticeId);
        });

        // "Later" button: snooze the notice for the whole site.
        $notice.find('[data-notice-action="snooze"]').on('click', function () {
            sendRequest('notices/snooze', noticeId);
            $notice.remove();
        });

        // "Never" button: dismiss the notice for the whole site.
        $notice.find('[data-notice-action="dismiss"]').on('click', function () {
            sendRequest('notices/dismiss', noticeId);
            $notice.remove();
        });
    });

    function sendRequest(route, noticeId) {
        wp.apiFetch({
            path: 'simplybook/v1/' + route,
            method: 'POST',
            data: { notice_id: noticeId }
        });
    }
});
