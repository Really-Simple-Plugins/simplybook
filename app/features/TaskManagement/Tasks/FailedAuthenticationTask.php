<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class FailedAuthenticationTask extends AbstractTask
{
    const IDENTIFIER = 'failed_authentication';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

    /**
     * This task is urgent.
     */
    public function __construct()
    {
        $this->setStatus(self::STATUS_HIDDEN);
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('We’ve lost connection to your SimplyBook.me account. Reconnect by logging out via the general settings.','simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('General settings','simplybook'),
            'link' => 'settings/general',
        ];
    }
}