<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class TestPremiumTask extends AbstractTask
{
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
    protected string $identifier = 'is_premium';

    /**
     * @inheritDoc
     */
    public function condition(): bool
    {
        /**
         * Original:
         * 'condition' => [
         *      'type' => 'serverside',
         *      'function' => '(new \Simplybook_old\Api\Api())->has_services()',
         * ],
         */
        return true;
    }

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