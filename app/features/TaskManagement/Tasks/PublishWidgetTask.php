<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class PublishWidgetTask extends AbstractTask
{
    const IDENTIFIER = 'publish_widget_on_frontend';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

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
            'login_link' => 'settings/general',
        ];
    }
}