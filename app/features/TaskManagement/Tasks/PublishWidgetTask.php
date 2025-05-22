<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Features\Onboarding\OnboardingController;

class PublishWidgetTask extends AbstractTask
{
    const IDENTIFIER = 'publish_widget_on_frontend';

    /**
     * This option is used to track if the user has already created the widget
     * on the front-end. Flag is one time use and is only used during the
     * initial setup of the TaskManagement feature. Flag is set to true in
     *  {@see OnboardingService::setPublishWidgetCompleted}
     *
     * @internal cannot be used in the {@see OnboardingController} because
     * the feature is not loaded during onboarding.
     */
    const COMPLETED_FLAG = 'simplybook_calendar_published_task_completed';

    /**
     * Not required as tracking the task is difficult. For example: if someone
     * logs into an existing account, the task will be shown. But in that
     * scenario we are not certain if the user has already published
     * the widget or not.
     */
    protected bool $required = false;

    public function __construct()
    {
        $status = self::STATUS_URGENT;

        if (get_option(self::COMPLETED_FLAG)) {
            $status = self::STATUS_COMPLETED;
            delete_option(self::COMPLETED_FLAG);
        }

        $this->setStatus($status);
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('Publish the booking widget on the front-end of your site.','simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('Show shortcodes','simplybook'),
            'link' => 'settings/general',
        ];
    }
}