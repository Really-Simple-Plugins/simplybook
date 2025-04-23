<?php

namespace SimplyBook\Features\Notifications\Notices;

class AddMandatoryProviderNotice extends AbstractNotice
{
    const IDENTIFIER = 'add_mandatory_provider';

    /**
     * @inheritDoc
     */
    public function getTitle(): string
    {
        return esc_html__('No Providers configured', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('Please configure at least one Service Provider', 'simplybook');
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
            'text' => esc_html__('Add Service Provider', 'simplybook'),
            'login_link' => '/v2/management/#providers/edit/details/add',
        ];
    }
}