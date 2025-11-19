<?php

namespace SimplyBook\Features\Notifications\Notices;

class MaxedOutProvidersNotice extends AbstractNotice
{
    public const IDENTIFIER = 'maxed_out_providers';

    /**
     * @inheritDoc
     */
    public function getTitle(): string
    {
        return __('Maximum number of Providers reached', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('Please upgrade your plan to configure more Service Providers, or delete existing Providers if you want to add more.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getType(): string
    {
        return self::TYPE_INFO;
    }

    /**
     * @inheritDoc
     */
    public function getRoute(): string
    {
        return 'providers';
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'text' => __('Upgrade now', 'simplybook'),
            'login_link' => '/v2/r/payment-widget',
        ];
    }
}
