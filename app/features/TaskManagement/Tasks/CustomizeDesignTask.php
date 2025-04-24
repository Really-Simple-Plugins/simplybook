<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class CustomizeDesignTask extends AbstractTask
{
    const IDENTIFIER = 'customize_design';

    /**
     * @inheritDoc
     */
    protected bool $required = false;

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
            'link' => 'settings/design',
        ];
    }
}