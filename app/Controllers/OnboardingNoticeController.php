<?php
namespace SimplyBook\Controllers;

use Carbon\Carbon;
use SimplyBook\Bootstrap\App;
use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Services\NoticeDismissalService;

class OnboardingNoticeController implements ControllerInterface
{
    use HasViews;
    use HasAllowlistControl;

    private string $completeOnboardingAction = 'rsp_onboarding_notice_form_submit';
    private string $completeOnboardingNonceName = 'rsp_onboarding_notice_nonce';
    private NoticeDismissalService $noticeDismissalService;

    public function __construct(NoticeDismissalService $noticeDismissalService)
    {
        $this->noticeDismissalService = $noticeDismissalService;
    }

    public function register(): void
    {
        if ($this->adminAccessAllowed() === false) {
            return;
        }

        add_action('admin_enqueue_scripts', [$this, 'enqueueScripts']);
        add_action('admin_notices', [$this, 'showCompleteOnboardingNotice']);
        add_action('admin_init', [$this, 'processCompleteOnboardingNoticeFormSubmit']);
    }

    /**
     * Show a notice to complete the onboarding
     */
    public function showCompleteOnboardingNotice(): void
    {
        if ($this->canRenderNotice() === false) {
            return;
        }

        $noticeMessage = sprintf(
            // translators: %1$s and %2$s are replaced with opening and closing a tag containing hyperlink
            __('Hi! You have activated the SimplyBook.me plugin, but not yet completed the plugin onboarding. Take a minute to %1$scomplete the onboarding%2$s to immediately start collecting bookings on your site!'),
            '<a href="' . App::env('plugin.dashboard_url') . '">',
            '</a>'
        );

        $this->render('admin/complete-onboarding-notice', [
            'logoUrl' => App::env('plugin.assets_url') . 'img/simplybook-S-logo.png',
            'onboardingUrl' => App::env('plugin.dashboard_url'),
            'noticeMessage' => $noticeMessage,
            'completeOnboardingAction' => $this->completeOnboardingAction,
            'completeOnboardingNonceName' => $this->completeOnboardingNonceName,
        ]);
    }

    /**
     * Process the complete onboarding notice form submit
     */
    public function processCompleteOnboardingNoticeFormSubmit(): void
    {
        if (App::provide('request')->fromGlobal()->isEmpty('rsp_complete_onboarding_notice_form')) {
            return;
        }

        $request = App::provide('request')->fromGlobal();

        $nonce = $request->get($this->completeOnboardingNonceName);
        if (wp_verify_nonce($nonce, $this->completeOnboardingAction) === false) {
            return; // Invalid nonce
        }

        $choice = $request->getString('rsp_onboarding_notice_choice');
        if ($choice === 'later') {
            update_option('simplybook_complete_onboarding_notice_dismissed_time', time(), false);
            update_option('simplybook_complete_onboarding_notice_choice', 'later', false);
        }

        if ($choice === 'never') {
            update_option('simplybook_complete_onboarding_notice_choice', 'never', false);
        }
    }

    /**
     * Check if the notice can be rendered. True when:
     * - The user never finished the onboarding
     * - The user has not dismissed the notice
     * - The plugin activation timestamp is suitable for notice
     * - The notice dismissed time has passed
     * - The user is not on an edit screen
     * - The user is not on the plugin page
     */
    private function canRenderNotice(): bool
    {
        // Only show notice for users that did not complete the onboarding
        if (App::provide('client')->company_registration_complete()) {
            return false;
        }

        // Check if user dismissed via X button
        if ($this->noticeDismissalService->isNoticeDismissed(get_current_user_id(), 'complete_onboarding')) {
            return false;
        }

        // Check if user dismissed via form button
        $previousChoice = get_option('simplybook_complete_onboarding_notice_choice');
        if ($previousChoice === 'never') {
            return false;
        }

        if ($this->pluginInstallationTimeSuitableForNotice() === false) {
            return false;
        }

        if ($this->noticeDismissedTimeHasPassed() === false) {
            return false;
        }

        // Prevent showing the notice on edit screen, as gutenberg removes the
        // class which makes it editable. Also hide if user is on plugin page.
        $screen = get_current_screen();
        if ($screen && (('post' === $screen->base) || (str_contains($screen->base, 'simplybook')))) {
            return false;
        }

        return true;
    }

    /**
     * Check if the company registration time is more than 3 days ago.
     */
    private function pluginInstallationTimeSuitableForNotice(): bool
    {
        $pluginActivationTimestamp = get_option('simplybook_activation_unix_timestamp');
        if (empty($pluginActivationTimestamp)) {
            return false;
        }

        return $this->timestampIsAfter($pluginActivationTimestamp, 3);
    }

    /**
     * Check if the notice dismissed time is more than 7 days ago.
     */
    private function noticeDismissedTimeHasPassed(): bool
    {
        $noticeDismissedTime = get_option('simplybook_complete_onboarding_notice_dismissed_time');
        if (empty($noticeDismissedTime)) {
            return true; // default true to show the notice
        }

        return $this->timestampIsAfter($noticeDismissedTime, 7);
    }

    /**
     * Check if the timestamp is after the given amount of days ago.
     */
    private function timestampIsAfter($timestamp, int $daysAgo = 7): bool
    {
        $timestamp = Carbon::createFromTimestamp($timestamp);
        $daysAgo = Carbon::now()->subDays($daysAgo);

        return $timestamp->isBefore($daysAgo);
    }

    /**
     * Enqueue scripts for notice dismiss functionality
     */
    public function enqueueScripts(): void
    {
        // Only enqueue if the notice will be shown
        if ($this->canRenderNotice() === false) {
            return;
        }

        $this->noticeDismissalService->enqueue();
    }
}