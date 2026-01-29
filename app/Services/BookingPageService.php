<?php

namespace SimplyBook\Services;

use SimplyBook\Support\Builders\PageBuilder;

/**
 * Service for managing the SimplyBook booking page.
 *
 * This service handles the business logic for creating and retrieving
 * the booking page with the SimplyBook widget shortcode.
 */
class BookingPageService
{
    public const BOOKING_PAGE_OPTION = 'simplybook_booking_page_id';
    public const VISIT_TRACKING_PARAM = 'simplybook_verify';
    public const VISITED_FLAG = 'simplybook_booking_page_visited';

    /**
     * Generate the booking page with the SimplyBook widget shortcode.
     * Uses a translatable slug so Dutch users get "kalender" instead of "calendar".
     * WordPress automatically handles slug uniqueness by appending -2, -3, etc.
     *
     * @return array{
     *      success: bool,
     *      page_id: int,
     *      page_url: string,
     *      message: string,
     *  }
     */
    public function generateBookingPage(): array
    {
        $existingPageId = $this->getBookingPageId();
        if ($existingPageId > 0) {
            return [
                'success' => true,
                'page_id' => $existingPageId,
                'page_url' => $this->getBookingPageUrl(),
                'message' => __('Booking page already exists.', 'simplybook'),
            ];
        }

        $slug = __('calendar', 'simplybook');
        $title = sprintf(
            /* translators: %1$s is the brand name "SimplyBook.me" (do not translate) */
            __('%1$s Booking page', 'simplybook'),
            'SimplyBook.me'
        );

        $pageId = (new PageBuilder())
            ->setTitle($title)
            ->setSlug($slug)
            ->setContent('[simplybook_widget]')
            ->insert();

        if ($pageId === -1) {
            return [
                'success' => false,
                'page_id' => -1,
                'page_url' => '',
                'message' => __('Failed to create booking page.', 'simplybook'),
            ];
        }

        $this->storeBookingPageId($pageId);

        return [
            'success' => true,
            'page_id' => $pageId,
            'page_url' => $this->getBookingPageUrl(),
            'message' => __('Booking page created successfully.', 'simplybook'),
        ];
    }

    /**
     * Store the generated booking page ID in options.
     */
    public function storeBookingPageId(int $pageId): void
    {
        update_option(self::BOOKING_PAGE_OPTION, $pageId, false);
    }

    /**
     * Retrieve the stored booking page ID.
     */
    public function getBookingPageId(): int
    {
        return (int) get_option(self::BOOKING_PAGE_OPTION, 0);
    }

    /**
     * Get the booking page URL if it exists.
     */
    public function getBookingPageUrl(): string
    {
        $pageId = $this->getBookingPageId();
        if ($pageId <= 0) {
            return '';
        }

        $permalink = get_permalink($pageId);
        return $permalink !== false ? $permalink : '';
    }

    /**
     * Get the booking page URL with the visit tracking parameter. Used by the
     * BookingWidgetLiveTask to track when users visit the page.
     */
    public function getBookingPageUriWithTracking(): string
    {
        $url = $this->getBookingPageUrl();
        if (empty($url)) {
            return '';
        }

        return add_query_arg(self::VISIT_TRACKING_PARAM, '1', $url);
    }

    /**
     * Check if a booking page exists and is published.
     */
    public function hasBookingPage(): bool
    {
        $cacheKey = 'simplybook_has_booking_page';
        $cachedResult = wp_cache_get($cacheKey, 'simplybook', false, $found);
        if ($found) {
            return $cachedResult;
        }

        $pageId = $this->getBookingPageId();
        if ($pageId <= 0) {
            wp_cache_set($cacheKey, false, 'simplybook');
            return false;
        }

        $post = get_post($pageId);
        $hasBookingPage = ($post instanceof \WP_Post && $post->post_status === 'publish');

        wp_cache_set($cacheKey, $hasBookingPage, 'simplybook');
        return $hasBookingPage;
    }

    /**
     * Check if the current request contains the visit tracking parameter.
     */
    public function uriHasVisitTrackingParameter(): bool
    {
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only tracking parameter
        return isset($_GET[self::VISIT_TRACKING_PARAM]);
    }

    /**
     * Check if the user is currently on the booking page.
     */
    public function userIsOnBookingPage(): bool
    {
        $bookingPageId = $this->getBookingPageId();

        return $bookingPageId > 0 && is_page($bookingPageId);
    }

    /**
     * Determine if the current visit can be tracked as an admin booking page
     * visit.
     */
    public function visitCanBeTracked(): bool
    {
        if (!is_user_logged_in()) {
            return false; // abort for non-logged-in users
        }

        if ($this->hasBeenVisited()) {
            return false; // already visited
        }

        if (!$this->uriHasVisitTrackingParameter()) {
            return false; // no tracking parameter
        }

        if (!$this->userIsOnBookingPage()) {
            return false; // not on booking page
        }

        return true;
    }

    /**
     * Mark the booking page as visited. Autoload the option because it's
     * checked frequently.
     */
    public function markAsVisited(): void
    {
        update_option(self::VISITED_FLAG, true, true);
    }

    /**
     * Check if the booking page has been visited.
     */
    public function hasBeenVisited(): bool
    {
        return (bool) get_option(self::VISITED_FLAG, false);
    }
}
