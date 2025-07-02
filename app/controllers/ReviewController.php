<?php
namespace SimplyBook\Controllers;

use Carbon\Carbon;
use SimplyBook\App;
use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\ControllerInterface;

class ReviewController implements ControllerInterface
{
    use HasViews;
    use HasAllowlistControl;

    private string $reviewAction = 'rsp_review_form_submit';
    private string $reviewNonceName = 'rsp_review_nonce';
    private int $bookingThreshold = 2;
    private int $bookingsAmount; // Used as object cache

    public function register(): void
    {
        if ($this->adminAccessAllowed() === false) {
            return;
        }

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
            '<a href="' . App::env('simplybook.support_url') . '"  rel="noopener noreferrer"  target="_blank">',
            '</a>'
        );

        $this->render('admin/review-notice', [
            'logoUrl' => App::env('plugin.assets_url') . 'img/simplybook-S-logo.png',
            'reviewUrl' => App::env('simplybook.review_url'),
            'reviewMessage' => $reviewMessage,
            'reviewAction' => $this->reviewAction,
            'reviewNonceName' => $this->reviewNonceName,
        ]);
    }

    /**
     * Process the review form submit
     */
    public function processReviewFormSubmit(): void
    {
        if (App::provide('request')->fromGlobal()->isEmpty('rsp_review_form')) {
            return;
        }

        $request = App::provide('request')->fromGlobal();

        $nonce = $request->get($this->reviewNonceName);
        if (wp_verify_nonce($nonce, $this->reviewAction) === false) {
            return; // Invalid nonce
        }

        $choice = $request->getString('rsp_review_choice');
        if ($choice === 'later') {
            update_option('simplybook_review_notice_dismissed_time', time(), false);
            update_option('simplybook_review_notice_choice', 'later', false);
        }

        if ($choice === 'never') {
            update_option('simplybook_review_notice_choice', 'never', false);
        }
    }

    /**
     * Check if the review notice can be rendered. True when:
     * - The user has not dismissed the notice
     * - The company registration time is suitable for review
     * - The review notice dismissed time has passed
     * - The amount of bookings is greater than the threshold
     * - The user is not on an edit screen
     */
    private function canRenderReviewNotice(): bool
    {
        $previousChoice = get_option('simplybook_review_notice_choice');
        if ($previousChoice === 'never') {
            return false;
        }

        if ($this->companyRegisteredTimeSuitableForReview() === false) {
            return false;
        }

        if ($this->reviewNoticeDismissedTimeHasPassed() === false) {
            return false;
        }

        if ($this->getAmountOfBookings() < $this->bookingThreshold) {
            return false;
        }

        // Prevent showing the review on edit screen, as gutenberg removes the
        // class which makes it editable.
        $screen = get_current_screen();
        if ($screen && ('post' === $screen->base)) {
            return false;
        }

        return true;
    }

    /**
     * Check if the company registration time is more than 30 days ago.
     */
    private function companyRegisteredTimeSuitableForReview(): bool
    {
        $companyRegistrationStartTime = get_option('simplybook_company_registration_start_time');
        if (empty($companyRegistrationStartTime)) {
            return false;
        }

        return $this->timestampIsThirtyDaysAgo($companyRegistrationStartTime);
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

        return $this->timestampIsThirtyDaysAgo($reviewNoticeDismissedTime);
    }

    /**
     * Check if the timestamp is more than 30 days ago.
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

        $statistics = App::provide('client')->get_statistics();
        if (empty($statistics)) {
            $this->bookingsAmount = 0;
            return $this->bookingsAmount;
        }

        $this->bookingsAmount = ($statistics['bookings'] ?? 0);
        return $this->bookingsAmount;
    }
}