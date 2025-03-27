<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class TestPremiumTask extends AbstractTask
{
    const IDENTIFIER = 'is_premium';

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
        return esc_html__('This is a premium task!','simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('Upgrade','simplybook'),
            'link' => 'todo',
        ];
    }
}