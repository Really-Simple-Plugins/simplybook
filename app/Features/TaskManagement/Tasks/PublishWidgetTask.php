<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Services\WidgetTrackingService;

class PublishWidgetTask extends AbstractTask
{
    public const IDENTIFIER = 'publish_widget_on_frontend';

    /**
     * Not required as tracking the task is difficult. For example: if someone
     * logs into an existing account, the task will be shown. But in that
     * scenario we are not certain if the user has already published
     * the widget or not.
     */
    protected bool $required = false;

    private WidgetTrackingService $service;

    public function __construct(WidgetTrackingService $service)
    {
        $this->service = $service;

        $status = self::STATUS_URGENT;

        if ($this->service->hasTrackedPosts()) {
            $status = self::STATUS_COMPLETED;
        }

        $this->setStatus($status);
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('Publish the booking widget on the front-end of your site.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => __('Show shortcodes', 'simplybook'),
            'link' => 'settings/general',
        ];
    }
}
