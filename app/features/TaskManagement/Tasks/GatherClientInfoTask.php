<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class GatherClientInfoTask extends AbstractTask
{
    const IDENTIFIER = 'special_feature_gather_client_info';

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
        return esc_html__('Gather information from your clients upon booking', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('More info','simplybook'),
            'login_link' => 'v2/management/#additional-fields',
        ];
    }
}