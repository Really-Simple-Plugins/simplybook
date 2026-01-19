<?php

namespace SimplyBook\Controllers;

use SimplyBook\Support\Helpers\Event;
use SimplyBook\Services\BookingPageService;
use SimplyBook\Interfaces\ControllerInterface;

/**
 * Controller responsible for handling frontend interactions with the booking page.
 *
 * This controller detects when users visit the booking page via the tracking
 * parameter and dispatches an event to notify other parts of the application.
 */
class BookingPageController implements ControllerInterface
{
    private BookingPageService $bookingPageService;

    public function __construct(BookingPageService $bookingPageService)
    {
        $this->bookingPageService = $bookingPageService;
    }

    public function register(): void
    {
        add_action('template_redirect', [$this, 'handleBookingPageVisit']);
    }

    /**
     * Handle booking page visits with the tracking parameter.
     * When a user visits the booking page via the task button (which includes
     * the tracking parameter), we mark the page as visited and dispatch an event.
     */
    public function handleBookingPageVisit(): void
    {
        if (!$this->bookingPageService->hasVisitTrackingParameter()) {
            return;
        }

        if (!$this->bookingPageService->isOnBookingPage()) {
            return;
        }

        $this->bookingPageService->markAsVisited();

        Event::dispatch(Event::BOOKING_PAGE_VISITED);
    }
}