<?php

namespace SimplyBook\Services;

use SimplyBook\Http\Endpoints\AdminNoticesEndpoint;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

/**
 * Shared logic for the admin notices of the plugin. The service stores the
 * dismissed and snoozed state of a notice, checks the current screen and
 * enqueues the script that calls the routes of {@see AdminNoticesEndpoint}.
 *
 * The X button hides a notice for the current user only. The "never" and
 * "later" buttons hide a notice for the whole site. Both states live in
 * different stores: user meta for the user, wp_options for the site.
 */
class AdminNoticeService
{
    private const META_KEY = 'simplybook_dismissed_notices';

    private const CHOICE_LATER = 'later';
    private const CHOICE_NEVER = 'never';

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
     * Check if a notice must stay hidden on the current request. This is the
     * case on an excluded screen, when the current user dismissed the notice
     * with the X button and when the site choice hides the notice. The
     * snooze seconds define how long the "later" choice hides the notice.
     * Call this before any cached eligibility check, because the cached
     * result is shared by all screens and all users.
     */
    public function isNoticeHidden(string $noticeId, int $snoozeSeconds): bool
    {
        if ($this->currentScreenAllowsNotice() === false) {
            return true;
        }

        if ($this->isNoticeDismissedForUser(get_current_user_id(), $noticeId)) {
            return true;
        }

        return $this->choiceHidesNotice($noticeId, $snoozeSeconds);
    }


    /**
     * Hide a notice for a specific user for good. Used by the X button.
     */
    public function dismissNoticeForUser(int $userId, string $noticeId): bool
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
     * Hide a notice for the whole site for good. Used by the "never" button.
     */
    public function dismissNotice(string $noticeId): bool
    {
        return $this->storeChoice($noticeId, self::CHOICE_NEVER);
    }


    /**
     * Hide a notice for the whole site for a while. Used by the "later"
     * button. The controller decides how long, see {@see isNoticeHidden()}.
     */
    public function snoozeNotice(string $noticeId): bool
    {
        update_option($this->dismissedTimeOptionName($noticeId), time(), false);

        return $this->storeChoice($noticeId, self::CHOICE_LATER);
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

        if (wp_script_is('simplybook-notice-dismiss', 'enqueued')) {
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
                'const simplybookNoticesConfig = { dismissForUserUrl: %s, dismissUrl: %s, snoozeUrl: %s, nonce: %s };',
                wp_json_encode($this->restUrl(AdminNoticesEndpoint::DISMISS_FOR_USER_ROUTE)),
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


    private function isNoticeDismissedForUser(int $userId, string $noticeId): bool
    {
        return in_array($noticeId, $this->getDismissedNotices($userId), true);
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
     * Check if the site choice hides the notice: "never" hides it for good,
     * "later" hides it until the snooze seconds after the click have passed.
     */
    private function choiceHidesNotice(string $noticeId, int $snoozeSeconds): bool
    {
        $choice = get_option($this->choiceOptionName($noticeId));

        if ($choice === self::CHOICE_NEVER) {
            return true;
        }

        if ($choice !== self::CHOICE_LATER) {
            return false;
        }

        $dismissedTime = (int) get_option($this->dismissedTimeOptionName($noticeId));

        return ($dismissedTime + $snoozeSeconds) > time();
    }


    private function storeChoice(string $noticeId, string $choice): bool
    {
        return update_option($this->choiceOptionName($noticeId), $choice, false)
            || get_option($this->choiceOptionName($noticeId)) === $choice;
    }


    private function choiceOptionName(string $noticeId): string
    {
        return 'simplybook_' . $noticeId . '_notice_choice';
    }


    private function dismissedTimeOptionName(string $noticeId): string
    {
        return 'simplybook_' . $noticeId . '_notice_dismissed_time';
    }


    private function restUrl(string $route): string
    {
        return esc_url_raw(rest_url(
            $this->env->getString('plugin.namespace') . '/' . $this->env->getString('http.version') . '/' . $route
        ));
    }
}
