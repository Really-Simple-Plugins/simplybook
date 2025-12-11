<?php

namespace SimplyBook\Services;

use SimplyBook\Http\Endpoints\NoticesDismissEndpoint;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class NoticeDismissalService
{
    private const META_KEY = 'simplybook_dismissed_notices';

    private EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    /**
     * Dismiss a notice for a specific user
     *
     * @param int $userId The user ID
     * @param string $noticeType The type of notice to dismiss
     * @return bool True on success, false on failure
     */
    public function dismissNotice(int $userId, string $noticeType): bool
    {

        $dismissedNotices = $this->getDismissedNotices($userId);

        if (in_array($noticeType, $dismissedNotices, true)) {
            return true;
        }

        $dismissedNotices[] = $noticeType;

        $result = update_user_meta($userId, self::META_KEY, $dismissedNotices);

        return $result !== false;
    }

    /**
     * Check if a notice has been dismissed by a specific user
     *
     * @param int $userId The user ID
     * @param string $noticeType The type of notice to check
     * @return bool True if dismissed, false otherwise
     */
    public function isNoticeDismissed(int $userId, string $noticeType): bool
    {
        $dismissedNotices = $this->getDismissedNotices($userId);

        return in_array($noticeType, $dismissedNotices, true);
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
                    $this->env->getString('http.namespace') . '/' . $this->env->getString('http.version') . '/' . NoticesDismissEndpoint::ROUTE
                ))),
                wp_json_encode(wp_create_nonce('wp_rest'))
            ),
            'before'
        );
    }
}
