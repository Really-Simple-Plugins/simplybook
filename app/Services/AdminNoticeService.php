<?php

namespace SimplyBook\Services;

use Carbon\Carbon;
use SimplyBook\Http\Endpoints\NoticesDismissEndpoint;
use SimplyBook\Support\Helpers\Storages\RequestStorage;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

/**
 * Shared logic for the admin notices of the plugin. The service stores
 * the per-user dismissed and snoozed state, handles the "later" or "never"
 * choice of the notice form, checks the current screen, caches the
 * eligibility result and enqueues the script for the X button.
 */
class AdminNoticeService
{
    private const CHOICE_LATER = 'later';
    private const CHOICE_NEVER = 'never';

    private const META_KEY = 'simplybook_dismissed_notices';
    private const SNOOZE_META_KEY = 'simplybook_snoozed_notices';
    private const FORM_FIELD = 'rsp_notice_form';
    private const CHOICE_FIELD = 'rsp_notice_choice';
    private const NONCE_NAME = 'rsp_notice_nonce';

    /**
     * Notices break the Gutenberg editor and the React app of the plugin.
     * No notice renders on a screen whose base matches one of these.
     */
    private const EXCLUDED_SCREEN_BASES = [
        'post',
        'simplybook',
    ];

    private EnvironmentConfig $env;
    private RequestStorage $request;

    public function __construct(EnvironmentConfig $env, RequestStorage $request)
    {
        $this->env = $env;
        $this->request = $request;
    }

    /**
     * Return the variables every notice view needs to render the form with
     * the "later" and "never" buttons.
     */
    public function formVariables(string $noticeId): array
    {
        return [
            'noticeId' => $noticeId,
            'formField' => self::FORM_FIELD,
            'choiceField' => self::CHOICE_FIELD,
            'nonceAction' => $this->nonceAction($noticeId),
            'nonceName' => self::NONCE_NAME,
        ];
    }

    /**
     * Handle the form submit of a site wide notice. The service stores the
     * choice in the option simplybook_{noticeId}_notice_choice. For "later"
     * it also stores the time in simplybook_{noticeId}_notice_dismissed_time.
     * Nothing happens when the request holds no valid form submit for this
     * notice.
     */
    public function handleFormSubmit(string $noticeId): void
    {
        $choice = $this->submittedChoice($noticeId);
        if ($choice === null) {
            return;
        }

        if ($choice === self::CHOICE_LATER) {
            update_option($this->dismissedTimeOptionName($noticeId), time(), false);
        }

        update_option($this->choiceOptionName($noticeId), $choice, false);

        wp_cache_delete($this->cacheName($noticeId), 'simplybook');
    }

    /**
     * Handle the form submit of a per-user notice. "Later" snoozes the
     * notice for $snoozeSeconds, "never" dismisses it for the current user.
     * Nothing happens when the request holds no valid form submit for this
     * notice.
     */
    public function handleUserFormSubmit(string $noticeId, int $snoozeSeconds): void
    {
        $choice = $this->submittedChoice($noticeId);
        if ($choice === null) {
            return;
        }

        $userId = get_current_user_id();

        if ($choice === self::CHOICE_LATER) {
            $this->snoozeNotice($userId, $noticeId, $snoozeSeconds);
        }

        if ($choice === self::CHOICE_NEVER) {
            $this->dismissNotice($userId, $noticeId);
        }

        wp_cache_delete($this->cacheName($noticeId), 'simplybook');
    }

    /**
     * Check if the "never" choice of a site wide notice is stored.
     * @see handleFormSubmit()
     */
    public function isNeverChoiceStored(string $noticeId): bool
    {
        return get_option($this->choiceOptionName($noticeId)) === self::CHOICE_NEVER;
    }

    /**
     * Check if the "later" choice of a site wide notice has expired. True
     * when the choice was never made.
     * @see handleFormSubmit()
     */
    public function laterChoiceHasExpired(string $noticeId, int $days): bool
    {
        $dismissedTime = get_option($this->dismissedTimeOptionName($noticeId));
        if (empty($dismissedTime)) {
            return true;
        }

        return $this->daysHavePassedSince($dismissedTime, $days);
    }

    /**
     * Read the choice the user made in the form of the given notice. Returns
     * null when the request holds no form submit for this notice or the
     * nonce is not valid.
     */
    private function submittedChoice(string $noticeId): ?string
    {
        if ($this->request->getString('global.' . self::FORM_FIELD) !== $noticeId) {
            return null;
        }

        $nonce = $this->request->get('global.' . self::NONCE_NAME);
        if (wp_verify_nonce($nonce, $this->nonceAction($noticeId)) === false) {
            return null;
        }

        $choice = $this->request->getString('global.' . self::CHOICE_FIELD);

        return in_array($choice, [self::CHOICE_LATER, self::CHOICE_NEVER], true) ? $choice : null;
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
     * Run the eligibility check of a notice and cache the result. A positive
     * result is cached for one minute, a negative result for ten minutes.
     * The screen check runs before the cache, because the result must stay
     * valid on every screen.
     */
    public function canRender(string $noticeId, callable $isEligible): bool
    {
        if ($this->currentScreenAllowsNotice() === false) {
            return false;
        }

        return (bool) $this->remember(
            $this->cacheName($noticeId),
            fn() => (bool) $isEligible(),
            MINUTE_IN_SECONDS,
            (MINUTE_IN_SECONDS * 10)
        );
    }

    /**
     * Return the value from the object cache. When the cache has no value,
     * the service runs $compute and stores the result. An empty result is
     * stored for $secondsWhenEmpty when given, so a failed lookup does not
     * run again on every request.
     * @return mixed
     */
    public function remember(string $cacheKey, callable $compute, int $seconds, ?int $secondsWhenEmpty = null)
    {
        $found = false;
        $cachedValue = wp_cache_get($cacheKey, 'simplybook', false, $found);

        if ($found) {
            return $cachedValue;
        }

        $value = $compute();
        if (empty($value) && ($secondsWhenEmpty !== null)) {
            $seconds = $secondsWhenEmpty;
        }

        wp_cache_set($cacheKey, $value, 'simplybook', $seconds);

        return $value;
    }

    /**
     * Check if the given amount of days has passed since the timestamp.
     * @param string|float|int $timestamp
     */
    public function daysHavePassedSince($timestamp, int $days): bool
    {
        return Carbon::createFromTimestamp($timestamp)->isBefore(Carbon::now()->subDays($days));
    }

    private function nonceAction(string $noticeId): string
    {
        return 'rsp_notice_form_submit_' . $noticeId;
    }

    private function cacheName(string $noticeId): string
    {
        return 'can_render_' . $noticeId . '_notice';
    }

    private function choiceOptionName(string $noticeId): string
    {
        return 'simplybook_' . $noticeId . '_notice_choice';
    }

    private function dismissedTimeOptionName(string $noticeId): string
    {
        return 'simplybook_' . $noticeId . '_notice_dismissed_time';
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
    private function snoozeNotice(int $userId, string $noticeId, int $seconds): bool
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
