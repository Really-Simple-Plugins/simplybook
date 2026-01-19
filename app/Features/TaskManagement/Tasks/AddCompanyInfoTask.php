<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class AddCompanyInfoTask extends AbstractTask
{
    public const IDENTIFIER = 'add_company_info';

    /**
     * Option key to store the timestamp when the task was snoozed (link clicked).
     */
    public const SNOOZED_AT_OPTION = 'simplybook_add_company_info_task_snoozed_at';

    /**
     * Option key to store whether company info check was completed.
     */
    public const COMPLETED_FLAG = 'simplybook_add_company_info_task_completed';

    /**
     * Snooze duration in seconds (24 hours).
     */
    public const SNOOZE_DURATION = DAY_IN_SECONDS;

    /**
     * Not required as the user can dismiss it.
     */
    protected bool $required = false;

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
     * Check if the task is currently snoozed (link was clicked within the last 24 hours).
     */
    public static function isSnoozed(): bool
    {
        $snoozedAt = (int) get_option(self::SNOOZED_AT_OPTION, 0);

        if ($snoozedAt === 0) {
            return false;
        }

        return (time() - $snoozedAt) < self::SNOOZE_DURATION;
    }

    /**
     * Set the task as snoozed (stores current timestamp).
     */
    public static function snooze(): void
    {
        update_option(self::SNOOZED_AT_OPTION, time(), false);
    }

    /**
     * Mark the task as completed indefinitely.
     */
    public static function markCompleted(): void
    {
        update_option(self::COMPLETED_FLAG, true, false);
        delete_option(self::SNOOZED_AT_OPTION);
    }

    /**
     * Check if the task has been marked as completed.
     */
    public static function isCompleted(): bool
    {
        return (bool) get_option(self::COMPLETED_FLAG, false);
    }
}
