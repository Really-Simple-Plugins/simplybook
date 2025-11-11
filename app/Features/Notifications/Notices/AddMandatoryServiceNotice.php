<?php

namespace SimplyBook\Features\Notifications\Notices;

class AddMandatoryServiceNotice extends AbstractNotice
{
    public const IDENTIFIER = 'add_mandatory_service';

    /**
     * @inheritDoc
     */
    public function getTitle(): string
    {
        return __('No Services configured', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('Please configure at least one Service', 'simplybook');
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
            'text' => __('Add Service', 'simplybook'),
            'login_link' => '/v2/management/#services/edit/details/add',
        ];
    }
}
