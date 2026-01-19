<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Services\BookingPageService;

/**
 * Task to encourage users to view their live booking widget.
 * Completes when the user visits the booking page with the tracking parameter.
 */
class BookingWidgetLiveTask extends AbstractTask
{
    public const IDENTIFIER = 'booking_widget_live';

    /**
     * Task is dismissable.
     */
    protected bool $required = false;

    private BookingPageService $bookingPageService;

    public function __construct(BookingPageService $bookingPageService)
    {
        $this->bookingPageService = $bookingPageService;

        $this->determineInitialStatus();
    }

    /**
     * Determine the initial status of the task based on booking page state.
     */
    private function determineInitialStatus(): void
    {
        // If no booking page exists, hide the task
        if (!$this->bookingPageService->hasBookingPage()) {
            $this->setStatus(self::STATUS_HIDDEN);
            return;
        }

        // If user has already visited the page, mark as completed
        if ($this->bookingPageService->hasBeenVisited()) {
            $this->setStatus(self::STATUS_COMPLETED);
            return;
        }

        // Otherwise, task is open
        $this->setStatus(self::STATUS_OPEN);
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('View your live booking widget on your website.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        $url = $this->bookingPageService->getBookingPageUrlWithTracking();

        if (empty($url)) {
            return [];
        }

        return [
            'type' => 'button',
            'text' => __('View booking page', 'simplybook'),
            'link' => $url,
            'external' => true,
        ];
    }
}
