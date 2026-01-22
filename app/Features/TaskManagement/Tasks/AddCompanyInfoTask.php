<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class AddCompanyInfoTask extends AbstractTask
{
    public const IDENTIFIER = 'add_company_info';

    /**
     * Not required as the user can dismiss it.
     */
    protected bool $required = false;

    /**
     * This task is snoozable - user can temporarily hide it.
     */
    protected bool $snoozable = true;

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('Please add your company info to your SimplyBook.me profile', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => __('Add company info', 'simplybook'),
            'login_link' => 'settings/company-info',
        ];
    }
}
