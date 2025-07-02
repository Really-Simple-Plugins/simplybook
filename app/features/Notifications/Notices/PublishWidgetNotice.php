<?php

namespace SimplyBook\Features\Notifications\Notices;

use SimplyBook\Features\Onboarding\OnboardingService;

class PublishWidgetNotice extends AbstractNotice
{
    const IDENTIFIER = 'publish_widget_on_frontend';

    /**
     * This option is used to track if the user has already created the widget
     * on the front-end. Flag is one time use and is only used during the
     * initial setup of the Notification feature. Flag is set to true in
     * {@see OnboardingService::setPublishWidgetCompleted}
     *
     * @internal cannot be used in the {@see OnboardingController} because
     *  the feature is not loaded during onboarding.
     */
    const COMPLETED_FLAG = 'simplybook_calendar_published_notification_completed';

    public function __construct()
    {
        $active = true;

        if (get_option(self::COMPLETED_FLAG)) {
            $active = false;
            delete_option(self::COMPLETED_FLAG);
        }

        $this->setActive($active);
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