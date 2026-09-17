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
     * @since 3.4.1 bumped version due to changed wording and premium flag.
     */
    public function __construct(EnvironmentConfig $env)
    {
        $this->setStatus(self::STATUS_HIDDEN);
        $this->env = $env;
        $this->setVersion('1.0.2');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('Your trial has ended. Select the Free plan to continue for free, or a paid plan.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => __('Choose plan', 'simplybook'),
            'link' => $this->env->getUrl('plugin.plans_prices_url'),
        ];
    }
}
