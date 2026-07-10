<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class TrialExpiredTask extends AbstractTask
{
    public const IDENTIFIER = 'trial_expired';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

    /**
     * @inheritDoc
     */
    protected bool $premium = true;

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
        return __('Your Trial period has expired! Please consider all premium features!', 'simplybook');
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
