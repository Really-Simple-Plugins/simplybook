<?php

namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Features\TaskManagement\Tasks\AbstractTask;

/**
 * Manages the counter shown in the admin menu bubble. The
 * {@see TaskManagementListener} sets and lowers the counter. The
 * {@see \SimplyBook\Controllers\DashboardController} reads the option to
 * render the bubble.
 */
class TaskBubbleCounterService
{
    public function set(int $count): void
    {
        update_option(AbstractTask::MENU_BUBBLE_OPTION_KEY, $count);
    }

    public function get(): int
    {
        return (int) get_option(AbstractTask::MENU_BUBBLE_OPTION_KEY, 0);
    }

    /**
     * The counter never goes below 0.
     */
    public function decrease(): void
    {
        $this->set(max(0, $this->get() - 1));
    }
}
