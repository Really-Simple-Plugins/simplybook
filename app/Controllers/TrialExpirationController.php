<?php

namespace SimplyBook\Controllers;

use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Services\AdminNoticeService;
use SimplyBook\Services\Entities\SubscriptionDataService;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class TrialExpirationController implements ControllerInterface
{
    use HasViews;
    use HasAllowlistControl;
    use LegacyLoad;

    private const NOTICE_ID = 'trial';

    private EnvironmentConfig $env;
    private SubscriptionDataService $subscriptionService;
    private AdminNoticeService $adminNoticeService;

    public function __construct(
        EnvironmentConfig $env,
        SubscriptionDataService $subscriptionService,
        AdminNoticeService $adminNoticeService
    ) {
        $this->env = $env;
        $this->subscriptionService = $subscriptionService;
        $this->adminNoticeService = $adminNoticeService;
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
        ] + $this->adminNoticeService->formVariables(self::NOTICE_ID));
    }

    /**
     * Process the "Remind me tomorrow" and "Don't show again" buttons of
     * the trial notice. Both choices are stored per user.
     */
    public function processTrialNoticeFormSubmit(): void
    {
        $choice = $this->adminNoticeService->submittedChoice(self::NOTICE_ID);
        if ($choice === null) {
            return;
        }

        $userId = get_current_user_id();

        if ($choice === AdminNoticeService::CHOICE_LATER) {
            $this->adminNoticeService->snoozeNotice($userId, self::NOTICE_ID, DAY_IN_SECONDS);
        }

        if ($choice === AdminNoticeService::CHOICE_NEVER) {
            $this->adminNoticeService->dismissNotice($userId, self::NOTICE_ID);
        }

        $this->adminNoticeService->forgetCanRender(self::NOTICE_ID);
    }

    public function enqueueScripts(): void
    {
        if ($this->canRenderTrialNotice() === false) {
            return;
        }

        $this->adminNoticeService->enqueue();
    }

    private function canRenderTrialNotice(): bool
    {
        return $this->adminNoticeService->canRender(self::NOTICE_ID, fn() => $this->isEligibleForTrialNotice());
    }

    /**
     * Check all sequential eligibility conditions for the trial notice.
     */
    private function isEligibleForTrialNotice(): bool
    {
        $userId = get_current_user_id();

        if ($this->adminNoticeService->isNoticeDismissed($userId, self::NOTICE_ID)) {
            return false;
        }

        if ($this->adminNoticeService->isNoticeSnoozed($userId, self::NOTICE_ID)) {
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
