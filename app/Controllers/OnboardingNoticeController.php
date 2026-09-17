<?php

namespace SimplyBook\Controllers;

use Carbon\Carbon;
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
    private const SNOOZE_DURATION = (7 * DAY_IN_SECONDS);

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
        ]);
    }

    /**
     * Check if the notice can be rendered. True when:
     * - The user never finished the onboarding
     * - The user has not dismissed or snoozed the notice
     * - The plugin activation timestamp is suitable for notice
     */
    private function canRenderNotice(): bool
    {
        if ($this->adminNoticeService->canRender(self::NOTICE_ID, self::SNOOZE_DURATION) === false) {
            return false;
        }

        $found = false;
        $cacheName = 'can_render_onboarding_notice';
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found) {
            return (bool) $cacheValue;
        }

        $isEligible = $this->isEligibleForNotice();
        $cacheDuration = ($isEligible ? MINUTE_IN_SECONDS : (MINUTE_IN_SECONDS * 10));
        wp_cache_set($cacheName, $isEligible, 'simplybook', $cacheDuration);

        return $isEligible;
    }

    /**
     * Check all sequential eligibility conditions for the onboarding notice.
     * This method does not cache the result; caching is handled by canRenderNotice().
     */
    private function isEligibleForNotice(): bool
    {
        if ($this->pluginInstallationTimeSuitableForNotice() === false) {
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

        return $this->timestampIsAfter($pluginActivationTimestamp, 3);
    }

    /**
     * Check if the timestamp is after the given amount of days ago.
     * @param string|float|int $timestamp
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

        $this->adminNoticeService->enqueue();
    }
}
