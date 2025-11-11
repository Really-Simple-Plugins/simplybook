<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class AddMandatoryServiceTask extends AbstractTask
{
    public const IDENTIFIER = 'add_mandatory_service';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

    /**
     * This task is completed by default, that is because services are added
     * during onboarding. Only when the "get services" request returns empty
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
        return __('Please configure at least one Service', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => __('Add Service', 'simplybook'),
            'link' => 'settings/services',
        ];
    }
}
