<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class AddCompanyInfoTask extends AbstractTask
{
    public const IDENTIFIER = 'add_company_info';

    /**
     * Option key to store whether company info check was completed.
     */
    public const COMPLETED_FLAG = 'simplybook_add_company_info_task_completed';

    /**
     * Not required as the user can dismiss it.
     */
    protected bool $required = false;

    /**
     * This task is snoozable - user can temporarily hide it.
     */
    protected bool $snoozable = true;

    public function __construct()
    {
        $status = self::STATUS_OPEN;

        // If completed flag is set, mark as completed
        if (get_option(self::COMPLETED_FLAG, false)) {
            $status = self::STATUS_COMPLETED;
        }

        $this->setStatus($status);
    }

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
            'snooze_on_click' => true,
        ];
    }

    /**
     * Mark the task as completed indefinitely.
     */
    public static function markCompleted(): void
    {
        update_option(self::COMPLETED_FLAG, true, false);
    }

    /**
     * Check if the task has been marked as completed.
     */
    public static function isCompleted(): bool
    {
        return (bool) get_option(self::COMPLETED_FLAG, false);
    }
}
