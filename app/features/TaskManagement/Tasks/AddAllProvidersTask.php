<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

/**
 * A task to present when the user only has one provider. They probably have
 * more, but we cannot be sure. Therefor it is dismissible.
 */
class AddAllProvidersTask extends AbstractTask
{
    const IDENTIFIER = 'add_all_providers';

    /**
     * @inheritDoc
     */
    protected bool $required = false;

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('Please add all your providers','simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('Add providers','simplybook'),
            'login_link' => '/v2/management/#providers',
        ];
    }
}