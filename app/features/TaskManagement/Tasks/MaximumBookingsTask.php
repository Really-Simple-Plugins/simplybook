<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class MaximumBookingsTask extends AbstractTask
{
    const IDENTIFIER = 'maximum_bookings_task';

    /**
     * @inheritDoc
     */
    protected bool $required = false;

    /**
     * @inheritDoc
     */
    protected bool $premium = false;

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
        return esc_html__('You have reached the maximum number of bookings for your plan', 'simplybook');
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