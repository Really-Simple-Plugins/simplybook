<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class MaxedOutProvidersTask extends AbstractTask
{
    public const IDENTIFIER = 'maxed_out_providers';

    /**
     * @inheritDoc
     */
    protected bool $required = false;

    /**
     * @inheritDoc
     */
    protected bool $premium = false;

    private EnvironmentConfig $env;

    /**
     * This task is hidden by default as a user will not max out the providers
     * by default. Only show the task if it has an active state, never in a
     * completed state. That looks weird while filtering.
     *
     * @since 3.3.2 bumped version due to the addition of a constructor
     * argument.
     */
    public function __construct(EnvironmentConfig $env)
    {
        $this->setStatus(self::STATUS_HIDDEN);
        $this->env = $env;
        $this->version = '1.0.1';
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('You have reached the maximum number of Service Providers for your plan', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => __('Upgrade', 'simplybook'),
            'link' => $this->env->getUrl('plugin.plans_prices_url'),
        ];
    }
}
