<?php

namespace SimplyBook\Controllers;

use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Services\AdminNoticeService;
use SimplyBook\Services\Entities\SubscriptionDataService;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class TrialExpirationController implements ControllerInterface
{
    use HasAllowlistControl;
    use LegacyLoad;

    public const NOTICE_ID = 'trial';
    private const SNOOZE_DURATION = DAY_IN_SECONDS;

    /**
     * Don't render the notice on any of these screens. The SimplyBook
     * dashboard pages do show this notice.
     */
    private const EXCLUDED_SCREENS = [
        '/^post$/', // Post edit screen, exact screen name
    ];

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

        add_action('admin_notices', [$this, 'showTrialExpirationNotice']);
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

        $this->adminNoticeService->renderNotice('admin/trial-notice', [
            'logoUrl' => $this->env->getUrl('plugin.assets_url') . 'img/simplybook-S-logo.png',
            'message' => $message,
            'plansPricesUrl' => $this->env->getUrl('plugin.plans_prices_url'),
        ]);
    }

    /**
     * Check if the trial notice can be rendered. True when:
     * - The user has not dismissed the notice
     * - The trial notice snooze duration has passed
     * - The user is not on an edit screen
     * - The user finished the onboarding
     * - The subscription is a trial
     * - The trial expires within 2 days, or expired less than 30 days ago
     */
    private function canRenderTrialNotice(): bool
    {
        if ($this->adminNoticeService->currentScreenMatches(self::EXCLUDED_SCREENS)) {
            return false;
        }

        if ($this->adminNoticeService->isNoticeActive(self::NOTICE_ID, self::SNOOZE_DURATION) === false) {
            return false;
        }

        $found = false;
        $cacheName = 'can_render_trial_expiration_notice';
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found) {
            return (bool) $cacheValue;
        }

        $isEligible = $this->isEligibleForTrialNotice();
        $cacheDuration = ($isEligible ? MINUTE_IN_SECONDS : (MINUTE_IN_SECONDS * 10));
        wp_cache_set($cacheName, $isEligible, 'simplybook', $cacheDuration);

        return $isEligible;
    }

    /**
     * Check all sequential eligibility conditions for the trial notice.
     */
    private function isEligibleForTrialNotice(): bool
    {
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
