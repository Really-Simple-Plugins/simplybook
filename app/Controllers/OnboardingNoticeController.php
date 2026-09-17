<?php

namespace SimplyBook\Controllers;

use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Services\ExtendifyDataService;
use SimplyBook\Services\AdminNoticeService;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class OnboardingNoticeController implements ControllerInterface
{
    use HasViews;
    use HasAllowlistControl;

    private const NOTICE_ID = 'complete_onboarding';

    private EnvironmentConfig $env;
    private ExtendifyDataService $extendifyDataService;
    private AdminNoticeService $adminNoticeService;

    public function __construct(EnvironmentConfig $env, ExtendifyDataService $extendifyDataService, AdminNoticeService $adminNoticeService)
    {
        $this->env = $env;
        $this->extendifyDataService = $extendifyDataService;
        $this->adminNoticeService = $adminNoticeService;
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
            '<a href="' . $this->env->getUrl('plugin.dashboard_url') . '">',
            '</a>'
        );

        $this->render('admin/complete-onboarding-notice', [
            'logoUrl' => $this->env->getUrl('plugin.assets_url') . 'img/simplybook-S-logo.png',
            'onboardingUrl' => $this->env->getUrl('plugin.dashboard_url'),
            'noticeMessage' => $noticeMessage,
        ] + $this->adminNoticeService->formVariables(self::NOTICE_ID));
    }

    /**
     * Process the complete onboarding notice form submit
     */
    public function processCompleteOnboardingNoticeFormSubmit(): void
    {
        $this->adminNoticeService->handleFormSubmit(
            self::NOTICE_ID,
            function () {
                update_option('simplybook_complete_onboarding_notice_dismissed_time', time(), false);
                update_option('simplybook_complete_onboarding_notice_choice', AdminNoticeService::CHOICE_LATER, false);
            },
            fn() => update_option('simplybook_complete_onboarding_notice_choice', AdminNoticeService::CHOICE_NEVER, false)
        );
    }

    /**
     * Check if the notice can be rendered. True when:
     * - The user never finished the onboarding
     * - The user has not dismissed the notice
     * - The plugin activation timestamp is suitable for notice
     * - The notice dismissed time has passed
     */
    private function canRenderNotice(): bool
    {
        return $this->adminNoticeService->canRender(self::NOTICE_ID, fn() => $this->isEligibleForNotice());
    }

    /**
     * Check all sequential eligibility conditions for the onboarding notice.
     */
    private function isEligibleForNotice(): bool
    {
        // Check if user dismissed via form button
        $previousChoice = get_option('simplybook_complete_onboarding_notice_choice');
        if ($previousChoice === AdminNoticeService::CHOICE_NEVER) {
            return false;
        }

        if ($this->pluginInstallationTimeSuitableForNotice() === false) {
            return false;
        }

        if ($this->noticeDismissedTimeHasPassed() === false) {
            return false;
        }

        // Check if user dismissed via X button
        if ($this->adminNoticeService->isNoticeDismissed(get_current_user_id(), self::NOTICE_ID)) {
            return false;
        }

        // Abort if the onboarding was completed prior
        if (get_option('simplybook_onboarding_completed', false) !== false) {
            return false;
        }

        return true;
    }

    /**
     * Determine whether the installation age allows the notice to show.
     *
     * Regular installs can show the notice immediately, Extendify installs keep
     * the activation delay.
     */
    private function pluginInstallationTimeSuitableForNotice(): bool
    {
        if ($this->extendifyDataService->isPluginActive() === false) {
            return true;
        }

        $pluginActivationTimestamp = get_option('simplybook_activation_unix_timestamp');
        if (empty($pluginActivationTimestamp)) {
            return false;
        }

        return $this->adminNoticeService->daysHavePassedSince($pluginActivationTimestamp, 3);
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

        return $this->adminNoticeService->daysHavePassedSince($noticeDismissedTime, 7);
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

        $this->adminNoticeService->enqueue();
    }
}
