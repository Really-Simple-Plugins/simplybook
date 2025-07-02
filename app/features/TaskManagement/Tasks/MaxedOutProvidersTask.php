<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class MaxedOutProvidersTask extends AbstractTask
{
    const IDENTIFIER = 'maxed_out_providers';

    /**
     * @inheritDoc
     */
    protected bool $required = false;

    /**
     * @inheritDoc
     */
    protected bool $premium = false;

    /**
     * This task is hidden by default as a user will not max out the providers
     * by default. Only show the task if it has an active state, never in a
     * completed state. That looks weird while filtering.
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
        return esc_html__('You have reached the maximum number of Service Providers for your plan', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('Upgrade','simplybook'),
            'login_link' => 'v2/r/payment-widget',
        ];
    }
}