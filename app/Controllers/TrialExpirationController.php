<?php

namespace SimplyBook\Controllers;

use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Services\NoticeDismissalService;
use SimplyBook\Services\Entities\SubscriptionDataService;
use SimplyBook\Support\Helpers\Storages\RequestStorage;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class TrialExpirationController implements ControllerInterface
{
    use HasViews;
    use HasAllowlistControl;
    use LegacyLoad;

    private const SNOOZED_UNTIL_META_KEY = 'simplybook_trial_notice_snoozed_until';
    private const ELIGIBILITY_CACHE_NAME = 'can_render_trial_expiration_notice';

    private string $trialAction = 'rsp_trial_form_submit';
    private string $trialNonceName = 'rsp_trial_nonce';

    private EnvironmentConfig $env;
    private SubscriptionDataService $subscriptionService;
    private NoticeDismissalService $noticeDismissalService;
    private RequestStorage $request;

    /**
     * Exact screen base identifiers on which the trial notice should not
     * be displayed. A "base" is the unique slug WordPress assigns to every
     * admin screen (e.g. "post", "edit", "upload").
     */
    private array $excludedScreenBases = [
        'post',
    ];

    /**
     * Substring patterns matched against the screen base. If any pattern
     * is found anywhere inside the base string the screen is excluded.
     * Use this for broad matches where multiple screens share a common
     * keyword (e.g. "simplybook" matches every plugin-specific screen).
     */
    private array $excludedScreenPatterns = [
        'simplybook',
    ];

    public function __construct(
        EnvironmentConfig $env,
        SubscriptionDataService $subscriptionService,
        NoticeDismissalService $noticeDismissalService,
        RequestStorage $request
    ) {
        $this->env = $env;
        $this->subscriptionService = $subscriptionService;
        $this->noticeDismissalService = $noticeDismissalService;
        $this->request = $request;
    }

    public function register(): void
    {
        if ($this->adminAccessAllowed() === false) {
            return;
        }

        add_action('admin_enqueue_scripts', [$this, 'enqueueScripts']);
        add_action('admin_notices', [$this, 'showTrialExpirationNotice']);
        add_action('admin_init', [$this, 'processTrialNoticeFormSubmit']);
    }

    public function showTrialExpirationNotice(): void
    {
        if ($this->canRenderTrialNotice() === false) {
            return;
        }

        $trialInfo = $this->getTrialInfo();
        $daysRemaining = $trialInfo['days_remaining'];
        $isExpired = $trialInfo['is_expired'];

        $message = esc_html__('Your free SimplyBook.me trial period has expired. Discover which plans best suit your site to continue gathering bookings!', 'simplybook');

        if (($isExpired === false) && ($daysRemaining > 0)) {
            $message = sprintf(
                // translators: %d is replaced by the number of days remaining
                __('Your free SimplyBook.me trial period will expire in %d days. Discover which plans best suit your site to continue gathering bookings!', 'simplybook'),
                $daysRemaining
            );
        }

        $this->render('admin/trial-notice', [
            'logoUrl' => $this->env->getUrl('plugin.assets_url') . 'img/simplybook-S-logo.png',
            'message' => $message,
            'plansPricesUrl' => $this->env->getUrl('plugin.plans_prices_url'),
            'trialAction' => $this->trialAction,
            'trialNonceName' => $this->trialNonceName,
        ]);
    }

    /**
     * Process the "Remind me tomorrow" and "Don't show again" buttons of
     * the trial notice. Both choices are stored per user.
     */
    public function processTrialNoticeFormSubmit(): void
    {
        if ($this->request->isEmpty('global.rsp_trial_form')) {
            return;
        }

        $nonce = $this->request->get('global.' . $this->trialNonceName);
        if (wp_verify_nonce($nonce, $this->trialAction) === false) {
            return; // Invalid nonce
        }

        $userId = get_current_user_id();
        $choice = $this->request->getString('global.rsp_trial_choice');

        if ($choice === 'later') {
            update_user_meta($userId, self::SNOOZED_UNTIL_META_KEY, (time() + DAY_IN_SECONDS));
        }

        if ($choice === 'never') {
            $this->noticeDismissalService->dismissNotice($userId, 'trial');
        }

        wp_cache_delete(self::ELIGIBILITY_CACHE_NAME, 'simplybook');
    }

    public function enqueueScripts(): void
    {
        if ($this->canRenderTrialNotice() === false) {
            return;
        }

        $this->noticeDismissalService->enqueue();
    }

    private function canRenderTrialNotice(): bool
    {
        if ($this->isCurrentScreenExcluded()) {
            return false;
        }

        $found = false;
        $cacheValue = wp_cache_get(self::ELIGIBILITY_CACHE_NAME, 'simplybook', false, $found);

        if ($found) {
            return (bool) $cacheValue;
        }

        $isEligible = $this->isEligibleForTrialNotice();
        $cacheDuration = ($isEligible ? MINUTE_IN_SECONDS : (MINUTE_IN_SECONDS * 10));
        wp_cache_set(self::ELIGIBILITY_CACHE_NAME, $isEligible, 'simplybook', $cacheDuration);

        return $isEligible;
    }

    /**
     * Check all sequential eligibility conditions for the trial notice.
     * The current screen is not part of these conditions because the
     * result is cached and must stay valid on every screen.
     */
    private function isEligibleForTrialNotice(): bool
    {
        $userId = get_current_user_id();

        if ($this->noticeDismissalService->isNoticeDismissed($userId, 'trial')) {
            return false;
        }

        if ($this->isSnoozed($userId)) {
            return false;
        }

        // User who did not complete the onboarding shouldn't see this notice
        if (get_option('simplybook_onboarding_completed', false) === false) {
            return false;
        }

        $trialInfo = $this->getTrialInfo();
        if ($trialInfo === null) {
            return false;
        }

        if ($trialInfo['is_expired'] && $trialInfo['days_since_expiration'] > 30) {
            return false;
        }

        return $trialInfo['is_expired'] || ($trialInfo['days_remaining'] <= 2);
    }

    /**
     * Check if the user clicked "Remind me tomorrow" less than a day ago.
     */
    private function isSnoozed(int $userId): bool
    {
        $snoozedUntil = (int) get_user_meta($userId, self::SNOOZED_UNTIL_META_KEY, true);

        return $snoozedUntil > time();
    }

    /**
     * Check if the screen the user is currently visiting should be excluded
     * from showing the trial notice.
     */
    private function isCurrentScreenExcluded(): bool
    {
        $screen = get_current_screen();
        if (!$screen) {
            return false;
        }

        if (in_array($screen->base, $this->excludedScreenBases, true)) {
            return true;
        }

        foreach ($this->excludedScreenPatterns as $pattern) {
            if (str_contains($screen->base, $pattern)) {
                return true;
            }
        }

        return false;
    }

    private function getTrialInfo(): ?array
    {
        $found = false;
        $cacheKey = 'simplybook_trial_info';
        $cacheGroup = 'simplybook';
        $cachedInfo = wp_cache_get($cacheKey, $cacheGroup, false, $found);
        $cacheDuration = (5 * MINUTE_IN_SECONDS);

        if ($found && is_array($cachedInfo)) {
            return $cachedInfo;
        }

        $subscriptionData = $this->subscriptionService->all(true);

        if (empty($subscriptionData)) {
            $subscriptionData = $this->subscriptionService->restore();
        }

        if (empty($subscriptionData)) {
            wp_cache_set($cacheKey, null, $cacheGroup, $cacheDuration);
            return null;
        }

        $subscriptionName = ($subscriptionData['subscription_name'] ?? '');
        if ($subscriptionName !== 'Trial') {
            wp_cache_set($cacheKey, null, $cacheGroup, $cacheDuration);
            return null;
        }

        $isExpired = ($subscriptionData['is_expired'] ?? false);
        $expireIn = ($subscriptionData['expire_in'] ?? 0);

        $trialInfo = [
            'is_expired' => (bool) $isExpired,
            'days_remaining' => $isExpired ? 0 : max(0, (int) $expireIn),
            'days_since_expiration' => $isExpired ? abs((int) $expireIn) : 0,
        ];

        wp_cache_set($cacheKey, $trialInfo, $cacheGroup, $cacheDuration);

        return $trialInfo;
    }
}
