<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class AddMandatoryProviderTask extends AbstractTask
{
    const IDENTIFIER = 'add_mandatory_provider';

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
        return esc_html__('Please configure at least one Service Provider', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('Add Provider','simplybook'),
            'link' => 'settings/providers',
        ];
    }
}