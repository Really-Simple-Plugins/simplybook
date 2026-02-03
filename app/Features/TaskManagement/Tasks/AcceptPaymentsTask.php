<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class AcceptPaymentsTask extends AbstractTask
{
    public const IDENTIFIER = 'special_feature_accept_payments';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

    /**
     * @inheritDoc
     */
    protected bool $specialFeature = true;

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('Accept payments via SimplyBook.me', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => __('More info', 'simplybook'),
            'login_link' => 'v2/management?hash=plugins/paid_events',
        ];
    }
}
