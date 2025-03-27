<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class AddServiceTask extends AbstractTask
{
    const IDENTIFIER = 'add_service';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('Add your first service','simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('Add service','simplybook'),
            'link' => '#/settings/services',
        ];
    }
}