<?php

namespace SimplyBook\Services;

use SimplyBook\Http\Endpoints\NoticesDismissEndpoint;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

/**
 * Stores the per-user state of admin notices. A notice can be dismissed
 * for good or snoozed until a point in time. The service also enqueues
 * the script that handles the X button of a notice.
 */
class AdminNoticeService
{
    private const META_KEY = 'simplybook_dismissed_notices';
    private const SNOOZE_META_KEY = 'simplybook_snoozed_notices';

    private EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    /**
     * Hide a notice for a specific user for good.
     */
    public function dismissNotice(int $userId, string $noticeId): bool
    {
        $dismissedNotices = $this->getDismissedNotices($userId);

        if (in_array($noticeId, $dismissedNotices, true)) {
            return true;
        }

        $dismissedNotices[] = $noticeId;

        $result = update_user_meta($userId, self::META_KEY, $dismissedNotices);

        return $result !== false;
    }

    public function isNoticeDismissed(int $userId, string $noticeId): bool
    {
        $dismissedNotices = $this->getDismissedNotices($userId);

        return in_array($noticeId, $dismissedNotices, true);
    }

    /**
     * Hide a notice for a specific user until the given amount of seconds
     * has passed.
     */
    public function snoozeNotice(int $userId, string $noticeId, int $seconds): bool
    {
        return $this->storeSnoozedNotice($userId, $noticeId, (time() + $seconds));
    }

    /**
     * Check if the snooze time of a notice has not passed yet for a
     * specific user.
     */
    public function isNoticeSnoozed(int $userId, string $noticeId): bool
    {
        return $this->getSnoozedNotice($userId, $noticeId) > time();
    }

    /**
     * Return an array of dismissed notices for a specific user
     */
    private function getDismissedNotices(int $userId): array
    {
        $dismissed = get_user_meta($userId, self::META_KEY, true);

        return is_array($dismissed) ? $dismissed : [];
    }

    /**
     * Return the snooze end timestamp of a notice for a specific user. Zero
     * means the notice was never snoozed.
     */
    private function getSnoozedNotice(int $userId, string $noticeId): int
    {
        return (int) ($this->getSnoozedNotices($userId)[$noticeId] ?? 0);
    }

    /**
     * Return the snooze end timestamps for a specific user, keyed by
     * notice ID.
     */
    private function getSnoozedNotices(int $userId): array
    {
        $snoozed = get_user_meta($userId, self::SNOOZE_META_KEY, true);

        return is_array($snoozed) ? $snoozed : [];
    }

    /**
     * Save the snooze end timestamp of a notice for a specific user.
     */
    private function storeSnoozedNotice(int $userId, string $noticeId, int $snoozedUntil): bool
    {
        $snoozedNotices = $this->getSnoozedNotices($userId);
        $snoozedNotices[$noticeId] = $snoozedUntil;

        return update_user_meta($userId, self::SNOOZE_META_KEY, $snoozedNotices) !== false;
    }

    /**
     * Call this method to enqueue the required scripts for the dismissal
     * functionality to work. You can only execute this method in the
     * admin_enqueue_scripts filter.
     */
    public function enqueue(): void
    {
        if (current_filter() !== 'admin_enqueue_scripts') {
            return;
        }

        wp_enqueue_script(
            'simplybook-notice-dismiss',
            $this->env->getUrl('plugin.assets_url') . 'js/notices/admin-notice-dismiss.js',
            [],
            $this->env->getString('plugin.version'),
            false
        );

        wp_add_inline_script(
            'simplybook-notice-dismiss',
            sprintf(
                'const simplybookNoticesConfig = { restUrl: %s, nonce: %s };',
                wp_json_encode(esc_url_raw(rest_url(
                    $this->env->getString('plugin.namespace') . '/' . $this->env->getString('http.version') . '/' . NoticesDismissEndpoint::ROUTE
                ))),
                wp_json_encode(wp_create_nonce('wp_rest'))
            ),
            'before'
        );
    }
}
