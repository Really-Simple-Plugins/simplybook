<?php
namespace SimplyBook\Controllers;

use Carbon\Carbon;
use SimplyBook\App;
use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\ControllerInterface;

class TrialExpirationController implements ControllerInterface
{
    use HasViews;
    use HasAllowlistControl;

o    public function register(): void
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
        $trialInfo = $this->getTrialInfo();
        if ($this->canRenderTrialNotice($trialInfo) === false) {
            return;
        }

        $daysRemaining = $trialInfo['days_remaining'];
        $isExpired = $trialInfo['is_expired'];
        $companyId = $this->getCompanyId();

        
            $message = esc_html__('Your free SimplyBook.me trial period has expired. Discover which plans best suit your site to continue gathering bookings!', 'simplybook');
        
        // Allmost expired.
        if (($isExpired === false) && ($daysRemaining > 0)) {
            $message = sprintf(
                // translators: %d is replaced by the number of days remaining
                __('Your free SimplyBook.me trial period will expire in %d days. Discover which plans best suit your site to continue gathering bookings!', 'simplybook'),
                $daysRemaining
            );
        }

        $this->render('admin/trial-notice', [
            'logoUrl' => App::env('plugin.assets_url') . 'img/simplybook-S-logo.png',
            'upgradeUrl' => sprintf('https://app.simplybook.me/v2/payment-widget#/%s', $companyId),
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

        // Show if expired or expiring in 2 days or less
        return $trialInfo['is_expired'] || $trialInfo['days_remaining'] <= 2;
    }

    /**
     * Get trial information from subscription data
     */
    private function getTrialInfo(): ?array
    {
        $subscriptionData = App::provide('subscription_data')->all();
        
        if (empty($subscriptionData)) {
            return null;
        }

        // Check if we have trial end date in subscription data
        if (!isset($subscriptionData['trial_end'])) {
            return null;
        }

        $trialEndDate = Carbon::parse($subscriptionData['trial_end']);
        $now = Carbon::now();
        
        $isExpired = $now->isAfter($trialEndDate);
        $daysRemaining = $isExpired ? 0 : $now->diffInDays($trialEndDate, false);

        // Don't show notice if more than 30 days have passed since expiration
        if ($isExpired && $now->diffInDays($trialEndDate) > 30) {
            return null;
        }

        return [
            'is_expired' => $isExpired,
            'days_remaining' => max(0, $daysRemaining),
            'trial_end_date' => $trialEndDate->toDateTimeString(),
        ];
    }

    /**
     * Get the company ID for the upgrade URL
     */
    private function getCompanyId(): string
    {
        $options = get_option('simplybook_options', []);
        return isset($options['company_id']) ? (string) $options['company_id'] : '';
    }
}