<?php

namespace SimplyBook\Controllers;

use Carbon\Carbon;
use SimplyBook\Http\ApiClient;
use SimplyBook\Services\PluginFirstUseTimeService;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Services\AdminNoticeService;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class ReviewController implements ControllerInterface
{
    use HasAllowlistControl;

    public const NOTICE_ID = 'review';
    private const SNOOZE_DURATION = (30 * DAY_IN_SECONDS);

    /**
     * Don't render the notice on any of these screens. The SimplyBook
     * dashboard pages do show this notice.
     */
    private const EXCLUDED_SCREENS = [
        '/^post$/', // Post edit screen, exact screen name
    ];

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

        add_action('admin_notices', [$this, 'showLeaveReviewNotice']);
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

        $this->adminNoticeService->renderNotice('admin/review-notice', [
            'logoUrl' => $this->env->getUrl('plugin.assets_url') . 'img/simplybook-S-logo.png',
            'reviewUrl' => $this->env->getUrl('simplybook.review_url'),
            'reviewMessage' => $reviewMessage,
        ]);
    }

    /**
     * Check if the review notice can be rendered. True when:
     * - The user still has an authenticated SimplyBook session
     * - The user has not dismissed the notice
     * - The plugin first-use time is suitable for review
     * - The review notice snooze duration has passed
     * - The amount of bookings is greater than the threshold
     * - The user is not on an edit screen
     */
    private function canRenderReviewNotice(): bool
    {
        if ($this->client->isAuthenticated() === false) {
            return false;
        }

        if ($this->adminNoticeService->currentScreenMatches(self::EXCLUDED_SCREENS)) {
            return false;
        }

        if ($this->adminNoticeService->isNoticeActive(self::NOTICE_ID, self::SNOOZE_DURATION) === false) {
            return false;
        }

        if ($this->pluginFirstUseTimeSuitableForReview() === false) {
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

        return $this->timestampIsThirtyDaysAgo($pluginFirstUseTime);
    }

    /**
     * Check if the timestamp is more than 30 days ago.
     * @param float|int|string $timestamp
     */
    private function timestampIsThirtyDaysAgo($timestamp): bool
    {
        $timestamp = Carbon::createFromTimestamp($timestamp);
        $thirtyDaysAgo = Carbon::now()->subDays(30);

        return $timestamp->isBefore($thirtyDaysAgo);
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
