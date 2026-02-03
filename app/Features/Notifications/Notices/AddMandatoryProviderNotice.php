<?php

namespace SimplyBook\Features\Notifications\Notices;

class AddMandatoryProviderNotice extends AbstractNotice
{
    public const IDENTIFIER = 'add_mandatory_provider';

    /**
     * @inheritDoc
     */
    public function getTitle(): string
    {
        return __('No Providers configured', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('Please configure at least one Service Provider', 'simplybook');
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
        return 'providers';
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'text' => __('Add Service Provider', 'simplybook'),
            'login_link' => '/v2/management?hash=providers/edit/details/add',
        ];
    }
}
