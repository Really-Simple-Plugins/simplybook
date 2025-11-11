<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class AddMandatoryProviderTask extends AbstractTask
{
    public const IDENTIFIER = 'add_mandatory_provider';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

    /**
     * This task is completed by default, that is because providers are added
     * during onboarding. Only when the "get providers" request returns empty
     * will this task be opened.
     */
    public function __construct()
    {
        $this->setStatus(self::STATUS_COMPLETED);
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
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => __('Add Provider', 'simplybook'),
            'link' => 'settings/providers',
        ];
    }
}
