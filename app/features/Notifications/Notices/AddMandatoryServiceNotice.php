<?php

namespace SimplyBook\Features\Notifications\Notices;

class AddMandatoryServiceNotice extends AbstractNotice
{
    const IDENTIFIER = 'add_mandatory_service';

    /**
     * @inheritDoc
     */
    public function getTitle(): string
    {
        return esc_html__('No Services configured', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('Please configure at least one Service', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getType(): string
    {
        return self::TYPE_WARNING;
    }

    /**
     * @inheritDoc
     */
    public function getRoute(): string
    {
        return 'services';
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'text' => esc_html__('Add Service', 'simplybook'),
            'login_link' => '/v2/management/#services/edit/details/add',
        ];
    }
}