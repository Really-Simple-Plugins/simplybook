<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

/**
 * A task to present when the user only has one service. They probably have
 * more, but we cannot be sure. Therefor it is dismissible.
 */
class AddAllServicesTask extends AbstractTask
{
    const IDENTIFIER = 'add_all_services';

    /**
     * @inheritDoc
     */
    protected bool $required = false;

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('Have you added all your Services?','simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('Add Services','simplybook'),
            'login_link' => '/v2/management/#services',
        ];
    }
}