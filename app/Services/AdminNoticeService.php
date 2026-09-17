<?php

namespace SimplyBook\Services;

use SimplyBook\Http\Endpoints\AdminNoticesEndpoint;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

/**
 * Shared logic for the admin notices of the plugin. The service stores
 * the per-user dismissed and snoozed state, checks the current screen,
 * caches the eligibility result and enqueues the script that calls the
 * dismiss and snooze routes of {@see AdminNoticesEndpoint}.
 */
class AdminNoticeService
{
    private const META_KEY = 'simplybook_dismissed_notices';
    private const SNOOZE_META_KEY = 'simplybook_snoozed_notices';

    /**
     * Notices break the Gutenberg editor and the React app of the plugin.
     * No notice renders on a screen whose base matches one of these.
     */
    private const EXCLUDED_SCREEN_BASES = [
        'post',
        'simplybook',
    ];

    private EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    /**
     * Run the eligibility check of a notice and cache the result. A positive
     * result is cached for one minute, a negative result for ten minutes.
     * The screen check and the per-user check run before the cache, because
     * the cached result is shared by all screens and all users.
     */
    public function canRender(string $noticeId, callable $isEligible): bool
    {
        if ($this->currentScreenAllowsNotice() === false) {
            return false;
        }

        if ($this->isNoticeHiddenForUser(get_current_user_id(), $noticeId)) {
            return false;
        }

        $found = false;
        $cacheName = $this->cacheName($noticeId);
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found) {
            return (bool) $cacheValue;
        }

        $eligible = (bool) $isEligible();
        $cacheDuration = ($eligible ? MINUTE_IN_SECONDS : (MINUTE_IN_SECONDS * 10));
        wp_cache_set($cacheName, $eligible, 'simplybook', $cacheDuration);

        return $eligible;
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


    /**
     * Hide a notice for a specific user until the given amount of seconds
     * has passed.
     */
    public function snoozeNotice(int $userId, string $noticeId, int $seconds): bool
    {
        return $this->storeSnoozedNotice($userId, $noticeId, (time() + $seconds));
    }


    /**
     * Call this method to enqueue the script that handles the X button and
     * the "later" and "never" buttons of a notice. You can only execute
     * this method in the admin_enqueue_scripts filter.
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
                'const simplybookNoticesConfig = { dismissUrl: %s, snoozeUrl: %s, nonce: %s };',
                wp_json_encode($this->restUrl(AdminNoticesEndpoint::DISMISS_ROUTE)),
                wp_json_encode($this->restUrl(AdminNoticesEndpoint::SNOOZE_ROUTE)),
                wp_json_encode(wp_create_nonce('wp_rest'))
            ),
            'before'
        );
    }


    /**
     * Check if the current admin screen may show a notice.
     */
    private function currentScreenAllowsNotice(): bool
    {
        $screen = get_current_screen();
        if (!$screen) {
            return true;
        }

        foreach (self::EXCLUDED_SCREEN_BASES as $base) {
            if (str_contains($screen->base, $base)) {
                return false;
            }
        }

        return true;
    }


    private function cacheName(string $noticeId): string
    {
        return 'can_render_' . $noticeId . '_notice';
    }


    /**
     * Check if the user dismissed the notice for good or the snooze time
     * has not passed yet.
     */
    private function isNoticeHiddenForUser(int $userId, string $noticeId): bool
    {
        if (in_array($noticeId, $this->getDismissedNotices($userId), true)) {
            return true;
        }

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


    private function restUrl(string $route): string
    {
        return esc_url_raw(rest_url(
            $this->env->getString('plugin.namespace') . '/' . $this->env->getString('http.version') . '/' . $route
        ));
    }
}
