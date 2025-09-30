<?php
namespace SimplyBook\Controllers;

use Carbon\Carbon;
use SimplyBook\App;
use SimplyBook\Services\SubscriptionDataService;
use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Interfaces\ControllerInterface;

class TrialExpirationController implements ControllerInterface
{
    use HasViews;
    use HasAllowlistControl;
    use LegacyLoad;

    private SubscriptionDataService $service;

    public function __construct(SubscriptionDataService $service)
    {
        $this->service = $service;
    }

    public function register(): void
    {
        if ($this->adminAccessAllowed() === false) {
            return;
        }

        add_action('admin_notices', [$this, 'showTrialExpirationNotice']);
    }

    /**
     * Show a notice about trial expiration
     */
    public function showTrialExpirationNotice(): void
    {
        if ($this->canRenderTrialNotice() === false) {
            return;
        }

        $trialInfo = $this->getTrialInfo();
        $daysRemaining = $trialInfo['days_remaining'];
        $isExpired = $trialInfo['is_expired'];

        $message = esc_html__('Your free SimplyBook.me trial period has expired. Discover which plans best suit your site to continue gathering bookings!', 'simplybook');

        // Allmost expired.
        if (($isExpired === false) && ($daysRemaining > 0)) {
            $message = sprintf(
                // translators: %d is replaced by the number of days remaining
                __('Your free SimplyBook.me trial period will expire in %d days. Discover which plans best suit your site to continue gathering bookings!', 'simplybook'),
                $daysRemaining
            );
        }

        // Build the upgrade URL using the same pattern as DomainEndpoint
        $domain = $this->get_domain();
        $companyLogin = App::provide('client')->get_company_login();
        $upgradeUrl = "https://$companyLogin.secure.$domain/v2/r/payment-widget#/";

        $this->render('admin/trial-notice', [
            'logoUrl' => App::env('plugin.assets_url') . 'img/simplybook-S-logo.png',
            'upgradeUrl' => $upgradeUrl,
            'message' => $message,
        ]);
    }

    /**
     * Check if the trial notice can be rendered
     */
    private function canRenderTrialNotice(): bool
    {
        // Check if company registration is complete
        if (App::provide('client')->company_registration_complete() === false) {
            return false;
        }

        // Don't show on edit screens
        $screen = get_current_screen();
        if ($screen && ('post' === $screen->base)) {
            return false;
        }

        // Check if trial is approaching expiration or expired
        $trialInfo = $this->getTrialInfo();
        if ($trialInfo === null) {
            return false;
        }

        // Don't show notice if the trial expired more than 30 days ago
        if ($trialInfo['is_expired'] && $trialInfo['days_since_expiration'] > 30) {
            return false;
        }

        // Show if expired or expiring in 2 days or less
        return $trialInfo['is_expired'] || $trialInfo['days_remaining'] <= 2;
    }

    /**
     * Get trial information from subscription data
     */
    private function getTrialInfo(): ?array
    {
        // Check cache first
        $cacheKey = 'simplybook_trial_info';
		$cacheGroup = 'simplybook';
        $cachedInfo = wp_cache_get($cacheKey, $cacheGroup);
	    $cacheDuration = (5 * MINUTE_IN_SECONDS);
        if ($cachedInfo !== false) {
            return $cachedInfo;
        }

        $subscriptionData = $this->service->all(true);

        if (empty($subscriptionData)) {
            $subscriptionData = $this->service->restore();
        }

        if (empty($subscriptionData)) {
            wp_cache_set($cacheKey, null, $cacheGroup, $cacheDuration);
            return null;
        }

        // Only show notice for Trial subscriptions
        $subscriptionName = ($subscriptionData['subscription_name'] ?? '');
        if ($subscriptionName !== 'Trial') {
            wp_cache_set($cacheKey, null, $cacheGroup, $cacheDuration);
            return null;
        }

        // Get expiration data from API
        $isExpired = ($subscriptionData['is_expired'] ?? false);
        $expireIn = ($subscriptionData['expire_in'] ?? 0);

        // Return trial information
        $trialInfo = [
            'is_expired' => $isExpired,
            'days_remaining' => $isExpired ? 0 : max(0, (int) $expireIn),
            'days_since_expiration' => $isExpired ? abs((int) $expireIn) : 0,
        ];

        wp_cache_set($cacheKey, $trialInfo, $cacheGroup, $cacheDuration);

        return $trialInfo;
    }

}