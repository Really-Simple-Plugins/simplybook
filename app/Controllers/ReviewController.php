<?php

namespace SimplyBook\Controllers;

use SimplyBook\Http\ApiClient;
use SimplyBook\Services\PluginFirstUseTimeService;
use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Services\AdminNoticeService;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class ReviewController implements ControllerInterface
{
    use HasViews;
    use HasAllowlistControl;

    private const NOTICE_ID = 'review';

    private int $bookingThreshold = 2;
    private int $bookingsAmount; // Used as object cache

    private ApiClient $client;
    private PluginFirstUseTimeService $pluginFirstUseTimeService;
    private EnvironmentConfig $env;
    private AdminNoticeService $adminNoticeService;

    public function __construct(ApiClient $client, PluginFirstUseTimeService $pluginFirstUseTimeService, EnvironmentConfig $env, AdminNoticeService $adminNoticeService)
    {
        $this->client = $client;
        $this->pluginFirstUseTimeService = $pluginFirstUseTimeService;
        $this->env = $env;
        $this->adminNoticeService = $adminNoticeService;
    }

    public function register(): void
    {
        if ($this->adminAccessAllowed() === false) {
            return;
        }

        add_action('admin_enqueue_scripts', [$this, 'enqueueScripts']);
        add_action('admin_notices', [$this, 'showLeaveReviewNotice']);
        add_action('admin_init', [$this, 'processReviewFormSubmit']);
    }

    /**
     * Show a notice to leave a review
     */
    public function showLeaveReviewNotice(): void
    {
        if ($this->canRenderReviewNotice() === false) {
            return;
        }

        $reviewMessage = sprintf(
            // translators: %1$d is replaced by the amount of bookings, %2$ and %23$ are replaced with opening and closing a tag containing hyperlink
            __('Hi, SimplyBook.me has helped you reach %1$d bookings in the last 30 days. If you have a moment, please consider leaving a review on WordPress.org to spread the word. We greatly appreciate it! If you have any questions or feedback, leave us a %2$smessage%3$s.', 'simplybook'),
            $this->getAmountOfBookings(),
            '<a href="' . $this->env->getUrl('simplybook.support_url') . '"  rel="noopener noreferrer"  target="_blank">',
            '</a>'
        );

        $this->render('admin/review-notice', [
            'logoUrl' => $this->env->getUrl('plugin.assets_url') . 'img/simplybook-S-logo.png',
            'reviewUrl' => $this->env->getUrl('simplybook.review_url'),
            'reviewMessage' => $reviewMessage,
        ] + $this->adminNoticeService->formVariables(self::NOTICE_ID));
    }

    /**
     * Process the review form submit
     */
    public function processReviewFormSubmit(): void
    {
        $choice = $this->adminNoticeService->submittedChoice(self::NOTICE_ID);
        if ($choice === null) {
            return;
        }

        if ($choice === AdminNoticeService::CHOICE_LATER) {
            update_option('simplybook_review_notice_dismissed_time', time(), false);
        }

        update_option('simplybook_review_notice_choice', $choice, false);
        $this->adminNoticeService->forgetCanRender(self::NOTICE_ID);
    }

    /**
     * Check if the review notice can be rendered. True when:
     * - The user still has an authenticated SimplyBook session
     * - The user has not dismissed the notice
     * - The plugin first-use time is suitable for review
     * - The review notice dismissed time has passed
     * - The amount of bookings is greater than the threshold
     */
    private function canRenderReviewNotice(): bool
    {
        return $this->adminNoticeService->canRender(self::NOTICE_ID, fn() => $this->isEligibleForReviewNotice());
    }

    private function isEligibleForReviewNotice(): bool
    {
        if ($this->client->isAuthenticated() === false) {
            return false;
        }

        // Check if user dismissed via X button
        if ($this->adminNoticeService->isNoticeDismissed(get_current_user_id(), self::NOTICE_ID)) {
            return false;
        }

        // Check if user dismissed via form button
        $previousChoice = get_option('simplybook_review_notice_choice');
        if ($previousChoice === AdminNoticeService::CHOICE_NEVER) {
            return false;
        }

        if ($this->pluginFirstUseTimeSuitableForReview() === false) {
            return false;
        }

        if ($this->reviewNoticeDismissedTimeHasPassed() === false) {
            return false;
        }

        return $this->getAmountOfBookings() >= $this->bookingThreshold;
    }

    /**
     * Check if the plugin first-use time is more than 30 days ago.
     */
    private function pluginFirstUseTimeSuitableForReview(): bool
    {
        $pluginFirstUseTime = $this->pluginFirstUseTimeService->getPluginFirstUseTime();
        if (empty($pluginFirstUseTime)) {
            return false;
        }

        return $this->adminNoticeService->daysHavePassedSince($pluginFirstUseTime, 30);
    }

    /**
     * Check if the review notice dismissed time is more than 30 days ago.
     */
    private function reviewNoticeDismissedTimeHasPassed(): bool
    {
        $reviewNoticeDismissedTime = get_option('simplybook_review_notice_dismissed_time');
        if (empty($reviewNoticeDismissedTime)) {
            return true; // default true to show the notice
        }

        return $this->adminNoticeService->daysHavePassedSince($reviewNoticeDismissedTime, 30);
    }

    /**
     * Enqueue scripts for notice dismiss functionality
     */
    public function enqueueScripts(): void
    {
        // Only enqueue if the notice will be shown
        if ($this->canRenderReviewNotice() === false) {
            return;
        }

        $this->adminNoticeService->enqueue();
    }

    /**
     * Get the amount of bookings from the SimplyBook API. This is cached in
     * the object for performance reasons. In the response from the API the
     * 'bookings' key value is the amount of bookings for the last 30 days.
     */
    private function getAmountOfBookings(): int
    {
        if (isset($this->bookingsAmount)) {
            return $this->bookingsAmount; // Object cache
        }

        $statistics = $this->client->get_statistics();
        if (empty($statistics)) {
            $this->bookingsAmount = 0;
            return $this->bookingsAmount;
        }

        $this->bookingsAmount = ($statistics['bookings'] ?? 0);
        return $this->bookingsAmount;
    }
}
