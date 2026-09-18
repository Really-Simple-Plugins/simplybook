<?php

namespace SimplyBook\Services;

use SimplyBook\Traits\HasViews;
use SimplyBook\Controllers\ReviewController;
use SimplyBook\Controllers\OnboardingNoticeController;
use SimplyBook\Controllers\TrialExpirationController;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

/**
 * Shared logic for the admin notices. The X button hides a notice for the
 * current user in user meta. The "never" and "later" buttons hide a notice
 * for the whole site in wp_options. The buttons call the routes of
 * {@see \SimplyBook\Http\Endpoints\AdminNoticesEndpoints}.
 */
class AdminNoticeService
{
    use HasViews;

    private const META_KEY = 'simplybook_dismissed_notices';

    private const CHOICE_LATER = 'later';
    private const CHOICE_NEVER = 'never';

    /**
     * Don't render the notices on any of these screens.
     */
    private const EXCLUDED_SCREENS = [
        '/^post$/', // Post edit screen, exact screen name
        '/simplybook/', // SimplyBook dashboard pages, part of screen name
    ];

    private EnvironmentConfig $env;
    private bool $assetsEnqueued = false;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    /**
     * IDs of all notices. Used to validate the notice_id of the REST routes.
     *
     * @return string[]
     */
    public function getAllNoticeIds(): array
    {
        return [
            TrialExpirationController::NOTICE_ID,
            ReviewController::NOTICE_ID,
            OnboardingNoticeController::NOTICE_ID,
        ];
    }

    /**
     * Check if the notice is not dismissed or snoozed, and if the current
     * screen allows a notice. The controller holds the snooze duration of its
     * notice.
     *
     * @param int $snoozeDuration Duration in seconds.
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
     * Dismiss the notice for the current user, by the X button.
     */
    public function dismissNoticeForUser(string $noticeId): bool
    {
        $dismissedNotices = $this->getDismissedNoticesForUser();

        if (in_array($noticeId, $dismissedNotices, true)) {
            return true;
        }

        $dismissedNotices[] = $noticeId;

        return $this->updateUserDismissedNotices($dismissedNotices);
    }


    /**
     * Dismiss the notice for the whole site, by the "never" button.
     */
    public function dismissNotice(string $noticeId): bool
    {
        return $this->storeChoice($noticeId, self::CHOICE_NEVER);
    }


    /**
     * Mark the notice as snoozed for the whole site, by the "later" button.
     */
    public function snoozeNotice(string $noticeId): bool
    {
        $this->storeSnoozedAt($noticeId, time());

        return $this->storeChoice($noticeId, self::CHOICE_LATER);
    }


    /**
     * Render the view of a notice with its stylesheet and script. Call this
     * method in the admin_notices action.
     */
    public function renderNotice(string $view, array $variables): void
    {
        $this->enqueueAssets();
        $this->render($view, $variables);
    }

    /**
     * Print the stylesheet of the notices before the first notice and
     * enqueue the script that handles the buttons. The admin_notices action
     * runs after the admin head. A stylesheet in the footer would show the
     * notice without styles for a moment. WordPress prints the script in the
     * admin footer.
     */
    private function enqueueAssets(): void
    {
        if ($this->assetsEnqueued) {
            return;
        }

        $this->assetsEnqueued = true;

        wp_register_style(
            'simplybook-admin-notices',
            $this->env->getUrl('plugin.assets_url') . 'css/admin-notices.css',
            [],
            $this->env->getString('plugin.version')
        );
        wp_print_styles('simplybook-admin-notices');

        wp_enqueue_script(
            'simplybook-notice-dismiss',
            $this->env->getUrl('plugin.assets_url') . 'js/notices/admin-notice-dismiss.js',
            ['jquery', 'wp-api-fetch'],
            $this->env->getString('plugin.version'),
            true
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

        foreach (self::EXCLUDED_SCREENS as $pattern) {
            if (preg_match($pattern, $screen->base) === 1) {
                return false;
            }
        }

        return true;
    }


    /**
     * Check if the notice is dismissed for the whole site.
     */
    private function isNoticeDismissed(string $noticeId): bool
    {
        return $this->getChoice($noticeId) === self::CHOICE_NEVER;
    }


    /**
     * Check if the notice is snoozed within the snooze duration.
     *
     * @param int $snoozeDuration Duration in seconds.
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
     * Read "later" or "never" choice from simplybook_{noticeId}_notice_choice
     */
    private function getChoice(string $noticeId): ?string
    {
        return get_option($this->choiceOptionName($noticeId), null);
    }


    /**
     * Write "later" or "never" to simplybook_{noticeId}_notice_choice.
     */
    private function storeChoice(string $noticeId, string $choice): bool
    {
        return update_option($this->choiceOptionName($noticeId), $choice, false);
    }


    /**
     * Read the snoozedAt timestamp of the notice from
     * simplybook_{noticeId}_notice_dismissed_time.
     */
    private function getSnoozedAt(string $noticeId): int
    {
        return (int) get_option($this->snoozedAtOptionName($noticeId), 0);
    }


    /**
     * Store the snoozeAt timestamp to
     * simplybook_{noticeId}_notice_dismissed_time.
     */
    private function storeSnoozedAt(string $noticeId, int $snoozedAt): bool
    {
        return update_option($this->snoozedAtOptionName($noticeId), $snoozedAt, false);
    }


    /**
     * Each notice has its own option for the "later" or "never" choice.
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
     * Check if the notice is dismissed by the current user.
     */
    private function isNoticeDismissedForUser(string $noticeId): bool
    {
        return in_array($noticeId, $this->getDismissedNoticesForUser(), true);
    }


    /**
     * Get the dismissed notice IDs for the current user.
     */
    private function getDismissedNoticesForUser(): array
    {
        $dismissed = get_user_meta(get_current_user_id(), self::META_KEY, true);

        return is_array($dismissed) ? $dismissed : [];
    }


    /**
     * Update the dismissed notice IDs for the current user.
     */
    private function updateUserDismissedNotices(array $noticeIds): bool
    {
        return update_user_meta(get_current_user_id(), self::META_KEY, $noticeIds) !== false;
    }
}
