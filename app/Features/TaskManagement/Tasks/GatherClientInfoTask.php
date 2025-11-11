<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class GatherClientInfoTask extends AbstractTask
{
    public const IDENTIFIER = 'special_feature_gather_client_info';

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
        return __('Gather information from your clients upon booking', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => __('More info', 'simplybook'),
            'login_link' => 'v2/management/#additional-fields',
        ];
    }
}
