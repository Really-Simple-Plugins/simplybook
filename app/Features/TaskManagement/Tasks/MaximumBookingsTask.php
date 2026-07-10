<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class MaximumBookingsTask extends AbstractTask
{
    public const IDENTIFIER = 'maximum_bookings_task';

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
     * This task is hidden by default, that is because a trial period is
     * created during onboarding and thus still valid. We do not want to show
     * this task at all before the trial period is over so we use the hidden
     * status.
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
        return __('You have reached the maximum number of bookings for your plan', 'simplybook');
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
