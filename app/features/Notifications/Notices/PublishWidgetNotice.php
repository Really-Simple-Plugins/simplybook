<?php

namespace SimplyBook\Features\Notifications\Notices;

class PublishWidgetNotice extends AbstractNotice
{
    const IDENTIFIER = 'publish_widget_on_frontend';

    public function __construct()
    {
        $this->setActive(true);
    }

    /**
     * @inheritDoc
     */
    public function getTitle(): string
    {
        return esc_html__('No booking widget detected!', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('It seems that you haven’t published the booking widget on the front-end of your site. Please use the shortcode or Gutenberg Widget to create your booking page to accept bookings!', 'simplybook');
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