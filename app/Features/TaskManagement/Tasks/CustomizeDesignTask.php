<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class CustomizeDesignTask extends AbstractTask
{
    public const IDENTIFIER = 'customize_design';

    /**
     * @inheritDoc
     */
    protected bool $required = false;

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('Customize your booking widget', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => __('Design settings', 'simplybook'),
            'link' => 'settings/design',
        ];
    }
}
