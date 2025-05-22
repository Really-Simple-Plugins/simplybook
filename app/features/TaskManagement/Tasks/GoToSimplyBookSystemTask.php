<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class GoToSimplyBookSystemTask extends AbstractTask
{
    const IDENTIFIER = 'go_to_simplybook_system';

    /**
     * @inheritDoc
     */
    protected bool $required = false;

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('Discover the full functionality on SimplyBook.me', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('SimplyBook.me','simplybook'),
            'login_link' => '/v2/dashboard/new',
        ];
    }
}