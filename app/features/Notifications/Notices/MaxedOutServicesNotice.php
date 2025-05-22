<?php

namespace SimplyBook\Features\Notifications\Notices;

class MaxedOutServicesNotice extends AbstractNotice
{
    const IDENTIFIER = 'maxed_out_services';

    /**
     * @inheritDoc
     */
    public function getTitle(): string
    {
        return esc_html__('Maximum number of Services reached', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('Please upgrade your plan to configure more Services, or delete existing Services if you want to add more.', 'simplybook');
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
        return 'services';
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