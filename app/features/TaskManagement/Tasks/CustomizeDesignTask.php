<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class CustomizeDesignTask extends AbstractTask
{
    /**
     * @inheritDoc
     */
    protected bool $required = false;

    /**
     * @inheritDoc
     */
    protected string $identifier = 'customize_design';

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
        return esc_html__('Customize your booking widget','simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('Design settings','simplybook'),
            'link' => '#/settings/design',
        ];
    }
}