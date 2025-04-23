<?php

namespace SimplyBook\Features\Notifications\Notices;

class MaxedOutProvidersNotice extends AbstractNotice
{
    const IDENTIFIER = 'maxed_out_providers';

    /**
     * @inheritDoc
     */
    public function getTitle(): string
    {
        return esc_html__('Maximum number of Providers reached', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('Please upgrade your plan to configure more Service Providers, or delete existing Providers if you want to add more.', 'simplybook');
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
            'text' => esc_html__('Upgrade now', 'simplybook'),
            'login_link' => '/v2/r/payment-widget',
        ];
    }
}