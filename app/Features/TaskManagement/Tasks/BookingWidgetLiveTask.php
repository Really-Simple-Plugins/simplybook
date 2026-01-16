<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class BookingWidgetLiveTask extends AbstractTask
{
    public const IDENTIFIER = 'booking_widget_live';

    /**
     * Flag used to track if this task should be shown. Set to true when the
     * booking page is created during onboarding.
     */
    public const SHOW_FLAG = 'simplybook_booking_widget_live_task_show';

    /**
     * Not required as the user can dismiss it.
     */
    protected bool $required = false;

    public function __construct()
    {
        $status = self::STATUS_HIDDEN;

        if (get_option(self::SHOW_FLAG)) {
            $status = self::STATUS_URGENT;
            delete_option(self::SHOW_FLAG);
        }

        $this->setStatus($status);
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        $pageUrl = $this->getBookingPageUrl();

        if (empty($pageUrl)) {
            return __('Your Booking widget is live!', 'simplybook');
        }

        return sprintf(
            /* translators: %s is the link to the booking page */
            __('Your Booking widget is live! <a href="%s" target="_blank" rel="noopener noreferrer">Have a look</a>', 'simplybook'),
            esc_url($pageUrl)
        );
    }

    /**
     * Get the booking page URL dynamically.
     */
    private function getBookingPageUrl(): string
    {
        $pageId = (int) get_option('simplybook_booking_page_id', 0);

        if ($pageId <= 0) {
            return '';
        }

        $permalink = get_permalink($pageId);
        return $permalink !== false ? $permalink : '';
    }
}