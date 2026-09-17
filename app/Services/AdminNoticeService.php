<?php

namespace SimplyBook\Services;

use SimplyBook\Http\Endpoints\AdminNoticesEndpoint;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

/**
 * Shared logic for the admin notices. The X button hides a notice for the
 * current user in user meta. The "never" and "later" buttons hide a notice
 * for the whole site in wp_options. The buttons call the routes of
 * {@see AdminNoticesEndpoint}.
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
     * Check if the notice is not dismissed or snoozed, and if the current
     * screen allows a notice.
     */
    public function canRender(string $noticeId, int $snoozeDuration): bool
    {
        if ($this->currentScreenAllowsNotice() === false) {
            return false;
        }

        if ($this->isNoticeDismissedForUser($noticeId)) {
            return false;
        }

        if ($this->isNoticeDismissed($noticeId)) {
            return false;
        }

        return $this->isNoticeSnoozed($noticeId, $snoozeDuration) === false;
    }


    /**
     * Hide the notice for the current user for good, by the X button.
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
     * Hide the notice for the whole site for good, by the "never" button.
     */
    public function dismissNotice(string $noticeId): bool
    {
        return $this->storeChoice($noticeId, self::CHOICE_NEVER);
    }


    /**
     * Hide the notice for the whole site for a while, by the "later" button.
     * The controller decides how long, see {@see canRender()}.
     */
    public function snoozeNotice(string $noticeId): bool
    {
        $this->storeSnoozedAt($noticeId, time());

        return $this->storeChoice($noticeId, self::CHOICE_LATER);
    }


    /**
     * Enqueue the script that handles the buttons of a notice. Call this
     * method in the admin_enqueue_scripts action.
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


    /**
     * Check if the notice is hidden by the "never" button.
     */
    private function isNoticeDismissed(string $noticeId): bool
    {
        return $this->getChoice($noticeId) === self::CHOICE_NEVER;
    }


    /**
     * Check if the notice is snoozed within the snooze duration.
     */
    private function isNoticeSnoozed(string $noticeId, int $snoozeDuration): bool
    {
        if ($this->getChoice($noticeId) !== self::CHOICE_LATER) {
            return false;
        }

        $snoozedAt = $this->getSnoozedAt($noticeId);

        return ($snoozedAt + $snoozeDuration) > time();
    }


    /**
     * Read the choice from simplybook_{noticeId}_notice_choice. Returns
     * "later", "never" or an empty string.
     */
    private function getChoice(string $noticeId): string
    {
        return (string) get_option($this->choiceOptionName($noticeId), '');
    }


    /**
     * Write the choice to simplybook_{noticeId}_notice_choice.
     */
    private function storeChoice(string $noticeId, string $choice): bool
    {
        return update_option($this->choiceOptionName($noticeId), $choice, false);
    }


    /**
     * Read the timestamp of the "later" click from
     * simplybook_{noticeId}_notice_dismissed_time.
     */
    private function getSnoozedAt(string $noticeId): int
    {
        return (int) get_option($this->snoozedAtOptionName($noticeId), 0);
    }


    /**
     * Write the timestamp of the "later" click to
     * simplybook_{noticeId}_notice_dismissed_time.
     */
    private function storeSnoozedAt(string $noticeId, int $snoozedAt): bool
    {
        return update_option($this->snoozedAtOptionName($noticeId), $snoozedAt, false);
    }


    /**
     * Each notice has its own option for the choice.
     */
    private function choiceOptionName(string $noticeId): string
    {
        return 'simplybook_' . $noticeId . '_notice_choice';
    }


    /**
     * Each notice has its own option for the snooze timestamp.
     */
    private function snoozedAtOptionName(string $noticeId): string
    {
        return 'simplybook_' . $noticeId . '_notice_dismissed_time';
    }


    /**
     * Check if the notice is hidden for the current user by the X button.
     */
    private function isNoticeDismissedForUser(string $noticeId): bool
    {
        return in_array($noticeId, $this->getDismissedNoticesForUser(), true);
    }


    /**
     * Read the notice IDs hidden for the current user by the X button.
     */
    private function getDismissedNoticesForUser(): array
    {
        $dismissed = get_user_meta(get_current_user_id(), self::META_KEY, true);

        return is_array($dismissed) ? $dismissed : [];
    }


    /**
     * Write the notice IDs hidden for the current user by the X button.
     */
    private function storeDismissedNoticesForUser(array $noticeIds): bool
    {
        return update_user_meta(get_current_user_id(), self::META_KEY, $noticeIds) !== false;
    }


    /**
     * Build the full REST URL of a route of {@see AdminNoticesEndpoint}.
     */
    private function restUrl(string $route): string
    {
        return esc_url_raw(rest_url(
            $this->env->getString('plugin.namespace') . '/' . $this->env->getString('http.version') . '/' . $route
        ));
    }
}
