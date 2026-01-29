<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Services\BookingPageService;

/**
 * Task to encourage users to view their live booking widget.
 * Completes when the user visits the booking page with the tracking parameter.
 */
class VisitYourBookingPageTask extends AbstractTask
{
    public const IDENTIFIER = 'visit_your_page_on_frontend';

    /**
     * Task is dismissible.
     */
    protected bool $required = false;

    private BookingPageService $bookingPageService;

    public function __construct(BookingPageService $bookingPageService)
    {
        $this->bookingPageService = $bookingPageService;
        $this->setStatus(
            $this->getInitialStatus()
        );
    }

    /**
     * Return the initial status of the task based on booking page state.
     */
    private function getInitialStatus(): string
    {
        // If no booking page exists, hide the task
        if ($this->bookingPageService->hasBookingPage() === false) {
            return self::STATUS_HIDDEN;
        }

        // If user has already visited the page, mark as completed
        if ($this->bookingPageService->hasBeenVisited()) {
            return self::STATUS_COMPLETED;
        }

        // Otherwise, task is open
        return self::STATUS_OPEN;
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('Your Booking widget is live!', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        // If this is the case the task isn't shown anyway.
        if ($this->bookingPageService->hasBookingPage() === false) {
            return [];
        }

        return [
            'type' => 'button',
            'text' => __('Have a look', 'simplybook'),
            'link' => $this->bookingPageService->getBookingPageUriWithTracking(),
            'external' => true,
        ];
    }
}
