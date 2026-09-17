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
    private bool $scriptEnqueued = false;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    /**
     * Check if a notice must stay hidden on the current request. The snooze
     * seconds define how long the "later" choice hides the notice. Call this
     * before any cached eligibility check, because the cached result is
     * shared by all screens and all users.
     */
    public function isNoticeHidden(string $noticeId, int $snoozeSeconds): bool
    {
        if ($this->currentScreenAllowsNotice() === false) {
            return true;
        }

        if ($this->isNoticeDismissedForUser($noticeId)) {
            return true;
        }

        if ($this->isNoticeDismissed($noticeId)) {
            return true;
        }

        return $this->isNoticeSnoozed($noticeId, $snoozeSeconds);
    }


    /**
     * Hide a notice for the current user for good. Used by the X button.
     */
    public function dismissNoticeForUser(string $noticeId): bool
    {
        $dismissedNotices = $this->getDismissedNoticesForUser();

        if (in_array($noticeId, $dismissedNotices, true)) {
            return true;
        }

        $dismissedNotices[] = $noticeId;

        return $this->storeDismissedNoticesForUser($dismissedNotices);
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
        $this->storeSnoozedAt($noticeId, time());

        return $this->storeChoice($noticeId, self::CHOICE_LATER);
    }


    /**
     * Call this method to enqueue the script that handles the X button and
     * the "later" and "never" buttons of a notice. Call this method in the
     * admin_enqueue_scripts action.
     */
    public function enqueue(): void
    {
        if ($this->scriptEnqueued) {
            return;
        }

        $this->scriptEnqueued = true;

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


    private function isNoticeDismissed(string $noticeId): bool
    {
        return $this->getChoice($noticeId) === self::CHOICE_NEVER;
    }


    /**
     * The "later" choice hides the notice until the snooze seconds after
     * the click have passed.
     */
    private function isNoticeSnoozed(string $noticeId, int $snoozeSeconds): bool
    {
        if ($this->getChoice($noticeId) !== self::CHOICE_LATER) {
            return false;
        }

        $snoozedAt = $this->getSnoozedAt($noticeId);

        return ($snoozedAt + $snoozeSeconds) > time();
    }


    /**
     * Read the site choice of a notice from its own wp_options row. The row
     * name is `simplybook_{noticeId}_notice_choice`. The value is "later",
     * "never" or an empty string when no choice was made.
     */
    private function getChoice(string $noticeId): string
    {
        return (string) get_option($this->choiceOptionName($noticeId));
    }


    /**
     * Write the site choice of a notice to its own wp_options row. The row
     * name is `simplybook_{noticeId}_notice_choice`. The row does not
     * autoload.
     */
    private function storeChoice(string $noticeId, string $choice): bool
    {
        return update_option($this->choiceOptionName($noticeId), $choice, false);
    }


    /**
     * Read the snooze time of a notice from its own wp_options row. The row
     * name is `simplybook_{noticeId}_notice_dismissed_time`. The value is
     * the Unix timestamp of the "later" click, or 0 when the notice was
     * never snoozed.
     */
    private function getSnoozedAt(string $noticeId): int
    {
        return (int) get_option($this->snoozedAtOptionName($noticeId));
    }


    /**
     * Write the snooze time of a notice to its own wp_options row. The row
     * name is `simplybook_{noticeId}_notice_dismissed_time`. The row does
     * not autoload.
     */
    private function storeSnoozedAt(string $noticeId, int $snoozedAt): bool
    {
        return update_option($this->snoozedAtOptionName($noticeId), $snoozedAt, false);
    }


    /**
     * Each notice has its own row for the site choice, for example
     * `simplybook_trial_notice_choice`.
     */
    private function choiceOptionName(string $noticeId): string
    {
        return 'simplybook_' . $noticeId . '_notice_choice';
    }


    /**
     * Each notice has its own row for the snooze time, for example
     * `simplybook_trial_notice_dismissed_time`. The name keeps the
     * "dismissed_time" suffix of the older plugin versions.
     */
    private function snoozedAtOptionName(string $noticeId): string
    {
        return 'simplybook_' . $noticeId . '_notice_dismissed_time';
    }


    private function isNoticeDismissedForUser(string $noticeId): bool
    {
        return in_array($noticeId, $this->getDismissedNoticesForUser(), true);
    }


    /**
     * Read the notice IDs that the current user dismissed with the X button.
     * All notices share one user meta row, `simplybook_dismissed_notices`.
     */
    private function getDismissedNoticesForUser(): array
    {
        $dismissed = get_user_meta(get_current_user_id(), self::META_KEY, true);

        return is_array($dismissed) ? $dismissed : [];
    }


    private function storeDismissedNoticesForUser(array $noticeIds): bool
    {
        return update_user_meta(get_current_user_id(), self::META_KEY, $noticeIds) !== false;
    }


    private function restUrl(string $route): string
    {
        return esc_url_raw(rest_url(
            $this->env->getString('plugin.namespace') . '/' . $this->env->getString('http.version') . '/' . $route
        ));
    }
}
