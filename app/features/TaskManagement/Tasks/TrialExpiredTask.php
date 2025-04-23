<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class TrialExpiredTask extends AbstractTask
{
    const IDENTIFIER = 'trial_expired';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

    /**
     * @inheritDoc
     */
    protected bool $premium = true;

    /**
     * This task is hidden by default, that is because a trial period is
     * created during onboarding and thus still valid. We do not want to show
     * this task at all before the trial period is over so we use the hidden
     * status.
     */
    public function __construct()
    {
        $this->setStatus(self::STATUS_HIDDEN);
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('Your Trial period has expired! Please consider all premium features!', 'simplybook');
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