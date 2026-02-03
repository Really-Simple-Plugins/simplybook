<?php

namespace SimplyBook\Features\Notifications\Notices;

use SimplyBook\Services\WidgetTrackingService;

class PublishWidgetNotice extends AbstractNotice
{
    public const IDENTIFIER = 'publish_widget_on_frontend';

    private WidgetTrackingService $service;

    public function __construct(WidgetTrackingService $service)
    {
        $this->service = $service;

        $active = true;

        if ($this->service->hasTrackedPosts()) {
            $active = false;
        }

        $this->setActive($active);
    }

    /**
     * @inheritDoc
     */
    public function getTitle(): string
    {
        return __('No booking widget detected!', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __("It seems that you haven't published the booking widget on the front-end of your site. Please use the shortcode or Gutenberg Widget to create your booking page to accept bookings!", 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getType(): string
    {
        return self::TYPE_WARNING;
    }

    /**
     * @inheritDoc
     */
    public function getRoute(): string
    {
        return 'general';
    }
}
