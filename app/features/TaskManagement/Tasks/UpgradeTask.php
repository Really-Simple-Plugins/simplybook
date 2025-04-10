<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class UpgradeTask extends AbstractTask
{
    const IDENTIFIER = 'upgrade_from_trial';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

    /**
     * @inheritDoc
     */
    protected bool $premium = true;

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('Upgrade your subscription!','simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('Upgrade','simplybook'),
            'login_link' => 'v2/r/payment-widget#/',
        ];
    }
}