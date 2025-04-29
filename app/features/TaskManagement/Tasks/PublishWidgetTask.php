<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class PublishWidgetTask extends AbstractTask
{
    const IDENTIFIER = 'publish_widget_on_frontend';

    /**
     * Not required as tracking the task is difficult. For example: if someone
     * logs into an existing account, the task will be shown. But in that
     * scenario we are not certain if the user has already published
     * the widget or not.
     */
    protected bool $required = false;

    public function __construct()
    {
        $this->setStatus(self::STATUS_URGENT);
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